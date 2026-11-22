import { motion, useReducedMotion } from "motion/react";

export default function HeroAccent() {
  const reduced = useReducedMotion();
  const className = "absolute inset-6 rounded-full border border-white/20";

  if (reduced) {
    return <div data-testid="motion-accent" aria-hidden="true" className={className} />;
  }

  return (
    <motion.div
      data-testid="motion-accent"
      aria-hidden="true"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    />
  );
}
