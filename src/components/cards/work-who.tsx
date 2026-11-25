import CardIcon from "@/components/cards/card-icon.tsx";

type WorkWhoProps = {
  name: string;
  kind: string;
};

export default function WorkWho({ name, kind }: WorkWhoProps) {
  return (
    <div className="who">
      <div className="mini"><CardIcon name={name} size={22} /></div>
      <div><h3>{name}</h3><span>{kind}</span></div>
    </div>
  );
}
