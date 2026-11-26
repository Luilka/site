import { StateCopy, StatePanel } from "@/components/patterns.tsx";
import { useContent } from "@/shared/i18n";
import type { ErrorsProps } from "@/shared/types";

export default function Errors({ reset }: ErrorsProps) {
  const copy = useContent().states.error;
  return (
    <StatePanel>
      <StateCopy title={copy.title} description={copy.description} />
      <button className="btn btn-dark state-action" type="button" onClick={reset}>{copy.action}</button>
    </StatePanel>
  );
}
