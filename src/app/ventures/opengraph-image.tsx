import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Ventures — companies and products Ahmed Musab is building";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Ventures", title: "Companies and products *I'm building*." });
}
