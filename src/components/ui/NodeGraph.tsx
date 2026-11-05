import { cn } from "@/lib/cn";

/**
 * The AI signature motif: thin lines between dots, a few nodes lit lime.
 * Static SVG (server). Used very faintly behind the hero portrait.
 */
const nodes = [
  [40, 60],
  [150, 30],
  [260, 90],
  [90, 170],
  [210, 200],
  [330, 170],
  [30, 290],
  [150, 300],
  [280, 310],
  [370, 260],
  [120, 400],
  [250, 420],
  [360, 380],
] as const;

const edges: Array<[number, number]> = [
  [0, 1], [1, 2], [0, 3], [1, 3], [2, 4], [3, 4], [2, 5], [4, 5],
  [3, 6], [3, 7], [4, 7], [4, 8], [5, 8], [5, 9], [8, 9], [6, 7],
  [7, 10], [7, 11], [8, 11], [9, 12], [11, 12], [10, 11],
];

const lit = new Set([2, 4, 7, 11]);

export function NodeGraph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 450"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none", className)}
    >
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.5">
        {edges.map(([a, b], i) => (
          <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      {nodes.map(([x, y], i) =>
        lit.has(i) ? (
          <g key={i}>
            <circle cx={x} cy={y} r="7" fill="var(--color-lime)" opacity="0.25" />
            <circle cx={x} cy={y} r="3.5" fill="var(--color-lime)" />
          </g>
        ) : (
          <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.7" />
        ),
      )}
    </svg>
  );
}
