import type { Metadata } from "next";
import { aiSection } from "@/content/home";
import { capabilities, principles, terminal, engagement, aiFaq, toolbox } from "@/content/ai";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal } from "@/components/motion/Terminal";
import { AiFlows } from "@/components/home/AiFlows";
import { buildFlows } from "@/components/home/AiLabSection";
import { FaqList } from "@/components/home/FAQ";
import { Button } from "@/components/ui/Button";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "AI lab",
  description:
    "AI agents, retrieval, LLM fine-tuning and workflow automation that answer from real sources and keep people in the loop — with four AI products from the Pixelpk portfolio, including Pakistan LawBot.",
  path: "/ai",
});

export default function AIPage() {
  return (
    <>
      <PageHero label="AI lab" title={aiSection.title} intro={aiSection.intro} meta={aiSection.meta}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="ink" full>
            Discuss an AI project
          </Button>
          <Button href="#flows" variant="outline" full>
            See the products
          </Button>
        </div>
      </PageHero>

      <Section index="02" label="Capabilities" title={"Four things\nI *build*."} size="display-md">
        <Reveal as="ul" className="grid gap-3 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <li key={c.title} data-ri="" style={{ ["--i" as string]: i }} className="card flex flex-col justify-between gap-10 p-7 xl:p-9">
              <p className="text-label text-accent-deep">{pad2(i + 1)}</p>
              <div>
                <h3 className="title-caps !text-[1.75rem]">{c.title}</h3>
                <p className="mt-3 text-[1.0625rem] text-ink">{c.body}</p>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{c.detail}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section id="flows" theme="dark" glow index="03" label="In production" title={"Real products,\n*real* flows."} intro="Four AI products from the Pixelpk portfolio, and how each one works." size="display-md">
        <AiFlows flows={buildFlows()} />
      </Section>

      <Section index="04" label="Principles" title={"How I keep AI\n*honest*."} size="display-md">
        <div className="grid gap-3 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Terminal title={terminal.title} label={terminal.label} lines={terminal.lines} caption={terminal.caption} />
          </div>
          <ol className="flex flex-col justify-center lg:col-span-5 lg:pl-8">
            {principles.map((p, i) => (
              <li key={p.title} className="border-t border-line py-6">
                <p className="text-label text-accent-deep">{pad2(i + 1)}</p>
                <h3 className="mt-2 text-[1.25rem] font-bold text-ink">{p.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section index="05" label="Engagement" title={"How an engagement\n*works*."} size="display-md">
        <Reveal as="ol" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {engagement.map((e, i) => (
            <li key={e.title} data-ri="" style={{ ["--i" as string]: i }} className="card flex flex-col gap-10 p-7">
              <span className="figure-md text-accent">{pad2(i + 1)}</span>
              <div>
                <h3 className="text-[1.25rem] font-bold text-ink">{e.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{e.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
        <div className="mt-14 border-t border-line pt-8">
          <p className="text-label text-mist">Toolbox</p>
          <dl className="mt-6 grid gap-x-8 gap-y-6 md:grid-cols-2 xl:grid-cols-5">
            {toolbox.map((g) => (
              <div key={g.group}>
                <dt className="text-label text-ink">{g.group}</dt>
                <dd className="mt-3">
                  <ul className="flex flex-wrap gap-1.5">
                    {g.items.map((t) => (
                      <li key={t}>
                        <span className="chip">{t}</span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section index="06" label="FAQ" title={"AI\n*questions*."} size="display-md">
        <FaqList items={aiFaq} />
      </Section>

      <ContactPanel />
    </>
  );
}
