import { PROCESS_STAGES } from "@/shared/utils/process-stages.util.ts";
import { ChevronRight } from "lucide-react";

type ProcessStageProps = {
  label: string;
  last: boolean;
};

function ProcessStage({ label, last }: ProcessStageProps) {
  return (
    <>
      <span className="inline-block">{label}</span>
      {last ? null : <ChevronRight size={22} strokeWidth={1.5} aria-hidden="true" className="opacity-50" />}
    </>
  );
}

function ProcessStages() {
  const lastIndex = PROCESS_STAGES.length - 1;
  return (
    <div className="relative z-2 flex justify-between gap-3 bg-gray-300 px-20 py-7 font-medium">
      {PROCESS_STAGES.map((stage, index) => <ProcessStage key={stage} label={stage} last={index === lastIndex} />)}
    </div>
  );
}

type ProcessBandProps = {
  reverse?: boolean;
};

export default function ProcessBand({ reverse = false }: ProcessBandProps) {
  return (
    <div className="relative" aria-hidden="true">
      <div className={`absolute inset-0 -left-0.5 -right-0.5 bg-gray-200 ${reverse ? "rotate-2" : "-rotate-2"}`}></div>
      <ProcessStages />
    </div>
  );
}
