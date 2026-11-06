import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { hero } from "@/content/home";

export const alt = "Ahmed Musab — I build AI products and the companies that ship them.";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Founder · AI specialist", title: hero.sentence });
}
