# Lighthouse results (mobile)

Measured, not estimated. Lighthouse 13.6.0, mobile form factor, simulated throttling (Slow 4G, 4× CPU), against `next build && next start` on localhost in the build container. Run date: 2026-11-05.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | FCP | Report |
|---|---|---|---|---|---|---|---|---|---|
| Home (`/`) | 98 | 100 | 100 | 100 | 1.0 s | 0 | 180 ms | 1.0 s | [report](home.report.html) |
| Venture · Pakistan Law Bot (`/ventures/pakistan-law-bot`) | 98 | 100 | 100 | 100 | 2.1 s | 0 | 80 ms | 0.8 s | [report](ventures_pakistan-law-bot.report.html) |
| Venture · Pixelpk Technologies (`/ventures/pixelpk-technologies`) | 98 | 100 | 100 | 100 | 2.1 s | 0 | 120 ms | 0.8 s | [report](ventures_pixelpk-technologies.report.html) |
| Contact (`/contact`) | 100 | 100 | 100 | 100 | 0.8 s | 0 | 70 ms | 0.8 s | [report](contact.report.html) |

Targets (brief §12): Performance ≥ 90, Accessibility / Best practices / SEO ≥ 95, LCP < 2.5s, CLS < 0.1. All met in this run.

**History (same setup):**
- First audit: Home Performance **87** (TBT 500ms), SEO **92** on Home and venture pages (`link-text`: "Read more").
- After the server-side reveal, CSS-driven signatures and descriptive link text: Home 97–99, TBT 80–180ms, SEO 100.
- After intent-based prefetching: venture-page LCP dropped from 2.9s to 2.1s. Viewport prefetch had been downloading every route linked from the header during load.

INP is a field metric and cannot be measured in a lab run. TBT is the lab proxy. These are lab numbers from a container: re-run on the deployed Vercel URL (PageSpeed Insights) once DNS is live.
