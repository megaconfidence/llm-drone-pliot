import { motion } from "framer-motion";
import type { UseCasesSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow, CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.4 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideUseCases({ slide }: { slide: UseCasesSlide }) {
  const hasSafetyRail = slide.safetyRail && slide.safetyRail.length > 0;
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        {slide.eyebrow && <Eyebrow>{slide.eyebrow}</Eyebrow>}

        <motion.h2
          className="font-medium max-w-4xl"
          style={{
            fontSize: "clamp(2.1rem, 4vw, 3rem)",
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

        {/* Card grid */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
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
              <div
                className="font-mono text-[12px] uppercase mb-2"
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
                  fontSize: "1.25rem",
                  color: "var(--cf-text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {card.label}
              </div>
              <div
                className="text-sm leading-relaxed"
                style={{ color: "var(--cf-text-muted)" }}
              >
                {card.description}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Safety rail (only for use-cases-2) */}
        {hasSafetyRail && (
          <motion.div
            className="mt-6 relative rounded-xl p-4"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-orange-border)",
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <div
                className="font-mono text-[12px] uppercase inline-flex items-center gap-2 mr-2"
                style={{
                  color: "var(--cf-orange)",
                  letterSpacing: "0.14em",
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "var(--cf-orange)" }}
                />
                safety rail
              </div>
              {slide.safetyRail!.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {i > 0 && (
                    <svg width="14" height="8" viewBox="0 0 14 8">
                      <line
                        x1="0"
                        y1="4"
                        x2="8"
                        y2="4"
                        stroke="var(--cf-orange)"
                        strokeWidth="1"
                        opacity="0.6"
                      />
                      <polygon
                        points="8,1 14,4 8,7"
                        fill="var(--cf-orange)"
                        opacity="0.6"
                      />
                    </svg>
                  )}
                  <span
                    className="font-mono text-[13px] px-3 py-1.5 rounded-full"
                    style={{
                      background: "var(--cf-orange-light)",
                      color: "var(--cf-orange)",
                      border: "1px solid var(--cf-orange-border)",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
            {slide.safetyLine && (
              <p
                className="mt-3 text-[1.05rem]"
                style={{
                  color: "var(--cf-text)",
                  letterSpacing: "-0.005em",
                }}
              >
                {slide.safetyLine}
              </p>
            )}
          </motion.div>
        )}
      </div>
    </SlideWrapper>
  );
}
