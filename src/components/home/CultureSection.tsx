import { cultureSection } from "@/content/home";
import { cultureGallery } from "@/content/culture";
import { Section } from "@/components/ui/Section";
import { DragGallery } from "@/components/motion/DragGallery";

/** Dark chapter: the team, in a drag-and-scroll gallery. */
export function CultureSection({ index }: { index: string }) {
  return (
    <Section
      id="culture"
      theme="dark"
      index={index}
      label={cultureSection.label}
      title={cultureSection.title}
      intro={cultureSection.intro}
      meta={cultureSection.meta}
      bleed={<DragGallery photos={cultureGallery} label="Pixelpk team photos (scrollable)" />}
    />
  );
}
