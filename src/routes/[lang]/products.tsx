import ContactPanel from "@/components/patterns/contact-panel.tsx";
import PageHero from "@/components/patterns/page-hero.tsx";
import ProductsSection from "@/components/templates/products-section.tsx";
import { useContent } from "@/i18n";

export default function Products() {
  const content = useContent();
  const intro = content.pages.products;

  return (
    <>
      <PageHero {...intro} />
      <ProductsSection
        title={intro.title}
        description={content.section}
        action={{ label: content.discover, href: "/works" }}
      />
      <ContactPanel />
    </>
  );
}
