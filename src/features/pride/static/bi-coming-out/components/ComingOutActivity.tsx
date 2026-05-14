import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Share2 } from "lucide-react";
import { ShareModal } from "@/components/pride/ShareModal";
import confetti from "canvas-confetti";
import TapToRevealBubble from "./TapToRevealBubble";

const BAND_COLORS = ["bi-pink", "bi-purple", "bi-blue", "bi-pink", "bi-purple", "bi-blue", "bi-pink", "bi-purple", "bi-blue", "bi-pink"];

interface CardData {
  eyebrow: string;
  title: string;
  content: React.ReactNode;
}

function RevealCard({ bubbles, onRevealCount }: { bubbles: { icon: string; text: string; color: "pink" | "purple" | "blue" }[]; onRevealCount?: (count: number, total: number) => void }) {
  const [revealed, setRevealed] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const handleReveal = useCallback(() => {
    const next = revealed + 1;
    setRevealed(next);
    setHasStarted(true);
    onRevealCount?.(next, bubbles.length);
  }, [revealed, bubbles.length, onRevealCount]);

  return (
    <div className="space-y-3">
      {!hasStarted && (
        <p className="text-center text-sm text-muted-foreground animate-pulse-hint font-body">
          👆 Tap each bubble to reveal
        </p>
      )}
      {bubbles.map((b, i) => (
        <TapToRevealBubble key={i} icon={b.icon} text={b.text} color={b.color} onReveal={handleReveal} />
      ))}
      {revealed < bubbles.length && (
        <p className="text-center text-xs text-muted-foreground font-body mt-2">
          {revealed} / {bubbles.length} revealed
        </p>
      )}
    </div>
  );
}

