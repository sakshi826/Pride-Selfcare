import { useState } from "react";
import { Check, Zap, Flame, Cloud, Wind } from "lucide-react";
import { sql } from "@/lib/db";
import { PrideFloatingOrbs } from "../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../components/PrideActivityHeader";
import { PrideSuccessState } from "../components/PrideSuccessState";

import { PrideTrackerHistory } from "../components/PrideTrackerHistory";

const VIBES = [
  { id: "high-energy", label: "High Energy", icon: <Zap size={28} />, color: "from-amber-300 to-orange-500", glow: "shadow-orange-200" },
  { id: "chill", label: "Chilled", icon: <Wind size={28} />, color: "from-sky-300 to-indigo-500", glow: "shadow-sky-200" },
  { id: "fiery", label: "Fiery", icon: <Flame size={28} />, color: "from-rose-400 to-red-600", glow: "shadow-rose-200" },
  { id: "dreamy", label: "Dreamy", icon: <Cloud size={28} />, color: "from-violet-300 to-fuchsia-500", glow: "shadow-violet-200" },
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
  const [selectedVibe, setSelectedVibe] = useState("");
  const [selectedReflections, setSelectedReflections] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

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
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="activity-root flex items-center justify-center p-6">
        <PrideFloatingOrbs />
        <div className="activity-container-sm">
          <PrideSuccessState 
            title="Vibe Locked In!"
            message="Your energy levels are recorded. Honor whatever space you're in today."
            emoji="✨"
            onRestart={() => {
              setIsSuccess(false);
              setSelectedVibe("");
              setSelectedReflections([]);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="activity-root py-12 md:py-20">
      <PrideFloatingOrbs />

      <div className="activity-container-sm">
        <PrideActivityHeader 
          title={showHistory ? "Vibe History" : "Vibe Check"} 
          subtitle={showHistory ? "Look back at your energy journey" : "Tune in to your internal frequency."}
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
            tableName="vibe_entries"
            renderEntry={(entry) => (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${VIBES.find(v => v.id === entry.vibe)?.color || 'from-gray-400 to-gray-600'} text-white`}>
                    {VIBES.find(v => v.id === entry.vibe)?.icon || <Zap size={20} />}
                  </div>
                  <span className="font-bold text-lg text-foreground">
                    {VIBES.find(v => v.id === entry.vibe)?.label || entry.vibe}
                  </span>
                </div>
                {entry.reflections && entry.reflections.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {entry.reflections.map((r: string) => (
                      <span key={r} className="px-3 py-1 rounded-full bg-pride-purple/10 text-pride-purple text-xs font-bold">
                        {r}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        ) : (
          <div className="space-y-12">
            {/* Vibe Selection */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-6 bg-pride-purple rounded-full" />
                <h2 className="text-lg font-bold text-gray-800">Current Energy</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {VIBES.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVibe(v.id)}
                    className={`relative group h-40 rounded-[40px] transition-all duration-500 ease-out active:scale-95 ${
                      selectedVibe === v.id 
                      ? `ring-[3px] ring-white shadow-2xl scale-[1.03] ${v.glow} z-20` 
                      : "opacity-80 hover:opacity-100 hover:scale-[1.01] grayscale-[0.3] hover:grayscale-0"
                    }`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${v.color} opacity-90 rounded-[40px]`} />
                    
                    {/* Subtle Pattern Overlay */}
                    <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
                    
                    <div className="relative h-full flex flex-col items-center justify-center gap-3 text-white">
                      <div className={`p-4 rounded-3xl bg-white/20 backdrop-blur-md border border-white/30 transition-transform duration-500 ${selectedVibe === v.id ? 'scale-110 rotate-3' : 'group-hover:rotate-6'}`}>
                        {v.icon}
                      </div>
                      <span className="font-bold text-base tracking-wide drop-shadow-sm">{v.label}</span>
                    </div>

                    {selectedVibe === v.id && (
                      <div className="absolute -top-2 -right-2 w-10 h-10 rounded-2xl bg-white text-emerald-500 flex items-center justify-center shadow-lg animate-bounce-subtle">
                        <Check size={24} strokeWidth={3} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </section>

            {/* Reflections Checklist */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-1.5 h-6 bg-pride-pink rounded-full" />
                <h2 className="text-lg font-bold text-gray-800">Reflections</h2>
              </div>
              
              <div className="premium-card p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                {REFLECTIONS.map((r) => {
                  const isSelected = selectedReflections.includes(r);
                  return (
                    <button
                      key={r}
                      onClick={() => toggleReflection(r)}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected
                          ? "border-pride-purple bg-pride-purple/5 text-pride-purple shadow-sm"
                          : "border-black/5 bg-gray-50/50 text-gray-500 hover:border-pride-purple/20 hover:bg-white"
                      }`}
                    >
                      <span className="font-semibold text-sm">{r}</span>
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        isSelected ? "bg-pride-purple border-pride-purple" : "border-black/10 bg-white"
                      }`}>
                        {isSelected && <Check size={14} className="text-white" strokeWidth={4} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="pt-4">
              <button
                disabled={!selectedVibe || isSubmitting}
                onClick={handleSubmit}
                className="btn-primary w-full h-20 text-xl flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                {isSubmitting ? (
                  <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Zap className={selectedVibe ? "animate-pulse" : ""} />
                    <span>Lock in the Vibe</span>
                  </>
                )}
              </button>
              <p className="text-center text-gray-400 text-sm mt-4 font-medium italic">
                "Your energy is valid. No matter what the frequency is today."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
