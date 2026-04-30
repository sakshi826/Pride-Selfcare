import { useState, useEffect } from "react";

const steps = [
  "Breathe in — you are about to do something that takes real courage",
  "Breathe out — whatever happens, your identity is not up for debate",
  "You do not need their agreement to know who you are",
  "You are allowed to end the conversation if you need to",
];

const BreathingOrb = () => {
  const [step, setStep] = useState(0);
  const [expanding, setExpanding] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setExpanding((prev) => !prev);
      setStep((prev) => (prev + 1) % steps.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 py-4">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div
          className="absolute inset-0 rounded-full transition-all duration-[4000ms] ease-in-out"
          style={{
            background: `radial-gradient(circle, hsl(var(--bi-purple) / 0.3), hsl(var(--bi-pink) / 0.15), transparent)`,
            transform: expanding ? "scale(1.3)" : "scale(0.8)",
          }}
        />
        <div
          className="w-16 h-16 rounded-full transition-all duration-[4000ms] ease-in-out"
          style={{
            background: `linear-gradient(135deg, hsl(var(--bi-pink) / 0.6), hsl(var(--bi-purple) / 0.6), hsl(var(--bi-blue) / 0.6))`,
            transform: expanding ? "scale(1.4)" : "scale(1)",
          }}
        />
      </div>
      <p className="text-sm text-center text-muted-foreground italic leading-relaxed max-w-[280px] min-h-[3rem] transition-opacity duration-700">
        {steps[step]}
      </p>
    </div>
  );
};

export default BreathingOrb;
