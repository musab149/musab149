"use client";

import { useState } from "react";
import type { InsightMeta } from "@/lib/insights-shared";
import { InsightCard } from "./InsightCard";
import { cn } from "@/lib/cn";

/** Category filter + grid for /insights. */
export function InsightsBrowser({ posts }: { posts: InsightMeta[] }) {
  const cats = Array.from(new Set(posts.map((p) => p.category))).sort();
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <div>
      {cats.length > 1 && (
        <div role="group" aria-label="Filter by category" className="mb-12 flex flex-wrap gap-2">
          {["All", ...cats].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === cat}
              onClick={() => setCat(c)}
              className={cn(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-medium transition-colors",
                c === cat ? "border-fg bg-fg text-surface" : "border-line text-fg hover:border-line-strong",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      )}
      <ul className="grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((p) => (
          <li key={p.slug}>
            <InsightCard post={p} />
          </li>
        ))}
      </ul>
    </div>
  );
}
