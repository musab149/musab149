import { Reveal } from "@/components/motion/Reveal";
import { RiseText } from "./Emphasis";
import { IndexLabel } from "./IndexLabel";
import { Button } from "./Button";
import { cn } from "@/lib/cn";

/**
 * The one section anatomy used everywhere (brief §5.3):
 * index label → H2 (one italic emphasis) → optional intro → [content] → optional end link.
 * The end link sits right-aligned on the H2 baseline on desktop.
 */
export function SectionHeading({
  id,
  index,
  label,
  title,
  intro,
  link,
  as: H = "h2",
  className,
  size = "h2",
}: {
  id?: string;
  index?: string;
  label: string;
  title: string;
  intro?: string;
  link?: { label: string; href: string };
  as?: "h1" | "h2";
  className?: string;
  size?: "h2" | "display";
}) {
  return (
    <Reveal lines className={cn("grid-site gap-y-6 xl:gap-y-8", className)}>
      <div data-ri="" style={{ ["--i" as string]: 0 }} className="col-span-12">
        <IndexLabel index={index} label={label} />
      </div>
      <div className="col-span-12 flex flex-col gap-6 xl:col-span-12 xl:flex-row xl:items-end xl:justify-between xl:gap-12">
        <H
          id={id}
          className={cn(
            size === "display" ? "text-display" : "text-h2",
            "max-w-[18ch] text-fg",
            size === "display" && "max-w-[16ch]",
          )}
          style={{ ["--d" as string]: "0.07s" }}
        >
          <RiseText text={title} />
        </H>
        {link && (
          <div data-ri="" style={{ ["--i" as string]: 3 }} className="hidden shrink-0 pb-2 xl:block">
            <Button href={link.href} variant="text">
              {link.label}
            </Button>
          </div>
        )}
      </div>
      {intro && (
        <p
          data-ri=""
          style={{ ["--i" as string]: 3 }}
          className="col-span-12 text-lg leading-relaxed text-muted md:col-span-8 xl:col-span-6"
        >
          {intro}
        </p>
      )}
    </Reveal>
  );
}

/** Mobile/tablet copy of the end link, placed after the content. */
export function SectionEndLink({ link, className }: { link?: { label: string; href: string }; className?: string }) {
  if (!link) return null;
  return (
    <div className={cn("mt-10 xl:hidden", className)}>
      <Button href={link.href} variant="text">
        {link.label}
      </Button>
    </div>
  );
}
