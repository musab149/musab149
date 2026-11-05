import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="theme-light relative isolate overflow-hidden">
      <div className="hero-grid motif-grid absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site py-section">
        <p className="text-label text-muted">
          <span className="text-fg">404</span> — Page not found
        </p>
        <h1 id="nf-title" className="mt-6 max-w-[16ch] text-display text-fg">
          This page took a <em className="emph">wrong</em> turn.
        </h1>
        <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-muted">
          The link may be old, or the page may have moved. Here are the main places to go instead.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="primary" full>
            Back to home
          </Button>
          <Button href="/contact" variant="secondary" full>
            Let&apos;s connect
          </Button>
        </div>
        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <Link href={item.href} className="group flex min-h-16 items-center justify-between py-4 pr-6">
                <span className="flex items-baseline gap-4">
                  <span className="text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="link-draw text-h3 text-fg">
                    <span className="link-text">{item.label}</span>
                  </span>
                </span>
                <ArrowRight aria-hidden="true" className="btn-arrow size-4 text-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
