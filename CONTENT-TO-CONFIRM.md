# Content to confirm

Everything Ahmed needs to **supply**, **confirm** or **review** before launch. Each item names the file where the value lives.

Legend: 🔴 blocks a feature (hidden until supplied) · 🟡 drafted copy to review · 🟢 nice to have

---

## 1. Links and contact details · `src/content/site.ts`

| | Item | Field | Effect when filled |
|---|---|---|---|
| 🔴 | LinkedIn profile URL | `links.linkedin` | "Connect on LinkedIn" button, footer, contact page, JSON-LD `sameAs` |
| 🔴 | Contact email | `links.email` | Footer, contact page, privacy page, form fallback ("Please email me directly at…") |
| 🔴 | Booking link (Calendly or similar) | `links.booking` | "Book a call" button in the contact CTA and on the contact page |
| 🟢 | GitHub, X, YouTube | `links.github`, `links.x`, `links.youtube` | Footer "Elsewhere", contact page, `sameAs` |

## 2. Facts to confirm

| | Item | Where | Current state |
|---|---|---|---|
| 🔴 | **Exact role at Pakistan Law Bot** (Founder / Co-founder / Product Lead / …) | `src/content/ventures.ts` → `role` | Shows **"Lead"**, from the confirmed fact that Ahmed leads it |
| 🔴 | **Career milestones with dates** for the About timeline | `src/content/timeline.ts` → `timeline` | Empty, so the timeline is hidden |
| 🔴 | **Aivastark**: include as a third venture? Needs description, URL and role | `src/content/site.ts` → `flags.aivastark`, plus `src/content/ventures.ts` | Hidden |
| 🔴 | **Toolbox**: confirm n8n, MCP and Flutter, and add any others | `src/content/ai.ts` → `toolbox` | Shows n8n, MCP, Flutter |
| 🟢 | Testimonials (real, with permission and attribution) | none yet | No testimonials component is shown |
| 🟢 | Newsletter provider (optional) | `flags.newsletter` | Off |

### Public proof points: set `confirmed: true` to show each one · `src/content/site.ts` → `proofPoints`

| Proof point | Source |
|---|---|
| Pixelpk rated 4.9/5 on Clutch from 7 verified reviews | https://clutch.co/go-to-review/pixelpk-technologies/7292 |
| Pixelpk founded in 2018 (per The Manifest) | https://themanifest.com/company/pixelpk-technologies |
| Pakistan Law Bot listed on Stanford CodeX TechIndex | https://techindex.law.stanford.edu/companies/pakistan-law-bot |
| Pakistan Law Bot launched on Product Hunt, including its MCP server for Claude | https://www.producthunt.com/products/pakistan-law-bot |
| Pixelpk GitHub organisation | https://github.com/Pixelpk |

Confirmed proof points appear on the venture cards and on the venture detail pages under "Milestones", each linking to its source.

## 3. Assets still needed

| | Asset | Where it goes | Notes |
|---|---|---|---|
| 🔴 | **Pixelpk portfolio / case studies** | `src/content/work.ts` (+ images in `public/images/work/<slug>/`) | pixelpk.com was unreachable from the build environment, so nothing was extracted. For each project: `slug, title, clientLabel, industry, platforms[], summary, challenge, whatWeBuilt, aiOrTech[], outcome?, images[], liveUrl?, year?, featured`. Mark the six strongest as `featured: true`. |
| 🔴 | **Permission to name each client** | `clientLabel` / `clientNamePending` per project | Until confirmed, use an anonymised label such as "UK fintech start-up" |
| 🔴 | **Official logos** (SVG or high-res PNG) for Pixelpk and Pakistan Law Bot | `public/logos/` + `logo` field in `ventures.ts` | Typographic wordmarks are used until then |
| 🔴 | **Real product screenshots** of pixelpk.com and pakistanlawbot.com (web + app) | `screenshots[]` in `ventures.ts` | The device frames currently show real event photos |
| 🟢 | Pakistan Law Bot screen recording (muted loop + poster) | `terminalVideo` in `src/content/ai.ts` | Would replace the "Illustrative demo" terminal |
| 🟢 | Domain: confirm ownership/DNS of ahmedmusab.com | Vercel + `NEXT_PUBLIC_SITE_URL` | Canonical URLs use the Vercel URL until this is set |

## 4. Photos: confirm identification and consent · `src/content/culture.ts`

All 18 photos from the Drive folder are used. Please confirm:

