"use client";

import { useEffect } from "react";

/**
 * Optional Lenis smooth scrolling (brief §6.1). Desktop pointers only; off on
 * touch devices and under prefers-reduced-motion. Loaded after idle so it never
 * competes with first paint.
 */
export function SmoothScroll() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    let lenis: import("lenis").default | null = null;
    let raf = 0;
    let cancelled = false;
    let observer: MutationObserver | null = null;

    const start = async () => {
      const { default: Lenis } = await import("lenis");
      if (cancelled) return;
      lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, anchors: { offset: 0 }, autoRaf: false });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      // Pause while the mobile menu (or any scroll lock) is active
      observer = new MutationObserver(() => {
        if (document.documentElement.dataset.menuOpen) lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-menu-open"] });
    };

    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
    const handle = idle(() => void start());

    return () => {
      cancelled = true;
      if (window.cancelIdleCallback && typeof handle === "number") window.cancelIdleCallback(handle);
      cancelAnimationFrame(raf);
      observer?.disconnect();
      lenis?.destroy();
    };
  }, []);

  return null;
}
