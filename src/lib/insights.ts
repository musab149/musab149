import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Insights are MDX files in src/content/insights. Frontmatter:
 *   title, description, date (YYYY-MM-DD), category, image? (/images/...), draft?
 * Drafts (draft: true) and files starting with "_" render in `next dev` only
 * and are never built for production.
 */

import type { InsightMeta } from "./insights-shared";
export type { InsightMeta } from "./insights-shared";
export { formatDate } from "./insights-shared";

export type Insight = InsightMeta & { body: string; headings: { depth: 2 | 3; text: string; id: string }[] };

const DIR = path.join(process.cwd(), "src/content/insights");
const showDrafts = process.env.NODE_ENV !== "production";

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_~[\]()]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function read(file: string): Insight {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx$/, "").replace(/^_/, "");
  const words = content.split(/\s+/).filter(Boolean).length;
  const headings = Array.from(content.replace(/```[\s\S]*?```/g, "").matchAll(/^(##|###)\s+(.+)$/gm)).map((m) => ({
    depth: (m[1].length as 2 | 3),
    text: m[2].trim(),
    id: slugify(m[2]),
  }));
  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    updated: data.updated ? String(data.updated) : undefined,
    category: String(data.category ?? "Notes"),
    image: data.image ? String(data.image) : undefined,
    imageAlt: data.imageAlt ? String(data.imageAlt) : undefined,
    draft: Boolean(data.draft) || file.startsWith("_"),
    readingMinutes: Math.max(1, Math.round(words / 220)),
    body: content,
    headings,
  };
}

function all(): Insight[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(read)
    .filter((p) => showDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsights(): InsightMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return all().map(({ body, headings, ...meta }) => meta);
}

export function getInsight(slug: string): Insight | undefined {
  return all().find((p) => p.slug === slug);
}

export function insightCategories() {
  return Array.from(new Set(getInsights().map((p) => p.category))).sort();
}
