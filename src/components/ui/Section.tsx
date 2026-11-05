import { cn } from "@/lib/cn";
import { SectionHeading, SectionEndLink } from "./SectionHeading";

export type Theme = "light" | "dark";

/**
 * A page section with the shared anatomy. `divider` draws the hairline that
 * separates sections inside the same chapter (brief §5.4).
 */
export function Section({
  id,
  theme = "light",
  index,
  label,
  title,
  intro,
  link,
  divider = false,
  children,
  className,
  headingClassName,
  contentClassName,
  bleed,
}: {
  id?: string;
  theme?: Theme;
  index?: string;
  label: string;
  title: string;
  intro?: string;
  link?: { label: string; href: string };
  divider?: boolean;
  children?: React.ReactNode;
  className?: string;
  headingClassName?: string;
  contentClassName?: string;
  /** Content rendered outside the container (full-bleed), after the heading. */
  bleed?: React.ReactNode;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(theme === "dark" ? "theme-dark" : "theme-light", "relative", className)}
    >
      {divider && (
        <div className="container-site" aria-hidden="true">
          <div className="hairline" />
        </div>
      )}
      <div className="py-section">
        <div className="container-site">
          <SectionHeading
            id={headingId}
            index={index}
            label={label}
            title={title}
            intro={intro}
            link={link}
            className={headingClassName}
          />
          {children && <div className={cn("mt-14 xl:mt-20", contentClassName)}>{children}</div>}
        </div>
        {bleed}
        <div className="container-site">
          <SectionEndLink link={link} />
        </div>
      </div>
    </section>
  );
}
