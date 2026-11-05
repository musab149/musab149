import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { aiLab } from "@/content/home";
import { capabilities, pipeline, terminal, flagship, toolbox } from "@/content/ai";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { PipelineDiagram } from "@/components/motion/PipelineDiagram";
import { Terminal } from "@/components/motion/Terminal";
import { Chip } from "@/components/ui/Chip";
import { pad2 } from "@/lib/cn";

export function CapabilityTiles({ detailed = false }: { detailed?: boolean }) {
  return (
    <Reveal as="ul" className="grid h-full gap-[var(--gutter)] sm:grid-cols-2" aria-label="AI capabilities">
      {capabilities.map((c, i) => (
        <li
          key={c.title}
          data-ri=""
          style={{ ["--i" as string]: i }}
          className="group flex flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-line bg-card p-6 transition-colors duration-300 hover:border-line-strong xl:p-8"
        >
          <div className="flex items-center justify-between">
            <span className="text-label text-muted">{pad2(i + 1)}</span>
            <span aria-hidden="true" className="size-2 rounded-full bg-lime/30 transition-colors duration-300 group-hover:bg-lime" />
          </div>
          <div>
            <h3 className="text-h3 text-fg">{c.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{c.body}</p>
            {detailed && <p className="mt-4 border-t border-line pt-4 text-[0.9375rem] leading-relaxed text-fg/85">{c.detail}</p>}
          </div>
        </li>
      ))}
    </Reveal>
  );
}

export function Toolbox() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-label text-muted">Toolbox</span>
      <ul className="flex flex-wrap gap-2" aria-label="Toolbox">
        {toolbox.map((t) => (
          <li key={t}>
            <Chip>{t}</Chip>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function FlagshipCallout() {
  return (
    <Link
      href={flagship.href}
      className="group flex flex-col gap-4 rounded-[var(--radius-card)] border border-line bg-card p-6 transition-colors duration-300 hover:border-lime sm:flex-row sm:items-center sm:justify-between xl:px-8"
    >
      <span className="flex items-center gap-4">
        <span className="status-dot" aria-hidden="true" />
        <span className="text-[1.125rem] font-semibold tracking-[-0.01em] text-fg">{flagship.text}</span>
      </span>
      <span className="link-draw font-semibold text-fg">
        <span className="link-text">{flagship.cta}</span>
        <ArrowRight aria-hidden="true" className="btn-arrow size-4" />
      </span>
    </Link>
  );
}

/** 05 — AI lab (dark, chapter D). */
export function AILab({ index }: { index: string }) {
  return (
    <Section
      id="ai-lab"
      theme="dark"
      index={index}
      label={aiLab.label}
      title={aiLab.title}
      intro={aiLab.intro}
      link={aiLab.link}
      className="isolate overflow-hidden"
    >
      <div className="motif-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px] opacity-80" aria-hidden="true" />
      <div className="relative flex flex-col gap-16 xl:gap-24">
        <div>
          <h3 className="sr-only">How an AI system works, step by step</h3>
          <PipelineDiagram steps={pipeline} />
        </div>

        <div className="grid-site gap-y-[var(--gutter)]">
          <div className="col-span-12 lg:col-span-7">
            <CapabilityTiles />
          </div>
          <div className="col-span-12 lg:col-span-5">
            <Terminal title={terminal.title} label={terminal.label} lines={terminal.lines} />
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <FlagshipCallout />
          <Toolbox />
        </div>
      </div>
    </Section>
  );
}
