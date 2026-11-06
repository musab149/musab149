/**
 * work.ts — the Pixelpk portfolio, imported from the 16 published case studies
 * on pixelpk.com/case-studies (text, figures and images as Pixelpk published
 * them; screenshots are Pixelpk's own). Generated once, then edited by hand is
 * fine — this is plain data.
 *
 * To add a project: append an object with the same shape, put its images in
 * /public/images/work/<slug>/, and set `featured: true` to show it on the
 * homepage (keep six featured for the 2×3 grid).
 */

export type WorkImage = { src: string; width: number; height: number; alt: string; kind: "hero" | "screen" | "mobile" };
export type Figure = { value: string; label: string };
export type Tag = "AI" | "Mobile" | "Web" | "SaaS" | "Education" | "Logistics" | "Health";

export type Project = {
  slug: string;
  order: number;
  featured: boolean;
  name: string;
  /** Short descriptor shown after the name, e.g. "legal AI". */
  kicker: string;
  /** "Industry · Region" line. */
  category: string;
  summary: string;
  tags: Tag[];
  /** Brand tint sampled from the case-study artwork, used for card glows. */
  tint: string;
  highlights: Figure[];
  facts: { client?: string; industry?: string; built?: string; tech?: string };
  stats: Figure[];
  /** Live domain, when the product is public. */
  live?: string | null;
  brief: { title: string; text: string };
  builtFor: string[];
  objectives: string[];
  built: { title: string; intro: string; features: { title: string; text: string }[] };
  how: { title: string; intro: string; steps: { title: string; text: string }[] };
  architecture: { title: string; text: string };
  challenges: { title: string; challenge: string; solution: string }[];
  stack: { name: string; role: string }[];
  images: WorkImage[];
  /** The full case study on pixelpk.com (canonical source). */
  source: string;
};

