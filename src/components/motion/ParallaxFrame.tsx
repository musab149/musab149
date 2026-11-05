"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Inner parallax (±distance px) for screenshots inside device frames
 * (ventures signature). The child should be taller than the frame by
 * 2×distance — this component scales it up slightly to guarantee that.
 */
export function ParallaxFrame({
  children,
  distance = 40,
  className,
}: {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <div ref={ref} className={className} style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <motion.div
        style={reduce ? { inset: 0, position: "absolute" } : { y, position: "absolute", inset: `-${distance}px 0` }}
      >
        {children}
      </motion.div>
    </div>
  );
}
