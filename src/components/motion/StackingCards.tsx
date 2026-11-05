"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ease, duration } from "@/lib/motion";
import { useMediaQuery } from "@/lib/useMediaQuery";

/**
 * Sticky stacking cards (selected-work signature, desktop ≥1024px).
 * Each card pins; the next slides over it while the previous scales to 0.94
 * and dims. Below 1024px (and under reduced motion) it is a plain list.
 */
export function StackingCards({
  items,
  render,
}: {
  items: { key: string }[];
  render: (index: number) => React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const n = items.length;

  return (
    <LayoutGroup>
      <div ref={ref} className="relative flex flex-col gap-[var(--gutter)] lg:gap-0">
        <AnimatePresence initial={false} mode="popLayout">
          {items.map((item, i) => (
            <motion.div
              key={item.key}
              layout={!reduce}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: duration.reveal * 0.7, ease: ease.out }}
              className="stack-slot lg:sticky lg:h-[min(76vh,640px)]"
              style={{ top: `calc(var(--header-h-compact) + 32px + ${i * 14}px)` }}
            >
              <StackLayer index={i} total={n} progress={scrollYProgress} disabled={!!reduce || !desktop}>
                {render(i)}
              </StackLayer>
            </motion.div>
          ))}
        </AnimatePresence>
        {/* Breathing room so the last card can be read before the section ends */}
        <div aria-hidden="true" className="hidden h-[12vh] lg:block" />
      </div>
    </LayoutGroup>
  );
}

function StackLayer({
  index,
  total,
  progress,
  disabled,
  children,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  disabled: boolean;
  children: React.ReactNode;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const isLast = index === total - 1;
  const scale = useTransform(progress, [start, end], [1, isLast ? 1 : 0.94]);
  const dim = useTransform(progress, [start, end], [0, isLast ? 0 : 0.55]);

  return (
    <motion.div className="stack-layer relative h-full origin-top" style={disabled ? undefined : { scale }}>
      {children}
      {!disabled && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden rounded-[var(--radius-card)] bg-ink lg:block"
          style={{ opacity: dim }}
        />
      )}
    </motion.div>
  );
}
