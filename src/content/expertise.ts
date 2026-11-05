/**
 * expertise.ts — capabilities of Ahmed and his teams. No skill bars,
 * percentages or certifications by design.
 * `icon` is a Lucide icon key mapped in components/home/ExpertiseGrid.tsx.
 */

export type ExpertiseGroup = {
  icon: "code" | "sparkles" | "compass" | "users";
  title: string;
  description: string;
  items: string[];
};

export const expertise: ExpertiseGroup[] = [
  {
    icon: "code",
    title: "Product engineering",
    description: "Software that is built to last past launch day.",
    items: ["Custom software", "Web applications", "Mobile applications", "SaaS products"],
  },
  {
    icon: "sparkles",
    title: "AI & intelligent systems",
    description: "AI that retrieves, reasons and acts inside real workflows.",
    items: ["AI agents", "Retrieval-based applications", "LLM fine-tuning", "Workflow automation"],
  },
  {
    icon: "compass",
    title: "Product strategy",
    description: "Deciding what to build first, and what not to build.",
    items: ["MVP development", "Product discovery", "Technical roadmaps", "Digital product planning"],
  },
  {
    icon: "users",
    title: "Technology leadership",
    description: "Teams and processes that keep shipping.",
    items: ["Engineering teams", "Technical direction", "Delivery processes", "Product execution"],
  },
];
