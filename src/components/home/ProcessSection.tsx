import { processSection } from "@/content/home";
import { toolbox } from "@/content/ai";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { pad2 } from "@/lib/cn";

/**
 * Five steps on one line (vertical on mobile). The crimson line fills as the
 * section scrolls through (CSS scroll-driven; fully drawn elsewhere), followed
 * by the toolbox.
 */
export function ProcessSection({ index }: { index: string }) {
  return (
    <Section id="process" index={index} label={processSection.label} title={processSection.title} intro={processSection.intro} meta={processSection.meta}>
      <div className="process-track relative">
        {/* Track + fill (desktop) */}
        <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-line-strong md:block" />
        <span aria-hidden="true" className="process-fill absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-accent md:block" />
        {/* Track (mobile) */}
        <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-line-strong md:hidden" />
        <Reveal as="ol" className="relative grid gap-10 md:grid-cols-5 md:gap-6">
          {processSection.steps.map((s, i) => (
            <li key={s.title} data-ri="" style={{ ["--i" as string]: i }} className="relative pl-9 md:pl-0 md:pt-10">
              <span aria-hidden="true" className="absolute left-0 top-0 grid size-[15px] place-items-center rounded-full border border-ink bg-paper">
                <span className="size-[5px] rounded-full bg-accent" />
              </span>
              <p className="text-label text-accent-deep">{pad2(i + 1)}</p>
              <h3 className="display-sm mt-2 !text-[clamp(1.75rem,1.4rem+1vw,2.4rem)] text-ink">{s.title}</h3>
              <p className="mt-3 max-w-[30ch] text-[0.9375rem] leading-relaxed text-mist">{s.body}</p>
            </li>
          ))}
        </Reveal>
      </div>

      <div className="mt-16 border-t border-line pt-8 xl:mt-20">
        <p className="text-label text-mist">{processSection.toolboxLabel}</p>
        <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-5">
          {toolbox.map((g) => (
            <div key={g.group}>
              <dt className="text-label text-ink">{g.group}</dt>
              <dd className="mt-3">
                <ul className="flex flex-wrap gap-1.5">
                  {g.items.map((t) => (
                    <li key={t}>
                      <span className="chip">{t}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
