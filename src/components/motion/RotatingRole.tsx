/**
 * Vertical slot-machine flip through roles every 3s (status strip signature).
 * Pure CSS (see `.role-rotator` in globals.css) — no JavaScript. Under reduced
 * motion the first role is shown statically.
 */
export function RotatingRole({ roles }: { roles: readonly string[] }) {
  const widest = roles.reduce((a, b) => (b.length > a.length ? b : a), "");
  const loop = [...roles, roles[0]];
  return (
    <span className="relative inline-grid h-[1.4em] overflow-hidden align-bottom leading-[1.4]">
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {widest}
      </span>
      <span className="sr-only">{roles.join(", ")}</span>
      <span
        aria-hidden="true"
        className="role-rotator col-start-1 row-start-1 flex flex-col text-fg"
        style={{ ["--n" as string]: roles.length }}
      >
        {loop.map((r, i) => (
          <span key={`${r}-${i}`} className="block h-[1.4em]">
            {r}
          </span>
        ))}
      </span>
    </span>
  );
}
