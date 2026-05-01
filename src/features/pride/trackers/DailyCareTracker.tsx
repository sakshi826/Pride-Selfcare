import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Check, HeartPulse, Clock, Smile, AlertCircle } from "lucide-react";
import { sql } from "@/lib/db";

const ACTIVITIES = [
  { id: "meditation", label: "Meditation", icon: "🧘" },
  { id: "exercise", label: "Exercise", icon: "🏃" },
  { id: "journaling", label: "Journaling", icon: "✍️" },
  { id: "reading", label: "Reading", icon: "📚" },
  { id: "hydration", label: "Hydration", icon: "💧" },
  { id: "nature", label: "Time in Nature", icon: "🌳" },
];

const DURATIONS = ["< 15 mins", "15-30 mins", "30-60 mins", "1 hr+"];

const MOODS = [
  { value: "great", label: "Great", emoji: "✨" },
  { value: "good", label: "Good", emoji: "🙂" },
  { value: "okay", label: "Okay", emoji: "😐" },
  { value: "low", label: "Low", emoji: "😔" },
];

export default function DailyCareTracker() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [duration, setDuration] = useState("");
  const [mood, setMood] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleActivity = (id: string) => {
    setSelectedActivities(prev => 
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const userId = sessionStorage.getItem('user_id') || 'anonymous';
    
    try {
      await sql`
        INSERT INTO daily_care_entries (user_id, activities, duration, mood)
        VALUES (${userId}, ${selectedActivities}, ${duration}, ${mood})
      `;
      setStep(4); // Success step
    } catch (err) {
      console.error('Failed to save daily care:', err);
      alert('Failed to save entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCFE] py-8 px-4 md:px-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <button
            onClick={() => step > 1 && step < 4 ? setStep(step - 1) : navigate(-1)}
            className="p-2 rounded-xl bg-white shadow-sm border border-gray-100 text-gray-500 hover:text-purple-600 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Daily Care</h1>
            <p className="text-sm text-gray-500">Track your self-care rituals</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 flex gap-2">
          {[1, 2, 3].map(i => (
            <div 
              key={i} 
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                step >= i ? "bg-gradient-to-r from-cyan-400 to-blue-500" : "bg-gray-100"
              }`}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">What did you do today?</h2>
                <p className="text-gray-500">Select all that apply</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {ACTIVITIES.map(activity => (
                  <button
                    key={activity.id}
                    onClick={() => toggleActivity(activity.id)}
                    className={`p-6 rounded-3xl border-2 transition-all text-left relative overflow-hidden group ${
                      selectedActivities.includes(activity.id)
                        ? "border-cyan-500 bg-cyan-50/50 shadow-inner"
                        : "border-gray-100 bg-white hover:border-cyan-200"
                    }`}
                  >
                    <span className="text-3xl mb-3 block">{activity.icon}</span>
                    <span className={`font-bold ${
                      selectedActivities.includes(activity.id) ? "text-cyan-700" : "text-gray-700"
                    }`}>
                      {activity.label}
                    </span>
                    {selectedActivities.includes(activity.id) && (
                      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center">
                        <Check size={14} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <button
                disabled={selectedActivities.length === 0}
                onClick={() => setStep(2)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition-all active:scale-95 mt-8"
              >
                Continue
              </button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">For how long?</h2>
                <p className="text-gray-500">Approximate duration of your activities</p>
              </div>
              <div className="space-y-3">
                {DURATIONS.map(d => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className={`w-full p-5 rounded-2xl border-2 text-left flex items-center justify-between transition-all ${
                      duration === d
                        ? "border-cyan-500 bg-cyan-50 text-cyan-700 font-bold"
                        : "border-gray-100 bg-white text-gray-600 hover:border-cyan-200"
                    }`}
                  >
                    <span>{d}</span>
                    {duration === d && <Check size={20} />}
                  </button>
                ))}
              </div>
              <button
                disabled={!duration}
                onClick={() => setStep(3)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition-all active:scale-95"
              >
                Next Step
              </button>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-900">How do you feel now?</h2>
                <p className="text-gray-500">Reflect on your current state</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {MOODS.map(m => (
                  <button
                    key={m.value}
                    onClick={() => setMood(m.value)}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 ${
                      mood === m.value
                        ? "border-cyan-500 bg-cyan-50 shadow-inner"
                        : "border-gray-100 bg-white hover:border-cyan-200"
                    }`}
                  >
                    <span className="text-4xl">{m.emoji}</span>
                    <span className={`font-bold ${
                      mood === m.value ? "text-cyan-700" : "text-gray-700"
                    }`}>
                      {m.label}
                    </span>
                  </button>
                ))}
              </div>
              <button
                disabled={!mood || isSubmitting}
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg shadow-blue-200 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : "Complete Entry"}
              </button>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-6"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check size={48} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Great Job!</h2>
              <p className="text-gray-500 text-lg">Your daily care routine has been recorded.</p>
              <button
                onClick={() => navigate('/lgbtq-hub')}
                className="inline-block px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-gray-800 transition-colors"
              >
                Back to Hub
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
