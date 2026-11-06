import { aiSection } from "@/content/home";
import { principles, terminal, flows } from "@/content/ai";
import { getProject } from "@/lib/work";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Terminal } from "@/components/motion/Terminal";
import { AiFlows, type Flow } from "./AiFlows";
import { pad2 } from "@/lib/cn";

export function buildFlows(): Flow[] {
  return flows.flatMap((f) => {
    const p = getProject(f.slug);
    if (!p) return [];
    return [
      {
        slug: p.slug,
        tab: f.tab,
        name: p.name,
        kicker: p.category,
        summary: p.summary,
        steps: p.how.steps,
        stack: p.stack.slice(0, 6).map((s) => s.name),
      },
    ];
  });
}

/** AI lab: illustrative terminal + principles, then the real AI products as flows. */
export function AiLabSection({ index }: { index: string }) {
  return (
    <Section
      id="ai-lab"
      index={index}
      label={aiSection.label}
      title={aiSection.title}
      intro={aiSection.intro}
      link={{ label: "My AI practice", href: "/ai" }}
    >
      <div className="grid gap-3 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Terminal title={terminal.title} label={terminal.label} lines={terminal.lines} caption={terminal.caption} />
        </div>
        <Reveal as="ol" className="flex flex-col justify-center lg:col-span-5 lg:pl-8">
          {principles.map((p, i) => (
            <li key={p.title} data-ri="" style={{ ["--i" as string]: i }} className="border-t border-line py-6 first:border-t-0 lg:first:border-t">
              <p className="text-label text-accent-deep">{pad2(i + 1)}</p>
              <h3 className="mt-2 text-[1.25rem] font-bold tracking-[-0.01em] text-ink">{p.title}</h3>
              <p className="mt-2 max-w-[44ch] text-[0.9375rem] leading-relaxed text-mist">{p.body}</p>
            </li>
          ))}
        </Reveal>
      </div>
      <div className="mt-3">
        <AiFlows flows={buildFlows()} />
      </div>
    </Section>
  );
}
