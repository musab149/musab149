import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { story } from "@/content/timeline";

export const alt = "About Ahmed Musab — from engineer to founder to AI builder";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "About", title: story.title });
}
