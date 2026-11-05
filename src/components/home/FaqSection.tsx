import { faqSection } from "@/content/home";
import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { FaqList } from "./FAQ";

/** 11 — FAQ (light, same chapter as Insights). */
export function FaqSection({ index }: { index: string }) {
  return (
    <Section id="faq" divider index={index} label={faqSection.label} title={faqSection.title}>
      <FaqList items={faq} />
    </Section>
  );
}
