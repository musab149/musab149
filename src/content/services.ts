/**
 * services.ts — the nine services listed on pixelpk.com ("What we do"), in its wording,
 * plus Pixelpk's three engagement models. Each links to the matching page on
 * pixelpk.com.
 */

export const services = [
  {
    title: "Agentic AI & ML",
    body: "AI agents that take action, voice and multimodal AI, and predictive ML, running in production.",
    tags: ["AI agents", "MCP", "Voice AI", "RAG"],
    href: "https://pixelpk.com/ai-solutions/",
    featured: true,
  },
  {
    title: "Mobile app development",
    body: "Intuitive, high-performance cross-platform apps that reach your users everywhere.",
    href: "https://pixelpk.com/mobile-development/",
  },
  {
    title: "Software development",
    body: "SaaS platforms, MVPs and custom software, from concept to deployment.",
    href: "https://pixelpk.com/software-development/",
  },
  {
    title: "Microsoft technologies",
    body: "Power BI, Power Platform and Azure: end-to-end services that put Microsoft to work for you.",
    href: "https://pixelpk.com/contact-us/",
  },
  {
    title: "Cloud & digital transformation",
    body: "Cloud migration and modern infrastructure that scales with your business.",
    href: "https://pixelpk.com/data-engineering/",
  },
  {
    title: "QA testing & automation",
    body: "Rigorous testing with Playwright and Cypress for flawless releases.",
    href: "https://pixelpk.com/software-development/",
  },
  {
    title: "UI/UX design",
    body: "User-centred design that makes your product intuitive and engaging.",
    href: "https://pixelpk.com/graphic-design/",
  },
  {
    title: "Digital marketing & ads",
    body: "Targeted strategies, creative campaigns and ads that maximise brand visibility.",
    href: "https://pixelpk.com/digital-marketing/",
  },
  {
    title: "Business websites & landing pages",
    body: "SEO-friendly websites and landing pages that convert.",
    href: "https://pixelpk.com/website-development/",
  },
] as const;

/** Pixelpk's engagement models (pixelpk.com, "Our engagement model"). */
export const engagementModels = [
  {
    title: "Extended team",
    body: "Engineers join your team, your stand-ups and your tools, adding skills and speed without the hiring time.",
    href: "https://pixelpk.com/staff-augmentation/",
  },
  {
    title: "Managed dedicated team",
    body: "A complete team, managed by a Pixelpk lead who runs delivery while you work with the team directly.",
    href: "https://pixelpk.com/staff-augmentation/",
  },
  {
    title: "Custom solution development",
    body: "Tell us the outcome. We design, build and launch the whole product, with a clear scope and plan.",
    href: "https://pixelpk.com/software-development/",
  },
] as const;
