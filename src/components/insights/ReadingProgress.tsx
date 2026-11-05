"use client";

import { useLayoutEffect, useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useSpring, useReducedMotion } from "motion/react";

/** Thin lime reading-progress bar pinned to the top of the viewport. */
export function ReadingProgress({ targetId }: { targetId: string }) {
  const target = useRef<HTMLElement | null>(null);
  // Resolve the article element before useScroll's own layout effect runs.
  useLayoutEffect(() => {
    target.current = document.getElementById(targetId);
  }, [targetId]);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ["start 0.15", "end 0.85"] });
  const scaleX = useSpring(scrollYProgress, { stiffness: 220, damping: 40, mass: 0.3 });
  return (
    <m.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-lime"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
