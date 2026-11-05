import { site, links, configuredProfiles } from "@/content/site";
import type { Venture } from "@/content/ventures";

/** JSON-LD builders (brief §11). `sameAs` only includes configured profiles. */

export function personSchema() {
  const sameAs = configuredProfiles().map((p) => p.href);
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${site.url}/#person`,
    name: site.name,
    url: site.url,
    image: `${site.url}/images/ahmed-musab-headshot.jpg`,
    jobTitle: "Founder & CEO",
    description: site.description,
    worksFor: {
      "@type": "Organization",
      name: "Pixelpk Technologies",
      url: "https://pixelpk.com/",
    },
    homeLocation: { "@type": "Place", name: site.location },
    knowsAbout: [
      "Artificial intelligence",
      "AI agents",
      "Large language models",
      "Retrieval-augmented generation",
      "Workflow automation",
      "Software engineering",
      "Product development",
    ],
    ...(links.email ? { email: `mailto:${links.email}` } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema(v: Venture) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: v.name,
    url: v.url,
    description: v.overview,
    ...(v.slug === "pixelpk-technologies"
      ? { founder: { "@id": `${site.url}/#person`, "@type": "Person", name: site.name } }
      : {}),
  };
}

export function articleSchema(a: {
  title: string;
  description: string;
  date: string;
  updated?: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    datePublished: a.date,
    dateModified: a.updated ?? a.date,
    url: `${site.url}/insights/${a.slug}`,
    mainEntityOfPage: `${site.url}/insights/${a.slug}`,
    image: `${site.url}/insights/${a.slug}/opengraph-image`,
    author: { "@type": "Person", "@id": `${site.url}/#person`, name: site.name, url: site.url },
    publisher: { "@type": "Person", name: site.name, url: site.url },
  };
}

/** Safe JSON-LD script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
