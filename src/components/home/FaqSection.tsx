import { faqSection } from "@/content/home";
import { faq } from "@/content/faq";
import { Section } from "@/components/ui/Section";
import { FaqList } from "./FAQ";

export function FaqSection({ index }: { index: string }) {
  return (
    <Section id="faq" index={index} label={faqSection.label} title={faqSection.title} intro={faqSection.intro}>
      <FaqList items={faq} />
    </Section>
  );
}
