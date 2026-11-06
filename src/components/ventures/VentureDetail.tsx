import Image from "next/image";
import type { Venture } from "@/content/ventures";
import { confirmedProofPoints, flags } from "@/content/site";
import { getProject } from "@/lib/work";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ExternalLink } from "@/components/ui/Button";
import { Chip, StatusBadge } from "@/components/ui/Chip";
import { BrowserFrame, PhoneFrame } from "@/components/work/DeviceFrame";
import { ProjectCard } from "@/components/work/ProjectCard";
import { toCard } from "@/lib/work";
import { cn, pad2 } from "@/lib/cn";

/** Venture detail: hero with real screenshots, figures, the why, my role and the stack. */
export function VentureDetail({ venture, related }: { venture: Venture; related: Venture[] }) {
  const proofs = confirmedProofPoints(venture.slug);
  const showFigures = venture.slug !== "pixelpk-technologies" || flags.pixelpkFigures;
  const caseStudy = venture.caseStudy ? getProject(venture.caseStudy) : undefined;
  let n = 1;
  const idx = () => pad2(++n);

  return (
    <>
      <section data-hero="" aria-labelledby="page-title" className="theme-light relative isolate overflow-clip pt-32 md:pt-36">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div className="container-site pb-[clamp(3rem,6vw,5rem)]">
          <p className="hero-fade flex flex-wrap items-center justify-between gap-3 text-label text-mist">
            <span className="flex items-center gap-2.5">
              <span className="dot-accent" aria-hidden="true" />
              <span className="text-ink">01</span> Venture · {venture.category}
            </span>
            <StatusBadge label={venture.status} />
          </p>
          <div className="grid-site mt-8 items-center gap-y-12">
            <div className="col-span-12 lg:col-span-5">
              <Image src={venture.logo.src} alt={`${venture.name} logo`} width={venture.logo.width} height={venture.logo.height} sizes="200px" className="hero-fade h-9 w-auto" />
              <h1 id="page-title" className="display-md mt-6 text-ink">
                {venture.name}
              </h1>
              <p className="emph mt-3 block text-[clamp(1.5rem,1.2rem+1vw,2.1rem)]">{venture.tagline}</p>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-mist">{venture.mission}</p>
              <p className="mt-4 text-label text-mist">
                My role · <span className="text-ink">{venture.role}</span>
              </p>
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
              {showFigures && <p className="mt-2 text-label text-mist">Figures as published on pixelpk.com</p>}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={venture.url} variant="ink" full>
                  Visit {venture.domain}
                </Button>
                <Button href="/contact" variant="outline" full>
                  Talk to me about it
                </Button>
              </div>
            </div>
            <div className="relative col-span-12 lg:col-span-7">
              <BrowserFrame domain={venture.domain} className="mr-[12%]">
                <Image src={venture.desktop.src} alt={venture.desktop.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1024px) 680px, 62vw" className="object-cover object-top" />
              </BrowserFrame>
              <PhoneFrame className="absolute -bottom-8 right-0 w-[28%] min-w-[110px] max-w-[200px]">
                <Image src={venture.mobile.src} alt={venture.mobile.alt} fill sizes="200px" className="object-cover object-top" />
              </PhoneFrame>
            </div>
          </div>
        </div>
      </section>

      <Section size="display-md" index={idx()} label="Overview" title={"What it\n*is*."}>
        <div className="grid-site gap-y-10">
          <p className="lede col-span-12 text-ink lg:col-span-7">{venture.overview}</p>
          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-label text-mist">Capabilities</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {venture.capabilities.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
            {proofs.length > 0 && (
              <ul className="mt-6 flex flex-col gap-1 text-label text-mist">
                {proofs.map((p) => (
                  <li key={p.id}>
                    <ExternalLink href={p.source}>{p.label}</ExternalLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </Section>

      <Section size="display-md" theme="dark" index={idx()} label="Why it exists" title={"Problem &\n*approach*."}>
        <Reveal as="div" className="grid gap-3 md:grid-cols-2">
          {[
            { k: "The problem", v: venture.problem },
            { k: "The approach", v: venture.approach },
          ].map((b, i) => (
            <article key={b.k} data-ri="" style={{ ["--i" as string]: i }} className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-7 xl:p-9">
              <p className="text-label text-accent-bright">
                {pad2(i + 1)} · {b.k}
              </p>
              <p className="mt-5 text-[1.125rem] leading-relaxed text-paper">{b.v}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section size="display-md" index={idx()} label="My role & technology" title={"How I'm\n*involved*."}>
        <div className="grid-site gap-y-10">
          <p className="lede col-span-12 text-ink lg:col-span-6">{venture.ahmedsRole}</p>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-label text-mist">Technology</p>
            <ul className="mt-4 border-t border-line">
              {venture.technology.map((t, i) => (
                <li key={t} className="flex gap-4 border-b border-line py-3.5 text-[0.9375rem] text-ink">
                  <span className="text-label text-accent-deep">{pad2(i + 1)}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {caseStudy && (
        <Section size="display-md" index={idx()} label="Case study" title={"Read the\n*case study*."}>
          <div className="grid md:grid-cols-2">
            <ProjectCard project={toCard(caseStudy)} index={0} />
          </div>
        </Section>
      )}

      {related.length > 0 && (
        <Section size="display-md" index={idx()} label="Related" title={"Also\n*building*."}>
          <ul className="grid gap-3 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="card flex flex-col justify-between gap-8 p-7">
                <div>
                  <Image src={r.logo.src} alt={`${r.name} logo`} width={r.logo.width} height={r.logo.height} sizes="200px" className="h-7 w-auto" />
                  <p className="mt-6 text-label text-mist">{r.category}</p>
                  <h2 className="display-sm mt-2 text-ink">{r.name}</h2>
                  <p className="mt-3 text-mist">{r.description}</p>
                </div>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
                  <Button href={`/ventures/${r.slug}`} variant="text">
                    About {r.name}
                  </Button>
                  <Button href={r.url} variant="text">
                    {r.domain}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
