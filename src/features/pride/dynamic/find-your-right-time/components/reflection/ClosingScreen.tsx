import { motion } from "framer-motion";
import { Save, History, Home } from "lucide-react";
import { useState } from "react";

interface Props {
  onSave: () => void;
  onViewHistory: () => void;
  onGoHome: () => void;
}

const ClosingScreen = ({ onSave, onViewHistory, onGoHome }: Props) => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSave();
    setSaved(true);
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-5xl"
        >
          🌸
        </motion.div>
        <p className="text-lg leading-relaxed text-foreground/90 text-justify hyphens-auto font-medium">
          There's no right time except what feels right for you. Take things at your own pace.
        </p>
      </div>

      <div className="w-full space-y-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={handleSave}
          disabled={saved}
          className="w-full py-4 px-6 rounded-2xl bg-lavender text-foreground font-semibold text-base shadow-card transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60"
        >
          <Save size={18} />
          {saved ? "Reflection Saved ✓" : "Save Reflection"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onViewHistory}
          className="w-full py-4 px-6 rounded-2xl bg-peach text-foreground font-semibold text-base shadow-card transition-all duration-200 flex items-center justify-center gap-2"
        >
          <History size={18} />
          View History
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={onGoHome}
          className="w-full py-4 px-6 rounded-2xl bg-mint text-foreground font-semibold text-base shadow-card transition-all duration-200 flex items-center justify-center gap-2"
        >
          <Home size={18} />
          Go Home
        </motion.button>
      </div>
    </div>
  );
};

export default ClosingScreen;
