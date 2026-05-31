import { motion } from "framer-motion";
import type { DemoRecapSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { AnimatedDrone } from "../AnimatedDrone";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.6 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideDemoRecap({ slide }: { slide: DemoRecapSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full flex flex-col items-center text-center">
        <motion.h2
          className="font-medium max-w-5xl"
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

        <motion.p
          className="mt-5 max-w-4xl leading-relaxed"
          style={{ fontSize: "1.45rem", color: "var(--cf-text-muted)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {slide.summary}
        </motion.p>

        {/* Center drone with cards orbiting */}
        <div className="mt-10 relative w-full" style={{ height: 280 }}>
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="animate-drone-hover">
              <AnimatedDrone width={140} spinning={false} />
            </div>
          </motion.div>

          {/* Tags arranged around the drone */}
          <motion.div
            className="absolute inset-0"
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            {slide.tags.map((tag, i) => {
              // Position tags in 5 spots around the drone
              const positions = [
                { left: "8%", top: "20%" },
                { right: "8%", top: "20%" },
                { left: "0%", top: "60%" },
                { right: "0%", top: "60%" },
                { left: "50%", top: "85%", transform: "translateX(-50%)" },
              ];
              const pos = positions[i] || positions[0];
              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="absolute"
                  style={pos}
                >
                  <div
                    className="font-mono text-[14px] px-4 py-2.5 rounded-full animate-drone-hover-inverse"
                    style={{
                      background: "var(--cf-bg-200)",
                      border: "1px solid var(--cf-orange-border)",
                      color: "var(--cf-text)",
                      letterSpacing: "0.02em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    <span style={{ color: "var(--cf-orange)" }}>›</span>{" "}
                    {tag}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </SlideWrapper>
  );
}
