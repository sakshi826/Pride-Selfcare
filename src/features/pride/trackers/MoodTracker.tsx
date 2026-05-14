import { useState } from "react";
import { Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sql } from "@/lib/db";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideSuccessState } from "../components/PrideSuccessState";
import { ShareModal } from "@/components/pride/ShareModal";
import { PrideTrackerHistory } from "../components/PrideTrackerHistory";

export default function MoodTracker() {
  const { t } = useTranslation("trackers");
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const MOOD_OPTIONS = [
    { value: 1, label: t("Awful"), emoji: "😫" },
    { value: 2, label: t("Not Great"), emoji: "😔" },
    { value: 3, label: t("Okay"), emoji: "😐" },
    { value: 4, label: t("Good"), emoji: "🙂" },
    { value: 5, label: t("Amazing"), emoji: "✨" },
  ];

  const handleSubmit = async () => {
    if (selectedMood === null) return;
    setIsSubmitting(true);
    const userId = sessionStorage.getItem('user_id') || 'anonymous';
    const moodLabel = MOOD_OPTIONS.find(m => m.value === selectedMood)?.label || "";

    try {
      await sql`
        INSERT INTO mood_entries (user_id, value, label, note)
        VALUES (${userId}, ${selectedMood}, ${moodLabel}, ${note})
      `;
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to save mood:', err);
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
            title={t("Mood Logged!")}
            message={t("Your emotional journey is being tracked with care. Every feeling is valid.")}
            emoji="✨"
            onRestart={() => {
              setIsSuccess(false);
              setSelectedMood(null);
              setNote("");
            }}
          />

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)}
            title={t("Share Your Mood Tracker")}
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
          title={showHistory ? t("Mood History") : t("How are you?")} 
          subtitle={showHistory ? t("Reflecting on your emotional path") : t("Check in with your emotions")}
          showHistory={!showHistory}
          onHistory={() => setShowHistory(true)}
          onBack={() => {
            if (showHistory) {
              setShowHistory(false);
            } else {
              window.parent.postMessage("exit_activity", "*");
              window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
            }
          }}
        />

        {showHistory ? (
          <PrideTrackerHistory 
            tableName="mood_entries"
            renderEntry={(entry) => (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{MOOD_OPTIONS.find(m => m.value === entry.value)?.emoji || '😐'}</span>
                  <div>
                    <p className="font-bold text-lg text-foreground">
                      {MOOD_OPTIONS.find(m => m.value === entry.value)?.label || entry.label}
                    </p>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t("Mood Score")}: {entry.value}/5</p>
                  </div>
                </div>
                {entry.note && (
                  <div className="bg-black/5 p-4 rounded-2xl italic text-foreground/80 text-sm leading-relaxed">
                    "{entry.note}"
                  </div>
                )}
              </div>
            )}
          />
        ) : (
          <div className="space-y-8">
            {/* Mood Grid */}
            <div className="grid grid-cols-5 gap-3">
              {MOOD_OPTIONS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setSelectedMood(m.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-[28px] transition-all shadow-sm hover:shadow-xl border-2 ${
                    selectedMood === m.value
                      ? "border-pride-purple bg-white shadow-md scale-105"
                      : "border-white bg-white/60 backdrop-blur-sm hover:border-pride-purple/30"
                  }`}
                >
                  <span className="text-3xl">{m.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
                </button>
              ))}
            </div>

            {/* Notes Input */}
            <div className="space-y-3">
              <label className="text-sm font-bold text-gray-700 ml-1">{t("Add a reflection (optional)")}</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={t("What's on your mind today?")}
                className="w-full h-40 p-5 rounded-[32px] border-2 border-white bg-white/60 backdrop-blur-sm focus:border-pride-purple/50 focus:ring-0 transition-all resize-none text-gray-700 shadow-sm focus:bg-white/90"
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={selectedMood === null || isSubmitting}
              onClick={handleSubmit}
              className="btn-primary w-full py-5 text-lg flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send size={20} />
                  <span>{t("Save Entry")}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
