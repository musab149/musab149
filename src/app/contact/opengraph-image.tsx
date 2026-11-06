import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "Contact Ahmed Musab";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Contact", title: "Let's build\nthe *next* one." });
}
