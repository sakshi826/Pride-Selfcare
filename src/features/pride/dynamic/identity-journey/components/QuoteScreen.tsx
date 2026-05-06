import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { ShareModal } from "@/components/pride/ShareModal";

interface QuoteScreenProps {
  selectedIndex: number;
  onClose: () => void;
}

const QuoteScreen = ({ selectedIndex, onClose }: QuoteScreenProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { t } = useTranslation();

  const quotes = [
    t("quote_0"),
    t("quote_1"),
    t("quote_2"),
    t("quote_3"),
    t("quote_4"),
  ];

  const sentences = [
    t("sentence_0"),
    t("sentence_1"),
    t("sentence_2"),
    t("sentence_3"),
    t("sentence_4"),
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="min-h-screen bg-transparent flex flex-col items-center justify-center px-8 text-center"
    >
      <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
        {sentences[selectedIndex]}
      </p>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        className="text-xl italic text-foreground leading-relaxed font-medium max-w-xs"
      >
        "{quotes[selectedIndex]}"
      </motion.p>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        onClick={() => setIsShareOpen(true)}
        className="mt-10 flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm"
      >
        <Share2 size={16} />
        <span>Share</span>
      </motion.button>

      <div className="flex flex-col gap-3 w-full max-w-[240px] mt-8">
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          onClick={onClose}
          className="px-8 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] transition-all w-full"
        >
          {t('view_history')}
        </motion.button>

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
          onClick={() => {
            window.parent.postMessage("exit_activity", "*");
            window.location.href = "/pride/lgbtq-hub";
          }}
          className="px-8 py-3.5 bg-white/50 backdrop-blur-sm border border-primary/10 text-primary font-bold rounded-2xl hover:bg-primary/5 hover:scale-[1.02] active:scale-[0.98] transition-all w-full"
        >
          {t('return_home')}
        </motion.button>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share This Quote"
      />
    </motion.div>
  );
};

export default QuoteScreen;
