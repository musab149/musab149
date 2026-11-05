import { contactCta } from "@/content/home";
import { links } from "@/content/site";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { IndexLabel } from "@/components/ui/IndexLabel";
import { RiseText } from "@/components/ui/Emphasis";

/** 12 — Contact CTA (dark, chapter H, flows into the footer). */
export function ContactCTA({ index }: { index?: string }) {
  return (
    <section id="contact-cta" aria-labelledby="contact-cta-title" className="theme-dark relative isolate overflow-hidden">
      <div className="motif-grid pointer-events-none absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <div className="container-site py-section">
        <Reveal lines className="grid-site gap-y-8">
          <div data-ri="" className="col-span-12">
            <IndexLabel index={index} label={contactCta.label} />
          </div>
          <h2
            id="contact-cta-title"
            className="col-span-12 max-w-[16ch] text-[clamp(2.5rem,1.4rem+5vw,5.75rem)] font-bold leading-[1.02] tracking-[-0.035em] text-fg"
            style={{ ["--d" as string]: "0.07s" }}
          >
            <RiseText text={contactCta.title} />
            <span className="caret" aria-hidden="true" />
          </h2>
          <p data-ri="" style={{ ["--i" as string]: 3 }} className="col-span-12 max-w-[52ch] text-lg leading-relaxed text-muted md:col-span-8 xl:col-span-6 xl:text-xl">
            {contactCta.body}
          </p>
          <div data-ri="" style={{ ["--i" as string]: 4 }} className="col-span-12 mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <MagneticButton>
              <Button href={contactCta.primary.href} variant="primary" className="!min-h-14 !px-7 !text-base">
                {contactCta.primary.label}
              </Button>
            </MagneticButton>
            {links.linkedin && (
              <Button href={links.linkedin} variant="secondary" full className="!min-h-14 !px-7">
                {contactCta.linkedin}
              </Button>
            )}
            {links.booking && (
              <Button href={links.booking} variant="secondary" full className="!min-h-14 !px-7">
                {contactCta.booking}
              </Button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
