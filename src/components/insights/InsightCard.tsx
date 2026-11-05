import Image from "next/image";
import Link from "next/link";
import { formatDate, type InsightMeta } from "@/lib/insights-shared";
import { Chip } from "@/components/ui/Chip";

/** Insight card: image zooms to 1.04 on hover and the title underline draws. */
export function InsightCard({ post }: { post: InsightMeta }) {
  return (
    <article className="group relative flex h-full flex-col">
      <div className="photo-grade relative aspect-[16/10] overflow-hidden rounded-[4px] bg-card">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.imageAlt ?? ""}
            fill
            sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 92vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
          />
        ) : (
          <div className="motif-grid absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]" aria-hidden="true">
            <span className="absolute bottom-5 left-5 text-label text-muted">{post.category}</span>
          </div>
        )}
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-label text-muted">
        <Chip>{post.category}</Chip>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingMinutes} min read</span>
        {post.draft && <Chip tone="lime">Draft</Chip>}
      </div>
      <h3 className="mt-4 text-h3 text-fg">
        <Link href={`/insights/${post.slug}`} className="link-draw !inline after:absolute after:inset-0">
          <span className="link-text">{post.title}</span>
        </Link>
      </h3>
      {post.description && <p className="mt-3 line-clamp-2 text-[0.9375rem] leading-relaxed text-muted">{post.description}</p>}
    </article>
  );
}
