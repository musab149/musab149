import type { InsightMeta } from "@/lib/insights-shared";
import { flags } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { RegMarks } from "@/components/ui/RegMarks";
import { InsightCard } from "./InsightCard";

/** Reusable 3-column grid of published insights, with an honest empty state. */
export function InsightGrid({ posts, emptyText }: { posts: InsightMeta[]; emptyText: string }) {
  if (!posts.length) {
    return (
      <Reveal className="relative rounded-[var(--radius-card)] border border-dashed border-line-strong px-6 py-16 text-center sm:px-10 xl:py-20">
        <RegMarks />
        <div data-ri="" className="mx-auto max-w-[46ch]">
          <span className="status-dot" aria-hidden="true" />
          <p className="mt-6 text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-snug tracking-[-0.01em] text-fg">{emptyText}</p>
          {flags.newsletter && <p className="mt-4 text-muted">Get notified when the first piece is published.</p>}
        </div>
      </Reveal>
    );
  }
  return (
    <Reveal as="ul" className="grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((p, i) => (
        <li key={p.slug} data-ri="" style={{ ["--i" as string]: i }}>
          <InsightCard post={p} />
        </li>
      ))}
    </Reveal>
  );
}
