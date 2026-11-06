import type { Metadata } from "next";
import { allProjects, projectTags, toCard } from "@/lib/work";
import { PageHero } from "@/components/ui/PageHero";
import { WorkIndex } from "@/components/work/WorkIndex";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Sixteen case studies from Pixelpk Technologies: AI products, mobile apps and business platforms Ahmed Musab's team designed, built and shipped for clients in Pakistan, the Gulf, the UK, the US and Australia.",
  path: "/work",
});

export default function WorkPage() {
  const count = (t: string) => allProjects.filter((p) => (p.tags as string[]).includes(t)).length;
  const ai = count("AI");
  const figures = [
    { value: String(allProjects.length), label: "case studies" },
    { value: String(ai), label: "AI products" },
    { value: String(count("Mobile")), label: "mobile apps" },
    { value: String(count("Web")), label: "web platforms" },
  ];
  return (
    <>
      <PageHero
        label="Work"
        title={"Case\n*studies*."}
        meta={`${allProjects.length} case studies · ${ai} AI products`}
        intro="AI products, mobile apps and business platforms the Pixelpk team and I designed, built and shipped, with the problem, the build and the stack behind each one."
      >
        <ul className="grid grid-cols-2 border-t border-line lg:grid-cols-4">
          {figures.map((f, i) => (
            <li
              key={f.label}
              className={["border-b border-line py-5 lg:border-b-0 lg:border-l lg:pl-6", i % 2 === 1 ? "border-l pl-5" : "pr-4", i === 0 ? "lg:border-l-0 lg:pl-0" : ""].join(" ")}
            >
              <p className="figure-xl text-ink">{f.value}</p>
              <p className="mt-2 text-[0.9375rem] text-mist">{f.label}</p>
            </li>
          ))}
        </ul>
      </PageHero>
      <section aria-label="All case studies" className="theme-light">
        <div className="container-site pb-[var(--section-pad)]">
          <h2 className="sr-only">All case studies</h2>
          <WorkIndex projects={allProjects.map(toCard)} tags={projectTags()} />
        </div>
      </section>
      <ContactPanel />
    </>
  );
}
