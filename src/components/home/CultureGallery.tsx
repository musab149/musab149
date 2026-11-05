import { cultureSection } from "@/content/home";
import { cultureGallery } from "@/content/culture";
import { Section } from "@/components/ui/Section";
import { DragGallery } from "@/components/motion/DragGallery";
import { Reveal } from "@/components/motion/Reveal";

/** 08 — Team & culture (dark, chapter F). */
export function CultureGallery({ index }: { index: string }) {
  return (
    <Section
      id="team"
      theme="dark"
      index={index}
      label={cultureSection.label}
      title={cultureSection.title}
      intro={cultureSection.intro}
      bleed={
        <Reveal className="mt-14 xl:mt-20">
          <div data-ri="">
            <DragGallery photos={cultureGallery} label="Pixelpk team photos (scrollable)" />
          </div>
        </Reveal>
      }
    />
  );
}
