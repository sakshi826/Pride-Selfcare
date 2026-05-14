import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

interface HeroSectionProps {
  onReadStories: () => void;
}

const HeroSection = ({ onReadStories }: HeroSectionProps) => {
  const { t } = useTranslation("minis");
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center max-w-4xl mx-auto py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-sm border border-white/20 shadow-sm mb-8"
      >
        <div className="flex gap-1">
          {[
            "#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"
          ].map(color => (
            <div key={color} className="w-2 h-2 rounded-full" style={{ background: color }} />
          ))}
        </div>
        <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{t("LGBTQ+ Voices")}</span>
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight"
      >
        {t("Real Stories of")} <em className="text-[#8B5CF6] not-italic">{t("Finding Yourself")}</em>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl"
      >
        {t("Nine people. Nine journeys. One truth — you are not alone, and who you are is worth celebrating.")}
      </motion.p>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-sm md:text-base font-medium text-[#8B5CF6]/80 italic mb-12"
      >
        "{t("Coming out is not one moment. It's a thousand small brave ones.")}"
      </motion.p>

      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReadStories}
        className="px-8 py-4 bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white rounded-2xl font-bold text-lg shadow-xl shadow-purple-200 hover:shadow-2xl hover:shadow-purple-300 transition-all"
      >
        {t("Read the Stories")}
      </motion.button>
    </section>
  );
};

export default HeroSection;
