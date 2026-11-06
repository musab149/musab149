import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Case studies from Pixelpk Technologies";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Work · 16 case studies", title: "Case\n*studies*." });
}
