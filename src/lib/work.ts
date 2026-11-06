import { projects, tagOrder, type Project, type Tag, type WorkImage } from "@/content/work";

/** All projects in display order. */
export const allProjects: Project[] = [...projects].sort((a, b) => a.order - b.order);

export function featuredProjects(limit = 6) {
  return allProjects.filter((p) => p.featured).slice(0, limit);
}

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug);
}

export function nextProject(slug: string) {
  const i = allProjects.findIndex((p) => p.slug === slug);
  if (i === -1) return undefined;
  return allProjects[(i + 1) % allProjects.length];
}

/** Filter tags that actually occur, in the canonical order. */
export function projectTags(list: Project[] = allProjects): Tag[] {
  const present = new Set(list.flatMap((p) => p.tags));
  return tagOrder.filter((t) => present.has(t));
}

export function heroImage(p: Project): WorkImage {
  return p.images.find((i) => i.kind === "hero") ?? p.images[0];
}

/** Light shape passed to client components (keeps the RSC payload small). */
export type ProjectCardData = {
  slug: string;
  name: string;
  kicker: string;
  category: string;
  summary: string;
  tags: Tag[];
  tint: string;
  highlights: { value: string; label: string }[];
  image: WorkImage;
};

export function toCard(p: Project): ProjectCardData {
  return {
    slug: p.slug,
    name: p.name,
    kicker: p.kicker,
    category: p.category,
    summary: p.summary,
    tags: p.tags,
    tint: p.tint,
    highlights: p.highlights,
    image: heroImage(p),
  };
}
