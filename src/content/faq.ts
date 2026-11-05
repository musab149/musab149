/**
 * faq.ts — answered only from confirmed facts. All answers are drafted copy
 * and listed in CONTENT-TO-CONFIRM.md for Ahmed's review.
 */

export type FaqItem = { q: string; a: string };

export const faq: FaqItem[] = [
  {
    q: "What kind of AI work do you take on?",
    a: "AI agents that handle multi-step tasks across tools and data, retrieval systems over private documents, LLM fine-tuning and evaluation, and workflow automation with n8n. Through Pixelpk Technologies, my team also builds the web and mobile software around them.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes. I work with founders and businesses worldwide, from Lahore, Pakistan.",
  },
  {
    q: "How does a project usually start?",
    a: "With the problem, not the technology. Send an enquiry with a few lines about what you want to build and why. If there's a fit, the first step is a conversation to agree on the smallest version that proves value.",
  },
  {
    q: "Are you open to partnerships or investment conversations?",
    a: "Yes. Choose Partnership or Investment in the enquiry form and share some context about what you have in mind.",
  },
  {
    q: "Where are you based, and what time zone?",
    a: "Lahore, Pakistan, on Pakistan Standard Time (PKT, UTC+5). The clock at the bottom of every page shows my current local time.",
  },
  {
    q: "What is Pakistan Law Bot?",
    a: "An AI-powered legal platform for Pakistani law that I lead. It offers AI legal Q&A, case-law and statute search, document analysis, legal drafting, a verified-lawyer marketplace, a WhatsApp bot, Android and iOS apps, and an MCP server that lets Claude query Pakistani law.",
  },
];
