import Badge from "@/shared/ui/badge.tsx";

type InfoCardBodyProps = {
  title: string;
  meta: string;
  description: string;
};

export default function InfoCardBody({ title, meta, description }: InfoCardBodyProps) {
  return (
    <>
      <Badge>{meta}</Badge>
      <h3>{title}</h3>
      <p>{description}</p>
    </>
  );
}