function useCards(): CardData[] {
  return [
    // Card 1 - Welcome
    {
      eyebrow: "Welcome",
      title: "Coming Out Is Yours to Control",
      content: (
        <div className="space-y-4">
          <p className="font-body text-sm leading-relaxed">
            Coming out as bisexual is not a single moment. It is a series of individual decisions — each one yours to make, on your timeline, to the people you choose.
          </p>
          <p className="font-body text-sm leading-relaxed">
            This activity will help you think through the different scenarios, find words that feel like yours, and prepare for the responses you might receive.
          </p>
          <div className="space-y-2 mt-4">
            <div className="rounded-xl bg-bi-purple/10 p-3 border border-bi-purple/20">
              <p className="font-body text-sm italic text-foreground">"There is no deadline for coming out."</p>
            </div>
            <div className="rounded-xl bg-bi-pink/10 p-3 border border-bi-pink/20">
              <p className="font-body text-sm italic text-foreground">"You choose who knows, when, and how."</p>
            </div>
          </div>
          <div className="rounded-xl bg-bi-blue/10 p-3 border border-bi-blue/20 mt-3">
            <p className="font-body text-xs text-muted-foreground">⚠️ If your current environment feels unsafe, your safety always comes first.</p>
          </div>
        </div>
      ),
    },
    // Card 2 - Before You Come Out
    {
      eyebrow: "Before You Come Out",
      title: "Questions Worth Asking Yourself First",
      content: (
        <RevealCard bubbles={[
          { icon: "💭", text: "Why do I want to come out to this person — connection, relief, honesty?", color: "purple" },
          { icon: "🛡️", text: "Is my situation stable enough to handle a difficult response right now?", color: "blue" },
          { icon: "💛", text: "Who is the safest person to tell first — to practice, to feel less alone?", color: "pink" },
          { icon: "🔑", text: "What do I need from this conversation — acknowledgement, support, just to be known?", color: "purple" },
        ]} />
      ),
    },
    // Card 3 - Coming Out to a Friend
    {
      eyebrow: "Coming Out to a Friend",
      title: "Starting With Someone You Trust",
      content: (
        <div className="space-y-4">
          <p className="font-body text-sm leading-relaxed">
            Friends are often the first and safest place to come out. They are chosen rather than assigned, and good friendships tend to have the flexibility to hold new information.
          </p>
          <div className="space-y-3">
            <div className="rounded-xl bg-bi-pink/10 p-3 border border-bi-pink/20">
              <p className="font-body text-sm">💬 Starting casually — <em className="font-display italic">"There is something I have wanted to tell you. I am bisexual."</em> Simple. Direct. No build-up required.</p>
            </div>
            <div className="rounded-xl bg-bi-purple/10 p-3 border border-bi-purple/20">
              <p className="font-body text-sm">💬 In the middle of a conversation — <em className="font-display italic">"Actually, that is relevant to something about me — I am bi."</em></p>
            </div>
            <div className="rounded-xl bg-bi-blue/10 p-3 border border-bi-blue/20">
              <p className="font-body text-sm">💬 Via message if in-person feels too much — A text or voice note is a completely valid way to come out to a friend.</p>
            </div>
          </div>
          <div className="rounded-xl bg-muted p-3 mt-2">
            <p className="font-body text-xs text-muted-foreground italic">"A friend who reacts badly to this information was not the friend you thought they were. That is their loss."</p>
          </div>
        </div>
      ),
    },
    // Card 4 - Coming Out to a Partner
    {
      eyebrow: "Coming Out to a Partner",
      title: "Telling Someone You Are Already With",
      content: (
        <RevealCard bubbles={[
          { icon: "💬", text: "I want to share something with you that I have not said before. I am bisexual. This does not change how I feel about you or our relationship.", color: "pink" },
          { icon: "❓", text: "If they ask: does that mean you want to be with someone else? — 'Being bisexual means I am attracted to more than one gender. It does not mean I am less committed. Those are different things.'", color: "purple" },
          { icon: "❓", text: "If they ask: why are you telling me now? — 'Because I want you to know all of me. And this is part of me.'", color: "blue" },
          { icon: "💛", text: "A partner who treats your bisexuality as a problem to manage rather than a fact to accept is showing you something important about the relationship.", color: "pink" },
        ]} />
      ),
    },
    // Card 5 - Handling Doubt
    {
      eyebrow: "Handling Doubt",
      title: "When They Question Whether It Is Real",
      content: (
        <RevealCard bubbles={[
          { icon: "❌", text: '"Are you sure you are not just gay?" → "I am sure I am bisexual. Those are different things."', color: "pink" },
          { icon: "❌", text: '"Is this just a phase?" → "I have felt this way for a long time. It does not feel like a phase."', color: "purple" },
          { icon: "❌", text: '"But you have only dated one gender" → "Orientation is about attraction, not relationship history."', color: "blue" },
          { icon: "❌", text: '"Why do you need to label it?" → "Because the label is accurate and it helps me understand myself."', color: "purple" },
        ]} />
      ),
    },
    // Card 6 - Coming Out at Work
    {
      eyebrow: "Coming Out at Work",
      title: "Navigating Professional Spaces",
      content: (
        <RevealCard bubbles={[
          { icon: "🏢", text: "You are never obligated to come out at work. Your identity is yours, not your employer's.", color: "blue" },
          { icon: "👥", text: "If you choose to, starting with one trusted colleague is safer than a broad announcement.", color: "purple" },
          { icon: "🔍", text: "Check whether your workplace has LGBTQ+ policies or an employee network before disclosing.", color: "pink" },
          { icon: "💬", text: "If challenged: 'I am bisexual. I mentioned it because it came up, not because it requires a discussion.'", color: "blue" },
        ]} />
      ),
    },
    // Card 7 - Coming Out Online
    {
      eyebrow: "Coming Out Online",
      title: "If You Want to Be Publicly Out",
      content: (
        <RevealCard bubbles={[
          { icon: "📱", text: "A social media post can reach everyone at once — useful if you are tired of individual conversations.", color: "pink" },
          { icon: "💬", text: "You do not owe anyone an explanation in the comments. 'Thanks' is a complete response.", color: "purple" },
          { icon: "🛡️", text: "You can limit who sees it, or post to a close friends list first.", color: "blue" },
          { icon: "✨", text: "Being publicly bi matters — visibility helps every bisexual person who sees it and feels less alone.", color: "pink" },
        ]} />
      ),
    },
    // Card 8 - If It Goes Wrong
    {
      eyebrow: "If It Goes Wrong",
      title: "When the Response Is Not What You Needed",
      content: (
        <RevealCard bubbles={[
          { icon: "💔", text: "A bad reaction is painful and you are allowed to feel that fully — grief, anger, disappointment.", color: "pink" },
          { icon: "🌱", text: "First reactions are rarely final ones. People who love you often need time to catch up.", color: "purple" },
          { icon: "🤝", text: "You are allowed to step back from the conversation and return to it when you are ready.", color: "blue" },
          { icon: "💛", text: "Their inability to receive this well says nothing about the validity of your identity.", color: "purple" },
        ]} />
      ),
    },
    // Card 9 - You Are Not Alone
    {
      eyebrow: "You Are Not Alone",
      title: "Others Have Walked This Exact Path",
      content: (
        <div className="space-y-4">
          <div className="rounded-2xl bg-gradient-to-r from-bi-pink/10 via-bi-purple/10 to-bi-blue/10 p-4 border border-bi-purple/20">
            <p className="font-display italic text-sm leading-relaxed text-foreground">
              "I came out to my best friend first. She was quiet for a second and then said: thank you for telling me. That was it. I had been preparing for something enormous and instead I got exactly what I needed — someone who just received it."
            </p>
            <p className="font-body text-xs text-muted-foreground mt-2">— Community member</p>
          </div>
          <p className="font-body text-sm leading-relaxed">
            Millions of bisexual people have had this conversation, in all its forms — easy and hard, early and late, to people who showed up and people who did not.
          </p>
          <p className="font-body text-sm leading-relaxed">
            You are part of that community, whether or not it always feels that way.
          </p>
        </div>
      ),
    },
    // Card 10 - Carry This
    {
      eyebrow: "Carry This",
      title: "You Were Brave Enough to Be Known",
      content: (
        <div className="space-y-4">
          <p className="font-body text-sm leading-relaxed">
            Every time you come out, in any context, to any person, you are choosing honesty over performance. That is not a small thing. It is one of the most courageous acts available to a person.
          </p>
          <div className="space-y-2 mt-4">
            <div className="rounded-xl bg-bi-pink/10 p-3 border border-bi-pink/20">
              <p className="font-body text-sm italic">"I come out on my own terms, in my own time."</p>
            </div>
            <div className="rounded-xl bg-bi-purple/10 p-3 border border-bi-purple/20">
              <p className="font-body text-sm italic">"I do not need a perfect response to have made the right choice."</p>
            </div>
            <div className="rounded-xl bg-bi-blue/10 p-3 border border-bi-blue/20">
              <p className="font-body text-sm italic">"I am bisexual. I am real. I belong."</p>
            </div>
          </div>
        </div>
      ),
    },
  ];
}

