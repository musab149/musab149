import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/work";
import { heroImage } from "@/lib/work";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { RiseText } from "@/components/ui/Emphasis";
import { PhoneFrame } from "./DeviceFrame";
import { cn, pad2 } from "@/lib/cn";

/**
 * Case-study template. Content is Pixelpk's published case study; the full
 * version lives on pixelpk.com (linked, and set as the canonical URL).
 */
export function CaseStudy({ project, next }: { project: Project; next?: Project }) {
  const hero = heroImage(project);
  const gallery = project.images.filter((i) => i !== hero);
  let n = 1;
  const idx = () => pad2(++n);
  const facts = [
    { k: "Client", v: project.facts.client },
    { k: "Industry", v: project.facts.industry },
    { k: "We built", v: project.facts.built },
    { k: "Core technology", v: project.facts.tech },
  ].filter((f) => f.v);

  return (
    <>
      {/* Hero */}
      <section data-hero="" aria-labelledby="page-title" className="theme-light relative isolate overflow-clip pt-32 md:pt-36">
        <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
        <div className="container-site">
          <p className="hero-fade flex flex-wrap items-center justify-between gap-3 text-label text-mist">
            <span className="flex items-center gap-2.5">
              <span className="dot-accent" aria-hidden="true" />
              <span className="text-ink">Case study</span> · {project.category}
            </span>
            <span>{project.tags.join(" · ")}</span>
          </p>
          <div className="grid-site mt-6 items-end gap-y-8">
            <div className="col-span-12 lg:col-span-8">
              <h1 id="page-title" className="display text-ink">
                <RiseText text={project.name} variant="hero" />
              </h1>
              <p className="hero-fade emph mt-3 block text-[clamp(1.5rem,1.2rem+1vw,2.25rem)]" style={{ ["--d" as string]: "0.25s" }}>
                {project.kicker}
              </p>
            </div>
            <div className="hero-fade col-span-12 flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:justify-end" style={{ ["--d" as string]: "0.35s" }}>
              {project.live && (
                <Button href={`https://${project.live}`} variant="ink" full>
                  Visit {project.live}
                </Button>
              )}
              <Button href={project.source} variant="outline" full>
                Full case study
              </Button>
            </div>
          </div>
          <p className="hero-fade lede mt-8 max-w-[60ch] text-mist" style={{ ["--d" as string]: "0.4s" }}>
            {project.summary}
          </p>
          <dl className="hero-fade mt-10 grid grid-cols-2 border-t border-line lg:grid-cols-4" style={{ ["--d" as string]: "0.5s" }}>
            {facts.map((f, i) => (
              <div key={f.k} className={cn("border-b border-line py-4 pr-4", i % 2 === 1 && "border-l pl-5 lg:pl-5", i === 2 && "lg:border-l lg:pl-5")}>
                <dt className="text-label text-mist">{f.k}</dt>
                <dd className="mt-2 text-[0.9375rem] font-medium leading-snug text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="container-site mt-10">
          <div className="relative aspect-[16/10] overflow-clip rounded-[var(--radius-panel)] bg-paper-3">
            <Image src={hero.src} alt={hero.alt} fill loading="eager" fetchPriority="high" sizes="(min-width: 1360px) 1288px, 94vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Figures */}
      {(project.highlights.length > 0 || project.stats.length > 0) && (
        <section aria-label="Key figures" className="theme-light">
          <div className="container-site pt-[clamp(3rem,6vw,5rem)]">
            {project.stats.length > 0 && (
              <Reveal as="ul" className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
                {project.stats.map((s, i) => (
                  <li
                    key={s.label}
                    data-ri=""
                    style={{ ["--i" as string]: i }}
                    className={cn("border-b border-line py-7 lg:border-b-0 lg:border-l lg:pl-6", i % 2 === 1 ? "border-l pl-5" : "pr-4", i === 0 && "lg:border-l-0 lg:pl-0")}
                  >
                    <p className="figure-xl text-ink">{s.value}</p>
                    <p className="mt-3 text-[0.9375rem] text-mist">{s.label}</p>
                  </li>
                ))}
              </Reveal>
            )}
            {project.highlights.length > 0 && (
              <ul className="mt-6 grid gap-3 md:grid-cols-3">
                {project.highlights.map((h) => (
                  <li key={h.label} className="card flex items-baseline justify-between gap-4 px-5 py-4">
                    <span className="text-[1.0625rem] font-bold text-ink">{h.value}</span>
                    <span className="text-right text-label text-mist">{h.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* The brief */}
      <Section size="display-md" index={idx()} label="The brief" title={`${project.brief.title.replace(/\.$/, "")}.`} meta={project.builtFor.length ? `Built for ${project.builtFor.join(", ")}` : undefined}>
        <div className="grid-site gap-y-10">
          <p className="lede col-span-12 text-ink lg:col-span-6">{project.brief.text}</p>
          {project.objectives.length > 0 && (
            <div className="col-span-12 lg:col-span-5 lg:col-start-8">
              <p className="text-label text-mist">Objectives</p>
              <ol className="mt-4 border-t border-line">
                {project.objectives.map((o, i) => (
                  <li key={o} className="flex gap-4 border-b border-line py-3.5 text-[0.9375rem] text-ink">
                    <span className="text-label text-accent-deep">{pad2(i + 1)}</span>
                    {o}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </Section>

      {/* What we built */}
      {project.built.features.length > 0 && (
        <Section size="display-md" theme="dark" index={idx()} label="What we built" title={`${project.built.title.replace(/\.$/, "")}.`} intro={project.built.intro || undefined}>
          <Reveal as="ul" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {project.built.features.map((f, i) => (
              <li key={f.title} data-ri="" style={{ ["--i" as string]: i % 3 }} className="rounded-[var(--radius-card)] border border-line bg-ink-2 p-6">
                <p className="text-label text-accent-bright">{pad2(i + 1)}</p>
                <h3 className="mt-3 text-[1.125rem] font-semibold text-paper">{f.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-fog">{f.text}</p>
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      {/* How it works */}
      {project.how.steps.length > 0 && (
        <Section size="display-md" index={idx()} label="How it works" title={`${project.how.title.replace(/\.$/, "")}.`} intro={project.how.intro || undefined}>
          <div className="relative">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong md:block" />
            <Reveal as="ol" className="relative grid gap-8 md:grid-cols-5 md:gap-6">
              {project.how.steps.map((s, i) => (
                <li key={s.title} data-ri="" style={{ ["--i" as string]: i }} className="relative pl-9 md:pl-0 md:pt-10">
                  <span aria-hidden="true" className="absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border border-ink bg-paper">
                    <span className="size-[5px] rounded-full bg-accent" />
                  </span>
                  <p className="text-label text-accent-deep">Step {pad2(i + 1)}</p>
                  <h3 className="mt-2 text-[1.125rem] font-semibold leading-snug text-ink">{s.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{s.text}</p>
                </li>
              ))}
            </Reveal>
          </div>
          {project.architecture.text && (
            <div className="mt-14 grid-site gap-y-4 border-t border-line pt-8">
              <p className="col-span-12 text-label text-mist lg:col-span-3">{project.architecture.title || "Architecture"}</p>
              <p className="col-span-12 text-[1.0625rem] leading-relaxed text-ink lg:col-span-8">{project.architecture.text}</p>
            </div>
          )}
        </Section>
      )}

      {/* Product tour */}
      {gallery.length > 0 && (
        <Section index={idx()} label="Product tour" title={"Inside the\n*product*."} meta={`${gallery.length} ${gallery.length === 1 ? "screen" : "screens"} · Pixelpk`}>
          <Reveal as="ul" className={cn("grid gap-3", gallery.length > 1 && "md:grid-cols-2")}>
            {gallery.map((img, i) => (
              <li
                key={img.src}
                data-ri=""
                style={{ ["--i" as string]: i }}
                className={cn(gallery.length > 1 && gallery.length % 2 === 1 && i === gallery.length - 1 && "md:col-span-2")}
              >
                <figure>
                  {img.kind === "mobile" ? (
                    <div className="grid place-items-center rounded-[var(--radius-panel)] bg-paper-3 p-8">
                      <PhoneFrame className="w-[240px]">
                        <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover object-top" />
                      </PhoneFrame>
                    </div>
                  ) : (
                    <div className="relative overflow-clip rounded-[var(--radius-panel)] bg-paper-3" style={{ aspectRatio: `${img.width} / ${img.height}` }}>
                      <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 640px, 94vw" className="object-cover" />
                    </div>
                  )}
                  <figcaption className="mt-3 text-label text-mist">{img.alt}</figcaption>
                </figure>
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      {/* Challenges */}
      {project.challenges.length > 0 && (
        <Section index={idx()} label="Challenges" title={"Problems,\n*solved*."}>
          <Reveal as="ul" className="grid gap-3 md:grid-cols-2">
            {project.challenges.map((c, i) => (
              <li key={c.title} data-ri="" style={{ ["--i" as string]: i % 2 }} className="card p-6 xl:p-8">
                <p className="text-label text-accent-deep">{pad2(i + 1)}</p>
                <h3 className="title-caps mt-3">{c.title}</h3>
                <dl className="mt-5 grid gap-4 border-t border-line pt-4">
                  <div>
                    <dt className="text-label text-mist">Challenge</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{c.challenge}</dd>
                  </div>
                  <div>
                    <dt className="text-label text-mist">How it was solved</dt>
                    <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink">{c.solution}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      {/* Stack */}
      {project.stack.length > 0 && (
        <Section index={idx()} label="Technology" title={"The\n*stack*."}>
          <ul className="grid grid-cols-2 border-t border-line md:grid-cols-3 xl:grid-cols-4">
            {project.stack.map((s) => (
              <li key={s.name + s.role} className="flex flex-col border-b border-line py-4 pr-4">
                <span className="text-[1rem] font-semibold text-ink">{s.name}</span>
                <span className="mt-0.5 text-[0.8125rem] text-mist">{s.role}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-label text-mist">
            <span>Case study published by Pixelpk Technologies.</span>
            <a href={project.source} target="_blank" rel="noopener noreferrer" className="link-draw text-ink">
              <span className="link-text">Read it on pixelpk.com</span>
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </Section>
      )}

      {/* Next project */}
      {next && (
        <section aria-label="Next case study" className="theme-light">
          <div className="container-site pb-[var(--section-pad)]">
            <Link href={`/work/${next.slug}`} className="group grid-site items-center gap-y-6 rounded-[var(--radius-panel)] border border-line bg-paper-2 p-5 sm:p-8">
              <div className="col-span-12 md:col-span-5">
                <p className="text-label text-mist">Next case study · {next.category}</p>
                <p className="display-md mt-3 text-ink">{next.name}</p>
                <p className="emph mt-2 block text-[1.5rem]">{next.kicker}</p>
                <span className="link-mono mt-6 inline-flex items-center gap-2 text-ink">
                  Read the case study
                  <ArrowRight aria-hidden="true" className="arrow-shift size-3.5" />
                </span>
              </div>
              <div className="media-zoom relative col-span-12 aspect-[16/10] overflow-clip rounded-[var(--radius-card)] bg-paper-3 md:col-span-7">
                <Image src={heroImage(next).src} alt="" fill sizes="(min-width: 768px) 700px, 92vw" className="object-cover" />
              </div>
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
