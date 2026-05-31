import type { ReactElement } from "react";
import { motion } from "framer-motion";
import type { BenefitsSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Small icon glyphs for each card (simple line SVG)
const iconMap: Record<string, ReactElement> = {
  approachable: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="10" cy="10" r="2.5" fill="currentColor" />
    </svg>
  ),
  expertise: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M3 14 L8 9 L11 12 L17 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="17" cy="6" r="1.5" fill="currentColor" />
    </svg>
  ),
  safer: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2 L17 5 V11 C17 14.5 14 17 10 18 C6 17 3 14.5 3 11 V5 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M7 10 L9 12 L13 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  experimentation: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M7 2 V8 L3 16 H17 L13 8 V2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="7" y1="2" x2="13" y2="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  collaboration: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="6" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="14" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M2 16 C2 14 4 12 6 12 C8 12 10 14 10 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M10 16 C10 14 12 12 14 12 C16 12 18 14 18 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  accessibility: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 8 V13 M6 11 L14 11 M7 17 L10 13 L13 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

function iconFor(label: string): ReactElement {
  const lower = label.toLowerCase();
  if (lower.includes("approachable")) return iconMap.approachable;
  if (lower.includes("expertise")) return iconMap.expertise;
  if (lower.includes("safer")) return iconMap.safer;
  if (lower.includes("experiment")) return iconMap.experimentation;
  if (lower.includes("collaboration")) return iconMap.collaboration;
  if (lower.includes("accessibility")) return iconMap.accessibility;
  return iconMap.approachable;
}

export function SlideBenefits({ slide }: { slide: BenefitsSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <motion.h2
          className="font-medium max-w-4xl"
          style={{
            fontSize: "clamp(2.2rem, 4.3vw, 3.2rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.035em",
            lineHeight: 1.12,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {slide.heading}
        </motion.h2>

        <motion.div
          className="mt-7 grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative rounded-xl p-5"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              <CornerBrackets />
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{
                    background: "var(--cf-orange-light)",
                    color: "var(--cf-orange)",
                    border: "1px solid var(--cf-orange-border)",
                  }}
                >
                  {iconFor(card.label)}
                </div>
                <div
                  className="font-mono text-[12px] uppercase mt-2"
                  style={{
                    color: "var(--cf-text-faint)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
              </div>
              <div
                className="font-medium mb-1.5"
                style={{
                  fontSize: "1.25rem",
                  color: "var(--cf-text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.label}
              </div>
              <div
                className="leading-relaxed"
                style={{ color: "var(--cf-text-muted)", fontSize: "1.05rem" }}
              >
                {card.description}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
