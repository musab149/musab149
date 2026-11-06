import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { venturesSection } from "@/content/home";

export const alt = "Ventures — companies Ahmed Musab is building";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image() {
  return renderOg({ eyebrow: "Ventures", title: venturesSection.title });
}
