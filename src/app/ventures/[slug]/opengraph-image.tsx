import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { ventures, getVenture } from "@/content/ventures";

export const alt = "Venture by Ahmed Musab";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const v = getVenture(slug);
  return renderOg({
    eyebrow: v ? `${v.role} · ${v.category}` : "Venture",
    title: v ? `${v.name}\n*${v.tagline.replace(/\.$/, "")}*` : "Ventures",
  });
}
