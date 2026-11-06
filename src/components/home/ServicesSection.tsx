import { ArrowUpRight } from "lucide-react";
import { servicesSection } from "@/content/home";
import { services } from "@/content/services";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn, pad2 } from "@/lib/cn";

/** 3×3 service grid. The featured card (Agentic AI) is set in ink. */
export function ServicesSection({ index }: { index: string }) {
  return (
    <Section
      id="services"
      index={index}
      label={servicesSection.label}
      title={servicesSection.title}
      intro={servicesSection.intro}
      meta={servicesSection.meta}
    >
      <Reveal as="ul" className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {services.map((s, i) => {
          const featured = "featured" in s && s.featured;
          return (
            <li key={s.title} data-ri="" style={{ ["--i" as string]: i }}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex h-full min-h-[15rem] flex-col justify-between gap-8 rounded-[var(--radius-card)] p-6 transition-[transform,border-color] duration-300 hover:-translate-y-1 xl:p-7",
                  featured ? "theme-dark bg-ink text-paper" : "border border-line bg-paper-2 text-ink hover:border-line-strong",
                )}
              >
                <div>
                  <p className={cn("text-label", featured ? "text-accent-bright" : "text-accent-deep")}>{pad2(i + 1)}</p>
                  <h3 className="title-caps mt-4 max-w-[16ch]">{s.title}</h3>
                  <p className={cn("mt-3 text-[0.9375rem] leading-relaxed", featured ? "text-fog" : "text-mist")}>{s.body}</p>
                  {"tags" in s && s.tags && (
                    <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Includes">
                      {s.tags.map((t) => (
                        <li key={t}>
                          <span className="chip border-paper/25 text-paper">{t}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="link-mono flex items-center gap-2">
                  <span>On pixelpk.com</span>
                  <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span className="sr-only">(opens in a new tab)</span>
                </span>
              </a>
            </li>
          );
        })}
      </Reveal>
    </Section>
  );
}
