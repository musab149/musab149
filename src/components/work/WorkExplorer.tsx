"use client";

import { useMemo, useState } from "react";
import type { Project } from "@/content/work";
import { StackingCards } from "@/components/motion/StackingCards";
import { ProjectCard } from "./ProjectCard";
import { cn } from "@/lib/cn";

/** Industry filter chips (generated from data) + sticky stacking cards. */
export function WorkExplorer({ projects }: { projects: Project[] }) {
  const industries = useMemo(
    () => Array.from(new Set(projects.map((p) => p.industry))).sort(),
    [projects],
  );
  const [filter, setFilter] = useState<string>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.industry === filter);
  const options = ["All", ...industries];

  return (
    <div>
      {industries.length > 1 && (
        <div role="group" aria-label="Filter by industry" className="mb-10 flex flex-wrap gap-2">
          {options.map((opt) => {
            const active = opt === filter;
            const count = opt === "All" ? projects.length : projects.filter((p) => p.industry === opt).length;
            return (
              <button
                key={opt}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(opt)}
                className={cn(
                  "inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors duration-200",
                  active ? "border-fg bg-fg text-surface" : "border-line text-fg hover:border-line-strong",
                )}
              >
                {opt}
                <span className={cn("text-meta", active ? "text-surface/70" : "text-muted")}>{count}</span>
              </button>
            );
          })}
        </div>
      )}
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter !== "All" ? ` in ${filter}` : ""}.
      </p>
      <StackingCards
        items={shown.map((p) => ({ key: p.slug }))}
        render={(i) => <ProjectCard project={shown[i]} index={projects.indexOf(shown[i])} />}
      />
    </div>
  );
}
