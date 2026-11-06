# Decisions log

Why the site is built the way it is. **Version 2** (the redesign that uses anasw.com as the reference and imports the Pixelpk portfolio) comes first. Version 1 decisions that still apply follow it.

## Version 2: the redesign

### Reference, brand and content sources

| # | Decision | Why |
|---|---|---|
| V1 | **anasw.com was studied live** and its structure and level of craft were adopted. That covers the status line, the poster-scale name, the numbered pill nav, the roles accordion, stacked product cards, a 3×3 services grid, the process line with a toolbox, an AI lab with a terminal and flow diagrams, About with photo cards, the FAQ, the dark contact chapter and the outlined-name footer. **No text, metrics, images, branding or code were copied.** | You asked for anasw.com as the reference. anasw.com is Syed Anas's personal site, so only the patterns carry over. |
| V2 | **The tone is more formal than the reference.** The orange brush-script accent becomes an Instrument Serif italic word. There's no lanyard, tilted ticker or barcode. The credential card is tilted just 3°. | You asked for "formally designed… minimalistic and decent". |
| V3 | **The palette is tinted to Pixelpk**: paper `#F3F2ED`, navy-black ink `#0D0C1D`, crimson accent `#D9234C`. Small text uses `#C21B42` on light and `#FF6B86` on dark to stay AA-compliant. | It ties the site to pixelpk.com's navy and pink-red CTA gradient, keeps it distinct from anasw.com's orange, and passes contrast checks. |
| V4 | **Type:** Archivo variable (width and weight axes) does both jobs, condensed black for display and normal width for text. Instrument Serif italic is the accent and JetBrains Mono the labels, not preloaded. Anton appears only in generated OG images. | One family keeps the site cohesive and formal. Satori, the OG renderer, can't use variable axes. Not preloading the mono font saved bandwidth on the LCP path. |
| V5 | **The portfolio is imported from pixelpk.com/case-studies**: all 16 case studies, with their text, figures and images as Pixelpk publishes them (`src/content/work.ts`, generated once and editable by hand). Each `/work/<slug>` page sets its canonical URL to the pixelpk.com case study and links to it. | You said to take the portfolio from pixelpk.com. The canonical link avoids duplicate-content problems between the two sites. |
| V6 | **Case-study artwork is used as published.** These are Pixelpk's own device-mockup compositions, shown in rounded panels with no extra CSS frames. **Venture screenshots were captured from the live sites** (1440×900 desktop, 390×844 @2× mobile) and shown in CSS browser and phone frames. | Real screens, no fake mockups and no double frames. |
| V7 | **Pixelpk figures, testimonials and the Clutch rating come from pixelpk.com.** That's 50+ team, 1,000+ projects, 5+ countries and 16 case studies, four client quotes, and "Rated 4.9/5 on Clutch". Each is shown with a source note and can be turned off in `site.ts` (`flags.pixelpkFigures`, `flags.testimonials`, `proofPoints`). | Ahmed's company publishes them itself. They're attributed and easy to switch off. |
| V8 | **Ahmed's title stays "Founder & CEO" (from the brief)** in config, and the prose says "one of the founders". | pixelpk.com/team lists **two founders**: Syed Anas Waqar ("Founder · Director, Development") and Ahmed Musab ("Founder · Director, Marketing"). anasw.com says Syed Anas founded Pixelpk and Pakistan LawBot. This conflict is flagged in CONTENT-TO-CONFIRM.md rather than resolved by me. |
| V9 | **Aivastark appears only as a Pixelpk case study** ("Our product · AI agents"), not as Ahmed's venture (`flags.aivastark` is off). | pixelpk.com publishes it as Pixelpk's work. Ahmed's personal role in it isn't confirmed. |
| V10 | **Network access:** a personal environment "musab149" was created with your approval. It allows anasw.com, pixelpk.com and pakistanlawbot.com, and its setup script runs `npm ci`. | Those sites were blocked in the shared Default environment. The setup script is unproven until a fresh session starts on that environment. |

### Layout and interaction

