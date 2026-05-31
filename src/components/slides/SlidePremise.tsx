import { motion } from "framer-motion";
import type { PremiseSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlidePremise({ slide }: { slide: PremiseSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full flex flex-col items-center text-center">
        <motion.h2
          className="font-medium max-w-5xl"
          style={{
            fontSize: "clamp(2.4rem, 4.7vw, 3.7rem)",
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
          className="mt-5 max-w-3xl leading-relaxed"
          style={{ fontSize: "1.4rem", color: "var(--cf-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {slide.body}
        </motion.p>

        {/* Chat box -> structured plan illustration */}
        <motion.div
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {/* Chat box */}
          <div
            className="relative rounded-xl p-5 text-left"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-border)",
            }}
          >
            <CornerBrackets />
            <div
              className="font-mono text-[12px] uppercase mb-2"
              style={{
                color: "var(--cf-text-faint)",
                letterSpacing: "0.12em",
              }}
            >
              chat box
            </div>
            <div
              className="font-mono leading-relaxed"
              style={{ color: "var(--cf-text)", fontSize: "1.05rem" }}
            >
              "Please fly the drone in a small square,
              <br />
              face the audience, then land."
            </div>
            <div
              className="mt-3 inline-block px-2 py-0.5 rounded font-mono text-[12px]"
              style={{
                background: "var(--cf-bg-300)",
                color: "var(--cf-text-muted)",
              }}
            >
              user message
            </div>
          </div>

          {/* Structured plan */}
          <div
            className="relative rounded-xl p-5 text-left"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-orange-border)",
            }}
          >
            <CornerBrackets />
            <div
              className="font-mono text-[12px] uppercase mb-2"
              style={{ color: "var(--cf-orange)", letterSpacing: "0.12em" }}
            >
              typed plan
            </div>
            <div
              className="font-mono leading-relaxed space-y-0.5"
              style={{ color: "var(--cf-text)", fontSize: "1.05rem" }}
            >
              <div>1. takeoff()</div>
              <div>2. forward(50)</div>
              <div>3. cw(90)</div>
              <div>4. ...</div>
              <div>5. land()</div>
            </div>
            <div
              className="mt-3 inline-block px-2 py-0.5 rounded font-mono text-[12px]"
              style={{
                background: "var(--cf-orange-light)",
                color: "var(--cf-orange)",
              }}
            >
              constrained tool calls
            </div>
          </div>
        </motion.div>

        {/* Three cards */}
        <motion.div
          className="mt-8 grid grid-cols-3 gap-4 max-w-4xl w-full"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.cards.map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative rounded-xl px-5 py-4 text-left"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              <CornerBrackets />
              <div
                className="font-mono text-[12px] uppercase mb-2"
                style={{
                  color: "var(--cf-orange)",
                  letterSpacing: "0.12em",
                }}
              >
                {String(i + 1).padStart(2, "0")} / {card.label}
              </div>
              <div
                className="leading-relaxed"
                style={{ color: "var(--cf-text)", fontSize: "1.05rem" }}
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
