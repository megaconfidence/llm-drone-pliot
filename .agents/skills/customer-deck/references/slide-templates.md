# Slide Templates

Complete TSX components for each slide type. These reference the visual elements from `visual-elements.md` and render the data model from `data-model.md`.

All slide components receive their content as props and are wrapped in the `SlideWrapper` layout component.

## SlideWrapper

Every slide is wrapped in this. It provides the background and centered content area.

```tsx
// src/components/SlideWrapper.tsx
import { motion } from "framer-motion";

interface SlideWrapperProps {
  children: React.ReactNode;
  background?: "dots" | "grid" | "plain";
}

export function SlideWrapper({ children, background = "grid" }: SlideWrapperProps) {
  return (
    <div className="w-full h-full flex items-center justify-center relative" style={{ background: "var(--cf-bg-100)" }}>
      {background === "dots" && <DotPattern />}
      {background === "grid" && <GridOverlay />}
      <motion.div
        className="w-full h-full flex items-center justify-center"
        style={{ maxWidth: "1280px", paddingLeft: "2%", paddingRight: "2%" }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
      >
        {children}
      </motion.div>
    </div>
  );
}
```

## 1. Title Slide

```tsx
// src/components/slides/SlideTitle.tsx
import { motion } from "framer-motion";
import type { TitleSlide, DeckMeta } from "../data/types";

interface SlideTitleProps {
  slide: TitleSlide;
  meta: DeckMeta;
}

export function SlideTitle({ slide, meta }: SlideTitleProps) {
  return (
    <SlideWrapper background="dots">
      <div className="flex flex-col items-center justify-center gap-8 text-center">
        {/* CF Logo large */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <CloudflareLogo height={36} />
        </motion.div>

        {/* Customer name with shine effect */}
        <h1
          className="hero-shine font-medium text-center"
          style={{
            fontSize: "clamp(2.8rem, 5.5vw, 4.5rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
            maxWidth: "900px",
          }}
        >
          {slide.customerName}
        </h1>

        {/* Subtitle */}
        {slide.subtitle && (
          <motion.p
            className="font-mono text-sm uppercase"
            style={{ color: "var(--cf-text-muted)", letterSpacing: "0.08em" }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.subtitle}
          </motion.p>
        )}

        {/* Meta info */}
        <motion.div
          className="flex items-center gap-3 font-mono text-[11px]"
          style={{ color: "var(--cf-text-faint)", letterSpacing: "0.03em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <span>{meta.preparedBy}</span>
          <span style={{ color: "var(--cf-border)" }}>|</span>
          <span>{meta.preparedByTitle}</span>
          <span style={{ color: "var(--cf-border)" }}>|</span>
          <span>{meta.meetingDate}</span>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 2. Recap Slide

```tsx
// src/components/slides/SlideRecap.tsx
import { motion } from "framer-motion";
import type { RecapSlide } from "../data/types";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SlideRecap({ slide }: { slide: RecapSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8">
        {/* Left: Summary */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2
            className="font-medium mb-6"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            What We Discussed
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--cf-text-muted)" }}>
            {slide.summary}
          </p>
        </motion.div>

        {/* Right: Topic pills */}
        <motion.div className="flex flex-wrap gap-3" variants={stagger} initial="hidden" animate="show">
          {slide.topics.map((topic, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="px-4 py-2.5 rounded-xl"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              <span className="text-sm font-medium" style={{ color: "var(--cf-text)" }}>
                {topic.emoji && <span className="mr-2">{topic.emoji}</span>}
                {topic.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 3. Products Slide

```tsx
// src/components/slides/SlideProducts.tsx
import { motion } from "framer-motion";
import type { ProductsSlide } from "../data/types";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SlideProducts({ slide }: { slide: ProductsSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8">
        <motion.h2
          className="font-medium mb-8"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading || "Recommended for You"}
        </motion.h2>

        <motion.div
          className="grid gap-5"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(280px, 1fr))`,
          }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.products.map((product, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div
                className="relative h-full"
                style={{
                  background: "var(--cf-bg-200)",
                  border: "1px solid var(--cf-border)",
                  borderRadius: "12px",
                }}
              >
                <CornerBrackets />
                <OrangeStripe />
                <div className="p-6 pt-7">
                  <div className="flex items-center gap-2.5 mb-3">
                    <ProductBadge emoji={product.emoji} label={product.emoji} />
                    <h3
                      className="font-medium"
                      style={{ fontSize: "1.1rem", color: "var(--cf-text)", letterSpacing: "-0.02em" }}
                    >
                      {product.name}
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--cf-text-muted)" }}>
                    {product.description}
                  </p>
                  {product.docUrl && (
                    <a
                      href={product.docUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-medium transition-opacity hover:opacity-70"
                      style={{ color: "var(--cf-orange)" }}
                    >
                      View docs
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M7 17L17 7" />
                        <path d="M7 7h10v10" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 4. Architecture Slide

```tsx
// src/components/slides/SlideArchitecture.tsx
import { motion } from "framer-motion";
import type { ArchitectureSlide } from "../data/types";

export function SlideArchitecture({ slide }: { slide: ArchitectureSlide }) {
  // Calculate grid dimensions from node positions
  const maxRow = Math.max(...slide.nodes.map((n) => n.position.row));
  const maxCol = Math.max(...slide.nodes.map((n) => n.position.col));

  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8">
        <motion.h2
          className="font-medium mb-3"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading || "Architecture Overview"}
        </motion.h2>

        {slide.description && (
          <motion.p
            className="text-sm mb-10 max-w-xl"
            style={{ color: "var(--cf-text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {slide.description}
          </motion.p>
        )}

        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/*
            Render the architecture as a CSS grid.
            Each node is placed at its grid position.
            Connections are drawn as SVG overlays or implied by vertical/horizontal adjacency.

            For simplicity, use a grid layout with nodes placed via gridRow/gridColumn.
            Between rows, render arrow connectors.
          */}
          <div
            className="inline-grid gap-6 items-center justify-items-center"
            style={{
              gridTemplateColumns: `repeat(${maxCol + 1}, minmax(140px, 200px))`,
              gridTemplateRows: `repeat(${maxRow * 2 + 1}, auto)`,
            }}
          >
            {slide.nodes.map((node) => (
              <div
                key={node.id}
                style={{
                  gridColumn: node.position.col + 1,
                  gridRow: node.position.row * 2 + 1,
                }}
              >
                <DiagramNode
                  label={node.label}
                  sublabel={node.sublabel}
                  isCloudflare={node.isCloudflare}
                />
              </div>
            ))}

            {/* Render arrows between connected nodes in adjacent rows */}
            {slide.connections
              .filter((conn) => {
                const from = slide.nodes.find((n) => n.id === conn.from);
                const to = slide.nodes.find((n) => n.id === conn.to);
                return from && to && to.position.row === from.position.row + 1;
              })
              .map((conn, i) => {
                const to = slide.nodes.find((n) => n.id === conn.to)!;
                return (
                  <div
                    key={`arrow-${i}`}
                    className="flex flex-col items-center gap-0.5"
                    style={{
                      gridColumn: to.position.col + 1,
                      gridRow: to.position.row * 2,
                    }}
                  >
                    <Arrow direction="down" />
                    {conn.label && (
                      <span className="font-mono text-[9px]" style={{ color: "var(--cf-text-faint)", letterSpacing: "0.03em" }}>
                        {conn.label}
                      </span>
                    )}
                  </div>
                );
              })}
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

**Note:** The architecture diagram is intentionally simple -- CSS grid with nodes and vertical arrows. This covers 90% of cases (client -> edge -> origin). For more complex topologies, the agent can arrange nodes in a wider grid with horizontal arrows between same-row nodes.

## 5. Code Slide

```tsx
// src/components/slides/SlideCode.tsx
import { motion } from "framer-motion";
import type { CodeSlide } from "../data/types";

export function SlideCode({ slide }: { slide: CodeSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8 flex flex-col items-center">
        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2
            className="font-medium mb-3"
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.2,
            }}
          >
            {slide.heading || "Code Example"}
          </h2>

          {slide.description && (
            <p className="text-sm mb-6" style={{ color: "var(--cf-text-muted)" }}>
              {slide.description}
            </p>
          )}
        </motion.div>

        <motion.div
          className="w-full max-w-3xl"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <CodeBlock
            language={slide.language}
            filename={slide.filename}
            code={slide.code}
          />
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 6. Resources Slide

```tsx
// src/components/slides/SlideResources.tsx
import { motion } from "framer-motion";
import type { ResourcesSlide } from "../data/types";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SlideResources({ slide }: { slide: ResourcesSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8">
        <motion.h2
          className="font-medium mb-8"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading || "Resources"}
        </motion.h2>

        <motion.div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.resources.map((resource, i) => (
            <motion.a
              key={i}
              variants={fadeUp}
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block transition-colors"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
                borderRadius: "12px",
                textDecoration: "none",
              }}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    {resource.emoji && <span className="text-base">{resource.emoji}</span>}
                    <h3
                      className="font-medium text-sm"
                      style={{ color: "var(--cf-text)", letterSpacing: "-0.01em" }}
                    >
                      {resource.title}
                    </h3>
                  </div>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--cf-orange)" }}
                  >
                    <path d="M7 17L17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "var(--cf-text-muted)" }}>
                  {resource.description}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 7. Next Steps Slide

```tsx
// src/components/slides/SlideNextSteps.tsx
import { motion } from "framer-motion";
import type { NextStepsSlide } from "../data/types";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export function SlideNextSteps({ slide }: { slide: NextStepsSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full px-8 max-w-3xl mx-auto">
        <motion.h2
          className="font-medium mb-8"
          style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading || "Next Steps"}
        </motion.h2>

        <motion.div className="flex flex-col gap-4" variants={stagger} initial="hidden" animate="show">
          {slide.steps.map((step, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex items-start gap-4 p-5 rounded-xl"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              {/* Step number / checkbox visual */}
              <div
                className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center font-mono text-xs font-medium"
                style={{
                  background: "var(--cf-orange-light)",
                  color: "var(--cf-orange)",
                  border: "1px solid var(--cf-orange-border)",
                }}
              >
                {i + 1}
              </div>

              <div className="flex-1">
                <p className="text-sm font-medium mb-1" style={{ color: "var(--cf-text)" }}>
                  {step.description}
                </p>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase" style={{ color: "var(--cf-text-faint)", letterSpacing: "0.05em" }}>
                    Owner: {step.owner}
                  </span>
                  {step.targetDate && (
                    <>
                      <span style={{ color: "var(--cf-border)" }}>|</span>
                      <span className="font-mono text-[10px]" style={{ color: "var(--cf-text-faint)", letterSpacing: "0.05em" }}>
                        Target: {step.targetDate}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
```

## 8. Contact / CTA Slide

Renders a team card row (one card per Cloudflare person on the deal), a heading, an intro line, and optional CTA link buttons. Always use `background="dots"`.

**Team cards** -- each card shows: initials avatar (orange tint), name, title, and a LinkedIn "Connect" link. Initials are derived from `name.split(" ").map(n => n[0]).join("").slice(0, 2)`.

**Important:** Never leave `team[]` empty. Always look up who from Cloudflare was on the meeting and include them all with correct LinkedIn URLs.

```tsx
// src/components/slides/SlideContact.tsx
import { motion } from "framer-motion";
import type { ContactSlide, DeckMeta } from "../data/types";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp  = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } } };

export function SlideContact({ slide, meta }: { slide: ContactSlide; meta: DeckMeta }) {
  const team = slide.team ?? [];
  return (
    <SlideWrapper background="dots">
      <div className="flex flex-col items-center justify-center gap-7 text-center w-full">
        <CloudflareLogo height={28} />

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <h2 className="font-medium mb-2"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "var(--cf-text)", letterSpacing: "-0.04em" }}>
            {slide.heading || "Let's Get Started"}
          </h2>
          <p className="text-sm" style={{ color: "var(--cf-text-muted)", maxWidth: 480 }}>
            Reach out to any of us -- we're all across this conversation and happy to dig deeper.
          </p>
        </motion.div>

        {/* Team cards */}
        {team.length > 0 && (
          <motion.div className="flex gap-4 justify-center" variants={stagger} initial="hidden" animate="show">
            {team.map((member, i) => (
              <motion.div key={i} variants={fadeUp}
                className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl"
                style={{ background: "var(--cf-bg-200)", border: "1px solid var(--cf-border)", minWidth: 160 }}>
                {/* Initials avatar */}
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm"
                  style={{ background: "var(--cf-orange-light)", color: "var(--cf-orange)", border: "1px solid var(--cf-orange-border)" }}>
                  {member.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <div className="font-medium text-sm" style={{ color: "var(--cf-text)" }}>{member.name}</div>
                  <div className="text-[11px] mt-0.5" style={{ color: "var(--cf-text-muted)" }}>{member.title}</div>
                </div>
                {member.linkedin && (
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium hover:opacity-70"
                    style={{ color: "var(--cf-orange)" }}>
                    {/* LinkedIn icon */}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                      <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
                    </svg>
                    Connect
                  </a>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* CTA links */}
        {slide.links && slide.links.length > 0 && (
          <motion.div className="flex items-center gap-3"
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
            {slide.links.map((link, i) => (
              <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm hover:opacity-90"
                style={i === 0
                  ? { background: "var(--cf-orange)", color: "#fff" }
                  : { color: "var(--cf-orange)", border: "1px solid var(--cf-orange-border)" }}>
                {link.label}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </a>
            ))}
          </motion.div>
        )}
      </div>
    </SlideWrapper>
  );
}
```

**Rules:**
- Always populate `team[]` from the meeting attendees. Never leave it empty or use placeholder names.
- The Cloudflare team on most of Luuk's NEUR accounts: August Hjorth (AE), Margot Schipper (AE), Luuk Hofman (SE). Add others if they appear in the calendar invite or brief.
- Remove the `meta.preparedBy` single-person display -- team cards replace it.
- `links[]` should contain at most 1-2 items. Startup program link if applicable; no generic "Book a Follow-Up" unless you have a real calendly/booking URL.

## 9. Workflow Slide

Interactive three-column layout: `WorkflowDiagram` (visible on tab 0 only) + dark code editor with file tabs + description sidebar. See `visual-elements.md` element 9 for full implementation.

Always includes:
- **Feature pills row** below heading: "Step-based execution", "Zero-config state", "Event-driven by default"
- **Tab 0** = full pipeline overview with all diagram steps visible and no highlight
- **Subsequent tabs** = individual steps with `diagramHighlight` set to the matching node label

```tsx
// src/components/slides/SlideWorkflow.tsx
// Full implementation in visual-elements.md element 9b (SlideWorkflow).
// Key structure:
//   <SlideWrapper background="grid">
//     heading + subtitle
//     feature pills (Step-based execution | Zero-config state | Event-driven by default)
//     three-column: [diagram (tab 0 only)] [code editor] [step sidebar]
//   </SlideWrapper>
```

**deck-content.ts shape:**
```ts
{
  type: "workflow",
  heading: "Document Processing Pipeline",
  steps: [
    {
      title: "Full pipeline overview",
      description: "R2 upload triggers a durable Workflow. Each step retries independently.",
      language: "typescript",
      filename: "pipeline.ts",
      diagramSteps: [
        { type: "do", label: "R2 upload trigger" },
        { type: "do", label: "fetch from R2" },
        { type: "do", label: "chunk document" },
        { type: "do", label: "embed with Workers AI" },
        { type: "do", label: "upsert to Vectorize" },
      ],
      code: `// Full WorkflowEntrypoint implementation...`,
    },
    {
      title: "R2 upload trigger",
      description: "A Worker receives the upload event and creates a new Workflow instance.",
      language: "typescript",
      filename: "trigger.ts",
      diagramHighlight: "R2 upload trigger",
      code: `// trigger Worker code...`,
    },
    // ... one tab per step
  ],
},
```

---

## 10. Workers Slide

Standalone slide for "why Workers/Workflows over Lambda". Always place immediately after a `workflow` slide when the customer comes from a Lambda/serverless background.

Structure (top to bottom):
1. Heading + subtitle ("Workflows are backed by Workers")
2. Full-width 3×2 benefit grid with Cloudflare SVG icons
3. Bottom row: `WallClockDiagram` (flex-1) + Lambda comparison table (320px fixed)

See `visual-elements.md` elements 11 and 12 for full implementation.

```tsx
// src/components/slides/SlideWorkers.tsx
// No props needed -- content is hardcoded from workers.cloudflare.com.
// Customise the comparison table left column to match the customer's stack
// (Lambda, Azure Functions, GCP Cloud Run, etc.)
export function SlideWorkers() { ... }
```

**deck-content.ts shape:**
```ts
{ type: "workers" }
// No additional fields -- all content is derived from workers.cloudflare.com copy.
```

---

## 11. Partner / Strategic Positioning Slide

Used to address platform-switching concerns head-on. Shows Cloudflare as a layer in front of existing infrastructure (not a replacement), with a credits callout and a numbered progression of steps.

```tsx
// deck-content.ts shape:
{
  type: "partner",
  heading: "Cloudflare in Front of AWS",
  body: "The approach is not to replace AWS -- it's to put Cloudflare in front of it...",
  credits: "$100,000 in Cloudflare Startup Program credits to get started",
  pillars: [
    { label: "Start with DNS routing",       description: "Point your domain through Cloudflare. Cloudflare WAF replaces AWS WAF in the same step." },
    { label: "Add AI Gateway in front of Bedrock", description: "One endpoint swap. Unified observability, caching, automatic failover." },
    { label: "Move workloads to the edge",   description: "Progressively move specific workloads -- document processing, inference -- as they make sense." },
  ],
}
```

**When to use:** When a customer raises concern about platform switching or migration risk. Always leads with "we're not replacing X, we're sitting in front of it." The credits callout box uses `var(--cf-orange-light)` background with `var(--cf-orange-border)` border.

---

## 12. AI Gateway Slide

Product-specific slide for AI Gateway. Steals layout from workers.cloudflare.com/product/ai-gateway. No props -- all content hardcoded. Always place after `architecture` slide, before `ai-gateway-code`.

Structure (top to bottom):
1. Orange eyebrow + heading ("Dynamic Routing Between Models") + subtitle
2. **3-column feature card grid** -- same bordered corner-bracket pattern as Workers benefit grid:
   - Reduce Costs & Latency (semantic caching)
   - Dynamic Routing & Fallback (Bedrock primary, Vertex fallback, auto-failover)
   - Full Observability (token counts, cost per call, CSSF audit trail)
3. **Animated SVG routing diagram** on a dot-grid background:
   - Left: Fundcraft App panel with 3 route rows (all active/orange)
   - Center: AI Gateway box (dashed animated orange border)
   - Right: AWS Bedrock pill (solid orange path + traveling dot), Vertex AI pill (dashed fallback), cached response pill
   - Arrows flow FROM Cloudflare edge outward to providers

```tsx
// src/components/slides/SlideAIGateway.tsx
export function SlideAIGateway() { ... }
// No props. Customise the provider pill labels and route row labels per customer.
```

**deck-content.ts shape:**
```ts
{ type: "ai-gateway" }
```

**Rules:**
- All three route rows in the left panel must be styled identically (orange tint, orange border, orange text). Do not style any row as inactive.
- Provider pill text (name + role label) must use `dominantBaseline="middle"` on both text elements for vertical centering.
- Arrows flow FROM gateway TO providers, never the reverse.
- The diagram SVG should use `viewBox="0 0 900 210"` with `maxHeight: 210`.

---

## 13. AI Gateway Code Slide

Follow-up to the AI Gateway intro slide. Shows how routing is configured via code and JSON. No props. Always place immediately after `ai-gateway`.

Structure (top to bottom):
1. Orange eyebrow + heading ("Easy to Configure, Easy to Maintain") + subtitle
2. **3 feature pills**: No redeploys, Provider-agnostic, Weighted failover
3. **Full-height dark code editor** with two file tabs:
   - `rate-models.ts` -- TypeScript showing how to rate providers by latency + cost and dynamically pick primary
   - `route-config.json` -- JSON routing config with weighted failover, per-provider conditions, caching, and rate limits

```tsx
// src/components/slides/SlideAIGateway.tsx
export function SlideAIGatewayCode() { ... }
// Both SlideAIGateway and SlideAIGatewayCode export from the same file.
// CODE_TABS, HighlightedCode, and tokenize() are shared between them.
```

**deck-content.ts shape:**
```ts
{ type: "ai-gateway-code" }
```

**Rules:**
- The code editor must be `flex-1` with `min-h-0 overflow-hidden` to fill the remaining slide height.
- Tabs use `filename` as the label (not a human title). Keep it short: `rate-models.ts`, `route-config.json`.
- The takeaway must be clear from the content: routes are lines of JSON, not infrastructure. Change them from the dashboard or API with no redeploy.
- Customise `rate-models.ts` to reference the customer's actual providers (Bedrock, Vertex, etc.) and model names.

---

## Slide Renderer

Maps `SlideContent.type` to the right component. Update this every time a new slide type is added:

```tsx
// src/components/SlideRenderer.tsx
import type { SlideContent, DeckMeta } from "../data/types";

export function SlideRenderer({ slide, meta }: { slide: SlideContent; meta: DeckMeta }) {
  switch (slide.type) {
    case "title":
      return <SlideTitle slide={slide} meta={meta} />;
    case "recap":
      return <SlideRecap slide={slide} />;
    case "partner":
      return <SlidePartner slide={slide} />;
    case "products":
      return <SlideProducts slide={slide} />;
    case "ai-gateway":
      return <SlideAIGateway />;
    case "ai-gateway-code":
      return <SlideAIGatewayCode />;
    case "architecture":
      return <SlideArchitecture slide={slide} />;
    case "workflow":
      return <SlideWorkflow slide={slide} />;
    case "workers":
      return <SlideWorkers />;
    case "resources":
      return <SlideResources slide={slide} />;
    case "next-steps":
      return <SlideNextSteps slide={slide} />;
    case "contact":
      return <SlideContact slide={slide} meta={meta} />;
    default:
      return null;
  }
}
```
