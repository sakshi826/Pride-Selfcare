import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import type { StarData } from "../../pages/Index";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface StarSelectionScreenProps {
  onComplete: (stars: StarData[]) => void;
  onBack: () => void;
}

const StarSelectionScreen = ({ onComplete, onBack }: StarSelectionScreenProps) => {
  const { t } = useTranslation();

  const PROMPTS = useMemo(() => [
    t("prompt_1"), t("prompt_2"), t("prompt_3"), t("prompt_4"), t("prompt_5"),
    t("prompt_6"), t("prompt_7"), t("prompt_8"), t("prompt_9"), t("prompt_10"),
  ], [t]);

  const SUGGESTIONS = useMemo(() => [
    t("suggest_1"), t("suggest_2"), t("suggest_3"), t("suggest_4"), t("suggest_5"),
    t("suggest_6"), t("suggest_7"), t("suggest_8"), t("suggest_9"), t("suggest_10"),
  ], [t]);

  const FIELD_SIZE = 300;

  const starPositions = useMemo(() => {
    const positions: { id: number; x: number; y: number }[] = [];
    const count = 10;
    const center = FIELD_SIZE / 2;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const radius = FIELD_SIZE * 0.28 + Math.random() * (FIELD_SIZE * 0.18);
      positions.push({
        id: i,
        x: center + Math.cos(angle) * radius,
        y: center + Math.sin(angle) * radius,
      });
    }
    return positions;
  }, []);

  const [labeledStars, setLabeledStars] = useState<StarData[]>([]);
  const [activeStar, setActiveStar] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  const handleStarTap = useCallback((id: number) => {
    if (labeledStars.length >= 6 && !labeledStars.find((s) => s.id === id)) return;
    if (labeledStars.find((s) => s.id === id)) return;
    setActiveStar(id);
    setInputValue("");
    setPromptIndex(Math.floor(Math.random() * PROMPTS.length));
  }, [labeledStars, PROMPTS.length]);

  const handleSubmit = useCallback(() => {
    if (!inputValue.trim() || activeStar === null) return;
    const pos = starPositions.find((s) => s.id === activeStar)!;
    const newStar: StarData = { id: activeStar, x: pos.x, y: pos.y, label: inputValue.trim() };
    setLabeledStars((prev) => [...prev, newStar]);
    setActiveStar(null);
    setInputValue("");
  }, [inputValue, activeStar, starPositions]);

  const handleChip = useCallback((word: string) => {
    setInputValue(word);
  }, []);

  const isLabeled = (id: number) => labeledStars.some((s) => s.id === id);
  const canComplete = labeledStars.length >= 2;

  return (
    <div className="flex flex-col items-center w-full max-w-sm mx-auto space-y-6 animate-fade-in relative z-10">
      <div className="text-center space-y-2">
        <p className="text-lg text-white/80 leading-relaxed justified-text">
          {t("selection_box_instruction")}
        </p>
      </div>

      <div className="relative mx-auto bg-black/20 rounded-full backdrop-blur-sm border border-white/5" style={{ width: FIELD_SIZE + 40, height: FIELD_SIZE + 40 }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[80%] h-[80%] border border-white/5 rounded-full animate-pulse" />
        </div>
        
        <svg width={FIELD_SIZE + 40} height={FIELD_SIZE + 40} className="absolute inset-0">
          {labeledStars.length > 1 &&
            labeledStars.map((star, i) => {
              if (i === 0) return null;
              const prev = labeledStars[i - 1];
              return (
                <motion.line
                  key={`line-${prev.id}-${star.id}`}
                  x1={prev.x + 20} y1={prev.y + 20} x2={star.x + 20} y2={star.y + 20}
                  className="stroke-white"
                  strokeWidth="1.5"
                  opacity="0.4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              );
            })}
        </svg>

        {starPositions.map((star) => {
          const labeled = isLabeled(star.id);
          const isActive = activeStar === star.id;
          const labelData = labeledStars.find((s) => s.id === star.id);

          return (
            <motion.div
              key={star.id}
              className="absolute cursor-pointer group"
              style={{ left: star.x + 6, top: star.y + 6 }}
              whileHover={{ scale: 1.4 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleStarTap(star.id)}
            >
              <div className="relative">
                <div className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center transition-all duration-500",
                  labeled 
                    ? "bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110" 
                    : isActive 
                      ? "bg-pride-purple shadow-[0_0_15px_rgba(168,85,247,0.8)]"
                      : "bg-white/20 hover:bg-white/40"
                )}>
                  <div className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    labeled ? "bg-pride-blue" : "bg-white"
                  )} />
                </div>
                
                {labeled && labelData && (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-tighter text-white/90 whitespace-nowrap bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-md border border-white/10"
                  >
                    {labelData.label}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {activeStar !== null ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full premium-card p-6 border-white/10 bg-black/60 backdrop-blur-xl space-y-4 shadow-2xl"
          >
            <p className="text-sm font-bold text-white/90">
              {PROMPTS[promptIndex]}
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                placeholder="Type a word..."
                maxLength={20}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-pride-purple/50 text-lg font-bold transition-all"
                autoFocus
              />
              <button
                onClick={handleSubmit}
                disabled={!inputValue.trim()}
                className="btn-primary px-6 h-14 disabled:opacity-40"
              >
                Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((word) => (
                <button
                  key={word}
                  onClick={() => handleChip(word)}
                  className="px-3 py-1 rounded-full text-xs font-bold bg-white/5 text-white/60 hover:bg-white/20 hover:text-white transition-all border border-white/5"
                >
                  {word}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <div className="w-full flex flex-col items-center gap-4">
             <p className="text-xs font-black uppercase tracking-widest text-white/40">
              {labeledStars.length}/6 Stars Labeled
            </p>
            
            {canComplete && (
              <button
                onClick={() => onComplete(labeledStars)}
                className="btn-primary w-full h-14 text-lg font-bold shadow-2xl shadow-pride-purple/20"
              >
                Complete Constellation
              </button>
            )}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StarSelectionScreen;
