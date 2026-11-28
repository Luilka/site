import { ContactPanel } from "@/components/patterns.tsx";
import { AboutHero, FilmSection, MissionSection, TeamSection, ValuesSection } from "@/components/sections.tsx";
import { useContent } from "@/shared/i18n";

function AboutStory() {
  const { about, pages, aboutPage } = useContent();
  return (
    <>
      <AboutHero {...pages.about} image={aboutPage.images.hero} />
      <MissionSection title={aboutPage.mission} paragraphs={about} images={aboutPage.images} />
      <FilmSection title={aboutPage.film.title} description={aboutPage.film.description} film={aboutPage.film} />
    </>
  );
}

function AboutPeople() {
  const { aboutPage } = useContent();
  return (
    <>
      <ValuesSection {...aboutPage.values} />
      <TeamSection {...aboutPage.team} />
    </>
  );
}

export default function About() {
  return (
    <>
      <AboutStory />
      <AboutPeople />
      <ContactPanel />
    </>
  );
}
