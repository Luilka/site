import { StateCopy, StatePanel } from "@/components/patterns.tsx";
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
