import type { ReactNode } from "react";

import MotionBox from "@/shared/ui/motion-box.ui.tsx";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export default function Reveal({ children, className }: RevealProps) {
  return (
    <MotionBox className={className} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      {children}
    </MotionBox>
  );
}
