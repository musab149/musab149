import { roles } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { RolesAccordion } from "./RolesAccordion";

export function RolesSection({ index }: { index: string }) {
  return (
    <Section id="roles" index={index} label={roles.label} title={roles.title} intro={roles.intro} meta={roles.meta}>
      <RolesAccordion roles={roles.items} />
    </Section>
  );
}
