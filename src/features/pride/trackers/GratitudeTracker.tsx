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
    <div className="activity-root bg-[#FDFCFE] py-8">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] left-[5%] w-64 h-64 rounded-full bg-purple-200/30 blur-3xl animate-float-orb" />
        <div className="absolute bottom-[15%] right-[5%] w-80 h-80 rounded-full bg-pink-100/30 blur-3xl animate-float-orb-reverse" />
        <div className="absolute top-[40%] right-[15%] w-48 h-48 rounded-full bg-blue-100/20 blur-3xl animate-float-orb" style={{ animationDelay: '2s' }} />
      </div>

      <div className="activity-container-sm">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : navigate('/lgbtq-hub')}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white backdrop-blur-sm text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
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
                    className="w-full h-32 p-5 rounded-[32px] border-2 border-white bg-white/60 backdrop-blur-sm focus:border-[#A855F7]/50 focus:ring-0 transition-all resize-none text-gray-700 shadow-sm focus:bg-white/90"
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
                    className="w-full h-32 p-5 rounded-[32px] border-2 border-white bg-white/60 backdrop-blur-sm focus:border-[#A855F7]/50 focus:ring-0 transition-all resize-none text-gray-700 shadow-sm focus:bg-white/90"
                  />
                </div>
              </div>
              <button
                disabled={!gratitude1.trim() && !gratitude2.trim()}
                onClick={() => setStep(2)}
                className="w-full py-5 rounded-3xl bg-gradient-to-r from-[#EC4899] to-[#A855F7] text-white font-bold text-lg shadow-xl shadow-pink-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
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
                    className={`p-8 rounded-[40px] border-2 transition-all flex flex-col items-center gap-3 shadow-sm hover:shadow-xl ${
                      selectedMood === m.emoji
                        ? "border-[#EC4899] bg-white/90 backdrop-blur-md scale-105"
                        : "border-white bg-white/60 backdrop-blur-sm hover:border-[#EC4899]/30"
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
                className="w-full py-5 rounded-3xl bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#3B82F6] text-white font-bold text-lg shadow-xl shadow-purple-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
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
