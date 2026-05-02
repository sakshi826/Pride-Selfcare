import { useState, useCallback, ReactNode } from "react";
import { ChevronLeft } from "lucide-react";
import confetti from "canvas-confetti";
import FloatingOrbs from "../components/FloatingOrbs";
import ProgressBar from "../components/ProgressBar";
import ActivityCard from "../components/ActivityCard";
import TapToRevealBubble from "../components/TapToRevealBubble";

const TOTAL_CARDS = 10;

interface CardData {
  eyebrow: string;
  title: string;
  bandColor: "blue" | "pink";
  buttonText: string;
  content: (onNext: () => void, handleReveal: (idx: number) => void, revealedCounts: Record<number, number>, hasEverTapped: boolean) => ReactNode;
}

const cardData: CardData[] = [
  {
    eyebrow: "Welcome",
    title: "Coming Out Is Yours to Control",
    bandColor: "blue",
    buttonText: "Begin →",
    content: () => (
      <>
        <p>Coming out as trans is one of the most personal decisions a person can make. There is no correct order, no deadline, and no single right way to do it.</p>
        <p>Some people come out to everyone at once. Some people tell one person at a time over years. Both are valid.</p>
        <p>This activity is about helping you feel prepared, not pressured.</p>
        <div className="space-y-2 mt-3 p-3 rounded-2xl bg-accent/50">
          <p className="font-display italic text-foreground">"You decide who knows, when, and how."</p>
          <p className="font-display italic text-foreground">"Your name and your identity are yours regardless of who knows them yet."</p>
        </div>
        <div className="mt-3 p-3 rounded-2xl bg-trans-pink/10 border border-trans-pink/20">
          <p className="text-xs">⚠️ If your current environment feels unsafe, your safety always comes first. Coming out can wait. You cannot.</p>
        </div>
      </>
    ),
  },
  {
    eyebrow: "Before You Come Out",
    title: "Questions Worth Sitting With First",
    bandColor: "pink",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="💭" text="Am I coming out because I am ready, or because I feel I should be?" color="blue" onReveal={() => handleReveal(1)} />
          <TapToRevealBubble icon="🏠" text="Is my living situation stable enough to handle a difficult response right now?" color="pink" onReveal={() => handleReveal(1)} />
          <TapToRevealBubble icon="💛" text="Who is the one person most likely to receive this well — could I tell them first?" color="blue" onReveal={() => handleReveal(1)} />
          <TapToRevealBubble icon="🛡️" text="What support do I have around me if the conversation is hard?" color="pink" onReveal={() => handleReveal(1)} />
        </div>
        <RevealHint cardIdx={1} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "Name and Pronouns",
    title: "Starting With the Simplest Truth",
    bandColor: "blue",
    buttonText: "Continue →",
    content: () => (
      <>
        <p>For many trans people, asking to be called by a different name and different pronouns is the first step — before any wider coming out, before any medical steps, before anything else.</p>
        <p>It is also one of the most significant things another person can do for you.</p>
        <div className="space-y-3 mt-2">
          <div className="p-3 rounded-2xl bg-trans-blue/10 border border-trans-blue/20">
            <p className="text-sm">💬 <strong>To a close friend:</strong> "I have been thinking about this for a while and I would like you to call me [name] and use [pronouns]. I will explain more when I am ready but for now that is the most important thing."</p>
          </div>
          <div className="p-3 rounded-2xl bg-trans-pink/10 border border-trans-pink/20">
            <p className="text-sm">💬 <strong>Via message:</strong> "There is something I want to tell you. I am trans and my name is [name] and my pronouns are [pronouns]. I would love to talk when you are ready."</p>
          </div>
          <div className="p-3 rounded-2xl bg-trans-blue/10 border border-trans-blue/20">
            <p className="text-sm">💬 <strong>If they get it wrong:</strong> "Just [name], thanks" — said simply, without drama, as many times as it takes.</p>
          </div>
        </div>
      </>
    ),
  },
  {
    eyebrow: "Coming Out to Family",
    title: "The Hardest Conversation",
    bandColor: "pink",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="💬" text="I want to share something important with you. I am trans. My name is [name] and I use [pronouns]. I have known for a long time and I am telling you because I trust you and I want you to know me." color="blue" onReveal={() => handleReveal(3)} />
          <TapToRevealBubble icon="❓" text={`If they ask: are you sure? — "I have been thinking about this for a long time. Yes, I am sure."`} color="pink" onReveal={() => handleReveal(3)} />
          <TapToRevealBubble icon="❓" text={`If they ask: is this our fault? — "Being trans is not caused by anything you did. It is just who I am."`} color="blue" onReveal={() => handleReveal(3)} />
          <TapToRevealBubble icon="💛" text={`If they need time — "I understand this is a lot. I am not going anywhere. Take the time you need."`} color="pink" onReveal={() => handleReveal(3)} />
        </div>
        <RevealHint cardIdx={3} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "Handling Hard Reactions",
    title: "When the Response Is Not What You Needed",
    bandColor: "blue",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="❌" text={`"This is just a phase" → "I have felt this way for a long time. It does not feel like a phase to me."`} color="pink" onReveal={() => handleReveal(4)} />
          <TapToRevealBubble icon="❌" text={`"You will always be [deadname] to me" → "I understand this is new for you. My name is [name] and I would really like you to use it."`} color="blue" onReveal={() => handleReveal(4)} />
          <TapToRevealBubble icon="❌" text={`"I need more time" → "I can give you time. While you take it, please try to use my name and pronouns."`} color="pink" onReveal={() => handleReveal(4)} />
          <TapToRevealBubble icon="❌" text={`"Why are you doing this to us?" → "I am not doing this to anyone. I am being honest about who I am."`} color="blue" onReveal={() => handleReveal(4)} />
        </div>
        <RevealHint cardIdx={4} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "Coming Out at School",
    title: "Navigating Education",
    bandColor: "pink",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="🏫" text="You have the right to be addressed by your name and pronouns in most educational settings." color="blue" onReveal={() => handleReveal(5)} />
          <TapToRevealBubble icon="👥" text="Telling one trusted teacher first can help establish support before a wider conversation." color="pink" onReveal={() => handleReveal(5)} />
          <TapToRevealBubble icon="📋" text="Ask whether your school has a trans inclusion policy — many do, and it gives you a framework." color="blue" onReveal={() => handleReveal(5)} />
          <TapToRevealBubble icon="💬" text={`If a teacher gets it wrong: "Just [name], please" — calm, direct, repeated as needed.`} color="pink" onReveal={() => handleReveal(5)} />
        </div>
        <RevealHint cardIdx={5} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "Coming Out at Work",
    title: "Professional Spaces",
    bandColor: "blue",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="🏢" text="You are never obligated to come out at work. Your identity is yours, not your employer's." color="pink" onReveal={() => handleReveal(6)} />
          <TapToRevealBubble icon="📋" text="Check whether your workplace has trans inclusion or equality policies before disclosing." color="blue" onReveal={() => handleReveal(6)} />
          <TapToRevealBubble icon="👥" text="Telling HR or a trusted manager first can help manage the wider transition practically." color="pink" onReveal={() => handleReveal(6)} />
          <TapToRevealBubble icon="💬" text={`A simple announcement email, if you choose: "From [date] I will be going by [name] and [pronouns]. I am happy to answer questions from people I know well."`} color="blue" onReveal={() => handleReveal(6)} />
        </div>
        <RevealHint cardIdx={6} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "Social Transition",
    title: "The Everyday Coming Out",
    bandColor: "pink",
    buttonText: "Continue →",
    content: (_onNext, handleReveal, revealedCounts, hasEverTapped) => (
      <>
        <div className="space-y-3">
          <TapToRevealBubble icon="🪞" text="Updating your name on social media, email, and documents is a form of coming out that happens gradually." color="blue" onReveal={() => handleReveal(7)} />
          <TapToRevealBubble icon="👥" text="You do not have to correct every stranger. Choose your energy." color="pink" onReveal={() => handleReveal(7)} />
          <TapToRevealBubble icon="💬" text={`To a new acquaintance: "I am [name], I use [pronouns]" — said simply, as a fact, requiring nothing further.`} color="blue" onReveal={() => handleReveal(7)} />
          <TapToRevealBubble icon="✨" text="Every time you introduce yourself correctly you are practising being fully yourself." color="pink" onReveal={() => handleReveal(7)} />
        </div>
        <RevealHint cardIdx={7} total={4} revealedCounts={revealedCounts} hasEverTapped={hasEverTapped} />
      </>
    ),
  },
  {
    eyebrow: "You Are Not Alone",
    title: "Others Have Walked This Exact Path",
    bandColor: "blue",
    buttonText: "Continue →",
    content: () => (
      <>
        <div className="p-4 rounded-2xl bg-accent/50 border-l-4 border-trans-blue">
          <p className="font-display italic text-foreground text-sm leading-relaxed">
            "I came out to my best friend in a text message because I could not say it out loud. She called me immediately and said my name back to me three times. I think she knew I needed to hear it. I had never felt so known."
          </p>
          <p className="text-xs text-muted-foreground mt-2">— Community member</p>
        </div>
        <p>Millions of trans people have had this conversation, in every possible form — terrifying and gentle, planned and accidental, to people who showed up and people who did not.</p>
        <p>You are part of that community whether or not it feels that way yet.</p>
      </>
    ),
  },
  {
    eyebrow: "Carry This",
    title: "You Were Brave Enough to Be Known",
    bandColor: "pink",
    buttonText: "Finish ✨",
    content: () => (
      <>
        <p>Every time you come out — to one person or to many, in words or in the simple act of living as yourself — you are choosing honesty over performance.</p>
        <p>That is not a small thing. It is one of the most significant choices available to a person.</p>
        <div className="space-y-2 mt-3 p-3 rounded-2xl bg-accent/50">
          <p className="font-display italic text-foreground">"I come out on my own terms, in my own time."</p>
          <p className="font-display italic text-foreground">"My name is real whether or not everyone knows it yet."</p>
          <p className="font-display italic text-foreground">"I am trans. I am allowed to be known."</p>
        </div>
      </>
    ),
  },
];

