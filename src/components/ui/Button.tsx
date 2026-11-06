import { ArrowDown, ArrowRight, ArrowUpRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "./HoverPrefetchLink";
import { cn, isExternal } from "@/lib/cn";

type Variant = "ink" | "paper" | "outline" | "text";

/**
 * Pill buttons in mono caps with a crimson icon disc (ink / paper), an outline
 * pill, or a mono text link. External links open in a new tab with ↗.
 */
export function Button({
  href,
  children,
  variant = "ink",
  className,
  full = false,
  icon,
  ...rest
}: {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  full?: boolean;
  icon?: "right" | "down" | "ext" | "none";
  "aria-label"?: string;
}) {
  const mail = href.startsWith("mailto:");
  const external = isExternal(href) && !mail;
  const kind = icon ?? (external ? "ext" : href.startsWith("#") || href.startsWith("/#") ? "down" : "right");
  const Icon = kind === "ext" ? ArrowUpRight : kind === "down" ? ArrowDown : ArrowRight;

  const classes = cn(
    variant === "text" ? "link-draw link-mono text-fg" : "btn",
    variant === "ink" && "btn-ink",
    variant === "paper" && "btn-paper",
    variant === "outline" && "btn-outline",
    external && "btn-ext",
    full && "w-full justify-between sm:w-auto",
    className,
  );

  const content =
    variant === "text" ? (
      <>
        <span className="link-text">{children}</span>
        {kind !== "none" && <Icon aria-hidden="true" className="arrow-shift size-3.5 shrink-0" strokeWidth={2} />}
      </>
    ) : (
      <>
        <span>{children}</span>
        {kind !== "none" &&
          (variant === "outline" ? (
            <Icon aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={2} />
          ) : (
            <span className="btn-icon" aria-hidden="true">
              <Icon className="size-4" strokeWidth={2} />
            </span>
          ))}
      </>
    );

  if (external || mail) {
    return (
      <a href={href} className={classes} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {content}
    </Link>
  );
}

/** Inline external link with ↗. */
export function ExternalLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={cn("link-draw", className)}>
      <span className="link-text">{children}</span>
      <ArrowUpRight aria-hidden="true" className="size-[0.9em] shrink-0" />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