| # | Decision | Why |
|---|---|---|
| L1 | **Homepage sequence:** hero → ticker → Pixelpk figures → 01 Roles → 02 Ventures (dark) → 03 Work → 04 Services → 05 Process → 06 AI lab → 07 About → 08 Culture (dark) → 09 Clients → 10 FAQ → 11 Contact (dark, joined to the footer). Indices are generated from a list, so they stay continuous if a section is switched off. | It follows the reference's narrative while keeping your sequence and symmetry rules. |
| L2 | **Dark chapters are inset rounded panels** (`.chapter-dark`). The contact panel and footer read as one dark block (CSS `:has()`). | That's how the reference handles its product and contact chapters, and it looks considered. |
| L3 | **The hero name sits on one line from 1280px up** (`clamp(…13.25rem)`). The credential card sits below the name rather than over it. | With an 11-letter name, the reference's overlap hid "AB". |
| L4 | **The roles accordion** expands on hover (140ms intent delay), click or Enter, animated with the View Transitions API. Each card keeps one stable button so keyboard focus survives. On mobile and tablet all four cards stack fully open. | It's the reference's signature interaction without animating layout properties, and it stays accessible. |
| L5 | **Venture cards stack** as sticky siblings. The card underneath recedes through a CSS scroll-driven animation bound to a marker before the next card (`timeline-scope`). Without support, the cards simply stack. | No JavaScript, and a graceful fallback. |
| L6 | **Work:** six featured projects in a 2×3 grid on the homepage. `/work` shows all 16 with data-driven filter chips that reflow through View Transitions. Case studies run: hero facts → figures → brief and objectives → what we built (dark) → how it works and the architecture → product tour → challenges → stack → next project. | You asked for a well-presented portfolio, and a two-column grid keeps the artwork large. |
| L7 | **The AI lab** pairs the illustrative terminal with three principles, then **real flows** from four AI products in the portfolio (LawBot, Aivastark, Khurshid Answers, Ask Maududi). The flows are built from each case study's "How it works" steps, and the nodes light up in sequence. | It's truthful: real products and real steps, with the terminal clearly labelled illustrative. |
| L8 | **Removed from v1:** the Expertise grid (replaced by Pixelpk's nine services), the separate Philosophy section (now a quote in About), the separate status strip (folded into the hero status line), the homepage Insights section (no published articles; `/insights` remains with an honest empty state), and the dev-only work preview fixtures. | Fewer, stronger sections, with real data throughout. |
| L9 | **Nav:** five numbered items (Work, Ventures, Services, AI lab, About) plus "Let's talk". Insights and Contact live in the menu and footer. | It mirrors the reference's numbered pill nav and fits on one line. |

### Performance and accessibility

| # | Decision | Why |
|---|---|---|
| P1 | LCP images use `loading="eager"` and `fetchPriority="high"`. | Next 16 deprecated `priority`, and its preload didn't raise fetch priority. |
| P2 | Venture heroes carry their figures in the text column, and `/work` opens with a figure row computed from the data. | On phones, a partly visible screenshot had been the LCP element (3.3s simulated). The text column now paints first (0.9s). |
| P3 | Logo `<Image>`s get a real `sizes`. | They were downloading 1920px variants for 36px-tall logos. |
| P4 | Muted text on the crimson role card is solid white. | Translucent white failed contrast (Accessibility 97 → 100). |

## Version 1 decisions that still apply

| # | Decision | Why |
|---|---|---|
| D1 | The repo's original files (an unrelated clinic prototype) live in `legacy/alkhidmat-clinic/`. | Nothing was deleted, and it still runs from there. |
| D2 | Photos come from Ahmed's Google Drive folder (originals in `assets/source/`), optimised into `public/images/`, with EXIF stripped and a dark edge row cropped from two of them. | Real photos, published privately and safely. |
| D3 | Versions: Next 16.4.5, React 19.3, TypeScript 5.9, ESLint 9, Tailwind 4.3, Motion 14. `cacheComponents` is off. | These are the versions the Next template pins together. The site is fully static, and Cache Components rejects empty `generateStaticParams`. |
| D4 | The shared reveal is a server `Reveal` wrapper plus one global `RevealObserver`. Signature effects use CSS where possible (marquee, scroll-driven recede, process fill, parallax). | It keeps total blocking time low. |
| D5 | Under reduced motion, everything is instant and static: no marquee, the terminal shows its final text and the flow diagrams are fully lit. | Brief §6.5, verified by `scripts/qa.mjs`. |
| D6 | Contact form: one shared Zod schema, a honeypot, a 3-second minimum, optional Turnstile, and Upstash or in-memory rate limiting. Resend runs through `/api/contact`, which returns 200 only when Resend accepts the message; otherwise 503, 502, 429 or 400. | No false success, ever. |
| D7 | Header, button and footer links prefetch on intent (hover, focus or touch) rather than on entering the viewport. | Viewport prefetching downloaded every route's JavaScript during page load. |
| D8 | The canonical base URL is `NEXT_PUBLIC_SITE_URL`, then Vercel's production URL, then localhost. Every page gets its own OG image from one renderer. | No hard-coded domain until it's confirmed. |
