import { ArrowUpRight } from "lucide-react";
import { pixelpkFigures, pixelpkSource, flags } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Four big figures with hairline dividers — Pixelpk's own published numbers. */
export function Figures() {
  if (!flags.pixelpkFigures) return null;
  return (
    <section aria-label="Pixelpk in numbers" className="theme-light">
      <div className="container-site pt-[clamp(3rem,6vw,5rem)]">
        <Reveal as="ul" className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {pixelpkFigures.map((f, i) => (
            <li
              key={f.label}
              data-ri=""
              style={{ ["--i" as string]: i }}
              className={cn(
                "border-b border-line py-7 lg:border-b-0 lg:border-l lg:pl-6",
                i % 2 === 1 ? "border-l pl-5" : "pr-4",
                i === 0 && "lg:border-l-0 lg:pl-0",
              )}
            >
              <p className="figure-xl text-ink">
                {f.value}
                <span className="text-accent">{f.suffix}</span>
              </p>
              <p className="mt-3 max-w-[22ch] text-[0.9375rem] leading-snug text-mist">{f.label}</p>
            </li>
          ))}
        </Reveal>
        <p className="mt-4 flex justify-end text-label text-mist">
          <a href={pixelpkSource} target="_blank" rel="noopener noreferrer" className="link-draw">
            <span className="link-text">Pixelpk figures, as published on pixelpk.com</span>
            <ArrowUpRight aria-hidden="true" className="size-3" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </div>
    </section>
  );
}
