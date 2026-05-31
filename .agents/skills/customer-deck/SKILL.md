---
name: customer-deck
description: Build and deploy a Cloudflare-branded React presentation site for a customer. Generates a personalized deck from meeting context (calendar, notes, briefs) and deploys it to Workers. Use when you need to create a polished follow-up deliverable after a customer meeting.
metadata:
  audience: solutions-engineers
  workflow: customer-engagement
---

# Customer Deck Generator

Build a standalone, Cloudflare-branded React presentation site for a customer and deploy it to Workers. Each deck gets its own Worker at `customer-deck-{slug}.luuk-dev.workers.dev`.

## When to use this skill

- After a customer meeting to share what was discussed and recommended
- When you want to give a customer a polished, interactive deliverable instead of a PDF or email
- When preparing a technical proposal with product recommendations, architecture, and code examples

## Reference Documents

Load these as needed during each step. Do NOT load all references upfront.

| Reference | What it contains | Load during |
|-----------|-----------------|-------------|
| [references/design-system.md](references/design-system.md) | CF color tokens, fonts, spacing, strict design rules | Step 3 (Build) |
| [references/visual-elements.md](references/visual-elements.md) | **Dynamic element catalog -- this is what creates the "wow" effect.** Static patterns, animated canvas charts, ticker strips, terminal typewriters, waveforms, and reveal animations. All reverse-engineered from workers.cloudflare.com. Every deck MUST use at least one dynamic element. | Step 3 (Build) |
| [references/data-model.md](references/data-model.md) | JSON schema for deck content | Step 2 (Generate) |
| [references/slide-templates.md](references/slide-templates.md) | Full TSX for each slide type | Step 3 (Build) |
| [references/app-scaffold.md](references/app-scaffold.md) | Project structure, package.json, vite/wrangler config, route files | Step 3 (Build) |
| [references/deployment.md](references/deployment.md) | How to deploy to luuk-dev Workers account | Step 4 (Deploy) |

## Workflow

### Step 1: Research the customer

Gather context about what was discussed and what the customer needs.

1. **Find the meeting** -- use Google Calendar MCP to locate the meeting referenced in the user's prompt. Extract the date, attendees, and any description.
2. **Find notes/briefs** -- check `meeting-briefs/` folder for a brief matching this customer. Also search Google Drive for shared meeting notes.
3. **Use cf-meeting-prep output** if a meeting brief already exists for this customer. It will have attendee research, company info, and product recommendations.
4. **Identify discussed products** -- from the notes/brief, extract which Cloudflare products were discussed or recommended. This drives slide content.
5. **Search CF docs** -- use the Cloudflare docs search to find relevant product pages, guides, and code examples for the discussed products.
6. **Extract the Cloudflare team** -- from the meeting brief or calendar attendees, identify every Cloudflare person on the deal (AE, SE, CSM, etc.). Collect their name, title, and LinkedIn URL. These go into the `team[]` array on the contact slide. Common team at Luuk's accounts: August Hjorth (AE, linkedin.com/in/augusthjorth/), Margot Schipper (Account Executive, linkedin.com/in/marschip/), Luuk Hofman (SE, linkedin.com/in/luuk-hofman-01164259/).

**Output of this step:** A mental model of the customer, their use case, discussed products, and relevant resources.

### Step 2: Generate the deck content

Load `references/data-model.md` to understand the JSON schema.

