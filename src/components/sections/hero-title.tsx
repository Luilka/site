import { useContent } from "@/shared/i18n";

export default function HeroTitle() {
  const { home } = useContent();
  return (
    <h1>
      {home.prefix} <span className="b">{home.design}</span> {home.middle} <span className="p">{home.brand}</span>
    </h1>
  );
}
