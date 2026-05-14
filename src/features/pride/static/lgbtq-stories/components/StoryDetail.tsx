import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Story } from "../data/stories";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";

interface StoryDetailProps {
  story: Story;
  index: number;
  onBack: () => void;
}

const StoryDetail = ({ story, index, onBack }: StoryDetailProps) => {
  const { t } = useTranslation("minis");
  const [isShareOpen, setIsShareOpen] = useState(false);
  const portraitUrl = story.portrait;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto py-12 px-4"
    >
      <button 
        onClick={onBack}
        className="mb-12 flex items-center gap-2 text-slate-400 hover:text-[#8B5CF6] font-bold transition-colors"
      >
        <span className="text-xl">←</span> {t("All Stories")}
      </button>

      <div className="relative mb-12">
        <div 
          className="absolute -top-4 -left-4 w-24 h-24 rounded-3xl opacity-20"
          style={{ background: story.color.stripe }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            {story.name}, {story.age}
          </h1>
          <span 
            className="inline-block px-6 py-2 rounded-2xl text-sm font-black uppercase tracking-widest border-2"
            style={{ 
              background: story.color.tagBg, 
              color: story.color.tagText,
              borderColor: story.color.border
            }}
          >
            {t(story.identity)}
          </span>
        </div>
      </div>

      <div className="space-y-8 mb-16">
        {story.story.map((para, i) => (
          <p key={i} className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
            {t(para)}
          </p>
        ))}
      </div>

      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="p-10 rounded-[2.5rem] border-l-8 mb-16 shadow-lg shadow-purple-50/50"
        style={{ 
          borderColor: story.color.border,
          background: story.color.hlBg,
          color: story.color.tagText
        }}
      >
        <p className="text-2xl md:text-3xl font-bold italic leading-tight">
          "{t(story.highlight)}"
        </p>
      </motion.div>

      <div 
        className="p-10 rounded-[2.5rem] border-2 mb-16 relative overflow-hidden"
        style={{ 
          borderColor: story.color.border,
          background: story.color.takeBg
        }}
      >
        <div 
          className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 rounded-full opacity-10"
          style={{ background: story.color.stripe }}
        />
        <span 
          className="block text-xs font-black uppercase tracking-[0.2em] mb-6 opacity-60"
          style={{ color: story.color.tagText }}
        >
          💭 {t("Something to sit with")}
        </span>
        <p className="text-xl text-slate-800 leading-relaxed font-semibold">
          {t(story.takeaway)}
        </p>
      </div>

      <div className="flex flex-col items-center gap-4 py-12">
        <button
          onClick={() => setIsShareOpen(true)}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm"
        >
          <Share2 size={16} />
          <span>{t("Share Story")}</span>
        </button>

        <button 
          onClick={onBack}
          className="px-10 py-5 rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all flex items-center gap-3 group"
        >
          <span className="transition-transform group-hover:-translate-x-2">←</span> 
          {t("Back to All Stories")}
        </button>
      </div>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title={t("Share This Story")}
      />
    </motion.div>
  );
};

export default StoryDetail;