const RevealHint = ({ cardIdx, total, revealedCounts, hasEverTapped }: {
  cardIdx: number; total: number; revealedCounts: Record<number, number>; hasEverTapped: boolean;
}) => {
  const revealed = revealedCounts[cardIdx] || 0;
  return (
    <div className="space-y-1 mt-2">
      {!hasEverTapped && (
        <p className="text-xs text-center text-muted-foreground" style={{ animation: 'pulse-hint 2s ease-in-out infinite' }}>
          👆 Tap each bubble to reveal
        </p>
      )}
      <p className="text-xs text-center text-muted-foreground">
        {revealed} / {total} revealed
      </p>
    </div>
  );
};

const Index = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [revealedCounts, setRevealedCounts] = useState<Record<number, number>>({});
  const [hasEverTapped, setHasEverTapped] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleReveal = useCallback((cardIndex: number) => {
    if (!hasEverTapped) setHasEverTapped(true);
    setRevealedCounts((prev) => ({
      ...prev,
      [cardIndex]: (prev[cardIndex] || 0) + 1,
    }));
  }, [hasEverTapped]);

  const next = useCallback(() => {
    if (currentCard < TOTAL_CARDS - 1) {
      setCurrentCard((c) => c + 1);
    }
  }, [currentCard]);

  const prev = useCallback(() => {
    if (currentCard > 0) {
      setCurrentCard((c) => c - 1);
    }
  }, [currentCard]);

  const handleFinish = useCallback(() => {
    setFinished(true);
    const end = Date.now() + 2500;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#55cdfc', '#f7a8b8', '#ffffff'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#55cdfc', '#f7a8b8', '#ffffff'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const getButtonAction = (i: number) => {
    if (i === TOTAL_CARDS - 1) return handleFinish;
    return next;
  };

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4" style={{ backgroundColor: '#f8fff8' }}>
        <FloatingOrbs />
        
        <div className="absolute top-6 left-6 z-50">
          <button
            onClick={() => navigate('/lgbtq-hub')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
          >
            <ChevronLeft size={18} strokeWidth={2.5} />
            Back to Hub
          </button>
        </div>

        <div className="text-center z-10" style={{ animation: 'bubble-pop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }}>
          <h1 className="font-display text-3xl text-foreground mb-3">You did it. ✨</h1>
          <p className="font-body text-muted-foreground text-sm max-w-xs mx-auto mb-6">
            You are trans. You are allowed to be known. Come back to this whenever you need it.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => { setFinished(false); setCurrentCard(0); setRevealedCounts({}); setHasEverTapped(false); }}
              className="py-3 px-8 rounded-full font-body font-medium text-sm bg-secondary text-foreground hover:opacity-80 transition-opacity duration-200"
            >
              Start again
            </button>
            <button
              onClick={() => navigate('/lgbtq-hub')}
              className="py-3 px-8 rounded-full font-body font-medium text-sm bg-foreground text-background hover:opacity-80 transition-opacity duration-200"
            >
              Back to Hub
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center" style={{ backgroundColor: '#f8fff8' }}>
      <FloatingOrbs />

      <div className="w-full max-w-[440px] px-4 pt-6 relative z-50">
        <button
          onClick={() => navigate('/lgbtq-hub')}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-sm text-gray-500 font-bold text-sm shadow-sm hover:text-cyan-500 transition-all"
        >
          <ChevronLeft size={18} strokeWidth={2.5} />
          Back to Hub
        </button>
      </div>

      <div className="relative z-10 w-full max-w-[440px] flex flex-col min-h-screen">
        <ProgressBar current={currentCard} total={TOTAL_CARDS} />
        <div className="flex-1 px-4 pb-6">
          <div className="relative" style={{ minHeight: '400px' }}>
            {cardData.map((card, i) => {
              const stackIndex = i - currentCard;
              if (stackIndex < 0 || stackIndex > 2) return null;
              return (
                <ActivityCard
                  key={i}
                  eyebrow={card.eyebrow}
                  title={card.title}
                  bandColor={card.bandColor}
                  buttonText={card.buttonText}
                  onButtonClick={getButtonAction(i)}
                  onBack={i > 0 ? prev : undefined}
                  isActive={stackIndex === 0}
                  stackIndex={stackIndex}
                >
                  {card.content(next, handleReveal, revealedCounts, hasEverTapped)}
                </ActivityCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
