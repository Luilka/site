import {
  Boxes,
  Code2,
  Grid2X2,
  ImageIcon,
  Layers3,
  PenTool,
  Server,
  ShieldCheck,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  Design: PenTool,
  Software: Code2,
  Maintenance: Wrench,
  Devops: Server,
  Tala: Boxes,
  Vuga: Layers3,
  Pro: ShieldCheck,
  Yano: ImageIcon,
  "Vox Congo": Grid2X2,
  AyLen: Sparkles,
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
