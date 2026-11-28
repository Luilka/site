import type { DetailContent, Language } from "@/shared/types";

const MOBILE = { fr: "Application mobile", en: "Mobile app" } as const;

const FR: Record<string, DetailContent> = {
  "products/tala": {
    facts: [
      { label: "Type", value: "Plateforme de streaming vidéo" },
      { label: "Support", value: MOBILE.fr },
      { label: "Conception", value: "Luilka : UX Design et UI design" },
    ],
    sections: [
      { title: "Le produit", paragraphs: ["Tala est une plateforme de streaming vidéo. On y parcourt un catalogue, on reprend une lecture là où elle s'est arrêtée et on lance une vidéo en un geste."] },
      { title: "Ce que montre l'interface", paragraphs: [], points: ["Une affiche à la une, avec un bouton de lecture bien visible.", "Une rangée « Continuer à regarder », qui montre où en est chaque vidéo.", "Une navigation en bas de l'écran, à portée de pouce."] },
      { title: "Nos choix de conception", paragraphs: ["Un fond sombre, pour que l'image reste au centre de l'écran. Peu de texte et une seule action principale par écran, pour que le choix d'une vidéo prenne quelques secondes."] },
    ],
    captions: {
      "/images/gallery/tala-1.webp": "L'accueil : l'affiche à la une et le bouton de lecture.",
      "/images/gallery/tala-2.webp": "La rangée « Continuer à regarder » sous l'affiche.",
      "/images/gallery/tala-3.webp": "L'écran en entier, avec la navigation en bas.",
      "/images/gallery/tala-4.webp": "Détail de l'affiche à la une.",
    },
  },
  "products/vuga": {
    facts: [
      { label: "Type", value: "Application de location de logements" },
      { label: "Support", value: MOBILE.fr },
      { label: "Conception", value: "Luilka : UX Design et UI design" },
    ],
    sections: [
      { title: "Le produit", paragraphs: ["Vuga aide à trouver un logement à louer : une maison, un appartement ou un studio. On filtre par type, on regarde l'annonce en grand et on réserve une visite sans quitter l'écran."] },
      { title: "Ce que montre l'interface", paragraphs: [], points: ["Des filtres par type de logement, en haut de l'écran.", "Une annonce par carte, avec le quartier et les atouts essentiels.", "Un cœur pour garder une annonce de côté.", "Un bouton « Réserver une visite », toujours visible."] },
      { title: "Nos choix de conception", paragraphs: ["Un fond clair, pour que les photos du logement restent lisibles. Une carte par annonce, pour comparer sans ouvrir chaque page."] },
    ],
    captions: {
      "/images/gallery/vuga-1.webp": "La recherche : les filtres par type de logement et la première annonce.",
      "/images/gallery/vuga-2.webp": "Une annonce en grand, avec le cœur pour la garder.",
      "/images/gallery/vuga-3.webp": "Deux annonces et le bouton pour réserver une visite.",
      "/images/gallery/vuga-4.webp": "Détail d'une annonce : le logement, le quartier, les atouts.",
    },
  },
  "products/pro": {
    facts: [
      { label: "Type", value: "Réseau social professionnel" },
      { label: "Format", value: "Flux de vidéos verticales" },
      { label: "Support", value: MOBILE.fr },
    ],
    sections: [
      { title: "Le produit", paragraphs: ["Pro est un réseau social professionnel dont le flux est fait de vidéos verticales. On y découvre des parcours et des projets en quelques secondes, puis on suit la personne, on aime, on commente et on partage."] },
      { title: "Ce que montre l'interface", paragraphs: [], points: ["Un flux plein écran, qui passe à la vidéo suivante d'un geste.", "Les actions (suivre, aimer, commenter, partager) sur le bord droit de l'écran.", "Le nom, le rôle et la légende de la personne, en bas de la vidéo.", "Deux onglets en haut : Réseau et Pour vous."] },
      { title: "Nos choix de conception", paragraphs: ["Le plein écran laisse toute la place à la personne qui parle. Les actions restent sous le pouce, sans cacher la vidéo."] },
    ],
    captions: {
      "/images/gallery/pro-1.webp": "Le flux : une vidéo verticale en plein écran.",
      "/images/gallery/pro-2.webp": "Les actions sur le bord droit : suivre, aimer, commenter, partager.",
      "/images/gallery/pro-3.webp": "Le nom, le rôle et la légende en bas de la vidéo.",
      "/images/gallery/pro-4.webp": "Détail du flux et de ses actions.",
    },
  },
  "work/yano": {
    facts: [
      { label: "Mission", value: "UX Design" },
      { label: "Support", value: MOBILE.fr },
    ],
    sections: [
      { title: "La mission", paragraphs: ["Yano est une application mobile. Luilka a pris en charge son UX Design."] },
      { title: "Ce que couvre l'UX Design", paragraphs: ["Nous observons les utilisateurs, cadrons le problème et concevons des parcours testés avant l'interface. Livrable : parcours et prototype."] },
    ],
  },
  "work/vox-congo": {
    facts: [
      { label: "Mission", value: "UX Design et UI design" },
      { label: "Support", value: MOBILE.fr },
    ],
    sections: [
      { title: "La mission", paragraphs: ["Vox Congo est une application mobile. Luilka a pris en charge son UX Design et son UI design."] },
      { title: "Ce que couvrent l'UX Design et l'UI design", paragraphs: ["Nous observons les utilisateurs, cadrons le problème et concevons des parcours testés avant l'interface.", "Nous concevons des écrans clairs, avec leurs états et des composants accessibles. Les mots sont intégrés dès la première maquette."] },
    ],
  },
  "work/mitemo": {
    facts: [
      { label: "Mission", value: "Projet complet, tous les services" },
      { label: "Services", value: "UX Design, UI design, Software, COM" },
    ],
    sections: [
      { title: "La mission", paragraphs: ["Mitemo est un projet complet : Luilka a pris en charge tous ses services, de l'UX Design à la COM."] },
      { title: "Ce que couvrent les quatre services", paragraphs: [], points: ["UX Design : observer les utilisateurs, cadrer le problème et concevoir des parcours testés.", "UI design : des écrans clairs, avec leurs états et des composants accessibles.", "Software : l'application, de l'interface à la mise en ligne.", "COM : la page produit, le ton et les messages utiles au quotidien."] },
    ],
  },
  "work/privatis-capital-invest": {
    facts: [
      { label: "Mission", value: "Rebranding, système de design et charte graphique" },
    ],
    sections: [
      { title: "La mission", paragraphs: ["Pour Privatis Capital Invest, Luilka a mené un rebranding, un système de design et une charte graphique."] },
      { title: "Ce que couvre chaque livrable", paragraphs: [], points: ["Le rebranding : une identité visuelle repensée.", "Le système de design : des composants et des règles réutilisables par les équipes.", "La charte graphique : les règles d'usage de la marque."] },
    ],
  },
};

