import ProcessStages from "@/components/patterns/process-stages.tsx";

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
