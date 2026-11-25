import ProcessStage from "@/components/patterns/process-stage.tsx";
import { PROCESS_STAGES } from "@/shared/lib/process-stages.ts";

export default function ProcessStages() {
  const lastIndex = PROCESS_STAGES.length - 1;
  return (
    <div className="relative z-2 flex justify-between gap-3 bg-gray-300 px-20 py-7 font-medium">
      {PROCESS_STAGES.map((stage, index) => <ProcessStage key={stage} label={stage} last={index === lastIndex} />)}
    </div>
  );
}
