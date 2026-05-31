import { motion } from "framer-motion";
import type { DroneRevealSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow } from "../VisualElements";
import { AnimatedDrone } from "../AnimatedDrone";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.6 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideDroneReveal({ slide }: { slide: DroneRevealSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left: chat bubble morphing into drone connection */}
        <div className="md:col-span-7">
          <Eyebrow>{slide.eyebrow}</Eyebrow>

          <motion.h2
            className="font-medium"
            style={{
              fontSize: "clamp(3.1rem, 6vw, 5rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.035em",
              lineHeight: 1.08,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {slide.heading}
          </motion.h2>

          <motion.div
            className="mt-7 flex flex-col gap-2 max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {slide.supporting.map((line, i) => (
              <p
                key={i}
                className="leading-relaxed"
                style={{
                  fontSize: "1.5rem",
                  color: "var(--cf-text-muted)",
                }}
              >
                {line}
              </p>
            ))}
          </motion.div>

          {/* Chat bubble morph illustration */}
          <motion.div
            className="mt-10 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            {/* Chat bubble */}
            <div
              className="relative px-4 py-3 rounded-2xl text-sm"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
                color: "var(--cf-text-muted)",
                fontFamily: '"Fira Code", monospace',
                fontSize: "14px",
                maxWidth: 250,
              }}
            >
              "fly a square and land"
              <div
                className="absolute w-3 h-3 rotate-45"
                style={{
                  right: -7,
                  top: "50%",
                  marginTop: -6,
                  background: "var(--cf-bg-200)",
                  borderTop: "1px solid var(--cf-border)",
                  borderRight: "1px solid var(--cf-border)",
                }}
              />
            </div>

            {/* Animated arrow */}
            <svg width="60" height="20" viewBox="0 0 60 20">
              <line
                x1="0"
                y1="10"
                x2="52"
                y2="10"
                stroke="var(--cf-orange)"
                strokeWidth="1.5"
                strokeDasharray="3 3"
                className="animate-dash"
              />
              <polygon
                points="52,5 60,10 52,15"
                fill="var(--cf-orange)"
              />
            </svg>

            <span
              className="font-mono text-sm uppercase"
              style={{
                color: "var(--cf-orange)",
                letterSpacing: "0.12em",
              }}
            >
              propellers
            </span>
          </motion.div>
        </div>

        {/* Right: drone + labels */}
        <div className="md:col-span-5">
          <div className="relative">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <div className="animate-drone-hover">
                <AnimatedDrone width={260} />
              </div>
            </motion.div>

            {/* Floating label cards */}
            <motion.div
              className="mt-6 flex flex-wrap gap-2 justify-center"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              {slide.labels.map((label, i) => (
                <motion.span
                  key={i}
                  variants={fadeUp}
                  className="font-mono text-[13px] px-3 py-1.5 rounded-full"
                  style={{
                    background: "var(--cf-bg-200)",
                    border: "1px solid var(--cf-border)",
                    color: "var(--cf-text-muted)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {label}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
