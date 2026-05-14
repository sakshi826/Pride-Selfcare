import { useState, useCallback, useRef } from 'react';
import { ChevronLeft, Share2 } from 'lucide-react';
import { ShareModal } from "@/components/pride/ShareModal";
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { cards } from '../../data/cardContent';
import FloatingOrbs from '../../components/activity/FloatingOrbs';
import ProgressBar from '../../components/activity/ProgressBar';
import ActivityCard from '../../components/activity/ActivityCard';

import { PrideActivityHeader } from "@/features/pride/components/PrideActivityHeader";

const BiActivity = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const touchStartX = useRef(0);

  const fireConfetti = useCallback(() => {
    const biColors = ['#d1006c', '#6b35b8', '#0050a0'];
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: biColors });
    setTimeout(() => {
      confetti({ particleCount: 60, spread: 90, origin: { y: 0.5 }, colors: biColors });
    }, 200);
  }, []);

  const goNext = useCallback(() => {
    if (currentIndex >= cards.length - 1) {
      setFinished(true);
      fireConfetti();
      return;
    }
    setCurrentIndex(i => i + 1);
  }, [currentIndex, fireConfetti]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 60) goNext();
  };

  if (finished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-start px-4 py-8" style={{ background: '#fdf8ff' }}>
        <FloatingOrbs />
        <div className="w-full max-w-md mb-8">
          <PrideActivityHeader title="Activity Complete" />
        </div>

        <div className="text-center relative z-10 animate-card-enter flex-1 flex flex-col justify-center">
          <h1 className="font-display text-3xl sm:text-4xl text-foreground mb-4" style={{ lineHeight: 1.1 }}>
            You are enough.
          </h1>
          <p className="font-body text-muted-foreground text-base max-w-xs mx-auto mb-8">
            Carry this with you. Come back whenever the doubt returns.
          </p>
          <button
            onClick={() => { setCurrentIndex(0); setFinished(false); }}
            className="btn-secondary w-full"
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
              window.location.href = "/pride/lgbtq-hub" + window.location.search + window.location.search;
            }}
            className="btn-primary w-full"
          >
            Back to Hub
          </button>

          <ShareModal 
            isOpen={isShareOpen} 
            onClose={() => setIsShareOpen(false)} 
            title="Share These Affirmations"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start px-4 py-8"
      style={{ background: '#fdf8ff' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <FloatingOrbs />

      <div className="w-full max-w-md mb-8">
        <PrideActivityHeader 
          title="Identity Affirmations" 
          onBack={currentIndex > 0 ? () => setCurrentIndex(currentIndex - 1) : undefined}
        />
      </div>

      <div className="relative z-10 w-full max-w-[440px] flex-1 flex flex-col justify-center">
        {/* Progress */}
        <div className="mb-6 px-1">
          <ProgressBar current={currentIndex} total={cards.length} />
          <p className="font-body text-xs text-muted-foreground/60 mt-2 text-center">
            {currentIndex + 1} of {cards.length}
          </p>
        </div>

        {/* Card stack */}
        <div className="relative">
          {/* Behind cards */}
          {currentIndex < cards.length - 1 && (
            <div
              className="absolute inset-x-3 top-3 h-full rounded-[28px] bg-foreground/[0.02]"
              style={{
                boxShadow: '0 4px 20px -8px hsl(270 30% 40% / 0.06)',
                transform: 'scale(0.95)',
              }}
            />
          )}
          {currentIndex < cards.length - 2 && (
            <div
              className="absolute inset-x-6 top-5 h-full rounded-[28px] bg-foreground/[0.01]"
              style={{
                boxShadow: '0 2px 12px -6px hsl(270 30% 40% / 0.04)',
                transform: 'scale(0.9)',
              }}
            />
          )}

          {/* Active card */}
          <div
            key={currentIndex}
            className="relative rounded-[28px] overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.88)',
              boxShadow: 'var(--card-shadow)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <ActivityCard
              card={cards[currentIndex]}
              isLast={currentIndex === cards.length - 1}
              onNext={goNext}
            />
          </div>
        </div>

        {/* Swipe hint */}
        <p className="font-body text-[0.7rem] text-muted-foreground/40 text-center mt-4">
          Swipe left or tap the button to continue
        </p>
      </div>
    </div>
  );
};

export default BiActivity;
