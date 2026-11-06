import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { Ticker } from "@/components/home/Ticker";
import { Figures } from "@/components/home/Figures";
import { RolesSection } from "@/components/home/RolesSection";
import { VenturesSection } from "@/components/home/VenturesSection";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesSection } from "@/components/home/ServicesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { AiLabSection } from "@/components/home/AiLabSection";
import { AboutSection } from "@/components/home/AboutSection";
import { CultureSection } from "@/components/home/CultureSection";
import { ClientsSection } from "@/components/home/ClientsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ContactPanel } from "@/components/home/ContactPanel";
import { site, flags } from "@/content/site";
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
 * Homepage sequence. Section indices are generated from this list, so they
 * stay continuous if a section is switched off.
 */
const sections = [
  { key: "roles", visible: true },
  { key: "ventures", visible: ventures.length > 0 },
  { key: "work", visible: true },
  { key: "services", visible: true },
  { key: "process", visible: true },
  { key: "ai", visible: true },
  { key: "about", visible: true },
  { key: "culture", visible: true },
  { key: "clients", visible: flags.testimonials },
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
      <Hero />
      <Ticker />
      <Figures />
      <RolesSection index={idx("roles")} />
      {show("ventures") && <VenturesSection index={idx("ventures")} />}
      <SelectedWork index={idx("work")} />
      <ServicesSection index={idx("services")} />
      <ProcessSection index={idx("process")} />
      <AiLabSection index={idx("ai")} />
      <AboutSection index={idx("about")} />
      <CultureSection index={idx("culture")} />
      {show("clients") && <ClientsSection index={idx("clients")} />}
      <FaqSection index={idx("faq")} />
      <ContactPanel index={idx("contact")} />
    </>
  );
}
