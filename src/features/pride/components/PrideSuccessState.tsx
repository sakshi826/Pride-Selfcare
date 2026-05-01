import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface PrideSuccessStateProps {
  title?: string;
  message?: string;
  emoji?: string;
  onRestart?: () => void;
  variant?: "pride" | "trans";
}

export const PrideSuccessState: React.FC<PrideSuccessStateProps> = ({
  title = "You did it!",
  message = "You showed up for yourself today. That matters more than you know.",
  emoji = "🎉",
  onRestart,
  variant = "pride"
}) => {
  const navigate = useNavigate();
  
  const gradientClass = variant === "trans"
    ? "from-[#55cdfc] to-[#f7a8b8]"
    : "from-[#EC4899] to-[#3B82F6]";

  const icons = variant === "trans"
    ? ["💙", "🩷", "🤍", "🩷", "💙"]
    : ["✨", "🌈", "💖", "🦄", "🌈"];

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="w-full rounded-[32px] bg-white/80 backdrop-blur-xl p-10 text-center space-y-8 shadow-2xl border border-white"
    >
      <div className="space-y-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="text-7xl"
        >
          {emoji}
        </motion.div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#EC4899] to-[#A855F7] bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg max-w-sm mx-auto">
          {message}
        </p>
      </div>

      <div className="flex gap-2 justify-center text-2xl py-2">
        {icons.map((e, i) => (
          <motion.span
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1, type: "spring" }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <div className="flex flex-col gap-4 pt-4">
        {onRestart && (
          <button
            onClick={onRestart}
            className="btn-secondary w-full"
          >
            Start Over
          </button>
        )}
        <button
          onClick={() => navigate('/lgbtq-hub')}
          className={`btn-primary w-full py-5 text-lg`}
          style={{ 
            background: variant === "trans" 
              ? "linear-gradient(135deg, #55cdfc 0%, #f7a8b8 100%)" 
              : undefined 
          }}
        >
          Back to Hub
        </button>
      </div>
    </motion.div>
  );
};
