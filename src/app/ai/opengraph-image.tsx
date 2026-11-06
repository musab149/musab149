import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { aiSection } from "@/content/home";

export const alt = "Ahmed Musab's AI lab";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "AI lab", title: aiSection.title });
}
