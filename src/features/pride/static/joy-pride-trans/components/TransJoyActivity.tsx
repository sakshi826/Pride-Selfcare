import { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import { PrideFloatingOrbs } from "../../../components/PrideFloatingOrbs";
import { PrideActivityHeader } from "../../../components/PrideActivityHeader";
import { PrideSuccessState } from "../../../components/PrideSuccessState";

interface RevealBubble {
  icon: string;
  text: string;
}

interface CardData {
  eyebrow: string;
  title: string;
  bandColor: "blue" | "pink";
  type: "body" | "quote" | "bubbles" | "steps" | "affirmations";
  body?: string;
  affirmations?: string[];
  quote?: { text: string; attribution: string };
  bubbles?: RevealBubble[];
  steps?: string[];
  buttonLabel?: string;
}

const cards: CardData[] = [
  {
    eyebrow: "Welcome",
    title: "This Space Is for Your Joy",
    bandColor: "blue",
    type: "body",
    body: "So much of the conversation around being trans focuses on difficulty — the dysphoria, the systems, the conversations, the struggle.\n\nAll of that is real. But it is not the whole story.\n\nThis activity is about the other part. The part that is yours to celebrate.",
    affirmations: [
      "Your identity is not a problem to be solved. It is a life to be lived.",
      "Joy is not a reward for surviving. It is something you are allowed right now.",
    ],
  },
  {
    eyebrow: "The Relief",
    title: "The Feeling of Finally Being Seen",
    bandColor: "pink",
    type: "quote",
    body: "Ask any trans person who has come out and most will describe a particular feeling — relief. Not just relief that the secret is out, but the deeper relief of being known. Of someone using the right name, the right pronouns, and feeling the world finally match the inside.",
    quote: {
      text: "The first time someone called me by my name without being corrected, I had to leave the room. Not because I was upset. Because the feeling was too big to hold in public.",
      attribution: "Community member",
    },
  },
  {
    eyebrow: "Small Joys",
    title: "The Everyday Moments That Matter",
    bandColor: "blue",
    type: "bubbles",
    bubbles: [
      { icon: "🪞", text: "Looking in the mirror and recognising yourself — even just for a second." },
      { icon: "👕", text: "Putting on clothes that feel right and not wanting to take them off." },
      { icon: "📝", text: "Seeing your name written down and it being the right one." },
      { icon: "💬", text: "Someone using your pronouns without being reminded." },
    ],
  },
  {
    eyebrow: "Trans History",
    title: "You Come From a Long Line of Brave People",
    bandColor: "pink",
    type: "steps",
    body: "Trans people have existed in every culture and every era of human history. Hijra in South Asia, Two-Spirit people in Indigenous North American cultures, the Fa'afafine of Samoa, the Muxe of Mexico — gender diversity is not a modern invention. It is ancient, global, and human.",
    steps: [
      "Marsha P. Johnson and Sylvia Rivera were trans women of colour at the forefront of Stonewall",
      "Trans activists have been central to every major LGBTQ+ rights advance",
      "You are part of a lineage that has always existed and always will",
    ],
  },
  {
    eyebrow: "Trans Excellence",
    title: "Trans People Are Extraordinary",
    bandColor: "blue",
    type: "bubbles",
    bubbles: [
      { icon: "🎨", text: "Trans artists, writers, musicians and filmmakers are reshaping culture in every medium." },
      { icon: "🔬", text: "Trans scientists, doctors and researchers are advancing knowledge in every field." },
      { icon: "⚖️", text: "Trans lawyers and activists are building legal protections for future generations." },
      { icon: "🏅", text: "Trans athletes compete and excel at every level of sport." },
    ],
  },
  {
    eyebrow: "Your Body",
    title: "Your Body Is Yours and It Is Good",
    bandColor: "pink",
    type: "affirmations",
    body: "Your body — wherever it is in transition, whatever it looks like right now, however it does or does not match your sense of yourself — is yours. It has carried you to this point. It is the body of a trans person, which means it is the body of someone who is living honestly. That is worth something.",
    affirmations: [
      "My body is not a work in progress. It is my body, today.",
      "I do not owe anyone a particular version of myself.",
      "I am allowed to feel good in my body right now.",
    ],
  },
  {
    eyebrow: "Community",
    title: "Trans Joy Is Collective",
    bandColor: "blue",
    type: "bubbles",
    bubbles: [
      { icon: "🏳️‍⚧️", text: "Trans Pride events exist in cities across the world — spaces built entirely around celebration." },
      { icon: "💛", text: "Trans community — online and in person — is full of humour, warmth, creativity and care." },
      { icon: "🌈", text: "Chosen family built around trans identity is one of the most sustaining forms of connection." },
      { icon: "✨", text: "When one trans person lives joyfully and openly, it makes it easier for the next one." },
    ],
  },
  {
    eyebrow: "Transition Joy",
    title: "The Things Transition Gives You",
    bandColor: "pink",
    type: "steps",
    body: "Transition — in whatever form it takes — gives things back. A voice that sounds right. A reflection that makes sense. A name that fits. A way of moving through the world that does not require constant management.\n\nThese are not small things. They are enormous things that many people take for granted and trans people get to experience as gifts.",
    steps: [
      "The first time your voice sounds right to you",
      "The first time a stranger uses the right pronouns without being told",
      "The first time you introduce yourself with your real name without anxiety",
      "The first time you forget to feel dysphoria because you are just living",
    ],
  },
  {
    eyebrow: "Write Your Joy",
    title: "What Does Trans Joy Feel Like for You?",
    bandColor: "blue",
    type: "bubbles",
    bubbles: [
      { icon: "💭", text: "Think of one moment where being trans felt like a gift rather than a burden." },
      { icon: "🌟", text: "Name one thing about your identity that you are proud of." },
      { icon: "💜", text: "Think of one trans person — real or fictional — who has made you feel less alone." },
      { icon: "✍️", text: "Finish this sentence: being trans means I get to —" },
    ],
  },
  {
    eyebrow: "Carry This",
    title: "You Are Allowed to Flourish",
    bandColor: "pink",
    type: "affirmations",
    body: "The world will give you plenty of reasons to focus on the difficulty. You do not need this activity to remind you of that.\n\nWhat you might need is permission — clear, unconditional, unqualified permission — to also feel the joy. To celebrate your identity. To be proud of who you are not in spite of being trans but including it.",
    affirmations: [
      "I am trans and I am joyful and those two things belong together.",
      "My identity is a gift I get to unwrap for the rest of my life.",
      "I am allowed to flourish.",
    ],
    buttonLabel: "Finish ✨",
  },
];

function miniConfetti(x: number, y: number) {
  confetti({
    particleCount: 30,
    spread: 50,
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
    colors: ["#55cdfc", "#f7a8b8", "#ffffff"],
    scalar: 0.7,
    gravity: 0.8,
  });
}

function bigConfetti() {
  const end = Date.now() + 2000;
  const colors = ["#55cdfc", "#f7a8b8", "#ffffff", "#f7a8b8", "#55cdfc"];
  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}

// Tap-to-reveal bubbles component
function RevealBubbles({ bubbles }: { bubbles: RevealBubble[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleTap = useCallback(
    (index: number, e: React.MouseEvent | React.TouchEvent) => {
      if (revealed.has(index)) return;
      if (!hasInteracted) setHasInteracted(true);
      setRevealed((prev) => new Set(prev).add(index));

      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      miniConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
    },
    [revealed, hasInteracted]
  );

  return (
    <div className="space-y-3">
      {!hasInteracted && (
        <p className="text-center text-sm text-muted-foreground animate-pulse">
          👆 Tap each bubble to reveal
        </p>
      )}
      <div className="grid gap-3">
        {bubbles.map((b, i) => {
          const isRevealed = revealed.has(i);
          return (
            <button
              key={i}
              onClick={(e) => handleTap(i, e)}
              className="relative overflow-hidden rounded-2xl text-left transition-all duration-300 shadow-sm"
              style={{
                background: isRevealed
                  ? "rgba(255,255,255,0.7)"
                  : i % 2 === 0
                  ? "#55cdfc"
                  : "#f7a8b8",
                minHeight: 64,
              }}
            >
              {/* Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center gap-2 font-medium transition-opacity duration-500"
                style={{
                  opacity: isRevealed ? 0 : 1,
                  pointerEvents: isRevealed ? "none" : "auto",
                  color: "rgba(255,255,255,0.95)",
                }}
              >
                <span className="text-xl">{b.icon}</span>
                <span className="text-sm">Tap to reveal</span>
              </div>
              {/* Content */}
              <div
                className="p-4 flex items-start gap-3"
                style={{
                  opacity: isRevealed ? 1 : 0,
                  transform: isRevealed ? "scale(1)" : "scale(0.6)",
                  transition: "opacity 0.4s, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                }}
              >
                <span className="text-xl flex-shrink-0 mt-0.5">{b.icon}</span>
                <span className="text-sm leading-relaxed text-foreground">{b.text}</span>
              </div>
            </button>
          );
        })}
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {revealed.size} / {bubbles.length} revealed
      </p>
    </div>
  );
}

export default function TransJoyActivity() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const touchStart = useRef<number | null>(null);
  const isLast = current === cards.length - 1;

  const goNext = useCallback(() => {
    if (isLast) {
      bigConfetti();
      setFinished(true);
      return;
    }
    setDirection("left");
    setTimeout(() => {
      setCurrent((c) => Math.min(c + 1, cards.length - 1));
      setDirection(null);
    }, 300);
  }, [isLast]);

  const goPrev = useCallback(() => {
    if (current === 0) return;
    setDirection("right");
    setTimeout(() => {
      setCurrent((c) => Math.max(c - 1, 0));
      setDirection(null);
    }, 300);
  }, [current]);

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
      <div className="activity-root bg-[#f8fff8] flex items-center justify-center p-6">
        <PrideFloatingOrbs variant="trans" />
        <div className="activity-container-sm">
          <PrideSuccessState 
            variant="trans"
            title="You Did It!"
            message="Your joy is real, valid, and yours to keep. You are allowed to flourish."
            emoji="🏳️‍⚧️"
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
    <div className="activity-root bg-[#f8fff8] py-8">
      <PrideFloatingOrbs variant="trans" />

      <div className="activity-container-sm">
        <PrideActivityHeader 
          title="Trans Joy" 
          subtitle="Celebrating your identity"
          onBack={() => current > 0 ? goPrev() : navigate("/lgbtq-hub")}
        />

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(0,0,0,0.06)" }}>
            <div
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #55cdfc, #f7a8b8, #f5f5f5, #f7a8b8, #55cdfc)",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {current + 1} of {cards.length}
          </p>
        </div>

        {/* Card stack area */}
        <div
          className="relative w-full max-w-[440px] mx-auto flex flex-col items-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Active card */}
          <div
            className="relative w-full z-10 transition-all duration-300"
            style={{
              transform:
                direction === "left"
                  ? "translateX(-110%) rotate(-4deg)"
                  : direction === "right"
                  ? "translateX(110%) rotate(4deg)"
                  : "translateX(0)",
              opacity: direction ? 0 : 1,
            }}
          >
            <div
              className="rounded-[32px] overflow-hidden bg-white/90 backdrop-blur-md shadow-2xl border border-white/50"
            >
              {/* Top band */}
              <div
                className="h-1.5"
                style={{ background: card.bandColor === "blue" ? "#55cdfc" : "#f7a8b8" }}
              />

              <div className="p-8 space-y-5">
                {/* Eyebrow */}
                <p
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: card.bandColor === "blue" ? "#55cdfc" : "#f7a8b8" }}
                >
                  {card.eyebrow}
                </p>

                {/* Title */}
                <h2 className="font-display text-2xl font-bold leading-tight text-foreground">
                  {card.title}
                </h2>

                {/* Body */}
                {card.body && (
                  <div className="text-sm leading-relaxed text-foreground/80 space-y-3">
                    {card.body.split("\n\n").map((p, i) => (
                      <p key={i}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Quote */}
                {card.type === "quote" && card.quote && (
                  <blockquote
                    className="border-l-4 pl-4 py-2 my-3 text-sm italic leading-relaxed text-foreground/80 bg-gray-50/50 rounded-r-xl"
                    style={{ borderColor: "#f7a8b8" }}
                  >
                    <p>"{card.quote.text}"</p>
                    <footer className="mt-2 text-xs not-italic text-muted-foreground">
                      — {card.quote.attribution}
                    </footer>
                  </blockquote>
                )}

                {/* Bubbles */}
                {card.type === "bubbles" && card.bubbles && (
                  <RevealBubbles bubbles={card.bubbles} />
                )}

                {/* Steps */}
                {card.type === "steps" && card.steps && (
                  <div className="space-y-3 mt-2">
                    {card.steps.map((s, i) => (
                      <div key={i} className="flex gap-3 items-start text-sm">
                        <span
                          className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            background: i % 2 === 0 ? "#55cdfc" : "#f7a8b8",
                            color: "white",
                          }}
                        >
                          {i + 1}
                        </span>
                        <span className="leading-relaxed text-foreground/80 font-medium">{s}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Affirmations */}
                {card.affirmations && (
                  <div className="space-y-4 mt-2">
                    {card.affirmations.map((a, i) => (
                      <p
                        key={i}
                        className="font-display italic text-lg leading-snug pl-4 border-l-2 text-gray-700"
                        style={{ borderColor: i % 2 === 0 ? "#55cdfc" : "#f7a8b8" }}
                      >
                        {a}
                      </p>
                    ))}
                  </div>
                )}

                {/* Button */}
                <button
                  onClick={goNext}
                  className="w-full mt-6 py-4 px-6 rounded-2xl text-sm font-bold shadow-lg transition-all hover:-translate-y-0.5 active:scale-95"
                  style={{
                    background:
                      "linear-gradient(135deg, #55cdfc, #f7a8b8)",
                    color: "white",
                  }}
                >
                  {card.buttonLabel || (isLast ? "Finish ✨" : "Continue →")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
