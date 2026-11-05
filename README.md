# ahmedmusab.com

Personal site for **Ahmed Musab**, Founder & CEO of Pixelpk Technologies, AI specialist, and lead behind Pakistan Law Bot.

Built with Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Motion, Zod, Resend and MDX. All copy lives in `src/content/`, so text can be edited without touching components.

- **Decisions and reasoning:** [`DECISIONS.md`](./DECISIONS.md)
- **What Ahmed still needs to supply or confirm:** [`CONTENT-TO-CONFIRM.md`](./CONTENT-TO-CONFIRM.md)
- **Screenshots** (375 / 768 / 1440px, every page): [`docs/screenshots/`](./docs/screenshots)
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
| `npm run build` / `npm start` | Production build / serve it. |
| `npm run lint` | ESLint (next/core-web-vitals + TypeScript rules). |
| `npm run typecheck` | Generates route types, then runs `tsc --noEmit`. |
| `npm run check` | Lint, typecheck and build in one go. |

**Design preview for the work section:** `WORK_PREVIEW=1 npm run dev` fills the (currently empty) portfolio with clearly labelled sample cards, so the sticky stacking cards, filters and case-study pages can be reviewed. It is ignored in production.

## Environment variables

See [`.env.example`](./.env.example). Without them the site works fully; only the contact form changes behaviour.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical base URL (no trailing slash). On Vercel it falls back to the project's production URL. |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | For the form | Delivery through Resend. `CONTACT_FROM_EMAIL` must use a domain verified in Resend. Without all three, `/api/contact` returns **503** and the form says it isn't connected yet. |
| `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Optional | Cloudflare Turnstile. Both are needed to enable it. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Optional | Durable rate limiting (5 messages per 10 minutes per IP). Without them an in-memory limiter is used, which is best-effort on serverless because each instance has its own memory. |

---

## Editing the site

### Edit copy

| What | File |
|---|---|
| Links, email, booking, feature flags, proof points | `src/content/site.ts` |
| All homepage copy (hero, about, section titles, process, …) | `src/content/home.ts` |
| Ventures (cards + detail pages) | `src/content/ventures.ts` |
| Portfolio / case studies | `src/content/work.ts` |
| AI lab, `/ai` page, terminal demo, toolbox | `src/content/ai.ts` |
| Expertise groups | `src/content/expertise.ts` |
| FAQ | `src/content/faq.ts` |
| About story + timeline | `src/content/timeline.ts` |
| Photos, captions, alt text | `src/content/culture.ts` |

**Emphasis word:** wrap one word or phrase per heading in asterisks to set it in the Instrument Serif italic, for example `"Companies and products *I'm building*."`.

**Anything empty is hidden.** An empty link (`""`), an unconfirmed proof point (`confirmed: false`) or an empty list (milestones, projects) renders nothing, never placeholder text.

### Add a venture

1. Copy an object in `allVentures` in `src/content/ventures.ts` and give it a unique `slug`.
2. Fill in at least `url`, `role`, `tagline` and `overview` (incomplete ventures are filtered out), and set `published: true`.
3. Optional: add `logo` (file in `public/logos/`), `screenshots[]` (they replace the photo in the browser frame) and `milestones[]`.

The homepage card, `/ventures`, `/ventures/<slug>`, its OG image, the sitemap entry and the Organization JSON-LD are generated automatically. To enable **Aivastark**, fill in its entry and set `flags.aivastark = true` in `site.ts`.

### Add a project (case study)

1. Put screenshots from Pixelpk's own site in `public/images/work/<slug>/`.
2. Add an object to `projects` in `src/content/work.ts` (the shape is documented at the top of the file). Use `frame: "browser"` or `"phone"` per image.
3. If a client hasn't approved being named, use an anonymised `clientLabel` and set `clientNamePending: true`.
4. Set `outcome` only when pixelpk.com or Ahmed actually states it; otherwise leave it out and it stays hidden.
5. Mark the six strongest `featured: true`. They appear on the homepage as sticky stacking cards.

Industry filter chips are generated from the data. `/work/<slug>`, its OG image and sitemap entry are created automatically. The "View all work" link appears once projects exist.

### Publish an article

1. Create `src/content/insights/<slug>.mdx`. Use `_example-article.mdx` as the format reference.
2. Add frontmatter: `title`, `description`, `date` (YYYY-MM-DD), `category`, and optionally `image` + `imageAlt`.
3. `draft: true`, or a file name starting with `_`, keeps it visible in `npm run dev` only.
4. Remove the draft flag, then commit and push.

`##` / `###` headings build the table of contents. Reading time, the OG image, the sitemap entry and Article JSON-LD are generated. The homepage Insights section shows the three newest posts, and its empty state disappears automatically.

### Swap photos

