import Container from "@/shared/ui/container.ui.tsx";
import Badge from "@/shared/ui/badge.ui.tsx";

type PageHeroTextProps = {
  eyebrow: string;
  title: string;
  description: string;
};

function PageHeroText({ eyebrow, title, description }: PageHeroTextProps) {
  return (
    <>
      <Badge>{eyebrow}</Badge>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero(props: PageHeroProps) {
  return (
    <section className="page-hero">
      <Container><PageHeroText {...props} /></Container>
    </section>
  );
}
