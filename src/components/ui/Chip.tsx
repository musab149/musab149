import { cn } from "@/lib/cn";

export function Chip({ children, className, solid = false }: { children: React.ReactNode; className?: string; solid?: boolean }) {
  return <span className={cn("chip", solid && "chip-solid", className)}>{children}</span>;
}

export function StatusBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-label text-fg">
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
