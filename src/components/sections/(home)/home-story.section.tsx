import HomeAbout from "@/components/sections/(home)/home-about.section.tsx";
import HeroSection from "@/components/sections/(home)/hero.section.tsx";
import ProcessSection from "@/components/sections/(home)/process.section.tsx";
import ProcessBand from "@/components/patterns/process-band.pattern.tsx";

export default function HomeStory() {
  return (
    <>
      <HeroSection />
      <ProcessBand />
      <ProcessSection />
      <HomeAbout />
    </>
  );
}
