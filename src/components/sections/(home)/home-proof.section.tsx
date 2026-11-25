import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import ProcessBand from "@/components/patterns/process-band.pattern.tsx";
import WorksSection from "@/components/sections/(home)/works.section.tsx";
import { useContent } from "@/shared/i18n";

function HomeWorks() {
  const { sectionTitles, sectionDescriptions, discover } = useContent();
  const action = { label: discover, href: "/works" } as const;
  return <WorksSection id="works" title={sectionTitles.works} description={sectionDescriptions.works} action={action} />;
}

export default function HomeProof() {
  return (
    <>
      <ProcessBand reverse />
      <HomeWorks />
      <ProcessBand />
      <ContactPanel />
    </>
  );
}
