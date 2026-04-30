import { motion } from "framer-motion";
import CardShell from "./CardShell";
import CardEye from "./CardEye";

const affirmations = [
  { text: "My struggles have a cause outside me, not a flaw inside me.", color: "blue" as const },
  { text: "I deserve support that affirms every part of who I am.", color: "pink" as const },
  { text: "Getting help is an act of self-respect, not surrender.", color: "blue" as const },
];

const Card5Closing = ({ active }: { active: boolean }) => (
  <CardShell bandColor="blue">
    <CardEye eye="Carry This" title="You Are Worth the Support You Give Others" />
    <p className="text-sm text-[hsl(0,0%,0%)] leading-relaxed mb-6 font-body">
      You have probably shown up for other people with far more patience and care than you have shown yourself.
      You deserve the same quality of support. Your mental health matters. Your identity is real.
      There is help that can actually reach what you are carrying.
    </p>
    <div className="space-y-3">
      {affirmations.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={active ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.4, duration: 0.5, ease: "easeOut" }}
          className={`border-l-4 rounded-r-xl p-4 ${
            a.color === "blue"
              ? "border-trans-blue bg-trans-blue/10"
              : "border-trans-pink bg-trans-pink/10"
          }`}
        >
          <p className="font-display italic text-sm text-foreground leading-snug">"{a.text}"</p>
        </motion.div>
      ))}
    </div>
  </CardShell>
);

export default Card5Closing;
