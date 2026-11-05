import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/work";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Chip } from "@/components/ui/Chip";
import { BrowserFrame, PhoneFrame } from "./DeviceFrame";
import { ProjectVisual } from "./ProjectCard";
import { pad2 } from "@/lib/cn";

/** Case-study template: Context → Challenge → What we built → AI & tech → Outcome (verified only) → Gallery → Next. */
export function CaseStudy({ project, next }: { project: Project; next?: Project }) {
  let n = 1;
  const idx = () => pad2(++n);
  const facts = [
    { k: "Client", v: project.clientLabel },
    { k: "Industry", v: project.industry },
    { k: "Platforms", v: project.platforms.join(" · ") },
    ...(project.year ? [{ k: "Year", v: project.year }] : []),
  ];

  return (
    <>
      <section data-hero="" aria-labelledby="page-title" className="theme-light relative isolate overflow-hidden">
        <div className="hero-grid motif-grid absolute inset-0 -z-10" aria-hidden="true" />
        <div className="container-site pb-[clamp(3.5rem,7vw,7rem)] pt-[clamp(2.5rem,5vw,5rem)]">
          <p className="hero-fade text-label text-muted">
            <span className="text-fg">01</span> — Case study · {project.industry}
          </p>
          <h1 id="page-title" className="hero-fade mt-6 max-w-[18ch] text-display text-fg" style={{ ["--d" as string]: "0.1s" }}>
            {project.title}
          </h1>
          <p className="hero-fade mt-8 max-w-[58ch] text-lg leading-relaxed text-muted xl:text-xl" style={{ ["--d" as string]: "0.3s" }}>
            {project.summary}
          </p>
          <dl className="hero-fade mt-12 grid grid-cols-2 border-t border-line md:grid-cols-4" style={{ ["--d" as string]: "0.4s" }}>
            {facts.map((f) => (
              <div key={f.k} className="border-b border-line py-4 pr-4">
                <dt className="text-label text-muted">{f.k}</dt>
                <dd className="mt-2 font-medium text-fg">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="hero-fade mt-14" style={{ ["--d" as string]: "0.5s" }}>
            <ProjectVisual project={project} sizes="(min-width: 1280px) 1200px, 94vw" />
          </div>
        </div>
      </section>

      <Section index={idx()} label="Challenge" title="The *challenge*." divider>
        <p className="measure text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-fg">{project.challenge}</p>
      </Section>

      <Section theme="dark" index={idx()} label="What we built" title="What we *built*.">
        <Reveal className="grid-site gap-y-10">
          <p data-ri="" className="col-span-12 text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-fg lg:col-span-7">
            {project.whatWeBuilt}
          </p>
          <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-label text-muted">AI & technology</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.aiOrTech.map((t) => (
                <li key={t}>
                  <Chip>{t}</Chip>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Section>

      {project.outcome && (
        <Section index={idx()} label="Outcome" title="The *outcome*.">
          <p className="measure text-[clamp(1.125rem,1rem+0.5vw,1.375rem)] leading-relaxed text-fg">{project.outcome}</p>
        </Section>
      )}

      {project.images.length > 1 && (
        <Section index={idx()} label="Gallery" title="Inside the *product*." divider={!project.outcome}>
          <Reveal as="ul" className="grid gap-[var(--gutter)] md:grid-cols-2">
            {project.images.slice(1).map((img, i) => (
              <li key={img.src} data-ri="" style={{ ["--i" as string]: i }}>
                {img.frame === "phone" ? (
                  <PhoneFrame>
                    <Image src={img.src} alt={img.alt} fill sizes="280px" className="object-cover" />
                  </PhoneFrame>
                ) : (
                  <BrowserFrame screenClassName="aspect-[16/10]">
                    <Image src={img.src} alt={img.alt} fill sizes="(min-width: 768px) 600px, 92vw" className="object-cover object-top" />
                  </BrowserFrame>
                )}
              </li>
            ))}
          </Reveal>
        </Section>
      )}

      <section aria-label="More" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="flex flex-col gap-6 py-16 md:flex-row md:items-center md:justify-between">
            {project.liveUrl ? (
              <Button href={project.liveUrl} variant="secondary">
                Visit the live product
              </Button>
            ) : (
              <Button href="/work" variant="text">
                All work
              </Button>
            )}
            {next && (
              <Link href={`/work/${next.slug}`} className="group flex items-center gap-4 text-right">
                <span>
                  <span className="block text-label text-muted">Next project</span>
                  <span className="link-draw text-h3 text-fg">
                    <span className="link-text">{next.title}</span>
                  </span>
                </span>
                <ArrowRight aria-hidden="true" className="btn-arrow size-5 text-fg" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
