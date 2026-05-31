import { motion } from "framer-motion";
import type { PositiveFrameSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Three peers diagram: human, agent plan, machine
function PeersDiagram() {
  return (
    <svg
      width="100%"
      height="120"
      viewBox="0 0 800 120"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="peer-arrow"
          markerWidth="8"
          markerHeight="6"
          refX="7"
          refY="3"
          orient="auto"
        >
          <polygon points="0,0 8,3 0,6" fill="var(--cf-text-faint)" opacity="0.7" />
        </marker>
      </defs>

      {/* Connecting lines */}
      <motion.line
        x1="180"
        y1="60"
        y2="60"
        stroke="var(--cf-text-faint)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        markerEnd="url(#peer-arrow)"
        initial={{ x2: 180 }}
        animate={{ x2: 320 }}
        transition={{ delay: 0.6, duration: 0.7, ease: "easeInOut" }}
      />
      <motion.line
        x1="480"
        y1="60"
        y2="60"
        stroke="var(--cf-text-faint)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        markerEnd="url(#peer-arrow)"
        initial={{ x2: 480 }}
        animate={{ x2: 620 }}
        transition={{ delay: 0.8, duration: 0.7, ease: "easeInOut" }}
      />

      {/* Human */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <circle cx="100" cy="38" r="14" fill="var(--cf-bg-200)" stroke="var(--cf-text)" strokeWidth="1.5" />
        <rect x="78" y="56" width="44" height="38" rx="6" fill="var(--cf-bg-200)" stroke="var(--cf-text)" strokeWidth="1.5" />
        <text x="100" y="110" textAnchor="middle" fontSize="13" fill="var(--cf-text)" fontFamily="Inter, system-ui">
          Human
        </text>
      </motion.g>

      {/* Agent plan */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <rect x="350" y="22" width="100" height="60" rx="8" fill="var(--cf-orange-light)" stroke="var(--cf-orange-border)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
        {/* Plan lines */}
        <line x1="362" y1="38" x2="438" y2="38" stroke="var(--cf-orange)" strokeWidth="1" opacity="0.6" />
        <line x1="362" y1="48" x2="430" y2="48" stroke="var(--cf-orange)" strokeWidth="1" opacity="0.6" />
        <line x1="362" y1="58" x2="438" y2="58" stroke="var(--cf-orange)" strokeWidth="1" opacity="0.6" />
        <line x1="362" y1="68" x2="424" y2="68" stroke="var(--cf-orange)" strokeWidth="1" opacity="0.6" />
        <text x="400" y="110" textAnchor="middle" fontSize="13" fill="var(--cf-orange)" fontFamily="Inter, system-ui">
          Agent plan
        </text>
      </motion.g>

      {/* Machine */}
      <motion.g
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <rect x="660" y="32" width="80" height="56" rx="6" fill="var(--cf-bg-200)" stroke="var(--cf-text)" strokeWidth="1.5" />
        <circle cx="676" cy="48" r="2.5" fill="var(--cf-orange)" />
        <line x1="690" y1="48" x2="730" y2="48" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <line x1="676" y1="68" x2="730" y2="68" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <line x1="676" y1="78" x2="730" y2="78" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <text x="700" y="110" textAnchor="middle" fontSize="13" fill="var(--cf-text)" fontFamily="Inter, system-ui">
          Machine
        </text>
      </motion.g>
    </svg>
  );
}

export function SlidePositiveFrame({ slide }: { slide: PositiveFrameSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <motion.h2
          className="font-medium max-w-4xl"
          style={{
            fontSize: "clamp(2.2rem, 4.4vw, 3.3rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.035em",
            lineHeight: 1.12,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading}
        </motion.h2>

        <motion.p
          className="mt-4 max-w-3xl leading-relaxed"
          style={{ fontSize: "1.35rem", color: "var(--cf-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          {slide.body}
        </motion.p>

        {/* Three peers diagram */}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <PeersDiagram />
        </motion.div>

        {/* Benefit cards */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.cards.map((card, i) => {
            const isHighlight = card.label === "Collaborative";
            return (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative rounded-xl p-5"
                style={{
                  background: "var(--cf-bg-200)",
                  border: `1px solid ${isHighlight ? "var(--cf-orange-border)" : "var(--cf-border)"}`,
                }}
              >
                <CornerBrackets />
                <div
                  className="font-medium mb-1.5"
                  style={{
                    fontSize: "1.3rem",
                    color: isHighlight ? "var(--cf-orange)" : "var(--cf-text)",
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
            );
          })}
        </motion.div>

        {/* Highlight quote */}
        <motion.div
          className="mt-6 inline-flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <span
            className="font-mono text-[12px] uppercase px-2.5 py-1 rounded"
            style={{
              background: "var(--cf-orange-light)",
              color: "var(--cf-orange)",
              letterSpacing: "0.12em",
            }}
          >
            highlight
          </span>
          <span
            className="font-medium"
            style={{
              color: "var(--cf-orange)",
              fontSize: "1.4rem",
              letterSpacing: "-0.01em",
            }}
          >
            {slide.highlight}
          </span>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
