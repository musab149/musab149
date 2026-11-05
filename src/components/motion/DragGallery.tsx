"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Photo } from "@/content/culture";
import { cn } from "@/lib/cn";

/**
 * Horizontal drag-and-scroll gallery with momentum (team & culture signature).
 * Native scrolling (touch, trackpad, keyboard via the focusable track and the
 * prev/next buttons) plus mouse drag with inertia. Scrolls only inside its
 * own track — never hijacks the page.
 */
export function DragGallery({ photos, label }: { photos: Photo[]; label: string }) {
  const track = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState<{ start: boolean; end: boolean }>({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    let lastX = 0;
    let lastT = 0;
    let v = 0;
    let raf = 0;

    const updateEdges = () =>
      setEdge({ start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 });

    const glide = () => {
      v *= 0.94;
      el.scrollLeft -= v;
      if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      cancelAnimationFrame(raf);
      down = true;
      moved = false;
      startX = lastX = e.clientX;
      startLeft = el.scrollLeft;
      lastT = performance.now();
      v = 0;
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (!moved && Math.abs(dx) > 4) {
        moved = true;
        el.setPointerCapture(e.pointerId);
        el.dataset.dragging = "true";
      }
      if (!moved) return;
      el.scrollLeft = startLeft - dx;
      const now = performance.now();
      const dt = Math.max(1, now - lastT);
      v = ((e.clientX - lastX) / dt) * 16;
      lastX = e.clientX;
      lastT = now;
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      delete el.dataset.dragging;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (moved && !reduce) raf = requestAnimationFrame(glide);
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    updateEdges();
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);
    el.addEventListener("scroll", updateEdges, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
      el.removeEventListener("scroll", updateEdges);
    };
  }, []);

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * el.clientWidth * 0.75, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className="gallery-track no-scrollbar flex cursor-grab gap-[var(--gutter)] overflow-x-auto overscroll-x-contain py-1 data-[dragging]:cursor-grabbing data-[dragging]:select-none"
      >
        {photos.map((p, i) => (
          <figure
            key={p.src}
            className="group relative shrink-0 overflow-hidden rounded-[4px] bg-card"
          >
            <div className="photo-grade relative h-[min(64vw,300px)] md:h-[380px] xl:h-[460px]" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                draggable={false}
                loading={i < 3 ? "eager" : "lazy"}
                sizes={`(min-width: 1280px) ${Math.round((460 * p.width) / p.height)}px, (min-width: 768px) ${Math.round((380 * p.width) / p.height)}px, ${Math.round((300 * p.width) / p.height)}px`}
                className="pointer-events-none object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="gallery-caption absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-ink/85 to-transparent px-4 pb-3.5 pt-10 text-label text-paper">
              <span>{p.caption}</span>
              <span className="text-paper/60">{String(i + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="container-site mt-8 flex items-center justify-between">
        <p className="text-label text-muted" aria-hidden="true">
          ← Drag or scroll →
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={edge.start}
            className={cn("grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-opacity hover:bg-fg hover:text-surface disabled:pointer-events-none disabled:opacity-30")}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span className="sr-only">Previous photos</span>
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={edge.end}
            className="grid size-11 place-items-center rounded-full border border-line-strong text-fg transition-opacity hover:bg-fg hover:text-surface disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight aria-hidden="true" className="size-4" />
            <span className="sr-only">Next photos</span>
          </button>
        </div>
      </div>
    </div>
  );
}
