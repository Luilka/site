import Badge from "@/components/ui/badge.tsx";
import Container from "@/components/ui/container.tsx";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container>
        <Badge>{eyebrow}</Badge>
        <h1>{title}</h1>
        <p>{description}</p>
      </Container>
    </section>
  );
}