1. Keep originals in `assets/source/` (not served).
2. Export an optimised JPG to `public/images/` (long edge 1600–2000px, quality around 80, metadata stripped) with a descriptive slug.
3. Update `src/content/culture.ts` (or `hero.portrait` in `home.ts`) with the new `src`, the exact `width`/`height`, accurate `alt` text, and a caption that only describes what's visible.

`next/image` serves AVIF/WebP automatically. All people photos get the site's mono grade, with colour on hover.

---

## Project structure

```text
src/
├── app/                    routes (page.tsx per route), opengraph-image.tsx per route,
│   ├── api/contact/        POST handler (Resend, Zod, honeypot, rate limit, Turnstile)
│   ├── fonts/              self-hosted woff2 + OFL licences
│   ├── globals.css         design tokens (@theme), chapter themes, motion CSS
│   ├── sitemap.ts · robots.ts · manifest.ts · icon.tsx · apple-icon.tsx · not-found.tsx
├── components/
│   ├── layout/   SiteHeader, MobileNav, StatusStrip, SiteFooter
│   ├── home/     Hero, Ticker, AboutPreview, RoleCards, VentureShowcase, WorkStack, AILab,
│   │             ExpertiseGrid, ProcessSection, CultureGallery, Philosophy, InsightsPreview,
│   │             FAQ, FaqSection, ContactCTA
│   ├── ventures/ VentureCard, VentureDetail
│   ├── work/     ProjectCard, CaseStudy, DeviceFrame, WorkExplorer
│   ├── insights/ InsightCard, InsightGrid, InsightsBrowser, ReadingProgress, TableOfContents, ShareLinks
│   ├── motion/   Reveal(+RevealObserver), Marquee, ParallaxFrame, StackingCards, PipelineDiagram,
│   │             Terminal, MagneticButton, LiveClock, RotatingRole, ScrollHighlight, ProcessLine,
│   │             DragGallery, CursorGlow, CursorPill, SmoothScroll
│   ├── about/    PhotoStrip
│   ├── contact/  ContactForm
│   └── ui/       Button, Container, Section, SectionHeading, PageHero, Chip, Timeline, Emphasis,
│                 IndexLabel, RegMarks, NodeGraph
├── content/      all copy and data (see "Edit copy")
├── assets/       OG fonts + mono headshot for generated images (not served)
└── lib/          metadata, schema (JSON-LD), validation (Zod), contact, motion tokens, og, insights, mdx, work
assets/source/    original photos from Google Drive (not served)
public/images/    optimised photos
legacy/           archived, unrelated clinic prototype (not part of this site)
scripts/          QA helpers (Playwright): qa.mjs, screens.mjs, shot.mjs, tour.mjs, sheet.py
docs/             screenshots + Lighthouse reports
```

## QA scripts

The scripts use the Playwright Chromium that's pre-installed in the build environment. Locally, run `npm i -D playwright` first.

```bash
npm run build && npm start -- -p 3200
```

```bash
node scripts/qa.mjs http://localhost:3200
```

```bash
node scripts/screens.mjs http://localhost:3200 docs/screenshots
```

`qa.mjs` checks every route's status and all internal links and anchors, horizontal overflow at 320–1920px, console errors, the mobile menu (keyboard, focus trap, Esc, scroll lock), the contact form (inline errors, `aria-describedby`, 503 path) and reduced motion.

---

## Deploying to Vercel

1. Push this repository to GitHub, then **Add New → Project** in Vercel and import it. The framework preset is detected as Next.js; the default build command (`next build`) and output settings need no changes. Node.js 20+.
2. In **Settings → Environment Variables**, add the variables above. At minimum add the three Resend variables to switch the contact form on. `NEXT_PUBLIC_SITE_URL` can wait until the domain is live; the Vercel production URL is used until then.
3. Deploy. Then check `/`, `/contact` (send a test enquiry), `/sitemap.xml` and `/robots.txt`.

### Connecting ahmedmusab.com

1. Confirm ownership of the domain at its registrar.
2. In Vercel: **Project → Settings → Domains → Add** `ahmedmusab.com` and `www.ahmedmusab.com`. Choose which one redirects to the other.
3. At the registrar, create the DNS records Vercel shows on that page. Typically that's an `A` record for the apex domain and a `CNAME` for `www` pointing at Vercel. Use the exact values Vercel displays.
4. Wait for Vercel to show the domain as valid and issue the certificate.
5. Set `NEXT_PUBLIC_SITE_URL=https://ahmedmusab.com` (or the `www` variant you chose) and redeploy, so canonical URLs, OG URLs and the sitemap use the domain.
6. In Resend, verify the sending domain (DNS records again) and use an address on it for `CONTACT_FROM_EMAIL`.
7. Optional: submit `https://ahmedmusab.com/sitemap.xml` in Google Search Console.
