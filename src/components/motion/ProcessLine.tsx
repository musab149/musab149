"use client";

import { useRef, useState } from "react";
import * as m from "motion/react-m";
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn, pad2 } from "@/lib/cn";

type Step = { title: string; body: string };

/**
 * Horizontal 5-step line whose lime progress fill follows scroll; the active
 * step's number scales up. Vertical on mobile. Reduced motion: fully filled.
 */
export function ProcessLine({ steps }: { steps: readonly Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState(0);
  const n = steps.length;

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.round(v * (n - 1)))));
  });

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-5 md:gap-[var(--gutter)]">
      {/* Track + fill (horizontal on md+, vertical on mobile) */}
      <span aria-hidden="true" className="absolute left-[11px] top-3 bottom-3 w-px bg-line md:left-0 md:right-0 md:top-[11px] md:bottom-auto md:h-px md:w-auto" />
      <m.span
        aria-hidden="true"
        className="absolute left-[11px] top-3 bottom-3 w-px origin-top bg-lime md:hidden"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      <m.span
        aria-hidden="true"
        className="absolute left-0 right-0 top-[11px] hidden h-[2px] origin-left bg-lime md:block"
        style={{ scaleX: reduce ? 1 : fill }}
      />

      {steps.map((s, i) => {
        const isActive = reduce ? true : i <= active;
        const isCurrent = !reduce && i === active;
        return (
          <li key={s.title} className="relative pl-12 md:pl-0 md:pt-12">
            <span
              aria-hidden="true"
              className={cn(
                "absolute left-0 top-0 grid size-[23px] place-items-center rounded-full border bg-surface transition-colors duration-500",
                isActive ? "border-ink" : "border-line-strong",
              )}
            >
              <span className={cn("size-[9px] rounded-full transition-colors duration-500", isActive ? "bg-ink" : "bg-transparent")} />
            </span>
            <span
              className={cn(
                "inline-block origin-left font-mono text-[2rem] font-medium leading-none tracking-[-0.04em] transition-[transform,color] duration-500 ease-[var(--ease-out)] md:text-[2.5rem]",
                isActive ? "text-fg" : "text-muted",
                isCurrent && "scale-[1.18]",
              )}
            >
              {pad2(i + 1)}
            </span>
            <h3 className="mt-5 text-[1.125rem] font-semibold leading-snug tracking-[-0.01em] text-fg">{s.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{s.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
