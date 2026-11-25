import FooterBrand from "@/components/layout/footer/footer-brand.tsx";
import FooterColumns from "@/components/layout/footer/footer-columns.tsx";
import FooterNewsletter from "@/components/layout/footer/footer-newsletter.tsx";

export default function FooterCells() {
  return (
    <>
      <FooterBrand />
      <FooterColumns />
      <FooterNewsletter />
    </>
  );
}
