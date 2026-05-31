import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DeckContent, SlideContent } from "../data/types";
import { SlideRenderer } from "./SlideRenderer";
import { architectureDiagrams } from "./slides/SlideArchitecture";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction * 56,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: (direction: number) => ({
    x: direction * -56,
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// How many internal "steps" (e.g. build stages) a slide cycles through
// before navigation moves on to the next/previous slide.
function stepsFor(slide: SlideContent): number {
  if (slide.type === "architecture") return architectureDiagrams.length;
  return 1;
}

// Deep-link support: a slide is reachable via /#2 (hash) or /2 (path),
// 1-indexed. Returns a 0-based slide index clamped to range, or null if the
// URL doesn't reference a slide.
function parseSlideFromUrl(total: number): number | null {
  if (typeof window === "undefined") return null;
  const fromHash = window.location.hash.replace(/^#\/?/, "");
  const fromPath = window.location.pathname.replace(/^\//, "");
  for (const raw of [fromHash, fromPath]) {
    if (/^\d+$/.test(raw)) {
      return Math.min(Math.max(parseInt(raw, 10) - 1, 0), total - 1);
    }
  }
  return null;
}

export function Presentation({ content }: { content: DeckContent }) {
  const totalSlides = content.slides.length;
  const [pos, setPos] = useState(() => ({
    slide: parseSlideFromUrl(totalSlides) ?? 0,
    step: 0,
    dir: 0,
  }));

  const navigate = useCallback(
    (dir: 1 | -1) => {
      setPos((p) => {
        const steps = stepsFor(content.slides[p.slide]);
        if (dir === 1) {
          if (p.step < steps - 1) return { ...p, step: p.step + 1 };
          if (p.slide < totalSlides - 1)
            return { slide: p.slide + 1, step: 0, dir: 1 };
          return p;
        } else {
          if (p.step > 0) return { ...p, step: p.step - 1 };
          if (p.slide > 0) {
            const prevSteps = stepsFor(content.slides[p.slide - 1]);
            return { slide: p.slide - 1, step: prevSteps - 1, dir: -1 };
          }
          return p;
        }
      });
    },
    [content.slides, totalSlides],
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        navigate(1);
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        navigate(-1);
      } else if (e.key === "Home") {
        e.preventDefault();
        setPos({ slide: 0, step: 0, dir: -1 });
      } else if (e.key === "End") {
        e.preventDefault();
        setPos({ slide: totalSlides - 1, step: 0, dir: 1 });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, totalSlides]);

  // Keep the URL in sync with the current slide as a clean /N path so it can be
  // shared or bookmarked. replaceState never reloads and doesn't fire events,
  // so this can't loop with the hashchange listener below.
  useEffect(() => {
    window.history.replaceState(null, "", "/" + (pos.slide + 1));
  }, [pos.slide]);

  // Let a manual hash edit (e.g. typing #7) jump to a slide live.
  useEffect(() => {
    const onHashChange = () => {
      const target = parseSlideFromUrl(totalSlides);
      if (target === null) return;
      setPos((p) =>
        p.slide === target
          ? p
          : { slide: target, step: 0, dir: target > p.slide ? 1 : -1 },
      );
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [totalSlides]);

  const currentSlide = content.slides[pos.slide];

  return (
    <div
      className="w-screen h-screen overflow-hidden relative"
      style={{
        fontFamily: '"Inter", system-ui, sans-serif',
        background: "var(--cf-bg-100)",
      }}
    >
      <div className="absolute inset-0">
        <AnimatePresence custom={pos.dir} mode="wait">
          <motion.div
            key={pos.slide}
            className="absolute inset-0"
            custom={pos.dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <SlideRenderer
              slide={currentSlide}
              meta={content.meta}
              step={pos.step}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Minimal slide counter (bottom-right) */}
      <div
        className="absolute bottom-5 right-6 font-mono text-[11px] tabular-nums pointer-events-none select-none z-50 rounded-full"
        style={{
          color: "var(--cf-text-faint)",
          letterSpacing: "0.08em",
          background: "var(--cf-bg-100)",
          border: "1px solid var(--cf-border)",
          padding: "4px 10px",
          boxShadow: "0 1px 3px rgba(10, 26, 58, 0.07)",
        }}
      >
        {String(pos.slide + 1).padStart(2, "0")}{" "}
        <span style={{ opacity: 0.4 }}>/</span>{" "}
        {String(totalSlides).padStart(2, "0")}
      </div>
    </div>
  );
}
