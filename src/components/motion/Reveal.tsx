import type { ElementType, ReactNode, CSSProperties } from "react";

/**
 * Shared reveal (brief §6.3) — server component. It only marks the group with
 * `data-reveal`; the single client <RevealObserver/> in the root layout adds
 * `.is-in` once the group is in view, and CSS in globals.css animates it with
 * the motion tokens. Children opt in with `data-ri` (+ `--i` for stagger
 * order), `data-draw` for hairlines, or `.rise-word` for masked heading lines.
 */
export function Reveal({
  as,
  children,
  className,
  delay,
  lines = false,
  style,
  id,
  ...rest
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** Extra base delay in seconds (inherited by children as --d). */
  delay?: number;
  /** Group `.rise-word` children into visual lines before revealing. */
  lines?: boolean;
  style?: CSSProperties;
  id?: string;
  "aria-labelledby"?: string;
  "aria-label"?: string;
}) {
  const Tag = (as ?? "div") as ElementType;
  return (
    <Tag
      data-reveal=""
      data-reveal-lines={lines ? "" : undefined}
      id={id}
      className={className}
      style={delay ? { ...style, ["--d" as string]: `${delay}s` } : style}
      {...rest}
    >
      {children}
    </Tag>
  );
}
