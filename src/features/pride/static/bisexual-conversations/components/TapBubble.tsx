import { useState, useRef } from "react";
import confetti from "canvas-confetti";

interface TapBubbleProps {
  emoji: string;
  text: string;
  subtext?: string;
  color: "pink" | "purple" | "blue";
  onReveal: () => void;
}

const colorMap = {
  pink: { bg: "bg-bi-pink/10", overlay: "bg-bi-pink", border: "border-bi-pink/20" },
  purple: { bg: "bg-bi-purple/10", overlay: "bg-bi-purple", border: "border-bi-purple/20" },
  blue: { bg: "bg-bi-blue/10", overlay: "bg-bi-blue", border: "border-bi-blue/20" },
};

const TapBubble = ({ emoji, text, subtext, color, onReveal }: TapBubbleProps) => {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    setRevealed(true);
    onReveal();

    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const x = ("clientX" in e ? e.clientX : (e as React.TouchEvent).touches[0].clientX) / window.innerWidth;
      const y = ("clientY" in e ? e.clientY : (e as React.TouchEvent).touches[0].clientY) / window.innerHeight;
      confetti({
        particleCount: 20,
        spread: 40,
        startVelocity: 15,
        origin: { x, y },
        colors: ["#d1006c", "#6b35b8", "#0050a0"],
        scalar: 0.6,
        gravity: 1.5,
        ticks: 60,
      });
    }
  };

  const c = colorMap[color];

  return (
    <div
      ref={ref}
      onClick={handleTap}
      className={`relative overflow-hidden rounded-2xl border ${c.border} ${c.bg} p-4 cursor-pointer select-none transition-all duration-300`}
    >
      {/* Revealed content */}
      <div
        className={`transition-all duration-500 ${
          revealed ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="flex gap-3 items-start">
          <span className="text-lg flex-shrink-0 mt-0.5">{emoji}</span>
          <div>
            <p className="text-sm leading-relaxed text-foreground">{text}</p>
            {subtext && (
              <p className="text-xs text-muted-foreground mt-1.5 italic">{subtext}</p>
            )}
          </div>
        </div>
      </div>

      {/* Scratch overlay */}
      <div
        className={`absolute inset-0 ${c.overlay} flex items-center justify-center gap-2 rounded-2xl transition-all duration-500 ${
          revealed ? "opacity-0 pointer-events-none scale-105" : "opacity-90"
        }`}
      >
        <span className="text-lg">✨</span>
        <span className="text-sm font-medium text-primary-foreground tracking-wide">
          Tap to reveal
        </span>
      </div>
    </div>
  );
};

export default TapBubble;
