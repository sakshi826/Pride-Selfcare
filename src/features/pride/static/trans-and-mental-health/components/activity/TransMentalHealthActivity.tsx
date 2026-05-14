import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";
import Card1Stats from "./Card1Stats";
import Card2Causes from "./Card2Causes";
import Card3Breathing from "./Card3Breathing";
import Card4Checklist from "./Card4Checklist";
import Card5Closing from "./Card5Closing";
import CardComplete from "./CardComplete";
import { ChevronLeft } from "lucide-react";

const TOTAL = 5;

const TransMentalHealthActivity = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation("minis", { useSuspense: false });
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get('lang');
    if (lang && i18n.language !== lang) {
      console.log("[Trans Activity] Switching language to:", lang);
      i18n.changeLanguage(lang);
    }
  }, [i18n]);

  const goNext = useCallback(() => {
    if (current >= TOTAL - 1) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.7 }, colors: ["#55cdfc", "#f7a8b8", "#ffffff"] });
      setFinished(true);
      return;
    }
    setDirection(1);
    setCurrent((c) => c + 1);
  }, [current]);

  const goPrev = useCallback(() => {
    if (current <= 0) return;
    setDirection(-1);
    setCurrent((c) => c - 1);
  }, [current]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
    setTouchStart(null);
  };

  const [finished, setFinished] = useState(false);

  const isLast = current === TOTAL - 1;
  const buttonLabels = [t("Next"), t("Next"), t("Next"), t("Next"), t("Finish ✨")];

  const cards = [
    <Card1Stats key="c1" active={current === 0} />,
    <Card2Causes key="c2" />,
    <Card3Breathing key="c3" active={current === 2} />,
    <Card4Checklist key="c4" />,
    <Card5Closing key="c5" active={current === 4} />,
  ];

  if (finished) {
    return (
      <CardComplete 
        onRestart={() => { setFinished(false); setCurrent(0); }} 
        onBackToHub={() => {
          window.parent.postMessage("exit_activity", "*");
          window.location.href = "/pride/lgbtq-hub" + window.location.search;
        }} 
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-8 px-4 relative overflow-hidden"
      style={{ background: "#edf5ed" }}
    >
      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => {
            window.parent.postMessage("exit_activity", "*");
            window.location.href = "/pride/lgbtq-hub" + window.location.search;
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          {t("Back to Hub")}
        </button>
      </div>
      {/* Floating orbs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <motion.div
          className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "#55cdfc", top: "10%", left: "-10%" }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl"
          style={{ background: "#f7a8b8", bottom: "5%", right: "-5%" }}
          animate={{ x: [0, -30, 0], y: [0, -40, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl"
          style={{ background: "#55cdfc", top: "60%", right: "20%" }}
          animate={{ x: [0, 25, 0], y: [0, -20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="w-full max-w-[440px] relative z-10">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(0 0% 90%)" }}>
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)",
              }}
              animate={{ width: `${((current + 1) / TOTAL) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-foreground mt-2 font-body text-center">
            {current + 1} {t("of")} {TOTAL}
          </p>
        </div>

        {/* Card stack */}
        <div
          className="relative isolate"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Behind-card peek effect */}
          {current < TOTAL - 1 && (
            <div
              className="absolute inset-x-3 top-3 bottom-0 rounded-[28px] opacity-40 z-0"
              style={{
                background: "rgba(255,255,255,0.6)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                transform: "scale(0.96)",
              }}
            />
          )}
          {current < TOTAL - 2 && (
            <div
              className="absolute inset-x-5 top-5 bottom-0 rounded-[28px] opacity-20 z-0"
              style={{
                background: "rgba(255,255,255,0.4)",
                boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                transform: "scale(0.92)",
              }}
            />
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              className="relative z-10"
              key={current}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -direction * 60 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              {cards[current]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {current > 0 && (
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80 bg-muted text-foreground"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          <button
            onClick={goNext}
            className="px-8 py-3 rounded-full font-body font-semibold text-sm transition-opacity hover:opacity-80"
            style={{
              background: "linear-gradient(135deg, #55cdfc, #f7a8b8)",
              color: "#1a2a1a",
            }}
          >
            {buttonLabels[current]}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransMentalHealthActivity;
