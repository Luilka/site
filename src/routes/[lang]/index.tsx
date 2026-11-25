import NotFoundPanel from "@/components/patterns/not-found-panel.tsx";
import HomeOffer from "@/components/sections/(home)/home-offer-section.tsx";
import HomeProof from "@/components/sections/(home)/home-proof-section.tsx";
import HomeStory from "@/components/sections/(home)/home-story-section.tsx";
import { isSupportedLanguage } from "@/shared/i18n";

type HomeProps = {
  lang?: string;
};

export default function Home({ lang }: HomeProps) {
  if (lang !== undefined && !isSupportedLanguage(lang)) return <NotFoundPanel />;
  return (
    <>
      <HomeStory />
      <HomeOffer />
      <HomeProof />
    </>
  );
}
