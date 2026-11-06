import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate, type InsightMeta } from "@/lib/insights-shared";

/** Insight card in the reference's blog style: date, condensed title, summary, read time. */
export function InsightCard({ post }: { post: InsightMeta }) {
  return (
    <article className="group card relative flex h-full flex-col p-6 xl:p-7">
      {post.image && (
        <div className="media-zoom relative mb-6 aspect-[16/10] overflow-clip rounded-[var(--radius-sm)] bg-paper-3">
          <Image src={post.image} alt={post.imageAlt ?? ""} fill sizes="(min-width: 1280px) 400px, (min-width: 768px) 45vw, 92vw" className="object-cover" />
        </div>
      )}
      <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-label text-mist">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.category}</span>
        {post.draft && <span className="rounded-full bg-accent px-2 py-0.5 text-white">Draft</span>}
      </p>
      <h3 className="title-caps mt-4 !text-[1.6rem] text-ink">
        <Link href={`/insights/${post.slug}`} className="after:absolute after:inset-0">
          {post.title}
        </Link>
      </h3>
      {post.description && <p className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-mist">{post.description}</p>}
      <span className="link-mono mt-auto flex items-center gap-2 pt-6 text-ink">
        {post.readingMinutes} min read
        <ArrowRight aria-hidden="true" className="arrow-shift size-3.5" />
      </span>
    </article>
  );
}
