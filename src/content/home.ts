/**
 * home.ts — all homepage copy. Edit text here; components never hard-code copy.
 *
 * Emphasis: wrap ONE word or phrase per heading in *asterisks* to set it in the
 * Instrument Serif italic, e.g. "Companies and products *I'm building*."
 */

export const hero = {
  label: "Introduction",
  eyebrow: "Founder & CEO · AI specialist",
  headline: "I build *AI products* and the companies that ship them.",
  description:
    "I'm Ahmed Musab, founder and CEO of Pixelpk Technologies and the lead behind Pakistan Law Bot. I design and ship AI agents, LLM-powered products and the software around them, for founders and businesses worldwide.",
  primaryCta: { label: "Explore my ventures", href: "#ventures" },
  secondaryCta: { label: "Let's connect", href: "/contact" },
  now: "Now: building Pakistan Law Bot and AI agents at Pixelpk.",
  portrait: {
    src: "/images/ahmed-musab-portrait.jpg",
    width: 1028,
    height: 1284,
    alt: "Ahmed Musab in a light grey suit, smiling and gesturing as he speaks from a sofa at a Pixelpk company event",
  },
  chips: ["CEO · Pixelpk Technologies", "Lead · Pakistan Law Bot"],
} as const;

export const ticker = [
  "AI agents",
  "LLM fine-tuning",
  "RAG systems",
  "Workflow automation",
  "Legal AI",
  "SaaS",
  "MVPs",
  "Web & mobile",
  "Product strategy",
  "Engineering leadership",
] as const;

export const about = {
  label: "About",
  title: "Engineer by background. *Entrepreneur* by ambition.",
  body: "My work sits at the intersection of software engineering, business strategy and product development. I enjoy turning complex challenges into useful digital products, and helping teams bring those products to life.",
  rolesTitle: "Four roles. *One* founder.",
  roles: [
    {
      title: "Founder",
      body: "Building Pixelpk Technologies into an AI-first software company.",
      detail: "Company direction, partnerships and the long game.",
    },
    {
      title: "AI specialist",
      body: "Designing agents, retrieval systems and LLM workflows that do real work.",
      detail: "Grounded answers, measured honestly, people in the loop.",
    },
    {
      title: "Product builder",
      body: "Taking products like Pakistan Law Bot from idea to launch and beyond.",
      detail: "Scope, ship, learn, repeat.",
    },
    {
      title: "Team lead",
      body: "Leading engineering teams, technical direction and delivery.",
      detail: "Clear priorities and short feedback loops.",
    },
  ],
  swipeHint: "Swipe for all four",
  link: { label: "Read my story", href: "/about" },
} as const;

export const venturesSection = {
  label: "Ventures",
  title: "Companies and products *I'm building*.",
  link: { label: "All ventures", href: "/ventures" },
} as const;

export const workSection = {
  label: "Work",
  title: "Selected work from *Pixelpk*.",
  intro: "Products my team and I have designed, built and shipped for clients.",
  link: { label: "View all work", href: "/work" },
  /** Shown while src/content/work.ts has no published projects. */
  empty: {
    title: "Case studies are being prepared for this site.",
    body: "Until they're published here, Pixelpk's own website is the place to see the team's work.",
    cta: { label: "Visit pixelpk.com", href: "https://pixelpk.com/" },
  },
} as const;

export const aiLab = {
  label: "AI lab",
  title: "Where I put *AI* to work.",
  intro:
    "Not chatbots for the sake of it: systems that retrieve, reason and act, with people kept in the loop.",
  link: { label: "My AI practice", href: "/ai" },
} as const;

export const expertiseSection = {
  label: "Expertise",
  title: "From idea to *execution*.",
  intro: "What my teams and I bring to a product, from the first sketch to the release after next.",
} as const;

export const processSection = {
  label: "Process",
  title: "How I *work*.",
  steps: [
    {
      title: "Understand the problem",
      body: "Start with the people, the workflow and the cost of the problem, before any solution.",
    },
    {
      title: "Shape the product",
      body: "Agree on the smallest version that proves value, and what we will measure.",
    },
    {
      title: "Build in short cycles",
      body: "Ship working software every week or two, and review it together.",
    },
    {
      title: "Launch",
      body: "Release to real users with monitoring, support and a clear rollback plan.",
    },
    {
      title: "Measure & improve",
      body: "Use feedback and data to decide what to build, fix or remove next.",
    },
  ],
} as const;

export const cultureSection = {
  label: "Team & culture",
  title: "The *team* behind the work.",
  intro:
    "Products are built by people. This is the Pixelpk team, at work, at the table and on the road.",
  dragHint: "Drag or scroll",
} as const;

export const philosophy = {
  label: "Philosophy",
  title: "Build with purpose. Execute with *clarity*.",
  statement:
    "I believe great technology begins with understanding the problem, building the right solution, and continuously improving it through feedback and execution.",
} as const;

export const insightsSection = {
  label: "Insights",
  title: "Ideas, lessons and *perspectives*.",
  empty:
    "Writing is on the way: notes on AI products, MVPs and building software companies.",
  link: { label: "All insights", href: "/insights" },
} as const;

export const faqSection = {
  label: "FAQ",
  title: "Quick *answers*.",
} as const;

export const contactCta = {
  label: "Contact",
  title: "Have an ambitious idea? Let's *build* it.",
  body: "I'm open to meaningful conversations about AI, digital products and business collaboration.",
  primary: { label: "Send an enquiry", href: "/contact" },
  linkedin: "Connect on LinkedIn",
  booking: "Book a call",
} as const;
