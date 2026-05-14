import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import CardShell from "./CardShell";
import CardEye from "./CardEye";

interface AnimatedStatProps {
  value: number;
  suffix: string;
  label: string;
  color: "blue" | "pink";
  active: boolean;
}

const AnimatedStat = ({ value, suffix, label, color, active }: AnimatedStatProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!active) { setCurrent(0); return; }
    const duration = 1200;
    const steps = 40;
    const increment = value / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCurrent(Math.min(Math.round(increment * step), value));
      if (step >= steps) clearInterval(timer);
    }, duration / steps);
    return () => clearInterval(timer);
  }, [active, value]);

  const bg = color === "blue" ? "bg-trans-blue/25" : "bg-trans-pink/25";
  const text = color === "blue" ? "text-[hsl(193,80%,28%)]" : "text-[hsl(348,60%,35%)]";

  return (
    <div className={`${bg} rounded-2xl p-4 text-center`}>
      <p className={`font-display text-4xl font-bold ${text}`}>
        {current}{suffix}
      </p>
      <p className="text-sm text-[hsl(0,0%,0%)] mt-1.5 font-body leading-snug">{label}</p>
    </div>
  );
};

const Card1Stats = ({ active }: { active: boolean }) => {
  const { t } = useTranslation("minis");
  return (
    <CardShell bandColor="blue">
      <CardEye eye={t("The Reality")} title={t("Your Struggles Have a Context")} />
      <p className="text-sm text-[hsl(0,0%,0%)] leading-relaxed mb-5 font-body">
        {t("These numbers are not meant to alarm you. They are meant to explain. If you have been struggling, there is a documented reason — and a documented path toward better.")}
      </p>
      <div className="space-y-3">
        <AnimatedStat active={active} value={3} suffix="x" label={t("Trans people are 3x more likely to experience depression than the general population")} color="blue" />
        <AnimatedStat active={active} value={40} suffix="%" label={t("Around 40% of trans people report having attempted suicide at some point")} color="pink" />
        <AnimatedStat active={active} value={78} suffix="%" label={t("78% report significant improvement in mental health after gender-affirming care")} color="blue" />
      </div>
    </CardShell>
  );
};

export default Card1Stats;
