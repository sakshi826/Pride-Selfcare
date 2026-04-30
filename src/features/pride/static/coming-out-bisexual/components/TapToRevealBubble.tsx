import { useState } from "react";
import confetti from "canvas-confetti";

interface TapToRevealBubbleProps {
  icon: string;
  text: string;
  color: "pink" | "purple" | "blue";
  onReveal: () => void;
}

const colorMap = {
  pink: { bg: "bg-bi-pink/10", overlay: "bg-bi-pink", border: "border-bi-pink/20" },
  purple: { bg: "bg-bi-purple/10", overlay: "bg-bi-purple", border: "border-bi-purple/20" },
  blue: { bg: "bg-bi-blue/10", overlay: "bg-bi-blue", border: "border-bi-blue/20" },
};

export default function TapToRevealBubble({ icon, text, color, onReveal }: TapToRevealBubbleProps) {
  const [revealed, setRevealed] = useState(false);
  const colors = colorMap[color];

  const handleTap = (e: React.MouseEvent | React.TouchEvent) => {
    if (revealed) return;
    setRevealed(true);
    onReveal();

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : (e as React.TouchEvent).touches[0].clientX) / window.innerWidth;
    const y = ('clientY' in e ? e.clientY : (e as React.TouchEvent).touches[0].clientY) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 40,
      startVelocity: 15,
      origin: { x, y },
      colors: ["#d1006c", "#6b35b8", "#0050a0"],
      scalar: 0.6,
      gravity: 1.5,
      ticks: 40,
    });
  };

  return (
    <div
      onClick={handleTap}
      className={`relative rounded-2xl border ${colors.border} ${colors.bg} p-4 cursor-pointer select-none overflow-hidden transition-all duration-300`}
    >
      {/* Overlay */}
      {!revealed && (
        <div className={`absolute inset-0 ${colors.overlay} rounded-2xl flex items-center justify-center gap-2 transition-opacity duration-300`}>
          <span className="text-lg">👆</span>
          <span className="font-body text-sm font-medium text-primary-foreground">Tap to reveal</span>
        </div>
      )}

      {/* Content */}
      <div className={`transition-opacity duration-300 ${revealed ? "opacity-100 animate-bubble-pop" : "opacity-0"}`}>
        <span className="mr-2 text-lg">{icon}</span>
        <span className="font-body text-sm leading-relaxed text-foreground">{text}</span>
      </div>
    </div>
  );
}
