"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { nav, links, site } from "@/content/site";
import { LiveClock } from "@/components/motion/LiveClock";
import { cn } from "@/lib/cn";

/**
 * Full-screen mobile menu: focus trap, Esc to close, aria-expanded on the
 * trigger, background scroll locked, focus returned to the trigger on close.
 */
export function MobileNav({
  open,
  onOpenChange,
  pathname,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => onOpenChange(false), [onOpenChange]);

  // Close on route change
  const lastPath = useRef(pathname);
  useEffect(() => {
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      close();
    }
  }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const trigger = triggerRef.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.documentElement.dataset.menuOpen = "true";

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
      delete document.documentElement.dataset.menuOpen;
      trigger?.focus();
    };
  }, [open, close]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => onOpenChange(!open)}
        className={cn(
          "relative grid size-11 place-items-center rounded-full border transition-colors lg:hidden",
          open ? "border-paper/30 text-paper" : "border-line text-fg",
        )}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300",
              open && "translate-y-1.5 rotate-45",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 left-0 h-px w-5 bg-current transition-transform duration-300",
              open && "-translate-y-1.5 -rotate-45",
            )}
          />
        </span>
      </button>

      {open &&
        createPortal(
          <div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="theme-dark fixed inset-0 z-40 flex flex-col overflow-y-auto pt-24 lg:hidden"
          >
            <div className="motif-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <nav aria-label="Mobile" className="container-site relative flex-1">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="menu-item flex min-h-16 items-center justify-between py-3 text-[2rem] font-semibold tracking-[-0.03em]"
                      style={{ ["--i" as string]: i }}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                        {item.label}
                      </span>
                      {isActive(item.href) && <span className="status-dot" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" onClick={close} className="btn btn-primary mt-10 w-full">
                Let&apos;s connect
                <ArrowRight aria-hidden="true" className="btn-arrow size-4" />
              </Link>
            </nav>
            <div className="container-site relative flex items-center justify-between gap-4 py-8 text-label text-muted">
              <span>{site.location}</span>
              <LiveClock />
              {links.email && (
                <a href={`mailto:${links.email}`} className="link-draw text-fg">
                  <span className="link-text">Email</span>
                </a>
              )}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
