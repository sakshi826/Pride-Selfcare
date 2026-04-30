import { motion } from "framer-motion";

interface Props {
  step: number;
  totalSteps: number;
  q1: string;
  q1Options: string[];
  q1Answer?: string;
  onQ1: (value: string) => void;
  q2: string;
  q2Options: string[];
  q2Answer?: string;
  onQ2: (value: string) => void;
  onNext: () => void;
  bgColor: "lavender" | "pink" | "blue" | "peach" | "mint";
}

const colorMap: Record<string, string> = {
  lavender: "bg-lavender",
  pink: "bg-pink",
  blue: "bg-blue",
  peach: "bg-peach",
  mint: "bg-mint",
};

const activeColorMap: Record<string, string> = {
  lavender: "bg-lavender ring-2 ring-primary/30",
  pink: "bg-pink ring-2 ring-primary/30",
  blue: "bg-blue ring-2 ring-primary/30",
  peach: "bg-peach ring-2 ring-primary/30",
  mint: "bg-mint ring-2 ring-primary/30",
};

const ProgressDots = ({ step, total }: { step: number; total: number }) => (
  <div className="flex gap-2 justify-center py-4">
    {Array.from({ length: total }).map((_, i) => (
      <div
        key={i}
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          i < step ? "bg-primary" : "bg-primary/20"
        }`}
      />
    ))}
  </div>
);

const OptionButton = ({
  label,
  selected,
  onClick,
  color,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  color: string;
}) => (
  <motion.button
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
    className={`w-full py-4 px-6 rounded-2xl text-left font-medium transition-all duration-200 shadow-card ${
      selected ? "bg-secondary ring-2 ring-primary/30" : "bg-card hover:shadow-soft"
    }`}
  >
    {label}
  </motion.button>
);

const AssessmentScreen = ({
  step,
  totalSteps,
  q1,
  q1Options,
  q1Answer,
  onQ1,
  q2,
  q2Options,
  q2Answer,
  onQ2,
  onNext,
  bgColor,
}: Props) => {
  const canContinue = q1Answer && q2Answer;

  return (
    <div className="flex flex-col items-center flex-1 w-full space-y-6">
      <ProgressDots step={step} total={totalSteps} />

      <div className="w-full p-6 rounded-3xl bg-card/70 backdrop-blur-sm shadow-card space-y-4">
        <p className="text-lg font-semibold text-foreground text-center text-balance">
          {q1}
        </p>
        <div className="flex flex-col gap-3">
          {q1Options.map((opt) => (
            <OptionButton
              key={opt}
              label={opt}
              selected={q1Answer === opt}
              onClick={() => onQ1(opt)}
              color={bgColor}
            />
          ))}
        </div>
      </div>

      {q1Answer && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full p-6 rounded-3xl bg-card/70 backdrop-blur-sm shadow-card space-y-4"
        >
          <p className="text-lg font-semibold text-foreground text-center text-balance">
            {q2}
          </p>
          <div className="flex flex-col gap-3">
            {q2Options.map((opt) => (
              <OptionButton
                key={opt}
                label={opt}
                selected={q2Answer === opt}
                onClick={() => onQ2(opt)}
                color={bgColor}
              />
            ))}
          </div>
        </motion.div>
      )}

      {canContinue && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.97 }}
          onClick={onNext}
          className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-soft transition-all duration-200 hover:opacity-90"
        >
          Continue
        </motion.button>
      )}
    </div>
  );
};

export default AssessmentScreen;
