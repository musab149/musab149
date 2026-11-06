import { renderOg, ogSize, ogContentType } from "@/lib/og";

export const alt = "About Ahmed Musab";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "About", title: "Hi, I'm\n*Ahmed*." });
}
