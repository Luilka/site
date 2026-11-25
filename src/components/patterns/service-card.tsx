import CardIcon from "@/components/patterns/card-icon.tsx";
import AppLink, { type Href } from "@/components/ui/link.tsx";

type ServiceCardProps = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export default function ServiceCard({ slug, title, description, shape }: ServiceCardProps) {
  return (
    <AppLink className="card svc" href={`/services/${slug}` as Href}>
      <div className="ico" style={shape ? { borderRadius: shape } : undefined}>
        <CardIcon name={title} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </AppLink>
  );
}
