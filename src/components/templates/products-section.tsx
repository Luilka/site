import ProductCard from "@/components/patterns/product-card.tsx";
import SectionHeading from "@/components/patterns/section-heading.tsx";
import Container from "@/components/ui/container.tsx";
import type { SectionAction } from "@/i18n";
import { useContent } from "@/i18n";

type ProductsSectionProps = {
  id?: string;
  title: string;
  description: string;
  action?: SectionAction;
};

export default function ProductsSection({ id, title, description, action }: ProductsSectionProps) {
  const content = useContent();

  return (
    <section className="products" id={id}>
      <Container>
        <SectionHeading title={title} description={description} action={action} />
        <div className="prod-grid">
          {content.products.map((product) => (
            <ProductCard
              key={product.slug}
              slug={product.slug}
              name={product.name}
              description={product.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
