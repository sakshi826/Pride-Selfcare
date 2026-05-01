import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Moon, Sun, Save, Star } from "lucide-react";
import { sql } from "@/lib/db";

const QUALITY_OPTIONS = [
  { value: 0, label: "Poor", emoji: "😫" },
  { value: 1, label: "Restless", emoji: "🥱" },
  { value: 2, label: "Okay", emoji: "😐" },
  { value: 3, label: "Good", emoji: "🙂" },
  { value: 4, label: "Excellent", emoji: "✨" },
];

export default function SleepTracker() {
  const navigate = useNavigate();
  const [bedtime, setBedtime] = useState("22:00");
  const [wakeTime, setWakeTime] = useState("07:00");
  const [quality, setQuality] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#FDFCFE] flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-[40px] p-10 shadow-2xl border border-gray-100 text-center space-y-6"
        >
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-3xl flex items-center justify-center mx-auto -rotate-6">
            <Moon className="text-white" size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Sweet Dreams!</h2>
            <p className="text-gray-500">Your sleep data has been saved to your wellness profile.</p>
          </div>
          <button
            onClick={() => navigate('/lgbtq-hub')}
            className="w-full py-4 bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#3B82F6] text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 active:scale-95"
          >
            Back to Hub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
  return (
    <div className="min-h-screen bg-[#FDFCFE] py-8 px-4 md:px-6 relative overflow-hidden">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-200/30 blur-3xl animate-float-orb" />
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-pink-100/30 blur-3xl animate-float-orb-reverse" />
        <div className="absolute top-[40%] right-[15%] w-48 h-48 rounded-full bg-blue-100/20 blur-3xl animate-float-orb" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate('/lgbtq-hub')}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white backdrop-blur-sm text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sleep Log</h1>
            <p className="text-sm text-gray-500">Track your rest and recovery</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-md rounded-[32px] p-8 shadow-xl border border-white/50 space-y-10">
          {/* Time Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <Moon size={18} />
                <span>Bedtime</span>
              </div>
              <input
                type="time"
                value={bedtime}
                onChange={(e) => setBedtime(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-white bg-white/50 focus:bg-white focus:border-[#A855F7]/50 transition-all text-2xl font-bold text-gray-800 shadow-inner"
              />
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-orange-500 font-bold">
                <Sun size={18} />
                <span>Wake Time</span>
              </div>
              <input
                type="time"
                value={wakeTime}
                onChange={(e) => setWakeTime(e.target.value)}
                className="w-full p-4 rounded-2xl border-2 border-white bg-white/50 focus:bg-white focus:border-[#EC4899]/50 transition-all text-2xl font-bold text-gray-800 shadow-inner"
              />
            </div>
          </div>

          {/* Quality Slider/Buttons */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-indigo-600 font-bold">
              <Star size={18} />
              <span>How was your sleep?</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {QUALITY_OPTIONS.map((q) => (
                <button
                  key={q.value}
                  onClick={() => setQuality(q.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all shadow-sm ${
                    quality === q.value
                      ? "bg-gradient-to-br from-[#A855F7] to-[#3B82F6] text-white shadow-lg scale-105"
                      : "bg-white/50 text-gray-500 hover:bg-white hover:shadow-md"
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
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#3B82F6] text-white font-bold text-lg shadow-xl shadow-purple-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} />
                <span>Save Sleep Log</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
