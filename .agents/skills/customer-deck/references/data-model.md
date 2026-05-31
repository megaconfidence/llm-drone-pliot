# Data Model

The deck content is defined as a single TypeScript object that gets written to `src/data/deck-content.ts`. This is the contract between the content generation step and the slide rendering.

## TypeScript Types

```typescript
// src/data/types.ts

export interface DeckContent {
  meta: DeckMeta;
  slides: SlideContent[];
}

export interface DeckMeta {
  customerName: string;       // "Acme Corp"
  customerSlug: string;       // "acme-corp" (used in URLs and Worker name)
  meetingDate: string;        // "April 14, 2026"
  preparedBy: string;         // "Luuk van Hulten"
  preparedByTitle: string;    // "Solutions Engineer, Cloudflare"
}

// Discriminated union -- each slide type has its own shape
export type SlideContent =
  | TitleSlide
  | RecapSlide
  | PartnerSlide
  | ProductsSlide
  | AIGatewaySlide
  | AIGatewayCodeSlide
  | ArchitectureSlide
  | WorkflowSlide
  | WorkersSlide
  | CodeSlide
  | ResourcesSlide
  | NextStepsSlide
  | ContactSlide;

// --- Slide Types ---

export interface PartnerSlide {
  type: "partner";
  heading: string;              // "Cloudflare in Front of AWS"
  body: string;                 // 2-3 sentences addressing the migration concern
  credits?: string;             // Optional startup program offer, e.g. "$100,000 in credits"
  pillars: {
    label: string;              // "Start with DNS routing"
    description: string;        // One sentence on what this step delivers
  }[];
}

export interface DiagramStep {
  type: "do" | "sleep" | "waitForEvent";
  label: string;                // Must exactly match diagramHighlight on the relevant tab
}

export interface WorkflowStep {
  title: string;                // Tab label in sidebar
  description: string;          // Subtitle shown in sidebar
  language: string;             // "typescript"
  filename: string;             // "trigger.ts"
  code: string;                 // Full working code -- no pseudocode
  diagramSteps?: DiagramStep[]; // Set ONLY on steps[0]. Defines the full chain for all tabs.
  diagramHighlight?: string;    // Which node label to highlight. Omit on steps[0].
}

export interface WorkflowSlide {
  type: "workflow";
  heading?: string;             // Override default "Document Processing Pipeline"
  steps: WorkflowStep[];        // steps[0] is always the full overview tab
}

export interface WorkersSlide {
  type: "workers";
  // No fields -- content is hardcoded from workers.cloudflare.com.
  // Customise the comparison table in SlideWorkers.tsx to match the customer's stack.
}

export interface TitleSlide {
  type: "title";
  customerName: string;         // Large heading
  subtitle?: string;            // Optional tagline, e.g. "Technical Follow-Up"
}

export interface RecapSlide {
  type: "recap";
  summary: string;              // 2-3 sentence summary of what was discussed
  topics: RecapTopic[];         // Key topics as pill/tags
}

export interface RecapTopic {
  label: string;                // "Edge caching"
  emoji?: string;               // Optional emoji prefix
}

export interface ProductsSlide {
  type: "products";
  heading?: string;             // Override default "Recommended for You"
  products: ProductCard[];
}

export interface ProductCard {
  name: string;                 // "Cloudflare Workers"
  emoji: string;                // Product icon emoji
  description: string;          // One-liner on why it fits their use case
  docUrl?: string;              // Link to CF docs
}

export interface ArchitectureSlide {
  type: "architecture";
  heading?: string;             // Override default "Architecture Overview"
  description?: string;         // Brief text explaining the diagram
  nodes: ArchNode[];
  connections: ArchConnection[];
}

export interface ArchNode {
  id: string;                   // Unique ID for connections
  label: string;                // "API Gateway"
  sublabel?: string;            // "Workers"
  isCloudflare: boolean;        // true = orange styling, false = neutral
  position: {
    row: number;                // Row in grid (0-indexed)
    col: number;                // Column in grid (0-indexed)
  };
}

export interface ArchConnection {
  from: string;                 // Node ID
  to: string;                   // Node ID
  label?: string;               // Optional label on the connection
  highlighted?: boolean;        // true = orange arrow
}

export interface AIGatewaySlide {
  type: "ai-gateway";
  // No fields -- content is hardcoded (feature cards + animated routing diagram).
  // Shows: Reduce Costs, Dynamic Routing & Fallback, Full Observability cards +
  // animated SVG flow: Fundcraft App -> AI Gateway -> Bedrock (primary) / Vertex (fallback)
}

export interface AIGatewayCodeSlide {
  type: "ai-gateway-code";
  // No fields -- content is hardcoded.
  // Shows: heading "Easy to Configure, Easy to Maintain" + 3 feature pills +
  // dark code editor with two tabs: rate-models.ts and route-config.json.
  // Always place immediately after ai-gateway slide.
}

export interface CodeSlide {
  type: "code";
  heading?: string;             // Override default "Code Example"
  description?: string;         // Brief text above the code block
  language: string;             // "typescript", "javascript", "python", etc.
  filename?: string;            // "worker.ts"
  code: string;                 // The actual code (15-30 lines)
}

export interface ResourcesSlide {
  type: "resources";
  heading?: string;             // Override default "Resources"
  resources: ResourceLink[];
}

export interface ResourceLink {
  title: string;                // "Workers Documentation"
  description: string;          // One-line description
  url: string;                  // Full URL
  emoji?: string;               // Optional icon
}

export interface NextStepsSlide {
  type: "next-steps";
  heading?: string;             // Override default "Next Steps"
  steps: ActionItem[];
}

export interface ActionItem {
  description: string;          // "Set up Workers project and deploy hello-world"
  owner: string;                // "Acme" or "Cloudflare" or a person's name
  targetDate?: string;          // "April 21, 2026"
}

export interface TeamMember {
  name: string;                 // "Luuk Hofman"
  title: string;                // "Solutions Engineer, Cloudflare"
  linkedin?: string;            // Full LinkedIn URL
}

export interface ContactSlide {
  type: "contact";
  heading?: string;             // Override default "Let's Get Started"
  links?: ContactLink[];        // Optional CTA links (startup program, docs, etc.)
  team?: TeamMember[];          // Cloudflare team members on the deal -- always include
}

export interface ContactLink {
  label: string;                // "Startup Program"
  url: string;
}
```

