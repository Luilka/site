import ProductCard from "@/components/patterns/product-card.tsx";
import SectionHeading from "@/components/patterns/section-heading.tsx";
import Container from "@/components/ui/container.tsx";
import type { SectionAction } from "@/content/site.ts";
import { useContent } from "@/content/useContent.ts";

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
            <ProductCard key={product.name} name={product.name} description={content.product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
