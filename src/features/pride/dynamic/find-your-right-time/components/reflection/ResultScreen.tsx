import { motion } from "framer-motion";
import type { Reflection } from "../../pages/Index";

interface Props {
  result: Reflection["result"];
  onContinue: () => void;
}

const resultData = {
  "not-ready": {
    emoji: "🌱",
    title: "Not the right time (safety first)",
    description: "It might be safer to wait and build support before coming out.",
    bg: "bg-mint",
  },
  preparing: {
    emoji: "🌤",
    title: "Preparing",
    description: "You're getting there, but a few areas may need support.",
    bg: "bg-peach",
  },
  ready: {
    emoji: "🌈",
    title: "Ready (with support)",
    description: "You seem to have supportive factors in place, but support still matters.",
    bg: "bg-lavender",
  },
};

const ResultScreen = ({ result, onContinue }: Props) => {
  const data = resultData[result];

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 w-full">
        <p className="text-sm text-muted-foreground font-medium">🧭 Your Readiness Reflection</p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className={`w-full p-8 rounded-3xl ${data.bg} flex flex-col items-center space-y-4 shadow-card`}
        >
          <span className="text-5xl">{data.emoji}</span>
          <h2 className="text-xl font-semibold text-foreground text-center">{data.title}</h2>
          <p className="text-base text-foreground/80 text-justify leading-relaxed hyphens-auto">
            {data.description}
          </p>
        </motion.div>
      </div>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onContinue}
        className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-soft transition-all duration-200 hover:opacity-90"
      >
        Continue
      </motion.button>
    </div>
  );
};

export default ResultScreen;
