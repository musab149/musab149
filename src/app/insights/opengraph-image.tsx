import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Insights by Ahmed Musab";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Insights", title: "Latest\n*writing*." });
}
