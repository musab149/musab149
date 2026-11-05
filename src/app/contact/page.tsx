import type { Metadata } from "next";
import Image from "next/image";
import { links, site, configuredProfiles } from "@/content/site";
import { photos } from "@/content/culture";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { LiveClock } from "@/components/motion/LiveClock";
import { ExternalLink } from "@/components/ui/Button";
import { isContactConfigured } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Exploring a software product, an AI initiative or a business collaboration? Send Ahmed Musab an enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  const profiles = configuredProfiles();
  return (
    <>
      <PageHero
        label="Contact"
        title="Let's explore what we can build *together*."
        intro="Whether you're exploring a software product, an AI initiative or a business collaboration, I'd be glad to hear what you're working on."
      />
      <section aria-label="Enquiry form" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="grid-site gap-y-14 py-section">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="mb-10 text-label text-muted">
                <span className="text-fg">02</span> — Send an enquiry
              </h2>
              <ContactForm email={links.email || undefined} configured={isContactConfigured()} />
            </div>
            <aside className="col-span-12 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
              <div className="rounded-[var(--radius-card)] border border-line bg-card p-7">
                <div className="flex items-center gap-4">
                  <div className="photo-grade relative size-16 overflow-hidden rounded-full">
                    <Image src={photos.avatar.src} alt={photos.avatar.alt} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-fg">{site.name}</p>
                    <p className="text-meta text-muted">{site.jobTitle}</p>
                  </div>
                </div>
                <dl className="mt-8 border-t border-line">
                  <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-label text-muted">Based in</dt>
                    <dd className="text-[0.9375rem] font-medium text-fg">{site.location}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                    <dt className="text-label text-muted">Local time</dt>
                    <dd className="text-[0.9375rem] font-medium text-fg">
                      <LiveClock seconds />
                    </dd>
                  </div>
                  {links.email && (
                    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                      <dt className="text-label text-muted">Email</dt>
                      <dd className="text-[0.9375rem] font-medium text-fg">
                        <a className="link-inline" href={`mailto:${links.email}`}>
                          {links.email}
                        </a>
                      </dd>
                    </div>
                  )}
                  {profiles.map((p) => (
                    <div key={p.key} className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                      <dt className="text-label text-muted">{p.label}</dt>
                      <dd className="text-[0.9375rem] font-medium text-fg">
                        <ExternalLink href={p.href}>Profile</ExternalLink>
                      </dd>
                    </div>
                  ))}
                  {links.booking && (
                    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
                      <dt className="text-label text-muted">Call</dt>
                      <dd className="text-[0.9375rem] font-medium text-fg">
                        <ExternalLink href={links.booking}>Book a call</ExternalLink>
                      </dd>
                    </div>
                  )}
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
