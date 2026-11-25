import PageHeroText from "@/components/patterns/page-hero-text.tsx";
import Container from "@/shared/ui/container.tsx";

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
