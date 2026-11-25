import CardIcon from "@/components/cards/card-icon.tsx";
import { detailHref } from "@/shared/lib/detail-href.ts";
import AppLink from "@/shared/ui/link.tsx";

type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export default function ServiceCard({ slug, title, description, shape }: ServiceCardProps) {
  return (
    <AppLink className="card svc" href={detailHref("services", slug)}>
      <div className="ico" style={shape ? { borderRadius: shape } : undefined}><CardIcon name={title} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </AppLink>
  );
}
