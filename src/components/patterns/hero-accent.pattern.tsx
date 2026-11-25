import MotionBox from "@/shared/ui/motion-box.ui.tsx";

const ENTRANCE = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6 },
};

export default function HeroAccent() {
  return (
    <MotionBox
      data-testid="motion-accent"
      aria-hidden="true"
      className="absolute inset-6 rounded-full border border-white/20"
      {...ENTRANCE}
    />
  );
}
