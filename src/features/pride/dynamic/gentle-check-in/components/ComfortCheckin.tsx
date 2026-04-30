import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sql } from "@/lib/db";
import WelcomeScreen from "./screens/WelcomeScreen";
import TypeScreen from "./screens/TypeScreen";
import TriggerScreen from "./screens/TriggerScreen";
import IntensityScreen from "./screens/IntensityScreen";
import WhatHelpsScreen from "./screens/WhatHelpsScreen";
import BreatheScreen from "./screens/BreatheScreen";
import NowScreen from "./screens/NowScreen";
import NoteScreen from "./screens/NoteScreen";
import EndingScreen from "./screens/EndingScreen";
import HistoryScreen from "./screens/HistoryScreen";

const transition = { duration: 0.4, ease: [0.32, 0.72, 0, 1] as const };

export interface CheckinData {
  type: string;
  trigger: string;
  intensity: string;
  whatHelps: string;
  nowFeeling: string;
  note: string;
}

export interface CheckinEntry extends CheckinData {
  id: string;
  date: string;
}

const STORAGE_KEY = "rightnow-checkin-entries";

const loadLocalEntries = (): CheckinEntry[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
};

const saveEntry = async (data: CheckinData) => {
  const entry: CheckinEntry = {
    ...data,
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
  };

  try {
    const userId = sessionStorage.getItem('user_id');
    if (!userId) throw new Error('No user session');

    await sql`
      INSERT INTO gentle_check_in_entries (user_id, data)
      VALUES (${userId}, ${JSON.stringify(entry)})
    `;
  } catch (err) {
    console.error('Failed to save to DB, using localStorage:', err);
    const entries = loadLocalEntries();
    entries.unshift(entry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  }
};

const ComfortCheckin = () => {
  const [step, setStep] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  const [data, setData] = useState<CheckinData>({
    type: "",
    trigger: "",
    intensity: "",
    whatHelps: "",
    nowFeeling: "",
    note: "",
  });

  const next = () => setStep((s) => s + 1);
  const handleSave = () => {
    saveEntry(data);
    next();
  };
  const reset = () => {
    setStep(0);
    setData({ type: "", trigger: "", intensity: "", whatHelps: "", nowFeeling: "", note: "" });
  };

  if (showHistory) {
    return (
      <div className="min-h-svh flex flex-col items-center justify-start p-6 text-center" style={{ background: 'var(--pride-gradient), hsl(var(--background))' }}>
        <div className="w-full max-w-sm">
          <HistoryScreen onBack={() => setShowHistory(false)} />
        </div>
      </div>
    );
  }

  const screens = [
    <WelcomeScreen key="welcome" onStart={next} onViewHistory={() => setShowHistory(true)} />,
    <TypeScreen key="type" data={data} setData={setData} onNext={next} />,
    <TriggerScreen key="trigger" data={data} setData={setData} onNext={next} />,
    <IntensityScreen key="intensity" data={data} setData={setData} onNext={next} />,
    <WhatHelpsScreen key="helps" data={data} setData={setData} onNext={next} />,
    <BreatheScreen key="breathe" onNext={next} />,
    <NowScreen key="now" data={data} setData={setData} onNext={next} />,
    <NoteScreen key="note" data={data} setData={setData} onSave={handleSave} />,
    <EndingScreen key="ending" onDone={reset} />,
  ];

  const totalSteps = 9;

  return (
    <div className="min-h-svh flex flex-col items-center justify-center p-6 text-center" style={{ background: 'var(--pride-gradient), hsl(var(--background))' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={transition}
          className="w-full max-w-sm space-y-8"
        >
          {screens[step]}
        </motion.div>
      </AnimatePresence>

      {step > 0 && step < 8 && (
        <div className="flex gap-2 mt-8">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === step ? "bg-primary scale-125" : "bg-border"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ComfortCheckin;
