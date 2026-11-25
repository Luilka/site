import { Fragment } from "react";
import { Bike } from "lucide-react";

const stages = ["Concept", "UX Design", "UI Design", "Code", "Test", "Production"];

type ProcessBandProps = {
  noBottomMargin?: boolean;
  reverse?: boolean;
};

export default function ProcessBand({  reverse = false }: ProcessBandProps) {
  return (
    
    <div className="relative" aria-hidden="true">
      <div className={`absolute inset-0 -left-0.5 -right-0.5 bg-gray-200 ${reverse ? 'rotate-2' : '-rotate-2'}`}></div>
      <div className="relative z-2 flex  gap-3 justify-between py-7 px-20 bg-gray-300 font-medium" >
        {stages.map((stage, index) => (
          <Fragment key={stage}>
            <span className="inline-block">{stage}</span>
            {index < stages.length - 1 ? <Bike size={22} strokeWidth={1.5} aria-hidden="true" className="opacity-50"/> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
