# ahmedmusab.com

Personal site for **Ahmed Musab**, founder at Pixelpk Technologies, AI specialist, and lead behind Pakistan LawBot.

The design is an editorial system modelled on the structure of anasw.com and tinted with Pixelpk's brand. The portfolio is the 16 case studies published on pixelpk.com.

Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Motion, Zod, Resend and MDX. All copy and data live in `src/content/`.

- **Decisions and reasoning:** [`DECISIONS.md`](./DECISIONS.md)
- **What Ahmed needs to confirm (start here):** [`CONTENT-TO-CONFIRM.md`](./CONTENT-TO-CONFIRM.md)
- **Screenshots** (every page at 375 / 768 / 1440px): [`docs/screenshots/`](./docs/screenshots)
- **Lighthouse reports** (mobile): [`docs/lighthouse/`](./docs/lighthouse)

---

## Getting started

Requires Node.js 20.9 or newer (developed on Node 22).

```bash
npm install
cp .env.example .env.local   # optional: fill in to enable the contact form
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Development server (Turbopack). Draft articles are visible here only. |
| `npm run build` / `npm start` | Production build / serve it. Restart `npm start` after every rebuild. |
| `npm run lint` | ESLint (next/core-web-vitals + TypeScript). |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit`. |
| `npm run check` | Lint, typecheck and build. |

## Environment variables

See [`.env.example`](./.env.example). The site works fully without them; only the contact form changes behaviour.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL. On Vercel it falls back to the project's production URL. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | Contact form delivery through Resend. Without all three, `/api/contact` returns **503** and the form says it isn't connected yet. |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional Cloudflare Turnstile. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optional durable rate limiting. Otherwise a best-effort in-memory limiter is used. |

---

## Editing the site

### Where everything lives

| What | File |
|---|---|
| Name, title, links, nav, flags, Pixelpk figures, proof points | `src/content/site.ts` |
| All homepage copy (hero, roles, section titles, process, contact panel) | `src/content/home.ts` |
| Ventures (Pixelpk, Pakistan LawBot): cards and detail pages | `src/content/ventures.ts` |
| Portfolio: the 16 case studies | `src/content/work.ts` |
| Services and engagement models (Pixelpk) | `src/content/services.ts` |
| Client testimonials (Pixelpk) | `src/content/testimonials.ts` |
| AI lab: principles, terminal, product flows, toolbox, `/ai` page | `src/content/ai.ts` |
| About: intro, quote, facts, story, timeline | `src/content/about.ts` |
| Photos, captions, alt text | `src/content/culture.ts` |
| FAQ | `src/content/faq.ts` |

**Heading syntax:** wrap one word in `*asterisks*` for the crimson serif-italic accent, and use `\n` for a deliberate line break. For example, `"Selected\n*work*."` renders as SELECTED / *work*.

**Anything empty is hidden.** An empty link, an unconfirmed proof point or an empty list renders nothing. Turn whole blocks on or off with `flags` in `site.ts`: Pixelpk figures, testimonials, Aivastark, newsletter and availability.

### Change Ahmed's title

Edit `site.jobTitle` in `site.ts` and each venture's `role` in `ventures.ts`. Read section 1 of CONTENT-TO-CONFIRM.md first.

### Add or edit a case study

