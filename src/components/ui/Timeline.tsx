import type { TimelineItem } from "@/content/about";
import { Reveal } from "@/components/motion/Reveal";

/** Verified milestones only (anasw-style year rows). Renders nothing while empty. */
export function Timeline({ items }: { items: TimelineItem[] }) {
  if (!items.length) return null;
  return (
    <Reveal as="ol" className="border-t border-line">
      {items.map((item, i) => (
        <li key={`${item.date}-${item.title}`} data-ri="" style={{ ["--i" as string]: i }} className="grid grid-cols-[6rem_1fr] gap-6 border-b border-line py-5">
          <span className="figure-md text-ink">{item.date}</span>
          <span>
            <span className="block font-semibold text-ink">{item.title}</span>
            {item.body && <span className="mt-1 block text-[0.9375rem] text-mist">{item.body}</span>}
          </span>
        </li>
      ))}
    </Reveal>
  );
}
