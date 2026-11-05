import { projects as published, type Project } from "@/content/work";
import { previewProjects } from "@/content/work.preview";

/**
 * Design preview: `WORK_PREVIEW=1 npm run dev` fills the work section with
 * clearly-labelled sample cards so the layout and motion can be reviewed
 * before real projects are added. It is ignored in production builds.
 */
const usePreview =
  process.env.NODE_ENV !== "production" &&
  process.env.WORK_PREVIEW === "1" &&
  published.length === 0;

export const allProjects: Project[] = usePreview ? previewProjects : published;
export const isWorkPreview = usePreview;

export function featuredProjects(limit = 6) {
  const featured = allProjects.filter((p) => p.featured);
  return (featured.length ? featured : allProjects).slice(0, limit);
}

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}

export function industries(list: Project[] = allProjects) {
  return Array.from(new Set(list.map((p) => p.industry))).sort();
}

export function nextProject(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  if (i === -1 || allProjects.length < 2) return undefined;
  return allProjects[(i + 1) % allProjects.length];
}
