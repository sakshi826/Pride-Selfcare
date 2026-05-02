import { motion } from "framer-motion";

import { Story } from "../data/stories";

interface StoryDetailProps {
  story: Story;
  index: number;
  onBack: () => void;
}

const StoryDetail = ({ story, index, onBack }: StoryDetailProps) => {
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
        <span className="text-xl">←</span> All Stories
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
            {story.identity}
          </span>
        </div>
      </div>

      <div className="rounded-[3rem] overflow-hidden shadow-2xl mb-16 border-4 border-white aspect-[4/5] md:aspect-video relative group">
        <img 
          src={portraitUrl} 
          alt={story.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60" />
      </div>

      <div className="space-y-8 mb-16">
        {story.story.map((para, i) => (
          <p key={i} className="text-lg md:text-xl text-slate-700 leading-relaxed font-medium">
            {para}
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
          "{story.highlight}"
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
          💭 Something to sit with
        </span>
        <p className="text-xl text-slate-800 leading-relaxed font-semibold">
          {story.takeaway}
        </p>
      </div>

      <div className="flex justify-center py-12">
        <button 
          onClick={onBack}
          className="px-10 py-5 rounded-3xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-all flex items-center gap-3 group"
        >
          <span className="transition-transform group-hover:-translate-x-2">←</span> 
          Back to All Stories
        </button>
      </div>
    </motion.div>
  );
};

export default StoryDetail;
