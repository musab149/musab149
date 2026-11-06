import { ArrowUp, ArrowUpRight } from "lucide-react";
import { HoverPrefetchLink as Link } from "@/components/ui/HoverPrefetchLink";
import { nav, site, links, configuredProfiles } from "@/content/site";
import { ventures } from "@/content/ventures";
import { services } from "@/content/services";
import { LiveClock } from "@/components/motion/LiveClock";

/**
 * Dark footer chapter: four columns, the outlined name, and the bottom row.
 * When the page ends with the contact panel the two read as one dark block.
 */
export function SiteFooter() {
  const profiles = configuredProfiles();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer chapter-dark theme-dark relative" aria-labelledby="footer-title">
      <div className="container-site">
        <div className="grid-site gap-y-12 border-t border-line pt-14 xl:pt-16">
          <div className="col-span-12 md:col-span-6 xl:col-span-4">
            <h2 id="footer-title" className="display-sm text-paper">
              {site.name}
            </h2>
            <p className="mt-3 text-label text-muted">{site.jobTitle}</p>
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed text-muted">
              I build AI agents, LLM-powered products and the software businesses around them.
            </p>
            <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 text-label text-fg">
              <span>{site.location}</span>
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <LiveClock />
            </p>
          </div>

          <FooterCol title="Explore" className="col-span-6 md:col-span-3 xl:col-span-2">
            {[{ label: "Home", href: "/" }, ...nav, { label: "Insights", href: "/insights" }, { label: "Contact", href: "/contact" }].map(
              (item) => (
                <li key={item.href}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ),
            )}
          </FooterCol>

          <FooterCol title="Ventures" className="col-span-6 md:col-span-3 xl:col-span-2">
            {ventures.map((v) => (
              <li key={v.slug}>
                <FooterLink href={v.url} external>
                  {v.name}
                </FooterLink>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Services" className="col-span-6 md:col-span-6 xl:col-span-2">
            {services.slice(0, 6).map((s) => (
              <li key={s.title}>
                <FooterLink href={s.href} external>
                  {s.title}
                </FooterLink>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere" className="col-span-6 md:col-span-6 xl:col-span-2">
            {profiles.map((p) => (
              <li key={p.key}>
                <FooterLink href={p.href} external>
                  {p.label}
                </FooterLink>
              </li>
            ))}
            {links.email && (
              <li>
                <FooterLink href={`mailto:${links.email}`}>Email</FooterLink>
              </li>
            )}
            <li>
              <FooterLink href="/contact">Send an enquiry</FooterLink>
            </li>
            <li>
              <FooterLink href="https://pixelpk.com/" external>
                pixelpk.com
              </FooterLink>
            </li>
          </FooterCol>
        </div>

        {/* Outlined name */}
        <p
          aria-hidden="true"
          className="mt-16 select-none whitespace-nowrap text-center font-sans text-[clamp(3rem,14.2vw,15rem)] font-[850] uppercase leading-[0.8] tracking-[-0.01em] text-transparent [-webkit-text-stroke:1px_rgb(243_242_237/0.22)] [font-stretch:72%] xl:mt-20"
        >
          {site.name}
        </p>

        <div className="mt-10 flex flex-col gap-4 border-t border-line py-7 text-label text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="link-draw hover:text-fg">
              <span className="link-text">Privacy</span>
            </Link>
            <a href="#top" className="link-draw hover:text-fg">
              <span className="link-text">Back to top</span>
              <ArrowUp aria-hidden="true" className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-label text-muted">{title}</h3>
      <ul className="mt-5 flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children, external = false }: { href: string; children: React.ReactNode; external?: boolean }) {
  const cls = "link-draw min-h-11 text-[0.9375rem] text-fg/85 hover:text-fg xl:min-h-9";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        <span className="link-text">{children}</span>
        <ArrowUpRight aria-hidden="true" className="size-3.5 text-muted" />
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  if (href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls}>
        <span className="link-text">{children}</span>
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      <span className="link-text">{children}</span>
    </Link>
  );
}
