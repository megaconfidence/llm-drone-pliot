import { motion } from "framer-motion";
import type { ToolVocabularySlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CodeBlock, CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, x: 8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideToolVocabulary({
  slide,
}: {
  slide: ToolVocabularySlide;
}) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <motion.h2
          className="font-medium"
          style={{
            fontSize: "clamp(2.1rem, 4.1vw, 3.1rem)",
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
          className="mt-3 max-w-3xl"
          style={{ color: "var(--cf-text-muted)", fontSize: "1.15rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {slide.body}
        </motion.p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Code block (left, takes ~7 cols) */}
          <motion.div
            className="md:col-span-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <CodeBlock
              language="typescript"
              filename="drone-tools.ts"
              code={slide.code}
            />
          </motion.div>

          {/* Rules sidebar (right) */}
          <motion.div
            className="md:col-span-4"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <div
              className="relative rounded-xl p-5"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-orange-border)",
              }}
            >
              <CornerBrackets />
              <div
                className="font-mono text-[12px] uppercase mb-3 inline-flex items-center gap-2"
                style={{
                  color: "var(--cf-orange)",
                  letterSpacing: "0.14em",
                }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "var(--cf-orange)" }}
                />
                rules
              </div>
              <ul className="flex flex-col gap-2.5">
                {slide.rules.map((rule, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-2"
                    style={{ color: "var(--cf-text)", fontSize: "1.1rem" }}
                  >
                    <span
                      className="font-mono flex-shrink-0"
                      style={{
                        color: "var(--cf-orange)",
                        fontSize: "1rem",
                      }}
                    >
                      ›
                    </span>
                    <span>{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Caption */}
        <motion.div
          className="mt-5 max-w-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.5 }}
        >
          <p
            className="italic"
            style={{
              color: "var(--cf-text-muted)",
              lineHeight: 1.5,
              fontSize: "1.1rem",
            }}
          >
            "{slide.caption}"
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
