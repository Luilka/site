import { ChevronRight } from "lucide-react";

type ProcessStageProps = {
  label: string;
  last: boolean;
};

export default function ProcessStage({ label, last }: ProcessStageProps) {
  return (
    <>
      <span className="inline-block">{label}</span>
      {last ? null : <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />}
    </>
  );
}
