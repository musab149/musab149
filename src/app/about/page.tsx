import type { Metadata } from "next";
import Image from "next/image";
import { story, timeline } from "@/content/timeline";
import { photos, beyondTheDesk } from "@/content/culture";
import { ventures } from "@/content/ventures";
import { site } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { RegMarks } from "@/components/ui/RegMarks";
import { Reveal } from "@/components/motion/Reveal";
import { Timeline } from "@/components/ui/Timeline";
import { PhotoStrip } from "@/components/about/PhotoStrip";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, personSchema } from "@/lib/schema";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "From software engineer to founder to AI builder: Ahmed Musab founded Pixelpk Technologies and leads Pakistan Law Bot, from Lahore, Pakistan.",
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
        title={story.title}
        intro={story.intro}
        aside={
          <figure className="relative">
            <RegMarks inset={-10} />
            <div className="hero-portrait photo-grade relative aspect-square overflow-hidden rounded-[4px] bg-card">
              <Image
                src={photos.headshot.src}
                alt={photos.headshot.alt}
                fill
                priority
                sizes="(min-width: 1024px) 380px, 90vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-3 flex items-center justify-between text-label text-muted">
              <span>{site.name}</span>
              <span>{site.location}</span>
            </figcaption>
          </figure>
        }
      />

      <section aria-labelledby="story-title" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <h2 id="story-title" className="sr-only">
            My story
          </h2>
          <div className="py-section">
            <div className="flex flex-col">
              {story.chapters.map((c, i) => (
                <Reveal
                  key={c.kicker}
                  as="article"
                  className="grid-site gap-y-6 border-t border-line py-12 first:border-t-0 first:pt-0 last:pb-0 xl:py-16"
                >
                  <div data-ri="" className="col-span-12 md:col-span-4 xl:col-span-3">
                    <p className="text-label text-muted">
                      <span className="text-fg">{pad2(i + 1)}</span> — Chapter
                    </p>
                    <p className="mt-3 font-serif text-[clamp(2rem,1.5rem+2vw,3.25rem)] italic leading-none text-fg">{c.kicker}</p>
                  </div>
                  <div data-ri="" style={{ ["--i" as string]: 1 }} className="col-span-12 md:col-span-8 xl:col-span-7 xl:col-start-5">
                    <h3 className="text-h3 text-fg">{c.title}</h3>
                    {c.body.map((para) => (
                      <p key={para.slice(0, 24)} className="measure mt-4 text-lg leading-relaxed text-muted">
                        {para}
                      </p>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {timeline.length > 0 && (
        <Section index={next()} label="Timeline" title="Milestones, *verified*." divider>
          <Timeline items={timeline} />
        </Section>
      )}

      <Section
        theme="dark"
        index={next()}
        label="Beyond the desk"
        title="Out from behind the *screen*."
        intro="On stage with the team, at events, and in the mountains."
      >
        <PhotoStrip photos={beyondTheDesk} />
      </Section>

      <Section index={next()} label="Ventures" title="What I'm *building* now.">
        <ul className="grid gap-[var(--gutter)] md:grid-cols-2">
          {ventures.map((v, i) => (
            <li key={v.slug} className="flex flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-line bg-card p-7 xl:p-9">
              <div>
                <p className="flex items-center justify-between text-label text-muted">
                  <span>
                    <span className="text-fg">V/{pad2(i + 1)}</span> · {v.category}
                  </span>
                  <span>{v.role}</span>
                </p>
                <h3 className="mt-8 text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] font-bold tracking-[-0.03em] text-fg">{v.name}</h3>
                <p className="mt-3 text-muted">{v.tagline}</p>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                <Button href={`/ventures/${v.slug}`} variant="text">
                  Read more<span className="sr-only"> about {v.name}</span>
                </Button>
                <Button href={v.url} variant="text">
                  {v.domain}
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <ContactCTA />
    </>
  );
}
