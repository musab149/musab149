/**
 * ai.ts — the AI lab section (homepage) and the /ai page.
 */

export const capabilities = [
  {
    title: "AI agents",
    body: "Agents that handle multi-step tasks across tools and data.",
    detail:
      "Agents plan a task, call the right tools and APIs, and hand off to a person when judgement is needed.",
  },
  {
    title: "Retrieval & knowledge systems",
    body: "RAG over private documents, with grounded, cited answers.",
    detail:
      "Answers come from your own documents and data, with the sources shown, so people can check them.",
  },
  {
    title: "LLM fine-tuning & evaluation",
    body: "Adapting models to a domain and measuring them honestly.",
    detail:
      "Fine-tuning only where it beats good prompting and retrieval, with evaluation sets that reflect real use.",
  },
  {
    title: "Workflow automation",
    body: "n8n and API integrations that remove repetitive work.",
    detail:
      "Automations that move data between the tools a team already uses, with logging and clear failure alerts.",
  },
] as const;

export const pipeline = [
  { id: "ask", label: "Ask", body: "A person or system asks a question or sets a task." },
  { id: "retrieve", label: "Retrieve", body: "Relevant documents and data are fetched from trusted sources." },
  { id: "reason", label: "Reason", body: "The model works through the problem using what was retrieved." },
  { id: "act", label: "Act", body: "The agent drafts, calls tools or updates systems." },
  { id: "review", label: "Review", body: "A person checks the result before it counts." },
] as const;

/**
 * Terminal demo — ILLUSTRATIVE ONLY. Generic interaction; no real case names,
 * citations, statistics or client data. If Ahmed supplies a real Pakistan Law
 * Bot screen recording, set `terminalVideo` below and the video replaces this.
 */
export const terminal = {
  label: "Illustrative demo",
  title: "agent — knowledge-base",
  lines: [
    { kind: "input", text: 'ask "Summarise the notice period rules in our employment contract template."' },
    { kind: "muted", text: "searching sources…" },
    { kind: "accent", text: "3 relevant documents found" },
    { kind: "muted", text: "  · employment-contract-template.docx" },
    { kind: "muted", text: "  · hr-handbook.pdf" },
    { kind: "muted", text: "  · policy-updates.md" },
    { kind: "muted", text: "reasoning over retrieved passages…" },
    {
      kind: "output",
      text: "The template sets the notice period in its termination clause. The HR handbook explains how it applies during probation. [1] [2]",
    },
    { kind: "accent", text: "→ draft ready · sent for human review" },
  ],
} as const;

export const terminalVideo: { src: string; poster: string } | null = null;

export const flagship = {
  text: "Pakistan Law Bot is my AI product in production.",
  href: "/ventures/pakistan-law-bot",
  cta: "See the flagship",
} as const;

/** Toolbox: only tools Ahmed has confirmed. Add more as he confirms them. */
export const toolbox = ["n8n", "MCP", "Flutter"] as const;

/** /ai page — how an engagement works. Drafted copy, see CONTENT-TO-CONFIRM.md. */
export const engagement = [
  {
    title: "Discovery call",
    body: "We talk through the workflow, the data you have and what a good answer looks like.",
  },
  {
    title: "Proof of value",
    body: "A small, working slice on real data, with an honest evaluation of where it works and where it doesn't.",
  },
  {
    title: "Build & integrate",
    body: "The agent, retrieval or automation is built into the tools your team already uses.",
  },
  {
    title: "Run & improve",
    body: "Monitoring, feedback loops and regular evaluation, so quality goes up after launch, not down.",
  },
] as const;

export const aiFaq = [
  {
    q: "Do you build chatbots?",
    a: "Only when a conversation is the right interface. Most of the value is in systems that retrieve, reason and act inside a workflow, with a person reviewing what matters.",
  },
  {
    q: "Do I need to fine-tune a model?",
    a: "Often not. Good retrieval and prompting solve many problems. Fine-tuning is worth it when a domain needs a specific style, format or vocabulary that evaluation shows retrieval alone can't reach.",
  },
  {
    q: "How do you keep answers accurate?",
    a: "By grounding them in your own sources, showing citations, measuring quality against real examples, and keeping people in the loop for decisions that matter.",
  },
  {
    q: "Can you connect AI to our existing tools?",
    a: "Yes. Workflow automation with n8n and direct API integrations connect agents to the systems a team already uses. MCP servers, like the one Pakistan Law Bot provides for Claude, are another route.",
  },
] as const;
