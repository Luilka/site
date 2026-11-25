import WorksSection from "@/components/sections/(home)/works-section.tsx";
import { useContent } from "@/shared/i18n";

export default function HomeWorks() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/works" } as const;
  return <WorksSection id="works" title={sectionTitles.works} description={sectionDescriptions.works} action={action} />;
}
