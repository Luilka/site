import BrandMark from "@/components/layout/brand-mark.layout.tsx";
import SocialIcons from "@/components/layout/footer/social-icons.layout.tsx";
import { useContent } from "@/shared/i18n";

export default function FooterBrand() {
  const { footer } = useContent();
  return (
    <div className="about-f">
      <BrandMark />
      <p>{footer.description}</p>
      <SocialIcons />
    </div>
  );
}
