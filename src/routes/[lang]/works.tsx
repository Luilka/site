import { PageFrame } from "@/components/patterns.tsx";
import { WorksSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

export default function Works() {
  const { pages, section, discover } = useContent();
  return (
    <PageFrame page="works">
      <WorksSection title={pages.works.title} description={section} action={{ label: discover, href: "/blog" }} />
    </PageFrame>
  );
}
