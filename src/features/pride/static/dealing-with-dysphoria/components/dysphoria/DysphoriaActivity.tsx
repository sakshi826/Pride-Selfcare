import { useState, useCallback } from "react";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";
import Card1Split from "./Card1Split";
import Card2Scale from "./Card2Scale";
import Card3Breathing from "./Card3Breathing";
import Card4Strategies from "./Card4Strategies";
import Card5Closing from "./Card5Closing";

const cards = [
  { eye: "What Is This", title: "Dysphoria Is Not Your Fault", band: "blue" as const, Content: Card1Split },
  { eye: "Understanding It", title: "Dysphoria Looks Different for Everyone", band: "pink" as const, Content: Card2Scale },
  { eye: "Right Now", title: "When Dysphoria Hits, Ground First", band: "blue" as const, Content: Card3Breathing },
  { eye: "What Helps", title: "Things That Actually Ease Dysphoria", band: "pink" as const, Content: Card4Strategies },
  { eye: "Carry This", title: "Dysphoria Is a Chapter, Not the Whole Story", band: "blue" as const, Content: Card5Closing },
];

const DysphoriaActivity = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [finished, setFinished] = useState(false);

  const goTo = useCallback((next: number, dir: number) => {
    if (next < 0 || next >= cards.length) return;
    setDirection(dir);
    setCurrent(next);
  }, []);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) goTo(current + 1, 1);
    else if (info.offset.x > 50) goTo(current - 1, -1);
  };

  const handleFinish = () => {
    setFinished(true);
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.6 }, colors: ["#55cdfc", "#f7a8b8", "#ffffff"] });
    setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.5, x: 0.3 }, colors: ["#55cdfc", "#f7a8b8", "#ffffff"] }), 400);
    setTimeout(() => confetti({ particleCount: 80, spread: 120, origin: { y: 0.5, x: 0.7 }, colors: ["#55cdfc", "#f7a8b8", "#ffffff"] }), 700);
  };

  const card = cards[current];
  const isLast = current === cards.length - 1;

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[10%] w-48 h-48 rounded-full bg-trans-blue/20 blur-3xl animate-float-orb" />
          <div className="absolute bottom-[20%] right-[5%] w-56 h-56 rounded-full bg-trans-pink/20 blur-3xl animate-float-orb-reverse" />
        </div>

        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => navigate('/lgbtq-hub')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back to Hub
          </button>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-full max-w-[440px] rounded-[28px] p-8 text-center space-y-6 relative z-10"
          style={{ backgroundColor: "rgba(255,255,255,0.92)" }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
            className="text-6xl"
          >
            🎉
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="font-display text-2xl text-foreground"
          >
            You did it!
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-body text-sm text-foreground leading-relaxed"
          >
            You showed up for yourself today. That matters more than you know. Dysphoria doesn't get the last word — you do.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col gap-3 pt-2"
          >
            <div className="flex gap-2 justify-center text-2xl">
              {["💙", "🩷", "🤍", "🩷", "💙"].map((e, i) => (
                <motion.span
                  key={i}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1 + i * 0.1, type: "spring" }}
                >
                  {e}
                </motion.span>
              ))}
            </div>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setFinished(false); setCurrent(0); }}
                className="font-body text-sm px-5 py-2.5 rounded-full bg-secondary text-foreground hover:opacity-80 transition-opacity mt-2"
              >
                Start Over
              </button>
              <button
                onClick={() => navigate('/lgbtq-hub')}
                className="font-body text-sm px-5 py-2.5 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity mt-2"
              >
                Back to Hub
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="activity-root bg-[#FDFCFE]">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[15%] left-[10%] w-48 h-48 rounded-full bg-trans-blue/20 blur-3xl animate-float-orb" />
        <div className="absolute bottom-[20%] right-[5%] w-56 h-56 rounded-full bg-trans-pink/20 blur-3xl animate-float-orb-reverse" />
        <div className="absolute top-[60%] left-[50%] w-40 h-40 rounded-full bg-trans-blue/15 blur-3xl animate-float-orb" style={{ animationDelay: "3s" }} />
      </div>

      <div className="activity-container-sm py-8 flex flex-col items-center">

      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => navigate('/lgbtq-hub')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back to Hub
        </button>
      </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full overflow-hidden bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: "linear-gradient(to right, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)",
            }}
            animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Card stack effect */}
        <div className="relative">
          {/* Behind cards */}
          {current < cards.length - 1 && (
            <>
              <div className="absolute inset-x-3 top-2 h-full rounded-[28px] bg-card/40 shadow-sm" />
              {current < cards.length - 2 && (
                <div className="absolute inset-x-6 top-4 h-full rounded-[28px] bg-card/25 shadow-sm" />
              )}
            </>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ x: direction * 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={handleDragEnd}
              className="relative rounded-[28px] shadow-lg overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
            >
              {/* Top band */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: card.band === "blue" ? "#55cdfc" : "#f7a8b8" }}
              />

              <div className="p-6 space-y-4">
                {/* Eyebrow + title */}
                <div>
                  <p
                    className="font-body text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: card.band === "blue" ? "#55cdfc" : "#f7a8b8" }}
                  >
                    {card.eye}
                  </p>
                  <h2 className="font-display text-xl leading-tight text-foreground">
                    {card.title}
                  </h2>
                </div>

                {/* Card content */}
                <card.Content />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => goTo(current - 1, -1)}
            disabled={current === 0}
            className="font-body text-sm px-5 py-2.5 rounded-full transition-opacity disabled:opacity-0 text-foreground hover:opacity-70"
          >
            ← Back
          </button>

          <span className="font-body text-xs text-muted-foreground">
            {current + 1} / {cards.length}
          </span>

          {isLast ? (
            <button
              onClick={handleFinish}
              className="font-body text-sm font-semibold px-5 py-2.5 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
            >
              Finish ✨
            </button>
          ) : (
            <button
              onClick={() => goTo(current + 1, 1)}
              className="font-body text-sm font-semibold px-5 py-2.5 rounded-full bg-foreground text-background hover:opacity-80 transition-opacity"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DysphoriaActivity;
