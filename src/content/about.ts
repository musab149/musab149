/**
 * about.ts — the About section and /about page. Confirmed facts only: the
 * brief, plus the Pixelpk team page (pixelpk.com/team). No dates are published
 * until Ahmed supplies them (timeline stays hidden while empty).
 */

import { photos } from "./culture";

export const aboutIntro =
  "I'm a software engineer by background who became a founder. I'm one of the founders of Pixelpk Technologies in Lahore, where I lead strategy, brand and growth while our team builds AI agents, LLM products and the software around them for clients in five countries. I also lead Pakistan LawBot, our AI legal platform for Pakistani law.";

export const aboutQuote = "Build with *purpose*. Execute with clarity.";

export const aboutFacts = [
  { k: "Background", v: "Software engineering" },
  { k: "Company", v: "Pixelpk Technologies · founder" },
  { k: "At Pixelpk", v: "Strategy, brand & growth" },
  { k: "Product", v: "Pakistan LawBot · lead" },
  { k: "Based in", v: "Lahore, Pakistan" },
  { k: "Now", v: "AI agents & LLM products" },
] as const;

export const aboutPhotos = {
  main: photos.headshot,
  second: photos.annualLunchStage,
} as const;

/** About page story, in three chapters. */
export const story = {
  title: "From *engineer* to founder to AI builder.",
  intro: "Engineer by background. Entrepreneur by ambition.",
  chapters: [
    {
      kicker: "Engineer",
      title: "It started with software.",
      body: [
        "I'm a software engineer by background. Engineering taught me to break big problems into small, shippable pieces, and to judge work by whether it actually runs.",
      ],
    },
    {
      kicker: "Founder",
      title: "Then we built a company around it.",
      body: [
        "Pixelpk Technologies is the AI and software company I helped found in Lahore. At Pixelpk I lead marketing and growth, from strategy and brand to the campaigns and content that bring clients to the company.",
        "Today the team builds AI agents, mobile apps, SaaS platforms, cloud and Microsoft solutions for clients in Pakistan, the Gulf, the UK, the US and Australia.",
      ],
    },
    {
      kicker: "AI builder",
      title: "Now we ship AI products of our own.",
      body: [
        "I lead Pakistan LawBot, Pixelpk's AI legal platform for Pakistani law: research with cited judgments, AI drafting, document analysis and a verified-lawyer marketplace, in English and Urdu.",
      ],
    },
  ],
} as const;

export type TimelineItem = { date: string; title: string; body?: string };

/** Verified, dated milestones. Empty → the timeline block is hidden. */
export const timeline: TimelineItem[] = [];
