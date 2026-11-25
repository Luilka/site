import StateCopy from "@/components/patterns/state-copy.pattern.tsx";
import StatePanel from "@/components/patterns/state-panel.pattern.tsx";
import { useContent } from "@/shared/i18n";

type ErrorsProps = {
  reset?: () => void;
};

export default function Errors({ reset }: ErrorsProps) {
  const copy = useContent().states.error;
  return (
    <StatePanel>
      <StateCopy title={copy.title} description={copy.description} />
      <button className="btn btn-dark state-action" type="button" onClick={reset}>{copy.action}</button>
    </StatePanel>
  );
}
