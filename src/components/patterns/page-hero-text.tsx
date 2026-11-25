import Badge from "@/shared/ui/badge.tsx";

type PageHeroTextProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHeroText({ eyebrow, title, description }: PageHeroTextProps) {
  return (
    <>
      <Badge>{eyebrow}</Badge>
      <h1>{title}</h1>
      <p>{description}</p>
    </>
  );
}
