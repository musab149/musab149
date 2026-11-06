/**
 * ai.ts — the AI lab (homepage) and the /ai page.
 * The "flows" are real products from the Pixelpk portfolio; their steps come
 * from each case study's "How it works" section (src/content/work.ts).
 */

export const principles = [
  {
    title: "Grounded in sources",
    body: "Answers point to the judgment, page or document they came from, so people can check them.",
  },
  {
    title: "Built into the workflow",
    body: "Agents work where the team already works: the website, WhatsApp, the CRM, or another AI assistant over MCP.",
  },
  {
    title: "People stay in the loop",
    body: "Drafts go for review and conversations hand over to a person when it matters.",
  },
] as const;

export const capabilities = [
  {
    title: "AI agents",
    body: "Agents that handle multi-step tasks across tools and data.",
    detail: "They plan a task, call the right tools and APIs, and hand off to a person when judgement is needed.",
  },
  {
    title: "Retrieval & knowledge",
    body: "RAG over private documents, with grounded, cited answers.",
    detail: "Answers come from your own documents and data, with the sources shown.",
  },
  {
    title: "LLM fine-tuning & evaluation",
    body: "Adapting models to a domain and measuring them honestly.",
    detail: "Fine-tuning only where it beats good prompting and retrieval, with evaluation sets that reflect real use.",
  },
  {
    title: "Workflow automation",
    body: "n8n and API integrations that remove repetitive work.",
    detail: "Automations that move data between the tools a team already uses, with logging and clear failure alerts.",
  },
] as const;

/**
 * Terminal demo — ILLUSTRATIVE ONLY: a generic interaction with no real case
 * names, citations, statistics or client data.
 */
export const terminal = {
  label: "Illustrative",
  title: "~/agent",
  lines: [
    { kind: "input", text: 'ask "What does our contract template say about notice periods?"' },
    { kind: "step", text: "retrieve", note: "3 passages · 2 documents", ok: true },
    { kind: "step", text: "reason", note: "grounded answer drafted", ok: true },
    { kind: "step", text: "cite", note: "[1] contract template · [2] HR handbook", ok: true },
    { kind: "step", text: "review", note: "sent to a person", ok: false },
  ],
  caption: "A generic run, for illustration. The flows below are real products.",
} as const;

/** Real AI products from the portfolio, shown as flows in the AI lab. */
export const flows = [
  { slug: "pakistan-lawbot", tab: "Legal research" },
  { slug: "aivastark", tab: "Customer agent" },
  { slug: "khurshid-answers", tab: "Research assistant" },
  { slug: "ask-maududi", tab: "Urdu knowledge" },
] as const;

/** Toolbox: the stack Pixelpk lists on pixelpk.com, plus n8n and MCP from the brief. */
export const toolbox = [
  { group: "AI & ML", items: ["OpenAI", "Anthropic", "LangChain", "LLaMA", "TensorFlow", "RAG", "MCP", "n8n"] },
  { group: "Web & API", items: ["React", "Next.js", "Vue.js", "Node.js", "Laravel", "TypeScript", "GraphQL", "MongoDB"] },
  { group: "Mobile", items: ["Flutter", "FlutterFlow", "React Native"] },
  { group: "Cloud", items: ["AWS", "AWS Lambda", "Azure", "Docker"] },
  { group: "Microsoft", items: [".NET", "Dynamics 365", "Power Apps"] },
] as const;

/** /ai page — how an engagement works. Drafted copy (see CONTENT-TO-CONFIRM.md). */
export const engagement = [
  { title: "Discovery call", body: "We talk through the workflow, the data you have and what a good answer looks like." },
  { title: "Proof of value", body: "A small, working slice on real data, with an honest read of where it works and where it doesn't." },
  { title: "Build & integrate", body: "The agent, retrieval or automation is built into the tools your team already uses." },
  { title: "Run & improve", body: "Monitoring, feedback loops and regular evaluation, so quality goes up after launch." },
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
    q: "Can AI connect to our existing tools?",
    a: "Yes. Workflow automation with n8n and direct API integrations connect agents to the systems a team already uses. MCP servers, like the one Pakistan LawBot provides, are another route.",
  },
] as const;
