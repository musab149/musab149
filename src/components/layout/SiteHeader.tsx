"use client";

import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { cn } from "@/lib/cn";
import { MobileNav } from "./MobileNav";

/**
 * Sticky header (brief §6.4): 88px band at the top that settles into a 64px bar
 * with hairline + blur once you scroll; hides on scroll down past the hero and
 * returns on scroll up. Only transform/opacity are animated.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("[data-hero]");
    const update = () => {
      ticking.current = false;
      const y = window.scrollY;
      const heroEnd = hero ? hero.offsetTop + hero.offsetHeight - 64 : 420;
      setCompact(y > 24);
      const delta = y - lastY.current;
      if (Math.abs(delta) > 6) {
        setHidden(delta > 0 && y > heroEnd);
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const show = !hidden || menuOpen;

  return (
    <>
      <header
        className={cn(
          "site-header fixed inset-x-0 top-0 z-50 h-16 transition-transform duration-500 ease-[var(--ease-out)] will-change-transform",
          menuOpen ? "theme-dark !bg-transparent" : "theme-light !bg-transparent",
        )}
        style={{
          transform: show ? `translate3d(0, ${compact ? 0 : 12}px, 0)` : "translate3d(0, -110%, 0)",
        }}
      >
        {/* Background layer fades in when compact (opacity only) */}
        <div
          aria-hidden="true"
          className={cn(
            "absolute inset-0 border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150 transition-opacity duration-500",
            compact && !menuOpen ? "opacity-100" : "opacity-0",
          )}
        />
        <div className="container-site relative flex h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex min-h-11 items-center gap-3"
            aria-label={`${site.name}, home`}
          >
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-fg font-mono text-[0.6875rem] font-semibold tracking-wider text-surface transition-transform duration-300 group-hover:rotate-[-8deg]"
            >
              {site.shortName}
            </span>
            <span className="text-[1.0625rem] font-bold tracking-[-0.02em] text-fg">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "link-draw px-3 text-[0.9375rem] font-medium",
                      isActive(item.href) ? "text-fg" : "text-muted hover:text-fg",
                    )}
                  >
                    <span className="link-text">{item.label}</span>
                    {isActive(item.href) && (
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-lime ring-1 ring-ink/20" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/contact" className="btn btn-primary group hidden !min-h-11 !py-2.5 md:inline-flex">
              Let&apos;s connect
              <ArrowRight aria-hidden="true" className="btn-arrow size-4" />
            </Link>
            <MobileNav open={menuOpen} onOpenChange={setMenuOpen} pathname={pathname} />
          </div>
        </div>
      </header>
      {/* Reserve the 88px header band so content never sits under it */}
      <div aria-hidden="true" className="h-[var(--header-h)]" />
    </>
  );
}
