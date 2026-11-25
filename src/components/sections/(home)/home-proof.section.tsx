import HomeWorks from "@/components/sections/(home)/home-works.section.tsx";
import ContactPanel from "@/components/patterns/contact-panel.pattern.tsx";
import ProcessBand from "@/components/patterns/process-band.pattern.tsx";

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
