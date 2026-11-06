import type { InsightMeta } from "@/lib/insights-shared";
import { flags } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { InsightCard } from "./InsightCard";

/** 3-column grid of published insights, with an honest empty state. */
export function InsightGrid({ posts, emptyText }: { posts: InsightMeta[]; emptyText: string }) {
  if (!posts.length) {
    return (
      <Reveal className="card px-6 py-16 text-center sm:px-10 xl:py-24">
        <div data-ri="" className="mx-auto max-w-[44ch]">
          <span className="dot-accent" aria-hidden="true" />
          <p className="lede mt-6 text-ink">{emptyText}</p>
          {flags.newsletter && <p className="mt-4 text-mist">Get notified when the first piece is published.</p>}
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
