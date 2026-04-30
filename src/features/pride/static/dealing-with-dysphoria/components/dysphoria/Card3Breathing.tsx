import { motion } from "framer-motion";

const steps = [
  { emoji: "🫁", text: "Breathe in for 4 counts — you are safe right now, in this moment" },
  { emoji: "👀", text: "Name 3 things you can see around you" },
  { emoji: "🤲", text: "Place a hand on your chest — this body has carried you here" },
  { emoji: "💛", text: "This feeling is temporary. It has passed before. It will pass again." },
];

const Card3Breathing = () => (
  <div className="space-y-5">
    <p className="font-body text-sm leading-relaxed text-foreground text-center">
      Dysphoria can feel all-consuming in the moment. It is not permanent. Here is a way through the next few minutes.
    </p>

    <div className="flex justify-center py-4">
      <div className="relative w-28 h-28">
        <div className="absolute inset-0 rounded-full bg-trans-blue/30 animate-breathe" />
        <div className="absolute inset-2 rounded-full bg-trans-pink/30 animate-breathe" style={{ animationDelay: "0.5s" }} />
        <div className="absolute inset-4 rounded-full bg-trans-blue/20 animate-breathe" style={{ animationDelay: "1s" }} />
        <div className="absolute inset-6 rounded-full bg-trans-pink/15 animate-breathe" style={{ animationDelay: "1.5s" }} />
      </div>
    </div>

    <div className="space-y-3">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 + i * 2, duration: 0.6 }}
          className="flex items-start gap-3 rounded-xl bg-muted/60 p-3"
        >
          <span className="text-xl shrink-0">{step.emoji}</span>
          <p className="font-body text-xs leading-relaxed text-foreground">{step.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Card3Breathing;
