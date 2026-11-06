import { Fragment } from "react";
import Image from "next/image";
import type { Venture } from "@/content/ventures";
import { confirmedProofPoints, flags } from "@/content/site";
import { BrowserFrame, PhoneFrame } from "@/components/work/DeviceFrame";
import { Button, ExternalLink } from "@/components/ui/Button";
import { Chip, StatusBadge } from "@/components/ui/Chip";
import { pad2, cn } from "@/lib/cn";

/**
 * Large venture card in the reference's product-card format: logo, index and
 * role, the name at display size, a serif tagline, description, figures, links,
 * and real screenshots in a browser frame with a phone overlapping it.
 */
export function VentureCard({
  venture,
  index,
  total,
  headingLevel = "h3",
  className,
  style,
  recede,
}: {
  venture: Venture;
  index: number;
  total: number;
  headingLevel?: "h2" | "h3";
  className?: string;
  style?: React.CSSProperties;
  recede?: boolean;
}) {
  const H = headingLevel;
  const proofs = confirmedProofPoints(venture.slug);
  const showFigures = venture.slug !== "pixelpk-technologies" || flags.pixelpkFigures;
  const detailHref = venture.caseStudy ? `/work/${venture.caseStudy}` : `/ventures/${venture.slug}`;

  return (
    <article
      aria-labelledby={`venture-${venture.slug}`}
      data-recede={recede ? "" : undefined}
      style={style}
      className={cn(
        "stack-card theme-light relative isolate overflow-clip rounded-[24px] border border-ink/10 bg-paper-2 text-ink",
        className,
      )}
    >
      {/* Brand-tint glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.16]"
        style={{ background: `radial-gradient(70% 80% at 100% 0%, ${venture.tint}, transparent 70%)` }}
      />
      <div className="grid-site gap-y-10 p-5 sm:p-8 xl:p-12">
        {/* Copy */}
        <div className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-5">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Image
                src={venture.logo.src}
                alt={`${venture.name} logo`}
                width={venture.logo.width}
                height={venture.logo.height}
                sizes="200px" className="h-7 w-auto"
              />
              <span className="chip">{venture.role}</span>
            </div>
            <p className="mt-8 text-label text-mist">
              <span className="text-accent-deep">
                {pad2(index + 1)} / {pad2(total)}
              </span>{" "}
              · {venture.category}
            </p>
            <H id={`venture-${venture.slug}`} className="display-md mt-3">
              {venture.name}
            </H>
            <p className="emph mt-3 block !text-[1.75rem] !leading-tight">{venture.tagline}</p>
            <p className="mt-5 max-w-[50ch] text-[1rem] leading-relaxed text-mist">{venture.description}</p>

            {showFigures && (
              <dl className="mt-8 grid grid-cols-2 border-t border-line">
                {venture.figures.map((f, i) => (
                  <div key={f.label} className={cn("border-b border-line py-4", i % 2 === 1 ? "border-l pl-5" : "pr-4")}>
                    <dt className="sr-only">{f.label}</dt>
                    <dd>
                      <span className="figure-md block text-ink">{f.value}</span>
                      <span className="mt-1 block text-[0.8125rem] leading-snug text-mist">{f.label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}
            {proofs.length > 0 && (
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-label text-mist">
                {proofs.map((p) => (
                  <li key={p.id}>
                    <ExternalLink href={p.source}>{p.short}</ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button href={detailHref} variant="ink">
              {venture.caseStudy ? "Case study" : "About the venture"}
              <span className="sr-only"> · {venture.name}</span>
            </Button>
            <Button href={venture.url} variant="text">
              {venture.domain}
            </Button>
            <StatusBadge label={venture.status} />
          </div>
        </div>

        {/* Visual */}
        <div className="relative col-span-12 lg:col-span-7 lg:pl-4">
          <a href={venture.url} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`Visit ${venture.domain} (opens in a new tab)`}>
            <BrowserFrame domain={venture.domain} className="mr-[14%]">
              <div className="media-zoom absolute inset-0">
                <Image src={venture.desktop.src} alt={venture.desktop.alt} fill sizes="(min-width: 1280px) 620px, (min-width: 1024px) 50vw, 86vw" className="object-cover object-top" />
              </div>
            </BrowserFrame>
            <PhoneFrame className="absolute bottom-[-6%] right-0 w-[30%] min-w-[110px] max-w-[190px] lg:bottom-[-4%]">
              <Image src={venture.mobile.src} alt={venture.mobile.alt} fill sizes="190px" className="object-cover object-top" />
            </PhoneFrame>
          </a>
          <ul className="mt-14 flex flex-wrap gap-2 lg:mt-16" aria-label={`${venture.name} capabilities`}>
            {venture.capabilities.map((c) => (
              <li key={c}>
                <Chip solid>{c}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

/**
 * Sticky stack: each card pins under the header and the next slides over it.
 * The card underneath recedes via a scroll-driven animation bound to a marker
 * placed just before the next card (timeline-scope shares the names).
 */
export function VentureStack({ ventures, headingLevel = "h3" }: { ventures: Venture[]; headingLevel?: "h2" | "h3" }) {
  const names = ventures.map((_, i) => `--vstack-${i}`);
  return (
    <div className="flex flex-col gap-6 lg:gap-10" style={{ ["timelineScope" as string]: names.join(", ") }}>
      {ventures.map((v, i) => (
        <Fragment key={v.slug}>
          {i > 0 && <div aria-hidden="true" className="-my-3 h-px lg:-my-5" style={{ ["viewTimelineName" as string]: names[i] }} />}
          <VentureCard
            venture={v}
            index={i}
            total={ventures.length}
            headingLevel={headingLevel}
            recede={i < ventures.length - 1}
            className="lg:sticky lg:top-[96px]"
            style={i < ventures.length - 1 ? ({ ["animationTimeline" as string]: names[i + 1] } as React.CSSProperties) : undefined}
          />
        </Fragment>
      ))}
    </div>
  );
}
