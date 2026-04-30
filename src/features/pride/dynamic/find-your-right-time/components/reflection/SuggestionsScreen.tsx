import { motion } from "framer-motion";
import type { Answers } from "../../pages/Index";

interface Props {
  answers: Answers;
  onContinue: () => void;
}

const SuggestionsScreen = ({ answers, onContinue }: Props) => {
  const suggestions: { emoji: string; text: string }[] = [];

  if (answers.financial1 === "Dependent" || answers.financial2 === "No" || answers.financial2 === "Maybe") {
    suggestions.push({ emoji: "💰", text: "Build some financial stability" });
  }
  if (answers.family1 === "Unsupportive" || answers.family2 === "No" || answers.family2 === "Sometimes") {
    suggestions.push({ emoji: "🤝", text: "Share only with safe people" });
  }
  if (answers.emotional1 === "Not ready" || answers.emotional2 === "No" || answers.emotional2 === "Maybe") {
    suggestions.push({ emoji: "💛", text: "Take more time or talk to someone" });
  }
  if (answers.safety1 === "No" || answers.safety1 === "Somewhat" || answers.safety2 === "No" || answers.safety2 === "Maybe") {
    suggestions.push({ emoji: "🛡️", text: "Focus on creating a safe plan" });
  }

  if (suggestions.length === 0) {
    suggestions.push({ emoji: "✨", text: "You're in a great position — keep building your support network" });
  }

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6 w-full">
        <p className="text-sm text-muted-foreground font-medium">💡 What might help you next</p>

        <div className="w-full space-y-3">
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="w-full p-5 rounded-2xl bg-card shadow-card flex items-start gap-4"
            >
              <span className="text-2xl">{s.emoji}</span>
              <p className="text-base text-foreground/90 leading-relaxed">{s.text}</p>
            </motion.div>
          ))}
        </div>
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

export default SuggestionsScreen;
