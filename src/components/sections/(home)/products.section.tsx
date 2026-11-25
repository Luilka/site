import ProductCard from "@/components/cards/product.card.tsx";
import CollectionSection from "@/components/sections/collection.section.tsx";
import type { SectionProps } from "@/components/sections/section-props.section.ts";
import { useContent } from "@/shared/i18n";

export default function ProductsSection(props: SectionProps) {
  const { products } = useContent();
  return (
    <CollectionSection {...props} className="products" gridClassName="prod-grid" items={products}
      getKey={(product) => product.slug} render={(product) => <ProductCard {...product} />} />
  );
}
