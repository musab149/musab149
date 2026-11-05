import Image from "next/image";
import type { Venture } from "@/content/ventures";
import { confirmedProofPoints } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { BrowserFrame } from "@/components/work/DeviceFrame";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { Button, ExternalLink } from "@/components/ui/Button";
import { Chip, StatusBadge } from "@/components/ui/Chip";
import { Timeline } from "@/components/ui/Timeline";
import { Wordmark } from "./VentureCard";
import { pad2 } from "@/lib/cn";

/** Venture detail body (brief §8): mission, overview, problem, approach, role, tech, milestones, screenshots. */
export function VentureDetail({ venture, related }: { venture: Venture; related: Venture[] }) {
  const proofs = confirmedProofPoints(venture.slug);
  const shots = venture.screenshots.length ? venture.screenshots : [venture.photo];
  let n = 1;
  const next = () => pad2(++n);

  return (
    <>
      {/* Hero (dark so the lime wordmark accent keeps its contrast) */}
      <section data-hero="" aria-labelledby="page-title" className="theme-dark relative isolate overflow-hidden">
        <div className="hero-grid motif-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site pb-[clamp(3.5rem,7vw,7rem)] pt-[clamp(2.5rem,5vw,5rem)]">
          <div className="grid-site items-end gap-y-12">
            <div className="col-span-12 lg:col-span-6">
              <p className="hero-fade flex flex-wrap items-center gap-x-4 gap-y-2 text-label text-muted">
                <span>
                  <span className="text-fg">01</span> — Venture · {venture.category}
                </span>
                <StatusBadge label={venture.status} />
              </p>
              <h1 id="page-title" className="hero-fade mt-8 text-display text-fg" style={{ ["--d" as string]: "0.1s" }}>
                <Wordmark venture={venture} />
                <span className="sr-only"> — {venture.name}</span>
              </h1>
              <p className="hero-fade mt-6 text-meta text-muted" style={{ ["--d" as string]: "0.2s" }}>
                My role: <span className="text-fg">{venture.role}</span>
              </p>
              <p className="hero-fade mt-8 max-w-[44ch] text-xl leading-relaxed text-fg" style={{ ["--d" as string]: "0.3s" }}>
                {venture.mission}
              </p>
              <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row" style={{ ["--d" as string]: "0.4s" }}>
                <Button href={venture.url} variant="primary" full>
                  Visit {venture.domain}
                </Button>
                <Button href="/contact" variant="secondary" full>
                  Talk to me about it
                </Button>
              </div>
            </div>
            <div className="hero-fade col-span-12 lg:col-span-6" style={{ ["--d" as string]: "0.3s" }}>
              <BrowserFrame domain={venture.domain} screenClassName="aspect-[16/11]">
                <ParallaxFrame>
                  <div className="photo-grade absolute inset-0">
                    <Image src={shots[0].src} alt={shots[0].alt} fill priority sizes="(min-width: 1024px) 600px, 92vw" className="object-cover" />
                  </div>
                </ParallaxFrame>
              </BrowserFrame>
              {shots[0].caption && <p className="mt-3 text-label text-muted">{shots[0].caption}</p>}
            </div>
          </div>
        </div>
      </section>

      <Section index={next()} label="Overview" title="What it *is*.">
        <Reveal className="grid-site gap-y-10">
          <p data-ri="" className="col-span-12 text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.5] tracking-[-0.01em] text-fg xl:col-span-8">
            {venture.overview}
          </p>
          <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 xl:col-span-3 xl:col-start-10">
            <p className="text-label text-muted">Capabilities</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {venture.capabilities.map((c) => (
                <li key={c}>
                  <Chip>{c}</Chip>
                </li>
              ))}
            </ul>
            {venture.surfaces && (
              <>
                <p className="mt-8 text-label text-muted">Available on</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {venture.surfaces.map((s) => (
                    <li key={s}>
                      <Chip tone="solid">{s}</Chip>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </Reveal>
      </Section>

      <Section index={next()} label="Problem & approach" title="Why it *exists*." divider>
        <Reveal as="div" className="grid gap-[var(--gutter)] md:grid-cols-2">
          {[
            { k: "The problem", v: venture.problem },
            { k: "The approach", v: venture.approach },
          ].map((b, i) => (
            <article key={b.k} data-ri="" style={{ ["--i" as string]: i }} className="rounded-[var(--radius-card)] border border-line bg-card p-7 xl:p-10">
              <p className="text-label text-muted">
                <span className="text-fg">{pad2(i + 1)}</span> — {b.k}
              </p>
              <p className="mt-6 text-lg leading-relaxed text-fg">{b.v}</p>
            </article>
          ))}
        </Reveal>
      </Section>

      <Section theme="dark" index={next()} label="My role & technology" title="How I'm *involved*.">
        <Reveal className="grid-site gap-y-12">
          <div data-ri="" className="col-span-12 lg:col-span-6">
            <p className="text-label text-muted">My role · {venture.role}</p>
            <p className="mt-6 text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.5] tracking-[-0.01em] text-fg">{venture.ahmedsRole}</p>
          </div>
          <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 lg:col-span-5 lg:col-start-8">
            <p className="text-label text-muted">Technology</p>
            <ul className="mt-5 border-t border-line">
              {venture.technology.map((t, i) => (
                <li key={t} className="flex items-baseline gap-4 border-b border-line py-3.5">
                  <span className="text-label text-muted">{pad2(i + 1)}</span>
                  <span className="font-medium text-fg">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {(venture.milestones.length > 0 || proofs.length > 0) && (
        <Section index={next()} label="Milestones" title="Verified *milestones*.">
          <Timeline items={venture.milestones} />
          {proofs.length > 0 && (
            <ul className="mt-10 flex flex-col gap-2">
              {proofs.map((p) => (
                <li key={p.id}>
                  <ExternalLink href={p.source}>{p.label}</ExternalLink>
                </li>
              ))}
            </ul>
          )}
        </Section>
      )}

      {related.length > 0 && (
        <Section index={next()} label="Related" title="Also *building*." divider>
          <ul className="grid gap-[var(--gutter)] md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug} className="flex flex-col justify-between gap-8 rounded-[var(--radius-card)] border border-line bg-card p-7 xl:p-9">
                <div>
                  <p className="text-label text-muted">{r.category}</p>
                  <h2 className="mt-6 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.03em] text-fg">{r.name}</h2>
                  <p className="mt-3 text-muted">{r.tagline}</p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <Button href={`/ventures/${r.slug}`} variant="text">
                    Read more
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
