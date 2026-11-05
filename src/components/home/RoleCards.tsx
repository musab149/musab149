import { about } from "@/content/home";
import { Reveal } from "@/components/motion/Reveal";
import { Emphasis } from "@/components/ui/Emphasis";
import { pad2 } from "@/lib/cn";

/**
 * Four roles. One founder. 2×2 cards: hover lifts + lime border + reveals the
 * detail line (desktop). On mobile: horizontal snap carousel, details visible.
 */
export function RoleCards() {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h3 className="text-h3 !text-[clamp(1.5rem,1.2rem+1.2vw,2.25rem)] text-fg">
          <Emphasis text={about.rolesTitle} />
        </h3>
        <p className="text-label text-muted md:hidden" aria-hidden="true">
          {about.swipeHint} →
        </p>
      </div>
      <Reveal
        as="ul"
        aria-label="Roles"
        className="no-scrollbar -mx-[var(--gutter)] mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-[var(--gutter)] md:overflow-visible md:px-0 md:pb-0"
      >
        {about.roles.map((role, i) => (
          <li
            key={role.title}
            data-ri=""
            style={{ ["--i" as string]: i }}
            className="w-[82%] shrink-0 snap-start md:w-auto"
          >
            <article className="role-card group relative flex h-full min-h-[240px] flex-col justify-between rounded-[var(--radius-card)] border border-line bg-card p-7 transition-[transform,border-color] duration-500 ease-[var(--ease-out)] xl:min-h-[280px] xl:p-9">
              <div className="flex items-start justify-between gap-4">
                <span className="text-label text-muted">{pad2(i + 1)}</span>
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full bg-fg/20 transition-colors duration-300 group-hover:bg-lime"
                />
              </div>
              <div className="mt-10">
                <h4 className="text-h3 text-fg">{role.title}</h4>
                <p className="mt-3 max-w-[40ch] text-muted">{role.body}</p>
                <p className="role-detail mt-4 border-t border-line pt-4 text-meta text-fg">{role.detail}</p>
              </div>
            </article>
          </li>
        ))}
      </Reveal>
    </div>
  );
}
