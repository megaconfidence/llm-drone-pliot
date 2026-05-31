import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import type { LiveDemoSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { TerminalTypewriter } from "../VisualElements";
import { AnimatedDrone } from "../AnimatedDrone";

// Animated square flight path visualization
function FlightPath() {
  const [phase, setPhase] = useState(0); // 0..4 (4 sides), 5 = landing
  const cx = 200;
  const cy = 200;
  const half = 80;
  const corners = [
    { x: cx - half, y: cy - half }, // start (top-left)
    { x: cx + half, y: cy - half }, // top-right
    { x: cx + half, y: cy + half }, // bottom-right
    { x: cx - half, y: cy + half }, // bottom-left
    { x: cx - half, y: cy - half }, // back to start
  ];

  useEffect(() => {
    const id = setInterval(() => {
      setPhase((p) => (p + 1) % 6);
    }, 1500);
    return () => clearInterval(id);
  }, []);

  // Position drone along the path based on phase
  const droneIdx = Math.min(phase, 4);
  const dronePos = corners[droneIdx];

  // Build progressive path
  const progressivePath = corners
    .slice(0, droneIdx + 1)
    .map((c, i) => `${i === 0 ? "M" : "L"}${c.x},${c.y}`)
    .join(" ");

  return (
    <div className="relative">
      <svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer dashed bounds (room) */}
        <rect
          x="40"
          y="40"
          width="320"
          height="320"
          rx="10"
          fill="none"
          stroke="var(--cf-border)"
          strokeWidth="1.5"
          strokeDasharray="6 6"
        />
        <text
          x="50"
          y="56"
          fontFamily="'Fira Code', monospace"
          fontSize="9"
          fill="var(--cf-text-faint)"
          letterSpacing="0.08em"
        >
          room boundary
        </text>

        {/* Audience marker (bottom) */}
        <g>
          <rect
            x="160"
            y="370"
            width="80"
            height="14"
            rx="3"
            fill="var(--cf-bg-200)"
            stroke="var(--cf-text-faint)"
            strokeWidth="1"
          />
          <text
            x="200"
            y="380"
            textAnchor="middle"
            fontFamily="'Fira Code', monospace"
            fontSize="9"
            fill="var(--cf-text-muted)"
            letterSpacing="0.08em"
          >
            audience
          </text>
        </g>

        {/* Full square (ghost) */}
        <rect
          x={cx - half}
          y={cy - half}
          width={half * 2}
          height={half * 2}
          fill="none"
          stroke="var(--cf-orange)"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.25"
        />

        {/* Corner labels */}
        {corners.slice(0, 4).map((c, i) => (
          <g key={`corner-${i}`}>
            <circle
              cx={c.x}
              cy={c.y}
              r={3}
              fill={i <= droneIdx ? "var(--cf-orange)" : "var(--cf-text-faint)"}
              opacity={i <= droneIdx ? 1 : 0.4}
            />
            <text
              x={c.x + (i === 0 || i === 3 ? -10 : 10)}
              y={c.y + (i < 2 ? -8 : 16)}
              textAnchor={i === 0 || i === 3 ? "end" : "start"}
              fontFamily="'Fira Code', monospace"
              fontSize="9"
              fill="var(--cf-text-faint)"
            >
              {`p${i}`}
            </text>
          </g>
        ))}

        {/* Progressive flight path */}
        <motion.path
          d={progressivePath}
          fill="none"
          stroke="var(--cf-orange)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          key={phase}
        />

        {/* Drone marker */}
        <motion.g
          animate={{
            cx: dronePos.x,
            cy: dronePos.y,
            x: dronePos.x - 24,
            y: dronePos.y - 24,
          }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <foreignObject
            x={dronePos.x - 24}
            y={dronePos.y - 24}
            width="48"
            height="48"
          >
            <div
              className="animate-drone-hover"
              style={{
                width: 48,
                height: 48,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AnimatedDrone width={34} />
            </div>
          </foreignObject>
        </motion.g>
      </svg>
    </div>
  );
}

// State pill
function StatePill({ state }: { state: string }) {
  return (
    <motion.div
      key={state}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[13px] uppercase"
      style={{
        background: "var(--cf-orange-light)",
        color: "var(--cf-orange)",
        border: "1px solid var(--cf-orange-border)",
        letterSpacing: "0.08em",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full animate-pulse-glow"
        style={{ background: "var(--cf-orange)" }}
      />
      {state}
    </motion.div>
  );
}

export function SlideLiveDemo({ slide }: { slide: LiveDemoSlide }) {
  // Cycle through states
  const [stateIdx, setStateIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      setStateIdx((i) => (i + 1) % slide.states.length);
    }, 4000);
    return () => clearInterval(id);
  }, [slide.states.length]);

  return (
    <SlideWrapper background="grid">
      <div className="w-full">
        <div className="flex items-center justify-between mb-5">
          <motion.h2
            className="font-medium"
            style={{
              fontSize: "clamp(1.9rem, 3.6vw, 2.7rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.03em",
              lineHeight: 1.12,
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {slide.heading}
          </motion.h2>
          <StatePill state={slide.states[stateIdx]} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left: Command ledger */}
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div
              className="font-mono text-[12px] uppercase mb-2"
              style={{ color: "var(--cf-text-faint)", letterSpacing: "0.12em" }}
            >
              command ledger
            </div>
            <TerminalTypewriter
              minHeight={360}
              fontSize="1.05rem"
              loop
              lines={slide.commands.map((cmd, i) => ({
                prefix: i === 0 ? undefined : "$",
                text: i === 0 ? `> ${cmd}` : cmd,
                delay: i === 0 ? 300 : 250,
                color: i === 0 ? "var(--cf-code-text)" : undefined,
              }))}
            />
          </motion.div>

          {/* Right: Live flight path + telemetry */}
          <motion.div
            className="md:col-span-6 flex flex-col gap-4"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div
              className="rounded-xl p-4 flex flex-col items-center"
              style={{
                background: "var(--cf-bg-200)",
                border: "1px solid var(--cf-border)",
              }}
            >
              <div
                className="self-start font-mono text-[12px] uppercase mb-2"
                style={{
                  color: "var(--cf-text-faint)",
                  letterSpacing: "0.12em",
                }}
              >
                top-down flight path
              </div>
              <FlightPath />
            </div>

            {/* Telemetry grid */}
            <div className="grid grid-cols-4 gap-2">
              {slide.telemetry.map((t, i) => (
                <motion.div
                  key={i}
                  className="rounded-lg px-3 py-2"
                  style={{
                    background: "var(--cf-bg-200)",
                    border: "1px solid var(--cf-border)",
                  }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
                >
                  <div
                    className="font-mono text-[11px] uppercase mb-0.5"
                    style={{
                      color: "var(--cf-text-faint)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {t.label}
                  </div>
                  <div
                    className="font-mono text-[1.05rem] tabular-nums"
                    style={{ color: "var(--cf-text)" }}
                  >
                    {t.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Fallback note */}
        <motion.div
          className="mt-3 text-center font-mono text-[12px] uppercase"
          style={{ color: "var(--cf-text-faint)", letterSpacing: "0.12em" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          the interface is the idea. the drone is one expression of it.
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
