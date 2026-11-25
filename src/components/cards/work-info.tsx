import { ArrowUpRight } from "lucide-react";

import WorkWho from "@/components/cards/work-who.tsx";

type WorkInfoProps = {
  name: string;
  kind: string;
  caseLabel: string;
};

export default function WorkInfo({ name, kind, caseLabel }: WorkInfoProps) {
  return (
    <div className="info">
      <WorkWho name={name} kind={kind} />
      <span className="pill">{caseLabel}<ArrowUpRight size={8} strokeWidth={1.5} aria-hidden="true" /></span>
    </div>
  );
}