1. **Decide which slides to include** -- not every deck needs all templates. Skip slides that have no meaningful content. Every deck should have at minimum: Title, Product Recommendations, and Next Steps. Available slide types: `title`, `recap`, `partner`, `products`, `architecture`, `workflow`, `workers`, `code`, `resources`, `next-steps`, `contact`.
2. **Write the deck JSON** -- populate the content for each included slide following the schema. Be specific and personalized -- generic content defeats the purpose.
3. **Architecture diagram data** -- if including an architecture slide, define the nodes (their services + CF products) and connections as structured data.
4. **Code examples** -- pick a code snippet relevant to their primary use case. Workers handler, D1 query, R2 upload, KV read, etc. Keep it short (15-30 lines) and directly applicable to their situation.
5. **Resource links** -- gather 3-6 links to CF docs, case studies, or guides. Prefer links that match their specific use case over generic product pages.
6. **Before/after framing** -- for every product or capability in the deck, capture the customer's current pain point and how Cloudflare resolves it. This is the most important content rule: each section should answer "what was broken/painful before, and what does it look like after Cloudflare?" Use the meeting notes to ground this in the customer's actual words and situation. Generic feature descriptions are not acceptable -- everything must map to a real problem the customer mentioned.
7. **Platform-switching concern** -- if the customer raised concern about migrating away from AWS/GCP/Azure, use the `partner` slide to address it directly. Lead with "we're not replacing X, we sit in front of it." Use DNS routing as the entry point. Include startup credits if applicable.
8. **Workflow + Workers pairing** -- if the deck includes a `workflow` slide and the customer uses Lambda or any serverless compute, always follow the workflow slide with a `workers` slide. The wall clock vs CPU time diagram and Lambda comparison table directly answer the "why not just use Lambda" question without you needing to say it.
9. **AI Gateway pairing** -- if AI Gateway is a discussed product, always include both `ai-gateway` and `ai-gateway-code` slides back to back. The intro slide shows the routing diagram and feature cards; the code slide shows how routes are configured in TypeScript and JSON. Together they answer "what does it do?" and "how do I set it up?" Customise provider names and model identifiers in the diagram and code tabs to match the customer's actual stack (Bedrock model IDs, Vertex endpoint, etc.).

**Output of this step:** A complete JSON content file ready to be embedded in the app.

### Step 3: Build the app

Load these references in order:
1. `references/app-scaffold.md` -- project structure and configs
2. `references/design-system.md` -- design tokens and rules
3. `references/visual-elements.md` -- animated element patterns
4. `references/slide-templates.md` -- slide component code

Then:

1. **Create project directory** at `/Users/luuk/git/customer-decks/{slug}` where `{slug}` is a lowercase kebab-case version of the customer name (e.g., `acme-corp`).
2. **Scaffold the project** -- write all config files (package.json, tsconfig, vite config, wrangler config, tailwind, etc.) from the app-scaffold reference.
3. **Write the content data file** -- place the generated JSON content at `src/data/deck-content.ts` as a typed export.
4. **Write the slide components** -- only write components for slides that are included in this deck. Use the templates from slide-templates.md, populated with the actual content.
5. **Add dynamic elements** -- this is mandatory, not optional. Open `references/visual-elements.md` and check the "Combining Dynamic Elements" table. Pick at least one dynamic element per deck (minimum: title slide gets `SpikeChart` or `InfiniteTickerStrip`; code slides get `TerminalTypewriter`). A deck with no dynamic elements is a failure -- it will look like a static PDF and defeat the purpose.
6. **Write the presentation shell** -- the main Presentation component, route files, and layout from the scaffold reference.
7. **Customize wrangler.jsonc** -- set the Worker name to `customer-deck-{slug}` and the account ID to the luuk-dev account.

