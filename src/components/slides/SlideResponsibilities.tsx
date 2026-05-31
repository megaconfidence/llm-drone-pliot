import { motion } from "framer-motion";
import type { ResponsibilitiesSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  },
};

function ResponsibilityColumn({
  title,
  items,
  delay = 0,
  variant,
}: {
  title: string;
  items: string[];
  delay?: number;
  variant: "agent" | "bridge";
}) {
  const isAgent = variant === "agent";
  return (
    <motion.div
      className="relative rounded-2xl p-6 h-full"
      style={{
        background: isAgent ? "rgba(61, 116, 255, 0.06)" : "var(--cf-bg-200)",
        border: `1px solid ${isAgent ? "var(--cf-orange-border)" : "var(--cf-border)"}`,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <CornerBrackets />

      <div
        className="font-mono text-[12px] uppercase mb-2 inline-flex items-center gap-2"
        style={{
          color: isAgent ? "var(--cf-orange)" : "var(--cf-text-muted)",
          letterSpacing: "0.14em",
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: isAgent ? "var(--cf-orange)" : "var(--cf-text-faint)",
          }}
        />
        {isAgent ? "lives in cloud" : "lives next to hardware"}
      </div>

      <h3
        className="font-medium mb-5"
        style={{
          fontSize: "1.9rem",
          color: isAgent ? "var(--cf-orange)" : "var(--cf-text)",
          letterSpacing: "-0.02em",
        }}
      >
        {title}
      </h3>

      <motion.ul
        className="flex flex-col gap-3"
        variants={stagger}
        initial="hidden"
        animate="show"
      >
        {items.map((item, i) => (
          <motion.li
            key={i}
            variants={fadeUp}
            className="flex items-start gap-2.5"
            style={{ color: "var(--cf-text)", fontSize: "1.15rem" }}
          >
            <span
              className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full"
              style={{
                background: isAgent ? "var(--cf-orange)" : "var(--cf-text-faint)",
              }}
            />
            <span>{item}</span>
          </motion.li>
        ))}
      </motion.ul>
    </motion.div>
  );
}

export function SlideResponsibilities({
  slide,
}: {
  slide: ResponsibilitiesSlide;
}) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
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

        <motion.p
          className="mt-3"
          style={{ color: "var(--cf-text-muted)", fontSize: "1.15rem" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Separation of concerns -- reasoning and state vs hardware I/O.
        </motion.p>

        <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-5">
          <ResponsibilityColumn
            title={slide.left.title}
            items={slide.left.items}
            delay={0.3}
            variant="agent"
          />
          <ResponsibilityColumn
            title={slide.right.title}
            items={slide.right.items}
            delay={0.4}
            variant="bridge"
          />
        </div>
      </div>
    </SlideWrapper>
  );
}
