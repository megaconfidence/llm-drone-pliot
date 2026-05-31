import { useEffect, useState } from "react";
import { CloudflareLogo } from "./CloudflareLogo";

/* ---------- Background patterns ---------- */

export function DotPattern() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.5 }}
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="dot-pattern"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="12" cy="12" r="0.75" fill="var(--cf-border)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dot-pattern)" />
      </svg>
    </div>
  );
}

export function GridOverlay() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden="true"
      style={{
        opacity: 0.06,
        backgroundImage:
          "linear-gradient(var(--cf-border) 1px, transparent 1px), linear-gradient(90deg, var(--cf-border) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }}
    />
  );
}

/* ---------- Card decorations ---------- */

export function CornerBrackets() {
  return (
    <>
      <div
        className="absolute -top-1 -left-1 w-2 h-2 rounded-[1.5px]"
        style={{ border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }}
      />
      <div
        className="absolute -top-1 -right-1 w-2 h-2 rounded-[1.5px]"
        style={{ border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }}
      />
      <div
        className="absolute -bottom-1 -left-1 w-2 h-2 rounded-[1.5px]"
        style={{ border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }}
      />
      <div
        className="absolute -bottom-1 -right-1 w-2 h-2 rounded-[1.5px]"
        style={{ border: "1px solid var(--cf-border)", background: "var(--cf-bg-100)" }}
      />
    </>
  );
}

export function OrangeStripe() {
  return (
    <div
      className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
      style={{ background: "var(--cf-orange)" }}
    />
  );
}

/* ---------- Eyebrow label (mono uppercase) ---------- */

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="font-mono text-[14px] uppercase mb-4 inline-flex items-center gap-2"
      style={{ color: "var(--cf-orange)", letterSpacing: "0.12em" }}
    >
      <span
        className="inline-block w-2 h-2 rounded-full"
        style={{ background: "var(--cf-orange)" }}
      />
      {children}
    </div>
  );
}

/* ---------- Header bar ---------- */

