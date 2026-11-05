/**
 * DEV-ONLY design fixtures. Never rendered in production (see src/lib/work.ts).
 * Every field is obviously a placeholder so a screenshot can't be mistaken for
 * real client work.
 */
import type { Project } from "./work";

const shot = (slug: string, frame: "browser" | "phone") => ({
  src: frame === "browser" ? "/images/culture-team-lunch.jpg" : "/images/pixelpk-team-colours.jpg",
  width: frame === "browser" ? 1600 : 1500,
  height: frame === "browser" ? 668 : 2000,
  alt: `Placeholder image for ${slug}`,
  frame,
});

const make = (n: number, industry: string, frame: "browser" | "phone"): Project => ({
  slug: `sample-project-${n}`,
  title: `Sample project ${String(n).padStart(2, "0")}`,
  clientLabel: "Sample client",
  clientNamePending: true,
  industry,
  platforms: frame === "browser" ? ["Web", "AI"] : ["iOS", "Android"],
  summary:
    "Design-preview placeholder. Replace with a real project from pixelpk.com before publishing anything.",
  challenge: "Placeholder challenge text.",
  whatWeBuilt: "Placeholder description of what was built.",
  aiOrTech: ["Placeholder"],
  images: [shot(`sample-project-${n}`, frame)],
  featured: true,
});

export const previewProjects: Project[] = [
  make(1, "Sample industry A", "browser"),
  make(2, "Sample industry B", "phone"),
  make(3, "Sample industry A", "browser"),
  make(4, "Sample industry C", "phone"),
  make(5, "Sample industry B", "browser"),
  make(6, "Sample industry C", "browser"),
];
