import { motion } from "framer-motion";
import type { ContrastSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const fadeRow = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideContrast({ slide }: { slide: ContrastSlide }) {
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
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {slide.heading}
        </motion.h2>

        {/* Comparison table */}
        <motion.div
          className="mt-7 grid grid-cols-2 gap-0 rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--cf-border)" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Column headers */}
          <div
            className="px-5 py-3"
            style={{
              background: "var(--cf-bg-200)",
              borderRight: "1px solid var(--cf-border)",
              borderBottom: "1px solid var(--cf-border)",
            }}
          >
            <div
              className="font-mono text-[12px] uppercase mb-1"
              style={{ color: "var(--cf-text-faint)", letterSpacing: "0.12em" }}
            >
              before
            </div>
            <div
              className="font-medium"
              style={{
                color: "var(--cf-text)",
                fontSize: "1.3rem",
                letterSpacing: "-0.01em",
              }}
            >
              {slide.leftHeader}
            </div>
          </div>
          <div
            className="px-5 py-3"
            style={{
              background: "var(--cf-orange-light)",
              borderBottom: "1px solid var(--cf-border)",
            }}
          >
            <div
              className="font-mono text-[12px] uppercase mb-1"
              style={{ color: "var(--cf-orange)", letterSpacing: "0.12em" }}
            >
              after
            </div>
            <div
              className="font-medium"
              style={{
                color: "var(--cf-orange)",
                fontSize: "1.3rem",
                letterSpacing: "-0.01em",
              }}
            >
              {slide.rightHeader}
            </div>
          </div>

          {/* Rows */}
          <motion.div
            className="contents"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {slide.rows.map((row, i) => {
              const isLast = i === slide.rows.length - 1;
              return (
                <div key={`row-${i}`} className="contents">
                  <motion.div
                    variants={fadeRow}
                    className="px-5 py-3.5 text-[1.05rem]"
                    style={{
                      color: "var(--cf-text-muted)",
                      borderRight: "1px solid var(--cf-border)",
                      borderBottom: isLast ? "none" : "1px solid var(--cf-border)",
                      background: i % 2 === 0 ? "transparent" : "var(--cf-bg-200)",
                    }}
                  >
                    {row.left}
                  </motion.div>
                  <motion.div
                    variants={fadeRow}
                    className="px-5 py-3.5 text-[1.05rem] font-medium"
                    style={{
                      color: "var(--cf-text)",
                      borderBottom: isLast ? "none" : "1px solid var(--cf-border)",
                      background: i % 2 === 0 ? "transparent" : "var(--cf-bg-200)",
                    }}
                  >
                    {row.right}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Caption */}
        <motion.p
          className="mt-6 font-medium max-w-4xl"
          style={{
            color: "var(--cf-orange)",
            fontSize: "1.45rem",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          {slide.caption}
        </motion.p>
      </div>
    </SlideWrapper>
  );
}
