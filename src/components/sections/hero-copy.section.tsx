import HeroTitle from "@/components/sections/hero-title.section.tsx";
import QuoteLink from "@/components/patterns/quote-link.pattern.tsx";
import { useContent } from "@/shared/i18n";

export default function HeroCopy() {
  const { hero } = useContent();
  return (
    <div>
      <HeroTitle />
      <p>{hero}</p>
      <QuoteLink />
    </div>
  );
}
