import { workSection } from "@/content/home";
import { ventures } from "@/content/ventures";
import { featuredProjects, isWorkPreview } from "@/lib/work";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { RegMarks } from "@/components/ui/RegMarks";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { pad2 } from "@/lib/cn";

/** Honest state shown until real case studies are added to src/content/work.ts. */
export function WorkEmptyState() {
  const pixelpk = ventures.find((v) => v.slug === "pixelpk-technologies");
  const services = pixelpk?.technology ?? [];
  return (
    <Reveal className="relative grid-site gap-y-10 rounded-[var(--radius-card)] border border-line bg-card p-6 sm:p-8 xl:p-12">
      <RegMarks />
      <div data-ri="" className="col-span-12 flex flex-col justify-between gap-10 lg:col-span-6">
        <div>
          <p className="text-label text-muted">Portfolio</p>
          <h3 className="mt-6 max-w-[22ch] text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em] text-fg">
            {workSection.empty.title}
          </h3>
          <p className="mt-5 max-w-[46ch] text-muted">{workSection.empty.body}</p>
        </div>
        <div>
          <Button href={workSection.empty.cta.href} variant="primary">
            {workSection.empty.cta.label}
          </Button>
        </div>
      </div>
      <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 lg:col-span-5 lg:col-start-8">
        <p className="text-label text-muted">What the Pixelpk team builds</p>
        <ul className="mt-5 border-t border-line">
          {services.map((s, i) => (
            <li key={s} className="flex items-baseline gap-4 border-b border-line py-3.5">
              <span className="text-label text-muted">{pad2(i + 1)}</span>
              <span className="font-medium text-fg">{s}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/** 04 — Selected work (light, chapter C). */
export function WorkStack({ index }: { index: string }) {
  const projects = featuredProjects(6);
  return (
    <Section
      id="work"
      index={index}
      label={workSection.label}
      title={workSection.title}
      intro={workSection.intro}
      link={projects.length ? workSection.link : undefined}
    >
      {isWorkPreview && (
        <p className="mb-6 rounded-full border border-dashed border-line-strong px-4 py-2 text-center text-label text-muted">
          Design preview · sample cards · not shown in production
        </p>
      )}
      {projects.length ? <WorkExplorer projects={projects} /> : <WorkEmptyState />}
    </Section>
  );
}
