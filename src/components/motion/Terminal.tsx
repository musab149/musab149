"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/cn";

type Line = { kind: "input" | "muted" | "accent" | "output"; text: string };

/**
 * Terminal panel that types out an illustrative agent interaction once in
 * view, with a Replay button. Reduced motion: final text shown immediately.
 * The full transcript is always available to screen readers.
 */
export function Terminal({ title, label, lines }: { title: string; label: string; lines: readonly Line[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState<{ line: number; chars: number }>({ line: -1, chars: 0 });
  const [done, setDone] = useState(false);
  const timer = useRef<number | null>(null);

  const stop = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };

  const play = useCallback(() => {
    stop();
    setDone(false);
    let line = 0;
    let chars = 0;
    const step = () => {
      const current = lines[line];
      if (!current) {
        setDone(true);
        return;
      }
      const typed = current.kind === "input" || current.kind === "output";
      if (typed && chars < current.text.length) {
        chars += current.kind === "input" ? 1 : 3;
        setShown({ line, chars: Math.min(chars, current.text.length) });
        timer.current = window.setTimeout(step, current.kind === "input" ? 26 : 14);
        return;
      }
      setShown({ line, chars: current.text.length });
      line += 1;
      chars = 0;
      const pause = current.kind === "input" ? 420 : current.kind === "muted" && current.text.endsWith("…") ? 520 : 180;
      timer.current = window.setTimeout(step, pause);
    };
    setShown({ line: 0, chars: 0 });
    timer.current = window.setTimeout(step, 300);
  }, [lines]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Defer so state is not set synchronously inside the effect body.
      const id = window.setTimeout(() => {
        setShown({ line: lines.length - 1, chars: lines[lines.length - 1].text.length });
        setDone(true);
      }, 0);
      return () => window.clearTimeout(id);
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop();
    };
  }, [play, lines]);

  return (
    <div ref={ref} className="flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-[#111316]">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-paper/15" />
            <span className="size-2.5 rounded-full bg-paper/15" />
            <span className="size-2.5 rounded-full bg-paper/15" />
          </span>
          <span className="font-mono text-xs text-slate">{title}</span>
        </span>
        <span className="rounded-full border border-lime/40 px-2.5 py-0.5 text-label !text-[0.625rem] text-lime">
          {label}
        </span>
      </div>

      <div className="relative min-h-[300px] flex-1 p-5 font-mono text-[0.8125rem] leading-[1.75] sm:text-sm">
        <div className="sr-only">
          {lines.map((l, i) => (
            <p key={i}>{l.text}</p>
          ))}
        </div>
        <div aria-hidden="true">
          {lines.map((l, i) => {
            if (i > shown.line) return null;
            const text = i === shown.line ? l.text.slice(0, shown.chars) : l.text;
            return (
              <p
                key={i}
                className={cn(
                  "whitespace-pre-wrap break-words",
                  l.kind === "input" && "text-paper",
                  l.kind === "muted" && "text-slate",
                  l.kind === "accent" && "text-lime",
                  l.kind === "output" && "mt-2 text-paper",
                )}
              >
                {l.kind === "input" && <span className="text-lime">$ </span>}
                {l.kind === "output" && <span className="text-slate">answer: </span>}
                {text}
                {i === shown.line && !done && <span className="term-cursor ml-0.5" />}
              </p>
            );
          })}
          {done && (
            <p className="mt-1 text-paper">
              <span className="text-lime">$ </span>
              <span className="term-cursor" />
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line px-4 py-2.5">
        <span className="text-label !text-[0.625rem] text-slate">No real data · generic example</span>
        <button
          type="button"
          onClick={play}
          className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm font-medium text-paper transition-colors hover:text-lime"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Replay
        </button>
      </div>
    </div>
  );
}
