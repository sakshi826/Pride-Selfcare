import { useEffect, useState } from "react";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const SparkleEffect = ({ active }: { active: boolean }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (!active) return;
    const emojis = ["✨", "⭐", "💫", "🌟"];
    const newSparkles: Sparkle[] = Array.from({ length: 6 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setSparkles(newSparkles);
    const timer = setTimeout(() => setSparkles([]), 1000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute sparkle-anim text-lg"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
        >
          {s.emoji}
        </span>
      ))}
    </div>
  );
};

export default SparkleEffect;
