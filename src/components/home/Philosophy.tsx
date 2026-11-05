import { philosophy } from "@/content/home";
import { Section } from "@/components/ui/Section";
import { ScrollHighlight } from "@/components/motion/ScrollHighlight";

/** 09 — Philosophy (dark, same chapter as Team). Just type and space. */
export function Philosophy({ index }: { index: string }) {
  return (
    <Section id="philosophy" theme="dark" divider index={index} label={philosophy.label} title={philosophy.title}>
      <div className="grid-site">
        <ScrollHighlight
          text={philosophy.statement}
          className="col-span-12 text-statement xl:col-span-10 xl:col-start-3"
        />
      </div>
    </Section>
  );
}
