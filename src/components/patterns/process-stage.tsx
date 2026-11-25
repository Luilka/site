import { Bike } from "lucide-react";

type ProcessStageProps = {
  label: string;
  last: boolean;
};

export default function ProcessStage({ label, last }: ProcessStageProps) {
  return (
    <>
      <span className="inline-block">{label}</span>
      {last ? null : <Bike size={22} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />}
    </>
  );
}
