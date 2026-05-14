import { useState, useCallback, useRef, ReactNode } from "react";
import { ChevronLeft, Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ActivityCard from "./ActivityCard";
import TapBubble from "./TapBubble";
import BreathingOrb from "./BreathingOrb";
import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";

const TOTAL = 10;
const bandPattern: ("pink" | "purple" | "blue")[] = [
  "pink", "purple", "blue", "pink", "purple", "blue", "pink", "purple", "blue", "pink",
];

interface BubbleSet {
  bubbles: { emoji: string; text: string; subtext?: string }[];
}

const CardDeck = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);

  const next = useCallback(() => {
    if (current < TOTAL - 1) setCurrent((c) => c + 1);
  }, [current]);

  const prev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  const handleFinish = () => {
    setFinished(true);
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#d1006c", "#6b35b8", "#0050a0", "#ffd700"],
    });
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { x: 0.3, y: 0.5 },
        colors: ["#d1006c", "#6b35b8", "#0050a0"],
      });
    }, 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = e.changedTouches[0].clientX - touchStart;
    if (diff < -50) next();
    else if (diff > 50) prev();
    setTouchStart(null);
  };

  const progress = ((current + 1) / TOTAL) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-[440px] mx-auto px-4 py-8 gap-5 min-h-screen justify-start">
      <div className="w-full mb-4">
        <PrideActivityHeader 
          title="Conversation Guide" 
          onBack={current > 0 && !finished ? prev : undefined}
        />
      </div>

      <div className="flex-1 flex flex-col items-center w-full justify-center">
        {/* Progress bar */}
        <div className="w-full h-1 rounded-full bg-muted overflow-hidden mb-2">
          <div
            className="h-full progress-gradient rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-muted-foreground mb-6">
          {current + 1} / {TOTAL}
        </p>

        {/* Card stack */}
        <div
          className="relative w-full"
          style={{ minHeight: 480 }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Behind cards */}
          {current < TOTAL - 1 && (
            <div
              className="absolute inset-x-3 top-3 card-glass h-full opacity-40"
              style={{ transform: "scale(0.95)", zIndex: 0 }}
            />
          )}
          {current < TOTAL - 2 && (
            <div
              className="absolute inset-x-5 top-5 card-glass h-full opacity-20"
              style={{ transform: "scale(0.9)", zIndex: -1 }}
            />
          )}

          {/* Active card */}
          <div className="relative z-10">
            {renderCard(current, next, handleFinish, finished, navigate, setCurrent, setFinished, () => setIsShareOpen(true))}
          </div>
        </div>
      </div>

      {/* Nav buttons — hide on first card (has its own CTA) and after finish */}
      {!finished && current > 0 && (
        <div className="flex gap-3 w-full mt-4">
          <button onClick={prev} className="btn-pill flex-1 !bg-muted !text-foreground">
            ← Back
          </button>
          {current < TOTAL - 1 && (
            <button onClick={next} className="btn-pill flex-1">
              Next →
            </button>
          )}
        </div>
      )}

      <ShareModal 
        isOpen={isShareOpen} 
        onClose={() => setIsShareOpen(false)} 
        title="Share This Guide"
      />
    </div>
  );
};

