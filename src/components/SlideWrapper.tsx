import { motion } from "framer-motion";
import { DotPattern, GridOverlay } from "./VisualElements";

interface SlideWrapperProps {
  children: React.ReactNode;
  background?: "dots" | "grid" | "plain";
  padded?: boolean;
}

export function SlideWrapper({
  children,
  background = "grid",
  padded = true,
}: SlideWrapperProps) {
  return (
    <div
      className="w-full h-full flex items-center justify-center relative overflow-hidden"
      style={{ background: "var(--cf-bg-100)" }}
    >
      {background === "dots" && <DotPattern />}
      {background === "grid" && <GridOverlay />}
      <motion.div
        className={`w-full h-full flex items-center justify-center relative ${padded ? "" : ""}`}
        style={{
          maxWidth: "1280px",
          paddingLeft: padded ? "3%" : 0,
          paddingRight: padded ? "3%" : 0,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
