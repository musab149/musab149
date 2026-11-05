import type { Metadata } from "next";
import { insightsSection } from "@/content/home";
import { getInsights } from "@/lib/insights";
import { PageHero } from "@/components/ui/PageHero";
import { InsightGrid } from "@/components/insights/InsightGrid";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Notes from Ahmed Musab on AI products, MVPs and building software companies.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getInsights();
  return (
    <>
      <PageHero label="Insights" title={insightsSection.title} intro="Notes on AI products, MVPs and building software companies." />
      <section aria-label="Articles" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="py-section">
            {posts.length ? <InsightsBrowser posts={posts} /> : <InsightGrid posts={[]} emptyText={insightsSection.empty} />}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
