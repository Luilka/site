import PageFrame from "@/components/patterns/page-frame.tsx";
import InfoSection from "@/components/sections/(home)/info-section.tsx";
import { useContent } from "@/shared/i18n";

export default function Job() {
  const { pages, section, jobs } = useContent();
  return (
    <PageFrame page="job">
      <InfoSection title={pages.job.title} description={section} items={jobs} />
    </PageFrame>
  );
}
