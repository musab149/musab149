import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { workSection } from "@/content/home";

export const alt = "Selected work from Pixelpk Technologies";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Work", title: workSection.title });
}
