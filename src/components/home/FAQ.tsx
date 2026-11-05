import { Plus } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

/** Accessible accordion on native <details>/<summary>. */
export function FaqList({ items }: { items: readonly { q: string; a: string }[] }) {
  return (
    <Reveal as="div" className="border-t border-line">
      {items.map((item, i) => (
        <details key={item.q} data-ri="" style={{ ["--i" as string]: i }} className="faq-item group border-b border-line">
          <summary className="flex min-h-16 items-center justify-between gap-6 py-6 text-left">
            <span className="flex items-baseline gap-5">
              <span className="text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[clamp(1.0625rem,1rem+0.4vw,1.375rem)] font-semibold tracking-[-0.01em] text-fg">
                {item.q}
              </span>
            </span>
            <span className="faq-icon grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-fg">
              <Plus aria-hidden="true" className="size-4" />
            </span>
          </summary>
          <div className="pb-8 pl-[calc(1.25rem+2ch)] pr-12">
            <p className="measure text-muted">{item.a}</p>
          </div>
        </details>
      ))}
    </Reveal>
  );
}
