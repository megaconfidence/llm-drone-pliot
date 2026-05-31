import { motion } from "framer-motion";
import type { TitleSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { InfiniteTickerStrip, SignalPulse } from "../VisualElements";
import { AnimatedDrone } from "../AnimatedDrone";

export function SlideTitle({ slide }: { slide: TitleSlide }) {
  return (
    <SlideWrapper background="dots">
      <div className="w-full h-full flex flex-col">
        {/* Top spacer (header is already 44px above) */}
        <div className="flex-1 flex items-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-12 items-center gap-8">
            {/* Left: text */}
            <div className="md:col-span-7">
              <motion.div
                className="font-mono text-[14px] uppercase mb-6 inline-flex items-center gap-2"
                style={{ color: "var(--cf-orange)", letterSpacing: "0.18em" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: "var(--cf-orange)" }}
                />
                {slide.event}
              </motion.div>

              <h1
                className="hero-shine font-medium"
                style={{
                  fontSize: "clamp(3.6rem, 8vw, 6.6rem)",
                  color: "var(--cf-text)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.04,
                }}
              >
                {slide.title}
              </h1>

              <motion.h2
                className="font-medium mt-4"
                style={{
                  fontSize: "clamp(2rem, 3.6vw, 3rem)",
                  color: "var(--cf-orange)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                {slide.subtitle}
              </motion.h2>

              <motion.div
                className="mt-10 flex items-center gap-3 font-mono text-[15px]"
                style={{
                  color: "var(--cf-text-muted)",
                  letterSpacing: "0.04em",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
              >
                <span style={{ color: "var(--cf-text)" }}>
                  {slide.presenter}
                </span>
                <span style={{ color: "var(--cf-border)" }}>-</span>
                <span>{slide.presenterRole}</span>
              </motion.div>
            </div>

            {/* Right: drone with signal rings */}
            <motion.div
              className="md:col-span-5 flex items-center justify-center relative"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Signal rings behind drone */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <SignalPulse size={420} color="rgba(61, 116, 255, 0.4)" />
              </div>
              <div className="animate-drone-hover relative z-10">
                <AnimatedDrone width={300} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Ticker spans the bottom */}
        <div style={{ position: "relative", height: 40 }}>
          <InfiniteTickerStrip items={slide.ticker} bottom={0} />
        </div>
      </div>
    </SlideWrapper>
  );
}
