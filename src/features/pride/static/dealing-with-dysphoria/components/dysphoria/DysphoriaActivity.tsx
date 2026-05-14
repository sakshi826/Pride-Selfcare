import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import confetti from "canvas-confetti";
import Card1Split from "./Card1Split";
import Card2Scale from "./Card2Scale";
import Card3Breathing from "./Card3Breathing";
import Card4Strategies from "./Card4Strategies";
import Card5Closing from "./Card5Closing";
import { PrideFloatingOrbs } from "../../../../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../../../../components/PrideActivityHeader";
import { PrideSuccessState } from "../../../../components/PrideSuccessState";

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
      <div className="activity-root bg-[#FDFCFE] flex items-center justify-center p-6">
        <PrideFloatingOrbs variant="trans" />
        <div className="activity-container-sm">
          <PrideSuccessState 
            variant="trans"
            title="You did it!"
            message="You showed up for yourself today. Dysphoria doesn't get the last word — you do."
            emoji="✨"
            onRestart={() => {
              setFinished(false);
              setCurrent(0);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="activity-root bg-[#FDFCFE] py-8">
      <PrideFloatingOrbs variant="trans" />

      <div className="activity-container-sm">
        <PrideActivityHeader 
          title="Dealing with Dysphoria" 
          subtitle="Grounding and coping strategies"
          onBack={() => {
            if (current > 0) {
              goTo(current - 1, -1);
            } else {
              window.parent.postMessage("exit_activity", "*");
              window.location.href = "/pride/lgbtq-hub" + window.location.search;
            }
          }}
        />

        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-1.5 rounded-full overflow-hidden bg-gray-100">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(to right, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)",
              }}
              animate={{ width: `${((current + 1) / cards.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {current + 1} of {cards.length}
          </p>
        </div>

        {/* Card area */}
        <div className="relative w-full max-w-[440px] mx-auto">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ x: direction * 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -direction * 50, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
              className="relative rounded-[32px] shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing bg-white/90 backdrop-blur-md border border-white/50"
            >
              {/* Top band */}
              <div
                className="h-1.5 w-full"
                style={{ backgroundColor: card.band === "blue" ? "#55cdfc" : "#f7a8b8" }}
              />

              <div className="p-8 space-y-5">
                {/* Eyebrow + title */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-2"
                    style={{ color: card.band === "blue" ? "#55cdfc" : "#f7a8b8" }}
                  >
                    {card.eye}
                  </p>
                  <h2 className="font-display text-2xl font-bold leading-tight text-foreground">
                    {card.title}
                  </h2>
                </div>

                {/* Card content */}
                <div className="text-sm leading-relaxed text-foreground/80">
                  <card.Content />
                </div>

                {/* Navigation Buttons inside card for better UX */}
                <div className="flex gap-3 pt-4">
                  {isLast ? (
                    <button
                      onClick={handleFinish}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#55cdfc] to-[#f7a8b8] text-white font-bold shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                    >
                      Finish ✨
                    </button>
                  ) : (
                    <button
                      onClick={() => goTo(current + 1, 1)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#55cdfc] to-[#f7a8b8] text-white font-bold shadow-lg transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                    >
                      Next Step →
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DysphoriaActivity;
