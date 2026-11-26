import { StateCopy, StatePanel } from "@/components/patterns.tsx";
import { useContent } from "@/shared/i18n";

export default function Loading() {
  const copy = useContent().states.loading;
  return (
    <StatePanel role="status" aria-live="polite">
      <span className="block w-[3rem] h-[0.25rem] mb-[1.5rem] rounded-[999px] bg-[linear-gradient(90deg,var(--blue),var(--accent-purple))] animate-state-pulse motion-reduce:animate-none" aria-hidden="true" />
      <StateCopy title={copy.title} description={copy.description} />
    </StatePanel>
  );
}
