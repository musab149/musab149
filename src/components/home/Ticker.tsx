import { ticker } from "@/content/home";
import { Marquee } from "@/components/motion/Marquee";

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {ticker.map((word) => (
        <li key={word} className="flex items-center">
          <span className="display-sm whitespace-nowrap px-6 !text-[clamp(1.5rem,1.1rem+1.4vw,2.5rem)] text-paper xl:px-8">{word}</span>
          <span className="text-[1.25rem] text-accent-bright" aria-hidden="true">
            ✦
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Dark keyword band under the hero. Slows on hover; static under reduced motion. */
export function Ticker() {
  return (
    <div className="chapter-dark theme-dark">
      <h2 className="sr-only">What I work on</h2>
      <Marquee className="overflow-hidden py-5 xl:py-6">
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </Marquee>
    </div>
  );
}
