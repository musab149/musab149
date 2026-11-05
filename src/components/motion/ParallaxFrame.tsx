/**
 * Inner parallax (±40px desktop, ±20px tablet) for screenshots inside device
 * frames (ventures signature). Implemented with CSS scroll-driven animations
 * (`animation-timeline: view()`) where supported — zero JavaScript; static in
 * other browsers and under reduced motion. See `.parallax-inner` in globals.css.
 * Ancestors must clip with `overflow: clip` (not hidden): `hidden` creates a
 * scroll container, which would capture the view() timeline.
 */
export function ParallaxFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={className} style={{ position: "absolute", inset: 0, overflow: "clip" }}>
      <div className="parallax-inner absolute inset-0">{children}</div>
    </div>
  );
}
