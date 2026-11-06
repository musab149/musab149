"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { cn, pad2 } from "@/lib/cn";

export type Flow = {
  slug: string;
  tab: string;
  name: string;
  kicker: string;
  summary: string;
  steps: { title: string; text: string }[];
  stack: string[];
};

/**
 * Tabbed panel of real AI products from the portfolio. Each shows its
 * "How it works" steps as a chain of nodes that light up in sequence.
 * Arrow keys move between tabs (WAI-ARIA tabs pattern).
 */
export function AiFlows({ flows }: { flows: Flow[] }) {
  const [active, setActive] = useState(0);
  const flow = flows[active];

  const onKey = (e: React.KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + flows.length) % flows.length;
    setActive(next);
    document.getElementById(`flow-tab-${flows[next].slug}`)?.focus();
  };

  return (
    <div className="theme-dark overflow-hidden rounded-[var(--radius-panel)] border border-paper/10 bg-ink text-paper">
      <div role="tablist" aria-label="AI products" className="no-scrollbar flex gap-2 overflow-x-auto border-b border-paper/10 p-4 md:p-5">
        {flows.map((f, i) => (
          <button
            key={f.slug}
            id={`flow-tab-${f.slug}`}
            role="tab"
            type="button"
            aria-selected={i === active}
            aria-controls={`flow-panel-${f.slug}`}
            tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}
            onKeyDown={(e) => onKey(e, i)}
            className={cn(
              "flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors",
              i === active ? "border-paper bg-paper text-ink" : "border-paper/15 text-paper/80 hover:border-paper/40 hover:text-paper",
            )}
          >
            <span className={i === active ? "text-accent-deep" : "text-accent-bright"}>{pad2(i + 1)}</span>
            {f.tab}
          </button>
        ))}
      </div>

      <div
        key={flow.slug}
        id={`flow-panel-${flow.slug}`}
        role="tabpanel"
        aria-labelledby={`flow-tab-${flow.slug}`}
        className="grid gap-10 p-6 md:p-8 xl:grid-cols-12 xl:p-10"
      >
        <div className="xl:col-span-4">
          <p className="text-label text-fog">{flow.kicker}</p>
          <h3 className="display-md mt-3 text-paper">{flow.name}</h3>
          <p className="mt-5 text-[0.9375rem] leading-relaxed text-fog">{flow.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Stack">
            {flow.stack.map((s) => (
              <li key={s}>
                <span className="chip border-paper/20 text-paper">{s}</span>
              </li>
            ))}
          </ul>
          <Link href={`/work/${flow.slug}`} className="link-draw link-mono mt-8 text-paper">
            <span className="link-text">Read the case study</span>
            <ArrowRight aria-hidden="true" className="arrow-shift size-3.5" />
          </Link>
        </div>

        <ol className="relative grid gap-3 sm:grid-cols-2 xl:col-span-8 xl:grid-cols-5 xl:gap-0" aria-label={`How ${flow.name} works`}>
          {/* connector (desktop) */}
          <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-[22px] hidden h-px bg-paper/15 xl:block" />
          <span aria-hidden="true" className="flow-fill absolute left-[10%] right-[10%] top-[22px] hidden h-px origin-left bg-accent-bright xl:block" />
          {flow.steps.map((s, i) => (
            <li
              key={s.title}
              className="flow-node relative flex flex-col rounded-[var(--radius-sm)] border border-paper/10 bg-ink-2 p-4 xl:items-center xl:border-0 xl:bg-transparent xl:px-3 xl:text-center"
              style={{ ["--i" as string]: i }}
            >
              <span className="flow-dot relative z-10 grid size-11 shrink-0 place-items-center rounded-full border border-paper/20 bg-ink-3 font-mono text-[0.6875rem] text-paper">
                {pad2(i + 1)}
              </span>
              <p className="mt-4 text-[0.9375rem] font-semibold leading-snug text-paper">{s.title}</p>
              <p className="mt-1.5 text-[0.8125rem] leading-snug text-fog">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
