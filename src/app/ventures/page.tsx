import type { Metadata } from "next";
import { ventures } from "@/content/ventures";
import { venturesSection } from "@/content/home";
import { PageHero } from "@/components/ui/PageHero";
import { VentureStack } from "@/components/ventures/VentureCard";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, organizationSchema } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Ventures",
  description:
    "The companies and products Ahmed Musab is building: Pixelpk Technologies, an AI and software company in Lahore, and Pakistan LawBot, an AI legal assistant for Pakistani law.",
  path: "/ventures",
});

export default function VenturesPage() {
  return (
    <>
      <JsonLd data={ventures.map(organizationSchema)} />
      <PageHero label="Ventures" title={venturesSection.title} intro={venturesSection.intro} meta={venturesSection.meta} />
      <section aria-label="All ventures" className="chapter-dark theme-dark relative">
        <div aria-hidden="true" className="glow-accent pointer-events-none absolute inset-0 -z-10" />
        <div className="container-site py-[clamp(1.5rem,4vw,3rem)]">
          <VentureStack ventures={ventures} headingLevel="h2" />
        </div>
      </section>
      <ContactPanel />
    </>
  );
}
