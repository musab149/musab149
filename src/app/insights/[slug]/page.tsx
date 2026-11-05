import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getInsights, getInsight, formatDate } from "@/lib/insights";
import { MDXContent } from "@/lib/mdx";
import { site } from "@/content/site";
import { ReadingProgress } from "@/components/insights/ReadingProgress";
import { TableOfContents } from "@/components/insights/TableOfContents";
import { ShareLinks } from "@/components/insights/ShareLinks";
import { InsightCard } from "@/components/insights/InsightCard";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { ContactCTA } from "@/components/home/ContactCTA";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, articleSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return getInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/insights/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  const meta = pageMetadata({ title: post.title, description: post.description, path: `/insights/${post.slug}`, type: "article" });
  return {
    ...meta,
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
    openGraph: { ...meta.openGraph, type: "article", publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: [site.name] },
  };
}

export default async function InsightPage({ params }: PageProps<"/insights/[slug]">) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();
  const others = getInsights().filter((p) => p.slug !== post.slug);
  const related = [...others.filter((p) => p.category === post.category), ...others.filter((p) => p.category !== post.category)].slice(0, 3);
  const url = `${site.url}/insights/${post.slug}`;

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <ReadingProgress targetId="article-body" />
      <article className="theme-light">
        <header data-hero="" className="relative isolate overflow-hidden">
          <div className="hero-grid motif-grid absolute inset-0 -z-10 opacity-80" aria-hidden="true" />
          <div className="container-site pb-14 pt-[clamp(2.5rem,5vw,5rem)]">
            <div className="hero-fade flex flex-wrap items-center gap-3 text-label text-muted">
              <Chip>{post.category}</Chip>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{post.readingMinutes} min read</span>
              {post.draft && <Chip tone="lime">Draft · not published</Chip>}
            </div>
            <h1 className="hero-fade mt-8 max-w-[22ch] text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] font-bold leading-[1.04] tracking-[-0.03em] text-fg" style={{ ["--d" as string]: "0.1s" }}>
              {post.title}
            </h1>
            {post.description && (
              <p className="hero-fade mt-6 max-w-[58ch] text-lg leading-relaxed text-muted xl:text-xl" style={{ ["--d" as string]: "0.25s" }}>
                {post.description}
              </p>
            )}
            <p className="hero-fade mt-8 text-meta text-muted" style={{ ["--d" as string]: "0.35s" }}>
              By <span className="text-fg">{site.name}</span> · {site.jobTitle}
            </p>
          </div>
        </header>

        {post.image && (
          <div className="container-site">
            <div className="photo-grade relative aspect-[16/8] overflow-hidden rounded-[4px] bg-card">
              <Image src={post.image} alt={post.imageAlt ?? ""} fill priority sizes="(min-width: 1280px) 1216px, 94vw" className="object-cover" />
            </div>
          </div>
        )}

        <div className="container-site">
          <div className="hairline" aria-hidden="true" />
          <div className="grid-site gap-y-12 py-16 xl:py-20">
            <aside className="col-span-12 hidden xl:col-span-3 xl:block">
              <TableOfContents headings={post.headings} />
            </aside>
            <div id="article-body" className="col-span-12 xl:col-span-7 xl:col-start-5">
              <div className="prose-article text-fg">
                <MDXContent source={post.body} />
              </div>
              <div className="mt-16 border-t border-line pt-8">
                <ShareLinks url={url} title={post.title} />
              </div>
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="theme-light">
          <div className="container-site pb-section">
            <div className="hairline mb-14" aria-hidden="true" />
            <div className="mb-10 flex items-end justify-between">
              <h2 id="related-title" className="text-h3 text-fg">
                Related <em className="emph">reading</em>
              </h2>
              <Button href="/insights" variant="text">
                All insights
              </Button>
            </div>
            <ul className="grid gap-x-[var(--gutter)] gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <InsightCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
      <ContactCTA />
    </>
  );
}
