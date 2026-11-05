"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

/** Desktop table of contents with the active heading highlighted. */
export function TableOfContents({ headings }: { headings: { depth: 2 | 3; text: string; id: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -65% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [headings]);

  if (!headings.length) return null;
  return (
    <nav aria-label="On this page" className="sticky top-24">
      <p className="text-label text-muted">On this page</p>
      <ol className="mt-4 flex flex-col border-l border-line">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={cn(
                "-ml-px block border-l py-1.5 text-[0.875rem] leading-snug transition-colors",
                h.depth === 3 ? "pl-7" : "pl-4",
                active === h.id ? "border-ink font-medium text-fg" : "border-transparent text-muted hover:text-fg",
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
