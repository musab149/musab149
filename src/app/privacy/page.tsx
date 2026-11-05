import type { Metadata } from "next";
import { links } from "@/content/site";
import { PageHero } from "@/components/ui/PageHero";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description: "A short, plain-language privacy notice for ahmedmusab.com: what the contact form collects and why.",
  path: "/privacy",
});

const sections = [
  {
    h: "What the contact form collects",
    p: [
      "When you send an enquiry, the form collects your name, work email, company (optional), the enquiry type you choose, and your message.",
      "Two hidden checks run to block spam: an empty trap field that people never see, and the time it took to fill in the form. If spam protection by Cloudflare Turnstile is switched on, Cloudflare processes a short challenge in your browser.",
    ],
  },
  {
    h: "Why it is collected",
    p: ["Only to read and reply to your enquiry. It is not used for marketing, and it is not sold or shared for anyone else's marketing."],
  },
  {
    h: "How it is delivered and stored",
    p: [
      "Your message is sent by email through Resend, an email delivery provider, to my inbox. The website itself does not keep a database of enquiries.",
      "To limit abuse, the form may count how many messages come from the same IP address over a short period. When configured, this uses Upstash, a hosted data store, and the count expires automatically.",
    ],
  },
  {
    h: "Cookies and analytics",
    p: ["This site does not set advertising or analytics cookies."],
  },
  {
    h: "Your choices",
    p: [
      "You can ask me to delete your enquiry and any replies at any time. Use the contact form, or the email address shown on the contact page if one is listed.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero label="Privacy" title="Privacy, in *plain* language." intro="What this site collects, why, and what happens to it." />
      <section aria-label="Privacy notice" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="grid-site py-section">
            <div className="col-span-12 lg:col-span-8 lg:col-start-3">
              {sections.map((s, i) => (
                <div key={s.h} className="border-b border-line py-10 first:pt-0">
                  <h2 className="text-h3 text-fg">
                    <span className="mr-4 text-label text-muted">{String(i + 1).padStart(2, "0")}</span>
                    {s.h}
                  </h2>
                  {s.p.map((p) => (
                    <p key={p.slice(0, 20)} className="measure mt-4 text-muted">
                      {p}
                    </p>
                  ))}
                </div>
              ))}
              {links.email && (
                <p className="mt-10 text-muted">
                  Questions? Email{" "}
                  <a className="link-inline text-fg" href={`mailto:${links.email}`}>
                    {links.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
