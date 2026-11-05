import { statusStrip, site, flags } from "@/content/site";
import { LiveClock } from "@/components/motion/LiveClock";
import { RotatingRole } from "@/components/motion/RotatingRole";

/** Homepage-only status strip under the header (brief §7). */
export function StatusStrip() {
  return (
    <div className="theme-light border-b border-line">
      <div className="container-site">
        <ul className="flex min-h-11 flex-wrap items-center gap-x-6 gap-y-1 py-2 text-label text-muted md:justify-between">
          {flags.availability && (
            <li className="flex items-center gap-2.5 text-fg">
              <span className="status-dot" aria-hidden="true" />
              {statusStrip.availability}
            </li>
          )}
          <li className="hidden lg:block">{site.location}</li>
          <li>
            <LiveClock />
          </li>
          <li className="hidden items-center gap-2 md:flex">
            <span aria-hidden="true">Role /</span>
            <span className="sr-only">Roles:</span>
            <RotatingRole roles={statusStrip.roles} />
          </li>
        </ul>
      </div>
    </div>
  );
}
