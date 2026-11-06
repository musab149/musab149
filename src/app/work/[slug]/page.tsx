import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allProjects, getProject, nextProject } from "@/lib/work";
import { CaseStudy } from "@/components/work/CaseStudy";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const meta = pageMetadata({ title: `${p.name} case study`, description: p.summary, path: `/work/${p.slug}` });
  // The case study is Pixelpk's; its canonical home is pixelpk.com.
  return { ...meta, alternates: { canonical: p.source } };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <>
      <CaseStudy project={project} next={nextProject(project.slug)} />
      <ContactPanel />
    </>
  );
}
