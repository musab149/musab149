import { Code2, Compass, Sparkles, Users } from "lucide-react";
import { expertiseSection } from "@/content/home";
import { expertise } from "@/content/expertise";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn, pad2 } from "@/lib/cn";

const icons = { code: Code2, sparkles: Sparkles, compass: Compass, users: Users };

/**
 * 06 — Expertise. Four groups (2×2 tablet, 4×1 desktop). Hairlines draw
 * between the groups, then icons and items fade up in order.
 */
export function ExpertiseGrid({ index }: { index: string }) {
  return (
    <Section
      id="expertise"
      index={index}
      label={expertiseSection.label}
      title={expertiseSection.title}
      intro={expertiseSection.intro}
    >
      <Reveal className="relative">
        {/* Drawn grid lines */}
        <span data-draw="x" aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-line-strong" />
        <span data-draw="x" aria-hidden="true" style={{ ["--i" as string]: 2 }} className="absolute inset-x-0 bottom-0 h-px bg-line-strong" />
        <span data-draw="y" aria-hidden="true" style={{ ["--i" as string]: 1 }} className="absolute inset-y-0 left-1/2 hidden w-px bg-line md:block xl:hidden" />
        {[1, 2, 3].map((k) => (
          <span
            key={k}
            data-draw="y"
            aria-hidden="true"
            style={{ ["--i" as string]: k, left: `${k * 25}%` }}
            className="absolute inset-y-0 hidden w-px bg-line xl:block"
          />
        ))}

        <ul className="grid md:grid-cols-2 md:grid-rows-[auto_auto_auto_auto_auto_auto] xl:grid-cols-4 xl:grid-rows-[auto_auto_auto]">
          {expertise.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <li
                key={g.title}
                className={cn(
                  "flex flex-col gap-8 py-10 md:row-span-3 md:grid md:grid-rows-subgrid md:gap-8 md:px-8 md:py-12 xl:px-8",
                  i > 0 && "border-t border-line",
                  i === 1 && "md:border-t-0",
                  "xl:border-t-0",
                  "xl:first:pl-0 xl:last:pr-0",
                  i % 2 === 0 && "md:pl-0 xl:pl-8",
                )}
              >
                <div data-ri="" style={{ ["--i" as string]: 3 + i }} className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-full border border-line-strong text-fg">
                    <Icon aria-hidden="true" className="size-5" strokeWidth={1.5} />
                  </span>
                  <span className="text-label text-muted">{pad2(i + 1)}</span>
                </div>
                <div data-ri="" style={{ ["--i" as string]: 4 + i }}>
                  <h3 className="text-h3 text-fg">{g.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{g.description}</p>
                </div>
                <ul data-ri="" style={{ ["--i" as string]: 5 + i }} className="flex flex-col border-t border-line">
                  {g.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 border-b border-line py-3 text-[0.9375rem] text-fg">
                      <span aria-hidden="true" className="h-px w-3 bg-fg/40" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
