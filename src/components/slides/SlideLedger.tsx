import { motion } from "framer-motion";
import type { LedgerSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
};
const fadeIn = {
  hidden: { opacity: 0, x: -8 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Pick a color/icon for each event type
function eventStyle(event: string): {
  color: string;
  icon: string;
} {
  if (event.includes("plan")) {
    return { color: "var(--cf-orange)", icon: "≡" };
  }
  if (event.includes("approval")) {
    return { color: "var(--cf-orange)", icon: "✓" };
  }
  if (event.includes("command")) {
    return { color: "var(--cf-code-function)", icon: "›" };
  }
  if (event.includes("ack")) {
    return { color: "#22C55E", icon: "✓" };
  }
  if (event.includes("telemetry")) {
    return { color: "var(--cf-code-string)", icon: "~" };
  }
  return { color: "var(--cf-text-muted)", icon: "·" };
}

// Telemetry gauge - simple horizontal bar
function TelemetryRow({
  label,
  value,
  delay = 0,
}: {
  label: string;
  value: string;
  delay?: number;
}) {
  // Try to extract percentage / number for gauge
  const pctMatch = value.match(/(\d+)%/);
  const cmMatch = value.match(/(\d+)cm/);
  let progressPct: number | null = null;
  if (pctMatch) progressPct = parseInt(pctMatch[1], 10);
  else if (cmMatch) progressPct = Math.min(100, parseInt(cmMatch[1], 10));

  return (
    <motion.div
      className="flex items-center gap-4 px-4 py-2.5 rounded-lg"
      style={{
        background: "var(--cf-bg-100)",
        border: "1px solid var(--cf-border)",
      }}
      initial={{ opacity: 0, x: 8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.4 }}
    >
      <div
        className="flex-shrink-0 font-mono text-[12px] uppercase w-32"
        style={{ color: "var(--cf-text-faint)", letterSpacing: "0.1em" }}
      >
        {label}
      </div>
      <div className="flex-1">
        {progressPct !== null ? (
          <div className="flex items-center gap-3">
            <div
              className="flex-1 h-1 rounded-full overflow-hidden"
              style={{ background: "var(--cf-bg-300)" }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ background: "var(--cf-orange)" }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPct}%` }}
                transition={{ delay: delay + 0.2, duration: 0.7 }}
              />
            </div>
            <span
              className="font-mono text-[1.05rem] tabular-nums"
              style={{ color: "var(--cf-text)" }}
            >
              {value}
            </span>
          </div>
        ) : (
          <span
            className="font-mono text-[1.05rem]"
            style={{ color: "var(--cf-text)" }}
          >
            {value}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export function SlideLedger({ slide }: { slide: LedgerSlide }) {
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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Left: Command ledger */}
          <motion.div
            className="md:col-span-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{ background: "var(--cf-code-bg)" }}
            >
              {/* Terminal header */}
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
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  command-ledger
                </span>
                <span
                  className="ml-auto font-mono text-[12px] uppercase"
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    letterSpacing: "0.08em",
                  }}
                >
                  live
                </span>
              </div>

              {/* Ledger entries */}
              <motion.div
                className="p-4 space-y-1"
                variants={stagger}
                initial="hidden"
                animate="show"
              >
                {slide.ledger.map((entry, i) => {
                  const style = eventStyle(entry.event);
                  return (
                    <motion.div
                      key={i}
                      variants={fadeIn}
                      className="flex items-center gap-3 font-mono"
                      style={{ fontSize: "1.05rem" }}
                    >
                      <span
                        style={{
                          color: "rgba(228,228,231,0.35)",
                          fontSize: "13px",
                        }}
                      >
                        {entry.time}
                      </span>
                      <span
                        className="flex-shrink-0 w-4 text-center"
                        style={{ color: style.color, fontSize: "15px" }}
                      >
                        {style.icon}
                      </span>
                      <span style={{ color: style.color }}>
                        {entry.event}
                      </span>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Telemetry */}
          <motion.div
            className="md:col-span-5"
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div
              className="relative rounded-2xl p-5"
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
                  className="inline-block w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "var(--cf-orange)" }}
                />
                telemetry
              </div>

              <div className="flex flex-col gap-2">
                {slide.telemetry.map((t, i) => (
                  <TelemetryRow
                    key={i}
                    label={t.label}
                    value={t.value}
                    delay={0.6 + i * 0.08}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Closing line */}
        <motion.div
          className="mt-5 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <span
            className="font-mono text-[12px] uppercase px-2.5 py-1 rounded"
            style={{
              background: "var(--cf-orange-light)",
              color: "var(--cf-orange)",
              letterSpacing: "0.12em",
            }}
          >
            takeaway
          </span>
          <p
            className="font-medium"
            style={{
              fontSize: "1.25rem",
              color: "var(--cf-text)",
              letterSpacing: "-0.005em",
            }}
          >
            {slide.closing}
          </p>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
