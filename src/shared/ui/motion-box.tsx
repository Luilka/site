import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type MotionBoxProps = Pick<HTMLMotionProps<"div">, "initial" | "animate" | "transition"> & {
  className?: string;
  children?: React.ReactNode;
  "aria-hidden"?: boolean | "true" | "false";
  "data-testid"?: string;
};

export default function MotionBox({ initial, animate, transition, ...props }: MotionBoxProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div {...props} />;
  return <motion.div initial={initial} animate={animate} transition={transition} {...props} />;
}
