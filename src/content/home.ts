/**
 * home.ts — all homepage copy. Components never hard-code copy.
 *
 * Headings: wrap ONE word in *asterisks* for the serif-italic accent, and use
 * "\n" for a deliberate line break, e.g. "Selected\n*work*."
 */

export const hero = {
  label: "Founder · AI specialist",
  sentence: "I build *AI products* and the companies that ship them.",
  bio: "Founder and CEO of Pixelpk Technologies, an AI-first software company in Lahore, and the lead behind Pakistan LawBot. I design and ship AI agents, LLM-powered products and the software around them, for founders and businesses worldwide.",
  primaryCta: { label: "See the work", href: "#work" },
  secondaryCta: { label: "Let's talk", href: "/contact" },
  now: "Building Pakistan LawBot and AI agents at Pixelpk.",
  card: {
    name: "Ahmed Musab",
    title: "Founder · Pixelpk Technologies",
    place: "Lahore, Pakistan",
    focus: "AI · Product · Growth",
  },
} as const;

export const ticker = [
  "AI agents",
  "RAG systems",
  "LLM fine-tuning",
  "n8n automation",
  "Legal AI",
  "Mobile apps",
  "SaaS platforms",
  "Product strategy",
  "Growth & marketing",
  "Engineering teams",
] as const;

export const roles = {
  label: "What I do",
  title: "Four roles.\n*One* founder.",
  intro:
    "Building a company means changing hats every hour. These are the four I wear most, and what each one looks like in the work.",
  meta: "Select a role",
  items: [
    {
      key: "founder",
      title: "Founder",
      line: "Building Pixelpk Technologies into an AI-first software company.",
      detail:
        "At Pixelpk I lead strategy, brand and growth: the positioning, partnerships and client relationships that keep a 50-person team building the right things.",
      chips: ["Strategy & brand", "Marketing & growth", "Partnerships", "Client relationships"],
      link: { label: "About Pixelpk", href: "/ventures/pixelpk-technologies" },
    },
    {
      key: "ai",
      title: "AI specialist",
      line: "Designing agents, retrieval systems and LLM workflows that do real work.",
      detail:
        "Agents that act inside real workflows, retrieval that cites its sources, and models measured honestly before they ship.",
      chips: ["AI agents", "RAG systems", "LLM fine-tuning", "n8n automation", "MCP"],
      link: { label: "Inside the AI lab", href: "/ai" },
    },
    {
      key: "product",
      title: "Product builder",
      line: "Taking products like Pakistan LawBot from idea to launch and beyond.",
      detail:
        "Find the smallest version that proves value, ship it in short cycles, then let real users decide what comes next.",
      chips: ["Product discovery", "MVPs", "Roadmaps", "Launch"],
      link: { label: "Pakistan LawBot", href: "/work/pakistan-lawbot" },
    },
    {
      key: "lead",
      title: "Team lead",
      line: "Leading engineering teams, technical direction and delivery.",
      detail:
        "Clear priorities, short feedback loops and a team that owns what it ships, from the first sprint to the release after next.",
      chips: ["Engineering teams", "Delivery", "Hiring", "Culture"],
      link: { label: "Life at Pixelpk", href: "/about#culture" },
    },
  ],
} as const;

export const venturesSection = {
  label: "Ventures",
  title: "Companies\nI'm *building*.",
  intro:
    "A software company that builds AI for growing businesses, and an AI product of our own, in production.",
  meta: "2 ventures · both live",
} as const;

export const workSection = {
  label: "Work",
  title: "Selected\n*work*.",
  intro:
    "Products the Pixelpk team and I have designed, built and shipped, for clients in Pakistan, the Gulf, the UK, the US and Australia.",
  meta: "16 case studies · 6 selected",
  link: { label: "All 16 case studies", href: "/work" },
} as const;

export const servicesSection = {
  label: "Services",
  title: "Work\n*with* me.",
  intro:
    "Through Pixelpk, one team covers the whole product: AI, software, cloud, design and the marketing that takes it to market.",
  meta: "9 services · delivered by Pixelpk",
} as const;

export const processSection = {
  label: "Process",
  title: "How I\n*work*.",
  intro: "Small teams, short loops. You see working software early, not a deck.",
  meta: "5 steps",
  steps: [
    { title: "Understand", body: "Start with the people, the workflow and the cost of the problem, before any solution." },
    { title: "Shape", body: "Agree on the smallest version that proves value, and what we will measure." },
    { title: "Build", body: "Ship working software every week or two, in short cycles, and review it together." },
    { title: "Launch", body: "Release to real users with monitoring, support and a clear rollback plan." },
    { title: "Improve", body: "Use feedback and data to decide what to build, fix or remove next." },
  ],
  toolboxLabel: "The Pixelpk stack",
} as const;

export const aiSection = {
  label: "AI lab",
  title: "AI, in\n*production*.",
  intro:
    "Not demos. Agents and assistants that answer from real sources, act inside real workflows and keep a person in the loop.",
  meta: "Agents · RAG · LLMs · MCP",
} as const;

export const aboutSection = {
  label: "About",
  title: "Hi, I'm\n*Ahmed*.",
} as const;

export const cultureSection = {
  label: "Culture",
  title: "Life at\n*Pixelpk*.",
  intro: "Products are built by people. This is the team, at work, at the table and on the road.",
  meta: "Drag or scroll",
} as const;

export const clientsSection = {
  label: "Clients",
  title: "What clients\n*say*.",
  intro: "Clients on working with the Pixelpk team, as published on pixelpk.com.",
} as const;

export const faqSection = {
  label: "FAQ",
  title: "Quick\n*answers*.",
  intro: "What people ask most, in a few lines each.",
} as const;

export const contactSection = {
  label: "Contact",
  title: "Let's build\nthe *next* one.",
  body: "Exploring an AI product, a software build or a partnership? Tell me what you're working on, and we'll find the fastest way to ship it.",
  primary: { label: "Send an enquiry", href: "/contact" },
  linkedin: "LinkedIn",
  booking: "Book a call",
} as const;
