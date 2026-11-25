import AppLink from "@/shared/ui/link.tsx";

export default function BrandMark() {
  return (
    <AppLink className="logo" href="/" aria-label="Luilka, accueil">
      <svg aria-hidden="true">
        <use href="#finger" />
      </svg>
      Luilka
    </AppLink>
  );
}
