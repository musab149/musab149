import { cn } from "@/lib/cn";
import { RegMarks } from "@/components/ui/RegMarks";

/**
 * CSS-built device frames (brief §5.5) for every screenshot. Children are the
 * screen content (usually a next/image with `fill`).
 */
export function BrowserFrame({
  domain,
  children,
  className,
  screenClassName,
  marks = true,
}: {
  domain?: string;
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
  marks?: boolean;
}) {
  return (
    <div className={cn("relative", className)}>
      {marks && <RegMarks />}
      <div className="overflow-hidden rounded-[8px] border border-line-strong bg-card shadow-[0_1px_0_rgb(0_0_0/0.04)]">
        <div className="flex h-9 items-center gap-3 border-b border-line px-3.5" aria-hidden="true">
          <span className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
            <span className="size-2.5 rounded-full bg-fg/15" />
          </span>
          {domain && (
            <span className="mx-auto flex h-5 max-w-[60%] flex-1 items-center justify-center truncate rounded-full bg-fg/[0.06] px-3 font-mono text-[0.6875rem] text-muted">
              {domain}
            </span>
          )}
          <span className="w-[42px]" />
        </div>
        <div className={cn("relative overflow-hidden", screenClassName)}>{children}</div>
      </div>
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
  marks = true,
}: {
  children: React.ReactNode;
  className?: string;
  marks?: boolean;
}) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[280px]", className)}>
      {marks && <RegMarks />}
      <div className="rounded-[36px] border border-line-strong bg-card p-2.5">
        <div className="relative aspect-[9/19.5] overflow-hidden rounded-[28px] bg-ink">
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-2.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-ink"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
