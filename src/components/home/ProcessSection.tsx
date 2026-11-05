import { processSection } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { ProcessLine } from "@/components/motion/ProcessLine";

/** 07 — Process (light, same chapter as Expertise). */
export function ProcessSection({ index }: { index: string }) {
  return (
    <Section id="process" divider index={index} label={processSection.label} title={processSection.title}>
      <ProcessLine steps={processSection.steps} />
    </Section>
  );
}
