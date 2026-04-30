import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const levels = [
  { emoji: "🌫️", label: "Mild unease", desc: "A background sense that something is off. Hard to name but persistent." },
  { emoji: "😶", label: "Social dysphoria", desc: "Distress when misgendered, deadnamed, or seen incorrectly by others." },
  { emoji: "🪞", label: "Body dysphoria", desc: "Discomfort with specific physical features that don't match your gender." },
  { emoji: "😔", label: "Intense distress", desc: "Dysphoria that significantly affects daily functioning and mood." },
  { emoji: "🆘", label: "Crisis level", desc: "Overwhelming distress. Please reach out to a crisis line or trusted person." },
];

const Card2Scale = () => {
  const [level, setLevel] = useState(0);

  return (
    <div className="space-y-6">
      <p className="font-body text-base leading-relaxed text-foreground">
        Dysphoria exists on a spectrum. It can shift day to day, hour to hour. Understanding where you are helps you respond with the right tools.
      </p>

      <div className="space-y-3">
        <div className="flex justify-between font-body text-sm text-muted-foreground px-1">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
        <input
          type="range"
          min={0}
          max={4}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
          className="w-full h-3 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)`,
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={level}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl bg-muted p-5 text-center space-y-3"
        >
          <span className="text-4xl">{levels[level].emoji}</span>
          <p className="font-display text-lg">{levels[level].label}</p>
          <p className="font-body text-sm text-foreground leading-relaxed">{levels[level].desc}</p>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {level === 4 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="rounded-xl bg-trans-pink/20 border border-trans-pink p-4 text-center space-y-3"
          >
            <p className="font-body text-sm font-semibold text-foreground">
              If you are at this level right now, please reach out. You do not have to manage this alone.
            </p>
            <a
              href="https://web.mantracare.com/plans/lgbtq-therapy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-sm font-bold underline text-foreground hover:opacity-70 transition-opacity"
            >
              Book a session right away →
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Card2Scale;
