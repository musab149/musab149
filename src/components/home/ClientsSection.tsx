import { clientsSection } from "@/content/home";
import { testimonials, testimonialsSource } from "@/content/testimonials";
import { flags, confirmedProofPoints } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { ExternalLink } from "@/components/ui/Button";

/** Client testimonials published on pixelpk.com, attributed as Pixelpk gives them. */
export function ClientsSection({ index }: { index: string }) {
  if (!flags.testimonials) return null;
  const clutch = confirmedProofPoints("pixelpk-technologies").find((p) => p.id === "clutch");
  return (
    <Section id="clients" index={index} label={clientsSection.label} title={clientsSection.title} intro={clientsSection.intro}>
      <Reveal as="ul" className="grid gap-3 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <li key={t.name} data-ri="" style={{ ["--i" as string]: i }}>
            <figure className="card flex h-full flex-col justify-between gap-8 p-7 xl:p-9">
              <blockquote className="text-[1.125rem] leading-relaxed tracking-[-0.005em] text-ink">
                <span aria-hidden="true" className="emph mb-2 block !text-[3.5rem] !leading-none">
                  “
                </span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center justify-between gap-4 border-t border-line pt-4">
                <span>
                  <span className="block font-semibold text-ink">{t.name}</span>
                  <span className="text-label text-mist">{t.role}</span>
                </span>
                <span className="text-label text-mist">Pixelpk client</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </Reveal>
      <p className="mt-6 flex flex-wrap justify-between gap-4 text-label text-mist">
        <ExternalLink href={testimonialsSource}>Source: pixelpk.com</ExternalLink>
        {clutch && <ExternalLink href={clutch.source}>{clutch.label}</ExternalLink>}
      </p>
    </Section>
  );
}
