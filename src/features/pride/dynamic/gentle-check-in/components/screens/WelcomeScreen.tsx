import { ArrowLeft } from "lucide-react";

interface Props {
  onStart: () => void;
  onViewHistory: () => void;
}

const WelcomeScreen = ({ onStart, onViewHistory }: Props) => (
  <div className="space-y-8">
    <div className="flex justify-start">
      <button className="w-10 h-10 rounded-full bg-card flex items-center justify-center text-muted" style={{ boxShadow: "var(--shadow-cloud)" }}>
        <ArrowLeft className="w-5 h-5" />
      </button>
    </div>

    <div className="space-y-4">
      <h1 className="text-2xl font-medium tracking-tight text-foreground" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>
        🌿 Right Now Check-In
      </h1>
      <p className="text-base text-muted leading-relaxed" style={{ textWrap: "pretty" }}>
        Take a moment to notice how you feel right now in your body or surroundings.
        There's no pressure—just notice what's there.
      </p>
    </div>

    <div className="space-y-3">
      <button
        onClick={onStart}
        className="h-14 w-full rounded-full bg-primary text-primary-foreground font-medium text-base transition-all active:scale-95"
      >
        👉 Start
      </button>
      <button
        onClick={onViewHistory}
        className="h-14 w-full rounded-full bg-card text-foreground font-medium text-base transition-all active:scale-95"
        style={{ boxShadow: "var(--shadow-cloud)" }}
      >
        👉 View past entries
      </button>
    </div>
  </div>
);

export default WelcomeScreen;
