import { motion } from "framer-motion";
import type { ProgressionSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow, CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};
const fadeIn = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideProgression({ slide }: { slide: ProgressionSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <Eyebrow>{slide.eyebrow}</Eyebrow>

        <motion.h2
          className="font-medium max-w-4xl"
          style={{
            fontSize: "clamp(2.3rem, 4.6vw, 3.5rem)",
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

        {/* Browser frame containing the progression */}
        <motion.div
          className="mt-10 relative rounded-2xl p-6"
          style={{
            background: "var(--cf-bg-200)",
            border: "1px solid var(--cf-border)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 mb-5">
            <div className="flex gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#E5E7EB" }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#E5E7EB" }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#E5E7EB" }}
              />
            </div>
            <span
              className="ml-3 font-mono text-[12px]"
              style={{
                color: "var(--cf-text-faint)",
                letterSpacing: "0.08em",
              }}
            >
              the chat box era
            </span>
          </div>

          {/* Stages */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-3 relative"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {slide.stages.map((stage, i) => {
              const isLast = i === slide.stages.length - 1;
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  className="relative"
                  style={isLast ? { transform: "translateY(-8px)" } : undefined}
                >
                  <div
                    className="relative rounded-xl p-4 h-full"
                    style={{
                      background: isLast ? "var(--cf-orange-light)" : "var(--cf-bg-100)",
                      border: `1px solid ${isLast ? "var(--cf-orange-border)" : "var(--cf-border)"}`,
                      boxShadow: isLast
                        ? "0 8px 24px -8px rgba(61, 116, 255, 0.3)"
                        : "none",
                    }}
                  >
                    <CornerBrackets />
                    <div
                      className="font-mono text-[11px] mb-2 uppercase"
                      style={{
                        color: isLast ? "var(--cf-orange)" : "var(--cf-text-faint)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      stage {String(i + 1).padStart(2, "0")}
                    </div>
                    <div
                      className="font-medium mb-1.5"
                      style={{
                        fontSize: "1.2rem",
                        color: isLast ? "var(--cf-orange)" : "var(--cf-text)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {stage.label}
                    </div>
                    <div
                      className="text-sm leading-relaxed"
                      style={{ color: "var(--cf-text-muted)" }}
                    >
                      {stage.description}
                    </div>
                    {isLast && (
                      <div
                        className="absolute -top-3 -right-3 px-2 py-0.5 rounded-full font-mono text-[10px]"
                        style={{
                          background: "var(--cf-orange)",
                          color: "white",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                        }}
                      >
                        leaves the chat box
                      </div>
                    )}
                  </div>

                  {/* Connector arrow */}
                  {!isLast && (
                    <div
                      className="hidden md:flex absolute top-1/2 -right-2.5 z-10 items-center"
                      style={{ transform: "translateY(-50%)" }}
                    >
                      <svg width="14" height="10" viewBox="0 0 14 10">
                        <polygon
                          points="0,2 8,2 8,0 14,5 8,10 8,8 0,8"
                          fill="var(--cf-text-faint)"
                          opacity="0.5"
                        />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Formula */}
        <motion.div
          className="mt-7 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <div
            className="font-mono text-[15px] px-5 py-2.5 rounded-full"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-border)",
              color: "var(--cf-text-muted)",
              letterSpacing: "0.04em",
            }}
          >
            model{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> tools{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> state{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> loop{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> environment{" "}
            <span style={{ color: "var(--cf-orange)" }}>=</span>{" "}
            <span style={{ color: "var(--cf-orange)" }}>world agent</span>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
