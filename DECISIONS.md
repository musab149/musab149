# Decisions log

Decisions made while building ahmedmusab.com, with the reason for each. Newest context first within each group.

## Environment & repository

| # | Decision | Why |
|---|---|---|
| D1 | **Moved the existing files into `legacy/alkhidmat-clinic/`** (with `git mv`, nothing deleted). | The working repo (`musab149/musab149`) did not contain the old portfolio. It held an unrelated static prototype, "Alkhidmat Clinic Management System" (React via CDN + Babel). It still runs as-is from that folder (open `legacy/alkhidmat-clinic/index.html`). It is excluded from lint and typecheck. |
| D2 | **Portfolio, product screenshots and official logos are not on the site yet.** | The build environment's network policy blocked `pixelpk.com` and `pakistanlawbot.com` (DNS failure and proxy 403). The brief forbids inventing content, so `src/content/work.ts` ships empty with a documented schema and an honest empty state that links to pixelpk.com. Venture frames show real photos until screenshots are supplied. Wordmarks are typographic, which the brief allows as a fallback. |
| D3 | **Photos downloaded through the Google Drive connector** into `assets/source/` (originals, not served). Optimised copies are in `public/images/`. | The direct Drive URL was blocked, but the connector worked. All 18 files were viewed before placement. EXIF was stripped on export. A 2-pixel black line on the top edge of `Ahmed Musab.jpg` and `musab dp.jpg` was cropped off. |
| D4 | **Fonts are self-hosted from Fontsource files** (Manrope variable, Instrument Serif Italic, JetBrains Mono variable; latin subset) via `next/font/local`, with OFL licences in `src/app/fonts/`. | `fonts.googleapis.com` was blocked, so `next/font/google` would fail the build. Local files also mean no third-party request at runtime. Static Manrope/Instrument WOFF files in `src/assets/og-fonts/` feed the OG image renderer (Satori can't read WOFF2). |
| D5 | **Versions: Next 16.4.5, React 19.3, TypeScript 5.9, ESLint 9, Tailwind 4.3, Motion 14.** | These are the latest stable releases at build time, as pinned together by `create-next-app@16.4.5`. TypeScript 7 and ESLint 10 exist, but the Next 16.4 template and `eslint-config-next` target TS 5 and ESLint 9. Keeping them compatible beat chasing the newest major. |
| D6 | **`cacheComponents` (PPR) is turned off** even though the Next 16.4 template enables it. | Every page is static content. Cache Components forbids empty `generateStaticParams`, and both `/work/[slug]` and `/insights/[slug]` are empty right now. It also forbids `new Date()` in prerendered trees (the footer year). It brings no benefit for this site. |

## Content & truthfulness

| # | Decision | Why |
|---|---|---|
| C1 | All unconfirmed values live in `src/content/site.ts` and render nothing while empty: LinkedIn, email, booking, GitHub, X, YouTube, proof points (`confirmed: false`) and Aivastark (`flags.aivastark`). | Brief §3.3: never show placeholder text in production. |
| C2 | Pakistan Law Bot role is shown as **"Lead"**. | The brief confirms Ahmed *leads* the product. His exact title (Founder / Co-founder / Product Lead) is pending, and changing one field in `ventures.ts` updates it everywhere. |
| C3 | **The Work (04) and Insights (10) sections stay visible with honest empty states** instead of being hidden. | Hiding Work would put the dark Ventures chapter directly against the dark AI lab chapter and break the light/dark rhythm (§5.4). The renumbering logic still exists in `src/app/page.tsx` for any section that is hidden. |
| C4 | `WORK_PREVIEW=1 npm run dev` fills the work grid with obviously fake **"Sample project"** cards, with a visible "Design preview" banner. | It lets the sticky stacking cards, filters and case-study template be reviewed before real projects exist. It is ignored in production builds (`NODE_ENV` guard in `src/lib/work.ts`). |
| C5 | Insights ships with **zero published articles**. A format template (`_example-article.mdx`, `draft: true`) renders only in `next dev`. | The brief forbids placeholder articles presented as published. |
| C6 | Terminal demo copy is generic: an employment-contract question with generic file names. It is labelled "Illustrative demo · No real data". | Brief §7.05: no invented cases, citations, statistics or client data. |
| C7 | Photo captions describe only what's visible or given in the file name. "Fairy Meadows" appears only because it is printed on that photo. Alt text names Ahmed where he is recognisable from the confirmed portrait and headshot. These identifications are listed for confirmation. | Brief §4.1. |
| C8 | Toolbox shows **n8n, MCP, Flutter** only. | These are the tools the brief lists as known. |

## Design system

| # | Decision | Why |
|---|---|---|
| S1 | Tailwind v4 `@theme` holds the raw palette. **Chapter-aware semantic tokens** (`text-fg`, `text-muted`, `bg-card`, `border-line`) flip under `.theme-light` / `.theme-dark`. | Components are written once and work in both chapter types. On paper, `--muted` is `slate-strong` (#5C616B), which passes AA. Lime is never used as text on light backgrounds. |
| S2 | Component classes (`.btn`, `.link-draw`, `.emph`, …) live in `@layer components`. | Unlayered CSS beats Tailwind's layered utilities, so `.btn{display:inline-flex}` was overriding `hidden` on the header CTA. Found during the 375px review. |
| S3 | **One photo grade: mono** (`grayscale(1) contrast(1.06)`), with **colour on hover** for fine pointers. Touch devices see the mono version. OG images use a pre-graded mono headshot. | The photos come from many events with very different white balance. Mono unifies them and lets lime be the only accent colour. |
| S4 | **The hero has smaller top padding** (`clamp(2rem,3.4vw,3.25rem)`) than the standard section padding. | Header (88px) plus status strip (44px) plus standard padding pushed the CTAs below the fold at 1440×900. Every other section uses the identical `clamp(5rem,10vw,10rem)`. |
| S5 | Breakpoints: `md` 768 (tablet), `lg` 1024 (two-column hero, horizontal nav, sticky stacking cards), `xl` 1280 (desktop). | The brief's tablet band (768–1279) is wide. The hero and nav get cramped below 1024, so they switch there. |
| S6 | Venture cards show a **real photograph inside the CSS browser frame** (the team at the annual lunch, and the Pakistan Law Bot event) until product screenshots exist. A screenshot added to `screenshots[]` replaces it automatically. | A fake rendered UI would misrepresent the products. |
| S7 | Emphasis words are marked with `*asterisks*` in plain content strings. | Copy stays editable without JSX, and one renderer handles the H1/H2 serif italic, the masked-line rise and the OG images. |

## Motion

| # | Decision | Why |
|---|---|---|
| M1 | Motion tokens are defined once in `src/lib/motion.ts` and mirrored as CSS custom properties (`--ease-out`, `--dur-reveal`, `--stagger`, …). | Brief §6.2. |
| M2 | **The hero choreography is pure CSS** and finishes by 1.4s: grid → eyebrow → word rise → lime underline → copy → clip-path portrait wipe (scale 1.06 → 1) → chips. | The LCP headline and portrait are server-rendered and visible without waiting for JS. Measured LCP is 1.0s on mobile. |
| M3 | **Shared reveal = server `Reveal` wrapper + one global `RevealObserver`.** The first version used one client component per group. | Mobile TBT fell from 500ms to roughly 100–170ms and Performance rose from 87 to 98. The reveal only hides content when `html.js` is set and motion is allowed, so nothing can get stuck invisible. |
| M4 | **Three signatures run in pure CSS:** the rotating role (keyframes), the venture inner parallax (`animation-timeline: view()`, ±40px desktop / ±20px tablet), and the philosophy word highlight (named view timeline). | Brief §6.1 allows CSS scroll-driven animation where supported. Browsers without support get a static (fully drawn) version. Parallax frames use `overflow: clip`, not `hidden`, because `hidden` creates a scroll container that captures `view()`. |
| M5 | Motion (`motion/react`) still drives the pipeline `pathLength` draw and node lighting, the process progress fill and active step, the stacking cards (layout animation, with filters), and the reading-progress bar. Components that only bind MotionValues use `motion/react-m`. The stacking-card explorer is code-split with `next/dynamic`. | These moments need cross-browser scroll-linked JS or layout animation. Splitting keeps the homepage bundle small while there are no projects. |
| M6 | **Lenis is included but conservative:** fine pointers only, loaded on idle, off under reduced motion and paused while the mobile menu is open. | It smooths the scroll-linked effects on desktop without touching mobile momentum or accessibility. |
| M7 | **Page transitions use React `<ViewTransition>`** (View Transitions API): a 160ms fade-out and a 280ms fade/slide-in. They are disabled under reduced motion. | Brief §6.4 (≤300ms). Browsers without the API navigate normally. |
| M8 | **Hover micro-states also transition colour and border colour** (200ms). | These are paint-only and never trigger layout. Every positional or reveal animation uses only transform, opacity, clip-path or filter. |
| M9 | Under reduced motion: reveals are instant, the ticker is static, there is no parallax, cursor glow, magnetic pull or Lenis, the terminal shows its final text, and the pipeline and process line render fully drawn. | Brief §6.5. Verified in QA (`scripts/qa.mjs`: 0 of 56 reveal items hidden, ticker `animation-name: none`). |

## Contact form

| # | Decision | Why |
|---|---|---|
| F1 | One Zod schema (`src/lib/validation.ts`) is used by the client form and `POST /api/contact`. | Brief §9. |
| F2 | API outcomes: 200 only when Resend returns a message id; 400 invalid or spam; 429 rate limited; 503 not configured; 502 provider failed. The UI only shows success on 200. | Verified: with no env the API returns 503 and the form shows "The form isn't connected yet…". With a fake Resend key it returns 502 and the form shows an error (never success). The 6th request in 10 minutes returns 429. |
| F3 | Spam protection: honeypot field, a 3-second minimum time-to-submit, and optional Cloudflare Turnstile (both keys required). Rate limiting uses Upstash when configured and otherwise an in-memory map (best-effort on serverless; documented). | Brief §9. |
| F4 | The dev-only "Form requires configuration" banner reads env at build time. | The contact page is static. The API checks env on every request. |

## SEO & performance

| # | Decision | Why |
|---|---|---|
| P1 | The canonical base is `NEXT_PUBLIC_SITE_URL`, then Vercel's `VERCEL_PROJECT_PRODUCTION_URL`, then `VERCEL_URL`, then localhost. | No hard-coded domain until ahmedmusab.com is confirmed (brief §1, §11). |
| P2 | One branded OG image per page, venture, project and article, built from a single renderer (`src/lib/og.tsx`). | Brief §11. |
| P3 | Link text: "Read more" links carry screen-reader-only context ("about Pixelpk Technologies"). | Lighthouse SEO `link-text` failed on the first audit. It passes now. |
| P4 | Security headers (nosniff, referrer policy, frame options, permissions policy) are set in `next.config.ts`. | Best-practice hygiene, with no cost. |
| P5 | **Header, button and footer links prefetch on intent** (hover, focus or touch via `HoverPrefetchLink`) instead of on entering the viewport. | Every header link is visible on load, so viewport prefetch downloaded each route's JS (Zod, the form, Motion layout code) during page load. Venture-page JS fell from 260KB to 151KB and simulated LCP from 2.9s to 2.1s. Navigation still prefetches before the click. |
| P6 | Detail-page H1s use the transform-based rise, not an opacity fade. The venture hero image renders statically, with the inner parallax as its motion. | Chrome skips elements at opacity 0 as LCP candidates, so the faded H1/image let a small mono eyebrow become the LCP element. The real largest element now counts. |
| P7 | Culture gallery images are all `loading="lazy"`. | They sit far below the fold. Eager loading wasted mobile bandwidth on first load. |
