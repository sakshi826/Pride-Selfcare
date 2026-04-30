import { useState } from 'react';
import type { CardData } from '../../data/cardContent';

const colorMap = {
  pink: 'hsl(var(--bi-pink))',
  purple: 'hsl(var(--bi-purple))',
  blue: 'hsl(var(--bi-blue))',
};

interface ActivityCardProps {
  card: CardData;
  isLast: boolean;
  onNext: () => void;
}

const ActivityCard = ({ card, isLast, onNext }: ActivityCardProps) => {
  const [revealedItems, setRevealedItems] = useState<Set<number>>(new Set());

  const toggleReveal = (i: number) => {
    setRevealedItems(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const bandColor = colorMap[card.color];
  const btnLabel = card.buttonLabel ?? 'Next';

  return (
    <div className="animate-card-enter flex flex-col" style={{ minHeight: 0 }}>
      {/* Color band */}
      <div className="h-1.5 rounded-t-[28px]" style={{ background: bandColor }} />

      <div
        className="flex-1 flex flex-col px-6 py-6 sm:px-8 sm:py-8 overflow-y-auto"
        style={{ minHeight: '520px', maxHeight: 'calc(85vh - 80px)' }}
      >
        {/* Eyebrow */}
        <span
          className="text-xs font-body font-semibold uppercase tracking-widest mb-3"
          style={{ color: bandColor }}
        >
          {card.eyebrow}
        </span>

        {/* Title */}
        <h2 className="font-display text-2xl sm:text-[1.75rem] leading-tight text-foreground mb-5" style={{ textWrap: 'balance' }}>
          {card.title}
        </h2>

        {/* Body text */}
        {card.body && (
          <p className="font-body text-[0.95rem] leading-relaxed text-muted-foreground mb-5">
            {card.body}
          </p>
        )}

        {/* Affirmations */}
        {card.type === 'affirmations' && card.affirmations && (
          <div className="space-y-3 mb-5">
            {card.affirmations.map((a, i) => (
              <button
                key={i}
                onClick={() => toggleReveal(i)}
                className="w-full text-left"
              >
                <div
                  className={`rounded-2xl px-4 py-3 transition-all duration-300 ${
                    revealedItems.has(i)
                      ? 'bg-secondary'
                      : 'bg-foreground/[0.03] hover:bg-foreground/[0.06]'
                  }`}
                >
                  <p
                    className={`font-body text-sm leading-relaxed transition-colors duration-300 ${
                      revealedItems.has(i) ? 'text-foreground' : 'text-muted-foreground'
                    }`}
                  >
                    {revealedItems.has(i) ? (
                      <span className="animate-bubble-in block">"{a}"</span>
                    ) : (
                      <span className="italic">Tap to reveal…</span>
                    )}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Scenarios (tap to reveal) */}
        {card.type === 'scenarios' && card.scenarios && (
          <div className="space-y-3 mb-5">
            {card.scenarios.map((s, i) => (
              <button
                key={i}
                onClick={() => toggleReveal(i)}
                className="w-full text-left"
              >
                <div className="rounded-2xl px-4 py-3 bg-foreground/[0.03] hover:bg-foreground/[0.06] transition-colors">
                  <p className="font-body text-sm font-medium text-foreground mb-1">
                    "{s.trigger}"
                  </p>
                  {revealedItems.has(i) && (
                    <p className="animate-bubble-in font-body text-sm text-muted-foreground leading-relaxed">
                      {s.response}
                    </p>
                  )}
                  {!revealedItems.has(i) && (
                    <p className="font-body text-xs text-muted-foreground/60 italic">Tap to respond</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Myths grid */}
        {card.type === 'myths' && card.myths && (
          <div className="space-y-4 mb-5">
            {card.myths.map((m, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border/50">
                <div className="px-4 py-2.5 bg-foreground/[0.03]">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">Myth</span>
                  <p className="font-body text-sm text-foreground/80 italic mt-0.5">"{m.myth}"</p>
                </div>
                <div className="px-4 py-2.5 bg-secondary/50">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider" style={{ color: bandColor }}>Truth</span>
                  <p className="font-body text-sm text-foreground mt-0.5">{m.truth}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Breathing */}
        {card.type === 'breathe' && card.breatheSteps && (
          <div className="flex flex-col items-center mb-5">
            <div
              className="breathing-orb w-28 h-28 rounded-full mb-6"
              style={{
                background: `radial-gradient(circle, hsl(var(--bi-pink) / 0.5), hsl(var(--bi-purple) / 0.4), hsl(var(--bi-blue) / 0.3))`,
              }}
            />
            <div className="space-y-3 w-full">
              {card.breatheSteps.map((step, i) => (
                <p key={i} className="font-body text-sm text-center text-muted-foreground leading-relaxed">
                  {step}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Steps */}
        {card.type === 'steps' && card.steps && (
          <div className="space-y-3 mb-5">
            {card.steps.map((step, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div
                  className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: bandColor }}
                />
                <p className="font-body text-sm text-foreground/85 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        )}

        {/* Quote */}
        {card.type === 'quote' && card.quote && (
          <div className="mb-5">
            <blockquote className="border-l-2 pl-4 py-1 mb-3" style={{ borderColor: bandColor }}>
              <p className="font-display italic text-base leading-relaxed text-foreground/90">
                "{card.quote.text}"
              </p>
            </blockquote>
            <p className="font-body text-xs text-muted-foreground text-right">
              — {card.quote.attribution}
            </p>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Button */}
        <button
          onClick={onNext}
          className="w-full py-3.5 rounded-full font-body font-semibold text-sm tracking-wide text-primary-foreground transition-opacity duration-200 hover:opacity-85 active:opacity-70 active:scale-[0.98]"
          style={{ background: bandColor }}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
