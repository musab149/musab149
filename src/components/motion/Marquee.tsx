"use client";

import { useEffect, useRef } from "react";

/**
 * Infinite CSS marquee that eases down to a slow crawl on hover (ticker
 * signature). The loop itself is CSS; JS only tweens playbackRate.
 * Under reduced motion the CSS animation is removed (static row).
 */
export function Marquee({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const track = el.querySelector<HTMLElement>(".marquee-track");
    const anim = track?.getAnimations?.()[0];
    if (!anim) return;
    let rate = 1;
    let target = 1;
    let raf = 0;
    const step = () => {
      rate += (target - rate) * 0.08;
      anim.updatePlaybackRate(rate);
      if (Math.abs(target - rate) > 0.01) raf = requestAnimationFrame(step);
    };
    const to = (t: number) => {
      target = t;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(step);
    };
    const slow = () => to(0.2);
    const normal = () => to(1);
    el.addEventListener("pointerenter", slow);
    el.addEventListener("pointerleave", normal);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", slow);
      el.removeEventListener("pointerleave", normal);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
