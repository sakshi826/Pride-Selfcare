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
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Back to Hub
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFE] py-8 px-4 md:px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Sleep Log</h1>
            <p className="text-sm text-gray-500">Track your rest and recovery</p>
          </div>
        </div>

        <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-blue-50 border border-blue-50 space-y-10">
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
                className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-blue-300 transition-all text-2xl font-bold text-gray-800"
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
                className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-orange-300 transition-all text-2xl font-bold text-gray-800"
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
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    quality === q.value
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100 scale-105"
                      : "bg-gray-50 text-gray-500 hover:bg-indigo-50"
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
            className="w-full py-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold text-lg shadow-xl shadow-blue-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
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
