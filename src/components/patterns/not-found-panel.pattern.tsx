import StateCopy from "@/components/patterns/state-copy.pattern.tsx";
import StatePanel from "@/components/patterns/state-panel.pattern.tsx";
import { useContent } from "@/shared/i18n";
import AppLink from "@/shared/ui/link.ui.tsx";

export default function NotFoundPanel() {
  const copy = useContent().states.notfound;
  return (
    <StatePanel>
      <span className="state-code" aria-hidden="true">{copy.code}</span>
      <StateCopy title={copy.title} description={copy.description} />
      <AppLink className="btn btn-dark state-action" href="/">{copy.action}</AppLink>
    </StatePanel>
  );
}
