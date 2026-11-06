import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { allProjects, getProject } from "@/lib/work";

export const alt = "Case study from Pixelpk Technologies";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  return renderOg({ eyebrow: p ? `Case study · ${p.category}` : "Case study", title: p ? `${p.name}\n*${p.kicker}*` : "Work" });
}