const EN: Record<string, DetailContent> = {
  "products/tala": {
    facts: [
      { label: "Type", value: "Video streaming platform" },
      { label: "Medium", value: MOBILE.en },
      { label: "Design", value: "Luilka: UX Design and UI design" },
    ],
    sections: [
      { title: "The product", paragraphs: ["Tala is a video streaming platform. You browse a catalogue, resume a video where it stopped and start a new one in a single tap."] },
      { title: "What the interface shows", paragraphs: [], points: ["A featured poster with a clear play button.", "A \"Continue watching\" row that shows how far each video has gone.", "A navigation bar at the bottom of the screen, within thumb reach."] },
      { title: "Our design choices", paragraphs: ["A dark background, so the picture stays at the centre of the screen. Little text and one main action per screen, so choosing a video takes a few seconds."] },
    ],
    captions: {
      "/images/gallery/tala-1.webp": "The home screen: the featured poster and the play button.",
      "/images/gallery/tala-2.webp": "The \"Continue watching\" row under the poster.",
      "/images/gallery/tala-3.webp": "The whole screen, with the navigation at the bottom.",
      "/images/gallery/tala-4.webp": "Detail of the featured poster.",
    },
  },
  "products/vuga": {
    facts: [
      { label: "Type", value: "Home rental app" },
      { label: "Medium", value: MOBILE.en },
      { label: "Design", value: "Luilka: UX Design and UI design" },
    ],
    sections: [
      { title: "The product", paragraphs: ["Vuga helps people find a home to rent: a house, an apartment or a studio. You filter by type, look at the listing in full and book a visit without leaving the screen."] },
      { title: "What the interface shows", paragraphs: [], points: ["Filters by type of home at the top of the screen.", "One card per listing, with the area and the key features.", "A heart to keep a listing aside.", "A \"Book a visit\" button that is always in view."] },
      { title: "Our design choices", paragraphs: ["A light background, so the photos of the home stay readable. One card per listing, to compare without opening every page."] },
    ],
    captions: {
      "/images/gallery/vuga-1.webp": "The search: filters by type of home and the first listing.",
      "/images/gallery/vuga-2.webp": "A listing in full, with the heart to keep it.",
      "/images/gallery/vuga-3.webp": "Two listings and the button to book a visit.",
      "/images/gallery/vuga-4.webp": "Detail of a listing: the home, the area, the features.",
    },
  },
  "products/pro": {
    facts: [
      { label: "Type", value: "Professional social network" },
      { label: "Format", value: "Feed of vertical videos" },
      { label: "Medium", value: MOBILE.en },
    ],
    sections: [
      { title: "The product", paragraphs: ["Pro is a professional social network whose feed is made of vertical videos. You discover careers and projects in a few seconds, then follow the person, like, comment and share."] },
      { title: "What the interface shows", paragraphs: [], points: ["A full screen feed that moves to the next video with a swipe.", "The actions (follow, like, comment, share) on the right edge of the screen.", "The name, the role and the caption of the person at the bottom of the video.", "Two tabs at the top: Network and For you."] },
      { title: "Our design choices", paragraphs: ["Full screen leaves all the room to the person speaking. The actions stay under the thumb without hiding the video."] },
    ],
    captions: {
      "/images/gallery/pro-1.webp": "The feed: a full screen vertical video.",
      "/images/gallery/pro-2.webp": "The actions on the right edge: follow, like, comment, share.",
      "/images/gallery/pro-3.webp": "The name, the role and the caption at the bottom of the video.",
      "/images/gallery/pro-4.webp": "Detail of the feed and its actions.",
    },
  },
  "work/yano": {
    facts: [
      { label: "Mission", value: "UX Design" },
      { label: "Medium", value: MOBILE.en },
    ],
    sections: [
      { title: "The mission", paragraphs: ["Yano is a mobile app. Luilka took charge of its UX Design."] },
      { title: "What UX Design covers", paragraphs: ["We observe your users, frame the problem and test flows before the interface. Deliverable: journeys and prototype."] },
    ],
  },
  "work/vox-congo": {
    facts: [
      { label: "Mission", value: "UX Design and UI design" },
      { label: "Medium", value: MOBILE.en },
    ],
    sections: [
      { title: "The mission", paragraphs: ["Vox Congo is a mobile app. Luilka took charge of its UX Design and UI design."] },
      { title: "What UX Design and UI design cover", paragraphs: ["We observe your users, frame the problem and test flows before the interface.", "We design clear screens, states and accessible components. Words are part of the first draft."] },
    ],
  },
  "work/mitemo": {
    facts: [
      { label: "Mission", value: "Full project, all services" },
      { label: "Services", value: "UX Design, UI design, Software, COM" },
    ],
    sections: [
      { title: "The mission", paragraphs: ["Mitemo is a full project: Luilka took charge of all its services, from UX Design to COM."] },
      { title: "What the four services cover", paragraphs: [], points: ["UX Design: observe users, frame the problem and test flows.", "UI design: clear screens with their states and accessible components.", "Software: the app, from the interface through to release.", "COM: the product page, the tone and the everyday messages."] },
    ],
  },
  "work/privatis-capital-invest": {
    facts: [
      { label: "Mission", value: "Rebranding, design system and brand guidelines" },
    ],
    sections: [
      { title: "The mission", paragraphs: ["For Privatis Capital Invest, Luilka carried out a rebranding, a design system and brand guidelines."] },
      { title: "What each deliverable covers", paragraphs: [], points: ["Rebranding: a rethought visual identity.", "Design system: components and rules that teams can reuse.", "Brand guidelines: the rules for using the brand."] },
    ],
  },
};

const TEXTS: Record<Language, Record<string, DetailContent>> = { fr: FR, en: EN };

/** The text of a project or product page, by language: facts, sections and picture captions. A page that has none shows none. */
export function detailTexts(language: Language, kind: string, slug: string): DetailContent | undefined {
  return TEXTS[language][`${kind}/${slug}`];
}
