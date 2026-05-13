import { useState } from "react";
import { Moon, Sun, Save, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { sql } from "@/lib/db";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideSuccessState } from "../components/PrideSuccessState";
import { ShareModal } from "@/components/pride/ShareModal";
import { PrideTrackerHistory } from "../components/PrideTrackerHistory";

export default function SleepTracker() {
  const { t } = useTranslation("trackers");
  const [bedtime, setBedtime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [quality, setQuality] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const QUALITY_OPTIONS = [
    { value: 0, label: t("Poor"), emoji: "😫" },
    { value: 1, label: t("Restless"), emoji: "🥱" },
    { value: 2, label: t("Okay"), emoji: "😐" },
    { value: 3, label: t("Good"), emoji: "🙂" },
    { value: 4, label: t("Excellent"), emoji: "✨" },
  ];

  const handleSubmit = async () => {
    if (quality === null) return;
    setIsSubmitting(true);
    const userId = sessionStorage.getItem('user_id') || 'anonymous';
    const today = new Date().toISOString().split('T')[0];

    try {
      await sql`
        INSERT INTO sleep_entries (user_id, bedtime, waketime, quality, date)
        VALUES (${userId}, ${bedtime}, ${wakeTime}, ${quality}, ${today})
      `;
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to save sleep:', err);
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
            title={t("Sweet Dreams!")}
            message={t("Your sleep data has been saved to your wellness profile. Consistency is key.")}
            emoji="🌙"
            onRestart={() => {
              setIsSuccess(false);
              setQuality(null);
            }}
          />

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)}
            title={t("Share Your Sleep Tracker")}
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
          title={showHistory ? t("Sleep History") : t("Sleep Log")} 
          subtitle={showHistory ? t("Analyzing your rest patterns") : t("Track your rest and recovery")}
          showHistory={!showHistory}
          onHistory={() => setShowHistory(true)}
          onBack={() => {
            if (showHistory) {
              setShowHistory(false);
            } else {
              window.parent.postMessage("exit_activity", "*");
              window.location.href = "/pride/lgbtq-hub";
            }
          }}
        />

        {showHistory ? (
          <PrideTrackerHistory 
            tableName="sleep_entries"
            renderEntry={(entry) => (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100 flex flex-col items-center gap-1">
                    <Moon size={16} className="text-blue-500" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">{t("Bedtime")}</span>
                    <span className="text-xl font-black text-blue-600">{entry.bedtime}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-orange-50/50 border border-orange-100 flex flex-col items-center gap-1">
                    <Sun size={16} className="text-orange-500" />
                    <span className="text-xs font-bold text-muted-foreground uppercase">{t("Wake Time")}</span>
                    <span className="text-xl font-black text-orange-600">{entry.waketime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-black/5">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{QUALITY_OPTIONS.find(q => q.value === entry.quality)?.emoji}</span>
                    <span className="font-bold text-foreground">{QUALITY_OPTIONS.find(q => q.value === entry.quality)?.label} {t("Quality")}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">{t("Log Date")}</p>
                    <p className="text-sm font-bold text-foreground">{new Date(entry.date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            )}
          />
        ) : (
          <div className="premium-card p-8 md:p-10 space-y-10 border-white/50">
            {/* Time Selection */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 font-bold">
                  <Moon size={18} />
                  <span>{t("Bedtime")}</span>
                </div>
                <input
                  type="time"
                  value={bedtime}
                  onChange={(e) => setBedtime(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-black/5 bg-gray-50 focus:bg-white focus:border-pride-purple/50 transition-all text-2xl font-bold text-gray-800 shadow-inner"
                />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-orange-500 font-bold">
                  <Sun size={18} />
                  <span>{t("Wake Time")}</span>
                </div>
                <input
                  type="time"
                  value={wakeTime}
                  onChange={(e) => setWakeTime(e.target.value)}
                  className="w-full p-4 rounded-2xl border-2 border-black/5 bg-gray-50 focus:bg-white focus:border-pride-pink/50 transition-all text-2xl font-bold text-gray-800 shadow-inner"
                />
              </div>
            </div>

            {/* Quality Slider/Buttons */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-pride-purple font-bold">
                <Star size={18} />
                <span>{t("How was your sleep?")}</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {QUALITY_OPTIONS.map((q) => (
                  <button
                    key={q.value}
                    onClick={() => setQuality(q.value)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all shadow-sm ${
                      quality === q.value
                        ? "bg-gradient-to-br from-pride-purple to-pride-blue text-white shadow-lg scale-105"
                        : "bg-black/5 text-gray-500 hover:bg-white hover:shadow-md"
                    }`}
                  >
                    <span className="text-2xl">{q.emoji}</span>
                    <span className="text-[10px] font-bold uppercase">{q.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              disabled={quality === null || isSubmitting}
              onClick={handleSubmit}
              className="btn-primary w-full h-16 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save size={20} />
                  <span>{t("Save Sleep Log")}</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
