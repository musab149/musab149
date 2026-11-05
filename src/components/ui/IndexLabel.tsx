import { cn } from "@/lib/cn";

/** `01 — About` (mono, muted). */
export function IndexLabel({
  index,
  label,
  className,
}: {
  index?: string;
  label: string;
  className?: string;
}) {
  return (
    <p className={cn("text-label text-muted", className)}>
      {index && (
        <>
          <span className="text-fg">{index}</span>
          <span aria-hidden="true"> — </span>
          <span className="sr-only">, </span>
        </>
      )}
      {label}
    </p>
  );
}
