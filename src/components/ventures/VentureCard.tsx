import Image from "next/image";
import type { Venture } from "@/content/ventures";
import { confirmedProofPoints } from "@/content/site";
import { BrowserFrame } from "@/components/work/DeviceFrame";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { CursorPill } from "@/components/motion/CursorPill";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ExternalLink } from "@/components/ui/Button";
import { Chip, StatusBadge } from "@/components/ui/Chip";
import { cn, pad2 } from "@/lib/cn";

/** Typographic wordmark — used until an official logo file is supplied. */
export function Wordmark({ venture, className }: { venture: Venture; className?: string }) {
  if (venture.logo) {
    return (
      <Image
        src={venture.logo.src}
        width={venture.logo.width}
        height={venture.logo.height}
        alt={`${venture.name} logo`}
        className={cn("h-8 w-auto", className)}
      />
    );
  }
  const [main, accent] = venture.wordmark;
  return (
    <span className={cn("inline font-bold tracking-[-0.035em]", className)}>
      <span>{main}</span>
      <span className="emph !text-[1.12em] !leading-none text-lime">{accent}</span>
    </span>
  );
}

/**
 * Large venture card: device frame with inner parallax on one side, details on
 * the other. `flip` alternates the image side for rhythm.
 */
export function VentureCard({
  venture,
  index,
  flip = false,
  headingLevel = "h3",
}: {
  venture: Venture;
  index: number;
  flip?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const H = headingLevel;
  const image = venture.screenshots[0] ?? venture.photo;
  const proofs = confirmedProofPoints(venture.slug);

  return (
    <Reveal
      as="article"
      aria-labelledby={`venture-${venture.slug}`}
      className="grid-site items-stretch gap-y-10 rounded-[var(--radius-card)] border border-line bg-card p-5 sm:p-7 xl:p-10"
    >
      {/* Visual */}
      <div
        data-ri=""
        className={cn("col-span-12 lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}
      >
        <a
          href={venture.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block"
          aria-label={`Visit ${venture.name} (opens in a new tab)`}
        >
          <BrowserFrame domain={venture.domain} screenClassName="aspect-[16/11]">
            <ParallaxFrame>
              <div className="photo-grade absolute inset-0">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1280px) 680px, (min-width: 1024px) 55vw, 92vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.03]"
                />
              </div>
            </ParallaxFrame>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/85 via-ink/30 to-transparent p-5 pt-16">
              <Wordmark venture={venture} className="text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] text-paper" />
              {"caption" in image && image.caption && (
                <span className="hidden text-label text-paper/80 sm:block">{image.caption}</span>
              )}
            </div>
          </BrowserFrame>
          <CursorPill />
        </a>
      </div>

      {/* Details */}
      <div
        data-ri=""
        style={{ ["--i" as string]: 1 }}
        className={cn(
          "col-span-12 flex flex-col justify-between gap-10 lg:col-span-5",
          flip && "lg:order-1 lg:col-start-1",
        )}
      >
        <div>
          <div className="flex items-center justify-between gap-4 text-label text-muted">
            <span>
              <span className="text-fg">V/{pad2(index + 1)}</span> · {venture.category}
            </span>
            <StatusBadge label={venture.status} />
          </div>
          <H id={`venture-${venture.slug}`} className="mt-8 text-[clamp(1.75rem,1.3rem+1.8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.03em] text-fg">
            {venture.name}
          </H>
          <p className="mt-2 text-meta text-muted">{venture.role}</p>
          <p className="mt-6 text-[1.1875rem] leading-relaxed text-fg">{venture.tagline}</p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label={`${venture.name} capabilities`}>
            {venture.capabilities.map((c) => (
              <li key={c}>
                <Chip>{c}</Chip>
              </li>
            ))}
          </ul>
          {proofs.length > 0 && (
            <ul className="mt-6 flex flex-col gap-1">
              {proofs.map((p) => (
                <li key={p.id} className="text-meta text-muted">
                  <ExternalLink href={p.source}>{p.short}</ExternalLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <Button href={venture.url} variant="secondary" full>
            Visit site<span className="sr-only"> of {venture.name}</span>
          </Button>
          <Button href={`/ventures/${venture.slug}`} variant="text">
            Read more<span className="sr-only"> about {venture.name}</span>
          </Button>
        </div>
      </div>
    </Reveal>
  );
}
