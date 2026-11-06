import { ArrowUpRight } from "lucide-react";
import { contactSection } from "@/content/home";
import { links } from "@/content/site";
import { engagementModels } from "@/content/services";
import { Reveal } from "@/components/motion/Reveal";
import { RiseText } from "@/components/ui/Emphasis";
import { Button } from "@/components/ui/Button";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { pad2 } from "@/lib/cn";

/**
 * Closing dark chapter on every page (except /contact). It joins the footer
 * below it into one continuous dark block.
 */
export function ContactPanel({ index }: { index?: string }) {
  return (
    <section aria-labelledby="contact-title" className="contact-panel chapter-dark theme-dark relative mt-[clamp(1rem,3vw,2.5rem)]">
      <div aria-hidden="true" className="glow-accent pointer-events-none absolute inset-0 -z-10" />
      <div className="container-site pb-14 pt-[var(--section-pad)]">
        <Reveal lines>
          <p data-ri="" className="flex items-center gap-2.5 text-label text-fog">
            <span className="dot-accent" aria-hidden="true" />
            {index && <span className="text-paper">{index}</span>}
            {contactSection.label}
          </p>
          <h2 id="contact-title" className="display-xl mt-6 !text-[clamp(3.25rem,1rem+9.6vw,10.5rem)] text-paper">
            <RiseText text={contactSection.title} />
            <span className="caret" aria-hidden="true" />
          </h2>
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p data-ri="" style={{ ["--i" as string]: 2 }} className="max-w-[52ch] text-[1.125rem] leading-relaxed text-fog lg:col-span-6">
              {contactSection.body}
            </p>
            <div data-ri="" style={{ ["--i" as string]: 3 }} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:col-span-6 lg:justify-end">
              <MagneticButton>
                <Button href={contactSection.primary.href} variant="paper" full>
                  {contactSection.primary.label}
                </Button>
              </MagneticButton>
              {links.booking && (
                <Button href={links.booking} variant="outline" full>
                  {contactSection.booking}
                </Button>
              )}
              {links.linkedin && (
                <Button href={links.linkedin} variant="outline" full>
                  {contactSection.linkedin}
                </Button>
              )}
              {links.email && (
                <Button href={`mailto:${links.email}`} variant="outline" full icon="none">
                  {links.email}
                </Button>
              )}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 xl:mt-20">
          <p className="text-label text-fog">Ways to work with the Pixelpk team</p>
          <ul className="mt-5 grid border-t border-line md:grid-cols-3">
            {engagementModels.map((m, i) => (
              <li key={m.title} className="border-b border-line md:border-b-0 md:border-l md:px-6 md:first:border-l-0 md:first:pl-0">
                <a href={m.href} target="_blank" rel="noopener noreferrer" className="group block h-full py-6">
                  <p className="text-label text-accent-bright">{pad2(i + 1)}</p>
                  <h3 className="mt-2 text-[1.125rem] font-semibold text-paper">{m.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-[0.9375rem] leading-relaxed text-fog">{m.body}</p>
                  <span className="link-mono mt-4 inline-flex items-center gap-2 text-paper">
                    On pixelpk.com
                    <ArrowUpRight aria-hidden="true" className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
