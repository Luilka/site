import FingerSymbol from "@/components/layout/finger-symbol.tsx";

export default function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <FingerSymbol />
      </defs>
    </svg>
  );
}
