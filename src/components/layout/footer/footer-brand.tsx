import BrandMark from "@/components/layout/brand-mark.tsx";
import SocialIcons from "@/components/layout/footer/social-icons.tsx";
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
