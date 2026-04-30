import { Check } from "lucide-react";
import type { CheckinData } from "../ComfortCheckin";

interface Props {
  data: CheckinData;
  setData: React.Dispatch<React.SetStateAction<CheckinData>>;
  onNext: () => void;
}

const options = [
  "I'm looking at myself (mirror/photo)",
  "I'm getting dressed",
  "Someone is using the wrong name/pronouns",
  "I'm around people",
  "I'm noticing my voice or appearance",
  "Something online is affecting me",
  "It's coming up for no clear reason",
  "Something else",
];

const TriggerScreen = ({ data, setData, onNext }: Props) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-medium tracking-tight text-foreground" style={{ letterSpacing: "-0.02em", textWrap: "balance" }}>
      What is bringing this feeling up?
    </h1>
    <div className="space-y-3">
      {options.map((opt) => {
        const selected = data.trigger === opt;
        return (
          <button
            key={opt}
            onClick={() => setData((d) => ({ ...d, trigger: opt }))}
            className={`w-full p-4 rounded-2xl text-left text-base font-medium transition-all active:scale-[0.98] ${
              selected ? "bg-card text-foreground ring-2 ring-primary" : "bg-card text-foreground"
            }`}
            style={{ boxShadow: "var(--shadow-cloud)" }}
          >
            <span className="flex items-center justify-between">
              {opt}
              {selected && <Check className="w-5 h-5 text-primary flex-shrink-0" />}
            </span>
          </button>
        );
      })}
    </div>
    <button
      onClick={onNext}
      disabled={!data.trigger}
      className="h-14 w-full rounded-full bg-primary text-primary-foreground font-medium text-base transition-all active:scale-95 disabled:opacity-40"
    >
      Next
    </button>
  </div>
);

export default TriggerScreen;
