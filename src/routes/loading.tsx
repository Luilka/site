import StateCopy from "@/components/patterns/state-copy.tsx";
import StatePanel from "@/components/patterns/state-panel.tsx";
import { useContent } from "@/shared/i18n";

export default function Loading() {
  const copy = useContent().states.loading;
  return (
    <StatePanel role="status" aria-live="polite">
      <span className="state-progress" aria-hidden="true" />
      <StateCopy title={copy.title} description={copy.description} />
    </StatePanel>
  );
}
