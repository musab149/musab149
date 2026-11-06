import Image from "next/image";
import { aboutSection } from "@/content/home";
import { aboutIntro, aboutQuote, aboutFacts, aboutPhotos } from "@/content/about";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";

/** About: two photo cards, the story in one paragraph, a principle and the facts. */
export function AboutSection({ index }: { index: string }) {
  return (
    <Section id="about" index={index} label={aboutSection.label} title={aboutSection.title} link={{ label: "Read my story", href: "/about" }}>
      <div className="grid-site gap-y-14">
        <Reveal className="relative col-span-12 self-start pb-16 sm:pb-24 md:col-span-8 md:col-start-3 lg:col-span-5 lg:col-start-1">
          <figure data-ri="" className="photo-grade relative w-[78%] overflow-hidden rounded-[var(--radius-card)] bg-paper-3">
            <div className="relative aspect-[4/5]">
              <Image src={aboutPhotos.main.src} alt={aboutPhotos.main.alt} fill sizes="(min-width: 1024px) 380px, 70vw" className="object-cover object-[50%_70%]" />
            </div>
            <figcaption className="chip absolute bottom-3 left-3 border-transparent bg-paper-2/92 text-ink backdrop-blur">{aboutPhotos.main.caption}</figcaption>
          </figure>
          <figure
            data-ri=""
            style={{ ["--i" as string]: 1 }}
            className="photo-grade absolute bottom-0 right-0 w-[56%] rotate-[3deg] overflow-hidden rounded-[var(--radius-card)] border-4 border-paper bg-paper-3 shadow-[0_24px_50px_-24px_rgb(13_12_29/0.5)]"
          >
            <div className="relative aspect-[4/3]">
              <Image src={aboutPhotos.second.src} alt={aboutPhotos.second.alt} fill sizes="(min-width: 1024px) 280px, 52vw" className="object-cover" />
            </div>
            <figcaption className="chip absolute bottom-2 left-2 border-transparent bg-paper-2/92 text-ink backdrop-blur">{aboutPhotos.second.caption}</figcaption>
          </figure>
        </Reveal>

        <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7">
          <p data-ri="" className="lede text-ink">
            {aboutIntro}
          </p>
          <blockquote data-ri="" style={{ ["--i" as string]: 1 }} className="display-sm mt-10 border-l-2 border-accent pl-5 text-ink">
            <Emphasis text={aboutQuote} />
          </blockquote>
          <dl data-ri="" style={{ ["--i" as string]: 2 }} className="mt-10 border-t border-line">
            {aboutFacts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                <dt className="text-label text-mist">{f.k}</dt>
                <dd className="text-right text-[0.9375rem] font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div data-ri="" style={{ ["--i" as string]: 3 }} className="mt-8">
            <Button href="/about" variant="ink">
              Read my story
            </Button>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
