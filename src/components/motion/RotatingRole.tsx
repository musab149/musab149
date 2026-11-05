"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ease, duration } from "@/lib/motion";

/** Vertical slot-machine flip through roles every 3s (status strip signature). */
export function RotatingRole({ roles, interval = 3000 }: { roles: readonly string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % roles.length), interval);
    return () => window.clearInterval(id);
  }, [roles.length, interval, reduce]);

  // Widest label reserves the width so the strip never reflows.
  const widest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className="relative inline-grid overflow-hidden align-bottom" aria-live="off">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {widest}
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={roles[i]}
          aria-hidden="true"
          className="col-start-1 row-start-1 text-fg"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: duration.reveal * 0.7, ease: ease.out }}
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
