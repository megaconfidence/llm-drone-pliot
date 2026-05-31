import { motion } from "framer-motion";
import type { CapabilitiesSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets, LoopDiagram } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideCapabilities({ slide }: { slide: CapabilitiesSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <motion.h2
          className="font-medium max-w-4xl"
          style={{
            fontSize: "clamp(2.3rem, 4.5vw, 3.4rem)",
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

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Capability cards */}
          <motion.div
            className="md:col-span-7 grid grid-cols-2 gap-3"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {slide.capabilities.map((cap, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative rounded-xl p-4"
                style={{
                  background: "var(--cf-bg-200)",
                  border: "1px solid var(--cf-border)",
                }}
              >
                <CornerBrackets />
                <div
                  className="font-mono text-[11px] uppercase mb-2"
                  style={{
                    color: "var(--cf-orange)",
                    letterSpacing: "0.12em",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className="font-medium mb-1.5"
                  style={{
                    fontSize: "1.3rem",
                    color: "var(--cf-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {cap.label}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--cf-text-muted)" }}
                >
                  {cap.description}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Loop diagram */}
          <motion.div
            className="md:col-span-5 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <LoopDiagram steps={slide.loop} />
          </motion.div>
        </div>

        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <p
            className="font-medium"
            style={{
              fontSize: "1.4rem",
              color: "var(--cf-text)",
              letterSpacing: "-0.01em",
            }}
          >
            {slide.closing}
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