export default function ComingOutActivity() {
  const navigate = useNavigate();
  const [currentCard, setCurrentCard] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const cards = useCards();
  const total = cards.length;

  const goNext = useCallback(() => {
    if (isAnimating) return;
    if (currentCard >= total - 1) {
      // Final card - finish
      setFinished(true);
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#d1006c", "#6b35b8", "#0050a0", "#ffffff"],
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { x: 0.3, y: 0.5 },
          colors: ["#d1006c", "#6b35b8", "#0050a0"],
        });
      }, 300);
      return;
    }
    setDirection("left");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCard((c) => c + 1);
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [currentCard, total, isAnimating]);

  const goPrev = useCallback(() => {
    if (isAnimating || currentCard === 0) return;
    setDirection("right");
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentCard((c) => c - 1);
      setDirection(null);
      setIsAnimating(false);
    }, 300);
  }, [currentCard, isAnimating]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
  };

  const bandColor = BAND_COLORS[currentCard];
  const progress = ((currentCard + 1) / total) * 100;
  const isLastCard = currentCard === total - 1;

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: "#fdf8ff" }}>
        {/* Orbs */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-bi-pink/20 blur-3xl animate-float-orb" />
          <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-bi-purple/20 blur-3xl animate-float-orb-2" />
          <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-bi-blue/20 blur-3xl animate-float-orb-3" />
        </div>

        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => navigate('/lgbtq-hub' + window.location.search)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-purple-600 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back to Hub
          </button>
        </div>

        <div className="relative z-10 text-center space-y-6 max-w-sm">
          <p className="text-5xl">🎉</p>
          <h2 className="font-display text-2xl text-foreground">You did it.</h2>
          <p className="font-body text-sm text-muted-foreground leading-relaxed">
            You showed up for yourself today. Whatever comes next, remember: you are bisexual, you are real, and you belong.
          </p>
          <div className="flex flex-col gap-3 justify-center w-full">
            <button
              onClick={() => setIsShareOpen(true)}
              className="flex items-center justify-center gap-2 px-6 py-2.5 mx-auto rounded-full border border-purple-200 bg-purple-50/50 text-purple-600 hover:bg-purple-100/50 transition-all text-sm font-bold shadow-sm mb-2"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => { setFinished(false); setCurrentCard(0); }}
                className="font-body text-sm text-foreground bg-secondary px-6 py-2.5 rounded-full hover:opacity-70 transition-opacity flex-1"
              >
                Start again
              </button>
              <button
                onClick={() => {
                  window.parent.postMessage("exit_activity", "*");
                  window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
                }}
                className="font-body text-sm text-white bg-bi-purple px-6 py-2.5 rounded-full hover:opacity-70 transition-opacity flex-1"
              >
                Back to Hub
              </button>
            </div>
          </div>

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)} 
            title="Share This Journey"
          />
        </div>
      </div>
    );
  }

  const card = cards[currentCard];

  return (
    <div className="min-h-screen flex flex-col items-center p-4 pt-8 pb-8" style={{ backgroundColor: "#fdf8ff" }}>
      {/* Floating orbs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-bi-pink/20 blur-3xl animate-float-orb" />
        <div className="absolute top-1/2 right-1/4 w-72 h-72 rounded-full bg-bi-purple/20 blur-3xl animate-float-orb-2" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-bi-blue/20 blur-3xl animate-float-orb-3" />
      </div>

      <div className="w-full max-w-[440px] px-4 pt-4 mb-6 relative z-50">
        <button
          onClick={() => navigate('/lgbtq-hub' + window.location.search)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-purple-600 transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back to Hub
        </button>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-full max-w-[440px] mb-6">
        <div className="h-1 rounded-full bg-muted overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #d1006c, #6b35b8, #0050a0)",
            }}
          />
        </div>
        <p className="text-xs text-muted-foreground font-body text-right mt-1">
          {currentCard + 1} / {total}
        </p>
      </div>

      {/* Card stack area */}
      <div
        className="relative z-10 w-full max-w-[440px] flex-1 flex items-start justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >

        {/* Active card */}
        <div
          className={`w-full rounded-[28px] overflow-hidden transition-all duration-300 ease-out ${
            direction === "left" ? "translate-x-[-120%] opacity-0" :
            direction === "right" ? "translate-x-[120%] opacity-0" : "translate-x-0 opacity-100"
          }`}
          style={{
            backgroundColor: "rgba(255,255,255,0.88)",
            boxShadow: "0 8px 40px -8px rgba(107, 53, 184, 0.12)",
          }}
        >
          {/* Top band */}
          <div className={`h-1.5 bg-${bandColor}`} />

          <div className="p-6 space-y-4">
            {/* Eyebrow */}
            <span className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {card.eyebrow}
            </span>

            {/* Title */}
            <h1 className="font-display text-2xl leading-tight text-foreground">
              {card.title}
            </h1>

            {/* Content */}
            <div className="mt-2">{card.content}</div>

            {/* Navigation */}
            <div className="flex items-center gap-3 pt-4">
              {currentCard > 0 && (
                <button
                  onClick={goPrev}
                  className="font-body text-sm text-muted-foreground hover:opacity-70 transition-opacity px-4 py-2"
                >
                  ← Back
                </button>
              )}
              <button
                onClick={goNext}
                className={`flex-1 font-body text-sm font-semibold py-3 px-6 rounded-full transition-opacity hover:opacity-80 text-primary-foreground ${
                  isLastCard
                    ? "bg-gradient-to-r from-bi-pink via-bi-purple to-bi-blue"
                    : "bg-bi-purple"
                }`}
              >
                {isLastCard ? "Finish ✨" : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
