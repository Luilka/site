import AppLink, { type Href } from "@/shared/ui/link.ui.tsx";
import Card from "@/shared/ui/card.ui.tsx";
import Badge from "@/shared/ui/badge.ui.tsx";

type InfoCardBodyProps = {
  title: string;
  meta: string;
  description: string;
};

function InfoCardBody({ title, meta, description }: InfoCardBodyProps) {
  return (
    <>
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
}

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
