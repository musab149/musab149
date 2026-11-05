import type { Metadata } from "next";
import { aiLab } from "@/content/home";
import { pipeline, terminal, engagement, aiFaq } from "@/content/ai";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PipelineDiagram } from "@/components/motion/PipelineDiagram";
import { Terminal } from "@/components/motion/Terminal";
import { CapabilityTiles, FlagshipCallout, Toolbox } from "@/components/home/AILab";
import { FaqList } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Button } from "@/components/ui/Button";
import { pageMetadata } from "@/lib/metadata";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "AI practice",
  description:
    "AI agents, retrieval systems, LLM fine-tuning and workflow automation that retrieve, reason and act, with people kept in the loop. Pakistan Law Bot is the flagship in production.",
  path: "/ai",
});

export default function AIPage() {
  return (
    <>
      <PageHero label="AI practice" title={aiLab.title} intro={aiLab.intro}>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/contact" variant="primary" full>
            Discuss an AI project
          </Button>
          <Button href="/ventures/pakistan-law-bot" variant="secondary" full>
            See the flagship
          </Button>
        </div>
      </PageHero>

      <Section theme="dark" index="02" label="Capabilities" title="Four things I *build*." className="isolate overflow-hidden">
        <div className="grid-site gap-y-[var(--gutter)]">
          <div className="col-span-12 lg:col-span-7">
            <CapabilityTiles detailed />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Terminal title={terminal.title} label={terminal.label} lines={terminal.lines} />
          </div>
        </div>
      </Section>

      <Section theme="dark" index="03" label="Pipeline" title="Ask. Retrieve. Reason. Act. *Review*." divider>
        <PipelineDiagram steps={pipeline} />
      </Section>

      <Section index="04" label="Engagement" title="How an engagement *works*.">
        <Reveal as="ol" className="grid gap-[var(--gutter)] md:grid-cols-2 xl:grid-cols-4">
          {engagement.map((e, i) => (
            <li key={e.title} data-ri="" style={{ ["--i" as string]: i }} className="flex flex-col gap-10 rounded-[var(--radius-card)] border border-line bg-card p-7">
              <span className="font-mono text-[2.5rem] leading-none tracking-[-0.04em] text-fg">{pad2(i + 1)}</span>
              <div>
                <h3 className="text-h3 text-fg">{e.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{e.body}</p>
              </div>
            </li>
          ))}
        </Reveal>
      </Section>

      <Section index="05" label="Flagship & toolbox" title="AI in *production*." divider>
        <div className="flex flex-col gap-8">
          <FlagshipCallout />
          <Toolbox />
        </div>
      </Section>

      <Section index="06" label="FAQ" title="AI *questions*." divider>
        <FaqList items={aiFaq} />
      </Section>

      <ContactCTA />
    </>
  );
}
