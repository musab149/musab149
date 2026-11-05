import type { Metadata } from "next";
import { StatusStrip } from "@/components/layout/StatusStrip";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { AboutPreview } from "@/components/home/AboutPreview";
import { VentureShowcase } from "@/components/home/VentureShowcase";
import { WorkStack } from "@/components/home/WorkStack";
import { AILab } from "@/components/home/AILab";
import { ExpertiseGrid } from "@/components/home/ExpertiseGrid";
import { ProcessSection } from "@/components/home/ProcessSection";
import { CultureGallery } from "@/components/home/CultureGallery";
import { Philosophy } from "@/components/home/Philosophy";
import { InsightsPreview } from "@/components/home/InsightsPreview";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { site } from "@/content/site";
import { ventures } from "@/content/ventures";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, organizationSchema, personSchema } from "@/lib/schema";
import { pad2 } from "@/lib/cn";

export const metadata: Metadata = pageMetadata({
  description: site.description,
  path: "/",
  type: "profile",
});

/**
 * Homepage sequence (brief §7). Indices are generated from this list, so if a
 * section is ever hidden the numbering stays continuous (01 → 12).
 */
const sections = [
  { key: "hero", visible: true },
  { key: "about", visible: true },
  { key: "ventures", visible: ventures.length > 0 },
  { key: "work", visible: true },
  { key: "ai", visible: true },
  { key: "expertise", visible: true },
  { key: "process", visible: true },
  { key: "team", visible: true },
  { key: "philosophy", visible: true },
  { key: "insights", visible: true },
  { key: "faq", visible: true },
  { key: "contact", visible: true },
] as const;

type Key = (typeof sections)[number]["key"];

export default function HomePage() {
  const visible = sections.filter((s) => s.visible);
  const idx = (key: Key) => pad2(visible.findIndex((s) => s.key === key) + 1);
  const show = (key: Key) => visible.some((s) => s.key === key);

  return (
    <>
      <JsonLd data={[personSchema(), ...ventures.map(organizationSchema)]} />
      <StatusStrip />
      {/* Chapter A — light */}
      <Hero index={idx("hero")} />
      <AboutPreview index={idx("about")} />
      {/* Dark band */}
      <Ticker />
      {/* Chapter B — dark */}
      {show("ventures") && <VentureShowcase index={idx("ventures")} />}
      {/* Chapter C — light */}
      <WorkStack index={idx("work")} />
      {/* Chapter D — dark */}
      <AILab index={idx("ai")} />
      {/* Chapter E — light */}
      <ExpertiseGrid index={idx("expertise")} />
      <ProcessSection index={idx("process")} />
      {/* Chapter F — dark */}
      <CultureGallery index={idx("team")} />
      <Philosophy index={idx("philosophy")} />
      {/* Chapter G — light */}
      <InsightsPreview index={idx("insights")} />
      <FaqSection index={idx("faq")} />
      {/* Chapter H — dark (footer follows) */}
      <ContactCTA index={idx("contact")} />
    </>
  );
}
