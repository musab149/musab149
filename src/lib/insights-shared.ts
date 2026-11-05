/** Client-safe insight types and helpers (no filesystem access). */

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  image?: string;
  imageAlt?: string;
  draft: boolean;
  readingMinutes: number;
};

export function formatDate(iso: string) {
  if (!iso) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );
}
