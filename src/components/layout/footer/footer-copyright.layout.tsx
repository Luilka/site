import { useContent } from "@/shared/i18n";
import Container from "@/shared/ui/container.ui.tsx";

export default function FooterCopyright() {
  const { footer } = useContent();
  return (
    <div className="copy">
      <Container>{footer.copyright}</Container>
    </div>
  );
}
