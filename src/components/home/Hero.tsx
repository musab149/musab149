import Image from "next/image";
import { hero } from "@/content/home";
import { Button } from "@/components/ui/Button";
import { RiseText } from "@/components/ui/Emphasis";
import { RegMarks } from "@/components/ui/RegMarks";
import { NodeGraph } from "@/components/ui/NodeGraph";
import { CursorGlow } from "@/components/motion/CursorGlow";

/**
 * 01 — Hero. Server-rendered; the entrance choreography is pure CSS
 * (globals.css → "Hero choreography") so the headline and portrait are
 * visible on first paint and never wait for JavaScript.
 */
export function Hero({ index }: { index: string }) {
  return (
    <section
      data-hero=""
      aria-labelledby="hero-title"
      className="theme-light relative isolate overflow-hidden"
    >
      <div className="hero-grid motif-grid absolute inset-0 -z-10" aria-hidden="true" />
      <CursorGlow />

      <div className="container-site relative pb-[var(--section-pad)] pt-[clamp(2rem,3.4vw,3.25rem)]">
        <div className="grid-site items-center gap-y-14">
          {/* Copy */}
          <div className="col-span-12 lg:col-span-7">
            <p className="hero-fade text-label text-muted" style={{ ["--d" as string]: "0.05s" }}>
              <span className="text-fg">{index}</span>
              <span aria-hidden="true"> — </span>
              <span className="sr-only">, </span>
              {hero.eyebrow}
            </p>

            <h1 id="hero-title" className="mt-6 text-display text-fg">
              <RiseText text={hero.headline} variant="hero" underline />
            </h1>

            <p
              className="hero-fade mt-8 max-w-[58ch] text-lg leading-relaxed text-muted"
              style={{ ["--d" as string]: "0.4s" }}
            >
              {hero.description}
            </p>

            <div
              className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ ["--d" as string]: "0.5s" }}
            >
              <Button href={hero.primaryCta.href} variant="primary" full>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="secondary" full>
                {hero.secondaryCta.label}
              </Button>
            </div>

            <p
              className="hero-fade mt-8 flex items-start gap-3 text-meta text-muted"
              style={{ ["--d" as string]: "0.5s" }}
            >
              <span className="mt-[0.45em] size-1.5 shrink-0 rounded-full bg-fg" aria-hidden="true" />
              {hero.now}
            </p>
          </div>

          {/* Portrait */}
          <div className="col-span-12 sm:col-span-10 sm:col-start-2 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-8">
            <div className="relative">
              <NodeGraph className="hero-nodes absolute -right-16 -top-10 -z-10 w-[118%] text-fg/30" />
              <div className="relative">
                <RegMarks inset={-10} />
                <div className="hero-portrait photo-grade relative aspect-[4/5] overflow-hidden rounded-[4px] bg-card">
                  <Image
                    src={hero.portrait.src}
                    alt={hero.portrait.alt}
                    fill
                    priority
                    fetchPriority="high"
                    sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, (min-width: 768px) 60vw, 90vw"
                    className="object-cover object-[50%_30%]"
                  />
                </div>
                <span
                  className="hero-chip absolute -left-3 top-8 rounded-full border border-line bg-paper/95 px-3 py-1.5 text-label text-fg backdrop-blur sm:-left-6"
                  style={{ ["--d" as string]: "0.6s" }}
                >
                  {hero.chips[0]}
                </span>
                <span
                  className="hero-chip absolute -right-3 bottom-10 flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-label text-paper sm:-right-6"
                  style={{ ["--d" as string]: "0.7s" }}
                >
                  <span className="status-dot" aria-hidden="true" />
                  {hero.chips[1]}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
