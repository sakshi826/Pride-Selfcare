import { useState } from "react";
import confetti from "canvas-confetti";

interface TapToRevealBubbleProps {
  icon: string;
  text: string;
  color: "blue" | "pink";
  onReveal: () => void;
}

const TapToRevealBubble = ({ icon, text, color, onReveal }: TapToRevealBubbleProps) => {
  const [revealed, setRevealed] = useState(false);

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    setRevealed(true);
    onReveal();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 50,
      startVelocity: 15,
      scalar: 0.6,
      origin: { x, y },
      colors: ['#55cdfc', '#f7a8b8', '#ffffff'],
      ticks: 60,
    });
  };

  const overlayBg = color === "blue"
    ? "bg-trans-blue/20 border-trans-blue/30"
    : "bg-trans-pink/20 border-trans-pink/30";

  return (
    <div
      className="relative cursor-pointer select-none"
      onClick={handleTap}
    >
      {/* Revealed content */}
      <div
        className={`rounded-2xl border border-border bg-card/80 p-4 transition-opacity duration-300 ${
          revealed ? "opacity-100 animate-bubble-pop" : "opacity-0"
        }`}
      >
        <p className="text-sm font-body text-card-foreground leading-relaxed">
          {icon} {text}
        </p>
      </div>

      {/* Overlay */}
      {!revealed && (
        <div
          className={`absolute inset-0 rounded-2xl border ${overlayBg} backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300`}
        >
          <span className="text-lg">{icon}</span>
          <span className="text-sm font-body font-medium text-foreground/70">Tap to reveal</span>
        </div>
      )}
    </div>
  );
};

export default TapToRevealBubble;
