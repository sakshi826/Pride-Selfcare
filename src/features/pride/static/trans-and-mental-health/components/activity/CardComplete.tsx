import { motion } from "framer-motion";

interface CardCompleteProps {
  onRestart: () => void;
}

const CardComplete = ({ onRestart }: CardCompleteProps) => (
  <div
    className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    style={{ background: "#edf5ed" }}
  >
    {/* Floating orbs */}
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl"
        style={{ background: "hsl(var(--trans-blue))", top: "20%", left: "10%" }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl"
        style={{ background: "hsl(var(--trans-pink))", bottom: "15%", right: "5%" }}
        animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>

    <div className="relative z-10 text-center max-w-[400px]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="text-7xl mb-6"
      >
        🎉
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="font-display text-3xl text-foreground mb-3"
      >
        You Did It!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="text-[hsl(0,0%,0%)] font-body leading-relaxed mb-3"
      >
        You showed up for yourself today. That takes courage and it matters more than you know.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="font-display italic text-foreground text-lg mb-8"
      >
        "You are real. You are valid. You are worthy of care."
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="flex flex-col gap-3 items-center"
      >
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-full font-body font-semibold text-sm transition-opacity hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, #55cdfc, #f7a8b8)",
            color: "#1a2a1a",
          }}
        >
          Start Again 💜
        </button>
      </motion.div>
    </div>
  </div>
);

export default CardComplete;
