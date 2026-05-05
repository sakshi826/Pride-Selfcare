import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ArrowRight, ArrowLeft, RefreshCcw } from "lucide-react";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface CardData {
  eye: string;
  title: string;
  band: "blue" | "pink";
  body: string;
  steps?: string[];
  scenarios?: string[];
  affirmations?: string[];
  notice?: string;
  isFinal?: boolean;
}

const cards: CardData[] = [
  {
    eye: "Welcome",
    title: "This Is Your Journey, Not a Checklist",
    band: "blue",
    body: "Medical transition looks completely different for every trans person. Some people want every available option. Some want a few specific things. Some want none at all — and that is just as valid.\n\nThis activity is a friendly map of what exists, not a list of things you are supposed to want. There are no right answers here, no minimum requirements, and no pressure. You are simply gathering information so you can make choices that feel right for you.\n\nWhether you are just starting to think about medical transition, already partway through, or supporting someone you care about — you belong here.",
    affirmations: [
      "There is no correct version of medical transition.",
      "You get to decide what your body needs, nobody else.",
      "Exploring your options is an act of self-respect.",
    ],
  },
  {
    eye: "First Things First",
    title: "You Do Not Need to Have It All Figured Out",
    band: "pink",
    body: "Most people who begin medical transition do not know exactly where they will end up. That is normal and fine. You are allowed to take one step, see how it feels, and decide about the next one from there. Transition is not a sprint to a finish line. It is a series of individual choices.",
    steps: [
      "Start with what feels most urgent or most meaningful to you",
      "You can pause, slow down, or change direction at any point",
      "Each step you take is reversible or adjustable at your own pace",
      "There is no deadline and no exam at the end",
    ],
  },
  {
    eye: "What Is Available",
    title: "A Gentle Overview of Options",
    band: "blue",
    body: "",
    scenarios: [
      "💊 Hormone therapy — For trans women: oestrogen. For trans men: testosterone. Changes develop gradually over months and years. Many people describe this as the most significant single step.",
      "🧴 Puberty blockers — For younger trans people, these pause puberty to allow more time to explore identity without irreversible changes.",
      "✂️ Gender-affirming surgery — A wide range of options, from top surgery to more involved procedures. Entirely optional and personal.",
      "💉 Voice therapy — Especially useful for trans women. Working with a voice therapist to develop a voice that feels right.",
    ],
  },
  {
    eye: "Hormones",
    title: "What Hormone Therapy Feels Like",
    band: "pink",
    body: "People who start hormones often describe the experience as feeling like things are finally moving in the right direction — even before major physical changes. The emotional shift tends to come before the physical one for many people.",
    steps: [
      "Changes are gradual — most develop over 1 to 3 years",
      "Everyone's response is different and that is expected",
      "Regular check-ins with a doctor are part of the process",
      "You can adjust dosage over time with your healthcare provider",
    ],
    notice:
      "Hormones are medical. Work with a doctor who understands trans healthcare. You deserve a provider who takes your experience seriously.",
  },
  {
    eye: "Finding a Doctor",
    title: "You Deserve Affirming Healthcare",
    band: "blue",
    body: "Finding a doctor who genuinely understands trans healthcare makes an enormous difference. Not all healthcare providers have this experience, and you are allowed to look until you find one who does.",
    scenarios: [
      '🔍 "Search for LGBTQ+ affirming clinics or gender identity clinics in your area"',
      '💬 "Ask directly: do you have experience supporting trans patients with medical transition?"',
      '📋 "Bring notes to your first appointment — your history, what you want, what you have already tried"',
      '💛 "If a provider makes you feel dismissed or unwelcome, you are allowed to find someone else"',
    ],
  },
  {
    eye: "The Timeline",
    title: "Things Take Time and That Is Okay",
    band: "pink",
    body: "Medical transition timelines vary enormously by country, healthcare system, and individual circumstance. Waiting is one of the most frustrating parts for many trans people. Knowing what to expect helps.",
    steps: [
      "Initial referral or self-referral to a gender clinic or affirming GP",
      "Assessment appointments — typically 1 to 3 before hormone prescription",
      "Starting treatment and monitoring with regular follow-ups",
      "Surgical referrals, where desired, usually come after a period on hormones",
    ],
    notice:
      "The timeline is often longer than you wish it were. That is a failure of systems, not of you. Keep going.",
  },
  {
    eye: "Top Surgery",
    title: "For Those Who Want It",
    band: "blue",
    body: "Top surgery — chest masculinisation for trans men or chest feminisation options for trans women — is one of the most commonly sought gender-affirming procedures. For many people who want it, it is described as transformative.",
    scenarios: [
      '🏥 "Referral is usually through a gender clinic or specialist GP"',
      '💬 "Most surgeons will want you to have been living in your gender for a period before surgery"',
      '🔍 "Research surgeons with specific experience in gender-affirming procedures"',
      '💛 "Recovery takes weeks — plan for support and rest"',
    ],
  },
  {
    eye: "Looking After Yourself",
    title: "Transition Is a Marathon, Not a Sprint",
    band: "pink",
    body: "Medical transition involves a lot of appointments, a lot of waiting, and a lot of navigating systems that were not always designed with you in mind. Looking after yourself through that process matters.",
    steps: [
      "Build a small support network who knows what you are going through",
      "Celebrate small milestones — the first prescription, the first appointment, the first change you notice",
      "Rest when the process feels heavy",
      "Connect with others who are at a similar stage — peer support is genuinely useful",
    ],
  },
  {
    eye: "If Access Is Hard",
    title: "When the System Does Not Make It Easy",
    band: "blue",
    body: "In many places, accessing gender-affirming medical care involves waiting lists, gatekeeping, or cost barriers. This is a failure of healthcare systems, not a sign that you do not deserve care.",
    scenarios: [
      '🌐 "Online gender clinics and telehealth services have expanded access significantly in recent years"',
      '💊 "Informed consent models — where you do not need extended assessment — are available in some places"',
      '🤝 "Trans community groups often have up-to-date knowledge of the most accessible local pathways"',
      '💛 "You are allowed to advocate for yourself firmly and persistently — you deserve timely care"',
    ],
  },
  {
    eye: "Carry This",
    title: "Every Step You Take Is Yours",
    band: "pink",
    body: "Medical transition is not the whole of being trans, and it is not required to have a valid trans identity. But for those who want it, it is a profound act of self-knowledge and self-care.\n\nEvery step you take toward the body and life that feel right is a step worth taking. The courage it takes to explore, to ask questions, to show up for yourself — that matters enormously.\n\nYou have already done something brave just by being here and learning. Whatever comes next, you are not alone in it. There is a whole community of people who understand, who have walked similar paths, and who are cheering you on.",
    affirmations: [
      "I am allowed to want what I want for my body.",
      "Every step I take is on my own timeline.",
      "I am building a life that belongs to me.",
      "I deserve care, patience, and kindness — especially from myself.",
    ],
    isFinal: true,
  },
];

