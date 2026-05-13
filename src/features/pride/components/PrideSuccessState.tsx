import { motion } from "framer-motion";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ShareModal } from "@/components/pride/ShareModal";

interface PrideSuccessStateProps {
  title?: string;
  message?: string;
  emoji?: string;
  onRestart?: () => void;
  variant?: "pride" | "trans";
}

export const PrideSuccessState: React.FC<PrideSuccessStateProps> = ({
  title,
  message,
  emoji = "🎉",
  onRestart,
  variant = "pride"
}) => {
  const { t } = useTranslation("hub");
  const [isShareOpen, setIsShareOpen] = useState(false);
  
  const displayTitle = title || t("You did it!");
  const displayMessage = message || t("You showed up for yourself today. That matters more than you know.");

  const icons = variant === "trans"
    ? ["💙", "🩷", "🤍", "🩷", "💙"]
    : ["✨", "🌈", "💖", "🦄", "🌈"];

  const handleExit = () => {
    window.parent.postMessage("exit_activity", "*");
    window.location.href = '/pride/lgbtq-hub';
  };

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
          {displayTitle}
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg max-w-sm mx-auto">
          {displayMessage}
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
            {t("Start Over")}
          </button>
        )}
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
        >
          <Share2 size={16} />
          <span>{t("Share")}</span>
        </button>

        <button
          onClick={handleExit}
          className={`btn-primary w-full py-5 text-lg`}
          style={{ 
            background: variant === "trans" 
              ? "linear-gradient(135deg, #55cdfc 0%, #f7a8b8 100%)" 
              : undefined 
          }}
        >
          {t("Back to Hub")}
        </button>

        <ShareModal 
          isOpen={isShareOpen} 
          onClose={() => setIsShareOpen(false)} 
          title={t("Share This Activity")}
        />
      </div>
    </motion.div>
  );
};
