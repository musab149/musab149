"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { nav, site } from "@/content/site";
import { cn, pad2 } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

/**
 * Floating pill navigation: monogram + name, numbered links, "Let's talk".
 * Hides on scroll down (past the first screen) and returns on scroll up.
 * Only transform/opacity animate.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [raised, setRaised] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      setRaised(y > 12);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > window.innerHeight * 0.6);
        lastY.current = y;
      }
    };
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  const show = !hidden || menuOpen;

  return (
    <header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-[var(--ease-out)]"
      style={{ transform: show ? "translate3d(0,0,0)" : "translate3d(0,-120%,0)" }}
    >
      <div className="container-site pt-3 md:pt-4">
        <div
          className={cn(
            "pointer-events-auto mx-auto flex h-[60px] max-w-[1080px] items-center justify-between gap-3 rounded-full border pl-2 pr-2 backdrop-blur-xl transition-[background-color,box-shadow,border-color] duration-300",
            menuOpen
              ? "border-transparent bg-transparent"
              : "border-line bg-paper-2/80 shadow-[0_10px_30px_-16px_rgb(13_12_29/0.28)]",
            raised && !menuOpen && "bg-paper-2/92",
          )}
        >
          <Link href="/" aria-label={`${site.name}, home`} className="group flex min-h-11 items-center gap-2.5 rounded-full pr-3">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-11 place-items-center rounded-full font-mono text-[0.6875rem] font-semibold tracking-wider transition-transform duration-300 group-hover:rotate-[-8deg]",
                menuOpen ? "bg-paper text-ink" : "bg-ink text-paper",
              )}
            >
              {site.shortName}
            </span>
            <span className={cn("text-[1rem] font-bold tracking-[-0.01em]", menuOpen ? "text-paper" : "text-ink")}>
              {site.name}
            </span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {nav.map((item, i) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex min-h-11 items-center gap-1.5 rounded-full px-3.5 text-[0.9375rem] font-medium transition-colors",
                        active ? "bg-ink/[0.06] text-ink" : "text-ink/75 hover:bg-ink/[0.05] hover:text-ink",
                      )}
                    >
                      <span className="font-mono text-[0.625rem] text-accent-deep">{pad2(i + 1)}</span>
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn btn-ink group hidden !min-h-11 !pl-4 !pr-1.5 md:inline-flex">
              <span>Let&apos;s talk</span>
              <span className="btn-icon !size-8" aria-hidden="true">
                <ArrowRight className="size-4" />
              </span>
            </Link>
            <MobileNav open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