const TransitionCards = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [finished, setFinished] = useState(false);
  const touchStart = useRef<number | null>(null);

  const goNext = useCallback(() => {
    if (current >= cards.length - 1) return;
    setDirection("left");
    setCurrent((c) => c + 1);
  }, [current]);

  const goPrev = useCallback(() => {
    if (current <= 0) return;
    setDirection("right");
    setCurrent((c) => c - 1);
  }, [current]);

  const handleFinish = () => {
    setFinished(true);
    setTimeout(() => {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ["#55cdfc", "#f7a8b8", "#ffffff"],
      });
    }, 100);
  };

  const handleStartOver = () => {
    setFinished(false);
    setCurrent(0);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    touchStart.current = null;
  };

  const card = cards[current];
  const progress = ((current + 1) / cards.length) * 100;

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-background">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div
            className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl bg-trans-blue"
            style={{ top: "10%", left: "-5%", animation: "drift1 18s ease-in-out infinite" }}
          />
          <div
            className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl bg-trans-pink"
            style={{ top: "50%", right: "-10%", animation: "drift2 22s ease-in-out infinite" }}
          />
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

        <div className="z-10 max-w-[440px] w-full text-center animate-slide-in">
          <div
            className="rounded-[28px] shadow-lg overflow-hidden p-8"
            style={{ backgroundColor: "rgba(255,255,255,0.88)" }}
          >
            <div
              className="h-1.5 w-full -mt-8 -mx-8 mb-6"
              style={{
                width: "calc(100% + 4rem)",
                background: "linear-gradient(90deg, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)",
              }}
            />
            <p className="text-5xl mb-4">🎉</p>
            <h1 className="text-2xl font-display text-foreground mb-3">
              You Did It!
            </h1>
            <p className="text-foreground text-[16px] font-sans leading-relaxed mb-4">
              You just made it through every card — and that means you showed up for yourself today. That takes real courage.
            </p>
            <p className="text-foreground text-[15px] font-sans leading-relaxed mb-6">
              Whatever your next step looks like — big, small, or simply sitting with what you have learned — you are already on your way. You are worthy of every good thing ahead.
            </p>
            <p className="text-foreground font-display italic text-lg mb-6">
              "The world is better with you in it, exactly as you are." 💛
            </p>
            <div className="flex gap-4 justify-center mt-4">
              <button
                onClick={handleStartOver}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 transition-all duration-200"
              >
                <RefreshCcw size={16} />
                Start Over
              </button>
              <button
                onClick={() => navigate('/lgbtq-hub')}
                className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                style={{
                  background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                }}
              >
                Back to Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-background">
      {/* Floating orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl bg-trans-blue"
          style={{ top: "10%", left: "-5%", animation: "drift1 18s ease-in-out infinite" }}
        />
        <div
          className="absolute w-80 h-80 rounded-full opacity-15 blur-3xl bg-trans-pink"
          style={{ top: "50%", right: "-10%", animation: "drift2 22s ease-in-out infinite" }}
        />
        <div
          className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl bg-trans-blue"
          style={{ bottom: "5%", left: "30%", animation: "drift3 20s ease-in-out infinite" }}
        />
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

      {/* Progress bar */}
      <div className="w-full max-w-[440px] mb-6 z-10">
        <div className="h-2 rounded-full overflow-hidden bg-muted">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background:
                "linear-gradient(90deg, #55cdfc, #f7a8b8, #ffffff, #f7a8b8, #55cdfc)",
            }}
          />
        </div>
        <p className="text-center text-muted-foreground text-sm mt-2 font-sans">
          {current + 1} of {cards.length}
        </p>
      </div>

      {/* Card stack */}
      <div
        className="relative w-full max-w-[440px] z-10"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Behind-card stack effect */}
        {current < cards.length - 1 && (
          <>
            <div className="absolute inset-x-3 top-3 h-full rounded-[28px] bg-card/60 shadow-sm" />
            <div className="absolute inset-x-1.5 top-1.5 h-full rounded-[28px] bg-card/75 shadow-sm" />
          </>
        )}

        {/* Main card with AnimatePresence */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={{
              enter: (dir) => ({
                x: dir === "left" ? 40 : -40,
                opacity: 0,
                scale: 0.98
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1
              },
              exit: (dir) => ({
                x: dir === "left" ? -40 : 40,
                opacity: 0,
                scale: 0.98
              })
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.25,
              ease: "easeInOut"
            }}
            className="relative rounded-[28px] shadow-xl overflow-hidden border border-white/50"
            style={{ backgroundColor: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)" }}
          >
            {/* Top band */}
            <div
              className="h-2 w-full"
              style={{
                backgroundColor: card.band === "blue" ? "#55cdfc" : "#f7a8b8",
              }}
            />

            <div className="p-7 pb-8">
              {/* Eye label */}
              <p className="text-[11px] font-bold tracking-[0.1em] uppercase text-slate-400 mb-2 font-sans">
                {card.eye}
              </p>

              {/* Title */}
              <h1 className="text-2xl font-display leading-tight mb-5 text-slate-900">
                {card.title}
              </h1>

              {/* Body */}
              {card.body && (
                <div className="text-slate-600 leading-relaxed mb-6 font-sans text-[15px] space-y-4">
                  {card.body.split("\n\n").map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              )}

              {/* Steps */}
              {card.steps && (
                <ul className="space-y-3 mb-6">
                  {card.steps.map((step, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-slate-600 text-[15px] font-sans"
                    >
                      <span
                        className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0 shadow-sm"
                        style={{
                          backgroundColor:
                            card.band === "blue" ? "#55cdfc" : "#f7a8b8",
                        }}
                      />
                      {step}
                    </li>
                  ))}
                </ul>
              )}

              {/* Scenarios */}
              {card.scenarios && (
                <div className="space-y-3 mb-6">
                  {card.scenarios.map((s, i) => (
                    <div
                      key={i}
                      className="rounded-2xl px-5 py-4 text-slate-600 text-[15px] font-sans leading-relaxed bg-slate-50/80 border border-slate-100 shadow-sm"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              )}

              {/* Notice */}
              {card.notice && (
                <div
                  className="rounded-2xl px-5 py-4 text-slate-700 text-[14px] font-sans leading-relaxed mb-6 border"
                  style={{
                    borderColor:
                      card.band === "blue"
                        ? "rgba(85,205,252,0.4)"
                        : "rgba(247,168,184,0.4)",
                    backgroundColor:
                      card.band === "blue"
                        ? "rgba(85,205,252,0.12)"
                        : "rgba(247,168,184,0.12)",
                  }}
                >
                  <span className="font-bold mr-2">Note:</span>
                  {card.notice}
                </div>
              )}

              {/* Affirmations */}
              {card.affirmations && (
                <div className="space-y-3 mb-6">
                  {card.affirmations.map((a, i) => (
                    <p
                      key={i}
                      className="text-[16px] font-display italic text-slate-800 pl-4 relative"
                    >
                      <span 
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-full"
                        style={{ backgroundColor: card.band === "blue" ? "#55cdfc" : "#f7a8b8" }}
                      />
                      "{a}"
                    </p>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 gap-4">
                <div className="w-24">
                  {current > 0 && (
                    <button
                      onClick={goPrev}
                      className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 active:scale-95 transition-all duration-200 group"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                      Back
                    </button>
                  )}
                </div>

                {card.isFinal ? (
                  <button
                    onClick={handleFinish}
                    className="px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    }}
                  >
                    Finish ✨
                  </button>
                ) : (
                  <button
                    onClick={goNext}
                    className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold text-white shadow-lg shadow-cyan-200/50 hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all duration-200 group"
                    style={{
                      background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
                    }}
                  >
                    Next
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TransitionCards;
