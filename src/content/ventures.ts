/**
 * ventures.ts — the companies and products Ahmed is building.
 *
 * Logos and screenshots come from the ventures' own websites; figures are as
 * published on pixelpk.com (home page and the Pakistan LawBot case study).
 * To add a venture: copy an object, give it a unique slug, set published: true.
 */

import { flags } from "./site";

export type Shot = { src: string; width: number; height: number; alt: string };
export type Figure = { value: string; label: string };

export type Venture = {
  slug: string;
  published: boolean;
  name: string;
  logo: { src: string; width: number; height: number; onDark?: string };
  url: string;
  domain: string;
  /** Ahmed's role, as shown on the card. */
  role: string;
  category: string;
  /** One line in the serif italic under the name. */
  tagline: string;
  description: string;
  status: string;
  /** Brand tint for the card glow. */
  tint: string;
  figures: Figure[];
  capabilities: string[];
  desktop: Shot;
  mobile: Shot;
  /** Detail page */
  mission: string;
  overview: string;
  problem: string;
  approach: string;
  ahmedsRole: string;
  technology: string[];
  /** Related case study on /work, if any. */
  caseStudy?: string;
};

const allVentures: Venture[] = [
  {
    slug: "pixelpk-technologies",
    published: true,
    name: "Pixelpk Technologies",
    logo: { src: "/logos/pixelpk-ink.png", width: 656, height: 181, onDark: "/logos/pixelpk-white.png" },
    url: "https://pixelpk.com/",
    domain: "pixelpk.com",
    role: "Founder",
    category: "AI & software company",
    tagline: "Let's grow digitally.",
    description:
      "An AI and software development company headquartered in Lahore: AI agents and LLM products, mobile apps, SaaS platforms, cloud and Microsoft solutions, for start-ups and enterprises in five countries.",
    status: "Live · Lahore HQ",
    tint: "#4C1D95",
    figures: [
      { value: "50+", label: "team members" },
      { value: "1,000+", label: "projects shipped" },
      { value: "5+", label: "countries served" },
      { value: "16", label: "published case studies" },
    ],
    capabilities: ["Agentic AI & ML", "Mobile apps", "SaaS & software", "Cloud", "Microsoft", "Digital marketing"],
    desktop: {
      src: "/images/ventures/pixelpk-site.webp",
      width: 1440,
      height: 900,
      alt: "The pixelpk.com home page: “Let’s Grow Digitally” on a deep blue-to-magenta gradient",
    },
    mobile: {
      src: "/images/ventures/pixelpk-site-mobile.webp",
      width: 780,
      height: 1688,
      alt: "The pixelpk.com home page on a phone",
    },
    mission: "An AI-first engineering company that builds the agents, software and teams growing businesses need.",
    overview:
      "Pixelpk Technologies is an AI and software development company headquartered in Lahore, Pakistan. Its services cover agentic AI and machine learning, mobile and software development, Microsoft technologies, cloud and digital transformation, QA, UI/UX design, digital marketing and business websites, delivered as an extended team, a managed dedicated team or a custom-built solution.",
    problem:
      "Most growing businesses want AI that does real work, but few have the team to design it, build it into their products and keep it running.",
    approach:
      "Pair AI engineering with solid software delivery: agents, retrieval and automation built into the products and workflows a business already uses, by a team that can also own the web and mobile surfaces around them.",
    ahmedsRole:
      "I'm one of Pixelpk's founders. I lead marketing and growth, from strategy and brand to the campaigns and content that bring clients to the company, and I work with clients and partners on what to build next.",
    technology: [
      "OpenAI · LangChain · LLaMA",
      "React · Next.js · Node.js · Laravel",
      "Flutter · FlutterFlow",
      "AWS · Azure · Docker",
      ".NET · Dynamics 365 · Power Apps",
      "Playwright · Cypress",
    ],
  },
  {
    slug: "pakistan-lawbot",
    published: true,
    name: "Pakistan LawBot",
    logo: { src: "/logos/pakistan-lawbot.png", width: 1007, height: 251, onDark: "/logos/pakistan-lawbot-white.png" },
    url: "https://pakistanlawbot.com/",
    domain: "pakistanlawbot.com",
    // Confirmed: Ahmed leads Pakistan LawBot. Exact title is pending (CONTENT-TO-CONFIRM.md).
    role: "Lead",
    category: "Legal AI · Pixelpk's own product",
    tagline: "Legal help, in English and Urdu.",
    description:
      "An AI legal assistant for Pakistani law: research with cited judgments, documents drafted with AI, contracts checked for risk, and a marketplace of verified lawyers.",
    status: "Live · Web, WhatsApp & mobile",
    tint: "#166534",
    figures: [
      { value: "600+", label: "API endpoints" },
      { value: "26", label: "practice areas" },
      { value: "13", label: "AI-drafted document types" },
      { value: "20", label: "MCP tools for AI assistants" },
    ],
    capabilities: ["Legal research", "AI drafting", "Document analysis", "Lawyer marketplace", "WhatsApp bot", "MCP server"],
    desktop: {
      src: "/images/ventures/lawbot-site.webp",
      width: 1440,
      height: 900,
      alt: "The pakistanlawbot.com home page: Pakistan’s first lawyer marketplace and AI-powered legal assistance",
    },
    mobile: {
      src: "/images/ventures/lawbot-site-mobile.webp",
      width: 780,
      height: 1688,
      alt: "The pakistanlawbot.com home page on a phone",
    },
    mission: "Make justice accessible for every Pakistani: research, drafting and a verified lawyer, in plain English or Urdu.",
    overview:
      "Pakistan LawBot is an AI-powered legal platform for Pakistani law. It brings AI legal Q&A, case-law and statute search, document analysis and legal drafting together with a verified-lawyer marketplace, a WhatsApp bot, Android and iOS apps, and an MCP server that lets AI assistants such as Claude query Pakistani law.",
    problem:
      "Pakistani legal information is spread across judgments, statutes and amendments. It is slow to search for lawyers and hard to approach for everyone else.",
    approach:
      "Ground the AI in Pakistani law: retrieve the relevant judgments and statutes first, cite them by default, mark drafts for review by an advocate, and reach people where they are, on the web, on WhatsApp, on mobile and inside other AI assistants.",
    ahmedsRole:
      "I lead Pakistan LawBot: product direction, the AI and retrieval approach, and the team that builds and ships it.",
    technology: [
      "React · TypeScript · Vite",
      "Node.js · Express",
      "MongoDB (data, vector & keyword search)",
      "Python AI services",
      "Anthropic · OpenAI · Gemini",
      "MCP server · WhatsApp · Stripe",
    ],
    caseStudy: "pakistan-lawbot",
  },
];

function isComplete(v: Venture) {
  return Boolean(v.published && v.url && v.role && v.tagline && v.overview);
}

export const ventures: Venture[] = allVentures.filter(isComplete);

export function getVenture(slug: string) {
  return ventures.find((v) => v.slug === slug);
}

/** Aivastark is shown as a venture only when flags.aivastark is on. */
export const showAivastark = flags.aivastark;
