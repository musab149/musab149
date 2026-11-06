"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RotateCcw } from "lucide-react";

type Line =
  | { kind: "input"; text: string }
  | { kind: "step"; text: string; note: string; ok: boolean };

/**
 * Terminal panel: types the command, then reveals each step once in view.
 * Replay restarts it. Reduced motion shows the final state. Screen readers get
 * the full transcript.
 */
export function Terminal({ title, label, lines, caption }: { title: string; label: string; lines: readonly Line[]; caption?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [steps, setSteps] = useState(0);
  const [done, setDone] = useState(false);
  const timers = useRef<number[]>([]);
  const input = lines.find((l) => l.kind === "input")?.text ?? "";
  const stepLines = lines.filter((l): l is Extract<Line, { kind: "step" }> => l.kind === "step");

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const play = useCallback(() => {
    clear();
    setTyped(0);
    setSteps(0);
    setDone(false);
    let t = 250;
    for (let i = 1; i <= input.length; i++) {
      timers.current.push(window.setTimeout(() => setTyped(i), t));
      t += 22;
    }
    t += 380;
    stepLines.forEach((_, i) => {
      timers.current.push(window.setTimeout(() => setSteps(i + 1), t));
      t += 520;
    });
    timers.current.push(window.setTimeout(() => setDone(true), t));
  }, [input, stepLines]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = window.setTimeout(() => {
        setTyped(input.length);
        setSteps(stepLines.length);
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
      clear();
    };
  }, [play, input.length, stepLines.length]);

  return (
    <div ref={ref} className="theme-dark flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-paper/10 bg-[#0a0917] text-paper">
      <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-4 py-3">
        <span className="flex items-center gap-3">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </span>
          <span className="font-mono text-xs text-fog">{title}</span>
        </span>
        <span className="rounded-full border border-accent-bright/40 px-2.5 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-accent-bright">
          {label}
        </span>
      </div>

      <div className="sr-only">
        <p>{input}</p>
        {stepLines.map((s) => (
          <p key={s.text}>
            {s.text}: {s.note}
          </p>
        ))}
      </div>

      <div aria-hidden="true" className="flex-1 space-y-2.5 p-5 font-mono text-[0.8125rem] leading-relaxed sm:text-sm">
        <p className="break-words">
          <span className="text-accent-bright">$ </span>
          {input.slice(0, typed)}
          {typed < input.length && <span className="term-cursor ml-0.5" />}
        </p>
        {stepLines.slice(0, steps).map((s) => (
          <p key={s.text} className="grid grid-cols-[1.25rem_5.5rem_1fr_auto] items-baseline gap-x-2">
            <span className="text-fog">›</span>
            <span className="text-paper">{s.text}</span>
            <span className="truncate text-fog">{s.note}</span>
            <span className={s.ok ? "text-[#4ade80]" : "rounded bg-paper/10 px-1.5 text-[0.6875rem] text-paper"}>{s.ok ? "✓" : "QUEUED"}</span>
          </p>
        ))}
        {done && (
          <p>
            <span className="text-accent-bright">$ </span>
            <span className="term-cursor" />
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-paper/10 px-4 py-2.5">
        <span className="text-[0.8125rem] text-fog">{caption}</span>
        <button
          type="button"
          onClick={play}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-paper transition-colors hover:text-accent-bright"
        >
          <RotateCcw aria-hidden="true" className="size-3.5" />
          Replay
        </button>
      </div>
    </div>
  );
}
