"use client";

import { useEffect, useRef } from "react";

/**
 * Replaces the cursor with a "Visit ↗" pill while hovering its parent
 * (ventures signature). Desktop pointers only; transform-only.
 */
export function CursorPill({ label = "Visit ↗" }: { label?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    if (!fine) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let x = 0;
    let y = 0;
    let tx = 0;
    let ty = 0;
    let raf = 0;
    const loop = () => {
      const k = reduce ? 1 : 0.22;
      x += (tx - x) * k;
      y += (ty - y) * k;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - x) > 0.3 || Math.abs(ty - y) > 0.3) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onEnter = (e: PointerEvent) => {
      const r = parent.getBoundingClientRect();
      x = tx = e.clientX - r.left;
      y = ty = e.clientY - r.top;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      el.dataset.on = "true";
      parent.style.cursor = "none";
    };
    const onLeave = () => {
      delete el.dataset.on;
      parent.style.cursor = "";
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerenter", onEnter);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerenter", onEnter);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      className="cursor-pill pointer-events-none absolute left-0 top-0 z-20 hidden rounded-full bg-lime px-4 py-2 text-sm font-semibold text-ink [@media(hover:hover)_and_(pointer:fine)]:inline-block"
    >
      {label}
    </span>
  );
}
