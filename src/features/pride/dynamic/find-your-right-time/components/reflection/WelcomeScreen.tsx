import { motion } from "framer-motion";
import { ArrowLeft, History } from "lucide-react";

interface Props {
  onStart: () => void;
  onViewHistory: () => void;
}

const WelcomeScreen = ({ onStart, onViewHistory }: Props) => (
  <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
    <div className="w-full flex justify-between items-center">
      <button className="p-2 rounded-2xl text-muted-foreground hover:bg-secondary transition-colors">
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={onViewHistory}
        className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm text-muted-foreground hover:bg-secondary transition-colors"
      >
        <History size={16} />
        View History
      </button>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center space-y-6 text-center">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl"
      >
        🛡️
      </motion.div>
      <h1 className="text-2xl font-semibold tracking-tight text-balance text-foreground">
        Finding Your Right Time
      </h1>
      <p className="text-base leading-relaxed text-foreground/90 text-justify hyphens-auto">
        A space to reflect on what feels safe and right for you.
      </p>
      <p className="text-sm text-muted-foreground">⏱ Takes about 3–4 minutes</p>
    </div>

    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onStart}
      className="w-full py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-semibold text-lg shadow-soft transition-all duration-200 hover:opacity-90"
    >
      Start
    </motion.button>
  </div>
);

export default WelcomeScreen;
