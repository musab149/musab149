import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { pad2 } from "@/lib/cn";

/** Accessible accordion on native <details>/<summary>. */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Reveal as="div" className="border-t border-line">
      {items.map((item, i) => (
        <details key={item.q} data-ri="" style={{ ["--i" as string]: i }} className="faq-item border-b border-line">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
            <span className="flex items-baseline gap-5">
              <span className="text-label text-accent-text">{pad2(i + 1)}</span>
              <span className="title-caps !text-[clamp(1.25rem,1.05rem+0.6vw,1.6rem)] text-fg">{item.q}</span>
            </span>
            <span className="faq-icon grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-fg">
              <Plus aria-hidden="true" className="size-4" />
            </span>
          </summary>
          <div className="pb-8 pl-[calc(1.25rem+2ch)] pr-14">
            <p className="measure text-[1rem] leading-relaxed text-muted">{item.a}</p>
          </div>
        </details>
      ))}
    </Reveal>
  );
}
