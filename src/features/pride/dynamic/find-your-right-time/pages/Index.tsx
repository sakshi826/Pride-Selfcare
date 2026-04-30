import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { sql } from "@/lib/db";
import WelcomeScreen from "../components/reflection/WelcomeScreen";
import SafetyNoteScreen from "../components/reflection/SafetyNoteScreen";
import AssessmentScreen from "../components/reflection/AssessmentScreen";
import MicroPauseScreen from "../components/reflection/MicroPauseScreen";
import ResultScreen from "../components/reflection/ResultScreen";
import SuggestionsScreen from "../components/reflection/SuggestionsScreen";
import ClosingScreen from "../components/reflection/ClosingScreen";
import HistoryScreen from "../components/reflection/HistoryScreen";

export type Answers = {
  financial1?: string;
  financial2?: string;
  family1?: string;
  family2?: string;
  emotional1?: string;
  emotional2?: string;
  safety1?: string;
  safety2?: string;
};

export type Reflection = {
  date: string;
  result: "not-ready" | "preparing" | "ready";
  answers: Answers;
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

const Index = () => {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<Answers>({});
  const [showHistory, setShowHistory] = useState(false);

  const go = (next: number) => {
    setDirection(next > screen ? 1 : -1);
    setScreen(next);
  };

  const setAnswer = (key: keyof Answers, value: string) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const computeResult = (): Reflection["result"] => {
    if (answers.safety1 === "No") return "not-ready";
    const lowAnswers = Object.values(answers).filter(
      (v) => v === "No" || v === "Somewhat" || v === "Dependent" || v === "Unsupportive" || v === "Not ready" || v === "Sometimes"
    );
    if (lowAnswers.length >= 2) return "preparing";
    return "ready";
  };

  const saveReflection = async () => {
    const result = computeResult();
    const reflection: Reflection = {
      date: new Date().toISOString(),
      result,
      answers,
    };
    
    try {
      const userId = sessionStorage.getItem('user_id');
      if (!userId) throw new Error('No user session');

      await sql`
        INSERT INTO find_your_right_time_entries (user_id, data)
        VALUES (${userId}, ${JSON.stringify(reflection)})
      `;
    } catch (err) {
      console.error('Failed to save to DB, falling back to localStorage:', err);
      const existing = JSON.parse(localStorage.getItem("reflections") || "[]");
      existing.push(reflection);
      localStorage.setItem("reflections", JSON.stringify(existing));
    }
  };

  const resetAndGoHome = () => {
    setAnswers({});
    setDirection(-1);
    setScreen(0);
  };

  if (showHistory) {
    return <HistoryScreen onBack={() => setShowHistory(false)} />;
  }

  const screens = [
    <WelcomeScreen key="welcome" onStart={() => go(1)} onViewHistory={() => setShowHistory(true)} />,
    <SafetyNoteScreen key="safety-note" onContinue={() => go(2)} />,
    <AssessmentScreen
      key="financial"
      step={1}
      totalSteps={4}
      q1="How financially independent do you feel?"
      q1Options={["Independent", "Somewhat independent", "Dependent"]}
      q1Answer={answers.financial1}
      onQ1={(v) => setAnswer("financial1", v)}
      q2="If things became difficult, would you have financial support?"
      q2Options={["Yes", "Maybe", "No"]}
      q2Answer={answers.financial2}
      onQ2={(v) => setAnswer("financial2", v)}
      onNext={() => go(3)}
      bgColor="lavender"
    />,
    <AssessmentScreen
      key="family"
      step={2}
      totalSteps={4}
      q1="How supportive is your environment?"
      q1Options={["Supportive", "Somewhat supportive", "Unsupportive"]}
      q1Answer={answers.family1}
      onQ1={(v) => setAnswer("family1", v)}
      q2="Do you feel safe expressing yourself around them?"
      q2Options={["Yes", "Sometimes", "No"]}
      q2Answer={answers.family2}
      onQ2={(v) => setAnswer("family2", v)}
      onNext={() => go(4)}
      bgColor="pink"
    />,
    <AssessmentScreen
      key="emotional"
      step={3}
      totalSteps={4}
      q1="How emotionally ready do you feel?"
      q1Options={["Ready", "Somewhat ready", "Not ready"]}
      q1Answer={answers.emotional1}
      onQ1={(v) => setAnswer("emotional1", v)}
      q2="Do you have someone you trust for support?"
      q2Options={["Yes", "Maybe", "No"]}
      q2Answer={answers.emotional2}
      onQ2={(v) => setAnswer("emotional2", v)}
      onNext={() => go(5)}
      bgColor="blue"
    />,
    <AssessmentScreen
      key="safety"
      step={4}
      totalSteps={4}
      q1="Do you feel safe coming out right now?"
      q1Options={["Yes", "Somewhat", "No"]}
      q1Answer={answers.safety1}
      onQ1={(v) => setAnswer("safety1", v)}
      q2="Do you have a safe place or backup plan?"
      q2Options={["Yes", "Maybe", "No"]}
      q2Answer={answers.safety2}
      onQ2={(v) => setAnswer("safety2", v)}
      onNext={() => go(6)}
      bgColor="peach"
    />,
    <MicroPauseScreen key="pause" onContinue={() => go(7)} />,
    <ResultScreen key="result" result={computeResult()} onContinue={() => go(8)} />,
    <SuggestionsScreen key="suggestions" answers={answers} onContinue={() => go(9)} />,
    <ClosingScreen
      key="closing"
      onSave={() => { saveReflection(); }}
      onViewHistory={() => setShowHistory(true)}
      onGoHome={resetAndGoHome}
    />,
  ];

  return (
    <div className="min-h-svh flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full max-w-md mx-auto px-6 py-12 flex flex-col items-center min-h-svh relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={screen}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
            className="w-full flex flex-col items-center flex-1"
          >
            {screens[screen]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
