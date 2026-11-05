import { cn } from "@/lib/cn";

export function Container({
  children,
  className,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "header" | "footer" | "nav";
}) {
  return <Tag className={cn("container-site", className)}>{children}</Tag>;
}
