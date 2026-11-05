import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { aiLab } from "@/content/home";

export const alt = "Ahmed Musab's AI practice — agents, retrieval, fine-tuning and automation";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "AI practice", title: aiLab.title });
}
