import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import type { ProjectCardData } from "@/lib/work";
import { pad2 } from "@/lib/cn";

/**
 * Portfolio card: Pixelpk's own case-study artwork, then index + tags, the name
 * at display size, the serif kicker, a two-line summary and three highlights.
 */
export function ProjectCard({ project, index, eager = false }: { project: ProjectCardData; index: number; eager?: boolean }) {
  const href = `/work/${project.slug}`;
  return (
    <article className="group relative flex h-full flex-col">
      <div className="media-zoom relative aspect-[16/10] overflow-clip rounded-[var(--radius-card)] bg-paper-3">
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(min-width: 1280px) 640px, (min-width: 768px) 46vw, 92vw"
          className="object-cover"
        />
        <span className="chip absolute left-4 top-4 border-transparent bg-paper-2/92 text-ink backdrop-blur">{project.category}</span>
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 grid size-11 place-items-center rounded-full bg-paper-2 text-ink opacity-0 transition-[opacity,transform] duration-300 group-hover:-translate-y-0.5 group-hover:opacity-100"
        >
          <ArrowUpRight className="size-5" />
        </span>
      </div>

      <div className="mt-5 flex flex-1 flex-col">
        <p className="text-label text-muted">
          <span className="text-accent-text">{pad2(index + 1)}</span> · {project.tags.join(" · ")}
        </p>
        <h3 className="display-sm mt-2 text-fg">
          <Link href={href} className="after:absolute after:inset-0">
            {project.name}
          </Link>
        </h3>
        <p className="emph mt-1 block text-[1.35rem]">{project.kicker}</p>
        <p className="mt-3 line-clamp-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">{project.summary}</p>
        {project.highlights.length > 0 && (
          <div className="mt-auto pt-5">
          <dl className="grid grid-cols-3 gap-4 border-t border-line pt-4">
            {project.highlights.map((h) => (
              <div key={h.label}>
                <dt className="sr-only">{h.label}</dt>
                <dd>
                  <span className="block text-[1rem] font-bold leading-tight tracking-[-0.01em] text-fg">{h.value}</span>
                  <span className="mt-0.5 block text-[0.75rem] leading-snug text-muted">{h.label}</span>
                </dd>
              </div>
            ))}
          </dl>
          </div>
        )}
      </div>
    </article>
  );
}
