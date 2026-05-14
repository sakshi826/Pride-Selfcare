import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Send, Share2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sql } from "@/lib/db";
import { ShareModal } from "@/components/pride/ShareModal";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideSuccessState } from "../components/PrideSuccessState";
import { PrideTrackerHistory } from "../components/PrideTrackerHistory";

export default function GratitudeTracker() {
  const { t } = useTranslation("trackers");
  const [step, setStep] = useState(1);
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const MOODS = [
    { label: t("Radiant"), emoji: "✨" },
    { label: t("Peaceful"), emoji: "🧘" },
    { label: t("Content"), emoji: "🙂" },
    { label: t("Soft"), emoji: "🌸" },
  ];

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const userId = sessionStorage.getItem('user_id') || 'anonymous';
    const items = [gratitude1, gratitude2].filter(i => i.trim() !== "");

    try {
      await sql`
        INSERT INTO gratitude_entries (user_id, items, mood_emoji)
        VALUES (${userId}, ${items}, ${selectedMood})
      `;
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to save gratitude:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="activity-root flex items-center justify-center p-6">
        <PrideFloatingOrbs />
        <div className="activity-container-sm space-y-4">
          <PrideSuccessState 
            title={t("Heart Filled!")}
            message={t("Your gratitude has been recorded. It's the small things that matter most.")}
            emoji="💖"
            onRestart={() => {
              setIsSuccess(false);
              setStep(1);
              setGratitude1("");
              setGratitude2("");
              setSelectedMood("");
            }}
          />

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)}
            title={t("Share Your Gratitude Tracker")}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="activity-root py-8">
      <PrideFloatingOrbs />

      <div className="activity-container-sm">
        <PrideActivityHeader 
          title={t("Gratitude Garden")} 
          subtitle={showHistory ? t("A collection of your thankful moments") : t("Plant a seed of thankfulness")}
          showHistory={!showHistory}
          onHistory={() => setShowHistory(true)}
          onBack={() => {
            if (showHistory) {
              setShowHistory(false);
            } else if (step > 1) {
              setStep(step - 1);
            } else {
              window.parent.postMessage("exit_activity", "*");
              window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
            }
          }}
        />

        {showHistory ? (
          <PrideTrackerHistory 
            tableName="gratitude_entries"
            renderEntry={(entry) => (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{entry.mood_emoji}</span>
                  <span className="font-bold text-lg text-foreground">{t("Feeling")} {MOODS.find(m => m.emoji === entry.mood_emoji)?.label || t('Good')}</span>
                </div>
                <div className="space-y-3">
                  {entry.items.map((item: string, i: number) => (
                    <div key={i} className="flex gap-3 items-start p-4 rounded-2xl bg-black/5">
                      <div className="mt-1 w-2 h-2 rounded-full bg-pride-pink shrink-0" />
                      <p className="text-sm text-foreground/80 leading-relaxed italic">"{item}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          />
        ) : (
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <div className="space-y-4">
                    <label className="text-lg font-bold text-gray-800 block">
                      {t("What's one thing you're grateful for today?")}
                    </label>
                    <textarea
                      value={gratitude1}
                      onChange={(e) => setGratitude1(e.target.value)}
                      placeholder={t("A small moment, a person, or an accomplishment...")}
                      className="w-full h-32 p-5 rounded-[32px] border-2 border-white bg-white/60 backdrop-blur-sm focus:border-pride-purple/50 focus:ring-0 transition-all resize-none text-gray-700 shadow-sm focus:bg-white/90"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-lg font-bold text-gray-800 block">
                      {t("And another thing?")}
                    </label>
                    <textarea
                      value={gratitude2}
                      onChange={(e) => setGratitude2(e.target.value)}
                      placeholder={t("Something else that brought a smile...")}
                      className="w-full h-32 p-5 rounded-[32px] border-2 border-white bg-white/60 backdrop-blur-sm focus:border-pride-purple/50 focus:ring-0 transition-all resize-none text-gray-700 shadow-sm focus:bg-white/90"
                    />
                  </div>
                </div>
                <button
                  disabled={!gratitude1.trim() && !gratitude2.trim()}
                  onClick={() => setStep(2)}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <span>{t("Continue")}</span>
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-900">{t("How do you feel after reflecting?")}</h2>
                  <p className="text-gray-500">{t("Pick the emoji that matches your mood")}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {MOODS.map(m => (
                    <button
                      key={m.label}
                      onClick={() => setSelectedMood(m.emoji)}
                      className={`p-8 rounded-[40px] border-2 transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-xl ${
                        selectedMood === m.emoji
                          ? "border-pride-pink bg-white/90 backdrop-blur-md scale-105"
                          : "border-white bg-white/60 backdrop-blur-sm hover:border-pride-pink/30"
                      }`}
                    >
                      <span className="text-5xl">{m.emoji}</span>
                      <span className={`font-bold ${
                        selectedMood === m.emoji ? "text-pride-pink" : "text-gray-700"
                      }`}>
                        {m.label}
                      </span>
                    </button>
                  ))}
                </div>
                <button
                  disabled={!selectedMood || isSubmitting}
                  onClick={handleSubmit}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={20} />
                      <span>{t("Send to the Garden")}</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
