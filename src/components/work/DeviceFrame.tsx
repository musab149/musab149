import { cn } from "@/lib/cn";

/** CSS-built browser chrome for real screenshots. Children = the screen (next/image with fill). */
export function BrowserFrame({
  domain,
  children,
  className,
  screenClassName = "aspect-[16/10]",
}: {
  domain?: string;
  children: React.ReactNode;
  className?: string;
  screenClassName?: string;
}) {
  return (
    <div className={cn("overflow-clip rounded-[14px] border border-ink/10 bg-paper-2 shadow-[0_24px_60px_-28px_rgb(13_12_29/0.45)]", className)}>
      <div className="flex h-8 items-center gap-3 border-b border-ink/10 bg-paper-2 px-3" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </span>
        {domain && (
          <span className="mx-auto flex h-5 max-w-[60%] flex-1 items-center justify-center truncate rounded-full bg-ink/[0.06] px-3 font-mono text-[0.625rem] text-ink/60">
            {domain}
          </span>
        )}
        <span className="w-[42px]" />
      </div>
      <div className={cn("relative overflow-clip bg-paper-3", screenClassName)}>{children}</div>
    </div>
  );
}

/** CSS phone frame. Children = the screen (next/image with fill). */
export function PhoneFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[30px] border-[6px] border-ink bg-ink shadow-[0_24px_50px_-20px_rgb(13_12_29/0.55)]", className)}>
      <div className="relative aspect-[9/19.5] overflow-clip rounded-[24px] bg-paper-3">
        <span aria-hidden="true" className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-ink" />
        {children}
      </div>
    </div>
  );
}
