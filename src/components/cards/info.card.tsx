import InfoCardBody from "@/components/cards/info-card-body.card.tsx";
import AppLink, { type Href } from "@/shared/ui/link.ui.tsx";
import Card from "@/shared/ui/card.ui.tsx";

type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
  href?: Href;
};

export default function InfoCard({ href, ...copy }: InfoCardProps) {
  if (!href) return <Card className="info-card"><InfoCardBody {...copy} /></Card>;
  return <AppLink className="card info-card" href={href}><InfoCardBody {...copy} /></AppLink>;
}
