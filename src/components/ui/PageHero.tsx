import { RiseText } from "./Emphasis";
import { cn } from "@/lib/cn";

/**
 * Inner-page opening in the same anatomy as the homepage sections: index row,
 * a display H1 (CSS entrance — visible on first paint), intro and an optional
 * aside or children.
 */
export function PageHero({
  label,
  index = "01",
  title,
  intro,
  meta,
  aside,
  children,
  className,
}: {
  label: string;
  index?: string;
  title: string;
  intro?: string;
  meta?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      data-hero=""
      aria-labelledby="page-title"
      className={cn("theme-light relative isolate overflow-clip pb-[clamp(3rem,6vw,5rem)] pt-32 md:pt-36", className)}
    >
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />
      <div className="container-site">
        <p className="hero-fade flex flex-wrap items-center justify-between gap-3 text-label text-mist" style={{ ["--d" as string]: "0.02s" }}>
          <span className="flex items-center gap-2.5">
            <span className="dot-accent" aria-hidden="true" />
            <span className="text-ink">{index}</span>
            {label}
          </span>
          {meta && <span>{meta}</span>}
        </p>
        <div className="grid-site mt-6 items-end gap-y-10">
          <h1 id="page-title" className={cn("display col-span-12 text-ink", aside ? "lg:col-span-8" : "lg:col-span-10")}>
            <RiseText text={title} variant="hero" />
          </h1>
          {aside && (
            <div className="hero-fade col-span-12 lg:col-span-4" style={{ ["--d" as string]: "0.3s" }}>
              {aside}
            </div>
          )}
        </div>
        {intro && (
          <p className="hero-fade lede mt-8 max-w-[52ch] text-mist" style={{ ["--d" as string]: "0.35s" }}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-fade mt-10" style={{ ["--d" as string]: "0.45s" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
