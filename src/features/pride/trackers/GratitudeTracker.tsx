import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Heart, Sparkles, Send } from "lucide-react";
import { sql } from "@/lib/db";

const MOODS = [
  { label: "Radiant", emoji: "✨" },
  { label: "Peaceful", emoji: "🧘" },
  { label: "Content", emoji: "🙂" },
  { label: "Soft", emoji: "🌸" },
];

export default function GratitudeTracker() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [gratitude1, setGratitude1] = useState("");
  const [gratitude2, setGratitude2] = useState("");
  const [selectedMood, setSelectedMood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
          <div className="w-24 h-24 bg-gradient-to-tr from-emerald-400 to-teal-600 rounded-3xl flex items-center justify-center mx-auto scale-110">
            <Heart className="text-white fill-current" size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Heart Filled!</h2>
            <p className="text-gray-500">Your gratitude has been recorded. It's the small things that matter.</p>
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
            onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
            className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gratitude Garden</h1>
            <p className="text-sm text-gray-500">Cultivate your inner peace</p>
          </div>
        </div>

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
                    What's one thing you're grateful for today?
                  </label>
                  <textarea
                    value={gratitude1}
                    onChange={(e) => setGratitude1(e.target.value)}
                    placeholder="A small moment, a person, or an accomplishment..."
                    className="w-full h-32 p-5 rounded-[32px] border-2 border-emerald-50 bg-white focus:border-emerald-200 focus:ring-0 transition-all resize-none text-gray-700 shadow-inner bg-emerald-50/10"
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-lg font-bold text-gray-800 block">
                    And another thing?
                  </label>
                  <textarea
                    value={gratitude2}
                    onChange={(e) => setGratitude2(e.target.value)}
                    placeholder="Something else that brought a smile..."
                    className="w-full h-32 p-5 rounded-[32px] border-2 border-emerald-50 bg-white focus:border-emerald-200 focus:ring-0 transition-all resize-none text-gray-700 shadow-inner bg-emerald-50/10"
                  />
                </div>
              </div>
              <button
                disabled={!gratitude1.trim() && !gratitude2.trim()}
                onClick={() => setStep(2)}
                className="w-full py-5 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-bold text-lg shadow-xl shadow-emerald-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Continue</span>
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
                <h2 className="text-xl font-bold text-gray-900">How do you feel after reflecting?</h2>
                <p className="text-gray-500">Pick the emoji that matches your mood</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {MOODS.map(m => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.emoji)}
                    className={`p-8 rounded-[40px] border-2 transition-all flex flex-col items-center gap-3 ${
                      selectedMood === m.emoji
                        ? "border-emerald-500 bg-emerald-50 shadow-inner scale-105"
                        : "border-gray-100 bg-white hover:border-emerald-100"
                    }`}
                  >
                    <span className="text-5xl">{m.emoji}</span>
                    <span className={`font-bold ${
                      selectedMood === m.emoji ? "text-emerald-700" : "text-gray-700"
                    }`}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                disabled={!selectedMood || isSubmitting}
                onClick={handleSubmit}
                className="w-full py-5 rounded-3xl bg-gradient-to-r from-emerald-400 to-teal-600 text-white font-bold text-lg shadow-xl shadow-emerald-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    <span>Send to the Garden</span>
                  </>
                )}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
