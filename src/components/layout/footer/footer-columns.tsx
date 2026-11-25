import FooterColumn from "@/components/layout/footer/footer-column.tsx";
import { useContent } from "@/shared/i18n";

export default function FooterColumns() {
  const { footer } = useContent();
  return (
    <>
      <FooterColumn title={footer.linksTitle} links={footer.links} />
      <FooterColumn title={footer.moreTitle} links={footer.more} />
    </>
  );
}
