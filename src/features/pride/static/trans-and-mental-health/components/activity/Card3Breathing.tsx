import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardShell from "./CardShell";
import CardEye from "./CardEye";

const statements = [
  "The difficulty you have felt has a name and a cause.",
  "You are not broken. You are navigating something genuinely hard.",
  "You deserve support that sees all of who you are.",
  "Getting help is not weakness. It is self-respect.",
];

const Card3Breathing = ({ active }: { active: boolean }) => {
  const [phase, setPhase] = useState<"in" | "out">("in");
  const [visibleStatements, setVisibleStatements] = useState(0);

  useEffect(() => {
    if (!active) { setVisibleStatements(0); return; }
    const interval = setInterval(() => setPhase((p) => (p === "in" ? "out" : "in")), 4000);
    return () => clearInterval(interval);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    let count = 0;
    const timer = setInterval(() => {
      count++;
      setVisibleStatements(count);
      if (count >= statements.length) clearInterval(timer);
    }, 2000);
    return () => clearInterval(timer);
  }, [active]);

  const isIn = phase === "in";

  return (
    <CardShell bandColor="blue">
      <CardEye eye="Breathe" title="Ground Yourself Right Now" />
      <div className="flex flex-col items-center py-4">
        <div className="relative w-40 h-40 flex items-center justify-center">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-trans-blue/20"
              animate={{
                scale: isIn ? 1.1 + i * 0.12 : 0.85 + i * 0.08,
                opacity: isIn ? 0.5 - i * 0.12 : 0.2,
              }}
              transition={{ duration: 4, ease: "easeInOut" }}
            />
          ))}
          <motion.div
            className="w-24 h-24 rounded-full"
            style={{
              background: "linear-gradient(135deg, hsl(193 96% 66% / 0.5), hsl(348 82% 82% / 0.5))",
            }}
            animate={{ scale: isIn ? 1.15 : 0.8 }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
          <p className="absolute font-display text-sm text-foreground italic">
            {isIn ? "Breathe in" : "Breathe out"}
          </p>
        </div>
        <div className="mt-6 space-y-3 w-full">
          <AnimatePresence>
            {statements.slice(0, visibleStatements).map((s, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm text-[hsl(0,0%,0%)] text-center leading-relaxed font-body italic"
              >
                {s}
              </motion.p>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </CardShell>
  );
};

export default Card3Breathing;
