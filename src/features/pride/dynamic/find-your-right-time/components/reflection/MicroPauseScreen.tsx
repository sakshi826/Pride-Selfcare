import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const MicroPauseScreen = ({ onContinue }: Props) => (
  <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-5xl"
      >
        🕊️
      </motion.div>
      <p className="text-lg leading-relaxed text-foreground/90 text-center font-medium">
        Take a moment.
      </p>
      <p className="text-base leading-relaxed text-foreground/70 text-center">
        Your safety always comes first.
      </p>
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

export default MicroPauseScreen;
