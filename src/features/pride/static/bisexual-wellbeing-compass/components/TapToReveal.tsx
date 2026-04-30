import { useState, useCallback } from "react";
import confetti from "canvas-confetti";

interface Bubble {
  icon?: string;
  text: string;
}

interface TapToRevealProps {
  bubbles: Bubble[];
}

const TapToReveal = ({ bubbles }: TapToRevealProps) => {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [hintVisible, setHintVisible] = useState(true);

  const handleReveal = useCallback(
    (index: number, e: React.MouseEvent | React.TouchEvent) => {
      if (revealed.has(index)) return;

      // Mini confetti from tap point
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;
      confetti({
        particleCount: 18,
        spread: 40,
        startVelocity: 15,
        origin: { x, y },
        colors: ["#d1006c", "#6b35b8", "#0050a0"],
        scalar: 0.6,
        ticks: 60,
      });

      setRevealed((prev) => new Set(prev).add(index));
      if (hintVisible) setHintVisible(false);
    },
    [revealed, hintVisible]
  );

  return (
    <div className="space-y-3">
      {hintVisible && (
        <p className="text-sm text-center text-muted-foreground animate-pulse-hint">
          👆 Tap each bubble to reveal
        </p>
      )}
      <p className="text-xs text-center text-muted-foreground font-body">
        {revealed.size} / {bubbles.length} revealed
      </p>
      <div className="space-y-2.5">
        {bubbles.map((bubble, i) => (
          <div
            key={i}
            className="relative rounded-2xl overflow-hidden cursor-pointer select-none"
            onClick={(e) => handleReveal(i, e)}
          >
            {/* Revealed content */}
            <div
              className={`p-4 bg-secondary rounded-2xl transition-opacity duration-300 ${
                revealed.has(i) ? "animate-bubble-pop" : "opacity-0 h-0 overflow-hidden"
              }`}
            >
              <span className="text-sm font-body leading-relaxed text-foreground">
                {bubble.icon && <>{bubble.icon} </>}{bubble.text}
              </span>
            </div>

            {/* Overlay */}
            {!revealed.has(i) && (
              <div
                className={`p-4 rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 ${
                  i % 3 === 0
                    ? "bg-bi-pink/15"
                    : i % 3 === 1
                    ? "bg-bi-purple/15"
                    : "bg-bi-blue/15"
                }`}
              >
                {bubble.icon && <span className="text-lg">{bubble.icon}</span>}
                <span className="text-sm font-body font-medium text-muted-foreground">
                  Tap to reveal
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TapToReveal;
