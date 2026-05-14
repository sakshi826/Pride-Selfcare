import { useState, useCallback, useRef } from "react";
import { ChevronLeft, Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import TapToReveal from "./TapToReveal";
import BreathingOrb from "./BreathingOrb";

const BAND_COLORS = ["bi-pink", "bi-purple", "bi-blue"];

interface CardData {
  eyebrow: string;
  title: string;
  content: React.ReactNode;
  buttonLabel?: string;
}

const cards: CardData[] = [
  {
    eyebrow: "Welcome",
    title: "Your Struggles Are Not Random",
    content: (
      <div className="space-y-4">
        <p className="text-sm font-body leading-relaxed text-foreground">
          Bisexual people experience higher rates of anxiety, depression, and loneliness than both straight and gay populations. This is not a coincidence. It is the documented result of erasure, invalidation, and the exhaustion of existing between worlds.
        </p>
        <p className="text-sm font-body leading-relaxed text-foreground">
          This activity is about understanding what is happening and building something stronger.
        </p>
        <div className="space-y-2 pt-2">
          <p className="text-sm font-body italic text-bi-purple">
            "Your mental health challenges have a context."
          </p>
          <p className="text-sm font-body italic text-bi-purple">
            "Understanding that context is the beginning of changing it."
          </p>
        </div>
      </div>
    ),
  },
  {
    eyebrow: "The Research",
    title: "What the Data Actually Shows",
    content: (
      <TapToReveal
        bubbles={[
          { text: "Bisexual people report higher rates of anxiety and depression than gay, lesbian, or straight people" },
          { text: "Bisexual people are less likely to be out to their healthcare providers — meaning they receive less appropriate support" },
          { text: "Social isolation is significantly higher among bisexual people due to feeling they do not fully belong in any community" },
          { text: "These outcomes improve dramatically with bisexual-specific community and affirming support" },
        ]}
      />
    ),
  },
  {
    eyebrow: "The Causes",
    title: "Why This Happens",
    content: (
      <div className="space-y-3">
        {[
          { icon: "🪞", label: "Erasure", text: "Being told your identity does not exist, or is a phase, wears you down over time." },
          { icon: "👥", label: "Double exclusion", text: "Feeling too queer for straight spaces and not queer enough for gay spaces creates a particular loneliness." },
          { icon: "🤫", label: "Hiding", text: "The low-level drain of not being fully known in any relationship or community accumulates." },
          { icon: "❓", label: "Internalised doubt", text: "Absorbing the world's scepticism about bisexuality until it becomes your own inner critic." },
        ].map((item, i) => (
          <div key={i} className="p-3 bg-secondary rounded-xl">
            <p className="text-sm font-body leading-relaxed">
              <span className="mr-1.5">{item.icon}</span>
              <strong className="font-display">{item.label}</strong> — {item.text}
            </p>
          </div>
        ))}
      </div>
    ),
  },
  {
    eyebrow: "Breathe",
    title: "This Is Not a Personal Failing",
    content: <BreathingOrb />,
  },
  {
    eyebrow: "Internalised Biphobia",
    title: "When the World's Voice Becomes Your Own",
    content: (
      <div className="space-y-3">
        {[
          { icon: "😶", thought: "Maybe I am making it up", response: "You are not. Doubt about your own identity is a symptom of erasure, not evidence of it." },
          { icon: "😔", thought: "I am too much or not enough", response: "This is the exact message biphobia sends. It is not the truth." },
          { icon: "😞", thought: "I should just pick a side", response: "There is no side to pick. Bisexuality is the whole answer, not half of one." },
        ].map((item, i) => (
          <div key={i} className="p-3 bg-secondary rounded-xl">
            <p className="text-sm font-body leading-relaxed">
              <span className="mr-1.5">{item.icon}</span>
              <em className="font-display italic">"{item.thought}"</em> — {item.response}
            </p>
          </div>
        ))}
        <p className="text-sm font-body italic text-bi-purple text-center pt-2">
          These thoughts were put there. They can be replaced.
        </p>
      </div>
    ),
  },
  {
    eyebrow: "What Helps",
    title: "Tools That Actually Work",
    content: (
      <TapToReveal
        bubbles={[
          { icon: "💬", text: "Therapy with a provider who is affirming of bisexuality specifically — not just LGBTQ+ generally" },
          { icon: "👥", text: "Bisexual community — online or in person — reduces isolation more than any other single factor" },
          { icon: "📖", text: "Reading bisexual stories and history builds the sense of belonging that erasure takes away" },
          { icon: "🏳️‍🌈", text: "Being out to at least one person who fully accepts your identity significantly reduces mental load" },
        ]}
      />
    ),
  },
  {
    eyebrow: "Finding Support",
    title: "You Deserve Care That Sees All of You",
    content: (
      <div className="space-y-4">
        <p className="text-sm font-body leading-relaxed">
          Many therapists are LGBTQ+ affirming in general but have limited understanding of bisexual-specific experiences like erasure, double exclusion, or the exhaustion of constantly explaining yourself.
        </p>
        <p className="text-sm font-body leading-relaxed">
          You are allowed to ask a therapist directly about their experience with bisexual clients. You are allowed to find someone else if the answer is not good enough.
        </p>
        <div className="space-y-2">
          {[
            'Ask: "Do you have experience working with bisexual clients specifically?"',
            "Notice whether they conflate bisexual with gay or treat it as a subset",
            "Trust your instinct if something feels like it is missing",
            "Reach out to LGBTQ+ affirming directories for bisexual-aware therapists",
          ].map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="text-xs font-body font-semibold bg-bi-purple/15 text-bi-purple rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm font-body leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Community",
    title: "Belonging Is Medicine",
    content: (
      <TapToReveal
        bubbles={[
          { icon: "🌱", text: "Finding bisexual community — even online — is one of the most protective mental health factors" },
          { icon: "💛", text: "Bisexual support groups exist in most cities and in large numbers online" },
          { icon: "🤝", text: "Being around people who simply know what you mean without explanation reduces exhaustion significantly" },
          { icon: "✨", text: "You do not have to keep explaining yourself to people who do not understand. Find the ones who already do." },
        ]}
      />
    ),
  },
  {
    eyebrow: "Crisis Support",
    title: "If You Are Struggling Right Now",
    content: (
      <div className="space-y-4">
        <div className="p-4 rounded-xl border-2 border-destructive/40 bg-destructive/5">
          <p className="text-sm font-body leading-relaxed font-medium">
            If you are in crisis or having thoughts of self-harm, please reach out to our experts. You deserve immediate support. You do not have to manage this alone.
          </p>
          <a
            href="https://web.mantracare.com/plans/lgbtq-therapy"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-block w-full py-2.5 rounded-full font-body font-semibold text-sm text-center text-primary-foreground transition-opacity duration-200 hover:opacity-80"
            style={{ background: "linear-gradient(135deg, #d1006c, #6b35b8, #0050a0)" }}
          >
            Book a Session with Our Experts
          </a>
        </div>
        <p className="text-sm font-body leading-relaxed">
          The mental health challenges bisexual people face are real, documented, and not your fault. Getting help is not weakness. It is the most rational response to a genuine and documented problem.
        </p>
        <div className="space-y-2">
          {[
            "You can book a session with our LGBTQ+ specialised experts to talk about anything that bothers you.",
            "You can reach out to a trusted person today — you do not have to explain everything at once.",
          ].map((step, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="text-xs font-body font-semibold bg-bi-purple/15 text-bi-purple rounded-full w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm font-body leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    eyebrow: "Carry This",
    title: "You Are Worth the Support You Give Others",
    buttonLabel: "Finish ✨",
    content: (
      <div className="space-y-4">
        <p className="text-sm font-body leading-relaxed">
          You have probably shown up for other people in your life with far more patience and care than you have shown yourself. You deserve the same quality of support.
        </p>
        <p className="text-sm font-body leading-relaxed">
          Your mental health matters. Your identity is real. Your struggles have a cause. And there is help that can actually reach them.
        </p>
        <div className="space-y-2 pt-2">
          <p className="text-sm font-body italic text-bi-purple">
            "My mental health challenges have a context, not a cause within me."
          </p>
          <p className="text-sm font-body italic text-bi-purple">
            "I deserve support that sees and affirms all of who I am."
          </p>
          <p className="text-sm font-body italic text-bi-purple">
            "Getting help is an act of self-respect."
          </p>
        </div>
      </div>
    ),
  },
];

const CardActivity = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [swiping, setSwiping] = useState(false);
  const [swipeDir, setSwipeDir] = useState<"left" | "right" | null>(null);
  const [finished, setFinished] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const touchStartX = useRef(0);
  const total = cards.length;

  const goNext = useCallback(() => {
    if (current >= total - 1) {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d1006c", "#6b35b8", "#0050a0", "#FFD700"],
      });
      setFinished(true);
      return;
    }
    setSwiping(true);
    setSwipeDir("left");
    setTimeout(() => {
      setCurrent((c) => c + 1);
      setSwiping(false);
      setSwipeDir(null);
    }, 300);
  }, [current, total]);

  const goPrev = useCallback(() => {
    if (current <= 0) return;
    setSwiping(true);
    setSwipeDir("right");
    setTimeout(() => {
      setCurrent((c) => c - 1);
      setSwiping(false);
      setSwipeDir(null);
    }, 300);
  }, [current]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) goNext();
    else if (diff < -50) goPrev();
  };

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
        <div className="orb orb-pink" style={{ width: 260, height: 260, top: "10%", left: "-8%" }} />
        <div className="orb orb-purple" style={{ width: 300, height: 300, top: "40%", right: "-10%" }} />
        <div className="orb orb-blue" style={{ width: 240, height: 240, bottom: "5%", left: "15%" }} />
        
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => {
              window.parent.postMessage("exit_activity", "*");
              window.location.href = "/pride/lgbtq-hub" + window.location.search;
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-purple-600 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back to Hub
          </button>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-md">
          <h2 className="text-3xl font-display text-foreground">You Did It 💜</h2>
          <p className="text-sm font-body text-muted-foreground leading-relaxed">
            You showed up for yourself today. That matters more than you know.
          </p>
            <div className="flex flex-col gap-3 justify-center w-full">
              <button
                onClick={() => { setCurrent(0); setFinished(false); }}
                className="py-4 px-8 rounded-2xl font-body font-bold text-base text-foreground bg-secondary transition-all hover:scale-[1.02] active:scale-95"
              >
                Start Over
              </button>

              <button
                onClick={() => setIsShareOpen(true)}
                className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>

              <button
                onClick={() => {
                  window.parent.postMessage("exit_activity", "*");
                  window.location.href = "/pride/lgbtq-hub" + window.location.search;
                }}
                className="py-4 px-8 rounded-2xl font-body font-bold text-base text-white transition-all hover:scale-[1.02] active:scale-95"
                style={{ background: "linear-gradient(135deg, #d1006c, #6b35b8, #0050a0)" }}
              >
                Back to Hub
              </button>
            </div>

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)} 
            title="Share This Resource"
          />
        </div>
      </div>
    );
  }

  const card = cards[current];
  const bandColor = BAND_COLORS[current % 3];
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Orbs */}
      <div className="orb orb-pink" style={{ width: 260, height: 260, top: "10%", left: "-8%" }} />
      <div className="orb orb-purple" style={{ width: 300, height: 300, top: "40%", right: "-10%" }} />
      <div className="orb orb-blue" style={{ width: 240, height: 240, bottom: "5%", left: "15%" }} />

      <div className="absolute top-6 left-6 z-50">
        <button
          onClick={() => {
            window.parent.postMessage("exit_activity", "*");
            window.location.href = "/pride/lgbtq-hub" + window.location.search;
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-purple-600 transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back to Hub
        </button>
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-[440px] mb-6 relative z-10">
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #d1006c, #6b35b8, #0050a0)",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-body mt-1.5 text-right">
          {current + 1} / {total}
        </p>
      </div>

      {/* Card stack */}
      <div
        className="relative w-full max-w-[440px] z-10"
        style={{ minHeight: current === 3 ? 880 : current === 5 || current === 7 ? 740 : 620 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Behind cards */}
        {current < total - 1 && (
          <div
            className="absolute inset-x-3 top-2 rounded-[28px] h-full"
            style={{
              background: "rgba(255,255,255,0.5)",
              transform: "scale(0.95)",
              zIndex: 1,
            }}
          />
        )}
        {current < total - 2 && (
          <div
            className="absolute inset-x-6 top-4 rounded-[28px] h-full"
            style={{
              background: "rgba(255,255,255,0.3)",
              transform: "scale(0.9)",
              zIndex: 0,
            }}
          />
        )}

        {/* Active card */}
        <div
          className={`relative rounded-[28px] overflow-hidden transition-all duration-300 ${
            swiping && swipeDir === "left"
              ? "opacity-0 -translate-x-16"
              : swiping && swipeDir === "right"
              ? "opacity-0 translate-x-16"
              : "opacity-100 translate-x-0"
          }`}
          style={{
            background: "rgba(255,255,255,0.88)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
            zIndex: 2,
          }}
        >
          {/* Top band */}
          <div
            className="h-1.5"
            style={{
              background:
                bandColor === "bi-pink"
                  ? "#d1006c"
                  : bandColor === "bi-purple"
                  ? "#6b35b8"
                  : "#0050a0",
            }}
          />

          <div className="p-6 space-y-4">
            {/* Eyebrow */}
            <span className="text-xs font-body font-semibold uppercase tracking-widest text-muted-foreground">
              {card.eyebrow}
            </span>

            {/* Title */}
            <h2 className="text-2xl font-display leading-snug text-foreground">
              {card.title}
            </h2>

            {/* Body */}
            <div className={`${current === 3 ? '' : 'max-h-[50vh] overflow-y-auto'} pr-1`}>{card.content}</div>

            {/* Buttons */}
            <div className="flex gap-2">
              {current > 0 && (
                <button
                  onClick={goPrev}
                  className="py-3 px-5 rounded-full font-body font-semibold text-sm text-muted-foreground bg-secondary transition-opacity duration-200 hover:opacity-80"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={goNext}
                className="flex-1 py-3 rounded-full font-body font-semibold text-sm text-primary-foreground transition-opacity duration-200 hover:opacity-80"
                style={{
                  background: "linear-gradient(135deg, #d1006c, #6b35b8, #0050a0)",
                }}
              >
                {card.buttonLabel || "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardActivity;
