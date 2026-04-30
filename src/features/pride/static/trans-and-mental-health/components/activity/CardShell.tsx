import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CardShellProps {
  children: ReactNode;
  bandColor: "blue" | "pink";
}

const CardShell = ({ children, bandColor }: CardShellProps) => {
  const bandBg = bandColor === "blue" ? "bg-trans-blue" : "bg-trans-pink";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -30, scale: 0.97 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
      style={{
        background: "rgba(255,255,255,0.88)",
        borderRadius: "28px",
        boxShadow: "0 8px 40px -8px rgba(30,40,60,0.08), 0 2px 12px -2px rgba(30,40,60,0.04)",
        overflow: "hidden",
      }}
    >
      <div className={`h-1.5 w-full ${bandBg}`} />
      <div className="p-6 pb-8">{children}</div>
    </motion.div>
  );
};

export default CardShell;
