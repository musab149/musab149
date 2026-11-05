"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

/** Share links: LinkedIn, X, email, copy link. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const items = [
    { label: "LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { label: "X", href: `https://x.com/intent/post?url=${u}&text=${t}` },
    { label: "Email", href: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-2 text-label text-muted">Share</span>
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          {...(i.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className="inline-flex min-h-11 items-center rounded-full border border-line px-4 text-sm font-medium text-fg transition-colors hover:border-line-strong"
        >
          {i.label}
          {i.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
        </a>
      ))}
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable */
          }
        }}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-4 text-sm font-medium text-fg transition-colors hover:border-line-strong"
      >
        {copied ? <Check aria-hidden="true" className="size-4" /> : <Link2 aria-hidden="true" className="size-4" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy link"}</span>
      </button>
    </div>
  );
}
