import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { nav, site, links, configuredProfiles } from "@/content/site";
import { ventures } from "@/content/ventures";
import { LiveClock } from "@/components/motion/LiveClock";

/** Four-column footer (brief §7). Dark, part of the closing chapter. */
export function SiteFooter() {
  const profiles = configuredProfiles();
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark relative" aria-labelledby="footer-title">
      <div className="container-site">
        <div className="hairline" aria-hidden="true" />
        <div className="grid-site gap-y-12 py-16 xl:py-20">
          <div className="col-span-12 md:col-span-6 xl:col-span-3">
            <h2 id="footer-title" className="text-h3 text-fg">
              {site.name}
            </h2>
            <p className="mt-2 text-meta text-muted">{site.jobTitle}</p>
            <p className="mt-5 max-w-[34ch] text-[0.9375rem] leading-relaxed text-muted">
              I design and ship AI agents, LLM-powered products and the software businesses around them.
            </p>
          </div>

          <FooterCol title="Explore" className="col-span-6 md:col-span-3 xl:col-span-3">
            <li>
              <FooterLink href="/">Home</FooterLink>
            </li>
            {nav.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Ventures" className="col-span-6 md:col-span-3 xl:col-span-3">
            {ventures.map((v) => (
              <li key={v.slug}>
                <FooterLink href={v.url} external>
                  {v.name}
                </FooterLink>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Elsewhere" className="col-span-12 md:col-span-6 xl:col-span-3">
            {profiles.map((p) => (
              <li key={p.key}>
                <FooterLink href={p.href} external>
                  {p.label}
                </FooterLink>
              </li>
            ))}
            {links.email && (
              <li>
                <FooterLink href={`mailto:${links.email}`}>{links.email}</FooterLink>
              </li>
            )}
            <li>
              <FooterLink href="/contact">Send an enquiry</FooterLink>
            </li>
            <li className="pt-3 text-label text-muted">
              <span className="text-fg">{site.location}</span>
              <span aria-hidden="true"> · </span>
              <LiveClock className="text-fg" />
            </li>
          </FooterCol>
        </div>

        <div className="flex flex-col gap-4 border-t border-line py-8 text-meta text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
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

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="text-label text-muted">{title}</h3>
      <ul className="mt-5 flex flex-col">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const cls = "link-draw text-[0.9375rem] text-fg/90 hover:text-fg";
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
