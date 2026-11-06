import { cn } from "@/lib/cn";
import { SectionHead } from "./SectionHead";

/**
 * A page section with the shared anatomy. Dark chapters render as inset,
 * rounded panels (`chapter-dark`), like the reference's product and contact
 * chapters.
 */
export function Section({
  id,
  theme = "light",
  index,
  label,
  title,
  intro,
  meta,
  link,
  children,
  className,
  contentClassName,
  bleed,
  glow = false,
  size = "display",
}: {
  id?: string;
  theme?: "light" | "dark";
  index?: string;
  label: string;
  title: string;
  intro?: string;
  meta?: string;
  link?: { label: string; href: string };
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  /** Full-bleed content rendered after the container (e.g. a gallery). */
  bleed?: React.ReactNode;
  glow?: boolean;
  size?: "display" | "display-md";
}) {
  const headingId = id ? `${id}-title` : undefined;
  const dark = theme === "dark";
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(dark ? "chapter-dark theme-dark relative" : "theme-light relative", className)}
    >
      {dark && glow && <div aria-hidden="true" className="glow-accent pointer-events-none absolute inset-0 -z-10" />}
      <div className={cn("container-site", bleed ? "pt-[var(--section-pad)]" : "py-section")}>
        <SectionHead id={headingId} index={index} label={label} title={title} intro={intro} meta={meta} link={link} size={size} />
        {children && <div className={cn("mt-12 xl:mt-16", contentClassName)}>{children}</div>}
      </div>
      {bleed && <div className="mt-12 pb-[var(--section-pad)] xl:mt-16">{bleed}</div>}
    </section>
  );
}
