import Image from "next/image";
import type { Photo } from "@/content/culture";
import { Reveal } from "@/components/motion/Reveal";

/** "Beyond the desk" strip — four photos in an equal-height row (2×2 on mobile). */
export function PhotoStrip({ photos }: { photos: Photo[] }) {
  return (
    <Reveal as="ul" className="grid grid-cols-2 gap-[var(--gutter)] xl:grid-cols-4">
      {photos.map((p, i) => (
        <li key={p.src} data-ri="" style={{ ["--i" as string]: i }}>
          <figure className="group">
            <div className="photo-grade relative aspect-[4/5] overflow-hidden rounded-[4px] bg-card">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1280px) 300px, 46vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.03]"
              />
            </div>
            <figcaption className="mt-3 text-label text-muted">{p.caption}</figcaption>
          </figure>
        </li>
      ))}
    </Reveal>
  );
}
