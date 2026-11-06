import Image from "next/image";
import { hero } from "@/content/home";
import { site, statusStrip, flags } from "@/content/site";
import { photos } from "@/content/culture";
import { Button } from "@/components/ui/Button";
import { RiseText, Emphasis } from "@/components/ui/Emphasis";
import { LiveClock } from "@/components/motion/LiveClock";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";

/** Turns venture names inside the bio into links. */
function Bio({ text }: { text: string }) {
  const targets = [
    { text: "Pixelpk Technologies", href: "/ventures/pixelpk-technologies" },
    { text: "Pakistan LawBot", href: "/ventures/pakistan-lawbot" },
  ];
  const parts: React.ReactNode[] = [];
  let rest = text;
  let key = 0;
  while (rest.length) {
    const hit = targets
      .map((t) => ({ ...t, i: rest.indexOf(t.text) }))
      .filter((t) => t.i >= 0)
      .sort((a, b) => a.i - b.i)[0];
    if (!hit) {
      parts.push(rest);
      break;
    }
    parts.push(rest.slice(0, hit.i));
    parts.push(
      <Link key={key++} href={hit.href} className="link-inline font-semibold text-fg">
        {hit.text}
      </Link>,
    );
    rest = rest.slice(hit.i + hit.text.length);
  }
  return <>{parts}</>;
}

/**
 * Hero: status line, the name at poster scale, the one-line positioning, bio,
 * CTAs, the "Now" line and a credential card. The entrance is pure CSS, so the
 * name (the LCP element) is server-rendered and visible on first paint.
 */
export function Hero() {
  const year = new Date().getFullYear();
  return (
    <section data-hero="" aria-labelledby="hero-title" className="theme-light relative isolate overflow-clip pt-28 md:pt-32">
      <div aria-hidden="true" className="bg-dots absolute inset-0 -z-10" />

      <div className="container-site">
        {/* Status line */}
        <ul
          className="hero-fade flex flex-wrap items-center gap-x-6 gap-y-2 text-label text-muted"
          style={{ ["--d" as string]: "0.02s" }}
        >
          {flags.availability && (
            <li className="flex items-center gap-2 rounded-full border border-line bg-paper-2 px-3 py-1.5 text-fg">
              <span className="status-dot" aria-hidden="true" />
              {statusStrip.availability}
            </li>
          )}
          <li className="flex items-center gap-2">
            <span>{statusStrip.place}</span>
            <span aria-hidden="true">·</span>
            <LiveClock />
          </li>
          <li className="hidden sm:block">
            {statusStrip.role} <span aria-hidden="true">/</span> {year}
          </li>
        </ul>

        {/* Name */}
        <h1 id="hero-title" className="display-xl relative z-0 mt-6 text-ink md:mt-8">
          <RiseText text={site.name} variant="hero" />
          <span className="sr-only">, {site.role}</span>
        </h1>

        <div className="grid-site relative mt-8 gap-y-14 pb-[clamp(3.5rem,7vw,6rem)] md:mt-10">
          {/* Copy */}
          <div className="col-span-12 lg:col-span-7">
            <p
              className="hero-fade max-w-[22ch] text-[clamp(1.75rem,1.15rem+2.1vw,2.9rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-ink"
              style={{ ["--d" as string]: "0.35s" }}
            >
              <Emphasis text={hero.sentence} />
            </p>
            <p className="hero-fade mt-7 max-w-[56ch] text-[1.0625rem] leading-relaxed text-mist" style={{ ["--d" as string]: "0.45s" }}>
              <Bio text={hero.bio} />
            </p>
            <div className="hero-fade mt-9 flex flex-col gap-3 sm:flex-row sm:items-center" style={{ ["--d" as string]: "0.55s" }}>
              <Button href={hero.primaryCta.href} variant="ink" full>
                {hero.primaryCta.label}
              </Button>
              <Button href={hero.secondaryCta.href} variant="outline" full>
                {hero.secondaryCta.label}
              </Button>
            </div>
            <p className="hero-fade mt-9 flex max-w-[56ch] items-start gap-3 text-[0.9375rem] text-ink" style={{ ["--d" as string]: "0.65s" }}>
              <span className="mt-[0.3em] flex shrink-0 items-center gap-2 text-label text-accent-deep">
                <span className="dot-accent" aria-hidden="true" />
                Now
              </span>
              <span>{hero.now}</span>
            </p>
          </div>

          {/* Credential card */}
          <div className="col-span-12 flex justify-center sm:justify-start lg:col-span-4 lg:col-start-9 lg:-mt-4 lg:justify-end">
            <div className="hero-card relative z-10">
              <IdCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function IdCard() {
  return (
    <figure className="id-card w-[288px] rounded-[22px] border border-line bg-paper-2 p-3 shadow-[0_30px_60px_-30px_rgb(13_12_29/0.45)] sm:w-[310px]">
      <div className="flex items-center justify-between px-2 pb-3 pt-1">
        <Image src="/logos/pixelpk-ink.png" alt="Pixelpk Technologies" width={656} height={181} sizes="120px" className="h-[18px] w-auto" />
        <span aria-hidden="true" className="h-1.5 w-12 rounded-full bg-ink/15" />
        <span className="text-label text-muted">ID · AM</span>
      </div>
      <div className="photo-grade relative aspect-[4/5] overflow-hidden rounded-[14px] bg-paper-3">
        <Image
          src={photos.portrait.src}
          alt={photos.portrait.alt}
          fill
          loading="eager"
          sizes="310px"
          className="object-cover object-[50%_28%]"
        />
      </div>
      <figcaption className="px-2 pb-1 pt-4">
        <p className="display-sm !text-[1.65rem] text-ink">{hero.card.name}</p>
        <p className="mt-1.5 text-label text-mist">{hero.card.title}</p>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-label text-mist">
          <span>{hero.card.place}</span>
          <span className="text-accent-deep">{hero.card.focus}</span>
        </div>
      </figcaption>
    </figure>
  );
}
