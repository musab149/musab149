# Lighthouse results (mobile)

Measured, not estimated. Lighthouse 13.6.0, mobile form factor, simulated throttling (Slow 4G, 4× CPU), against `next build && next start` on localhost in the build container. Run date: 2026-11-06.

| Page | Performance | Accessibility | Best practices | SEO | LCP | CLS | TBT | FCP | Report |
|---|---|---|---|---|---|---|---|---|---|
| Home (`/`) | 98 | 100 | 100 | 100 | 1.1 s | 0 | 150 ms | 1.1 s | [report](home.report.html) |
| Venture · Pakistan LawBot (`/ventures/pakistan-lawbot`) | 100 | 100 | 100 | 100 | 0.9 s | 0 | 90 ms | 0.9 s | [report](ventures_pakistan-lawbot.report.html) |
| Venture · Pixelpk Technologies (`/ventures/pixelpk-technologies`) | 100 | 100 | 100 | 100 | 0.9 s | 0 | 70 ms | 0.9 s | [report](ventures_pixelpk-technologies.report.html) |
| Work (all case studies) (`/work`) | 100 | 100 | 100 | 100 | 0.9 s | 0 | 60 ms | 0.9 s | [report](work.report.html) |
| Case study · Pakistan LawBot (`/work/pakistan-lawbot`) | 100 | 100 | 100 | 100 | 0.9 s | 0 | 60 ms | 0.9 s | [report](work_pakistan-lawbot.report.html) |
| Contact (`/contact`) | 100 | 100 | 100 | 100 | 0.9 s | 0 | 70 ms | 0.9 s | [report](contact.report.html) |

Targets (brief §12): Performance ≥ 90, Accessibility / Best practices / SEO ≥ 95, LCP < 2.5s, CLS < 0.1. All met in this run.

**What changed during the redesign (same setup):**
- First run of the new design: venture pages LCP 3.3s (a partly-visible screenshot was the LCP element on phones), `/work` LCP 3.0s, Home accessibility 97 (muted text on the crimson role card), `/work` heading-order warning.
- Fixes: LCP images use `loading="eager"` + `fetchPriority="high"` (Next 16 deprecated `priority`), the mono font is no longer preloaded, logo images get a real `sizes`, venture heroes carry their figures in the text column (screenshot below the first screen on phones), `/work` opens with a data-driven figure row, solid white text on the crimson card, an `h2` before the case-study grid.

INP is a field metric and cannot be measured in a lab run; TBT is the lab proxy. These are lab numbers from a container — re-run on the deployed Vercel URL (PageSpeed Insights) once it is live.