- **Consent:** the team members who appear in group photos are happy for them to be published.
- **Identification:** Ahmed is named in the alt text of these photos. I identified him from the confirmed portrait and headshot, so please check each one:
  - `culture-annual-lunch-stage.jpg`: speaking on stage at the annual lunch
  - `culture-annual-lunch-recognition.jpg`: presenting a plaque with a colleague
  - `event-pakistan-law-bot.jpg`: centre, at the Pakistan Law Bot event
  - `event-welcoming-guest.jpg`: handing a bouquet to a guest
  - `culture-mountain-break.jpg`: seated in front of the snow-covered mountain
  - `pixelpk-team-colours.jpg`: left, in a maroon Pixelpk polo
- **Not identified:** `pixelpk-mountains.jpg` shows a person from behind. The caption says only "Pixelpk, out in the mountains".
- **Captions to review:** "Team trip to Kashmir" (taken from the file names), "Team trip to Fairy Meadows" (text printed on the photo), "Team trip" (×2, place unknown), "On the trail with the team", "Games & sports", "Annual team lunch", "Team lunch", "Team recognition at the annual lunch", "On stage at the annual lunch", "At a Pakistan Law Bot event", "Welcoming a guest at an event", "A pause in the mountains", "In Pixelpk colours".

## 5. Drafted copy to review (🟡)

Copy the brief supplied verbatim is not listed. Everything below was drafted to fill gaps, and every line is editable in the file shown.

### Homepage · `src/content/home.ts`
- **Hero headline:** "I build *AI products* and the companies that ship them." (from the brief). Alternatives:
  - "Building *intelligent* software that moves businesses forward."
  - "Founder. Engineer. *AI builder.*"
- **"Now" line:** "Now: building Pakistan Law Bot and AI agents at Pixelpk." (marked "confirm" in the brief)
- **Status strip availability:** "Open to AI builds & partnerships"
- **Role card detail lines (shown on hover):** "Company direction, partnerships and the long game." · "Grounded answers, measured honestly, people in the loop." · "Scope, ship, learn, repeat." · "Clear priorities and short feedback loops."
- **About facts list:** Based in / Background / Building
- **Expertise intro:** "What my teams and I bring to a product, from the first sketch to the release after next."
- **Expertise one-liners** (`src/content/expertise.ts`): "Software that is built to last past launch day." · "AI that retrieves, reasons and acts inside real workflows." · "Deciding what to build first, and what not to build." · "Teams and processes that keep shipping."
- **Process step explanations** (five one-sentence descriptions)
- **Work empty state:** "Case studies are being prepared for this site. Until they're published here, Pixelpk's own website is the place to see the team's work."
- **Footer one-liner:** "I design and ship AI agents, LLM-powered products and the software businesses around them."

### FAQ · `src/content/faq.ts` (answered only from confirmed facts)
1. What kind of AI work do you take on?
2. Do you work with international clients?
3. How does a project usually start?
4. Are you open to partnerships or investment conversations?
5. Where are you based, and what time zone?
6. What is Pakistan Law Bot?

### About · `src/content/timeline.ts`
- Page title "From *engineer* to founder to AI builder." and the three chapter texts (Engineer / Founder / AI builder). The Engineer chapter's second sentence ("Engineering taught me to break big problems into small, shippable pieces…") is an inference; please confirm it or reword it.
- "Beyond the desk" section: "Out from behind the *screen*." / "On stage with the team, at events, and in the mountains."

### Ventures · `src/content/ventures.ts`
- Per venture: `mission`, `problem`, `approach`, `ahmedsRole`, `technology[]`. The overviews restate confirmed facts; problem, approach and role are drafted.
- Venture page section titles: "What it *is*.", "Why it *exists*.", "How I'm *involved*.", "Also *building*."

### AI practice · `src/content/ai.ts`
- Capability detail lines, pipeline step descriptions, the four engagement steps (Discovery call → Proof of value → Build & integrate → Run & improve) and the four AI FAQ answers.
- Terminal demo script (generic, labelled illustrative).

### Contact, privacy, 404
- Contact form messages (success, not configured, error, rate limited) in `src/components/contact/ContactForm.tsx`.
- **Privacy notice** (`src/app/privacy/page.tsx`). It describes Resend, optional Turnstile and optional Upstash. Have it checked against your actual setup and any legal requirements before launch.
- 404 copy: "This page took a *wrong* turn."

### SEO
- Default meta description (`site.description` in `src/content/site.ts`) and per-page descriptions in each `page.tsx`.
