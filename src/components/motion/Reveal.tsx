"use client";

import { useEffect, useRef, type ElementType, type ReactNode, type CSSProperties } from "react";
import { viewportTrigger } from "@/lib/motion";

/**
 * Shared reveal (brief §6.3). Adds `.is-in` once the group is in view; CSS in
 * globals.css does the actual animation using the motion tokens. Children opt
 * in with `data-ri` (+ `--i` for stagger order), `data-draw` for hairlines, or
 * `.rise-word` for masked heading lines.
 *
 * Server-rendered children stay server components; this wrapper only owns a ref.
 */

type Callback = (entry: IntersectionObserverEntry) => void;
const callbacks = new WeakMap<Element, Callback>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) callbacks.get(entry.target)?.(entry);
    },
    { threshold: [0, viewportTrigger.amount, 0.5], rootMargin: "0px 0px -6% 0px" },
  );
  return observer;
}

/** Group heading words into visual lines so each line rises together. */
function assignLines(root: HTMLElement) {
  const words = root.querySelectorAll<HTMLElement>(".rise-word");
  let line = -1;
  let lastTop = Number.NEGATIVE_INFINITY;
  words.forEach((w) => {
    const top = w.offsetTop;
    if (Math.abs(top - lastTop) > 4) {
      line += 1;
      lastTop = top;
    }
    w.style.setProperty("--line", String(line));
  });
}

export function Reveal({
  as,
  children,
  className,
  delay,
  lines = false,
  style,
  id,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Extra base delay in seconds (inherited by children as --d). */
  delay?: number;
  /** Measure `.rise-word` children into lines before revealing. */
  lines?: boolean;
  style?: CSSProperties;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (lines) assignLines(el);

    const io = getObserver();
    const done = () => {
      el.classList.add("is-in");
      callbacks.delete(el);
      io.unobserve(el);
    };
    callbacks.set(el, (entry) => {
      const tallEnough =
        entry.intersectionRect.height >= Math.min(window.innerHeight * viewportTrigger.amount, 240);
      if (entry.isIntersecting && (entry.intersectionRatio >= viewportTrigger.amount || tallEnough)) {
        done();
      }
    });
    io.observe(el);
    return () => {
      callbacks.delete(el);
      io.unobserve(el);
    };
  }, [lines]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      id={id}
      className={className}
      style={delay ? { ...style, ["--d" as string]: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
