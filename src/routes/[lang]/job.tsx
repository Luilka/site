import { PageFrame } from "@/components/patterns.tsx";
import { InfoSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Job() {
  const { pages, section, jobs } = useContent();
  return (
    <PageFrame page="job">
      <InfoSection title={pages.job.title} description={section} items={jobs} />
    </PageFrame>
  );
}
