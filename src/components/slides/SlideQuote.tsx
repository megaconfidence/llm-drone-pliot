import { motion } from "framer-motion";
import type { QuoteSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { Eyebrow } from "../VisualElements";

// Joystick fading into typed command list
function JoystickToCommands() {
  return (
    <svg
      width="100%"
      height="80"
      viewBox="0 0 600 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Joystick on the left, crossed out */}
      <motion.g
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.4, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <g transform="translate(50, 12)">
          {/* Base */}
          <ellipse
            cx="35"
            cy="55"
            rx="32"
            ry="6"
            fill="none"
            stroke="var(--cf-text-faint)"
            strokeWidth="1.5"
          />
          {/* Stick */}
          <line
            x1="35"
            y1="55"
            x2="35"
            y2="22"
            stroke="var(--cf-text-faint)"
            strokeWidth="3"
          />
          {/* Ball */}
          <circle
            cx="35"
            cy="18"
            r="8"
            fill="none"
            stroke="var(--cf-text-faint)"
            strokeWidth="1.5"
          />
        </g>
        {/* Crossed out (X overlay) */}
        <motion.line
          x1="48"
          y1="18"
          x2="120"
          y2="64"
          stroke="var(--cf-orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        />
        <motion.line
          x1="120"
          y1="18"
          x2="48"
          y2="64"
          stroke="var(--cf-orange)"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        />
      </motion.g>

      {/* Arrow in the middle */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <line
          x1="180"
          y1="40"
          x2="290"
          y2="40"
          stroke="var(--cf-text-faint)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          className="animate-dash"
        />
        <polygon points="290,35 300,40 290,45" fill="var(--cf-text-faint)" />
      </motion.g>

      {/* Typed command list on the right */}
      <motion.g
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <rect
          x="320"
          y="12"
          width="240"
          height="56"
          rx="6"
          fill="var(--cf-code-bg)"
        />
        {[
          { x: 332, y: 28, kw: 'takeoff', col: "var(--cf-code-keyword)" },
          { x: 332, y: 41, kw: 'forward 50', col: "var(--cf-code-text)" },
          { x: 332, y: 54, kw: 'cw 90', col: "var(--cf-code-text)" },
        ].map((line, i) => (
          <g key={i}>
            <text
              x={line.x}
              y={line.y}
              fontSize="11"
              fontFamily="'Fira Code', monospace"
              fill={line.col}
            >
              <tspan fill="var(--cf-code-comment)">$ </tspan>
              {line.kw}
            </text>
          </g>
        ))}
        <rect
          x="430"
          y="46"
          width="6"
          height="11"
          fill="var(--cf-orange)"
          opacity="0.7"
          className="cursor-blink"
        />
      </motion.g>
    </svg>
  );
}

export function SlideQuote({ slide }: { slide: QuoteSlide }) {
  return (
    <SlideWrapper background="dots">
      <div className="w-full flex flex-col items-center justify-center text-center max-w-5xl">
        <Eyebrow>{slide.eyebrow}</Eyebrow>

        <motion.h1
          className="hero-shine font-medium"
          style={{
            fontSize: "clamp(3.5rem, 7.2vw, 6rem)",
            color: "var(--cf-text)",
            letterSpacing: "-0.045em",
            lineHeight: 1.05,
          }}
        >
          {slide.quote}
        </motion.h1>

        <motion.p
          className="mt-7 max-w-3xl"
          style={{
            fontSize: "1.6rem",
            color: "var(--cf-text-muted)",
            letterSpacing: "-0.01em",
            lineHeight: 1.4,
          }}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {slide.supporting}
        </motion.p>

        {/* Joystick -> typed commands illustration */}
        <motion.div
          className="mt-10 w-full max-w-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <JoystickToCommands />
        </motion.div>

        {slide.small && (
          <motion.p
            className="mt-8 font-mono text-sm uppercase"
            style={{
              color: "var(--cf-text-faint)",
              letterSpacing: "0.12em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7, duration: 0.5 }}
          >
            {slide.small}
          </motion.p>
        )}
      </div>
    </SlideWrapper>
  );
}
