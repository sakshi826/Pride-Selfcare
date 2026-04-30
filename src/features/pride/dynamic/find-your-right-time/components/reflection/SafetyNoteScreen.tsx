import { motion } from "framer-motion";

interface Props {
  onContinue: () => void;
}

const SafetyNoteScreen = ({ onContinue }: Props) => (
  <div className="flex flex-col items-center justify-center flex-1 w-full space-y-8">
    <div className="flex-1 flex flex-col items-center justify-center space-y-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl"
      >
        💛
      </motion.div>
      <p className="text-lg leading-relaxed text-foreground/90 text-justify hyphens-auto font-medium">
        Your safety matters most.
      </p>
      <p className="text-base leading-relaxed text-foreground/80 text-justify hyphens-auto">
        You don't have to come out until you feel ready—and it's okay if that time isn't now.
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

export default SafetyNoteScreen;
