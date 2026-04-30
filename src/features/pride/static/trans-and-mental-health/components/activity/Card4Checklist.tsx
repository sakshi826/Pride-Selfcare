import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CardShell from "./CardShell";
import CardEye from "./CardEye";

const items = [
  { title: "Affirming therapy", desc: "A therapist who understands trans experience specifically, not just LGBTQ+ generally", color: "blue" as const },
  { title: "Trans community", desc: "Being around people who simply know, without explanation, what you mean", color: "pink" as const },
  { title: "Gender-affirming care", desc: "Medical support shown to significantly improve mental health outcomes", color: "blue" as const },
  { title: "Honest disclosure", desc: "Being out to at least one person who fully accepts you reduces mental load considerably", color: "pink" as const },
  { title: "Named identity", desc: "Being called your name and correct pronouns consistently has measurable wellbeing impact", color: "blue" as const },
  { title: "Rest and permission", desc: "Giving yourself permission to not be educating, justifying, or explaining all the time", color: "pink" as const },
];

const Card4Checklist = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <CardShell bandColor="pink">
      <CardEye eye="What Actually Helps" title="Tools That Work for Trans People" />
      <div className="space-y-2">
        {items.map((item, i) => {
          const isOpen = expanded === i;
          const bgClass = item.color === "blue" ? "bg-trans-blue/15" : "bg-trans-pink/15";
          const borderClass = item.color === "blue" ? "border-l-[3px] border-trans-blue" : "border-l-[3px] border-trans-pink";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              <button
                onClick={() => setExpanded(isOpen ? null : i)}
                className={`w-full text-left p-3.5 rounded-xl transition-colors ${bgClass} ${borderClass}`}
              >
                <span className="text-sm font-semibold text-foreground font-body">{item.title}</span>
              </button>
              <AnimatePresence>
                {isOpen && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="text-xs text-[hsl(0,0%,0%)] pl-5 pr-3 py-2 leading-relaxed font-body overflow-hidden"
                  >
                    {item.desc}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </CardShell>
  );
};

export default Card4Checklist;
