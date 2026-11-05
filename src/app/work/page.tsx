import type { Metadata } from "next";
import { workSection } from "@/content/home";
import { allProjects, isWorkPreview } from "@/lib/work";
import { PageHero } from "@/components/ui/PageHero";
import { WorkExplorerLazy as WorkExplorer } from "@/components/work/WorkExplorerLazy";
import { WorkEmptyState } from "@/components/home/WorkStack";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Selected work from Pixelpk Technologies: products Ahmed Musab and his team have designed, built and shipped for clients.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero label="Work" title={workSection.title} intro={workSection.intro} />
      <section aria-label="Projects" className="theme-light">
        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="py-section">
            {isWorkPreview && (
              <p className="mb-6 rounded-full border border-dashed border-line-strong px-4 py-2 text-center text-label text-muted">
                Design preview · sample cards · not shown in production
              </p>
            )}
            {allProjects.length ? <WorkExplorer projects={allProjects} /> : <WorkEmptyState />}
          </div>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
