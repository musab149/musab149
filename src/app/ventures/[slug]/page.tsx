import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ventures, getVenture } from "@/content/ventures";
import { VentureDetail } from "@/components/ventures/VentureDetail";
import { ContactPanel } from "@/components/home/ContactPanel";
import { pageMetadata } from "@/lib/metadata";
import { JsonLd, organizationSchema } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return ventures.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ventures/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const v = getVenture(slug);
  if (!v) return {};
  return pageMetadata({
    title: v.name,
    description: `${v.name}: ${v.description} Ahmed Musab's role: ${v.role}.`,
    path: `/ventures/${v.slug}`,
  });
}

export default async function VenturePage({ params }: PageProps<"/ventures/[slug]">) {
  const { slug } = await params;
  const venture = getVenture(slug);
  if (!venture) notFound();
  return (
    <>
      <JsonLd data={organizationSchema(venture)} />
      <VentureDetail venture={venture} related={ventures.filter((v) => v.slug !== venture.slug)} />
      <ContactPanel />
    </>
  );
}
