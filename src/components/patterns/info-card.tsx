import Badge from "@/components/ui/badge.tsx";
import Card from "@/components/ui/card.tsx";
import AppLink, { type Href } from "@/components/ui/link.tsx";

type InfoCardProps = {
  title: string;
  meta: string;
  description: string;
  href?: Href;
};

export default function InfoCard({ title, meta, description, href }: InfoCardProps) {
  const body = (
    <>
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );

  if (!href) {
    return <Card className="info-card">{body}</Card>;
  }

  return (
    <AppLink className="card info-card" href={href}>
      {body}
    </AppLink>
  );
}
