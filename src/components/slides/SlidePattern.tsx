import { motion } from "framer-motion";
import type { PatternSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow, CornerBrackets, LoopDiagram } from "../VisualElements";

export function SlidePattern({ slide }: { slide: PatternSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <Eyebrow>{slide.eyebrow}</Eyebrow>

        <motion.h2
          className="font-medium"
          style={{
            fontSize: "clamp(2.2rem, 4.4vw, 3.3rem)",
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Loop diagram (left) */}
          <motion.div
            className="md:col-span-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <LoopDiagram steps={slide.loop.map((s) => s.label)} />
          </motion.div>

          {/* Step descriptions (right) */}
          <div className="md:col-span-6 flex flex-col gap-3">
            {slide.loop.map((step, i) => (
              <motion.div
                key={i}
                className="rounded-lg p-3.5"
                style={{
                  background: "var(--cf-bg-200)",
                  border: "1px solid var(--cf-border)",
                }}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                <div
                  className="font-medium mb-1"
                  style={{
                    fontSize: "1.2rem",
                    color: "var(--cf-text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {step.label}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--cf-text-muted)" }}
                >
                  {step.description}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Formula + environments */}
        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <div
            className="relative rounded-full px-5 py-2.5 font-mono text-[15px]"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-orange-border)",
              color: "var(--cf-text)",
              letterSpacing: "0.02em",
            }}
          >
            <CornerBrackets />
            model{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> tools{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> state{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> loop{" "}
            <span style={{ color: "var(--cf-orange)" }}>+</span> environment{" "}
            <span style={{ color: "var(--cf-orange)" }}>=</span>{" "}
            <span style={{ color: "var(--cf-orange)", fontWeight: 600 }}>
              agent
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="font-mono text-[12px] uppercase"
              style={{
                color: "var(--cf-text-faint)",
                letterSpacing: "0.12em",
              }}
            >
              environments:
            </span>
            {slide.environments.map((env, i) => (
              <span
                key={i}
                className="font-mono text-[13px] px-2.5 py-1 rounded-full"
                style={{
                  background: "var(--cf-bg-200)",
                  border: "1px solid var(--cf-border)",
                  color: "var(--cf-text-muted)",
                }}
              >
                {env}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
