"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

/**
 * next/link that prefetches on intent (hover, focus, touch) instead of on
 * entering the viewport. Header, buttons and footer links are all visible at
 * load; viewport prefetching would download every route's JS up front and
 * compete with the page's own LCP on mobile networks.
 */
export function HoverPrefetchLink({ href, ...rest }: React.ComponentProps<typeof Link>) {
  const router = useRouter();
  const prefetch = () => {
    if (typeof href === "string" && href.startsWith("/") && !href.startsWith("//")) router.prefetch(href.split("#")[0] || "/");
  };
  return <Link href={href} prefetch={false} onPointerEnter={prefetch} onFocus={prefetch} onTouchStart={prefetch} {...rest} />;
}
