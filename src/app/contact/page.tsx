import type { Metadata } from "next";
import Image from "next/image";
import { links, site, configuredProfiles } from "@/content/site";
import { photos } from "@/content/culture";
import { engagementModels } from "@/content/services";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { LiveClock } from "@/components/motion/LiveClock";
import { ExternalLink } from "@/components/ui/Button";
import { isContactConfigured } from "@/lib/contact";
import { pageMetadata } from "@/lib/metadata";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Exploring an AI product, a software build or a partnership? Send Ahmed Musab an enquiry.",
  path: "/contact",
});

export default function ContactPage() {
  const profiles = configuredProfiles();
  return (
    <>
      <PageHero
        label="Contact"
        title={"Let's build\nthe *next* one."}
        intro="Whether you're exploring a software product, an AI initiative or a business collaboration, I'd be glad to hear what you're working on."
      />
      <section aria-label="Enquiry form" className="theme-light">
        <div className="container-site pb-[var(--section-pad)]">
          <div className="hairline" aria-hidden="true" />
          <div className="grid-site gap-y-14 pt-12">
            <div className="col-span-12 lg:col-span-7">
              <h2 className="mb-8 flex items-center gap-2.5 text-label text-mist">
                <span className="dot-accent" aria-hidden="true" />
                <span className="text-ink">02</span> Send an enquiry
              </h2>
              <ContactForm email={links.email || undefined} configured={isContactConfigured()} />
            </div>
            <aside className="col-span-12 flex flex-col gap-3 lg:col-span-4 lg:col-start-9" aria-label="Contact details">
              <div className="card p-6">
                <div className="flex items-center gap-4">
                  <div className="photo-grade relative size-16 overflow-hidden rounded-full">
                    <Image src={photos.avatar.src} alt={photos.avatar.alt} fill sizes="64px" className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-ink">{site.name}</p>
                    <p className="text-label text-mist">{site.jobTitle}</p>
                  </div>
                </div>
                <dl className="mt-6 border-t border-line">
                  <Row k="Based in" v={site.location} />
                  <Row k="Local time" v={<LiveClock seconds />} />
                  {links.email && <Row k="Email" v={<a className="link-inline" href={`mailto:${links.email}`}>{links.email}</a>} />}
                  {profiles.map((p) => (
                    <Row key={p.key} k={p.label} v={<ExternalLink href={p.href}>Profile</ExternalLink>} />
                  ))}
                  {links.booking && <Row k="Call" v={<ExternalLink href={links.booking}>Book a call</ExternalLink>} />}
                  <Row k="Company" v={<ExternalLink href="https://pixelpk.com/">pixelpk.com</ExternalLink>} />
                </dl>
              </div>
              <div className="card p-6">
                <p className="text-label text-mist">Ways to work with the Pixelpk team</p>
                <ol className="mt-4 border-t border-line">
                  {engagementModels.map((m, i) => (
                    <li key={m.title} className="border-b border-line py-3.5">
                      <p className="flex items-baseline gap-3 font-semibold text-ink">
                        <span className="text-label text-accent-deep">{pad2(i + 1)}</span>
                        {m.title}
                      </p>
                      <p className="mt-1 text-[0.875rem] leading-relaxed text-mist">{m.body}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

function Row({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-line py-3.5">
      <dt className="text-label text-mist">{k}</dt>
      <dd className="text-right text-[0.9375rem] font-medium text-ink">{v}</dd>
    </div>
  );
}
