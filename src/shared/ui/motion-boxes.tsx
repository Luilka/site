import { motion, useReducedMotion } from "motion/react";
import type { MotionBoxProps } from "@/shared/types";

export function MotionBox({ initial, animate, transition, ...props }: MotionBoxProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div {...props} />;
  return <motion.div initial={initial} animate={animate} transition={transition} {...props} />;
}
