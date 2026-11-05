import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { ventures } from "@/content/ventures";
import { allProjects } from "@/lib/work";
import { getInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/about", "/ventures", "/work", "/ai", "/insights", "/contact", "/privacy"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.7,
  }));
  return [
    ...staticRoutes,
    ...ventures.map((v) => ({ url: `${site.url}/ventures/${v.slug}`, lastModified: now, priority: 0.8 })),
    ...allProjects.map((p) => ({ url: `${site.url}/work/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...getInsights()
      .filter((p) => !p.draft)
      .map((p) => ({ url: `${site.url}/insights/${p.slug}`, lastModified: new Date(p.updated ?? p.date), priority: 0.6 })),
  ];
}