**Important design rules:**
- NEVER deviate from the design system. No custom colors, no different fonts, no ad-hoc spacing.
- Use the visual element catalog for all decorative and dynamic elements. Do not invent new patterns.
- Every animation must use Framer Motion or the CSS keyframes defined in the visual elements catalog. Use exact easing and duration values -- do not guess.
- **Dynamic elements are mandatory.** Every deck must have at least one animated element from the Dynamic Elements section of `visual-elements.md`. The goal is a "wow" effect -- something that makes the customer feel this was built specifically for them, not generated from a template.
- **Before/after framing is mandatory.** Every product card, section heading, and description must be written around the customer's specific pain. Lead with the problem ("You're currently seeing X..."), then explain what changes with Cloudflare. Do not write feature descriptions -- write problem/solution narratives grounded in the meeting notes.
- **WAF framing:** If the customer already has AWS WAF (or any WAF), do NOT frame Cloudflare WAF as filling a gap. Frame it as a replacement with specific advantages: no per-rule pricing, no Shield Advanced subscription, auto-updating managed rulesets, single dashboard for WAF + DDoS + bot management.
- **Architecture diagrams:** Use horizontal left-to-right pipeline flows. The Cloudflare Edge zone should be a rounded rectangle containing the processing steps laid out horizontally in sequence (e.g. `[Client] -> [ Step 1 -> Step 2 -> Step 3 ] -> [Origin]`). Do NOT stack steps vertically or use diamond shapes. Arrows flow left to right between each element.
- **Architecture edge zone label:** Render inside the zone rect near the top. Use `fontSize="9"`, `fontWeight="600"`, `letterSpacing="0.1em"`, `opacity: 0.8` with the CF orange color.
- No emojis anywhere in the deck content -- not in slide content, product names, topic labels, resource titles, or next steps. Exception: the footer "Built on Cloudflare 🧡 Developer Platform" uses the orange heart emoji.
- **Verify all customer stats.** Do NOT use AUM figures, user counts, or revenue numbers from meeting briefs unless they can be verified on the customer's public website. If the website doesn't show a number, don't use it. Getting a stat wrong in a customer-facing deck destroys credibility. Use verifiable facts: number of APIs, supported chains, uptime SLA, named integration partners, etc.
- **Title slide:** The customer name in the subtitle should be a clickable link to their website (opens in new tab). On hover, the customer name turns red. Add `customerUrl` to the title slide data.
- **Product/capability cards:** When linking to Cloudflare docs, make the entire card a clickable `<a>` element with `target="_blank"`. Add a small arrow icon in the top right corner. On hover: slight scale (1.02x), orange border glow, subtle shadow using Framer Motion `whileHover`.
- **Response blocks in interactive slides:** Use inline styles with explicit rgba values for border/background colors (e.g. `rgba(239,68,68,0.08)` for red background, `rgba(239,68,68,0.35)` for red border). Do NOT use Tailwind opacity modifiers like `bg-red-500/5` -- these are nearly invisible on the CF warm cream background. Response body text should use `var(--cf-text)` (the main text color), not `var(--cf-code-text)`.
- **Live request log alignment:** When a slide has a two-column layout with a response block on the left and a request log on the right, use `items-stretch` on the grid and `h-full flex flex-col` on the RequestLog container so both columns match height.
- **Footer:** Every deck should include "Built on Cloudflare 🧡 Developer Platform" centered below the slide navigation dots in the bottom bar. Use `font-mono text-[9px]` with `color: #000`.

### Step 4: Deploy

Load `references/deployment.md`.

1. **Install dependencies** -- run `npm install` in the project directory.
2. **Build** -- run `npx vite build` to produce the `dist/` folder.
3. **Deploy** -- run `npx wrangler deploy` targeting the luuk-dev account. Wrangler reads `wrangler.jsonc` and uploads the `dist/` folder as static assets.
4. **Verify** -- confirm the deployment succeeded and note the live URL.

### Step 5: Protect with Cloudflare Access

**This step is mandatory for every deck.** The deck URL must always be protected with two Access policies before sharing with the customer.

Load `references/deployment.md` for the full script. The steps in brief:

1. **Determine the customer's email domain** from the meeting brief or attendee list (e.g. `acme.com` from `alice@acme.com`).
2. **Enable Access** on the Worker's `workers.dev` URL via the API.
3. **Get the Access application ID** that was auto-created for the Worker.
4. **Get or create the "Allow Cloudflare" reusable policy** -- allows anyone with `@cloudflare.com`. This policy is shared across all decks; create it once, reuse it on every subsequent deck.
5. **Create a new "Allow {Customer Name}" reusable policy** -- allows anyone with `@{customer-domain}` emails ending in. Name it after the customer (e.g. `Allow Acme Corp`).
6. **Attach both policies** to the Access application in order: Cloudflare (precedence 1), customer (precedence 2).

Use `CLOUDFLARE_API_TOKEN` with **Access: Apps and Policies Write** permissions. See `references/deployment.md` for the exact `curl` commands and a copy-paste bash script.

**Result:** The deck is accessible only to `@cloudflare.com` and `@{customer-domain}` email addresses. Anyone else hits the Access login page and is blocked.

### Step 6: Output

Print the live URL and confirm Access is enabled. Example:

```
Deck deployed: https://customer-deck-acme-corp.luuk-dev.workers.dev

Protected by Cloudflare Access:
  - Allow Cloudflare (@cloudflare.com)
  - Allow Acme Corp (@acme.com)

Slides included:
1. Title -- Acme Corp / April 14, 2026
2. What We Discussed -- API gateway migration, edge caching
3. Recommended Products -- Workers, KV, Cache Rules
4. Architecture -- Edge-first API gateway with KV config store
5. Code Example -- Workers fetch handler with KV lookup
6. Resources -- 4 links to relevant docs
7. Next Steps -- 3 action items
```
