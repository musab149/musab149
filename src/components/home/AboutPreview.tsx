import { about } from "@/content/home";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { RoleCards } from "./RoleCards";

/** 02 — About (light, same chapter as the hero). */
export function AboutPreview({ index }: { index: string }) {
  const facts = [
    { k: "Based in", v: site.location },
    { k: "Background", v: "Software engineering" },
    { k: "Building", v: "Pixelpk Technologies · Pakistan Law Bot" },
  ];
  return (
    <Section id="about" divider index={index} label={about.label} title={about.title} link={about.link}>
      <Reveal className="grid-site gap-y-10">
        <p
          data-ri=""
          className="col-span-12 text-[clamp(1.25rem,1.05rem+0.7vw,1.625rem)] leading-[1.5] tracking-[-0.01em] text-fg md:col-span-10 xl:col-span-7"
        >
          {about.body}
        </p>
        <dl
          data-ri=""
          style={{ ["--i" as string]: 1 }}
          className="col-span-12 grid content-start gap-0 border-t border-line xl:col-span-4 xl:col-start-9"
        >
          {facts.map((f) => (
            <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
              <dt className="text-label text-muted">{f.k}</dt>
              <dd className="text-right text-[0.9375rem] font-medium text-fg">{f.v}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <div className="mt-20 xl:mt-28">
        <RoleCards />
      </div>
    </Section>
  );
}
