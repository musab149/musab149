import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { getInsights, getInsight } from "@/lib/insights";

export const alt = "Article by Ahmed Musab";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return getInsights().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getInsight(slug);
  return renderOg({ eyebrow: p ? `Insights · ${p.category}` : "Insights", title: p ? p.title : "Insights" });
}
