import { useState, useEffect, useRef } from "react";

const steps = [
  { label: "Breathe in", sub: "the weight you have been carrying has a name", phase: "in" },
  { label: "Breathe out", sub: "it is not a character flaw, it is a documented response to real pressure", phase: "out" },
  { label: "Breathe in", sub: "you did not create this", phase: "in" },
  { label: "Breathe out", sub: "you are allowed to put some of it down", phase: "out" },
];

const BreathingOrb = () => {
  const [step, setStep] = useState(0);
  const [active, setActive] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!active) return;
    timerRef.current = setTimeout(() => {
      setStep((s) => (s < steps.length - 1 ? s + 1 : s));
      if (step >= steps.length - 1) setActive(false);
    }, 4500);
    return () => clearTimeout(timerRef.current);
  }, [active, step]);

  const current = steps[step];
  const isIn = current.phase === "in";

  return (
    <div className="flex flex-col items-center gap-6">
      <div
        className="w-28 h-28 rounded-full cursor-pointer"
        style={{
          background: "linear-gradient(135deg, hsl(var(--bi-pink)), hsl(var(--bi-purple)), hsl(var(--bi-blue)))",
          animation: active
            ? isIn
              ? "breathe-in 4s ease-in-out forwards"
              : "breathe-out 4s ease-in-out forwards"
            : "none",
          transform: "scale(1)",
          opacity: 0.6,
          transition: "all 0.3s ease",
        }}
        onClick={() => {
          if (!active) {
            setStep(0);
            setActive(true);
          }
        }}
      />
      {!active && step === 0 && (
        <p className="text-sm text-muted-foreground font-body animate-pulse-hint">
          Tap the orb to begin
        </p>
      )}
      {(active || step > 0) && (
        <div className="text-center space-y-2 max-w-xs">
          <p className="text-lg font-display">{current.label}</p>
          <p className="text-sm text-muted-foreground font-body italic leading-relaxed">
            {current.sub}
          </p>
        </div>
      )}
    </div>
  );
};

export default BreathingOrb;
