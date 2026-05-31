import { motion } from "framer-motion";
import type { ClosingSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import {
  InfiniteTickerStrip,
  SignalPulse,
  AnimatedWaveform,
} from "../VisualElements";
import { AnimatedDrone } from "../AnimatedDrone";

export function SlideClosing({ slide }: { slide: ClosingSlide }) {
  return (
    <SlideWrapper background="dots">
      <div className="w-full h-full flex flex-col">
        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
          {/* Signal pulse behind drone */}
          <motion.div
            className="relative mb-6"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.7 }}
          >
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <SignalPulse size={220} color="rgba(61, 116, 255, 0.35)" />
            </div>
            <div className="animate-drone-hover relative z-10">
              <AnimatedDrone width={120} />
            </div>
          </motion.div>

          <motion.h1
            className="hero-shine font-medium"
            style={{
              fontSize: "clamp(3.1rem, 6.6vw, 5.2rem)",
              color: "var(--cf-text)",
              letterSpacing: "-0.045em",
              lineHeight: 1.04,
            }}
          >
            {slide.headline}
          </motion.h1>

          <motion.div
            className="mt-8 font-mono text-[12px] uppercase"
            style={{
              color: "var(--cf-text-faint)",
              letterSpacing: "0.14em",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            thanks for watching
          </motion.div>
        </div>

        {/* Animated waveform near the ticker */}
        <div style={{ position: "relative", height: 40 }}>
          <AnimatedWaveform height={36} opacity={0.18} />
          <InfiniteTickerStrip items={slide.ticker} bottom={0} />
        </div>
      </div>
    </SlideWrapper>
  );
}
