import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/content/work";
import { BrowserFrame, PhoneFrame } from "./DeviceFrame";
import { Chip } from "@/components/ui/Chip";
import { cn, pad2 } from "@/lib/cn";

export function ProjectVisual({ project, sizes }: { project: Project; sizes: string }) {
  const img = project.images[0];
  if (!img) return null;
  if (img.frame === "phone") {
    return (
      <PhoneFrame className="max-w-[240px]">
        <Image src={img.src} alt={img.alt} fill sizes="240px" className="object-cover" />
      </PhoneFrame>
    );
  }
  return (
    <BrowserFrame domain={project.liveUrl ? new URL(project.liveUrl).host : undefined} screenClassName="aspect-[16/10]">
      <Image src={img.src} alt={img.alt} fill sizes={sizes} className="object-cover object-top" />
    </BrowserFrame>
  );
}

/** Case-study card: index, title/client, industry, platforms, summary, framed screenshot, link. */
export function ProjectCard({
  project,
  index,
  layout = "row",
  className,
}: {
  project: Project;
  index: number;
  layout?: "row" | "stack";
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group relative grid h-full grid-cols-12 gap-x-[var(--gutter)] gap-y-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-card p-5 sm:p-7 xl:p-10",
        className,
      )}
    >
      <div
        className={cn(
          "col-span-12 flex flex-col justify-between gap-8",
          layout === "row" && "lg:col-span-5",
        )}
      >
        <div>
          <p className="flex items-center justify-between text-label text-muted">
            <span>
              <span className="text-fg">P/{pad2(index + 1)}</span> · {project.industry}
            </span>
            {project.year && <span>{project.year}</span>}
          </p>
          <h3 className="mt-8 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold leading-[1.08] tracking-[-0.03em] text-fg">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
              {project.title}
            </Link>
          </h3>
          <p className="mt-2 text-meta text-muted">{project.clientLabel}</p>
          <p className="mt-5 line-clamp-2 max-w-[48ch] text-muted">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Platforms">
            {project.platforms.map((p) => (
              <li key={p}>
                <Chip>{p}</Chip>
              </li>
            ))}
          </ul>
        </div>
        <span className="link-draw font-semibold text-fg">
          <span className="link-text">View case study</span>
          <ArrowRight aria-hidden="true" className="btn-arrow size-4" />
        </span>
      </div>
      <div
        className={cn(
          "col-span-12 flex items-center justify-center",
          layout === "row" && "lg:col-span-7",
        )}
      >
        <div className="w-full transition-transform duration-700 ease-[var(--ease-out)] group-hover:-translate-y-1">
          <ProjectVisual project={project} sizes="(min-width: 1280px) 640px, (min-width: 1024px) 55vw, 92vw" />
        </div>
      </div>
    </article>
  );
}
