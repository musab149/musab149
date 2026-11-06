"use client";

import { startTransition, useState, ViewTransition } from "react";
import type { ProjectCardData } from "@/lib/work";
import type { Tag } from "@/content/work";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/cn";

/**
 * The full portfolio: filter chips (generated from the data) and a 2-column
 * grid. Filtering reflows with the View Transitions API where supported.
 */
export function WorkIndex({ projects, tags }: { projects: ProjectCardData[]; tags: Tag[] }) {
  const [filter, setFilter] = useState<Tag | "All">("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));
  const count = (t: Tag | "All") => (t === "All" ? projects.length : projects.filter((p) => p.tags.includes(t)).length);

  return (
    <div>
      <div role="group" aria-label="Filter case studies" className="flex flex-wrap gap-2">
        {(["All", ...tags] as const).map((t) => {
          const active = t === filter;
          return (
            <button
              key={t}
              type="button"
              aria-pressed={active}
              onClick={() => startTransition(() => setFilter(t))}
              className={cn(
                "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors",
                active ? "border-ink bg-ink text-paper" : "border-line-strong text-ink hover:border-ink",
              )}
            >
              {t}
              <span className={active ? "text-accent-bright" : "text-accent-deep"}>{count(t)}</span>
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} case {shown.length === 1 ? "study" : "studies"}
        {filter !== "All" ? ` tagged ${filter}` : ""}.
      </p>
      <ul className="mt-12 grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 xl:gap-y-20">
        {shown.map((p, i) => (
          <ViewTransition key={p.slug} name={`work-${p.slug}`}>
            <li>
              <ProjectCard project={p} index={projects.indexOf(p)} eager={i < 2} />
            </li>
          </ViewTransition>
        ))}
      </ul>
    </div>
  );
}
