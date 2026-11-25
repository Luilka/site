import InfoCardBody from "@/components/cards/info-card-body.tsx";
import AppLink, { type Href } from "@/shared/ui/link.tsx";
import Card from "@/shared/ui/card.tsx";

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
