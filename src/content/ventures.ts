/**
 * ventures.ts — companies and products Ahmed is building.
 *
 * To add a venture: append an object to `allVentures` (copy an existing one),
 * give it a unique `slug`, and set `published: true`. Its card appears on the
 * homepage and /ventures, and /ventures/<slug> is generated automatically.
 *
 * Facts only: anything not confirmed stays empty and is hidden by the UI.
 */

import { flags } from "./site";

export type VentureImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
};

export type Milestone = { date: string; title: string; body?: string };

export type Venture = {
  slug: string;
  published: boolean;
  name: string;
  /** Short wordmark split for the typographic logo: [main, accent]. */
  wordmark: [string, string];
  /** Official logo file in /public/logos. Leave empty to use the typographic wordmark. */
  logo?: { src: string; width: number; height: number };
  url: string;
  domain: string;
  /** Ahmed's role, as shown on the card. */
  role: string;
  category: string;
  tagline: string;
  status: "Live" | "In development";
  capabilities: string[];
  /** Detail page */
  mission: string;
  overview: string;
  problem: string;
  approach: string;
  ahmedsRole: string;
  technology: string[];
  surfaces?: string[];
  milestones: Milestone[];
  /** Real product screenshots (from the venture's own site). Empty = use `photo`. */
  screenshots: VentureImage[];
  /** Real photograph used in the device frame until screenshots exist. */
  photo: VentureImage;
};

const allVentures: Venture[] = [
  {
    slug: "pixelpk-technologies",
    published: true,
    name: "Pixelpk Technologies",
    wordmark: ["Pixel", "pk"],
    url: "https://pixelpk.com/",
    domain: "pixelpk.com",
    role: "Founder & CEO",
    category: "AI-first software company",
    tagline: "AI agents, custom software and engineering teams for growing businesses.",
    status: "Live",
    capabilities: [
      "Custom AI agents",
      "LLM fine-tuning",
      "Workflow automation",
      "Web & mobile",
      "Staff augmentation",
    ],
    mission:
      "An AI-first engineering company that builds the agents, software and teams growing businesses need.",
    overview:
      "Pixelpk Technologies is a software company positioned as an AI-first engineering company. Its services cover custom AI agents, LLM fine-tuning, workflow automation with n8n, custom software, web and mobile applications, and staff augmentation.",
    problem:
      "Most growing businesses want AI that does real work, but few have the engineering team to design it, build it into their products and keep it running.",
    approach:
      "Pair AI engineering with solid software delivery. Agents, retrieval and automation are built into the products and workflows a business already uses, by a team that can also own the web and mobile surfaces around them.",
    ahmedsRole:
      "Founder and CEO. I set the company's direction, lead its technical strategy and work with clients and partners on what to build next.",
    technology: [
      "Custom AI agents",
      "LLM fine-tuning",
      "n8n workflow automation",
      "Custom software",
      "Web applications",
      "Mobile applications",
    ],
    milestones: [],
    screenshots: [],
    photo: {
      src: "/images/culture-annual-lunch-group.jpg",
      width: 1800,
      height: 1092,
      alt: "The Pixelpk team gathered for a group photo in front of the company backdrop at its annual lunch",
      caption: "The Pixelpk team at the annual lunch",
    },
  },
  {
    slug: "pakistan-law-bot",
    published: true,
    name: "Pakistan Law Bot",
    wordmark: ["Pakistan Law", "Bot"],
    url: "https://pakistanlawbot.com/",
    domain: "pakistanlawbot.com",
    // Confirmed: Ahmed leads Pakistan Law Bot. Exact title (Founder / Co-founder /
    // Product Lead) is pending — see CONTENT-TO-CONFIRM.md.
    role: "Lead",
    category: "Legal AI platform",
    tagline:
      "AI legal research for Pakistan: judgments, statutes and smart guidance in one place.",
    status: "Live",
    capabilities: [
      "Legal Q&A",
      "Case-law search",
      "Document analysis",
      "Drafting",
      "Lawyer marketplace",
      "WhatsApp bot",
      "MCP server",
    ],
    mission: "Make Pakistani law searchable, understandable and actionable with AI.",
    overview:
      "Pakistan Law Bot is an AI-powered legal platform for Pakistani law. It brings AI legal Q&A, case-law and statute search, document analysis and legal drafting together with a verified-lawyer marketplace, a WhatsApp bot, Android and iOS apps, and an MCP server that lets Claude query Pakistani law.",
    problem:
      "Pakistani legal information is spread across judgments, statutes and amendments. It is slow to search for lawyers and hard to approach for everyone else.",
    approach:
      "Ground the AI in Pakistani law. Retrieve the relevant judgments and statutes first, then help people ask questions, analyse documents, draft, and reach a verified lawyer when they need one, on the web, on WhatsApp, on mobile and inside Claude.",
    ahmedsRole:
      "I lead Pakistan Law Bot: product direction, the AI and retrieval approach, and the team that builds and ships it.",
    technology: [
      "Retrieval over case law and statutes",
      "LLM-powered Q&A and drafting",
      "Document analysis",
      "MCP server for Claude",
      "WhatsApp bot",
      "Android & iOS apps",
    ],
    surfaces: ["Web", "WhatsApp", "Android", "iOS", "MCP (Claude)"],
    milestones: [],
    screenshots: [],
    photo: {
      src: "/images/event-pakistan-law-bot.jpg",
      width: 1593,
      height: 1800,
      alt: "Ahmed Musab standing with four colleagues in suits in front of a Pakistan Law Bot banner at a hotel event",
      caption: "At a Pakistan Law Bot event",
    },
  },
  {
    // Third venture — only shown when flags.aivastark is true AND the copy below is filled in.
    slug: "aivastark",
    published: flags.aivastark,
    name: "Aivastark",
    wordmark: ["Aiva", "stark"],
    url: "",
    domain: "",
    role: "",
    category: "",
    tagline: "",
    status: "Live",
    capabilities: [],
    mission: "",
    overview: "",
    problem: "",
    approach: "",
    ahmedsRole: "",
    technology: [],
    milestones: [],
    screenshots: [],
    photo: { src: "/images/ahmed-musab-headshot.jpg", width: 957, height: 957, alt: "" },
  },
];

function isComplete(v: Venture) {
  return Boolean(v.published && v.url && v.role && v.tagline && v.overview);
}

export const ventures: Venture[] = allVentures.filter(isComplete);

export function getVenture(slug: string) {
  return ventures.find((v) => v.slug === slug);
}