/* Bubble card helper */
const BubbleCard = ({
  eyebrow,
  title,
  color,
  bubbles,
  hint,
}: {
  eyebrow: string;
  title: string;
  color: "pink" | "purple" | "blue";
  bubbles: { emoji: string; text: string; subtext?: string; color: "pink" | "purple" | "blue" }[];
  hint?: string;
}) => {
  const [revealed, setRevealed] = useState(0);
  const total = bubbles.length;
  const [hintVisible, setHintVisible] = useState(true);

  const onReveal = () => {
    setRevealed((r) => r + 1);
    if (hintVisible) setHintVisible(false);
  };

  return (
    <ActivityCard eyebrow={eyebrow} title={title} color={color}>
      {hintVisible && (
        <p className="text-xs text-bi-purple animate-pulse text-center">
          👆 Tap each bubble to reveal
        </p>
      )}
      <div className="flex flex-col gap-2.5">
        {bubbles.map((b, i) => (
          <TapBubble
            key={i}
            emoji={b.emoji}
            text={b.text}
            subtext={b.subtext}
            color={b.color}
            onReveal={onReveal}
          />
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center mt-1">
        {revealed} / {total} revealed
      </p>
    </ActivityCard>
  );
};

const Affirmation = ({ text }: { text: string }) => (
  <div className="rounded-xl bg-bi-purple/8 border border-bi-purple/15 px-4 py-3 text-sm text-foreground leading-relaxed">
    💜 <span className="italic font-display">{text}</span>
  </div>
);

const Scenario = ({ emoji, title, desc }: { emoji: string; title?: string; desc: string }) => (
  <div className="flex gap-3 items-start rounded-xl bg-muted/40 p-3">
    <span className="text-lg flex-shrink-0">{emoji}</span>
    <div>
      {title && <p className="text-sm font-semibold text-foreground">{title}</p>}
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  </div>
);

function renderCard(
  index: number, 
  next: () => void, 
  handleFinish: () => void, 
  finished: boolean,
  navigate: (path: string) => void,
  setCurrent: (idx: number) => void,
  setFinished: (fin: boolean) => void,
  onShare: () => void
) {
  switch (index) {
    case 0:
      return (
        <ActivityCard
          eyebrow="Welcome"
          title="This Conversation Belongs to You"
          color="pink"
          button={{ label: "Let's begin →", onClick: next }}
          notice="If your home environment feels unsafe, please prioritise your safety above disclosure."
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Telling your family you are bisexual is one of the most personal decisions you can make. There is no right time, no perfect script, and no outcome you are obligated to produce. This activity is about helping you feel prepared — not pressured.
          </p>
          <Affirmation text="You decide who knows, when, and how." />
          <Affirmation text="Your safety and readiness come first." />
        </ActivityCard>
      );
    case 1:
      return (
        <BubbleCard
          eyebrow="Before You Decide"
          title="Questions Worth Sitting With First"
          color="purple"
          bubbles={[
            { emoji: "💭", text: "Do I feel emotionally ready, or am I doing this because I feel I should?", color: "purple" },
            { emoji: "🏠", text: "Is my living situation stable enough to handle a difficult response?", color: "pink" },
            { emoji: "💛", text: "Who in my family is most likely to be supportive — could I tell them first?", color: "blue" },
            { emoji: "🛡️", text: "What support do I have around me if the conversation is hard?", color: "purple" },
          ]}
        />
      );
    case 2:
      return (
        <ActivityCard
          eyebrow="Their Reactions"
          title="Reactions You Might Encounter"
          color="blue"
          notice="Their first reaction is rarely their final one. Give people a runway if you safely can."
        >
          <Scenario emoji="😶" title="Silence or withdrawal" desc="They may need time to process. Silence is not always rejection." />
          <Scenario emoji="😢" title="Upset or tears" desc="Often rooted in fear for you, not rejection of you." />
          <Scenario emoji="❓" title="Questions and confusion" desc={'"Are you sure?" is frustrating but often comes from love trying to understand.'} />
          <Scenario emoji="💛" title="Immediate acceptance" desc="This happens more often than fear tells you it will." />
        </ActivityCard>
      );
    case 3:
      return (
        <ActivityCard eyebrow="Breathe" title="Ground Yourself Before the Conversation" color="pink">
          <BreathingOrb />
        </ActivityCard>
      );
    case 4:
      return (
        <BubbleCard
          eyebrow="What to Say"
          title="Words That Might Help"
          color="purple"
          bubbles={[
            { emoji: "💬", text: "\"There is something I want to share with you because I trust you.\"", subtext: "A soft opening that frames it as connection.", color: "purple" },
            { emoji: "💬", text: "\"I am bisexual. This is not new — I have known for a while.\"", subtext: "Clear, grounded, removes the idea it is a sudden decision.", color: "pink" },
            { emoji: "💬", text: "\"I am not asking you to understand everything right now. I just wanted you to know.\"", subtext: "Reduces the pressure on both sides.", color: "blue" },
            { emoji: "💬", text: "\"I am still the same person. This is just one more true thing about me.\"", subtext: "Anchors continuity.", color: "purple" },
          ]}
        />
      );
    case 5:
      return (
        <BubbleCard
          eyebrow="Hard Pushback"
          title="When They Say the Difficult Things"
          color="blue"
          bubbles={[
            { emoji: "❌", text: "\"It is just a phase\"", subtext: "→ \"I understand it might seem that way. It does not feel like a phase to me.\"", color: "pink" },
            { emoji: "❌", text: "\"You just have not met the right person\"", subtext: "→ \"My identity is not about who I have or have not met.\"", color: "purple" },
            { emoji: "❌", text: "\"Why do you need to label yourself?\"", subtext: "→ \"The label helps me understand myself. It is not for anyone else.\"", color: "blue" },
            { emoji: "❌", text: "\"Are you sure?\"", subtext: "→ \"Yes. I have been thinking about this for a long time.\"", color: "pink" },
          ]}
        />
      );
    case 6:
      return (
        <BubbleCard
          eyebrow="Give It Time"
          title="The First Conversation Is Rarely the Last"
          color="pink"
          bubbles={[
            { emoji: "🌱", text: "Many families need weeks or months to adjust — that is not the same as rejection.", color: "purple" },
            { emoji: "📖", text: "Sharing resources (books, articles, support groups) can help family members who want to understand.", color: "blue" },
            { emoji: "💛", text: "Small signs of adjustment — using the right language, asking questions — are worth noticing.", color: "pink" },
            { emoji: "🤝", text: "You are allowed to set the pace of further conversations.", color: "purple" },
          ]}
        />
      );
    case 7:
      return (
        <ActivityCard eyebrow="If It Goes Badly" title="You Will Get Through This" color="purple">
          <p className="text-sm leading-relaxed text-muted-foreground">
            A difficult response from family is painful and you are allowed to feel that fully. It is not proof that coming out was wrong. It is proof that some people need more time — and that you were brave enough to be honest anyway.
          </p>
          <Affirmation text="A hard reaction does not cancel a true identity." />
          <Affirmation text="You are allowed to grieve the response you needed and did not get." />
          <Affirmation text="There are people who will receive this with the love it deserves." />
        </ActivityCard>
      );
    case 8:
      return (
        <ActivityCard eyebrow="Chosen Family" title="Family Is Not Only the One You Were Born Into" color="blue">
          <Scenario emoji="👥" desc="Friends, partners, mentors, community — chosen family is real family." />
          <Scenario emoji="🏳️‍🌈" desc="Bisexual and LGBTQ+ communities offer belonging that does not depend on blood." />
          <Scenario emoji="💛" desc="The people who show up for you fully are your people, regardless of how you are related." />
        </ActivityCard>
      );
    case 9:
      return (
        <ActivityCard
          eyebrow="Carry This"
          title="You Were Brave Enough to Be Known"
          color="pink"
          button={finished ? undefined : { label: "Finish ✨", onClick: handleFinish }}
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            Whether the conversation has happened, is coming, or is still years away — the act of knowing yourself and deciding to be known is one of the most courageous things a person can do.
          </p>
          <Affirmation text="I shared my truth on my own terms." />
          <Affirmation text="I do not need perfect acceptance to have a valid identity." />
          <Affirmation text="I am bisexual, I am loved, and I belong." />
          {finished && (
            <div className="space-y-4 pt-4 text-center">
              <button
                onClick={onShare}
                className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
              >
                <Share2 size={16} />
                <span>Share</span>
              </button>
              
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => { setFinished(false); setCurrent(0); }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-foreground bg-secondary transition-opacity hover:opacity-80 flex-1"
                >
                  Start Over
                </button>
                 <button
                  onClick={() => {
                    window.parent.postMessage("exit_activity", "*");
                    window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
                  }}
                  className="px-6 py-2.5 rounded-full text-sm font-semibold text-white transition-opacity hover:opacity-80 flex-1"
                  style={{ background: "linear-gradient(135deg, #d1006c, #6b35b8, #0050a0)" }}
                >
                  Back to Hub
                </button>
              </div>
            </div>
          )}
        </ActivityCard>
      );
    default:
      return null;
  }
}

export default CardDeck;
