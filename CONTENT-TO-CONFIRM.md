# Content to confirm

What Ahmed needs to **decide**, **supply** or **check** before launch. Each item names the file where the value lives.

Legend: 🔴 decide or supply before launch · 🟡 check imported or drafted copy · 🟢 nice to have

---

## 1. 🔴 Titles and founder claims: please decide

Three public sources describe the same companies differently:

| Source | What it says |
|---|---|
| **The brief** (used on this site) | Ahmed Musab: "Founder & CEO, Pixelpk Technologies"; "leads" Pakistan LawBot |
| **pixelpk.com/team** | "Two founders": **Syed Anas Waqar**, Founder · Director, Development; **Ahmed Musab**, Founder · Director, Marketing ("leads marketing and growth") |
| **anasw.com** (Syed Anas's site) | Syed Anas "founded Pixelpk Technologies" (2018), "Pixelpk acquired by Innostark, 2023", and is "Founder & Product Owner" of Pakistan LawBot |

On this site:
- The **title** reads "Founder & CEO, Pixelpk Technologies" (`site.jobTitle` in `src/content/site.ts`, as supplied in the brief).
- The **prose** says "one of the founders of Pixelpk", which is consistent with all three sources.
- The Pixelpk venture card shows the role "**Founder**". The Pakistan LawBot card shows "**Lead**" (`role` in `src/content/ventures.ts`).
- The **Founder** role card uses Pixelpk's own description of Ahmed's job: strategy, brand, marketing and growth.

**Please confirm** the exact title you want, for example "Co-founder & CEO" or "Founder · Director, Marketing", and your title at Pakistan LawBot. Visitors may well compare this site with pixelpk.com and anasw.com.

Not used anywhere: the Innostark acquisition, and anasw.com's LawBot user and revenue figures (14K users, 500+ paying). Tell me if any of these should appear.

## 2. 🔴 Links · `src/content/site.ts`

| Item | Field | Appears in |
|---|---|---|
| LinkedIn | `links.linkedin` | Contact panel, footer, contact page, JSON-LD |
| Email | `links.email` | Footer, contact page, form fallback message |
| Booking link | `links.booking` | Contact panel and contact page |
| GitHub, X, YouTube | `links.github`, `links.x`, `links.youtube` | Footer "Elsewhere", contact page |

All of these are empty, so the buttons are hidden.

## 3. 🟡 Imported from pixelpk.com: please check

| What | Where | Notes |
|---|---|---|
| **16 case studies**: text, figures and images | `src/content/work.ts`, `public/images/work/` | Imported as Pixelpk publishes them, including client names (AITube Inc., KIXX, Riphah, Ummah College and others) and figures such as "10K+ Google Play downloads" (AITube). Each page links to the pixelpk.com original, which is also its canonical URL. Confirm you're happy to republish them, and that every client is fine being named. |
| **Pixelpk figures**: 50+ team, 1,000+ projects, 5+ countries, 16 case studies | `pixelpkFigures` in `site.ts`; Pixelpk venture card | Shown with a note: "as published on pixelpk.com". Turn off with `flags.pixelpkFigures`. |
| **Pakistan LawBot figures**: 600+ API endpoints, 26 practice areas, 13 AI-drafted document types, 20 MCP tools | `ventures.ts` | From Pixelpk's LawBot case study. |
| **Four client testimonials** (Phares Abed, Alae Amraoui, Mark Javed, Abdullah Mudassir) | `src/content/testimonials.ts` | Labelled "Pixelpk client", with a source link. Wording is unchanged; spaces before punctuation and one all-caps phrase were normalised. Confirm permission to show them on your personal site. Turn off with `flags.testimonials`. |
| **"Rated 4.9/5 on Clutch"** | `proofPoints` in `site.ts` (`confirmed: true`) | Stated on pixelpk.com. Links to Clutch. |
| **The nine services and three engagement models** | `src/content/services.ts` | Pixelpk's wording. Each links to the matching pixelpk.com page. |
| **Toolbox** | `src/content/ai.ts` | Pixelpk's published tech stack, plus n8n and MCP from the brief, plus Anthropic and React Native (used in the case studies). |
| **Aivastark** | Shown as a Pixelpk case study only | To show it as one of *your* ventures, confirm your role and set `flags.aivastark`. |

## 4. 🟡 Drafted copy: please review

- **Homepage** (`src/content/home.ts`):
  - The sentence "I build *AI products* and the companies that ship them." (from the brief)
  - The roles intro and each role's detail line and chips
  - The Ventures, Work and Services intros, and the five process steps
  - The AI lab intro, and the contact panel text
- **AI lab** (`src/content/ai.ts`):
  - The three principles ("Grounded in sources", "Built into the workflow", "People stay in the loop")
  - The illustrative terminal run (generic; no real data)
  - The engagement steps and the AI FAQ
- **About** (`src/content/about.ts`):
  - The intro paragraph, the quote "Build with *purpose*. Execute with clarity." (from the brief) and the facts list
  - The three story chapters. The "Engineer" chapter's second sentence is an inference, so please confirm or edit it.
- **Ventures** (`src/content/ventures.ts`): the taglines ("Let's grow digitally." is Pixelpk's own slogan; "Legal help, in English and Urdu." is drafted), plus each venture's problem, approach and "my role" text.
- **FAQ** (`src/content/faq.ts`): six answers, written from confirmed facts.
- **Privacy notice** (`src/app/privacy/page.tsx`): check it against your real Resend, Turnstile and Upstash setup and any legal requirements.

## 5. 🟡 Photos · `src/content/culture.ts`

- **Consent** from the team members in the group photos.
- **Identification:** Ahmed is named in the alt text of these photos. I identified him from his portrait and headshot, so please check each one:
  - On stage at the annual lunch
  - The plaque presentation
  - The Pakistan LawBot event
  - Welcoming a guest
  - The mountain photo
  - "In Pixelpk colours"
- The colleague beside Ahmed in some photos isn't named.

## 6. 🟢 Still useful

- **Dated career milestones** (`src/content/about.ts`, `timeline`). The timeline stays hidden while the list is empty.
- **Unconfirmed proof points** (`site.ts`): Stanford CodeX TechIndex and the Product Hunt launch. Set `confirmed: true` to show them.
- **Domain:** confirm ahmedmusab.com and DNS, then set `NEXT_PUBLIC_SITE_URL`.
- **Contact form:** the Resend keys (see README).
- **A newsletter provider** (`flags.newsletter`), if you want a "Get notified" capture.
