import { motion } from "framer-motion";
import type { ApprovalSlide } from "../../data/types";
import { SlideWrapper } from "../SlideWrapper";
import { CornerBrackets } from "../VisualElements";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.6 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SlideApproval({ slide }: { slide: ApprovalSlide }) {
  return (
    <SlideWrapper background="grid">
      <div className="w-full grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        {/* Left: heading + supporting */}
        <div className="md:col-span-5">
          <motion.h2
            className="font-medium"
            style={{
              fontSize: "clamp(2.2rem, 4.4vw, 3.3rem)",
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

          <motion.p
            className="mt-5 leading-relaxed"
            style={{
              fontSize: "1.4rem",
              color: "var(--cf-text-muted)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {slide.supporting}
          </motion.p>

          <motion.div
            className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase"
            style={{ color: "var(--cf-orange)", letterSpacing: "0.14em" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ background: "var(--cf-orange)" }}
            />
            collaboration boundary
          </motion.div>
        </div>

        {/* Right: approval modal */}
        <motion.div
          className="md:col-span-7"
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="relative rounded-2xl shadow-2xl overflow-hidden"
            style={{
              background: "var(--cf-bg-200)",
              border: "1px solid var(--cf-border)",
              boxShadow: "0 20px 40px -16px rgba(10, 26, 58, 0.18)",
            }}
          >
            <CornerBrackets />

            {/* Modal header */}
            <div
              className="px-6 py-4 flex items-center justify-between border-b"
              style={{ borderColor: "var(--cf-border)" }}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse-glow"
                  style={{ background: "var(--cf-orange)" }}
                />
                <span
                  className="font-mono text-[12px] uppercase"
                  style={{
                    color: "var(--cf-orange)",
                    letterSpacing: "0.14em",
                  }}
                >
                  plan ready / awaiting approval
                </span>
              </div>
              <div
                className="font-mono text-[12px]"
                style={{ color: "var(--cf-text-faint)" }}
              >
                {slide.plan.length} steps
              </div>
            </div>

            {/* Plan preview */}
            <motion.div
              className="px-6 py-5"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <div
                className="font-mono text-[12px] uppercase mb-3"
                style={{
                  color: "var(--cf-text-faint)",
                  letterSpacing: "0.12em",
                }}
              >
                proposed plan
              </div>
              <ol className="flex flex-col gap-1.5">
                {slide.plan.map((step, i) => (
                  <motion.li
                    key={i}
                    variants={fadeUp}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-lg"
                    style={{ background: "var(--cf-bg-100)" }}
                  >
                    <span
                      className="font-mono text-[13px] flex-shrink-0 w-6 text-right"
                      style={{ color: "var(--cf-text-faint)" }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-mono text-[1.05rem]"
                      style={{ color: "var(--cf-text)" }}
                    >
                      {step}
                    </span>
                  </motion.li>
                ))}
              </ol>
            </motion.div>

            {/* Action buttons */}
            <motion.div
              className="px-6 py-4 flex items-center gap-3 border-t"
              style={{
                background: "var(--cf-bg-100)",
                borderColor: "var(--cf-border)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.4 }}
            >
              {slide.buttons.map((btn, i) => {
                const isPrimary = i === 0;
                const isCancel =
                  btn.toLowerCase().includes("cancel") ||
                  btn.toLowerCase().includes("reject");
                return (
                  <button
                    key={i}
                    type="button"
                    className="px-5 py-2.5 rounded-lg text-[1.05rem] font-medium transition-opacity cursor-pointer hover:opacity-90"
                    style={
                      isPrimary
                        ? {
                            background: "var(--cf-orange)",
                            color: "white",
                          }
                        : {
                            background: "transparent",
                            color: isCancel
                              ? "var(--cf-text-muted)"
                              : "var(--cf-text)",
                            border: "1px solid var(--cf-border)",
                          }
                    }
                  >
                    {btn}
                  </button>
                );
              })}

              <div
                className="ml-auto font-mono text-[12px]"
                style={{ color: "var(--cf-text-faint)" }}
              >
                space to approve
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SlideWrapper>
  );
}
