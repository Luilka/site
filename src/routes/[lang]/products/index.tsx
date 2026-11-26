import { PageFrame } from "@/components/patterns.tsx";
import { ProductsSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Products() {
  const { pages, section, discover } = useContent();
  return (
    <PageFrame page="products">
      <ProductsSection title={pages.products.title} description={section} action={{ label: discover, href: "/works" }} />
    </PageFrame>
  );
}
