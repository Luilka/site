import { Fragment } from "react";
import { Bike } from "lucide-react";

const stages = ["Concept", "UX Design", "UI Design", "Code", "Test", "Production"];

type ProcessBandProps = {
  noBottomMargin?: boolean;
};

export default function ProcessBand({ noBottomMargin = false }: ProcessBandProps) {
  return (
    <div className="marquee" style={noBottomMargin ? { marginBottom: 0 } : undefined}>
      <div className="marquee-in">
        {stages.map((stage, index) => (
          <Fragment key={stage}>
            <span>{stage}</span>
            {index < stages.length - 1 ? <Bike size={22} strokeWidth={1.5} aria-hidden="true" /> : null}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
