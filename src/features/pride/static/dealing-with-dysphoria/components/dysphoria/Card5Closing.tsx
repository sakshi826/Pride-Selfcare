import { motion } from "framer-motion";

const affirmations = [
  { text: "This discomfort is telling me something true about who I am.", color: "blue" as const },
  { text: "Dysphoria is temporary. My identity is not.", color: "pink" as const },
  { text: "I am allowed to seek relief — from every source available to me.", color: "blue" as const },
];

const Card5Closing = () => (
  <div className="space-y-6">
    <p className="font-body text-base leading-relaxed text-foreground">
      Dysphoria is one part of the trans experience. It is not the defining part. Across trans communities worldwide, people describe dysphoria decreasing significantly with affirmation, support, and time. Your experience of it will change. You are not stuck here.
    </p>

    <div className="space-y-4">
      {affirmations.map((a, i) => (
        <motion.div
          key={i}
          initial={{ x: -20, opacity: 0, scale: 0.95 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{
            delay: 0.3 * i,
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className={`rounded-xl p-5 border-l-4 ${
            a.color === "blue"
              ? "border-trans-blue bg-trans-blue/8"
              : "border-trans-pink bg-trans-pink/8"
          }`}
        >
          <p className="font-display text-base italic text-foreground leading-relaxed">
            "{a.text}"
          </p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Card5Closing;
