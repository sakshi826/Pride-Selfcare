import { motion } from "framer-motion";
import type { StarData } from "../../pages/Index";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";

interface ReflectionScreenProps {
  stars: StarData[];
  onSave: () => void;
  onCreateAnother: () => void;
}

const ReflectionScreen = ({ stars, onSave, onCreateAnother }: ReflectionScreenProps) => {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const minX = Math.min(...stars.map((s) => s.x));
  const maxX = Math.max(...stars.map((s) => s.x));
  const minY = Math.min(...stars.map((s) => s.y));
  const maxY = Math.max(...stars.map((s) => s.y));
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;

  const normalized = stars.map((s) => ({
    ...s,
    nx: 30 + ((s.x - minX) / rangeX) * 190,
    ny: 30 + ((s.y - minY) / rangeY) * 190,
  }));

  return (
  <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-10 animate-fade-in relative z-10">
    <div className="relative group">
      <div className="absolute -inset-4 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-all duration-1000" />
      <svg width="280" height="280" viewBox="0 0 260 260" className="relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
        {normalized.map((star, i) => {
          if (i === 0) return null;
          const prev = normalized[i - 1];
          return (
            <motion.line
              key={`line-${i}`}
              x1={prev.nx} y1={prev.ny} x2={star.nx} y2={star.ny}
              className="stroke-white"
              strokeWidth="1.5" opacity="0.3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5 + i * 0.3, duration: 1, ease: "easeInOut" }}
            />
          );
        })}
        {normalized.map((star, i) => (
          <motion.g
            key={star.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.2, type: "spring", stiffness: 100 }}
          >
            <circle cx={star.nx} cy={star.ny} r="5" className="fill-white" />
            <circle cx={star.nx} cy={star.ny} r="12" fill="none" className="stroke-white" strokeWidth="0.5" opacity="0.2" />
            <text
              x={star.nx} y={star.ny + 22}
              textAnchor="middle"
              className="fill-white text-[10px] font-black uppercase tracking-widest opacity-80"
            >
              {star.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </div>

    <div className="premium-card p-10 md:p-12 text-center space-y-6 w-full border-white/5 bg-black/40 backdrop-blur-xl">
      <h2 className="text-2xl font-bold text-white">Your Identity Map</h2>
      <p className="text-lg text-white/70 leading-relaxed justified-text">
        {t("reflection_text_1")} {t("reflection_text_2")}
      </p>
    </div>

    <div className="w-full space-y-4">
      <button
        onClick={() => setIsShareOpen(true)}
        className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 transition-all text-sm font-bold shadow-sm mb-2"
      >
        <Share2 size={16} />
        <span>Share</span>
      </button>

      <button
        onClick={onSave}
        className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20"
      >
        Save Constellation
      </button>

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share My Identity Map"
      />
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onCreateAnother}
          className="btn-secondary w-full h-14"
        >
          New Map
        </button>
        <button
          onClick={() => {
            window.parent.postMessage("exit_activity", "*");
            window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
          }}
          className="btn-secondary w-full h-14"
        >
          To Hub
        </button>
      </div>
    </div>
  </div>
  );
};

export default ReflectionScreen;
