import { Fragment } from "react";

/**
 * Renders copy where *one phrase* is wrapped in asterisks as the Instrument
 * Serif italic emphasis. Content files stay plain strings.
 */
export function Emphasis({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <em key={i} className="emph">
            {part.slice(1, -1)}
          </em>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        ),
      )}
    </>
  );
}

type Word = { word: string; emph: boolean };

/** Split into clusters of words that had no whitespace between them (e.g. "building" + "."). */
function clusters(text: string): Word[][] {
  const out: Word[][] = [[]];
  const re = /\*([^*]+)\*|(\s+)|([^\s*]+)/g;
  let m: RegExpExecArray | null;
  const push = (w: Word) => out[out.length - 1].push(w);
  const space = () => {
    if (out[out.length - 1].length) out.push([]);
  };
  while ((m = re.exec(text))) {
    if (m[1] !== undefined) {
      m[1].split(/(\s+)/).forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) space();
        else push({ word: part, emph: true });
      });
    } else if (m[2] !== undefined) space();
    else push({ word: m[3], emph: false });
  }
  return out.filter((c) => c.length);
}

/**
 * Heading text split into masked words so each line can rise from its
 * baseline. `variant="hero"` uses the CSS-only load animation (no JS wait);
 * the default variant is driven by the shared <Reveal lines> observer.
 * Punctuation stays glued to its word; `underline` draws a lime rule under
 * each emphasised word (hero only).
 */
export function RiseText({
  text,
  variant = "reveal",
  underline = false,
}: {
  text: string;
  variant?: "reveal" | "hero";
  underline?: boolean;
}) {
  const groups = clusters(text);
  const cls = variant === "hero" ? "rise-word hero-word" : "rise-word";
  let n = 0;

  const renderWord = (w: Word, key: number) => {
    const i = n++;
    const inner = (
      <span className={w.emph && underline ? `${cls} relative` : cls} style={{ ["--w" as string]: i }}>
        <span>{w.word}</span>
        {w.emph && underline && (
          <span
            aria-hidden="true"
            className="hero-underline absolute bottom-[0.02em] left-0 right-0 h-[0.06em] min-h-[3px] bg-lime"
          />
        )}
      </span>
    );
    return w.emph ? (
      <em key={key} className="emph">
        {inner}
      </em>
    ) : (
      <Fragment key={key}>{inner}</Fragment>
    );
  };

  return (
    <>
      {groups.map((group, gi) => (
        <Fragment key={gi}>
          {group.length === 1 ? (
            renderWord(group[0], 0)
          ) : (
            <span className="whitespace-nowrap">{group.map((w, wi) => renderWord(w, wi))}</span>
          )}
          {gi < groups.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
