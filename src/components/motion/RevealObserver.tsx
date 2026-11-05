"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { viewportTrigger } from "@/lib/motion";

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

/**
 * One IntersectionObserver for every `[data-reveal]` group on the page
 * (instead of one client component per group). Re-scans on navigation and
 * when new nodes are added.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const tall = entry.intersectionRect.height >= Math.min(window.innerHeight * viewportTrigger.amount, 240);
          if (entry.isIntersecting && (entry.intersectionRatio >= viewportTrigger.amount || tall)) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: [0, viewportTrigger.amount, 0.5], rootMargin: "0px 0px -6% 0px" },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in):not([data-observed])").forEach((el) => {
        el.dataset.observed = "";
        if (el.hasAttribute("data-reveal-lines")) assignLines(el);
        io.observe(el);
      });
    };
    scan();

    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      document.querySelectorAll<HTMLElement>("[data-observed]:not(.is-in)").forEach((el) => delete el.dataset.observed);
    };
  }, [pathname]);

  return null;
}
