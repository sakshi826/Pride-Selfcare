import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Story } from "../data/stories";

interface StoryCardProps {
  story: Story;
  index: number;
  onClick: () => void;
}

const StoryCard = ({ story, index, onClick }: StoryCardProps) => {
  const { t } = useTranslation("minis");
  const avatarUrl = story.avatar || story.portrait;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 cursor-pointer"
    >
      <div 
        className="h-2 w-full transition-transform group-hover:scale-y-150 origin-top" 
        style={{ background: story.color.stripe }} 
      />
      
      <div className="p-8">
        <div className="flex items-center gap-4 mb-6">
          <div 
            className="w-16 h-16 rounded-2xl flex items-center justify-center border-2 flex-shrink-0 text-xl font-black"
            style={{ 
              borderColor: story.color.stripe,
              background: story.color.tagBg,
              color: story.color.tagText
            }}
          >
            {story.name.charAt(0)}
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-slate-900 text-lg leading-tight">
              {story.name}, {story.age}
            </h3>
            <span 
              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit"
              style={{ background: story.color.tagBg, color: story.color.tagText }}
            >
              {t(story.identity)}
            </span>
          </div>
        </div>
        
        <p className="text-slate-600 text-sm leading-relaxed italic line-clamp-3">
          "{t(story.quote)}"
        </p>

        <div className="mt-6 flex items-center text-xs font-bold text-[#8B5CF6] opacity-0 group-hover:opacity-100 transition-opacity">
          {t("Read Full Story")} <span className="ml-1">→</span>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
