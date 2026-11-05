import { venturesSection } from "@/content/home";
import { ventures } from "@/content/ventures";
import { Section } from "@/components/ui/Section";
import { VentureCard } from "@/components/ventures/VentureCard";

/** 03 — Ventures (dark, chapter B). */
export function VentureShowcase({ index }: { index: string }) {
  return (
    <Section
      id="ventures"
      theme="dark"
      index={index}
      label={venturesSection.label}
      title={venturesSection.title}
      link={venturesSection.link}
    >
      <div className="flex flex-col gap-[var(--gutter)] xl:gap-10">
        {ventures.map((v, i) => (
          <VentureCard key={v.slug} venture={v} index={i} flip={i % 2 === 1} />
        ))}
      </div>
    </Section>
  );
}
