import { motion } from "framer-motion";

const isItems = [
  "A response to a real mismatch",
  "A signal your identity is telling you something",
  "Something many trans people experience",
  "Treatable and manageable",
];

const isNotItems = [
  "A mental illness",
  "A sign you are broken",
  "Something you caused",
  "Something you have to live with forever",
];

const Card1Split = () => (
  <div className="space-y-6">
    <p className="font-body text-base leading-relaxed text-foreground">
      Gender dysphoria is the distress that comes from a mismatch between your gender identity and how the world sees you or how your body feels. It is real, it is documented, and it is not permanent.
    </p>
    <div className="grid grid-cols-2 gap-4">
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl border-2 border-trans-blue bg-trans-blue/10 p-4"
      >
        <p className="font-body text-sm font-semibold text-trans-blue mb-3">What it IS</p>
        <ul className="space-y-3">
          {isItems.map((item, i) => (
            <li key={i} className="font-body text-sm leading-snug text-foreground">✓ {item}</li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="rounded-2xl border-2 border-trans-pink bg-trans-pink/10 p-4"
      >
        <p className="font-body text-sm font-semibold text-trans-pink mb-3">What it is NOT</p>
        <ul className="space-y-3">
          {isNotItems.map((item, i) => (
            <li key={i} className="font-body text-sm leading-snug text-foreground">✗ {item}</li>
          ))}
        </ul>
      </motion.div>
    </div>
  </div>
);

export default Card1Split;
