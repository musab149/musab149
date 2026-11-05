/** Tiny className joiner (no dependency needed). */
export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export const isExternal = (href: string) => /^(https?:)?\/\//.test(href) || href.startsWith("mailto:");

export const pad2 = (n: number) => String(n).padStart(2, "0");

/** Strip the *emphasis* markers for plain-text contexts (titles, alt, OG). */
export const plain = (text: string) => text.replace(/\*/g, "");
