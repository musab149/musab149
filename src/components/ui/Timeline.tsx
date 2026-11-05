import type { TimelineItem } from "@/content/timeline";
import { Reveal } from "@/components/motion/Reveal";

/** Verified milestones only. Renders nothing when the list is empty. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items.length) return null;
  return (
    <Reveal as="ol" className="relative border-l border-line pl-8">
      {items.map((item, i) => (
        <li key={`${item.date}-${item.title}`} data-ri="" style={{ ["--i" as string]: i }} className="relative pb-10 last:pb-0">
          <span aria-hidden="true" className="absolute -left-[37px] top-1.5 size-[9px] rounded-full bg-lime ring-4 ring-surface" />
          <p className="text-label text-muted">{item.date}</p>
          <h3 className="mt-2 text-h3 text-fg">{item.title}</h3>
          {item.body && <p className="mt-2 max-w-[56ch] text-muted">{item.body}</p>}
        </li>
      ))}
    </Reveal>
  );
}
