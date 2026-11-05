/**
 * Statement text whose words brighten from slate to paper as you scroll
 * (philosophy signature). CSS scroll-driven: each word's paper overlay fades in
 * across its own slice of the paragraph's view timeline (opacity only).
 * Browsers without scroll-driven animations — and reduced motion — show the
 * finished, fully bright statement. Screen readers get the sentence once.
 */
export function ScrollHighlight({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const n = words.length;
  return (
    <p className={`scroll-highlight ${className ?? ""}`}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i} className="relative inline-block whitespace-pre">
            <span className="text-slate">{w} </span>
            <span
              className="hl-word absolute inset-0 text-paper"
              style={{ ["--a" as string]: `${Math.round((i / n) * 100)}%`, ["--b" as string]: `${Math.round(((i + 1) / n) * 100)}%` }}
            >
              {w}{" "}
            </span>
          </span>
        ))}
      </span>
    </p>
  );
}
