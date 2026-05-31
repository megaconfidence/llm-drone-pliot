import { motion } from "framer-motion";
import type { BuildWeekendSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow, CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Starter pipeline: a prompt enters the agent (the hub); the agent drives
// tool -> bridge -> thing, and telemetry loops back to the agent along a
// graceful return lane beneath the row.
function StarterArchitecture() {
  const labels = ["prompt", "agent", "tool", "bridge", "thing", "telemetry"];
  const cy = 34;
  const centerX = (i: number) => 80 + i * 165;
  const wOf = (i: number) => (i === 1 ? 130 : 110);
  const hOf = (i: number) => (i === 1 ? 46 : 34);
  const last = labels.length - 1;
  // One opaque flow color for every connector + arrowhead, so a head always
  // matches its line (markers don't inherit a path's opacity, and a translucent
  // head would double-darken where it overlaps the stroke).
  const FLOW = "#739bff";

  return (
    <svg
      width="100%"
      height="104"
      viewBox="0 0 1000 104"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="starter-arrow"
          markerWidth="6"
          markerHeight="5"
          refX="6"
          refY="2.5"
          orient="auto"
        >
          <polygon points="0,0 6,2.5 0,5" fill={FLOW} />
        </marker>
      </defs>

      {labels.map((label, i, arr) => {
        const cx = centerX(i);
        const w = wOf(i);
        const h = hOf(i);
        const isAgent = i === 1;
        const isTelemetry = i === last;
        return (
          <motion.g
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 + i * 0.1, duration: 0.4 }}
          >
            <rect
              x={cx - w / 2}
              y={cy - h / 2}
              width={w}
              height={h}
              rx={isAgent ? 9 : 7}
              fill={
                isAgent
                  ? "var(--cf-orange)"
                  : isTelemetry
                    ? "var(--cf-orange-light)"
                    : "var(--cf-bg-200)"
              }
              stroke={
                isAgent
                  ? "var(--cf-orange)"
                  : isTelemetry
                    ? "var(--cf-orange-border)"
                    : "var(--cf-border)"
              }
              strokeWidth="1.5"
            />
            <text
              x={cx}
              y={cy + 4}
              textAnchor="middle"
              fontSize={isAgent ? 12.5 : 11}
              fontWeight={isAgent ? 600 : 500}
              fill={isAgent ? "#ffffff" : "var(--cf-text)"}
              fontFamily="'Fira Code', monospace"
            >
              {label}
            </text>
            {i < last && (
              <line
                x1={cx + w / 2 + 5}
                y1={cy}
                x2={centerX(i + 1) - wOf(i + 1) / 2 - 5}
                y2={cy}
                stroke={FLOW}
                strokeWidth="1.5"
                markerEnd="url(#starter-arrow)"
              />
            )}
          </motion.g>
        );
      })}

      {/* Telemetry returns to the agent along an angular lane beneath the row:
          straight down, straight across, then straight up into the agent — the
          final vertical run keeps the arrowhead colinear with the line. */}
      <motion.path
        d={`M ${centerX(last)} ${cy + hOf(last) / 2} L ${centerX(last)} 85 L ${centerX(1)} 85 L ${centerX(1)} ${cy + hOf(1) / 2}`}
        fill="none"
        stroke={FLOW}
        strokeWidth="1.5"
        strokeLinejoin="miter"
        markerEnd="url(#starter-arrow)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7, duration: 0.6 }}
      />
      <motion.text
        x={(centerX(1) + centerX(last)) / 2}
        y={75}
        textAnchor="middle"
        fontSize="9"
        fontFamily="'Fira Code', monospace"
        fill="var(--cf-orange)"
        opacity="0.6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2, duration: 0.4 }}
      >
        feedback loop
      </motion.text>
    </svg>
  );
}

export function SlideBuildWeekend({ slide }: { slide: BuildWeekendSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <Eyebrow>{slide.eyebrow}</Eyebrow>

        <motion.h2
          className="font-medium max-w-5xl"
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

        {/* Building blocks as checklist */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3"
          variants={stagger}
          initial="hidden"
          animate="show"
        >
          {slide.blocks.map((block, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="relative rounded-xl p-4 flex items-start gap-3"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              <CornerBrackets />
              {/* Checkbox */}
              <div
                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded border flex items-center justify-center"
                style={{
                  borderColor: "var(--cf-orange-border)",
                  background: "var(--cf-orange-light)",
                }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M2 6 L5 9 L10 3"
                    stroke="var(--cf-orange)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div>
                <div
                  className="font-mono font-medium mb-1"
                  style={{
                    color: "var(--cf-text)",
                    letterSpacing: "-0.005em",
                    fontSize: "1.05rem",
                  }}
                >
                  {block.label}
                </div>
                <div
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--cf-text-muted)" }}
                >
                  {block.description}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Starter architecture pipeline */}
        <motion.div
          className="mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <div
            className="font-mono text-[12px] uppercase mb-2 inline-flex items-center gap-2"
            style={{
              color: "var(--cf-text-faint)",
              letterSpacing: "0.14em",
            }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--cf-text-faint)" }}
            />
            starter pipeline
          </div>
          <StarterArchitecture />
        </motion.div>

        {/* Closing line */}
        <motion.p
          className="mt-4 font-medium text-center"
          style={{
            fontSize: "1.3rem",
            color: "var(--cf-orange)",
            letterSpacing: "-0.005em",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.5 }}
        >
          {slide.closing}
        </motion.p>
      </div>
    </SlideWrapper>
  );
}