export function HeaderBar({
  title,
  slideIndex,
  totalSlides,
}: {
  title: string;
  slideIndex: number;
  totalSlides: number;
}) {
  return (
    <div
      className="absolute top-0 left-0 right-0 flex items-center px-5 gap-3 border-b z-30"
      style={{
        height: "44px",
        background: "var(--cf-bg-header)",
        borderColor: "var(--cf-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Small CF logo as subtle attribution */}
      <CloudflareLogo height={14} />
      <div
        className="w-px self-stretch py-2.5"
        style={{ background: "var(--cf-border)" }}
      />
      <span
        className="font-medium"
        style={{
          fontSize: "13px",
          color: "var(--cf-text)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </span>
      <span
        className="ml-auto font-mono text-[10px] tabular-nums"
        style={{ color: "var(--cf-text-muted)", letterSpacing: "0.05em" }}
      >
        {String(slideIndex + 1).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
      </span>
    </div>
  );
}

/* ---------- Bottom navigation ---------- */

export function BottomNav({
  slideIndex,
  totalSlides,
  onPrev,
  onNext,
  onGoTo,
}: {
  slideIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 border-t z-30"
      style={{
        height: "56px",
        background: "var(--cf-bg-header)",
        borderColor: "var(--cf-border)",
        backdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={onPrev}
        disabled={slideIndex === 0}
        className="flex items-center gap-1.5 text-xs font-medium transition-opacity disabled:opacity-30 cursor-pointer"
        style={{ color: "var(--cf-text-muted)" }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Prev
      </button>

      <div className="flex flex-col items-center gap-1.5">
        <div className="flex items-center gap-1.5">
          {Array.from({ length: totalSlides }).map((_, i) => (
            <button
              key={i}
              onClick={() => onGoTo(i)}
              className="rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === slideIndex ? "16px" : "5px",
                height: "5px",
                background:
                  i === slideIndex ? "var(--cf-orange)" : "var(--cf-border)",
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={slideIndex === totalSlides - 1}
        className="flex items-center gap-1.5 text-xs font-medium transition-opacity disabled:opacity-30 cursor-pointer"
        style={{ color: "var(--cf-text-muted)" }}
      >
        Next
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}

/* ---------- Infinite ticker strip ---------- */

export function InfiniteTickerStrip({
  items,
  bottom = 0,
}: {
  items: string[];
  bottom?: number;
}) {
  const all = [...items, ...items];
  return (
    <div
      className="absolute flex items-center overflow-hidden border-y"
      style={{
        bottom,
        left: "50%",
        width: "100vw",
        transform: "translateX(-50%)",
        height: "48px",
        borderColor: "var(--cf-border)",
        background: "var(--cf-bg-200)",
      }}
      aria-hidden="true"
    >
      <div
        className="animate-infinite-scroll flex flex-row items-center"
        style={{ gap: 0 }}
      >
        {all.map((item, i) => (
          <span key={i} className="flex items-center flex-shrink-0">
            <span
              className="font-mono text-[13px] whitespace-nowrap px-6 uppercase"
              style={{ color: "var(--cf-text-muted)", letterSpacing: "0.08em" }}
            >
              {item}
            </span>
            <span
              className="flex-shrink-0 w-px h-3 self-center"
              style={{ background: "var(--cf-border)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- Drone illustration (top-down quadcopter) ---------- */

export function DroneTopDown({
  size = 200,
  spinning = true,
}: {
  size?: number;
  spinning?: boolean;
}) {
  const spinClass = spinning ? "animate-prop-spin" : "";
  const slowSpinClass = spinning ? "animate-prop-spin-slow" : "";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Diagonal arms */}
      <line x1="50" y1="50" x2="150" y2="150" stroke="var(--cf-text-faint)" strokeWidth="6" strokeLinecap="round" />
      <line x1="150" y1="50" x2="50" y2="150" stroke="var(--cf-text-faint)" strokeWidth="6" strokeLinecap="round" />

      {/* Central body */}
      <rect
        x="78"
        y="78"
        width="44"
        height="44"
        rx="8"
        fill="var(--cf-bg-200)"
        stroke="var(--cf-text)"
        strokeWidth="1.5"
      />
      {/* Camera dot on front */}
      <circle cx="100" cy="92" r="3" fill="var(--cf-orange)" />
      {/* Side ridges */}
      <line x1="86" y1="105" x2="114" y2="105" stroke="var(--cf-text-faint)" strokeWidth="1" />
      <line x1="86" y1="112" x2="114" y2="112" stroke="var(--cf-text-faint)" strokeWidth="1" />

      {/* Propeller guards + props - top-left */}
      <g>
        <circle cx="50" cy="50" r="22" fill="var(--cf-bg-200)" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <g className={spinClass}>
          <ellipse cx="50" cy="50" rx="20" ry="3" fill="var(--cf-text)" opacity="0.6" />
          <ellipse cx="50" cy="50" rx="3" ry="20" fill="var(--cf-text)" opacity="0.6" />
        </g>
        <circle cx="50" cy="50" r="3" fill="var(--cf-orange)" />
      </g>

      {/* Propeller - top-right */}
      <g>
        <circle cx="150" cy="50" r="22" fill="var(--cf-bg-200)" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <g className={slowSpinClass}>
          <ellipse cx="150" cy="50" rx="20" ry="3" fill="var(--cf-text)" opacity="0.6" />
          <ellipse cx="150" cy="50" rx="3" ry="20" fill="var(--cf-text)" opacity="0.6" />
        </g>
        <circle cx="150" cy="50" r="3" fill="var(--cf-orange)" />
      </g>

      {/* Propeller - bottom-left */}
      <g>
        <circle cx="50" cy="150" r="22" fill="var(--cf-bg-200)" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <g className={slowSpinClass}>
          <ellipse cx="50" cy="150" rx="20" ry="3" fill="var(--cf-text)" opacity="0.6" />
          <ellipse cx="50" cy="150" rx="3" ry="20" fill="var(--cf-text)" opacity="0.6" />
        </g>
        <circle cx="50" cy="150" r="3" fill="var(--cf-orange)" />
      </g>

      {/* Propeller - bottom-right */}
      <g>
        <circle cx="150" cy="150" r="22" fill="var(--cf-bg-200)" stroke="var(--cf-text-faint)" strokeWidth="1" />
        <g className={spinClass}>
          <ellipse cx="150" cy="150" rx="20" ry="3" fill="var(--cf-text)" opacity="0.6" />
          <ellipse cx="150" cy="150" rx="3" ry="20" fill="var(--cf-text)" opacity="0.6" />
        </g>
        <circle cx="150" cy="150" r="3" fill="var(--cf-orange)" />
      </g>

      {/* Status light (small blinking dot at back) */}
      <circle cx="100" cy="118" r="2" fill="var(--cf-orange)" opacity="0.7">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

/* ---------- Signal pulse rings (radio waves) ---------- */

export function SignalPulse({ size = 80, color = "var(--cf-orange)" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      {[0, 1, 2].map((i) => (
        <circle
          key={i}
          cx="50"
          cy="50"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.5"
          style={{
            transformOrigin: "50% 50%",
            animation: `signal-pulse 2s ease-out infinite ${i * 0.66}s`,
          }}
        />
      ))}
    </svg>
  );
}

/* ---------- Code block with syntax highlighting ---------- */

type Token = {
  type: "keyword" | "string" | "comment" | "function" | "number" | "plain";
  value: string;
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const regex =
    /(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|(["'`](?:[^"'`\\]|\\.)*?["'`])|(\b(?:import|export|from|default|const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|new|throw|try|catch|finally|class|extends|implements|interface|type|enum|async|await|yield|of|in|typeof|instanceof|void|null|undefined|true|false|as|readonly|declare|namespace|module|abstract|static|public|private|protected|super|this)\b)|(\b[a-zA-Z_]\w*(?=\s*\())|(\b\d+(?:\.\d+)?\b)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(code)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: "plain", value: code.slice(lastIndex, match.index) });
    }
    if (match[1]) tokens.push({ type: "comment", value: match[1] });
    else if (match[2]) tokens.push({ type: "string", value: match[2] });
    else if (match[3]) tokens.push({ type: "keyword", value: match[3] });
    else if (match[4]) tokens.push({ type: "function", value: match[4] });
    else if (match[5]) tokens.push({ type: "number", value: match[5] });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < code.length) {
    tokens.push({ type: "plain", value: code.slice(lastIndex) });
  }
  return tokens;
}

const tokenColors: Record<Token["type"], string> = {
  keyword: "var(--cf-code-keyword)",
  string: "var(--cf-code-string)",
  comment: "var(--cf-code-comment)",
  function: "var(--cf-code-function)",
  number: "var(--cf-code-string)",
  plain: "var(--cf-code-text)",
};

export function HighlightedCode({ code }: { code: string }) {
  const tokens = tokenize(code);
  return (
    <>
      {tokens.map((tok, i) => (
        <span key={i} style={{ color: tokenColors[tok.type] }}>
          {tok.value}
        </span>
      ))}
    </>
  );
}

export function CodeBlock({
  language,
  filename,
  code,
}: {
  language: string;
  filename?: string;
  code: string;
}) {
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "var(--cf-code-bg)" }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FF5F57" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#FEBC2E" }}
          />
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: "#28C840" }}
          />
        </div>
        {filename && (
          <span
            className="ml-2 font-mono text-sm"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            {filename}
          </span>
        )}
        <span
          className="ml-auto font-mono text-[12px] uppercase"
          style={{
            color: "rgba(255,255,255,0.3)",
            letterSpacing: "0.08em",
          }}
        >
          {language}
        </span>
      </div>
      <pre className="p-5 overflow-x-auto">
        <code
          className="font-mono leading-relaxed"
          style={{
            color: "var(--cf-code-text)",
            fontFamily: '"Fira Code", monospace',
            fontSize: "1rem",
          }}
        >
          <HighlightedCode code={code} />
        </code>
      </pre>
    </div>
  );
}

/* ---------- Terminal typewriter ---------- */

interface TerminalLine {
  prefix?: string;
  text: string;
  delay?: number;
  color?: string;
}

export function TerminalTypewriter({
  lines,
  minHeight = 200,
  loop = false,
  fontSize = "1rem",
}: {
  lines: TerminalLine[];
  minHeight?: number;
  loop?: boolean;
  fontSize?: string;
}) {
  const [displayed, setDisplayed] = useState<string[]>(lines.map(() => ""));
  const [currentLine, setCurrentLine] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done && !loop) return;
    if (done && loop) {
      const t = setTimeout(() => {
        setDisplayed(lines.map(() => ""));
        setCurrentLine(0);
        setCharIndex(0);
        setDone(false);
      }, 3000);
      return () => clearTimeout(t);
    }
    const line = lines[currentLine];
    if (!line) return;

    const startDelay = charIndex === 0 ? (line.delay ?? 0) : 0;

    const timer = setTimeout(() => {
      if (charIndex < line.text.length) {
        setDisplayed((prev) => {
          const next = [...prev];
          next[currentLine] = line.text.slice(0, charIndex + 1);
          return next;
        });
        setCharIndex((c) => c + 1);
      } else if (currentLine < lines.length - 1) {
        setCurrentLine((l) => l + 1);
        setCharIndex(0);
      } else {
        setDone(true);
      }
    }, startDelay + (charIndex === 0 ? 0 : 22 + Math.random() * 18));

    return () => clearTimeout(timer);
  }, [currentLine, charIndex, done, lines, loop]);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "var(--cf-code-bg)",
        fontFamily: '"Fira Code", monospace',
      }}
    >
      <div
        className="flex items-center gap-2 px-4 py-2.5 border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FF5F57" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28C840" }} />
        </div>
        <span
          className="ml-2 font-mono text-sm"
          style={{ color: "rgba(255,255,255,0.3)" }}
        >
          drone-bridge
        </span>
      </div>
      <div className="p-5 space-y-1" style={{ minHeight }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="flex items-start leading-relaxed"
            style={{ fontSize }}
          >
            {line.prefix && (
              <span
                className="mr-2 flex-shrink-0"
                style={{ color: "var(--cf-orange)", opacity: 0.7 }}
              >
                {line.prefix}
              </span>
            )}
            <span style={{ color: line.color ?? "var(--cf-code-text)" }}>
              {displayed[i]}
              {i === currentLine && !done && (
                <span
                  className="cursor-blink inline-block w-[7px] h-[14px] ml-0.5 align-text-bottom"
                  style={{ background: "var(--cf-orange)", opacity: 0.8 }}
                />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Animated waveform background ---------- */

export function AnimatedWaveform({
  height = 80,
  opacity = 0.3,
}: {
  height?: number;
  opacity?: number;
}) {
  const width = 1200;
  const segments = 120;

  function buildPath(offsetX: number): string {
    const points: string[] = [];
    for (let i = 0; i <= segments; i++) {
      const x = offsetX + (i / segments) * width;
      const t = i / segments;
      const y =
        height / 2 +
        Math.sin(t * Math.PI * 8) * 18 +
        Math.sin(t * Math.PI * 14 + 1.2) * 10 +
        Math.sin(t * Math.PI * 3 + 0.5) * 24 +
        Math.sin(t * Math.PI * 21) * 5;
      points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return points.join(" ");
  }

  const path1 = buildPath(0);
  const path2 = buildPath(width);

  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden"
      style={{ height, opacity }}
      aria-hidden="true"
    >
      <div
        style={{
          display: "flex",
          width: "200%",
          animation: "infinite-scroll 20s linear infinite",
        }}
      >
        <svg
          width={width * 2}
          height={height}
          viewBox={`0 0 ${width * 2} ${height}`}
          style={{ flexShrink: 0 }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={path1} fill="none" stroke="var(--cf-orange)" strokeWidth="1" />
          <path d={path2} fill="none" stroke="var(--cf-orange)" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}

/* ---------- Reveal on mount ---------- */

import { motion } from "framer-motion";

export function RevealOnMount({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Agent loop diagram ---------- */

// Loop diagram: nodes on a ring, circular arrows between them, and a
// highlight that cycles through the steps so the loop visibly "runs".
export function LoopDiagram({ steps }: { steps: string[] }) {
  // viewBox is padded so the active node's glow halo never touches the edge:
  // content reaches ringR (128) + halo (54) = 182 from center, +18 padding.
  const size = 400;
  const cx = size / 2;
  const cy = size / 2;
  const ringR = 128; // radius the nodes sit on
  const nodeR = 36; // resting node radius
  const nodeRActive = 40;
  const n = steps.length;
  const angleAt = (i: number) => (i / n) * Math.PI * 2 - Math.PI / 2; // start at top
  const positions = steps.map((_, i) => ({
    x: cx + ringR * Math.cos(angleAt(i)),
    y: cy + ringR * Math.sin(angleAt(i)),
  }));
  // Angular gap so arrows start/end just outside the (active) node.
  const delta = 2 * Math.asin((nodeRActive + 6) / (2 * ringR));

  // Cycle the active step around the loop so it visibly "runs".
  const [active, setActive] = useState(0);
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timeout = setTimeout(() => {
      interval = setInterval(() => setActive((a) => (a + 1) % n), 950);
    }, 1500);
    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [n]);

  return (
    <svg
      width={380}
      height={380}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker
          id="loop-arrow"
          markerUnits="userSpaceOnUse"
          markerWidth="12"
          markerHeight="10"
          refX="9"
          refY="5"
          orient="auto"
        >
          <polygon points="0,0 11,5 0,10" fill="var(--cf-orange)" />
        </marker>
      </defs>

      {/* Circular arrows forming the ring */}
      {steps.map((_, i) => {
        const a0 = angleAt(i) + delta;
        const a1 = angleAt(i) + (Math.PI * 2) / n - delta;
        const sx = cx + ringR * Math.cos(a0);
        const sy = cy + ringR * Math.sin(a0);
        const ex = cx + ringR * Math.cos(a1);
        const ey = cy + ringR * Math.sin(a1);
        // The arc pointing INTO the active node lights up.
        const on = (i + 1) % n === active;
        return (
          <motion.path
            key={`arc-${i}`}
            d={`M${sx},${sy} A ${ringR},${ringR} 0 0 1 ${ex},${ey}`}
            fill="none"
            stroke="var(--cf-orange)"
            strokeDasharray="5 5"
            className={on ? "animate-dash" : undefined}
            markerEnd="url(#loop-arrow)"
            initial={{ opacity: 0, strokeWidth: 1.5 }}
            animate={{ opacity: on ? 0.95 : 0.2, strokeWidth: on ? 2.4 : 1.5 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        );
      })}

      {/* Center label */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={32}
          fill="var(--cf-orange-light)"
          stroke="var(--cf-orange-border)"
          strokeWidth="1"
        />
        <text
          x={cx}
          y={cy + 4}
          textAnchor="middle"
          fontFamily="'Fira Code', monospace"
          fontSize="13"
          fill="var(--cf-orange)"
          letterSpacing="0.05em"
        >
          loop
        </text>
      </motion.g>

      {/* Step nodes with a cycling highlight */}
      {positions.map((pos, i) => {
        const on = i === active;
        return (
          <g key={`node-${i}`}>
            {/* Soft glow halo when active */}
            <motion.circle
              cx={pos.x}
              cy={pos.y}
              fill="var(--cf-orange)"
              animate={{ r: on ? 54 : nodeR, opacity: on ? 0.16 : 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            />
            <motion.g
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
              style={{ transformOrigin: `${pos.x}px ${pos.y}px` }}
            >
              <motion.circle
                cx={pos.x}
                cy={pos.y}
                animate={{
                  r: on ? nodeRActive : nodeR,
                  fill: on ? "var(--cf-orange)" : "var(--cf-bg-200)",
                  stroke: on ? "var(--cf-orange)" : "var(--cf-border)",
                  strokeWidth: on ? 2 : 1.5,
                }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.text
                x={pos.x}
                y={pos.y + 4}
                textAnchor="middle"
                fontFamily="Inter, system-ui, sans-serif"
                fontSize="11"
                fontWeight={on ? 600 : 500}
                letterSpacing="-0.01em"
                animate={{ fill: on ? "#ffffff" : "var(--cf-text)" }}
                transition={{ duration: 0.3 }}
              >
                {steps[i]}
              </motion.text>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
}
