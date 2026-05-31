import { motion } from "framer-motion";
import type { DemoGoalSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { TerminalTypewriter } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};
const fadeRight = {
  hidden: { opacity: 0, x: -10 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideDemoGoal({ slide }: { slide: DemoGoalSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <motion.h2
          className="font-medium"
          style={{
            fontSize: "clamp(2.6rem, 5.2vw, 4rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading}
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Terminal showing the prompt */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              className="font-mono text-[12px] uppercase mb-2 inline-flex items-center gap-2"
              style={{ color: "var(--cf-orange)", letterSpacing: "0.12em" }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--cf-orange)" }}
              />
              user prompt
            </div>
            <TerminalTypewriter
              minHeight={160}
              fontSize="1.2rem"
              lines={[
                {
                  prefix: ">",
                  text: slide.prompt,
                  delay: 400,
                  color: "var(--cf-code-text)",
                },
                {
                  text: "planning...",
                  delay: 500,
                  color: "rgba(228,228,231,0.45)",
                },
              ]}
            />
          </motion.div>

          {/* Checklist of steps */}
          <motion.div
            className="md:col-span-5"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <div
              className="font-mono text-[12px] uppercase mb-3 inline-flex items-center gap-2"
              style={{
                color: "var(--cf-text-faint)",
                letterSpacing: "0.12em",
              }}
            >
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ background: "var(--cf-text-faint)" }}
              />
              what to watch for
            </div>

            <div className="flex flex-col gap-2">
              {slide.steps.map((step, i) => {
                const isApproval = step.toLowerCase().includes("approve");
                return (
                  <motion.div
                    key={i}
                    variants={fadeRight}
                    className="flex items-start gap-3 px-4 py-3 rounded-lg"
                    style={{
                      background: isApproval
                        ? "var(--cf-orange-light)"
                        : "var(--cf-bg-200)",
                      border: `1px solid ${isApproval ? "var(--cf-orange-border)" : "var(--cf-border)"}`,
                    }}
                  >
                    <div
                      className="flex-shrink-0 w-7 h-7 rounded-md flex items-center justify-center font-mono text-[13px] font-medium"
                      style={{
                        background: isApproval
                          ? "var(--cf-orange)"
                          : "var(--cf-bg-100)",
                        color: isApproval ? "white" : "var(--cf-text-muted)",
                        border: isApproval
                          ? "none"
                          : "1px solid var(--cf-border)",
                      }}
                    >
                      {i + 1}
                    </div>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        color: isApproval
                          ? "var(--cf-orange)"
                          : "var(--cf-text)",
                        fontWeight: isApproval ? 500 : 400,
                        letterSpacing: "-0.005em",
                      }}
                    >
                      {step}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
