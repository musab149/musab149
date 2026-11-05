/**
 * site.ts — the single place for links, contact details and feature flags.
 *
 * RULE: anything that is empty ("") or `confirmed: false` is never rendered.
 * Fill a value in and the matching button, link or block appears automatically.
 * Nothing in this file is shown as placeholder text in production.
 */

export const site = {
  name: "Ahmed Musab",
  shortName: "AM",
  /** Used in titles, JSON-LD and the footer. */
  jobTitle: "Founder & CEO, Pixelpk Technologies",
  role: "Founder & AI specialist",
  description:
    "Ahmed Musab is the founder and CEO of Pixelpk Technologies and the lead behind Pakistan Law Bot. He designs and ships AI agents, LLM-powered products and the software around them.",
  location: "Lahore, Pakistan",
  timeZone: "Asia/Karachi",
  timeZoneLabel: "PKT",
  locale: "en_GB",
  /**
   * Canonical base URL. Comes from NEXT_PUBLIC_SITE_URL so the Vercel preview
   * URL can be used until ahmedmusab.com ownership and DNS are confirmed.
   */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),
  themeColor: "#17191D",
} as const;

/**
 * Contact and profile links (Section 3.3 of the brief).
 * Leave a value empty to hide every button/link that uses it.
 */
export const links = {
  linkedin: "", // e.g. "https://www.linkedin.com/in/…"
  email: "", // e.g. "hello@ahmedmusab.com"
  booking: "", // e.g. "https://cal.com/…" or Calendly
  github: "", // personal GitHub profile URL
  x: "", // e.g. "https://x.com/…"
  youtube: "",
} as const;

export type ProfileKey = keyof typeof links;

export const profileLabels: Record<ProfileKey, string> = {
  linkedin: "LinkedIn",
  email: "Email",
  booking: "Book a call",
  github: "GitHub",
  x: "X",
  youtube: "YouTube",
};

/** Profiles that are configured, in display order. Email is handled separately. */
export function configuredProfiles() {
  const order: ProfileKey[] = ["linkedin", "github", "x", "youtube"];
  return order
    .filter((key) => Boolean(links[key]))
    .map((key) => ({ key, label: profileLabels[key], href: links[key] }));
}

export const flags = {
  /** Show the "Get notified" newsletter capture. Requires a provider; none is wired yet. */
  newsletter: false,
  /** Add Aivastark as a third venture (needs description + URL in ventures.ts). */
  aivastark: false,
  /** Status strip availability badge on the homepage. */
  availability: true,
} as const;

/** Primary navigation (header + mobile menu + footer "Explore"). */
export const nav = [
  { label: "About", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Work", href: "/work" },
  { label: "AI", href: "/ai" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
] as const;

/** Status strip under the header (homepage only). */
export const statusStrip = {
  availability: "Open to AI builds & partnerships",
  roles: ["Founder", "AI specialist", "Product builder", "Team lead"],
} as const;

/**
 * Public proof points (Section 3.2). Each stays hidden until Ahmed confirms it
 * by setting `confirmed: true`. Every one links to its public source.
 */
export type ProofPoint = {
  id: string;
  label: string;
  short: string;
  source: string;
  sourceLabel: string;
  venture: "pixelpk-technologies" | "pakistan-law-bot";
  confirmed: boolean;
};

export const proofPoints: ProofPoint[] = [
  {
    id: "clutch",
    label: "Pixelpk rated 4.9/5 on Clutch from 7 verified reviews",
    short: "4.9/5 on Clutch",
    source: "https://clutch.co/go-to-review/pixelpk-technologies/7292",
    sourceLabel: "Clutch",
    venture: "pixelpk-technologies",
    confirmed: false,
  },
  {
    id: "manifest-founded",
    label: "Pixelpk founded in 2018 (per The Manifest)",
    short: "Founded 2018",
    source: "https://themanifest.com/company/pixelpk-technologies",
    sourceLabel: "The Manifest",
    venture: "pixelpk-technologies",
    confirmed: false,
  },
  {
    id: "stanford-codex",
    label: "Pakistan Law Bot is listed on the Stanford CodeX TechIndex",
    short: "Listed on Stanford CodeX TechIndex",
    source: "https://techindex.law.stanford.edu/companies/pakistan-law-bot",
    sourceLabel: "Stanford CodeX",
    venture: "pakistan-law-bot",
    confirmed: false,
  },
  {
    id: "product-hunt",
    label: "Pakistan Law Bot launched on Product Hunt, including its MCP server for Claude",
    short: "Launched on Product Hunt",
    source: "https://www.producthunt.com/products/pakistan-law-bot",
    sourceLabel: "Product Hunt",
    venture: "pakistan-law-bot",
    confirmed: false,
  },
  {
    id: "github-org",
    label: "Pixelpk on GitHub",
    short: "Pixelpk on GitHub",
    source: "https://github.com/Pixelpk",
    sourceLabel: "GitHub",
    venture: "pixelpk-technologies",
    confirmed: false,
  },
];

export function confirmedProofPoints(venture?: string) {
  return proofPoints.filter((p) => p.confirmed && (!venture || p.venture === venture));
}
