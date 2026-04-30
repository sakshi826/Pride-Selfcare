import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  onNext: () => void;
}

const TOTAL_SECONDS = 30;
const CYCLE_DURATION = 6; // 3s inhale + 3s exhale

const BreatheScreen = ({ onNext }: Props) => {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [phase, setPhase] = useState<"inhale" | "exhale">("inhale");

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearInterval(timer);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === "inhale" ? "exhale" : "inhale"));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <h1
        className="text-2xl font-medium tracking-tight text-foreground"
        style={{ letterSpacing: "-0.02em", textWrap: "balance" }}
      >
        Pause and Breathe
      </h1>
      <p className="text-muted-foreground text-base">
        Let's take a moment together. Just follow the circle.
      </p>

      <div className="flex flex-col items-center gap-6 py-4">
        <div className="relative flex items-center justify-center w-40 h-40">
          <motion.div
            className="rounded-full bg-primary/20"
            animate={{
              width: phase === "inhale" ? 160 : 80,
              height: phase === "inhale" ? 160 : 80,
            }}
            transition={{ duration: 3, ease: "easeInOut" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={phase}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-primary"
              >
                {phase === "inhale" ? "Breathe in…" : "Breathe out…"}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <span className="text-muted-foreground text-sm tabular-nums">
          {secondsLeft}s remaining
        </span>
      </div>

      <button
        onClick={onNext}
        className="h-14 w-full rounded-full bg-primary text-primary-foreground font-medium text-base transition-all active:scale-95"
      >
        Next
      </button>
    </div>
  );
};

export default BreatheScreen;
