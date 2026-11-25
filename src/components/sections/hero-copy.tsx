import HeroTitle from "@/components/sections/hero-title.tsx";
import QuoteLink from "@/components/patterns/quote-link.tsx";
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
