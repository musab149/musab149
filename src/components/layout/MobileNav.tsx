"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowRight } from "lucide-react";
import { nav, links, site } from "@/content/site";
import { LiveClock } from "@/components/motion/LiveClock";
import { cn, pad2 } from "@/lib/cn";

/**
 * Full-screen menu (below 1024px): focus trap, Esc to close, aria-expanded on
 * the trigger, background scroll locked, focus returned to the trigger.
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
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
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

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => onOpenChange(!open)}
        className={cn(
          "relative z-[60] flex min-h-11 items-center gap-2.5 rounded-full px-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] transition-colors lg:hidden",
          open ? "bg-paper text-ink" : "bg-ink text-paper",
        )}
      >
        <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <span aria-hidden="true" className="relative block h-2.5 w-4">
          <span className={cn("absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300", open && "translate-y-[5px] rotate-45")} />
          <span className={cn("absolute bottom-0 left-0 h-px w-4 bg-current transition-transform duration-300", open && "-translate-y-[4px] -rotate-45")} />
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
            className="theme-dark fixed inset-0 z-40 flex flex-col overflow-y-auto bg-ink pt-28 lg:hidden"
          >
            <div className="bg-dots pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <nav aria-label="Mobile" className="container-site relative flex-1">
              <ul className="flex flex-col border-t border-line">
                {[{ label: "Home", href: "/" }, ...nav, { label: "Contact", href: "/contact" }].map((item, i) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={close}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="flex min-h-[4.25rem] items-center justify-between py-2"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-label text-accent-text">{pad2(i)}</span>
                        <span className="display-sm text-paper">{item.label}</span>
                      </span>
                      {isActive(item.href) && <span className="dot-accent" aria-hidden="true" />}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" onClick={close} className="btn btn-paper mt-10 w-full justify-between">
                <span>Let&apos;s talk</span>
                <span className="btn-icon" aria-hidden="true">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </nav>
            <div className="container-site relative flex flex-wrap items-center justify-between gap-4 py-8 text-label text-muted">
              <span>{site.location}</span>
              <LiveClock />
              {links.email && (
                <a href={`mailto:${links.email}`} className="link-draw text-paper">
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
