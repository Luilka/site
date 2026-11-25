import FooterBrand from "@/components/layout/footer/footer-brand.layout.tsx";
import FooterColumns from "@/components/layout/footer/footer-columns.layout.tsx";
import FooterNewsletter from "@/components/layout/footer/footer-newsletter.layout.tsx";

export default function FooterCells() {
  return (
    <>
      <FooterBrand />
      <FooterColumns />
      <FooterNewsletter />
    </>
  );
}
