import { insightsSection } from "@/content/home";
import { getInsights } from "@/lib/insights";
import { Section } from "@/components/ui/Section";
import { InsightGrid } from "@/components/insights/InsightGrid";

/** 10 — Insights (light, chapter G). */
export function InsightsPreview({ index }: { index: string }) {
  const posts = getInsights().slice(0, 3);
  return (
    <Section
      id="insights"
      index={index}
      label={insightsSection.label}
      title={insightsSection.title}
      link={posts.length ? insightsSection.link : undefined}
    >
      <InsightGrid posts={posts} emptyText={insightsSection.empty} />
    </Section>
  );
}
