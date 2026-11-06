import { venturesSection } from "@/content/home";
import { ventures } from "@/content/ventures";
import { Section } from "@/components/ui/Section";
import { VentureStack } from "@/components/ventures/VentureCard";

/** Dark chapter: the ventures as large stacked cards. */
export function VenturesSection({ index }: { index: string }) {
  return (
    <Section
      id="ventures"
      theme="dark"
      glow
      index={index}
      label={venturesSection.label}
      title={venturesSection.title}
      intro={venturesSection.intro}
      link={{ label: "All ventures", href: "/ventures" }}
    >
      <VentureStack ventures={ventures} />
    </Section>
  );
}
