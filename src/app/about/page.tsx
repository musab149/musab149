import type { Metadata } from "next";
import Image from "next/image";
import { story, timeline, aboutFacts, aboutQuote } from "@/content/about";
import { photos, beyondTheDesk, cultureGallery } from "@/content/culture";
import { ventures } from "@/content/ventures";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Timeline } from "@/components/ui/Timeline";
import { PhotoStrip } from "@/components/about/PhotoStrip";
import { DragGallery } from "@/components/motion/DragGallery";
import { Button } from "@/components/ui/Button";
import { Emphasis } from "@/components/ui/Emphasis";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, personSchema } from "@/lib/schema";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "From software engineer to founder to AI builder: Ahmed Musab is one of the founders of Pixelpk Technologies in Lahore and leads Pakistan LawBot.",
  path: "/about",
  type: "profile",
});

export default function AboutPage() {
  let n = 1;
  const next = () => pad2(++n);

  return (
    <>
      <JsonLd data={personSchema()} />
      <PageHero
        label="About"
        title={"Hi, I'm\n*Ahmed*."}
        intro={story.intro}
        aside={
          <figure className="relative ml-auto max-w-[360px]">
            <div className="photo-grade relative aspect-square overflow-hidden rounded-[var(--radius-card)] bg-paper-3">
              <Image src={photos.headshot.src} alt={photos.headshot.alt} fill loading="eager" fetchPriority="high" sizes="360px" className="object-cover object-[50%_70%]" />
            </div>
            <figcaption className="mt-3 flex justify-between text-label text-mist">
              <span>{photos.headshot.caption}</span>
              <span>Lahore, Pakistan</span>
            </figcaption>
          </figure>
        }
      />

      <Section index={next()} label="Story" title={story.title} size="display-md">
        <div className="flex flex-col">
          {story.chapters.map((c, i) => (
            <Reveal key={c.kicker} as="article" className="grid-site gap-y-5 border-t border-line py-10 xl:py-12">
              <div data-ri="" className="col-span-12 md:col-span-4">
                <p className="text-label text-accent-deep">
                  {pad2(i + 1)} · Chapter
                </p>
                <p className="emph mt-2 block text-[clamp(2.25rem,1.6rem+2vw,3.5rem)]">{c.kicker}</p>
              </div>
              <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 md:col-span-8 xl:col-span-7 xl:col-start-6">
                <h3 className="title-caps !text-[1.75rem]">{c.title}</h3>
                {c.body.map((para) => (
                  <p key={para.slice(0, 24)} className="measure mt-4 text-[1.0625rem] leading-relaxed text-mist">
                    {para}
                  </p>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 grid-site gap-y-10 border-t border-line pt-10">
          <blockquote className="display-sm col-span-12 border-l-2 border-accent pl-5 text-ink lg:col-span-6">
            <Emphasis text={aboutQuote} />
          </blockquote>
          <dl className="col-span-12 border-t border-line lg:col-span-5 lg:col-start-8">
            {aboutFacts.map((f) => (
              <div key={f.k} className="flex items-baseline justify-between gap-6 border-b border-line py-3.5">
                <dt className="text-label text-mist">{f.k}</dt>
                <dd className="text-right text-[0.9375rem] font-medium text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {timeline.length > 0 && (
        <Section index={next()} label="Timeline" title={"Milestones,\n*verified*."} size="display-md">
          <Timeline items={timeline} />
        </Section>
      )}

      <Section index={next()} label="Beyond the desk" title={"Out from behind\nthe *screen*."} intro="On stage with the team, at events and in the mountains." size="display-md">
        <PhotoStrip photos={beyondTheDesk} />
      </Section>

      <Section
        id="culture"
        theme="dark"
        index={next()}
        label="Culture"
        title={"Life at\n*Pixelpk*."}
        intro="Products are built by people. This is the team, at work, at the table and on the road."
        meta="Drag or scroll"
        bleed={<DragGallery photos={cultureGallery} label="Pixelpk team photos (scrollable)" />}
      />

      <Section index={next()} label="Ventures" title={"What I'm\n*building*."} size="display-md">
        <ul className="grid gap-3 md:grid-cols-2">
          {ventures.map((v) => (
            <li key={v.slug} className="card flex flex-col justify-between gap-8 p-7 xl:p-9">
              <div>
                <Image src={v.logo.src} alt={`${v.name} logo`} width={v.logo.width} height={v.logo.height} sizes="200px" className="h-7 w-auto" />
                <p className="mt-6 text-label text-mist">
                  {v.category} · {v.role}
                </p>
                <h3 className="display-sm mt-2 text-ink">{v.name}</h3>
                <p className="mt-3 text-mist">{v.description}</p>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
                <Button href={`/ventures/${v.slug}`} variant="text">
                  About {v.name}
                </Button>
                <Button href={v.url} variant="text">
                  {v.domain}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ContactPanel />
    </>
  );
}
