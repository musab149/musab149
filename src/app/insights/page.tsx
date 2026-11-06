import type { Metadata } from "next";
import { getInsights } from "@/lib/insights";
import { PageHero } from "@/components/ui/PageHero";
import { InsightGrid } from "@/components/insights/InsightGrid";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description: "Notes from Ahmed Musab on AI products, MVPs and building software companies.",
  path: "/insights",
});

const empty = "Writing is on the way: notes on AI products, MVPs and building software companies.";

export default function InsightsPage() {
  const posts = getInsights();
  return (
    <>
      <PageHero label="Insights" title={"Latest\n*writing*."} intro="Notes from building AI products and a software company: what to build, how it behaves with real users, and what we learned." />
      <section aria-label="Articles" className="theme-light">
        <div className="container-site pb-[var(--section-pad)]">
          <div className="hairline mb-10" aria-hidden="true" />
          {posts.length ? <InsightsBrowser posts={posts} /> : <InsightGrid posts={[]} emptyText={empty} />}
        </div>
      </section>
      <ContactPanel />
    </>
  );
}
