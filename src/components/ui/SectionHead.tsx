import { Reveal } from "@/components/motion/Reveal";
import { RiseText } from "./Emphasis";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

/**
 * The one section anatomy used everywhere:
 * big condensed heading (one serif-italic word) · intro aligned to its baseline
 * on the right · a hairline index row: "● 03 Work" left, meta or link right.
 */
export function SectionHead({
  id,
  index,
  label,
  title,
  intro,
  meta,
  link,
  as: H = "h2",
  size = "display",
  className,
}: {
  id?: string;
  index?: string;
  label: string;
  title: string;
  intro?: string;
  meta?: string;
  link?: { label: string; href: string };
  as?: "h1" | "h2";
  size?: "display" | "display-md";
  className?: string;
}) {
  return (
    <Reveal lines className={className}>
      <div className="grid-site items-end gap-y-8">
        <H id={id} className={cn(size, "col-span-12 text-fg lg:col-span-8")}>
          <RiseText text={title} />
        </H>
        {intro && (
          <p
            data-ri=""
            style={{ ["--i" as string]: 2 }}
            className="col-span-12 max-w-[46ch] text-[1.0625rem] leading-relaxed text-muted lg:col-span-4 lg:pb-2"
          >
            {intro}
          </p>
        )}
      </div>
      <div
        data-ri=""
        style={{ ["--i" as string]: 3 }}
        className="mt-10 flex min-h-11 flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-line pt-4 text-label text-muted xl:mt-14"
      >
        <span className="flex items-center gap-2.5">
          <span className="dot-accent" aria-hidden="true" />
          {index && <span className="text-fg">{index}</span>}
          <span>{label}</span>
        </span>
        {link ? (
          <Button href={link.href} variant="text">
            {link.label}
          </Button>
        ) : (
          meta && <span>{meta}</span>
        )}
      </div>
    </Reveal>
  );
}