## Example Content File

```typescript
// src/data/deck-content.ts
import type { DeckContent } from "./types";

export const deckContent: DeckContent = {
  meta: {
    customerName: "Acme Corp",
    customerSlug: "acme-corp",
    meetingDate: "April 14, 2026",
    preparedBy: "Luuk van Hulten",
    preparedByTitle: "Solutions Engineer, Cloudflare",
  },
  slides: [
    {
      type: "title",
      customerName: "Acme Corp",
      subtitle: "Technical Follow-Up",
    },
    {
      type: "recap",
      summary:
        "We discussed Acme's migration from their legacy API gateway to an edge-first architecture. Key pain points include cold start latency, global distribution costs, and config management across regions.",
      topics: [
        { label: "API Gateway Migration", emoji: "🔄" },
        { label: "Edge Caching", emoji: "⚡" },
        { label: "Global Config Sync", emoji: "🌍" },
        { label: "Cost Optimization", emoji: "📉" },
      ],
    },
    {
      type: "products",
      products: [
        {
          name: "Cloudflare Workers",
          emoji: "⚡",
          description:
            "Run your API gateway logic at the edge with zero cold starts. Replace your centralized gateway with distributed compute.",
          docUrl: "https://developers.cloudflare.com/workers/",
        },
        {
          name: "Workers KV",
          emoji: "🗄️",
          description:
            "Store API routing config and feature flags globally with low-latency reads from every Cloudflare location.",
          docUrl: "https://developers.cloudflare.com/kv/",
        },
        {
          name: "Cache Rules",
          emoji: "🚀",
          description:
            "Fine-grained cache control for your API responses. Reduce origin load and improve response times globally.",
          docUrl: "https://developers.cloudflare.com/cache/how-to/cache-rules/",
        },
      ],
    },
    {
      type: "architecture",
      description: "Edge-first API gateway replacing the centralized approach",
      nodes: [
        { id: "client", label: "Client Apps", isCloudflare: false, position: { row: 0, col: 1 } },
        { id: "worker", label: "API Gateway", sublabel: "Workers", isCloudflare: true, position: { row: 1, col: 1 } },
        { id: "kv", label: "Config Store", sublabel: "KV", isCloudflare: true, position: { row: 1, col: 0 } },
        { id: "cache", label: "Response Cache", sublabel: "Cache Rules", isCloudflare: true, position: { row: 1, col: 2 } },
        { id: "origin", label: "Origin API", sublabel: "Acme Backend", isCloudflare: false, position: { row: 2, col: 1 } },
      ],
      connections: [
        { from: "client", to: "worker", highlighted: true },
        { from: "worker", to: "kv", label: "config lookup" },
        { from: "worker", to: "cache", label: "cached responses" },
        { from: "worker", to: "origin", label: "cache miss" },
      ],
    },
    {
      type: "code",
      description: "A Workers fetch handler that routes requests using KV-stored config",
      language: "typescript",
      filename: "gateway.ts",
      code: `export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const route = await env.CONFIG_KV.get(url.pathname);

    if (!route) {
      return new Response("Not Found", { status: 404 });
    }

    const config = JSON.parse(route);
    const cached = await caches.default.match(request);

    if (cached && config.cacheable) {
      return cached;
    }

    const response = await fetch(config.origin + url.pathname, {
      headers: request.headers,
    });

    if (config.cacheable) {
      const clone = response.clone();
      await caches.default.put(request, clone);
    }

    return response;
  },
};`,
    },
    {
      type: "resources",
      resources: [
        {
          title: "Workers Getting Started",
          description: "Build and deploy your first Worker in minutes",
          url: "https://developers.cloudflare.com/workers/get-started/",
          emoji: "📖",
        },
        {
          title: "KV Documentation",
          description: "Global, low-latency key-value storage",
          url: "https://developers.cloudflare.com/kv/",
          emoji: "🗄️",
        },
        {
          title: "Cache Rules",
          description: "Configure caching behavior with fine-grained rules",
          url: "https://developers.cloudflare.com/cache/how-to/cache-rules/",
          emoji: "🚀",
        },
        {
          title: "Cloudflare for Startups",
          description: "Special program with credits and support for startups",
          url: "https://www.cloudflare.com/forstartups/",
          emoji: "🚀",
        },
      ],
    },
    {
      type: "next-steps",
      steps: [
        {
          description: "Set up a Workers project and deploy a hello-world gateway",
          owner: "Acme",
          targetDate: "April 21, 2026",
        },
        {
          description: "Share KV namespace setup guide and config schema example",
          owner: "Cloudflare",
          targetDate: "April 16, 2026",
        },
        {
          description: "Schedule a technical deep-dive on cache invalidation strategies",
          owner: "Cloudflare",
          targetDate: "April 28, 2026",
        },
      ],
    },
    {
      type: "contact",
      heading: "Let's Get Started",
      links: [
        { label: "Startup Program", url: "https://www.cloudflare.com/forstartups/" },
      ],
      team: [
        { name: "August Hjorth",   title: "Account Executive, Cloudflare",  linkedin: "https://www.linkedin.com/in/augusthjorth/" },
        { name: "Margot Schipper", title: "Account Executive, Cloudflare",   linkedin: "https://www.linkedin.com/in/marschip/" },
        { name: "Luuk Hofman",     title: "Solutions Engineer, Cloudflare",  linkedin: "https://www.linkedin.com/in/luuk-hofman-01164259/" },
      ],
    },
  ],
};
```

## Rules

1. **Every deck MUST include** at minimum: `title`, `products`, and `next-steps` slides.
2. **Slide order** in the array determines render order. Follow the natural flow: title -> recap -> partner (if relevant) -> products -> architecture -> ai-gateway -> ai-gateway-code -> workflow (if relevant) -> workers (if customer uses Lambda/serverless) -> resources -> next steps -> contact.
3. **Skip slides with no content.** If there's no code example relevant to the customer, omit the `code` slide entirely. Don't generate filler.
4. **Keep descriptions short.** Product descriptions: 1-2 sentences. Recap summary: 2-3 sentences. Resource descriptions: 1 sentence.
5. **Code must be real and runnable.** No pseudocode, no placeholder comments like "// your logic here". Write actual working Cloudflare code.
6. **URLs must be real.** Only link to pages that actually exist on developers.cloudflare.com or cloudflare.com.
7. **Team members on the contact slide are mandatory.** Look up who from Cloudflare was on the meeting (from calendar attendees or meeting brief) and add them all to `team[]` with name, title, and LinkedIn URL. The contact slide renders team member cards with initials avatar and LinkedIn link. Never leave `team` empty or use placeholder names.
