import { cn } from "@/lib/cn";

/** Registration-mark "+" ticks at the four corners of a frame (brief §5.5). */
export function RegMarks({ className, inset = -7 }: { className?: string; inset?: number }) {
  const pos = `${inset}px`;
  return (
    <span aria-hidden="true" className={cn("pointer-events-none absolute inset-0", className)}>
      <span className="regmark" style={{ top: pos, left: pos }} />
      <span className="regmark" style={{ top: pos, right: pos }} />
      <span className="regmark" style={{ bottom: pos, left: pos }} />
      <span className="regmark" style={{ bottom: pos, right: pos }} />
    </span>
  );
}