export const projects: Project[] = [
  {
    "slug": "pakistan-lawbot",
    "order": 1,
    "featured": false,
    "name": "Pakistan LawBot",
    "kicker": "legal AI",
    "category": "Legal tech · AI",
    "summary": "An AI legal assistant for Pakistani law — research with cited judgments, documents drafted with AI, contracts checked for risk, and a marketplace of verified lawyers. In English and Urdu.",
    "tags": [
      "AI",
      "Web"
    ],
    "tint": "#166534",
    "highlights": [
      {
        "value": "English & Urdu",
        "label": "answers & interface"
      },
      {
        "value": "13 document types",
        "label": "AI drafting"
      },
      {
        "value": "Verified",
        "label": "lawyer marketplace"
      }
    ],
    "facts": {
      "client": "Our own — Pakistan LawBot",
      "industry": "Legal technology",
      "built": "Web app, API, AI services & marketplace",
      "tech": "React · Node.js · MongoDB Atlas · Python"
    },
    "stats": [
      {
        "value": "600+",
        "label": "API endpoints"
      },
      {
        "value": "100+",
        "label": "app pages"
      },
      {
        "value": "26",
        "label": "practice areas"
      },
      {
        "value": "20",
        "label": "MCP tools for AI assistants"
      }
    ],
    "live": "pakistanlawbot.com",
    "brief": {
      "title": "The problem to solve",
      "text": "“No one should face a legal challenge alone because they can’t afford a lawyer or don’t know where to turn.” LawBot’s mission is to make justice accessible for every Pakistani — legal research, drafting and a verified lawyer, in plain English or Urdu."
    },
    "builtFor": [
      "The public",
      "Lawyers",
      "Law firms",
      "Law students"
    ],
    "objectives": [
      "Answer legal questions from Pakistani law, with sources",
      "Draft legal documents grounded in Pakistani statutes",
      "Explain any contract — summary, clauses and risks",
      "Connect people with verified lawyers and firms",
      "Work in English and Urdu, by text or voice"
    ],
    "built": {
      "title": "One platform, four audiences",
      "intro": "The public, lawyers, law firms and law students each get tools built for how they work — on one API and one legal database.",
      "features": [
        {
          "title": "Three chat modes",
          "text": "Citation-backed research, plain-English guidance, or guided intake for lawyers."
        },
        {
          "title": "Cited case law",
          "text": "Overviews written only from retrieved judgments, with inline [Case, Year] citations."
        },
        {
          "title": "Statutes & judgments",
          "text": "Supreme Court, High Court, Federal Shariat Court and tribunal judgments — filtered by court."
        },
        {
          "title": "Chat with one source",
          "text": "Ask questions about a single judgment or law."
        },
        {
          "title": "Urdu, right to left",
          "text": "Answers translated to Urdu in Nastaliq, and voice input in Urdu."
        },
        {
          "title": "Web search",
          "text": "Bring in fresh sources from the web when a question needs them."
        }
      ]
    },
    "how": {
      "title": "How a case-law answer is made",
      "intro": "From a question in English or Urdu to an answer you can check.",
      "steps": [
        {
          "title": "Ask in your words",
          "text": "Type or speak — in English, Urdu or Roman Urdu."
        },
        {
          "title": "Search the law",
          "text": "Keyword and vector search across judgments, filtered by court and outcome."
        },
        {
          "title": "Answer from sources",
          "text": "The model writes only from the judgments it retrieved, citing each one."
        },
        {
          "title": "Keep what’s cited",
          "text": "Judgments the answer doesn’t cite are dropped from the result."
        },
        {
          "title": "Take the next step",
          "text": "Translate to Urdu, draft a document or book a verified lawyer."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "A pre-rendered React app talks to a Node.js API; AI work runs in a separate Python service, and MongoDB Atlas holds both the app data and the legal search indexes."
    },
    "challenges": [
      {
        "title": "Answers you can check",
        "challenge": "A legal answer without sources is worse than no answer.",
        "solution": "Case-law overviews are written only from retrieved judgments, with inline citations — anything uncited is dropped."
      },
      {
        "title": "English and Urdu, one index",
        "challenge": "People ask in English, Urdu and Roman Urdu.",
        "solution": "Multilingual embeddings put English and Urdu in one vector space, running locally at no per-query cost."
      },
      {
        "title": "Drafting only what it should",
        "challenge": "An open text box will be asked for anything.",
        "solution": "A fast guard model refuses non-legal requests before Claude drafts, and every draft carries an advocate-review notice."
      },
      {
        "title": "Trust in the marketplace",
        "challenge": "People need to know a lawyer is real before they book.",
        "solution": "Bar-licence checks by the LawBot team, a WhatsApp code before booking, and reminders for every appointment."
      }
    ],
    "stack": [
      {
        "name": "React",
        "role": "Web app"
      },
      {
        "name": "TypeScript",
        "role": "Front end & API"
      },
      {
        "name": "Vite",
        "role": "Build & pre-rendering"
      },
      {
        "name": "Tailwind CSS",
        "role": "Styling"
      },
      {
        "name": "Node.js",
        "role": "API"
      },
      {
        "name": "Express",
        "role": "API framework"
      },
      {
        "name": "MongoDB",
        "role": "Data, vector & keyword search"
      },
      {
        "name": "Python",
        "role": "AI services"
      },
      {
        "name": "Anthropic",
        "role": "Legal drafting"
      },
      {
        "name": "OpenAI",
        "role": "Case-law overviews & matching"
      },
      {
        "name": "Google Gemini",
        "role": "Judgment headnotes"
      },
      {
        "name": "Hugging Face",
        "role": "Multilingual embeddings"
      },
      {
        "name": "Stripe",
        "role": "Payments"
      },
      {
        "name": "WhatsApp",
        "role": "Codes & reminders"
      },
      {
        "name": "Cloudflare",
        "role": "Edge & security"
      },
      {
        "name": "Sentry",
        "role": "Error tracking"
      }
    ],
    "images": [
      {
        "src": "/images/work/pakistan-lawbot/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Pakistan LawBot on desktop and mobile",
        "kind": "hero"
      },
      {
        "src": "/images/work/pakistan-lawbot/research.webp",
        "width": 1600,
        "height": 1000,
        "alt": "LawBot chat — web search, audio search and Standard mode",
        "kind": "screen"
      },
      {
        "src": "/images/work/pakistan-lawbot/analysis.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Document analysis — risks, clauses and obligations",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/lawbot-case-study/"
  },
  {
    "slug": "aitube",
    "order": 2,
    "featured": true,
    "name": "AITube",
    "kicker": "AI video platform",
    "category": "AI video · Creator economy",
    "summary": "A community video platform built only for AI video. Creators generate, edit, publish, compete and earn on the web, iOS and Android — and brands advertise through a self-serve Business Center.",
    "tags": [
      "AI",
      "Mobile",
      "Web"
    ],
    "tint": "#6D28D9",
    "highlights": [
      {
        "value": "6 apps",
        "label": "one platform"
      },
      {
        "value": "20+ models",
        "label": "in one AI studio"
      },
      {
        "value": "10K+",
        "label": "Google Play downloads"
      }
    ],
    "facts": {
      "client": "AITube Inc.",
      "industry": "AI video & creator economy",
      "built": "Product engineering — web, mobile, API, ads & admin",
      "tech": "Next.js · React Native · Node.js · PostgreSQL"
    },
    "stats": [
      {
        "value": "900+",
        "label": "API endpoints"
      },
      {
        "value": "150+",
        "label": "data models"
      },
      {
        "value": "120+",
        "label": "web pages & routes"
      },
      {
        "value": "90+",
        "label": "mobile screens"
      }
    ],
    "live": "aitube.app",
    "brief": {
      "title": "The problem to solve",
      "text": "Making AI video usually means juggling separate tools to generate, edit and publish — and AI creators had no platform built for them, or a way to earn from their work. AITube brings the whole journey into one place: generate, edit, publish, compete and earn."
    },
    "builtFor": [
      "Creators",
      "Viewers",
      "Brands & agencies",
      "Moderators"
    ],
    "objectives": [
      "One studio for every leading AI video model",
      "Generate, edit and publish without leaving the app",
      "Ways for creators to compete and earn",
      "Self-serve ads for brands that want AI-video fans",
      "A safe community as it grows"
    ],
    "built": {
      "title": "Six apps, one platform",
      "intro": "Creators, viewers, brands and moderators each get their own tools — all running on one API and one data model.",
      "features": [
        {
          "title": "20+ video models",
          "text": "Veo, Kling, Hailuo, Seedance, Runway, Luma and more — or let Auto pick the right one."
        },
        {
          "title": "AI Director",
          "text": "Describe the video; the assistant plans shots and proposes renders for you to approve."
        },
        {
          "title": "StoryShort",
          "text": "Script, clips and voiceover from one idea — ready for AITube, YouTube or TikTok."
        },
        {
          "title": "AI Movie Maker",
          "text": "Storyboards and shots that keep the same characters scene to scene."
        },
        {
          "title": "Captions & avatars",
          "text": "Word-timed animated captions and lip-synced talking avatars."
        },
        {
          "title": "Audio Forge & effects",
          "text": "Music, 25 voices, sound effects and 30 photo-to-video effects."
        },
        {
          "title": "Timeline editor",
          "text": "Stitch clips and add voiceover, captions and music in the browser."
        },
        {
          "title": "Analytics & earnings",
          "text": "Views, followers and payouts in one dashboard."
        }
      ]
    },
    "how": {
      "title": "From prompt to payout",
      "intro": "The creator journey AITube is built around.",
      "steps": [
        {
          "title": "Write a prompt",
          "text": "Or plan it with the AI Director, or start from a photo."
        },
        {
          "title": "Auto picks the model",
          "text": "Routing weighs each model’s capability, health and price."
        },
        {
          "title": "Render with live progress",
          "text": "Credits are reserved, then settled only when the video arrives."
        },
        {
          "title": "Edit & publish",
          "text": "Captions, voice and music — then publish to AITube, YouTube or TikTok."
        },
        {
          "title": "Compete & earn",
          "text": "Enter Prompt Battles, earn from ads and referrals, and cash out."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "Every app talks to one API. Video runs through a dedicated media pipeline, and AI providers plug in behind a single generation engine."
    },
    "challenges": [
      {
        "title": "Dozens of AI models",
        "challenge": "Every model has different strengths, limits, prices and uptime.",
        "solution": "One generation engine with plug-in provider adapters, and an Auto router that picks by capability, health and price."
      },
      {
        "title": "Long, costly renders",
        "challenge": "AI video can take minutes and cost real money — a failed job must never cost the creator.",
        "solution": "Database-backed jobs with leases and a reconciler, plus a ledger that reserves, settles or releases credits."
      },
      {
        "title": "Video at scale",
        "challenge": "Uploads and renders have to stream smoothly on any device.",
        "solution": "Uploads go through S3 and AWS MediaConvert to adaptive HLS, delivered by CloudFront."
      },
      {
        "title": "A safe, AI-only community",
        "challenge": "Open uploads attract unsafe and copied content.",
        "solution": "AWS Rekognition screens for NSFW content, and perceptual hashing catches re-uploads."
      }
    ],
    "stack": [
      {
        "name": "Next.js",
        "role": "Web app"
      },
      {
        "name": "React",
        "role": "Web, admin & mobile UI"
      },
      {
        "name": "TypeScript",
        "role": "Web, admin & Business Center"
      },
      {
        "name": "Tailwind CSS",
        "role": "Styling"
      },
      {
        "name": "Node.js",
        "role": "API"
      },
      {
        "name": "Express",
        "role": "API framework"
      },
      {
        "name": "Prisma",
        "role": "Data layer"
      },
      {
        "name": "PostgreSQL",
        "role": "Database"
      },
      {
        "name": "Redis",
        "role": "Ad delivery & caching"
      },
      {
        "name": "Socket.io",
        "role": "Live render progress"
      },
      {
        "name": "Amazon Web Services",
        "role": "Media pipeline & moderation"
      },
      {
        "name": "Replicate",
        "role": "Video, image & audio models"
      },
      {
        "name": "Google Gemini",
        "role": "Scripts, titles & moderation"
      },
      {
        "name": "Anthropic",
        "role": "Ad copy & guardrails"
      },
      {
        "name": "Stripe",
        "role": "Payments & payouts"
      },
      {
        "name": "Sentry",
        "role": "Error tracking"
      }
    ],
    "images": [
      {
        "src": "/images/work/aitube/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "AITube Prompt Battles on desktop and mobile",
        "kind": "hero"
      },
      {
        "src": "/images/work/aitube/models.webp",
        "width": 1600,
        "height": 1000,
        "alt": "AI video models on AITube — Veo, Seedance, Kling and more",
        "kind": "screen"
      },
      {
        "src": "/images/work/aitube/studio.webp",
        "width": 1600,
        "height": 1000,
        "alt": "AITube Creator Studio — create, edit, publish, earn",
        "kind": "screen"
      },
      {
        "src": "/images/work/aitube/battle-mobile.webp",
        "width": 540,
        "height": 960,
        "alt": "A Prompt Battle on mobile",
        "kind": "mobile"
      }
    ],
    "source": "https://pixelpk.com/aitube-case-study/"
  },
  {
    "slug": "aivastark",
    "order": 3,
    "featured": true,
    "name": "Aivastark",
    "kicker": "AI sales agent",
    "category": "Our product · AI agents",
    "summary": "An AI agent that answers customers on your website, Instagram, WhatsApp, Messenger, Telegram and email — and puts every conversation in one team inbox. Trained on your own content and live in under five minutes.",
    "tags": [
      "AI",
      "Web",
      "Mobile"
    ],
    "tint": "#1E3A8A",
    "highlights": [
      {
        "value": "80+ languages",
        "label": "answered automatically"
      },
      {
        "value": "6 channels",
        "label": "one team inbox"
      },
      {
        "value": "Under 5 min",
        "label": "to go live"
      }
    ],
    "facts": {
      "client": "Our own — Aivastark",
      "industry": "AI customer support & sales",
      "built": "Web app, widget, channels & mobile inbox",
      "tech": "React · Supabase · Postgres + pgvector · Expo"
    },
    "stats": [
      {
        "value": "250+",
        "label": "serverless functions"
      },
      {
        "value": "390+",
        "label": "database migrations"
      },
      {
        "value": "1,000+",
        "label": "automated test files"
      },
      {
        "value": "80+",
        "label": "languages"
      }
    ],
    "live": "aivastark.com",
    "brief": {
      "title": "The problem to solve",
      "text": "Customers ask at midnight — and no reply means no sale. Small teams have had to choose between a generic chatbot and months spent building their own AI. Aivastark gives them an agent that knows their business and answers on every channel, without the build."
    },
    "builtFor": [
      "Shoppers & visitors",
      "Support & sales teams",
      "Business owners",
      "Developers"
    ],
    "objectives": [
      "Answer customers on every channel, any time",
      "Learn the business from its website, documents and catalogue",
      "Take real actions — orders, returns, bookings — with the customer’s consent",
      "One inbox for every conversation, with a clean hand-off to people",
      "Score leads so the team knows who to call first"
    ],
    "built": {
      "title": "One agent, every channel",
      "intro": "Customers talk to it anywhere; the team works from one inbox; owners train it and connect their tools.",
      "features": [
        {
          "title": "Every channel",
          "text": "Website widget, Instagram DMs, WhatsApp, Messenger, Telegram and email."
        },
        {
          "title": "80+ languages",
          "text": "Replies in the language the customer writes in — Urdu and Roman Urdu included."
        },
        {
          "title": "Voice notes",
          "text": "Voice messages are transcribed and answered in text."
        },
        {
          "title": "Orders & returns",
          "text": "Look up an order, change an address or start a return — after the customer confirms."
        },
        {
          "title": "Bookings",
          "text": "Books on Google Calendar or Cal.com, or sends a Calendly link."
        },
        {
          "title": "Add to cart",
          "text": "Finds products and adds them to the cart, ready for checkout."
        }
      ]
    },
    "how": {
      "title": "Live in under five minutes",
      "intro": "The setup Aivastark is built around — no developer needed.",
      "steps": [
        {
          "title": "Add your website",
          "text": "Aivastark crawls it and builds the knowledge base."
        },
        {
          "title": "Add documents",
          "text": "PDFs, documents, FAQs and your product catalogue."
        },
        {
          "title": "Set the persona",
          "text": "Brand colours, tone and what the agent may do."
        },
        {
          "title": "Install",
          "text": "One script tag, the WordPress plugin or the Shopify app."
        },
        {
          "title": "Connect channels",
          "text": "Instagram, WhatsApp, Messenger, Telegram and email."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "Every channel runs through one shared turn engine, so answers and guardrails match everywhere — and each business’s data is isolated in the database."
    },
    "challenges": [
      {
        "title": "Same answer everywhere",
        "challenge": "Six channels could mean six different bots.",
        "solution": "One shared turn engine answers every channel with the same knowledge and guardrails."
      },
      {
        "title": "Actions without surprises",
        "challenge": "An agent that can change orders must never act on a guess.",
        "solution": "Address changes, returns and cart actions run only after the customer confirms — and refunds stay with people."
      },
      {
        "title": "Answers you can audit",
        "challenge": "Teams need to see why the agent said something.",
        "solution": "A “Why?” drawer shows the exact passages behind each reply."
      },
      {
        "title": "Many businesses, one platform",
        "challenge": "Every business’s data must stay its own.",
        "solution": "Postgres row-level security isolates each organisation’s data."
      }
    ],
    "stack": [
      {
        "name": "React",
        "role": "Dashboard"
      },
      {
        "name": "TypeScript",
        "role": "Web, functions & mobile"
      },
      {
        "name": "Vite",
        "role": "Build & pre-rendering"
      },
      {
        "name": "Tailwind CSS",
        "role": "Styling"
      },
      {
        "name": "Supabase",
        "role": "Database, auth, realtime & functions"
      },
      {
        "name": "PostgreSQL",
        "role": "Knowledge base (pgvector)"
      },
      {
        "name": "Vercel",
        "role": "Hosting"
      },
      {
        "name": "Expo",
        "role": "Mobile inbox"
      },
      {
        "name": "Shopify",
        "role": "Store actions"
      },
      {
        "name": "WhatsApp",
        "role": "WhatsApp channel"
      },
      {
        "name": "Stripe",
        "role": "Billing"
      },
      {
        "name": "Sentry",
        "role": "Monitoring"
      }
    ],
    "images": [
      {
        "src": "/images/work/aivastark/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Aivastark website on desktop and mobile",
        "kind": "hero"
      },
      {
        "src": "/images/work/aivastark/customers.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Aivastark answering a shopper in Roman Urdu on a store website (demo store)",
        "kind": "screen"
      },
      {
        "src": "/images/work/aivastark/analytics.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Visitor Lenz analytics (demo data)",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/aivastark-case-study/"
  },
  {
    "slug": "khurshid-answers",
    "order": 4,
    "featured": true,
    "name": "Khurshid Answers",
    "kicker": "scholarly AI",
    "category": "AI knowledge assistant · Research",
    "summary": "An AI assistant that answers questions from the writings of Prof. Khurshid Ahmad — every answer linked to the book, page and passage it came from. Built for the Institute of Policy Studies, Islamabad.",
    "tags": [
      "AI",
      "Web"
    ],
    "tint": "#0F766E",
    "highlights": [
      {
        "value": "4 languages",
        "label": "English, Urdu, Arabic, Roman Urdu"
      },
      {
        "value": "Cited",
        "label": "book, page & excerpt"
      },
      {
        "value": "Read aloud",
        "label": "with sentence highlighting"
      }
    ],
    "facts": {
      "client": "Institute of Policy Studies, Islamabad",
      "industry": "Research & knowledge preservation",
      "built": "Reader app, admin console & API",
      "tech": "React · Node.js · MongoDB · AI speech"
    },
    "stats": [
      {
        "value": "720+",
        "label": "commits in eight months"
      },
      {
        "value": "86",
        "label": "API routes"
      },
      {
        "value": "13",
        "label": "admin tools"
      },
      {
        "value": "4",
        "label": "languages for questions"
      }
    ],
    "live": "khurshidanswers.org",
    "brief": {
      "title": "The problem to solve",
      "text": "Professor Khurshid Ahmad’s writing on economics, governance and Islamic thought runs to more than 100,000 pages. IPS wanted students, researchers and journalists to be able to question it directly, in their own language — and to check every answer against the source."
    },
    "builtFor": [
      "Students & researchers",
      "Journalists & analysts",
      "Editors & reviewers",
      "IPS admins"
    ],
    "objectives": [
      "Answer from his works — and only his works",
      "Show the book, page and passage behind every answer",
      "Take questions in English, Urdu, Arabic and Roman Urdu",
      "Let editors grow the library without a developer",
      "Make answers easy to listen to and share"
    ],
    "built": {
      "title": "Readers and librarians",
      "intro": "Readers ask and listen; IPS’s editors and reviewers decide what the assistant knows.",
      "features": [
        {
          "title": "Cited answers",
          "text": "Each answer shows the book, page and excerpt it came from."
        },
        {
          "title": "Follow-up questions",
          "text": "Suggested next questions to go deeper."
        },
        {
          "title": "Four languages",
          "text": "Ask in English, Urdu, Arabic or Roman Urdu — and translate any answer."
        },
        {
          "title": "Listen",
          "text": "Answers read aloud with a waveform and sentence-by-sentence highlighting."
        },
        {
          "title": "Public or private",
          "text": "Chat as a guest, or sign in to keep chats private."
        },
        {
          "title": "Featured & shared chats",
          "text": "Curated public chats, and links to share an answer."
        }
      ]
    },
    "how": {
      "title": "From a book to a cited answer",
      "intro": "The library workflow and the reader’s question meet in one system.",
      "steps": [
        {
          "title": "Submit a book",
          "text": "An editor uploads it with its metadata."
        },
        {
          "title": "Review",
          "text": "A reviewer approves it for the library."
        },
        {
          "title": "Train & index",
          "text": "The AI server indexes it; the job is tracked to done."
        },
        {
          "title": "Ask",
          "text": "A reader asks in English, Urdu, Arabic or Roman Urdu."
        },
        {
          "title": "Answer with sources",
          "text": "The answer streams in with its book, page and excerpt."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "The reader app streams answers from a Python AI server and saves every conversation to the Node.js API, which also runs the library workflow and speech."
    },
    "challenges": [
      {
        "title": "Trust in every answer",
        "challenge": "A scholar’s words can’t be paraphrased into something he never said.",
        "solution": "Answers carry the exact book, page and excerpt, so readers can check them."
      },
      {
        "title": "A growing library",
        "challenge": "New books and articles keep arriving.",
        "solution": "A draft → review → train → track workflow lets editors add content without a developer."
      },
      {
        "title": "Listening, not just reading",
        "challenge": "Many readers prefer to listen — in English or Urdu.",
        "solution": "Text-to-speech with word timestamps highlights each sentence as it’s read."
      },
      {
        "title": "Four languages",
        "challenge": "Questions arrive in English, Urdu, Arabic and Roman Urdu.",
        "solution": "A bilingual English/Urdu interface with right-to-left layout, and translation of any answer."
      }
    ],
    "stack": [
      {
        "name": "React",
        "role": "Reader app & admin"
      },
      {
        "name": "TypeScript",
        "role": "Web, admin & API"
      },
      {
        "name": "Vite",
        "role": "Build"
      },
      {
        "name": "Tailwind CSS",
        "role": "Styling"
      },
      {
        "name": "Node.js",
        "role": "API"
      },
      {
        "name": "Express",
        "role": "API framework"
      },
      {
        "name": "MongoDB",
        "role": "Database"
      },
      {
        "name": "Python",
        "role": "AI server"
      },
      {
        "name": "OpenAI",
        "role": "Speech & timestamps"
      },
      {
        "name": "Google Gemini",
        "role": "App speech"
      }
    ],
    "images": [
      {
        "src": "/images/work/khurshid-answers/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Khurshid Answers featured chats on desktop and mobile",
        "kind": "hero"
      },
      {
        "src": "/images/work/khurshid-answers/featured-chats.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Khurshid Answers — featured chats",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/khurshid-answers-case-study/"
  },
  {
    "slug": "ask-maududi",
    "order": 5,
    "featured": false,
    "name": "Ask Maududi",
    "kicker": "Urdu AI",
    "category": "AI · Urdu knowledge",
    "summary": "A non-profit AI chatbot over the works of Syed Abul A’la Maududi — Urdu books digitised with OCR and AI proofreading, then opened up to questions in Urdu and English.",
    "tags": [
      "AI",
      "Web"
    ],
    "tint": "#4C1D95",
    "highlights": [
      {
        "value": "Urdu & English",
        "label": "right-to-left Nastaliq"
      },
      {
        "value": "OCR + AI",
        "label": "proofread digitisation"
      },
      {
        "value": "4 languages",
        "label": "to translate answers"
      }
    ],
    "facts": {
      "client": "Our own non-profit project",
      "industry": "Islamic scholarship & digital humanities",
      "built": "Digitisation pipeline, chat app & website",
      "tech": "Python · Google Cloud Vision · Gemini · React"
    },
    "stats": [
      {
        "value": "4",
        "label": "source collections"
      },
      {
        "value": "5",
        "label": "volumes of Rasail-o-Masail"
      },
      {
        "value": "105",
        "label": "article index pages processed"
      },
      {
        "value": "4",
        "label": "languages to translate into"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Maududi’s books, articles and Tafheem-ul-Quran are spread across websites and scanned Urdu PDFs. Scanned Urdu needs careful correction before anyone can search it — let alone ask it questions."
    },
    "builtFor": [
      "Students",
      "Researchers",
      "General readers",
      "Editors"
    ],
    "objectives": [
      "Bring his books and articles into one corpus",
      "Turn scanned Urdu PDFs into clean Unicode text",
      "Correct OCR errors without changing the words",
      "Let readers ask questions in Urdu or English",
      "Browse the books and articles behind the answers"
    ],
    "built": {
      "title": "From scanned pages to answers",
      "intro": "First the library became clean, structured Urdu text; then readers could talk to it.",
      "features": []
    },
    "how": {
      "title": "How a page becomes searchable",
      "intro": "The pipeline behind the chatbot.",
      "steps": [
        {
          "title": "Collect",
          "text": "Books and articles gathered into one corpus."
        },
        {
          "title": "OCR",
          "text": "Google Cloud Vision reads the Urdu pages."
        },
        {
          "title": "Proofread",
          "text": "Gemini fixes OCR errors, keeping the text intact."
        },
        {
          "title": "Structure",
          "text": "Unicode text, linked JSON and Word volumes."
        },
        {
          "title": "Ask",
          "text": "Readers question the library in Urdu or English."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "A Python pipeline turns the sources into clean Urdu text; a React chat app streams answers from an API built on that corpus."
    },
    "challenges": [
      {
        "title": "Scanned Urdu is messy",
        "challenge": "OCR on scanned Urdu pages produces many errors.",
        "solution": "Google Cloud Vision with an Urdu language hint, followed by an AI proofreading pass."
      },
      {
        "title": "Don’t change his words",
        "challenge": "A scholar’s text must never be rewritten.",
        "solution": "The proofreading step is instructed to fix OCR errors only and preserve the full content."
      },
      {
        "title": "Right to left",
        "challenge": "Urdu needs a right-to-left layout and Nastaliq type.",
        "solution": "Right-to-left documents, and a chat that switches direction and font for Urdu."
      },
      {
        "title": "Many sources, one library",
        "challenge": "Books, articles and Tafheem live in different places.",
        "solution": "Converters bring them into one structured, linked corpus."
      }
    ],
    "stack": [
      {
        "name": "Python",
        "role": "Pipeline"
      },
      {
        "name": "Google Cloud",
        "role": "Urdu OCR (Vision)"
      },
      {
        "name": "Google Gemini",
        "role": "AI proofreading"
      },
      {
        "name": "React",
        "role": "Chat app"
      },
      {
        "name": "python-docx",
        "role": "Word export"
      }
    ],
    "images": [
      {
        "src": "/images/work/ask-maududi/hero.webp",
        "width": 1200,
        "height": 750,
        "alt": "Ask Maududi — an AI chatbot for exploring the works of Syed Abul A’la Maududi",
        "kind": "hero"
      }
    ],
    "source": "https://pixelpk.com/ask-maududi-case-study/"
  },
  {
    "slug": "kixx",
    "order": 6,
    "featured": true,
    "name": "KIXX",
    "kicker": "oil-change rewards",
    "category": "Automotive · Saudi Arabia",
    "summary": "A loyalty app and shop portal we built for KIXX lubricants in Saudi Arabia — drivers logged every oil change, earned points and redeemed free litres at partner shops, in English and Arabic.",
    "tags": [
      "Mobile",
      "Web"
    ],
    "tint": "#C2410C",
    "highlights": [
      {
        "value": "English & Arabic",
        "label": "right-to-left ready"
      },
      {
        "value": "QR rewards",
        "label": "redeemed in the shop"
      },
      {
        "value": "Native apps",
        "label": "Android & iOS"
      }
    ],
    "facts": {
      "client": "KIXX lubricants — Saudi Arabia",
      "industry": "Automotive aftercare",
      "built": "Android & iOS apps, shop portal & API",
      "tech": "Java · Swift · PHP · Firebase"
    },
    "stats": [
      {
        "value": "25",
        "label": "App Store releases"
      },
      {
        "value": "38",
        "label": "iOS screens"
      },
      {
        "value": "33",
        "label": "Android activities"
      },
      {
        "value": "2",
        "label": "languages — English & Arabic"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Drivers rarely remember where — or when — they last changed their oil, and shops had no simple way to reward them for coming back. KIXX wanted an app that kept every car’s oil-change history and turned each visit into rewards."
    },
    "builtFor": [
      "Drivers",
      "Shop staff",
      "Shop owners",
      "KIXX team"
    ],
    "objectives": [
      "Log every oil change, for every car",
      "Reward loyalty with points and free litres",
      "Guide drivers to the nearest partner shop",
      "Let shop staff redeem offers with a QR scan",
      "Run promotions and watch the shop network from one portal"
    ],
    "built": {
      "title": "Drivers, shops and KIXX",
      "intro": "Drivers used the app, shop staff used salesman mode, and KIXX ran the network from the portal.",
      "features": [
        {
          "title": "My cars",
          "text": "Several cars per account, with odometer and daily mileage."
        },
        {
          "title": "Oil-change history",
          "text": "Every change logged per car, with the right oil recommended."
        },
        {
          "title": "Points & litres",
          "text": "Earn points on changes and referrals; redeem 1 to 4 free litres."
        },
        {
          "title": "QR promotions",
          "text": "Show a promotion’s QR code in the shop to redeem it."
        },
        {
          "title": "Nearby shops",
          "text": "Partner shops on a map, with directions."
        },
        {
          "title": "Rate the shop",
          "text": "Feedback after every visit."
        }
      ]
    },
    "how": {
      "title": "An oil change, rewarded",
      "intro": "The journey we mapped with the client before building.",
      "steps": [
        {
          "title": "Find a shop",
          "text": "Nearby partner shops on the map, with directions."
        },
        {
          "title": "Show the QR",
          "text": "The driver opens a promotion in the app."
        },
        {
          "title": "Scan & record",
          "text": "Shop staff scan it and log product, quantity and odometer."
        },
        {
          "title": "Earn points",
          "text": "Points land in the driver’s account."
        },
        {
          "title": "Redeem litres",
          "text": "Points become free litres on the next visit."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "Native Android and iOS apps shared one PHP API with the KIXX portal; Firebase handled sign-in, push notifications and dynamic links."
    },
    "challenges": [
      {
        "title": "Mapped before we built",
        "challenge": "Every step of an oil change had to work for both the driver and the shop.",
        "solution": "We mapped the full journey — map, QR, odometer, feedback, points — and tested every step against it."
      },
      {
        "title": "Two languages, two directions",
        "challenge": "Saudi drivers use English and Arabic.",
        "solution": "A full Arabic translation with right-to-left layouts and assets."
      },
      {
        "title": "Rewards that match real visits",
        "challenge": "Discounts should only go to real oil changes.",
        "solution": "Rewards are redeemed only when shop staff scan the customer’s QR code and record the change."
      },
      {
        "title": "Native on both platforms",
        "challenge": "Maps, camera and notifications had to feel instant.",
        "solution": "Native apps in Java and Swift, with Google Maps and Firebase."
      }
    ],
    "stack": [
      {
        "name": "Android",
        "role": "Android app (Java)"
      },
      {
        "name": "Apple",
        "role": "iOS app (Swift)"
      },
      {
        "name": "PHP",
        "role": "API"
      },
      {
        "name": "Firebase",
        "role": "Auth, push & links"
      },
      {
        "name": "Google Maps",
        "role": "Maps & places"
      },
      {
        "name": "ZXing",
        "role": "QR scanning"
      }
    ],
    "images": [
      {
        "src": "/images/work/kixx/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "KIXX rewards app and shop portal",
        "kind": "hero"
      },
      {
        "src": "/images/work/kixx/journey.webp",
        "width": 1600,
        "height": 1000,
        "alt": "The customer oil-change journey, mapped before building",
        "kind": "screen"
      },
      {
        "src": "/images/work/kixx/staff.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Salesman mode — claims, add a car and scan to redeem",
        "kind": "screen"
      },
      {
        "src": "/images/work/kixx/rewards-mobile.webp",
        "width": 600,
        "height": 1299,
        "alt": "KIXX app — Gold user points, redeem 1–4 litres and how to earn points",
        "kind": "mobile"
      }
    ],
    "source": "https://pixelpk.com/kixx-case-study/"
  },
  {
    "slug": "secure-lien-release",
    "order": 7,
    "featured": false,
    "name": "Secure Lien Release",
    "kicker": "contractor SaaS",
    "category": "Construction · SaaS",
    "summary": "A subscription app for US contractors — estimates, invoices, card payments and California lien waivers signed online — on the web and on Android.",
    "tags": [
      "Web",
      "Mobile",
      "SaaS"
    ],
    "tint": "#B91C1C",
    "highlights": [
      {
        "value": "6 forms",
        "label": "lien waivers & notices"
      },
      {
        "value": "Card payments",
        "label": "on every invoice"
      },
      {
        "value": "Web + Android",
        "label": "one account"
      }
    ],
    "facts": {
      "client": "Secure Lien Release (US)",
      "industry": "Construction — contractor payments",
      "built": "Laravel API, React web app & mobile app",
      "tech": "Laravel · React · MySQL · Authorize.net"
    },
    "stats": [
      {
        "value": "6",
        "label": "California lien & work forms"
      },
      {
        "value": "70",
        "label": "API routes"
      },
      {
        "value": "29",
        "label": "data models"
      },
      {
        "value": "2",
        "label": "plans — monthly & yearly"
      }
    ],
    "live": "securelienrelease.com",
    "brief": {
      "title": "The problem to solve",
      "text": "Contractors juggle estimates, invoices and lien paperwork — and a missed waiver or preliminary notice can hold up a payment or limit the right to be paid. Secure Lien Release puts the paperwork, the billing and the payment in one app they can run from the job site."
    },
    "builtFor": [
      "Contractors",
      "Their clients",
      "Property owners",
      "Platform admin"
    ],
    "objectives": [
      "Estimates and invoices from anywhere",
      "California lien waivers and notices, signed online",
      "Card payments straight from the invoice",
      "Clients, items and company details in one place",
      "A simple monthly or yearly subscription"
    ],
    "built": {
      "title": "One app, both sides of the job",
      "intro": "Contractors run their business in the app; their clients and property owners act by link — no account needed.",
      "features": [
        {
          "title": "Estimates",
          "text": "Line items, tax, markup, discount, PO numbers and attachments."
        },
        {
          "title": "Invoices",
          "text": "Turn an estimate into an invoice; track active and paid."
        },
        {
          "title": "Lien forms",
          "text": "California preliminary notice, conditional and unconditional waivers, and additional work authorisations."
        },
        {
          "title": "Clients & items",
          "text": "Client records and a reusable price list — import or export by CSV."
        },
        {
          "title": "Text alerts",
          "text": "A text when a client views an invoice or accepts an estimate."
        },
        {
          "title": "Dashboard",
          "text": "Revenue, invoiced volume and estimate totals, month by month."
        }
      ]
    },
    "how": {
      "title": "From estimate to lien release",
      "intro": "The paperwork trail of a typical job, in one app.",
      "steps": [
        {
          "title": "Estimate",
          "text": "Build it on site and send it by email and text."
        },
        {
          "title": "Client accepts",
          "text": "One click from the link — and the contractor gets a text."
        },
        {
          "title": "Invoice",
          "text": "Convert the estimate and send the invoice."
        },
        {
          "title": "Get paid",
          "text": "The client pays by card; the invoice is marked paid."
        },
        {
          "title": "Release the lien",
          "text": "Send the right waiver to sign online."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "A React web app and a mobile app share one Laravel API; clients and owners act through pages served by the same backend."
    },
    "challenges": [
      {
        "title": "Paperwork that protects payment",
        "challenge": "A missed waiver or notice can hold up payment.",
        "solution": "California preliminary notices and conditional and unconditional waivers, ready to send and sign online."
      },
      {
        "title": "No app for the client",
        "challenge": "Owners and clients won’t install another app.",
        "solution": "Everything they need — view, accept, pay, sign — works from a link."
      },
      {
        "title": "Know when they’ve seen it",
        "challenge": "Contractors chase clients who never opened the invoice.",
        "solution": "Text alerts when an estimate or invoice is viewed, accepted or declined."
      },
      {
        "title": "Subscriptions that just work",
        "challenge": "Contractors pay monthly or yearly.",
        "solution": "Recurring billing through Authorize.net, with the plan re-checked at every sign-in."
      }
    ],
    "stack": [
      {
        "name": "Laravel",
        "role": "API"
      },
      {
        "name": "PHP",
        "role": "Backend"
      },
      {
        "name": "React",
        "role": "Web app"
      },
      {
        "name": "MUI",
        "role": "UI components"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Amazon Web Services",
        "role": "Hosting"
      },
      {
        "name": "Authorize.net",
        "role": "Cards & subscriptions"
      },
      {
        "name": "ClickSend",
        "role": "Text alerts"
      }
    ],
    "images": [
      {
        "src": "/images/work/secure-lien-release/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Secure Lien Release — dashboard and invoices (test data)",
        "kind": "hero"
      },
      {
        "src": "/images/work/secure-lien-release/dashboard.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Secure Lien Release dashboard — revenue, estimates and invoices (test data)",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/secure-lien-release-case-study/"
  },
  {
    "slug": "flipro",
    "order": 8,
    "featured": true,
    "name": "Flipro",
    "kicker": "renovation platform",
    "category": "PropTech · Australia",
    "summary": "Apps and a CRM for an Australian “renovate now, pay when you sell” service — homeowners requested renovations, partners and trades delivered them, and the Flipro team ran every project, payment and contract from one system.",
    "tags": [
      "Mobile",
      "Web",
      "SaaS"
    ],
    "tint": "#1D4ED8",
    "highlights": [
      {
        "value": "3 apps",
        "label": "homeowners, partners & admin"
      },
      {
        "value": "DocuSign",
        "label": "contracts signed online"
      },
      {
        "value": "Photo & video",
        "label": "progress from site"
      }
    ],
    "facts": {
      "client": "Flipro — Melbourne, Australia",
      "industry": "Property renovation",
      "built": "Admin app, companion apps, CRM & API",
      "tech": "Flutter · Laravel · Livewire · MySQL"
    },
    "stats": [
      {
        "value": "30+",
        "label": "admin app screens"
      },
      {
        "value": "31",
        "label": "CRM modules"
      },
      {
        "value": "66",
        "label": "web & API routes"
      },
      {
        "value": "75",
        "label": "database migrations"
      }
    ],
    "live": "flipro.com.au",
    "brief": {
      "title": "The problem to solve",
      "text": "Flipro pays for pre-sale renovations up front and is repaid when the home sells. That only works if every project — trades, valuations, progress and draw-down payments — is tracked closely across many partners and states."
    },
    "builtFor": [
      "Home owners",
      "Partners",
      "Agents & trades",
      "Valuers"
    ],
    "objectives": [
      "Let homeowners request a renovation from their phone",
      "Assign partners, trades and valuers to each project",
      "See progress from site — photos and video",
      "Approve draw-down payments and record the new value",
      "Contracts, email and leads in one CRM"
    ],
    "built": {
      "title": "Three apps, one system",
      "intro": "Homeowners and partners used the apps; the Flipro team ran everything from the admin app and the CRM — all on one Laravel API.",
      "features": [
        {
          "title": "Project acceptance",
          "text": "New projects and payment requests to approve or reject."
        },
        {
          "title": "Activity board",
          "text": "Projects by stage — new, in progress, completed and closed."
        },
        {
          "title": "Team per project",
          "text": "Assign partners, agents, trades and valuers to each job."
        },
        {
          "title": "Progress from site",
          "text": "Timelines with photos and compressed video, played in the app."
        },
        {
          "title": "Draw-down payments",
          "text": "Review and approve each payment request."
        },
        {
          "title": "Per-project access",
          "text": "Who can view, add value, add notes, upload progress or request payment."
        }
      ]
    },
    "how": {
      "title": "From request to renovated home",
      "intro": "How a renovation moved through Flipro.",
      "steps": [
        {
          "title": "Request",
          "text": "The homeowner submits the rooms, photos and a description."
        },
        {
          "title": "Approve & assign",
          "text": "Flipro approves it and assigns partners, trades and a valuer."
        },
        {
          "title": "Contract",
          "text": "The contract goes out for e-signature through DocuSign."
        },
        {
          "title": "Renovate",
          "text": "Trades upload progress photos and video from site."
        },
        {
          "title": "Draw-downs & value",
          "text": "Payment requests are approved, and the new value is recorded."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "One Laravel application served both the Livewire CRM and the REST API behind the Flutter apps; project events fanned out as push notifications."
    },
    "challenges": [
      {
        "title": "Many people, one project",
        "challenge": "Partners, trades, valuers and owners all touch the same job.",
        "solution": "Per-project roles and permissions decide who can view, add notes, upload progress or request payment."
      },
      {
        "title": "Seeing the site from afar",
        "challenge": "Flipro had to trust progress it couldn’t visit.",
        "solution": "Photo and video timelines, compressed on the phone so uploads work from site."
      },
      {
        "title": "Money moves carefully",
        "challenge": "Draw-down payments must match real progress.",
        "solution": "Payment requests are approved in the app, next to the progress they pay for."
      },
      {
        "title": "Paperwork without paper",
        "challenge": "Contracts need several signatures.",
        "solution": "Contracts are generated as PDFs and sent for multi-party DocuSign signing, with the status checked automatically."
      }
    ],
    "stack": [
      {
        "name": "Flutter",
        "role": "Mobile apps"
      },
      {
        "name": "Dart",
        "role": "App language"
      },
      {
        "name": "Laravel",
        "role": "API & CRM"
      },
      {
        "name": "Livewire",
        "role": "CRM interface"
      },
      {
        "name": "PHP",
        "role": "Backend"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Firebase",
        "role": "Push notifications"
      },
      {
        "name": "DocuSign",
        "role": "E-signature"
      }
    ],
    "images": [
      {
        "src": "/images/work/flipro/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Flipro app — login, admin panel and activity",
        "kind": "hero"
      },
      {
        "src": "/images/work/flipro/admin.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Flipro admin app — activity, admin panel and closed projects",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/flipro-case-study/"
  },
  {
    "slug": "study-abroad-crm",
    "order": 9,
    "featured": true,
    "name": "Study Abroad CRM",
    "kicker": "for consultancies",
    "category": "Education · CRM platform",
    "summary": "One CRM platform, tailored for study-abroad consultancies in Pakistan, the UK and Europe — leads, applications, offers, CAS and visas in a single student file, with partner networks, HR and accounts built in.",
    "tags": [
      "SaaS",
      "Web",
      "Education"
    ],
    "tint": "#1E40AF",
    "highlights": [
      {
        "value": "6 agencies",
        "label": "one core platform"
      },
      {
        "value": "Lead → visa",
        "label": "in one student file"
      },
      {
        "value": "HR & accounts",
        "label": "built in"
      }
    ],
    "facts": {
      "client": "Pathways, NSED, Edu Surferz, Osmosis, Dunya, Paragon",
      "industry": "Study-abroad consultancy",
      "built": "CRM, HR & accounts, partner and student portals",
      "tech": "Laravel 12 · Livewire 3 · MySQL · Reverb"
    },
    "stats": [
      {
        "value": "6",
        "label": "consultancies served"
      },
      {
        "value": "38",
        "label": "branches on Paragon’s system"
      },
      {
        "value": "13",
        "label": "stages in one student file"
      },
      {
        "value": "12",
        "label": "staff roles in a single build"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "A study-abroad file moves through a dozen steps — enquiry, documents, applications, offers, CAS, fees and visa — across counsellors, branches, partners and countries. Run on spreadsheets and chat groups, files stall and nobody sees the whole pipeline."
    },
    "builtFor": [
      "Counsellors",
      "Processing teams",
      "Leadership",
      "Partners & branches"
    ],
    "objectives": [
      "Track every student from enquiry to visa",
      "Live pipelines for leadership, by country and counsellor",
      "Branches, B2B partners and channel partners in one system",
      "HR, attendance and accounts beside the CRM",
      "Each deployment shaped to its countries and rules"
    ],
    "built": {
      "title": "One platform, six agencies",
      "intro": "Each consultancy runs its own instance — shaped to its destinations, teams and partners.",
      "features": [
        {
          "title": "One student file",
          "text": "Lead, application, documents, admission status, COL, UOL, credibility interview, fee, bank statement, CAS and visa."
        },
        {
          "title": "Document checklist",
          "text": "CV, passport, school and degree certificates and English test — approved or rejected."
        },
        {
          "title": "Country Desk",
          "text": "Applications, active leads and visa success rate for each country."
        },
        {
          "title": "B2B partners",
          "text": "Partners create their own counsellors, who only see their own leads."
        },
        {
          "title": "Back office",
          "text": "Attendance from ZKTeco devices, leave, payroll with PDF payslips, and a balance sheet."
        },
        {
          "title": "Leads report",
          "text": "Filter by partner, counsellor, intake, status, source, country and university."
        }
      ]
    },
    "how": {
      "title": "From enquiry to visa",
      "intro": "The student journey every deployment is built around.",
      "steps": [
        {
          "title": "Enquiry",
          "text": "A public form creates the lead and emails the student."
        },
        {
          "title": "Counselling",
          "text": "The lead is assigned; documents are collected and checked."
        },
        {
          "title": "Applications",
          "text": "Universities, offers and fees — tracked per application."
        },
        {
          "title": "CAS & interview",
          "text": "Credibility-interview prep and CAS for UK files."
        },
        {
          "title": "Visa",
          "text": "Appointment, biometrics and the decision — or a deferral."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "Each agency runs its own Laravel instance from a shared core — server-rendered Livewire screens, role and team permissions, and a queue for reminders."
    },
    "challenges": [
      {
        "title": "Every country is different",
        "challenge": "Finland, Sweden and the UK each have their own admission and visa steps.",
        "solution": "Country-specific pipelines: the student file shows the stages for the destination country."
      },
      {
        "title": "Partners and branches",
        "challenge": "B2B partners need their own counsellors — and only their own leads.",
        "solution": "Team-scoped roles: partners create counsellor accounts locked to their own leads."
      },
      {
        "title": "Back office in the same place",
        "challenge": "HR and accounts lived in separate tools.",
        "solution": "Attendance from biometric devices, payroll with PDF payslips and a balance sheet — in the same system."
      },
      {
        "title": "Mistakes happen",
        "challenge": "A file moved too far has to come back cleanly.",
        "solution": "Revert a file to an earlier stage, with that stage’s data cleaned up."
      }
    ],
    "stack": [
      {
        "name": "Laravel",
        "role": "Core"
      },
      {
        "name": "Livewire",
        "role": "Screens"
      },
      {
        "name": "PHP",
        "role": "Backend"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Tailwind CSS",
        "role": "Styling"
      },
      {
        "name": "Vite",
        "role": "Build"
      },
      {
        "name": "Stripe",
        "role": "Academy payments"
      },
      {
        "name": "Laravel Reverb",
        "role": "Real-time chat"
      },
      {
        "name": "ZKTeco devices",
        "role": "Attendance"
      }
    ],
    "images": [
      {
        "src": "/images/work/study-abroad-crm/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Consultancy CRM dashboards — Pathways and Dunya",
        "kind": "hero"
      },
      {
        "src": "/images/work/study-abroad-crm/pathways.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Pathways dashboard — leads, universities, branches and cases overview",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/study-abroad-crm-case-study/"
  },
  {
    "slug": "ummah-college",
    "order": 10,
    "featured": false,
    "name": "Ummah College",
    "kicker": "campus system",
    "category": "Education · Pakistan",
    "summary": "A college management system and student app for Ummah International Colleges — admissions, fees, payroll, accounts, attendance and results across campuses, with a mobile app that keeps students informed.",
    "tags": [
      "Education",
      "Web",
      "Mobile"
    ],
    "tint": "#312E81",
    "highlights": [
      {
        "value": "5 campuses",
        "label": "one system"
      },
      {
        "value": "Barcode",
        "label": "fee challans"
      },
      {
        "value": "Student app",
        "label": "iOS & Android"
      }
    ],
    "facts": {
      "client": "Ummah International Colleges — 5 campuses, Pakistan",
      "industry": "Higher education",
      "built": "Campus portal, student app & mobile API",
      "tech": "Laravel · Flutter · MySQL · Twilio"
    },
    "stats": [
      {
        "value": "5",
        "label": "campuses on one system"
      },
      {
        "value": "249",
        "label": "portal routes"
      },
      {
        "value": "22",
        "label": "app screens"
      },
      {
        "value": "24",
        "label": "salary allowances & deductions"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Running five campuses on paper and spreadsheets made fees, attendance, results and staff pay slow to manage and hard to check. Ummah wanted one system for the whole college — and an app that keeps students in the loop."
    },
    "builtFor": [
      "Admins & campus heads",
      "Finance & accounts",
      "Teachers",
      "Students"
    ],
    "objectives": [
      "One system for all five campuses",
      "Admissions, fees and accounts in one place",
      "Payroll with allowances, deductions and payslips",
      "Attendance and results that teachers record once",
      "An app for students to follow it all"
    ],
    "built": {
      "title": "One system, every campus",
      "intro": "Admins, finance staff and teachers use the portal; students follow everything in the app.",
      "features": [
        {
          "title": "Campuses & classes",
          "text": "Campuses, grades, sections, sessions and subjects."
        },
        {
          "title": "Admissions",
          "text": "Inquiry, admission, re-admission and hostel admission — then promotion."
        },
        {
          "title": "Bulk import",
          "text": "Teachers and students from Excel."
        },
        {
          "title": "Timetables & datesheets",
          "text": "Published for every class."
        },
        {
          "title": "SMS & push",
          "text": "Twilio SMS and push notifications to students and staff."
        },
        {
          "title": "Assets & records",
          "text": "College assets, vehicles, banks and Hifz records."
        }
      ]
    },
    "how": {
      "title": "From admission to result",
      "intro": "A student’s year, in one system.",
      "steps": [
        {
          "title": "Admission",
          "text": "Inquiry, admission and placement in a section."
        },
        {
          "title": "Fees allocated",
          "text": "Monthly fees are allocated automatically."
        },
        {
          "title": "Challan & payment",
          "text": "A barcode challan is printed, then scanned when paid."
        },
        {
          "title": "Attendance & marks",
          "text": "Teachers record attendance and enter marks."
        },
        {
          "title": "Results in the app",
          "text": "Students see results, fees and attendance on their phone."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "One Laravel application with a role-based panel for each user type, and a token-secured API for the Flutter student app."
    },
    "challenges": [
      {
        "title": "Fees that reconcile",
        "challenge": "Fees paid at the bank are hard to match to students.",
        "solution": "Every challan carries a barcode; scanning it records the payment against the right student."
      },
      {
        "title": "Payroll with many rules",
        "challenge": "Salaries mix many allowances and deductions.",
        "solution": "A salary engine with 24 pay items, annual increments and bulk PDF payslips."
      },
      {
        "title": "Many campuses, one view",
        "challenge": "Each campus needs its own data; management needs all of it.",
        "solution": "Campus-level dashboards and role-based panels on one database."
      },
      {
        "title": "Students in the loop",
        "challenge": "Students want answers without calling the office.",
        "solution": "An app with attendance, results, fees, homework and notifications."
      }
    ],
    "stack": [
      {
        "name": "Laravel",
        "role": "Portal & API"
      },
      {
        "name": "PHP",
        "role": "Backend"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Bootstrap",
        "role": "Portal UI"
      },
      {
        "name": "jQuery",
        "role": "Portal UI"
      },
      {
        "name": "Flutter",
        "role": "Student app"
      },
      {
        "name": "Dart",
        "role": "App language"
      },
      {
        "name": "Twilio",
        "role": "SMS"
      },
      {
        "name": "Firebase",
        "role": "Push notifications"
      }
    ],
    "images": [
      {
        "src": "/images/work/ummah-college/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Ummah College student app — attendance, dashboard and fees (dummy data)",
        "kind": "hero"
      },
      {
        "src": "/images/work/ummah-college/portal.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Ummah campus portal — admin dashboard and definitions (dummy data)",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/ummah-college-case-study/"
  },
  {
    "slug": "riphah",
    "order": 11,
    "featured": false,
    "name": "Riphah University",
    "kicker": "campus portal",
    "category": "Education · Pakistan",
    "summary": "An admissions and campus portal we built for Riphah International University’s Faisalabad campus — from application and merit list to fees, results, hostels and accounts — with a student app.",
    "tags": [
      "Education",
      "Web",
      "Mobile"
    ],
    "tint": "#1E3A8A",
    "highlights": [
      {
        "value": "Weighted",
        "label": "merit lists"
      },
      {
        "value": "Admissions → results",
        "label": "one portal"
      },
      {
        "value": "Student app",
        "label": "attendance, courses & fees"
      }
    ],
    "facts": {
      "client": "Riphah International University, Faisalabad",
      "industry": "Higher education",
      "built": "Admissions & campus portal, student app",
      "tech": "PHP · Vue · MySQL · mobile API"
    },
    "stats": [
      {
        "value": "80",
        "label": "admin pages"
      },
      {
        "value": "16",
        "label": "head-of-department pages"
      },
      {
        "value": "5",
        "label": "voucher types in accounts"
      },
      {
        "value": "5",
        "label": "scores in every merit list"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Admissions, exams, fees and campus administration ran through separate processes and paperwork. The campus wanted one portal that takes an applicant from sign-up to enrolment — and keeps running for them until graduation."
    },
    "builtFor": [
      "Applicants",
      "Admissions office",
      "Heads of department",
      "Finance & admin"
    ],
    "objectives": [
      "Online applications with verified accounts",
      "Fair, weighted merit lists",
      "Fees, scholarships and fines in one place",
      "Academics, results and hostels for every semester",
      "An app for students to follow it all"
    ],
    "built": {
      "title": "Applicant to graduate",
      "intro": "One portal for the admissions office, departments and finance — and an app for students.",
      "features": [
        {
          "title": "Online application",
          "text": "Sign up, verify by email and apply — program, guardian and academic details."
        },
        {
          "title": "Test results",
          "text": "Admission test results uploaded from Excel."
        },
        {
          "title": "Weighted merit lists",
          "text": "SSC, HSSC, graduation, postgraduate and admission-test scores, weighted and ranked."
        },
        {
          "title": "Challans & admit cards",
          "text": "Admission challans approved and admit cards issued as PDFs."
        }
      ]
    },
    "how": {
      "title": "From application to enrolment",
      "intro": "The admissions season, in one portal.",
      "steps": [
        {
          "title": "Apply",
          "text": "Applicants sign up, verify their email and apply."
        },
        {
          "title": "Test",
          "text": "Admission test results are uploaded in bulk."
        },
        {
          "title": "Merit list",
          "text": "Scores are weighted and ranked into a merit list."
        },
        {
          "title": "Challan",
          "text": "The admission challan is issued and approved."
        },
        {
          "title": "Admit card",
          "text": "A PDF admit card — then sections and courses."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "PHP pages paired with AJAX handlers over a shared database layer, Vue on the busiest screens, and token-secured login endpoints for the student app."
    },
    "challenges": [
      {
        "title": "A fair merit list",
        "challenge": "Thousands of applicants, five kinds of score.",
        "solution": "A weighted merit engine that ranks every applicant the same way."
      },
      {
        "title": "Bulk without errors",
        "challenge": "Test results and records arrive in spreadsheets.",
        "solution": "Excel imports for test results, programs, sections and subjects."
      },
      {
        "title": "Every voucher counted",
        "challenge": "Fees, fines and scholarships must reconcile.",
        "solution": "Accounts with a ledger, cash book and five voucher types, beside the fees."
      },
      {
        "title": "Assets you can find",
        "challenge": "Campus equipment goes missing on paper.",
        "solution": "Every asset gets a QR code, with requests and an activity log."
      }
    ],
    "stack": [
      {
        "name": "PHP",
        "role": "Portal backend"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Bootstrap",
        "role": "Portal UI"
      },
      {
        "name": "jQuery",
        "role": "Portal UI"
      },
      {
        "name": "Vue.js",
        "role": "Busiest screens"
      },
      {
        "name": "PDF",
        "role": "Admit cards & reports"
      }
    ],
    "images": [
      {
        "src": "/images/work/riphah/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Riphah student app — attendance, welcome and fee structure (dummy data)",
        "kind": "hero"
      },
      {
        "src": "/images/work/riphah/portal.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Riphah portal — course list with programs, credit hours and status",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/riphah-case-study/"
  },
  {
    "slug": "mindshift",
    "order": 12,
    "featured": false,
    "name": "MindShift",
    "kicker": "wellness app",
    "category": "Mental health · California",
    "summary": "A web and mobile app for MindShift Wellness Center, a psychotherapy and wellness practice in Southern California — self-help tools between sessions, therapist booking and chat, and the center’s services and shop, all in one account.",
    "tags": [
      "Mobile",
      "Web",
      "Health"
    ],
    "tint": "#0E7490",
    "highlights": [
      {
        "value": "12+ self-help tools",
        "label": "between sessions"
      },
      {
        "value": "Web + mobile",
        "label": "one account"
      },
      {
        "value": "Bookings",
        "label": "therapists & services"
      }
    ],
    "facts": {
      "client": "MindShift Wellness Center, California",
      "industry": "Mental health & wellness",
      "built": "Flutter mobile app & React web app",
      "tech": "Flutter · React · Stripe · Agora Chat"
    },
    "stats": [
      {
        "value": "117",
        "label": "mobile screens"
      },
      {
        "value": "130+",
        "label": "app routes"
      },
      {
        "value": "13",
        "label": "service catalogues"
      },
      {
        "value": "2",
        "label": "languages — English & French"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Therapy doesn’t stop when the session ends. The center wanted clients to keep practising between visits — tracking habits, mood and self-care — and to book sessions, message their therapist and use the center’s services from the same app."
    },
    "builtFor": [
      "Clients",
      "Families",
      "Therapists",
      "Center staff"
    ],
    "objectives": [
      "Self-help tools clients will actually use",
      "Book therapists and services in a few taps",
      "Private chat with therapists and support",
      "Share progress with the therapist",
      "The center’s shop and services in the same account"
    ],
    "built": {
      "title": "Care that continues",
      "intro": "Self-help between sessions, therapy when it’s needed, and the center’s services — in one account on web and mobile.",
      "features": [
        {
          "title": "Habit & self-care trackers",
          "text": "Daily practices with streaks."
        },
        {
          "title": "Mood tracker & journal",
          "text": "Daily prompts and a private journal."
        },
        {
          "title": "Cutback Coach",
          "text": "Set goals, plan and track cutting back."
        },
        {
          "title": "Breathing & mindfulness",
          "text": "Breath meter, mindfulness and EFT exercises."
        },
        {
          "title": "Yoga & sound",
          "text": "Yoga sessions and sound-bed audio."
        },
        {
          "title": "Affirmations widget",
          "text": "Daily affirmations, right on the home screen."
        }
      ]
    },
    "how": {
      "title": "A client’s week",
      "intro": "How the app fits around therapy.",
      "steps": [
        {
          "title": "Check in",
          "text": "Log mood and journal with a daily prompt."
        },
        {
          "title": "Practise",
          "text": "Breathing, yoga and self-care — with streaks."
        },
        {
          "title": "Book",
          "text": "Book a session or a service, and pay."
        },
        {
          "title": "Talk",
          "text": "Message the therapist between visits."
        },
        {
          "title": "Share",
          "text": "Share progress before the next session."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "A Flutter app and a React web app share one REST API and storage, so a client’s trackers, bookings and orders follow them across devices."
    },
    "challenges": [
      {
        "title": "Tools people return to",
        "challenge": "Self-help only works if it becomes a habit.",
        "solution": "Streaks, daily prompts and a home-screen affirmations widget bring clients back."
      },
      {
        "title": "Practice without signal",
        "challenge": "Clients practise anywhere, not only online.",
        "solution": "On-device storage and background jobs keep the tools working without a connection."
      },
      {
        "title": "One account, many services",
        "challenge": "Therapy, wellness services and the shop lived apart.",
        "solution": "Bookings, payments and orders share one account across web and mobile."
      },
      {
        "title": "Sensitive by design",
        "challenge": "Mental-health data deserves care.",
        "solution": "Private journals and therapist chat — and clients choose what tracker data to share."
      }
    ],
    "stack": [
      {
        "name": "Flutter",
        "role": "Mobile app"
      },
      {
        "name": "Dart",
        "role": "App language"
      },
      {
        "name": "React",
        "role": "Web app"
      },
      {
        "name": "MUI",
        "role": "Web UI"
      },
      {
        "name": "Vite",
        "role": "Build"
      },
      {
        "name": "Stripe",
        "role": "Payments"
      },
      {
        "name": "Agora Chat",
        "role": "Chat"
      },
      {
        "name": "Amazon Web Services",
        "role": "File storage"
      }
    ],
    "images": [
      {
        "src": "/images/work/mindshift/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "MindShift app screens — mood tracker, therapists, streaks and self-care",
        "kind": "hero"
      },
      {
        "src": "/images/work/mindshift/self-help.webp",
        "width": 1600,
        "height": 1000,
        "alt": "MindShift self-help — trackers, journal and a breathing timer (dummy data)",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/mindshift-case-study/"
  },
  {
    "slug": "bravosix",
    "order": 13,
    "featured": false,
    "name": "BravoSix",
    "kicker": "delivery marketplace",
    "category": "Logistics · United Kingdom",
    "summary": "A UK delivery marketplace we built for BravoSix — companies posted delivery jobs, verified drivers picked them up nearby, and every job was tracked from pickup to drop-off.",
    "tags": [
      "Mobile",
      "Web",
      "Logistics"
    ],
    "tint": "#15803D",
    "highlights": [
      {
        "value": "Multi-drop",
        "label": "jobs with many receivers"
      },
      {
        "value": "Verified drivers",
        "label": "ID, address & insurance"
      },
      {
        "value": "6 stages",
        "label": "tracked per job"
      }
    ],
    "facts": {
      "client": "BravoSix — United Kingdom",
      "industry": "Logistics & delivery",
      "built": "Driver & company apps, portals, API & website",
      "tech": "Flutter · Laravel · Livewire · MySQL"
    },
    "stats": [
      {
        "value": "3",
        "label": "roles — admin, company, driver"
      },
      {
        "value": "33",
        "label": "API routes"
      },
      {
        "value": "50",
        "label": "Livewire screens"
      },
      {
        "value": "6",
        "label": "job stages"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Businesses needed parcels and documents moved on demand, and independent drivers wanted flexible work. BravoSix set out to connect the two — with the checks and tracking both sides need to trust each other."
    },
    "builtFor": [
      "Companies",
      "Drivers",
      "Receivers",
      "BravoSix admin"
    ],
    "objectives": [
      "Let companies post delivery jobs in minutes",
      "Show drivers the jobs near them",
      "Verify every driver before they can work",
      "Track every job from pickup to drop-off",
      "Run the marketplace from one admin portal"
    ],
    "built": {
      "title": "Two apps, one marketplace",
      "intro": "Companies post and track jobs, drivers find and deliver them, and the BravoSix team runs the marketplace.",
      "features": [
        {
          "title": "Live job board",
          "text": "New, assigned, active and delivered jobs at a glance."
        },
        {
          "title": "Shipment details",
          "text": "Vehicle, shipment type, drops, distance and estimated time."
        },
        {
          "title": "Package photos",
          "text": "Weight, a photo of the parcel and handling notes."
        },
        {
          "title": "Security code",
          "text": "An 8-digit code for every job."
        },
        {
          "title": "Rate & report",
          "text": "Rate the driver and report any issue."
        }
      ]
    },
    "how": {
      "title": "A delivery, end to end",
      "intro": "Six tracked stages, from posting to drop-off.",
      "steps": [
        {
          "title": "Post",
          "text": "A company posts the job and its drop-offs."
        },
        {
          "title": "Match",
          "text": "Nearby available drivers see it and accept."
        },
        {
          "title": "Pick up",
          "text": "The driver heads to pickup and confirms collection."
        },
        {
          "title": "In transit",
          "text": "Status updates as the parcel moves."
        },
        {
          "title": "Deliver",
          "text": "Delivered — with ratings and any issues logged."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "A Laravel application served the REST API for the Flutter apps and the Livewire dashboards for companies, drivers and admins; distance and address data came from Google Maps."
    },
    "challenges": [
      {
        "title": "Drivers you can trust",
        "challenge": "Companies hand goods to people they’ve never met.",
        "solution": "Every driver uploads ID, proof of address, registration and insurance — and is approved before working."
      },
      {
        "title": "The right job, nearby",
        "challenge": "Drivers waste time on jobs across the city.",
        "solution": "Jobs are matched by distance, and drivers hold one active job at a time."
      },
      {
        "title": "One job, many stops",
        "challenge": "Deliveries often go to several receivers.",
        "solution": "Multi-drop jobs with a receiver list and a status log for each step."
      },
      {
        "title": "A code for every job",
        "challenge": "Each job needs a reference both sides can check.",
        "solution": "Every job carries its own 8-digit security code."
      }
    ],
    "stack": [
      {
        "name": "Flutter",
        "role": "Mobile apps"
      },
      {
        "name": "Laravel",
        "role": "API & portals"
      },
      {
        "name": "Livewire",
        "role": "Dashboards"
      },
      {
        "name": "PHP",
        "role": "Backend"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Tailwind CSS",
        "role": "Portal UI"
      },
      {
        "name": "Google Maps",
        "role": "Distance & places"
      },
      {
        "name": "Firebase",
        "role": "Push notifications"
      },
      {
        "name": "SendGrid",
        "role": "Email"
      }
    ],
    "images": [
      {
        "src": "/images/work/bravosix/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "BravoSix website and company app",
        "kind": "hero"
      },
      {
        "src": "/images/work/bravosix/companies.webp",
        "width": 1600,
        "height": 1000,
        "alt": "BravoSix company app — deliveries looking for a driver and shipment details",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/bravosix-case-study/"
  },
  {
    "slug": "dadss",
    "order": 14,
    "featured": false,
    "name": "DADSS",
    "kicker": "driver on demand",
    "category": "Mobility · Sydney, Australia",
    "summary": "Customer and driver apps we built for DADSS in Sydney — owners booked a professional driver to move their own car, to the airport or the mechanic, and followed the job from pickup to drop-off.",
    "tags": [
      "Mobile",
      "Logistics"
    ],
    "tint": "#9A3412",
    "highlights": [
      {
        "value": "2 apps",
        "label": "customers & drivers"
      },
      {
        "value": "Local or airport",
        "label": "bookings on a map"
      },
      {
        "value": "Wallet",
        "label": "funds & payment history"
      }
    ],
    "facts": {
      "client": "DADSS — Sydney, Australia",
      "industry": "Mobility services",
      "built": "Customer app, driver app & admin",
      "tech": "iOS & Android · React admin · Google Maps · Stripe"
    },
    "stats": [
      {
        "value": "2",
        "label": "apps — customer & driver"
      },
      {
        "value": "50",
        "label": "app screens designed"
      },
      {
        "value": "2",
        "label": "booking types"
      },
      {
        "value": "3",
        "label": "stops on every job"
      }
    ],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Taking a car to the mechanic or the airport costs owners hours. DADSS offers professional drivers who move the customer’s own car — “not a taxi, not rideshare” — and needed apps to book, dispatch and pay for each job."
    },
    "builtFor": [
      "Car owners",
      "Drivers",
      "DADSS team"
    ],
    "objectives": [
      "Book a driver for local or airport trips",
      "Set pickup, drop-off and where the car is left",
      "Send each job to available drivers",
      "Pay from an in-app wallet",
      "Keep a history of every trip"
    ],
    "built": {
      "title": "Two apps, one service",
      "intro": "Car owners booked in one app; drivers took the jobs in another; the DADSS team managed both.",
      "features": [
        {
          "title": "Local or airport",
          "text": "Choose the booking type, then set it on the map."
        },
        {
          "title": "Three stops",
          "text": "Pickup point, drop-off point and where the car is left."
        },
        {
          "title": "Find a driver",
          "text": "Send the job to available drivers and see who accepts."
        },
        {
          "title": "Wallet",
          "text": "Add funds, connect a bank account and see payment history."
        },
        {
          "title": "Trips",
          "text": "Completed and cancelled trips, with notifications."
        }
      ]
    },
    "how": {
      "title": "A car, moved for you",
      "intro": "One booking, from the owner’s phone to the driver’s.",
      "steps": [
        {
          "title": "Book",
          "text": "Local or airport, with pickup and drop-off on the map."
        },
        {
          "title": "Offer",
          "text": "Available drivers receive the job."
        },
        {
          "title": "Accept",
          "text": "A driver accepts — fare and route included."
        },
        {
          "title": "Drive",
          "text": "The driver moves the owner’s car."
        },
        {
          "title": "Pay",
          "text": "Paid from the wallet and saved to history."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "Customer and driver apps shared one API; a React admin and Google Maps completed the system."
    },
    "challenges": [
      {
        "title": "Your car, not ours",
        "challenge": "Every job moves the customer’s own vehicle.",
        "solution": "Each booking records where the car must be left — not just a destination."
      },
      {
        "title": "Airport runs",
        "challenge": "Airport trips work differently from local ones.",
        "solution": "Separate local and airport booking flows."
      },
      {
        "title": "Drivers choose",
        "challenge": "Drivers need control over their work.",
        "solution": "Offers they can accept or decline, and an availability toggle."
      },
      {
        "title": "Simple payments",
        "challenge": "Customers shouldn’t enter a card for every trip.",
        "solution": "A wallet with added funds, a connected bank account and full history."
      }
    ],
    "stack": [
      {
        "name": "Google Maps",
        "role": "Maps & places"
      },
      {
        "name": "Stripe",
        "role": "Payments"
      },
      {
        "name": "React",
        "role": "Admin"
      },
      {
        "name": "iOS & Android",
        "role": "Customer & driver apps"
      }
    ],
    "images": [
      {
        "src": "/images/work/dadss/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "DADSS app — booking, sign-up and ride details (dummy data)",
        "kind": "hero"
      },
      {
        "src": "/images/work/dadss/customers.webp",
        "width": 1600,
        "height": 1000,
        "alt": "DADSS customer app — local or airport booking and ride details (dummy data)",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/dadss-case-study/"
  },
  {
    "slug": "marquis-living",
    "order": 15,
    "featured": false,
    "name": "Marquis Living",
    "kicker": "community app",
    "category": "Property management",
    "summary": "A resident app and a management portal for a residential community — amenity bookings, payments, service requests and messages in one place.",
    "tags": [
      "Mobile",
      "Web"
    ],
    "tint": "#4338CA",
    "highlights": [
      {
        "value": "iOS & Android",
        "label": "resident app"
      },
      {
        "value": "Web portal",
        "label": "for management"
      },
      {
        "value": "Real-time",
        "label": "bookings & updates"
      }
    ],
    "facts": {
      "client": "Marquis Living",
      "industry": "Residential property management",
      "built": "Resident app (iOS & Android) + web portal",
      "tech": "Flutter · React · Node.js · MongoDB"
    },
    "stats": [],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Running a residential community’s services across separate channels was fragmented and inefficient — leading to confusion, booking mix-ups and frustrated residents. Marquis Living needed one platform to handle bookings, payments and communication."
    },
    "builtFor": [
      "Residents",
      "Reception & management",
      "Service providers"
    ],
    "objectives": [
      "Make booking any community service simple",
      "One system for bookings, payments and resident information",
      "Better communication between residents and management",
      "A more efficient community — and happier residents"
    ],
    "built": {
      "title": "One platform, two sides",
      "intro": "Residents use the app; management runs everything from the web portal. Both share the same live data.",
      "features": [
        {
          "title": "Amenity booking",
          "text": "The indoor cinema, amphitheatre, social hall, gym classes and workspaces — all booked from the app."
        },
        {
          "title": "Movie nights",
          "text": "Browse showtimes and book seats — or the entire cinema."
        },
        {
          "title": "Gym classes",
          "text": "CrossFit, yoga and kickboxing sessions, a tap away."
        },
        {
          "title": "Free bookings, access codes",
          "text": "The social hall is free to book; residents get an access code for their event."
        },
        {
          "title": "Wallet & payments",
          "text": "An in-app wallet, with paid bookings processed through Flutterwave."
        },
        {
          "title": "Service requests",
          "text": "Home maintenance, repairs and salon services — requested and tracked in the app."
        },
        {
          "title": "Guests",
          "text": "Residents keep their guest list on the reception screen."
        },
        {
          "title": "Messages & updates",
          "text": "Chat with management and get booking updates in real time."
        }
      ]
    },
    "how": {
      "title": "Booking an amenity, end to end",
      "intro": "The flow residents use most — built so a booking takes a few taps and management sees it straight away.",
      "steps": [
        {
          "title": "Choose an amenity",
          "text": "Cinema, amphitheatre, gym class, social hall or workspace."
        },
        {
          "title": "Pick a time",
          "text": "Availability updates in real time, which cuts double bookings."
        },
        {
          "title": "Pay or book free",
          "text": "Paid bookings check out through Flutterwave; free ones skip checkout."
        },
        {
          "title": "Get your pass",
          "text": "The confirmation — or the social hall’s access code — arrives in the app."
        },
        {
          "title": "Management sees it live",
          "text": "The booking appears in the portal straight away, ready to manage."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "The app and the portal share one API and one database, so residents and management always see the same data."
    },
    "challenges": [
      {
        "title": "Secure payments",
        "challenge": "Residents pay for bookings inside the app, so payments had to be secure and dependable.",
        "solution": "We implemented secure payment processing with the Flutterwave API."
      },
      {
        "title": "Real-time availability",
        "challenge": "Every resident had to see the same, current availability — or slots would be double-booked.",
        "solution": "We used WebSockets to push availability and booking updates to every device as they change."
      },
      {
        "title": "Many stakeholders",
        "challenge": "Residents, reception, management and service providers all needed different things from one system.",
        "solution": "We gathered and prioritised requirements with each group, and set shared designs and guidelines in Figma."
      }
    ],
    "stack": [
      {
        "name": "Flutter",
        "role": "Resident app"
      },
      {
        "name": "Dart",
        "role": "App language"
      },
      {
        "name": "React",
        "role": "Management portal"
      },
      {
        "name": "Node.js",
        "role": "API"
      },
      {
        "name": "MongoDB",
        "role": "Database"
      },
      {
        "name": "DigitalOcean",
        "role": "Hosting"
      },
      {
        "name": "Figma",
        "role": "Design & guidelines"
      },
      {
        "name": "Flutterwave",
        "role": "Payments"
      },
      {
        "name": "WebSockets",
        "role": "Live updates"
      }
    ],
    "images": [
      {
        "src": "/images/work/marquis-living/hero.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Marquis Living resident app — community values, home and movie booking",
        "kind": "hero"
      },
      {
        "src": "/images/work/marquis-living/residents.webp",
        "width": 1600,
        "height": 1000,
        "alt": "Marquis Living app — community values screen and home screen with reception, mov",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/marquis-living-case-study/"
  },
  {
    "slug": "clervy",
    "order": 16,
    "featured": false,
    "name": "Clervy",
    "kicker": "cleaning platform",
    "category": "Home services",
    "summary": "A platform that connects customers with professional cleaners for one-time or recurring sessions — with automatic assignment, real-time chat and rewards for loyal customers.",
    "tags": [
      "Web",
      "SaaS"
    ],
    "tint": "#1D4ED8",
    "highlights": [
      {
        "value": "3 roles",
        "label": "customers, cleaners, admins"
      },
      {
        "value": "Recurring",
        "label": "or one-time sessions"
      },
      {
        "value": "Real-time",
        "label": "chat built in"
      }
    ],
    "facts": {
      "client": "Clervy",
      "industry": "Home cleaning services",
      "built": "Web platform for customers, cleaners and admins",
      "tech": "Angular · Spring Boot · MySQL"
    },
    "stats": [],
    "live": null,
    "brief": {
      "title": "The problem to solve",
      "text": "Finding a reliable cleaner — and keeping a regular schedule — is harder than it should be. Clervy set out to make booking a clean simple, let cleaners manage their own schedules, and give its team oversight of the whole operation."
    },
    "builtFor": [
      "Customers",
      "Cleaners",
      "Admins"
    ],
    "objectives": [
      "Easy booking of cleaning services",
      "Automatic assignment and efficient management of cleaners",
      "Full admin oversight and analytics",
      "Happier customers through feedback and rewards",
      "Real-time chat for quick answers"
    ],
    "built": {
      "title": "One platform, three roles",
      "intro": "Customers, cleaners and admins each get their own view of the same live system.",
      "features": [
        {
          "title": "Flexible booking",
          "text": "One-time or recurring sessions, scheduled when it suits."
        },
        {
          "title": "Packages & extras",
          "text": "Customise the service package and add extras."
        },
        {
          "title": "Recurring sessions",
          "text": "Manage repeat cleans, with notification options."
        },
        {
          "title": "Easy changes",
          "text": "Cancel a session and leave feedback without friction."
        },
        {
          "title": "Upcoming sessions",
          "text": "Every booked session and its details in one place."
        },
        {
          "title": "Rate your cleaner",
          "text": "Ratings and feedback for every service provider."
        },
        {
          "title": "Loyalty rewards",
          "text": "Stars for each completed session, redeemed for free cleaning."
        },
        {
          "title": "Real-time chat",
          "text": "Message the cleaner or the Clervy team directly."
        }
      ]
    },
    "how": {
      "title": "How a clean gets booked",
      "intro": "The customer journey, from first visit to a reward for coming back.",
      "steps": [
        {
          "title": "Add your address",
          "text": "Clervy pre-fills the space details it can — editable any time."
        },
        {
          "title": "Choose a plan & time",
          "text": "One-time or recurring, with the package and extras to match."
        },
        {
          "title": "A cleaner is assigned",
          "text": "Assignment is automatic; cleaners can accept or skip."
        },
        {
          "title": "Check-in & check-out",
          "text": "The cleaner checks in on arrival and out when the job is done."
        },
        {
          "title": "Rate & earn stars",
          "text": "Rate the clean and earn stars to redeem on the next session."
        }
      ]
    },
    "architecture": {
      "title": "How the system fits together",
      "text": "All three views share one API and one database, so customers, cleaners and admins always see the same sessions."
    },
    "challenges": [
      {
        "title": "Schedules that change",
        "challenge": "Recurring cleans only work if they’re easy to adjust — for customers and cleaners alike.",
        "solution": "Recurring sessions with notification options and easy cancellation; cleaners accept or skip each assignment."
      },
      {
        "title": "Matching cleaners to jobs",
        "challenge": "Assigning every session by hand doesn’t scale as bookings grow.",
        "solution": "Automatic assignment, with cleaners setting their own availability preferences."
      },
      {
        "title": "Keeping everyone in touch",
        "challenge": "Customers, cleaners and the team need quick answers without phone tag.",
        "solution": "Real-time chat between customers, cleaners and admins, built into the platform."
      },
      {
        "title": "Bringing customers back",
        "challenge": "One-off cleans are good; regular customers are better.",
        "solution": "Stars for every completed session, redeemable for free cleaning — with the rules managed by admins."
      }
    ],
    "stack": [
      {
        "name": "Angular",
        "role": "Web app"
      },
      {
        "name": "Spring Boot",
        "role": "API & business logic"
      },
      {
        "name": "MySQL",
        "role": "Database"
      },
      {
        "name": "Chat",
        "role": "Real-time chat"
      },
      {
        "name": "Reminders",
        "role": "Notifications"
      }
    ],
    "images": [
      {
        "src": "/images/work/clervy/hero.webp",
        "width": 922,
        "height": 530,
        "alt": "Clervy website on a laptop — “We clean, so you don’t have to.”",
        "kind": "hero"
      },
      {
        "src": "/images/work/clervy/how-it-works.webp",
        "width": 763,
        "height": 494,
        "alt": "Clervy “How it works” — provide your address, choose your schedule, relax and ea",
        "kind": "screen"
      },
      {
        "src": "/images/work/clervy/green-clean.webp",
        "width": 735,
        "height": 530,
        "alt": "Green Clean — “30 seconds to booking your next Clervy service.”",
        "kind": "screen"
      }
    ],
    "source": "https://pixelpk.com/clervy-case-study/"
  }
];

export const tagOrder: Tag[] = ["AI", "Mobile", "Web", "SaaS", "Education", "Logistics", "Health"];
