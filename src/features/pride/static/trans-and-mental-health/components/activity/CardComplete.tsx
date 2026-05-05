import { motion } from "framer-motion";
import { ChevronLeft, Share2 } from "lucide-react";
import { useState } from "react";
import { ShareModal } from "@/components/pride/ShareModal";

interface CardCompleteProps {
  onRestart: () => void;
  onBackToHub: () => void;
}

const CardComplete = ({ onRestart, onBackToHub }: CardCompleteProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  return (
  <div
    className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden"
    style={{ background: "#edf5ed" }}
  >
    {/* ... (orbs) */}
    <div className="absolute top-6 left-6 z-50">
      <button
        onClick={onBackToHub}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
      >
        <ChevronLeft size={18} strokeWidth={2.5} />
        Back to Hub
      </button>
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

      <motion.button
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        onClick={() => setIsShareOpen(true)}
        className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-green-200 bg-green-50/50 text-green-600 hover:bg-green-100/50 transition-all text-sm font-bold shadow-sm mb-4"
      >
        <Share2 size={16} />
        <span>Share</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
        className="flex gap-3 justify-center"
      >
        <button
          onClick={onRestart}
          className="px-8 py-3 rounded-full font-body font-semibold text-sm bg-secondary text-foreground transition-opacity hover:opacity-80"
        >
          Start Again 🔄
        </button>
        <button
          onClick={onBackToHub}
          className="px-8 py-3 rounded-full font-body font-semibold text-sm transition-opacity hover:opacity-80"
          style={{
            background: "linear-gradient(135deg, #55cdfc, #f7a8b8)",
            color: "#1a2a1a",
          }}
        >
          Back to Hub
        </button>
      </motion.div>
    </div>

    <ShareModal 
      isOpen={isShareOpen} 
      onClose={() => setIsShareOpen(false)} 
      title="Share This Resource"
    />
    </div>
  );
};

export default CardComplete;
