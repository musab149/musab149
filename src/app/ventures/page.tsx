import type { Metadata } from "next";
import { ventures } from "@/content/ventures";
import { PageHero } from "@/components/ui/PageHero";
import { VentureCard } from "@/components/ventures/VentureCard";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Ventures",
  description:
    "The companies and products Ahmed Musab is building: Pixelpk Technologies, an AI-first software company, and Pakistan Law Bot, a legal AI platform for Pakistan.",
  path: "/ventures",
});

export default function VenturesPage() {
  return (
    <>
      <JsonLd data={ventures.map(organizationSchema)} />
      <PageHero
        label="Ventures"
        title="Companies and products *I'm building*."
        intro="A software company that builds AI for growing businesses, and an AI product of my own in production."
      />
      <section aria-label="All ventures" className="theme-dark">
        <div className="container-site py-section">
          <div className="flex flex-col gap-[var(--gutter)] xl:gap-12">
            {ventures.map((v, i) => (
              <VentureCard key={v.slug} venture={v} index={i} flip={i % 2 === 1} headingLevel="h2" />
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
