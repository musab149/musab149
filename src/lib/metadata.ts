import type { Metadata } from "next";
import { site } from "@/content/site";
import { plain } from "./cn";

/**
 * Per-page metadata. Open Graph / Twitter images come from the co-located
 * `opengraph-image.tsx` files, so they are not set here.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title?: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
}): Metadata {
  const t = title ? plain(title) : undefined;
  return {
    ...(t ? { title: t } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      siteName: site.name,
      locale: site.locale,
      title: t ? `${t} · ${site.name}` : `${site.name} · ${site.role}`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: t ? `${t} · ${site.name}` : `${site.name} · ${site.role}`,
      description,
    },
  };
}
