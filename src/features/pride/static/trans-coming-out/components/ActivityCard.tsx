import { ReactNode } from "react";

interface ActivityCardProps {
  eyebrow: string;
  title: string;
  bandColor: "blue" | "pink";
  children: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  onBack?: () => void;
  isActive: boolean;
  stackIndex: number;
}

const ActivityCard = ({
  eyebrow,
  title,
  bandColor,
  children,
  buttonText = "Continue →",
  onButtonClick,
  onBack,
  isActive,
  stackIndex,
}: ActivityCardProps) => {
  const band = bandColor === "blue" ? "bg-trans-blue" : "bg-trans-pink";

  if (stackIndex > 2) return null;

  const scale = 1 - stackIndex * 0.04;
  const yOffset = stackIndex * 12;

  return (
    <div
      className="absolute inset-0 transition-all duration-500 ease-out"
      style={{
        transform: `translateY(${yOffset}px) scale(${scale})`,
        zIndex: 10 - stackIndex,
        pointerEvents: stackIndex === 0 ? "auto" : "none",
      }}
    >
      <div
        className="w-full rounded-card overflow-hidden"
        style={{
          background: stackIndex === 0 ? 'rgba(255, 255, 255, 0.92)' : '#ffffff',
          boxShadow: stackIndex === 0
            ? '0 8px 40px rgba(0, 0, 0, 0.08), 0 2px 12px rgba(0, 0, 0, 0.04)'
            : '0 4px 20px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* Color band */}
        <div className={`h-1.5 ${band}`} />

        {/* Content — only render for active card */}
        {stackIndex === 0 ? (
          <div className="p-6 pb-5">
            <p className="text-xs font-body font-medium tracking-widest uppercase text-muted-foreground mb-2">
              {eyebrow}
            </p>
            <h2 className="font-display text-2xl text-foreground mb-4 leading-tight">
              {title}
            </h2>
            <div className="space-y-3 mb-6 text-sm font-body text-foreground/80 leading-relaxed">
              {children}
            </div>
            <div className="flex gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="py-3 px-6 rounded-full font-body font-medium text-sm border border-border text-foreground/60 hover:opacity-70 transition-opacity duration-200"
                >
                  ← Back
                </button>
              )}
              {onButtonClick && (
                <button
                  onClick={onButtonClick}
                  className="flex-1 py-3 px-6 rounded-full font-body font-medium text-sm bg-foreground text-background hover:opacity-80 transition-opacity duration-200"
                >
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Blank spacer for stacked cards — just show the band + empty height */
          <div style={{ height: '40px' }} />
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