1. Put the images in `public/images/work/<slug>/`. Use `hero.webp` for the card and hero image; other screens follow it, and phone shots go in a `-mobile` file.
2. Add an object to `projects` in `src/content/work.ts`. The `Project` type at the top of the file documents every field, and existing entries make good templates. Required fields:
   - `slug`, `name`, `kicker`, `category`, `summary`, `tags`, `tint`
   - `highlights` and `stats`
   - `brief`, `objectives`, `built.features`, `how.steps`, `challenges`, `stack`
   - `images`, and `source` (the full case study's URL)
3. Set `featured: true` to show it on the homepage. Keep exactly six featured projects for the 2×3 grid. `order` controls the position on `/work`.

The `/work` filters, the `/work/<slug>` page, its OG image and its sitemap entry are generated automatically.

### Add a venture

Copy an entry in `allVentures` (`src/content/ventures.ts`) and give it a unique `slug`. Add a logo to `public/logos/` and desktop and mobile screenshots to `public/images/ventures/`. Set `published: true`. The homepage card, `/ventures/<slug>`, the OG image and the Organization JSON-LD follow automatically.

### Publish an article

Create `src/content/insights/<slug>.mdx`, using `_example-article.mdx` as the format reference. Set `title`, `description`, `date`, `category`, and optionally `image` and `imageAlt`. `draft: true`, or a file name starting with `_`, keeps it visible in development only. `##` headings build the table of contents.

### Swap photos

Keep originals in `assets/source/`. Export an optimised JPG to `public/images/`, then update `src/content/culture.ts` with the `src`, the exact `width`/`height`, accurate `alt` text and a caption that describes only what's visible. People photos get the site's mono grade, with colour on hover.

---

## Project structure

```text
src/
├── app/                  routes + an opengraph-image.tsx per route, api/contact, sitemap, robots, icons
│   ├── fonts/            Archivo (variable), Instrument Serif italic, JetBrains Mono + OFL licences
│   └── globals.css       tokens (@theme), chapter themes, type scale, motion CSS
├── components/
│   ├── layout/   SiteHeader (pill nav), MobileNav, SiteFooter (outlined name)
│   ├── home/     Hero, Ticker, Figures, RolesSection/RolesAccordion, VenturesSection, SelectedWork,
│   │             ServicesSection, ProcessSection, AiLabSection/AiFlows, AboutSection, CultureSection,
│   │             ClientsSection, FaqSection/FAQ, ContactPanel
│   ├── ventures/ VentureCard + VentureStack, VentureDetail
│   ├── work/     ProjectCard, WorkIndex (filters), CaseStudy, DeviceFrame
│   ├── insights/ InsightCard, InsightGrid, InsightsBrowser, ReadingProgress, TableOfContents, ShareLinks
│   ├── motion/   Reveal + RevealObserver, Marquee, Terminal, DragGallery, LiveClock, MagneticButton, SmoothScroll
│   ├── contact/  ContactForm
│   └── ui/       Button, Section, SectionHead, PageHero, Emphasis/RiseText, Chip, Timeline, HoverPrefetchLink
├── content/      all copy and data (see "Where everything lives")
├── assets/       OG fonts + mono headshot for generated images (not served)
└── lib/          metadata, schema (JSON-LD), validation (Zod), contact, og, insights, mdx, work, motion tokens
public/images/    photos (people), work/<slug>/ (case-study screens), ventures/ (live-site screenshots)
public/logos/     Pixelpk and Pakistan LawBot logos (from their websites)
assets/source/    original photos from Google Drive (not served)
legacy/           archived, unrelated clinic prototype
scripts/          Playwright QA: qa.mjs, screens.mjs, shot.mjs, tour.mjs, sheet.py
```

## QA scripts

These use the Playwright Chromium that's pre-installed in the build environment. Locally, run `npm i -D playwright` first.

```bash
npm run build && npm start -- -p 3000
```

```bash
node scripts/qa.mjs http://localhost:3000
```

```bash
node scripts/screens.mjs http://localhost:3000 docs/screenshots
```

`qa.mjs` checks:
- Route status codes and every internal link and anchor
- Horizontal overflow at 320–1920px, and console errors
- The mobile menu (keyboard, focus trap, Esc, scroll lock)
- The contact form (inline errors, the 503 path)
- Reduced motion

---

## Deploying to Vercel

1. In Vercel, choose **Add New → Project** and import this repository. The defaults work for Next.js; use Node.js 20+.
2. In **Settings → Environment Variables**, add the three Resend variables to switch the contact form on. Add `NEXT_PUBLIC_SITE_URL` once the domain is live.
3. Deploy. Then check `/`, `/work`, `/contact` (send a test enquiry), `/sitemap.xml` and `/robots.txt`.

### Connecting ahmedmusab.com

1. In Vercel, go to **Project → Settings → Domains** and add `ahmedmusab.com` and `www.ahmedmusab.com`. Choose which one redirects to the other.
2. At the registrar, create the DNS records Vercel shows: typically an `A` record for the apex domain and a `CNAME` for `www`. Wait for the domain to show as valid.
3. Set `NEXT_PUBLIC_SITE_URL=https://ahmedmusab.com` and redeploy.
4. Verify the sending domain in Resend and use an address on it for `CONTACT_FROM_EMAIL`.
5. Optionally, submit `/sitemap.xml` in Google Search Console.
