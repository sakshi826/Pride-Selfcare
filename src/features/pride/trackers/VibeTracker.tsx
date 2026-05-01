import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Check, Zap, Flame, Cloud, Wind, Activity } from "lucide-react";
import { sql } from "@/lib/db";

const VIBES = [
  { id: "high-energy", label: "High Energy", icon: <Zap />, color: "from-yellow-400 to-orange-500" },
  { id: "chill", label: "Chilled", icon: <Wind />, color: "from-blue-400 to-indigo-500" },
  { id: "fiery", label: "Fiery", icon: <Flame />, color: "from-red-400 to-pink-500" },
  { id: "dreamy", label: "Dreamy", icon: <Cloud />, color: "from-purple-400 to-pink-400" },
];

const REFLECTIONS = [
  "Feeling creative",
  "Productive day",
  "Socially charged",
  "Need some alone time",
  "Physically tired",
  "Mentally sharp",
  "In my feelings",
  "Ready for anything",
];

export default function VibeTracker() {
  const navigate = useNavigate();
  const [selectedVibe, setSelectedVibe] = useState("");
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const toggleReflection = (r: string) => {
    setSelectedReflections(prev => 
      prev.includes(r) ? prev.filter(item => item !== r) : [...prev, r]
    );
  };

  const handleSubmit = async () => {
    if (!selectedVibe) return;
    setIsSubmitting(true);
    const userId = sessionStorage.getItem('user_id') || 'anonymous';

    try {
      await sql`
        INSERT INTO vibe_entries (user_id, vibe, reflections)
        VALUES (${userId}, ${selectedVibe}, ${JSON.stringify(selectedReflections)})
      `;
      setIsSuccess(true);
    } catch (err) {
      console.error('Failed to save vibe:', err);
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
          <div className="w-24 h-24 bg-gradient-to-tr from-orange-400 to-pink-500 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-pink-100 animate-pulse">
            <Activity className="text-white" size={48} />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900">Vibe Captured!</h2>
            <p className="text-gray-500">Your energy levels are being tracked. Keep vibrating high!</p>
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
            onClick={() => navigate('/lgbtq-hub')}
            className="flex items-center justify-center w-11 h-11 rounded-xl bg-white backdrop-blur-sm text-[#64748B] hover:text-[#A855F7] hover:bg-white transition-all shadow-md hover:shadow-xl border border-gray-100"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Vibe Check</h1>
            <p className="text-sm text-gray-500">How's your energy today?</p>
          </div>
        </div>

        <div className="space-y-10">
          {/* Vibe Selection */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-1">Current Vibe</label>
            <div className="grid grid-cols-2 gap-4">
              {VIBES.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVibe(v.id)}
                  className={`relative h-32 rounded-[32px] overflow-hidden transition-all group shadow-md hover:shadow-xl ${
                    selectedVibe === v.id ? "scale-[1.02] ring-4 ring-[#EC4899]/30" : "opacity-60 grayscale hover:grayscale-0 hover:opacity-100"
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px] group-hover:backdrop-blur-none transition-all" />
                  <div className="relative h-full flex flex-col items-center justify-center gap-2 text-white drop-shadow-md">
                    <div className="text-3xl filter drop-shadow-sm">{v.icon}</div>
                    <span className="font-bold text-sm uppercase tracking-wider">{v.label}</span>
                  </div>
                  {selectedVibe === v.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                      <Check size={14} className="text-orange-500" strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Reflections Checklist */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-gray-700 ml-1">Reflections</label>
            <div className="flex flex-wrap gap-2">
              {REFLECTIONS.map((r) => (
                <button
                  key={r}
                  onClick={() => toggleReflection(r)}
                  className={`px-5 py-3 rounded-full border-2 font-medium transition-all shadow-sm ${
                    selectedReflections.includes(r)
                      ? "border-[#EC4899] bg-white/90 backdrop-blur-md text-[#EC4899] shadow-md"
                      : "border-white bg-white/60 backdrop-blur-sm text-gray-500 hover:border-[#EC4899]/30"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <button
            disabled={!selectedVibe || isSubmitting}
            onClick={handleSubmit}
            className="w-full py-5 rounded-3xl bg-gradient-to-r from-[#EC4899] via-[#A855F7] to-[#3B82F6] text-white font-bold text-lg shadow-xl shadow-purple-100 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-2 hover:opacity-90"
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Lock in the Vibe</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
