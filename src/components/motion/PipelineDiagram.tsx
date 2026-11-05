"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { pad2 } from "@/lib/cn";

type Step = { id: string; label: string; body: string };

const W = 1000;
const H = 120;
const Y = 60;

/**
 * Ask → Retrieve → Reason → Act → Review. The SVG path draws itself as you
 * scroll (pathLength 0 → 1) and each node lights lime in sequence.
 * Reduced motion: fully drawn, all nodes lit.
 */
export function PipelineDiagram({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });
  const path = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const n = steps.length;
  const xs = steps.map((_, i) => 60 + (i * (W - 120)) / (n - 1));

  // Gentle wave between nodes for an organic, "signal" feel
  let d = `M ${xs[0]} ${Y}`;
  for (let i = 1; i < n; i++) {
    const x0 = xs[i - 1];
    const x1 = xs[i];
    const mid = (x0 + x1) / 2;
    const dy = i % 2 ? -26 : 26;
    d += ` C ${mid - 40} ${Y}, ${mid - 30} ${Y + dy}, ${mid} ${Y + dy} S ${x1 - 40} ${Y}, ${x1} ${Y}`;
  }

  return (
    <div ref={ref} className="relative">
      {/* Horizontal (md+) */}
      <div className="hidden md:block" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full overflow-visible" fill="none">
          <path d={d} stroke="var(--line-strong)" strokeWidth="1" strokeDasharray="3 6" />
          <m.path
            d={d}
            stroke="var(--color-lime)"
            strokeWidth="1.75"
            strokeLinecap="round"
            style={{ pathLength: reduce ? 1 : path }}
          />
          {xs.map((x, i) => (
            <Node key={steps[i].id} x={x} at={i / (n - 1)} progress={path} reduce={!!reduce} />
          ))}
        </svg>
      </div>

      <ol className="relative grid gap-8 md:mt-6 md:grid-cols-5 md:gap-[var(--gutter)]">
        {/* Vertical line (mobile) */}
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line md:hidden" />
        <m.span
          aria-hidden="true"
          className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-lime md:hidden"
          style={{ scaleY: reduce ? 1 : path }}
        />
        {steps.map((s, i) => (
          <li key={s.id} className="relative pl-9 md:pl-0 md:text-center">
            <MobileDot at={i / (n - 1)} progress={path} reduce={!!reduce} />
            <p className="text-label text-muted">{pad2(i + 1)}</p>
            <h4 className="mt-2 text-h3 text-fg">{s.label}</h4>
            <p className="mx-auto mt-2 max-w-[24ch] text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function Node({ x, at, progress, reduce }: { x: number; at: number; progress: MotionValue<number>; reduce: boolean }) {
  const on = useTransform(progress, [Math.max(0, at - 0.06), at], [0, 1]);
  const halo = useTransform(on, [0, 1], [0.6, 1]);
  const haloOpacity = useTransform(on, [0, 1], [0, 0.18]);
  return (
    <g>
      <circle cx={x} cy={Y} r="15" fill="var(--bg)" stroke="var(--line-strong)" />
      <m.circle cx={x} cy={Y} r="22" fill="var(--color-lime)" style={{ opacity: reduce ? 0.18 : haloOpacity, scale: reduce ? 1 : halo, transformOrigin: `${x}px ${Y}px` }} />
      <m.circle cx={x} cy={Y} r="7" fill="var(--color-lime)" style={{ opacity: reduce ? 1 : on }} />
    </g>
  );
}

function MobileDot({ at, progress, reduce }: { at: number; progress: MotionValue<number>; reduce: boolean }) {
  const on = useTransform(progress, [Math.max(0, at - 0.06), at], [0, 1]);
  return (
    <span aria-hidden="true" className="absolute left-0 top-1 grid size-[15px] place-items-center rounded-full border border-line-strong bg-surface md:hidden">
      <m.span className="size-[7px] rounded-full bg-lime" style={{ opacity: reduce ? 1 : on }} />
    </span>
  );
}
