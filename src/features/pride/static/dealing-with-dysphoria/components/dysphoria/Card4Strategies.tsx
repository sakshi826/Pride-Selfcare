import { motion } from "framer-motion";

const strategies = [
  { emoji: "🎧", title: "Affirming music or media", desc: "Content that reflects your identity back to you helps more than it sounds.", color: "blue" as const },
  { emoji: "👕", title: "Gender-affirming clothing", desc: "Dressing in a way that aligns with your identity is a genuine intervention.", color: "pink" as const },
  { emoji: "💬", title: "Talk to someone who gets it", desc: "One conversation with a person who sees you correctly can shift everything.", color: "blue" as const },
  { emoji: "🚿", title: "Physical grounding", desc: "Shower, movement, or changing environment can interrupt a dysphoric spiral.", color: "pink" as const },
  { emoji: "📖", title: "Trans stories and community", desc: "Being reminded that others have felt this and are still here helps.", color: "blue" as const },
  { emoji: "🏥", title: "Medical support", desc: "Gender-affirming care has significant clinical evidence for reducing dysphoria.", color: "pink" as const },
];

const Card4Strategies = () => (
  <div className="space-y-4">
    <div className="grid gap-2.5">
      {strategies.map((s, i) => (
        <motion.div
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 * i, duration: 0.4 }}
          className={`rounded-xl p-3 flex items-start gap-3 ${
            s.color === "blue" ? "bg-trans-blue/10" : "bg-trans-pink/10"
          }`}
        >
          <span className="text-xl shrink-0">{s.emoji}</span>
          <div>
            <p className="font-body text-xs font-semibold text-foreground">{s.title}</p>
            <p className="font-body text-xs text-foreground leading-relaxed">{s.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Card4Strategies;
