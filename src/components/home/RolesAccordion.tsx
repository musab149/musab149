"use client";

import { startTransition, useRef, useState, ViewTransition } from "react";
import { ArrowRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { cn, pad2 } from "@/lib/cn";

type Role = {
  key: string;
  title: string;
  line: string;
  detail: string;
  chips: readonly string[];
  link: { label: string; href: string };
};

const skins = [
  { card: "theme-dark bg-ink text-paper", chip: "border-paper/25 text-paper", num: "text-accent-bright" },
  { card: "bg-accent text-white [--muted:#ffffff] [--line:rgb(255_255_255/0.3)]", chip: "border-white/35 text-white", num: "text-white" },
  { card: "theme-light bg-paper-2 text-ink border border-line", chip: "", num: "text-accent-deep" },
  { card: "theme-light bg-paper-3 text-ink", chip: "", num: "text-accent-deep" },
];

/**
 * "Four roles" accordion. Desktop: one expanded card + three narrow cards with
 * vertical labels; hover (with intent delay), click or keyboard focus opens a
 * card, animated with the View Transitions API where supported (no layout
 * animation). Mobile/tablet: all four cards, fully open, stacked.
 */
export function RolesAccordion({ roles }: { roles: readonly Role[] }) {
  const [active, setActive] = useState(0);
  const timer = useRef<number | null>(null);

  const open = (i: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    if (i === active) return;
    startTransition(() => setActive(i));
  };
  const hoverOpen = (i: number) => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => open(i), 140);
  };
  const cancelHover = () => {
    if (timer.current) window.clearTimeout(timer.current);
  };

  return (
    <>
      {/* Desktop accordion */}
      <div className="hidden h-[480px] gap-3 lg:flex" onMouseLeave={cancelHover}>
        {roles.map((r, i) => {
          const isActive = i === active;
          const skin = skins[i % skins.length];
          return (
            <ViewTransition key={r.key} name={`role-${r.key}`} default="roles">
              <article
                data-active={isActive}
                className={cn(
                  "role-panel relative min-w-0 overflow-hidden rounded-[var(--radius-card)]",
                  skin.card,
                  isActive ? "flex-[3.4]" : "flex-[0.62]",
                )}
                onMouseEnter={() => hoverOpen(i)}
              >
                <h3 className="sr-only">{r.title}</h3>
                {/* One stable button per card keeps keyboard focus when it opens */}
                <button
                  type="button"
                  aria-expanded={isActive}
                  aria-controls={`role-body-${r.key}`}
                  onClick={() => open(i)}
                  className={cn(
                    "z-10 text-left",
                    isActive
                      ? "absolute left-6 top-6 h-8 w-28 rounded-md xl:left-8 xl:top-8"
                      : "absolute inset-0 flex flex-col justify-between p-6",
                  )}
                >
                  {!isActive && (
                    <>
                      <span className={cn("figure-md", skin.num)} aria-hidden="true">
                        {pad2(i + 1)}
                      </span>
                      <span
                        aria-hidden="true"
                        className="display-sm self-start whitespace-nowrap [transform:rotate(180deg)] [writing-mode:vertical-rl]"
                      >
                        {r.title}
                      </span>
                    </>
                  )}
                  <span className="sr-only">{isActive ? `${r.title}, expanded` : `Show ${r.title}`}</span>
                </button>
                {isActive && (
                  <div id={`role-body-${r.key}`} className="role-body flex h-full flex-col justify-between p-8 xl:p-10">
                    <div>
                      <p className={cn("text-label", skin.num)}>
                        {pad2(i + 1)} / {pad2(roles.length)}
                      </p>
                      <p className="display-md mt-5">{r.title}</p>
                      <p className="mt-5 max-w-[34ch] text-[1.25rem] font-medium leading-snug tracking-[-0.01em]">{r.line}</p>
                      <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">{r.detail}</p>
                    </div>
                    <div className="flex flex-wrap items-end justify-between gap-6">
                      <ul className="flex max-w-[34rem] flex-wrap gap-2" aria-label={`${r.title} focus areas`}>
                        {r.chips.map((c) => (
                          <li key={c}>
                            <span className={cn("chip", skin.chip)}>{c}</span>
                          </li>
                        ))}
                      </ul>
                      <Link href={r.link.href} className="link-draw link-mono">
                        <span className="link-text">{r.link.label}</span>
                        <ArrowRight aria-hidden="true" className="arrow-shift size-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </article>
            </ViewTransition>
          );
        })}
      </div>

      {/* Mobile / tablet: stacked, all open */}
      <ul className="grid gap-3 md:grid-cols-2 lg:hidden">
        {roles.map((r, i) => {
          const skin = skins[i % skins.length];
          return (
            <li key={r.key} className={cn("flex flex-col justify-between gap-8 rounded-[var(--radius-card)] p-6", skin.card)}>
              <div>
                <p className={cn("text-label", skin.num)}>
                  {pad2(i + 1)} / {pad2(roles.length)}
                </p>
                <h3 className="display-sm mt-4">{r.title}</h3>
                <p className="mt-4 text-[1.0625rem] font-medium leading-snug">{r.line}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{r.detail}</p>
              </div>
              <div>
                <ul className="flex flex-wrap gap-2" aria-label={`${r.title} focus areas`}>
                  {r.chips.map((c) => (
                    <li key={c}>
                      <span className={cn("chip", skin.chip)}>{c}</span>
                    </li>
                  ))}
                </ul>
                <Link href={r.link.href} className="link-draw link-mono mt-4">
                  <span className="link-text">{r.link.label}</span>
                  <ArrowRight aria-hidden="true" className="arrow-shift size-3.5" />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
