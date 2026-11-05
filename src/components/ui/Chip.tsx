import { cn } from "@/lib/cn";

export function Chip({
  children,
  className,
  tone = "outline",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "outline" | "solid" | "lime";
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-8 items-center gap-2 rounded-full px-3 py-1 text-meta whitespace-nowrap",
        tone === "outline" && "border border-line text-fg",
        tone === "solid" && "bg-card text-fg",
        tone === "lime" && "bg-lime text-ink",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ label = "Live" }: { label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-label text-fg">
      <span className="status-dot" aria-hidden="true" />
      {label}
    </span>
  );
}
