import { workSection } from "@/content/home";
import { featuredProjects, toCard } from "@/lib/work";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { ProjectCard } from "@/components/work/ProjectCard";

/** Six featured case studies, 2×3. */
export function SelectedWork({ index }: { index: string }) {
  const projects = featuredProjects(6);
  return (
    <Section
      id="work"
      index={index}
      label={workSection.label}
      title={workSection.title}
      intro={workSection.intro}
      link={workSection.link}
    >
      <Reveal as="ul" className="grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 xl:gap-y-20">
        {projects.map((p, i) => (
          <li key={p.slug} data-ri="" style={{ ["--i" as string]: i % 2 }}>
            <ProjectCard project={toCard(p)} index={i} />
          </li>
        ))}
      </Reveal>
      <div className="mt-14 flex justify-center">
        <Button href={workSection.link.href} variant="ink">
          {workSection.link.label}
        </Button>
      </div>
    </Section>
  );
}
