import { AnimatePresence, motion } from "framer-motion";
import type { ArchitectureSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";

const EASE = [0.22, 1, 0.36, 1] as const;

// The architecture told as a layered build. Each step is one real diagram
// image; keyboard nav cycles through them before moving to the next slide.
export const architectureDiagrams = [
  {
    src: "/arch-diagrams/1.png",
    eyebrow: "local network",
    caption: "Drone, phone, and laptop bridged on one local network.",
  },
  {
    src: "/arch-diagrams/2.png",
    eyebrow: "drone bridge",
    caption: "A local controller bridges the drone — commands down, frames out.",
  },
  {
    src: "/arch-diagrams/4.png",
    eyebrow: "the agent loop",
    caption: "The agent: a chat UI in, an LLM to reason, tools to act.",
  },
  {
    src: "/arch-diagrams/3.png",
    eyebrow: "controller + agent",
    caption: "Controller and agent are partners — hardware meets thinking.",
  },
];

export function SlideArchitecture({
  slide,
  step = 0,
}: {
  slide: ArchitectureSlide;
  step?: number;
}) {
  const total = architectureDiagrams.length;
  const i = Math.max(0, Math.min(step, total - 1));
  const d = architectureDiagrams[i];

  return (
    <SlideWrapper background="grid">
      <div className="w-full h-full flex flex-col">
        {/* Header: title left, step name as a blue pill on the far right */}
        <div className="flex items-center justify-between gap-4">
          <motion.h2
            className="font-medium"
            style={{
              fontSize: "clamp(1.7rem, 3.4vw, 2.5rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.035em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {slide.heading}
          </motion.h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[13px] uppercase whitespace-nowrap"
              style={{
                background: "var(--cf-orange-light)",
                color: "var(--cf-orange)",
                border: "1px solid var(--cf-orange-border)",
                letterSpacing: "0.08em",
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
            >
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-glow"
                style={{ background: "var(--cf-orange)" }}
              />
              {d.eyebrow}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Diagram image */}
        <div className="relative flex-1 my-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={i}
              src={d.src}
              alt={d.eyebrow}
              draggable={false}
              className="absolute inset-0 w-full h-full object-contain select-none"
              initial={{ opacity: 0, scale: 0.985 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 0.4, ease: EASE }}
            />
          </AnimatePresence>
        </div>

        {/* Caption + step dots */}
        <div className="flex flex-col items-center gap-3">
          <AnimatePresence mode="wait">
            <motion.p
              key={i}
              className="text-center max-w-5xl whitespace-nowrap"
              style={{ fontSize: "1.05rem", color: "var(--cf-text-muted)", lineHeight: 1.4 }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
            >
              {d.caption}
            </motion.p>
          </AnimatePresence>

          <div className="flex items-center gap-2.5 mb-6">
            {architectureDiagrams.map((_, idx) => (
              <motion.span
                key={idx}
                className="rounded-full"
                animate={{
                  width: idx === i ? 26 : 8,
                  backgroundColor:
                    idx === i ? "var(--cf-orange)" : "var(--cf-border)",
                }}
                transition={{ duration: 0.35, ease: EASE }}
                style={{ height: 8, display: "inline-block" }}
              />
            ))}
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}
