import {
  Boxes,
  Grid2X2,
  ImageIcon,
  Layers3,
  MessageSquare,
  PenTool,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "UX Design": PenTool,
  "UI design": Sparkles,
  Software: Boxes,
  COM: MessageSquare,
  Tala: Boxes,
  Vuga: Layers3,
  Pro: ShieldCheck,
  Yano: ImageIcon,
  "Vox Congo": Grid2X2,
  Mitemo: Boxes,
  "Privatis Capital Invest": Layers3,
};

type CardIconProps = {
  name: string;
  size?: number;
  strokeWidth?: number;
};

export default function CardIcon({ name, size = 22, strokeWidth = 2 }: CardIconProps) {
  const Icon = ICONS[name] ?? ImageIcon;
  return <Icon size={size} strokeWidth={strokeWidth} aria-hidden="true" />;
}
