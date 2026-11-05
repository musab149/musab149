import { RiseText } from "./Emphasis";
import { IndexLabel } from "./IndexLabel";
import { cn } from "@/lib/cn";

/**
 * Inner-page opening: same anatomy as sections, H1 at display size.
 * Uses the CSS-only hero entrance so the H1 is visible on first paint.
 */
export function PageHero({
  label,
  index = "01",
  title,
  intro,
  aside,
  children,
  theme = "light",
  className,
}: {
  label: string;
  index?: string;
  title: string;
  intro?: string;
  aside?: React.ReactNode;
  children?: React.ReactNode;
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <section
      data-hero=""
      aria-labelledby="page-title"
      className={cn(theme === "dark" ? "theme-dark" : "theme-light", "relative isolate overflow-hidden", className)}
    >
      <div className="hero-grid motif-grid absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
      <div className="container-site pb-[clamp(3.5rem,7vw,7rem)] pt-[clamp(2.5rem,5vw,5rem)]">
        <div className="grid-site items-end gap-y-12">
          <div className={cn("col-span-12", Boolean(aside) && "lg:col-span-7")}>
            <div className="hero-fade" style={{ ["--d" as string]: "0.05s" }}>
              <IndexLabel index={index} label={label} />
            </div>
            <h1 id="page-title" className="mt-6 max-w-[17ch] text-display text-fg">
              <RiseText text={title} variant="hero" />
            </h1>
            {intro && (
              <p
                className="hero-fade mt-8 max-w-[58ch] text-lg leading-relaxed text-muted xl:text-xl xl:leading-relaxed"
                style={{ ["--d" as string]: "0.4s" }}
              >
                {intro}
              </p>
            )}
            {children && (
              <div className="hero-fade mt-10" style={{ ["--d" as string]: "0.5s" }}>
                {children}
              </div>
            )}
          </div>
          {aside && (
            <div className="hero-fade col-span-12 lg:col-span-4 lg:col-start-9" style={{ ["--d" as string]: "0.3s" }}>
              {aside}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
