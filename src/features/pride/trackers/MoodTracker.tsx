import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Send, Sparkles } from "lucide-react";
import { sql } from "@/lib/db";

const MOOD_OPTIONS = [
  { value: 1, label: "Awful", emoji: "😫", color: "bg-red-100 text-red-600 border-red-200" },
  { value: 2, label: "Not Great", emoji: "😔", color: "bg-orange-100 text-orange-600 border-orange-200" },
  { value: 3, label: "Okay", emoji: "😐", color: "bg-yellow-100 text-yellow-600 border-yellow-200" },
  { value: 4, label: "Good", emoji: "🙂", color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { value: 5, label: "Amazing", emoji: "✨", color: "bg-cyan-100 text-cyan-600 border-cyan-200" },
];

export default function MoodTracker() {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
          <div className="w-24 h-24 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto rotate-12">
            <Sparkles className="text-white" size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Mood Logged!</h2>
            <p className="text-gray-500">Your emotional journey is being tracked with care.</p>
          </div>
          <button
            onClick={() => navigate('/lgbtq-hub')}
            className="w-full py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            Return to Hub
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
            className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-orange-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">How are you?</h1>
            <p className="text-sm text-gray-500">Check in with your emotions</p>
          </div>
        </div>

        <div className="space-y-8">
          {/* Mood Grid */}
          <div className="grid grid-cols-5 gap-3">
            {MOOD_OPTIONS.map((m) => (
              <button
                key={m.value}
                onClick={() => setSelectedMood(m.value)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  selectedMood === m.value
                    ? `${m.color} ring-4 ring-orange-50`
                    : "bg-white border border-gray-100 grayscale opacity-60 hover:grayscale-0 hover:opacity-100"
                }`}
              >
                <span className="text-3xl">{m.emoji}</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">{m.label}</span>
              </button>
            ))}
          </div>

          {/* Notes Input */}
          <div className="space-y-3">
            <label className="text-sm font-bold text-gray-700 ml-1">Add a reflection (optional)</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full h-40 p-5 rounded-3xl border-2 border-gray-100 bg-white focus:border-orange-200 focus:ring-0 transition-all resize-none text-gray-700"
            />
          </div>

          {/* Submit Button */}
          <button
            disabled={selectedMood === null || isSubmitting}
            onClick={handleSubmit}
            className="w-full py-5 rounded-3xl bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold text-lg shadow-xl shadow-orange-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={20} />
                <span>Save Entry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
