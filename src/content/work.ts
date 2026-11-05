/**
 * work.ts — Pixelpk portfolio / case studies.
 *
 * STATUS: empty on purpose. The portfolio on pixelpk.com could not be reached
 * from the build environment, and nothing here may be invented. Add projects
 * from pixelpk.com (or from Ahmed) using the shape below.
 *
 * How to add a project:
 *  1. Put its screenshots in /public/images/work/<slug>/ (from Pixelpk's own site).
 *  2. Append an object to `projects` below.
 *  3. Set `featured: true` on the strongest six for the homepage stack.
 *  Its card, filters, /work/<slug> page, sitemap entry and OG image are generated.
 *
 * Client names: if Ahmed has not confirmed permission to name a client, use an
 * anonymised `clientLabel` (e.g. "UK fintech start-up") and set
 * `clientNamePending: true`. Only state an `outcome` that pixelpk.com or Ahmed
 * actually states — otherwise leave it out and it stays hidden.
 */

export type Platform = "Web" | "iOS" | "Android" | "Flutter" | "AI" | "Desktop" | "API";

export type WorkImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Which CSS device frame to present the screenshot in. */
  frame: "browser" | "phone";
};

export type Project = {
  slug: string;
  title: string;
  clientLabel: string;
  clientNamePending?: boolean;
  industry: string;
  platforms: Platform[];
  /** Two lines max on cards. */
  summary: string;
  challenge: string;
  whatWeBuilt: string;
  aiOrTech: string[];
  /** Verified outcome only. Omit when not stated by pixelpk.com or Ahmed. */
  outcome?: string;
  images: WorkImage[];
  liveUrl?: string;
  year?: string;
  featured: boolean;
};

export const projects: Project[] = [
  // Example shape (do not uncomment without real, confirmed content):
  // {
  //   slug: "telehealth-platform",
  //   title: "Telehealth platform",
  //   clientLabel: "UK healthcare start-up",
  //   clientNamePending: true,
  //   industry: "Healthcare",
  //   platforms: ["Web", "iOS", "Android"],
  //   summary: "…",
  //   challenge: "…",
  //   whatWeBuilt: "…",
  //   aiOrTech: ["…"],
  //   images: [{ src: "/images/work/telehealth-platform/home.jpg", width: 1600, height: 1000, alt: "…", frame: "browser" }],
  //   liveUrl: "https://…",
  //   featured: true,
  // },
];
