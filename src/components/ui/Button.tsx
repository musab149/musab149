import { HoverPrefetchLink as Link } from "./HoverPrefetchLink";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn, isExternal } from "@/lib/cn";

type Variant = "primary" | "secondary" | "text";

/**
 * Buttons & links (brief §5.6). Internal links use next/link; external links
 * open in a new tab with rel="noopener noreferrer" and show ↗.
 */
export function Button({
  href,
  children,
  variant = "primary",
  className,
  icon = true,
  full = false,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  icon?: boolean;
  full?: boolean;
  "aria-label"?: string;
}) {
  const external = isExternal(href) && !href.startsWith("mailto:");
  const mail = href.startsWith("mailto:");
  const Icon = external ? ArrowUpRight : ArrowRight;
  const classes = cn(
    variant === "text" ? "link-draw font-semibold" : "btn",
    variant === "primary" && "btn-primary",
    variant === "secondary" && "btn-secondary",
    full && "w-full sm:w-auto",
    className,
  );
  const content = (
    <>
      <span className={variant === "text" ? "link-text" : undefined}>{children}</span>
      {icon && !mail && (
        <Icon
          aria-hidden="true"
          className={cn("btn-arrow size-4 shrink-0", external && "btn-arrow-ext")}
          strokeWidth={2}
        />
      )}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </>
  );

  if (external || mail) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Inline external link with ↗ for body copy and lists. */
export function ExternalLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn("link-draw group/ext", className)}
    >
      <span className="link-text">{children}</span>
      <ArrowUpRight aria-hidden="true" className="size-[0.9em] shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
