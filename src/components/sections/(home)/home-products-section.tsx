import ProductsSection from "@/components/sections/(home)/products-section.tsx";
import { useContent } from "@/shared/i18n";

export default function HomeProducts() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/products" } as const;
  return <ProductsSection id="products" title={sectionTitles.products} description={sectionDescriptions.products} action={action} />;
}
