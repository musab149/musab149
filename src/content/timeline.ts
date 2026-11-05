/**
 * timeline.ts — verified career milestones for the About page.
 *
 * Empty on purpose: no dates are published until Ahmed supplies them.
 * The timeline block is hidden while this array is empty.
 *
 * Example: { date: "2018", title: "Founded Pixelpk Technologies", body: "…" }
 */

export type TimelineItem = { date: string; title: string; body?: string };

export const timeline: TimelineItem[] = [];

/** About page story, in three chapters. Uses confirmed facts only. */
export const story = {
  title: "From *engineer* to founder to AI builder.",
  intro: "Engineer by background. Entrepreneur by ambition.",
  chapters: [
    {
      kicker: "Engineer",
      title: "It started with software.",
      body: [
        "I'm a software engineer by background. Engineering taught me to break big problems into small, shippable pieces, and to judge work by whether it actually runs.",
        "That habit still shapes how I lead: understand the problem, build the right thing, and keep improving it.",
      ],
    },
    {
      kicker: "Founder",
      title: "Then I built a company around it.",
      body: [
        "I founded Pixelpk Technologies and lead it as CEO. Today it is an AI-first engineering company.",
        "The team builds custom AI agents, fine-tunes LLMs, automates workflows with n8n, and delivers custom software, web and mobile applications, and staff augmentation for growing businesses.",
      ],
    },
    {
      kicker: "AI builder",
      title: "Now I ship AI products of my own.",
      body: [
        "I lead Pakistan Law Bot, an AI-powered legal platform for Pakistani law.",
        "It brings legal Q&A, case-law and statute search, document analysis and drafting together with a verified-lawyer marketplace, and reaches people on the web, on WhatsApp, on Android and iOS, and inside Claude through its MCP server.",
      ],
    },
  ],
} as const;
