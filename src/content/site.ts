/**
 * site.ts — the single place for identity, links, navigation and flags.
 *
 * RULE: anything empty ("") or `confirmed: false` is never rendered.
 * Fill a value in and the matching button, link or block appears.
 */

/**
 * Canonical base URL, in order of preference:
 * 1. NEXT_PUBLIC_SITE_URL (set this once ahmedmusab.com is confirmed),
 * 2. Vercel's production URL (provided automatically on Vercel builds),
 * 3. the current Vercel deployment URL, 4. localhost for local development.
 */
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const vercel = process.env.VERCEL_URL;
  const url = explicit || (vercelProd && `https://${vercelProd}`) || (vercel && `https://${vercel}`) || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

export const site = {
  name: "Ahmed Musab",
  shortName: "AM",
  /**
   * Title as supplied in the brief. Note: pixelpk.com/team lists Ahmed as
   * "Founder · Director, Marketing" — see CONTENT-TO-CONFIRM.md.
   */
  jobTitle: "Founder & CEO, Pixelpk Technologies",
  role: "Founder & AI specialist",
  description:
    "Ahmed Musab is a founder of Pixelpk Technologies and the lead behind Pakistan LawBot. He builds AI agents, LLM-powered products and the software businesses around them, from Lahore, Pakistan.",
  location: "Lahore, Pakistan",
  timeZone: "Asia/Karachi",
  timeZoneLabel: "PKT",
  locale: "en_GB",
  url: siteUrl(),
  themeColor: "#0D0C1D",
} as const;

/** Contact and profile links. Leave a value empty to hide everything that uses it. */
export const links = {
  linkedin: "", // e.g. "https://www.linkedin.com/in/…"
  email: "", // e.g. "hello@ahmedmusab.com"
  booking: "", // e.g. "https://cal.com/…"
  github: "",
  x: "",
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
  newsletter: false,
  /** Show the Aivastark case study as a venture (needs Ahmed's role confirmed). */
  aivastark: false,
  availability: true,
  /** Show the Pixelpk figures published on pixelpk.com (stats row, venture card). */
  pixelpkFigures: true,
  /** Show the client testimonials published on pixelpk.com. */
  testimonials: true,
} as const;

/** Primary navigation — numbered, like the section indices. */
export const nav = [
  { label: "Work", href: "/work" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/#services" },
  { label: "AI lab", href: "/ai" },
  { label: "About", href: "/about" },
] as const;

/** Status line in the hero. */
export const statusStrip = {
  availability: "Open to AI builds & partnerships",
  place: "Lahore · Remote",
  role: "Founder · Pixelpk",
} as const;

/**
 * Figures Pixelpk publishes about itself on pixelpk.com (home & case-study pages).
 * Shown with a source note; switch off with flags.pixelpkFigures.
 */
export const pixelpkFigures = [
  { value: "50", suffix: "+", label: "people on the Pixelpk team" },
  { value: "1,000", suffix: "+", label: "projects shipped by the team" },
  { value: "5", suffix: "+", label: "countries served" },
  { value: "16", suffix: "", label: "published case studies" },
] as const;

export const pixelpkSource = "https://pixelpk.com/";

/**
 * Public proof points. Each stays hidden until Ahmed confirms it
 * (`confirmed: true`). Every one links to its public source.
 */
export type ProofPoint = {
  id: string;
  label: string;
  short: string;
  source: string;
  sourceLabel: string;
  venture: "pixelpk-technologies" | "pakistan-lawbot";
  confirmed: boolean;
};

export const proofPoints: ProofPoint[] = [
  {
    id: "clutch",
    label: "Pixelpk rated 4.9/5 on Clutch",
    short: "4.9/5 on Clutch",
    source: "https://clutch.co/go-to-review/pixelpk-technologies/7292",
    sourceLabel: "Clutch",
    venture: "pixelpk-technologies",
    confirmed: true, // stated on pixelpk.com ("Rated 4.9/5 on Clutch")
  },
  {
    id: "stanford-codex",
    label: "Pakistan LawBot is listed on the Stanford CodeX TechIndex",
    short: "Listed on Stanford CodeX TechIndex",
    source: "https://techindex.law.stanford.edu/companies/pakistan-law-bot",
    sourceLabel: "Stanford CodeX",
    venture: "pakistan-lawbot",
    confirmed: false,
  },
  {
    id: "product-hunt",
    label: "Pakistan LawBot launched on Product Hunt, including its MCP server",
    short: "Launched on Product Hunt",
    source: "https://www.producthunt.com/products/pakistan-law-bot",
    sourceLabel: "Product Hunt",
    venture: "pakistan-lawbot",
    confirmed: false,
  },
];

export function confirmedProofPoints(venture?: string) {
  return proofPoints.filter((p) => p.confirmed && (!venture || p.venture === venture));
}
