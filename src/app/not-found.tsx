import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { nav } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { pad2 } from "@/lib/cn";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="theme-light relative isolate overflow-clip pb-[var(--section-pad)] pt-32 md:pt-36">
      <div className="bg-dots absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-site">
        <p className="flex items-center gap-2.5 text-label text-mist">
          <span className="dot-accent" aria-hidden="true" />
          <span className="text-ink">404</span> Page not found
        </p>
        <h1 id="nf-title" className="display mt-6 max-w-[14ch] text-ink">
          This page took a <em className="emph">wrong</em> turn.
        </h1>
        <p className="lede mt-8 max-w-[48ch] text-mist">The link may be old, or the page may have moved. These are the main places to go instead.</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/" variant="ink" full>
            Back to home
          </Button>
          <Button href="/contact" variant="outline" full>
            Let&apos;s talk
          </Button>
        </div>
        <ul className="mt-16 grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {nav.map((item, i) => (
            <li key={item.href} className="border-b border-line">
              <Link href={item.href} className="group flex min-h-16 items-center justify-between py-4 pr-6">
                <span className="flex items-baseline gap-4">
                  <span className="text-label text-accent-deep">{pad2(i + 1)}</span>
                  <span className="display-sm !text-[1.75rem] text-ink">{item.label}</span>
                </span>
                <ArrowRight aria-hidden="true" className="arrow-shift size-4 text-mist" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
