import { ticker } from "@/content/home";
import { Marquee } from "@/components/motion/Marquee";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ticker.map((word) => (
        <li key={word} className="flex items-center">
          <span className="px-6 text-[clamp(1.25rem,1rem+1.2vw,2rem)] font-semibold tracking-[-0.02em] whitespace-nowrap text-paper xl:px-8">
            {word}
          </span>
          <span className="text-lime" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Dark keyword band between chapter A and B. */
export function Ticker() {
  return (
    <div className="theme-dark border-y border-line">
      <h2 className="sr-only">Focus areas</h2>
      <Marquee className="marquee overflow-hidden py-6 xl:py-8">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </Marquee>
    </div>
  );
}
