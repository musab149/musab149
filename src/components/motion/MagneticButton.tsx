"use client";

import { useEffect, useRef } from "react";

/**
 * Magnetic wrapper (contact CTA signature): the child drifts toward the
 * pointer by at most `max` px. Desktop pointers only, off under reduced motion.
 */
export function MagneticButton({ children, max = 8 }: { children: React.ReactNode; max?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
      const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
      el.style.transform = `translate3d(${Math.max(-1, Math.min(1, dx)) * max}px, ${Math.max(-1, Math.min(1, dy)) * max}px, 0)`;
    };
    const onLeave = () => {
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <span
      ref={ref}
      className="inline-flex w-full transition-transform duration-500 ease-[var(--ease-out)] will-change-transform sm:w-auto [&>*]:w-full sm:[&>*]:w-auto"
    >
      {children}
    </span>
  );
}
