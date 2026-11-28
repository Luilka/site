import { PageFrame } from "@/components/patterns.tsx";
import { InfoSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Job() {
  const { jobs } = useContent();
  return (
    <PageFrame page="job">
      <InfoSection items={jobs} />
    </PageFrame>
  );
}
