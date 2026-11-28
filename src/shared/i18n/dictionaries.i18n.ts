import navigationData from "@/content/navigation.json";
import detailSlugs from "@/content/details.json";
import imageSource from "@/content/images.json";
import type { DetailImage, Dictionary, Dropdown, DropdownBaseItem, DropdownCopy, DropdownItem, FooterLink, Language, MenuKey, NamedCard, NavigationItem, Service, Work } from "@/shared/types";

export const navigation: readonly NavigationItem[] = navigationData as readonly NavigationItem[];

const dropdownBase: Record<MenuKey, { items: readonly DropdownBaseItem[] }> = {
  services: {
    items: [
      { href: "/services", image: "/dropdown-services-design.svg" },
      { href: "/services", image: "/dropdown-services-software.svg" },
      { href: "/services", image: "/dropdown-services-maintenance.svg" },
      { href: "/services", image: "/dropdown-services-devops.svg" },
    ],
  },
  products: {
    items: [
      { href: "/products", image: imageSource.products.tala.src },
      { href: "/products", image: imageSource.products.vuga.src },
      { href: "/products", image: imageSource.products.pro.src },
    ],
  },
};

const dropdownDescriptions: Record<Language, Record<MenuKey, readonly string[]>> = {
  fr: {
    services: [
      "Nous observons, cadrons et testons les parcours avant l'interface.",
      "Nous concevons des écrans clairs, avec leurs états et les mots intégrés.",
      "Nous construisons l'application jusqu'à la mise en ligne, ou seulement la partie dont vous avez besoin.",
      "Nous écrivons la page produit et les messages utiles au quotidien, seuls ou avec le reste.",
    ],
    products: [
      "Une plateforme de streaming vidéo : parcourir un catalogue, reprendre une lecture et regarder sur son téléphone.",
      "Une application de location de maisons et d'autres logements : chercher, comparer et réserver une visite.",
      "Un réseau social professionnel avec un flux de vidéos verticales : se présenter, découvrir des parcours et échanger.",
    ],
  },
  en: {
    services: [
      "We observe, frame and test flows before the interface.",
      "We design clear screens, states and words in the first draft.",
      "We build the app through to release, or only the part you need.",
      "We write the product page and the everyday messages, on their own or with the rest.",
    ],
    products: [
      "A video streaming platform: browse a catalogue, resume a video and watch on your phone.",
      "A rental app for houses and other homes: search, compare and book a visit.",
      "A professional social network with a feed of vertical videos: introduce yourself, discover careers and talk.",
    ],
  },
};

const dropdownCopy: Record<Language, Record<MenuKey, DropdownCopy>> = {
  fr: {
    services: {
      eyebrow: "Services",
      title: "Concevoir l'expérience, écrire le produit",
      linksTitle: "Explorer Luilka",
      action: "Découvrir le service",
      labels: ["UX Design", "UI design", "Software", "COM"],
      eyebrows: ["Comprendre", "Concevoir", "Construire", "Écrire"],
      links: [
        { label: "Notre approche", href: "/about" },
        { label: "Nos réalisations", href: "/works" },
        { label: "Parlons de votre projet", href: "/contact" },
      ],
    },
    products: {
      eyebrow: "Produits",
      title: "Les produits du studio",
      linksTitle: "Explorer Luilka",
      action: "Découvrir le produit",
      labels: ["Tala", "Vuga", "Pro"],
      eyebrows: ["Streaming", "Immobilier", "Réseau pro"],
      links: [
        { label: "Tous nos produits", href: "/products" },
        { label: "Blog", href: "/blog" },
        { label: "Parlons de votre projet", href: "/contact" },
      ],
    },
  },
  en: {
    services: {
      eyebrow: "Services",
      title: "Design the experience, write the product",
      linksTitle: "Explore Luilka",
      action: "Explore the service",
      labels: ["UX Design", "UI design", "Software", "COM"],
      eyebrows: ["Understand", "Design", "Build", "Write"],
      links: [
        { label: "Our approach", href: "/about" },
        { label: "Our work", href: "/works" },
        { label: "Tell us about your project", href: "/contact" },
      ],
    },
    products: {
      eyebrow: "Products",
      title: "Products from the studio",
      linksTitle: "Explore Luilka",
      action: "Explore the product",
      labels: ["Tala", "Vuga", "Pro"],
      eyebrows: ["Streaming", "Real estate", "Pro network"],
      links: [
        { label: "All our products", href: "/products" },
        { label: "Blog", href: "/blog" },
        { label: "Tell us about your project", href: "/contact" },
      ],
    },
  },
};

function describeItem(
  item: DropdownBaseItem,
  index: number,
  descriptions: readonly string[],
  copy: DropdownCopy,
): DropdownItem {
  const { labels, eyebrows, action } = copy;
  return { ...item, label: labels[index], eyebrow: eyebrows[index], description: descriptions[index], action };
}

function describedItems(
  items: readonly DropdownBaseItem[],
  descriptions: readonly string[],
  copy: DropdownCopy,
): readonly DropdownItem[] {
  return items.map((item, index) => describeItem(item, index, descriptions, copy));
}

function dropdownFor(menu: MenuKey, language: Language): Dropdown {
  const copy = dropdownCopy[language][menu];
  return {
    eyebrow: copy.eyebrow,
    title: copy.title,
    linksTitle: copy.linksTitle,
    items: describedItems(dropdownBase[menu].items, dropdownDescriptions[language][menu], copy),
    links: copy.links,
  };
}

function dropdownsFor(language: Language): Record<MenuKey, Dropdown> {
  return {
    services: dropdownFor("services", language),
    products: dropdownFor("products", language),
  };
}

function withSlugs<T>(items: readonly T[], slugs: readonly string[]): readonly (T & { slug: string })[] {
  return items.map((item, index) => ({ ...item, slug: slugs[index] }));
}

function withImages<T extends { slug: string }>(items: readonly T[], covers: Record<string, DetailImage>): readonly (T & { image: DetailImage })[] {
  return items.map((item) => ({ ...item, image: covers[item.slug] }));
}

const servicesFr: readonly Service[] = withSlugs(
  [
  {
    title: "UX Design",
    description:
      "Nous observons vos utilisateurs, cadrons le problème et concevons des parcours testés avant l'interface. Livrable : parcours et prototype.",
  },
  {
    title: "UI design",
    description:
      "Nous concevons des écrans clairs, avec leurs états et des composants accessibles. Les mots sont intégrés dès la première maquette.",
  },
  {
    title: "Software",
    description:
      "Nous construisons l'application : interface, états et parcours jusqu'à la mise en ligne. Ce service peut aussi être commandé seul.",
  },
  {
    title: "COM",
    description:
      "Nous écrivons la page produit qui donne envie d'acheter, le ton et les messages utiles au quotidien. Ce service peut aussi être commandé seul.",
  },
  ],
  detailSlugs.services,
);

const productsFr: readonly NamedCard[] = withImages(withSlugs(
  [
  {
    name: "Tala",
    description: "Une plateforme de streaming vidéo : parcourir un catalogue, reprendre une lecture et regarder sur son téléphone.",
  },
  {
    name: "Vuga",
    description: "Une application de location de maisons et d'autres logements : chercher, comparer et réserver une visite.",
  },
  {
    name: "Pro",
    description: "Un réseau social professionnel avec un flux de vidéos verticales : se présenter, découvrir des parcours et échanger.",
  },
  ],
  detailSlugs.products,
), imageSource.products);

const worksFr: readonly Work[] = withImages(withSlugs(
  [
  { name: "Yano", kind: "UX Design: mobile App", caseLabel: "Voir le projet" },
  { name: "Vox Congo", kind: "UX Design & UI design : Mobile App", caseLabel: "Voir le projet" },
  { name: "Mitemo", kind: "Full Projet & all Service", caseLabel: "Voir le projet" },
  {
    name: "Privatis Capital Invest",
    kind: "Rebranding, et Design système , charte graphique",
    caseLabel: "Voir le projet",
  },
  ],
  detailSlugs.work,
), imageSource.work);

const servicesEn: readonly Service[] = withSlugs(
  [
  {
    title: "UX Design",
    description:
      "We observe your users, frame the problem and test flows before the interface. Deliverable: journeys and prototype.",
  },
  {
    title: "UI design",
    description:
      "We design clear screens, states and accessible components. Words are part of the first draft.",
  },
  {
    title: "Software",
    description:
      "We build the app: interface, states and flows through to release. This service can also be booked on its own.",
  },
  {
    title: "COM",
    description:
      "We write the product page that makes people want to buy, the tone and the messages people use every day. This service can also be booked on its own.",
  },
  ],
  detailSlugs.services,
);

const productsEn: readonly NamedCard[] = withImages(withSlugs(
  [
  {
    name: "Tala",
    description: "A video streaming platform: browse a catalogue, resume a video and watch on your phone.",
  },
  {
    name: "Vuga",
    description: "A rental app for houses and other homes: search, compare and book a visit.",
  },
  {
    name: "Pro",
    description: "A professional social network with a feed of vertical videos: introduce yourself, discover careers and talk.",
  },
  ],
  detailSlugs.products,
), imageSource.products);

const worksEn: readonly Work[] = withImages(withSlugs(
  [
  { name: "Yano", kind: "UX Design: Mobile App", caseLabel: "View project" },
  { name: "Vox Congo", kind: "UX Design & UI Design: Mobile App", caseLabel: "View project" },
  { name: "Mitemo", kind: "Full Project & All Services", caseLabel: "View project" },
  {
    name: "Privatis Capital Invest",
    kind: "Rebranding, Design System and Brand Guidelines",
    caseLabel: "View project",
  },
  ],
  detailSlugs.work,
), imageSource.work);

const footerLinksFr: readonly FooterLink[] = [
  { label: "À propos", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/works" },
  { label: "Contact", href: "/contact" },
];

const footerMoreFr: readonly FooterLink[] = [
  { label: "Notre approche", href: "/about" },
  { label: "Nos produits", href: "/products" },
  { label: "Blog", href: "/blog" },
];

const footerLinksEn: readonly FooterLink[] = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/works" },
  { label: "Contact", href: "/contact" },
];

const footerMoreEn: readonly FooterLink[] = [
  { label: "Our approach", href: "/about" },
  { label: "Our products", href: "/products" },
  { label: "Blog", href: "/blog" },
];

const fr: Dictionary = {
  hero: "Du design à l'app : nous partons des utilisateurs, concevons le produit et livrons une interface prête à construire.",
  emailLabel: "Écrire un email à Luilka",
  discover: "Découvrir plus",
  switchLanguage: "Passer en anglais",
  contactAction: "Nous contacter",
  navigationLabel: "Navigation principale",
  homeLabel: "Luilka, accueil",
  menuLabel: "Menu",
  closeLabel: "Fermer",
  reelPause: "Mettre en pause la vidéo",
  reelPlay: "Reprendre la vidéo",
  soundOn: "Activer le son",
  processKeywords: ["Observer", "Cadrer", "Concevoir", "Construire", "Tester", "Lancer"],
  detailNext: { work: "Projet suivant", products: "Produit suivant", services: "Service suivant", blog: "Article suivant" },
  consent: {
    label: "Mesure d'audience",
    text: "Nous mesurons les visites avec Google Analytics, qui utilise des cookies. Acceptez-vous ?",
    accept: "Accepter",
    refuse: "Refuser",
  },
  meta: {
    siteName: "Luilka",
    homeTitle: "Studio de design centré sur l'utilisateur",
    homeDescription: "Luilka conçoit, écrit et construit des produits, numériques ou physiques, à partir des personnes qui les utiliseront. De l'idée à l'application.",
  },
  soundOff: "Couper le son",
  mobileNavigationLabel: "Navigation mobile",
  breadcrumb: { label: "Fil d'Ariane", home: "Accueil" },
  home: {
    prefix: "Agence de",
    design: "design",
    middle: "reliant produit et",
    brand: "marque",
  },
  sectionTitles: {
    services: "Concevoir l'expérience, écrire le produit",
    products: "Produits",
    works: "Réalisations",
  },
  sectionDescriptions: {
    services:
      "Nous concevons, écrivons et construisons des produits numériques. Chaque service peut aussi être commandé seul.",
    products:
      "Trois produits nés du studio : une plateforme de streaming vidéo, une application de location de logements et un réseau social professionnel.",
    works:
      "Chaque projet commence par une question claire et se termine par une interface que les gens savent utiliser.",
  },
  about: [
    "Luilka fait du design to app : de la recherche utilisateur jusqu'aux écrans, chaque choix part d'un besoin observé et se vérifie avec les personnes qui utiliseront le produit.",
    "Le studio conçoit aussi d'autres produits, numériques ou physiques, avec le même point de départ : la personne qui s'en servira.",
  ],
  contact: {
    title: "Donnons forme à votre prochaine idée.",
    description:
      "Décrivez votre besoin en quelques lignes. Nous revenons avec une première lecture et un créneau d'échange.",
  },
  aboutPage: {
    mission: "Notre mission",
    film: {
      title: "De l'idée à l'app",
      description: "Trente secondes pour voir comment nous travaillons : nous partons des utilisateurs, puis nous concevons, nous testons et nous livrons.",
      note: "L'écran montré est une interface d'exemple, ce n'est le travail d'aucun client.",
      src: "/video/film-fr.mp4",
      poster: "/video/film-fr-poster.webp",
      captions: { src: "/video/film-fr.vtt", lang: "fr", label: "Français" },
      transcriptLabel: "Lire la transcription",
      transcript: [
        "Tout commence par une idée.",
        "Nous partons des utilisateurs. Le problème, les personnes concernées, et ce que le produit doit accomplir.",
        "Puis nous posons le langage visuel.",
        "Nous concevons les parcours et les écrans, puis nous les testons avec de vrais utilisateurs.",
        "Nous remettons des maquettes prêtes à l'emploi, et un système de composants.",
        "Du design à l'application. Luilka.",
      ],
    },
    profileLabel: "Profil GitHub de {name}",
    values: {
      title: "Nos valeurs",
      description: "Ce qui guide chaque projet, de la première observation à la livraison.",
      items: [
        { title: "Observer avant de concevoir", description: "Chaque choix part d'un besoin observé chez les personnes qui utiliseront le produit." },
        { title: "Vérifier avec les gens", description: "Les parcours et les écrans sont testés avec celles et ceux qui utiliseront le produit." },
        { title: "Livrer une interface prête à construire", description: "Maquettes prêtes à l'emploi et système de composants que vos équipes peuvent utiliser." },
        { title: "Écrire dès la première maquette", description: "Le ton et les messages sont écrits en même temps que l'interface." },
        { title: "Des preuves sourcées", description: "Un projet est montré sous son vrai nom, et aucun chiffre n'est écrit sans source." },
      ],
    },
    team: {
      title: "Notre équipe",
      description: "Les personnes qui conçoivent, écrivent et construisent avec vous.",
      members: [{ name: "Espoir LOEMBA", role: "Founder", github: "Espoir-Loem" }],
    },
    images: imageSource.about,
  },
  pages: {
    about: {
      eyebrow: "À propos",
      title: "Un studio de design centré sur l'utilisateur",
      description:
        "Luilka réunit designers et chercheurs autour d'une méthode centrée utilisateur : observer, concevoir les parcours de l'app puis livrer des interfaces cohérentes.",
    },
    services: {
      eyebrow: "Services",
      title: "Nos services",
      description:
        "Du premier croquis au système de composants, nous accompagnons les équipes produit et marketing à chaque étape du design.",
    },
    products: {
      eyebrow: "Produits",
      title: "Nos produits",
      description:
        "Trois produits nés du studio : une plateforme de streaming vidéo, une application de location de logements et un réseau social professionnel.",
    },
    works: {
      eyebrow: "Réalisations",
      title: "Nos réalisations",
      description:
        "Des projets menés avec des partenaires qui ont accepté de mesurer l'impact de chaque décision de design.",
    },
    blog: {
      eyebrow: "Blog",
      title: "Le journal de Luilka",
      description:
        "Des notes courtes sur le design, le produit et la façon de construire des équipes techniques durables.",
    },
    job: {
      eyebrow: "Carrières",
      title: "Rejoignez l'équipe",
      description:
        "Nous cherchons des personnes qui aiment livrer, expliquer leurs choix et apprendre avec les autres.",
    },
    contact: {
      eyebrow: "Nous contacter",
      title: "Parlons de votre projet",
      description:
        "Décrivez votre besoin en quelques lignes. Nous revenons vers vous avec une première réponse et un créneau d'échange.",
    },
  },
  steps: [
    {
      number: "01",
      title: "Cadrage",
      description:
        "Nous clarifions le problème, les personnes concernées et ce que le produit doit accomplir.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "Nous concevons les parcours, le langage visuel et les écrans, puis nous les testons avec de vraies personnes.",
    },
    {
      number: "03",
      title: "Construction",
      description:
        "Nous construisons l'application : interface, états et parcours jusqu'à la mise en ligne.",
    },
    {
      number: "04",
      title: "Lancement",
      description:
        "Nous écrivons la page produit, le ton et les messages utiles au quotidien pour que le produit trouve ses utilisateurs.",
    },
  ],
  services: servicesFr,
  products: productsFr,
  works: worksFr,
  posts: withSlugs(
    [
    {
      title: "Designer sous contrainte",
      meta: "Design",
      description:
        "Les meilleures décisions de design naissent souvent d'un budget, d'un délai ou d'un usage imprévu.",
    },
    {
      title: "Livrer par étapes",
      meta: "Produit",
      description:
        "Une petite version observable apprend plus vite qu'une grande version imaginée pendant plusieurs mois.",
    },
    {
      title: "La communauté avant la technique",
      meta: "Communauté",
      description:
        "Un outil reste utile quand les personnes qui l'utilisent se parlent, se forment et s'entraident.",
    },
    ],
    detailSlugs.blog,
  ),
  jobs: [
    {
      title: "Design produit",
      meta: "CDI, Kinshasa",
      description:
        "Vous menez la recherche, le prototype et le design final avec une équipe produit réduite et exigeante.",
    },
    {
      title: "Ingénieur front-end",
      meta: "CDI, distant",
      description:
        "Vous construisez des interfaces React accessibles, rapides et faciles à faire évoluer.",
    },
    {
      title: "Design engineer",
      meta: "Freelance",
      description:
        "Vous construisez les composants et les outils qui gardent le design et le code cohérents à chaque livraison.",
    },
  ],
  dropdowns: dropdownsFor("fr"),
  states: {
    notfound: {
      code: "404",
      title: "Cette page n'existe pas",
      description: "Le lien est peut-être ancien ou la page a changé d'adresse.",
      action: "Retour à l'accueil",
    },
    error: {
      title: "Cette page n'a pas pu s'afficher",
      description: "Réessayez. Si le problème reste, écrivez-nous.",
      action: "Réessayer",
    },
    loading: {
      title: "Chargement en cours",
      description: "Nous préparons la page.",
    },
    preview: {
      title: "Voir l'état d'erreur",
      description: "Cette page sert à vérifier l'affichage de l'erreur. Le bouton provoque une erreur de rendu.",
      error: "Provoquer une erreur",
    },
  },
  newsletter: {
    invalid: "Entrez une adresse email valide.",
    valid: "Adresse valide. L'envoi sera disponible prochainement.",
  },
  footer: {
    description:
      "Un studio de design qui réunit les équipes produit et marketing autour d'interfaces claires et utiles.",
    linksTitle: "Liens",
    moreTitle: "Plus",
    newsletterTitle: "Abonnez-vous à notre lettre d'information",
    newsletterText: "Recevez les nouveautés, les guides et les études de cas.",
    emailLabel: "Adresse email",
    emailPlaceholder: "pixi@domaine.com",
    social: { linkedin: "Luilka sur LinkedIn", tiktok: "Luilka sur TikTok", youtube: "Luilka sur YouTube" },
    subscribe: "S'abonner",
    copyright: "Copyright {year} Luilka. Tous droits réservés.",
    links: footerLinksFr,
    more: footerMoreFr,
  },
};

const en: Dictionary = {
  hero: "From design to app: we start with the people who will use it, shape the product and hand over an interface ready to build.",
  emailLabel: "Email Luilka",
  discover: "Learn more",
  switchLanguage: "Switch to French",
  contactAction: "Contact us",
  navigationLabel: "Main navigation",
  homeLabel: "Luilka, home",
  menuLabel: "Menu",
  closeLabel: "Close",
  reelPause: "Pause the video",
  reelPlay: "Resume the video",
  soundOn: "Turn the sound on",
  processKeywords: ["Observe", "Scope", "Design", "Build", "Test", "Launch"],
  detailNext: { work: "Next project", products: "Next product", services: "Next service", blog: "Next article" },
  consent: {
    label: "Audience measurement",
    text: "We measure visits with Google Analytics, which uses cookies. Do you accept?",
    accept: "Accept",
    refuse: "Decline",
  },
  meta: {
    siteName: "Luilka",
    homeTitle: "A user-centric design studio",
    homeDescription: "Luilka designs, writes and builds products, digital or physical, starting from the people who will use them. From idea to app.",
  },
  soundOff: "Turn the sound off",
  mobileNavigationLabel: "Mobile navigation",
  breadcrumb: { label: "Breadcrumb", home: "Home" },
  home: {
    prefix: "Creative",
    design: "design",
    middle: "studio linking product and",
    brand: "brand",
  },
  sectionTitles: {
    services: "Design the experience, write the product",
    products: "Products",
    works: "Works",
  },
  sectionDescriptions: {
    services:
      "We design, write and build digital products. Every service can also be booked on its own.",
    products:
      "Three products born in the studio: a video streaming platform, a home rental app and a professional social network.",
    works: "Every project starts with a clear question and ends with an interface people know how to use.",
  },
  about: [
    "Luilka works design to app: from user research to the final screens, every choice starts from an observed need and is checked with the people who will use the product.",
    "The studio also designs other products, digital or physical, from the same starting point: the person who will use them.",
  ],
  contact: {
    title: "Let's shape your next idea.",
    description: "Describe your need in a few lines. We will come back with a first reading and a time to talk.",
  },
  aboutPage: {
    mission: "Our mission",
    film: {
      title: "From idea to app",
      description: "Thirty seconds on how we work: we start with the people who use it, then design, test and hand over.",
      note: "The screen shown is an example interface, not the work of any client.",
      src: "/video/film-en.mp4",
      poster: "/video/film-en-poster.webp",
      captions: null,
      transcriptLabel: "Read the transcript",
      transcript: [
        "This film has no spoken words, only music.",
        "On screen: it all starts with an idea. We start with the people who use it. We set the visual language. We design the screens. We deliver a system. The idea becomes an app. From design to app.",
      ],
    },
    profileLabel: "GitHub profile of {name}",
    values: {
      title: "Our values",
      description: "What guides every project, from the first observation to handover.",
      items: [
        { title: "Observe before designing", description: "Every choice starts from a need seen in the people who will use the product." },
        { title: "Check with real people", description: "Flows and screens are tested with the people who will use the product." },
        { title: "Hand over an interface ready to build", description: "Ready to use designs and a component system your teams can build on." },
        { title: "Write from the first draft", description: "Tone and messages are written at the same time as the interface." },
        { title: "Sourced proof", description: "A project is shown under its real name, and no figure is written without a source." },
      ],
    },
    team: {
      title: "Our team",
      description: "The people who design, write and build with you.",
      members: [{ name: "Espoir LOEMBA", role: "Founder", github: "Espoir-Loem" }],
    },
    images: imageSource.about,
  },
  pages: {
    about: {
      eyebrow: "About",
      title: "A user-centric design studio",
      description:
        "Luilka brings designers and researchers together around a user-centric method: observe, shape the app flows and deliver coherent interfaces.",
    },
    services: {
      eyebrow: "Services",
      title: "Our services",
      description:
        "From first concept to component system, we support product and marketing teams at every stage of design.",
    },
    products: {
      eyebrow: "Products",
      title: "Our products",
      description:
        "Three products born in the studio: a video streaming platform, a home rental app and a professional social network.",
    },
    works: {
      eyebrow: "Works",
      title: "Our work",
      description:
        "Projects delivered with partners who agreed to measure the impact of every design decision.",
    },
    blog: {
      eyebrow: "Blog",
      title: "The Luilka journal",
      description:
        "Short notes on design, product and the way to build lasting technical teams.",
    },
    job: {
      eyebrow: "Job",
      title: "Join the team",
      description:
        "We look for people who enjoy shipping, explaining their choices and learning with others.",
    },
    contact: {
      eyebrow: "Contact us",
      title: "Let's talk about your project",
      description:
        "Describe your need in a few lines. We will come back with a first answer and a time to talk.",
    },
  },
  steps: [
    {
      number: "01",
      title: "Scoping",
      description: "We clarify the problem, the people involved and what the product must achieve.",
    },
    {
      number: "02",
      title: "Design",
      description:
        "We design the flows, the visual language and the screens, then test them with real people.",
    },
    {
      number: "03",
      title: "Build",
      description: "We build the app: interface, states and flows, up to going live.",
    },
    {
      number: "04",
      title: "Launch",
      description:
        "We write the product page, the tone and the everyday messages so the product finds its users.",
    },
  ],
  services: servicesEn,
  products: productsEn,
  works: worksEn,
  posts: withSlugs(
    [
    {
      title: "Designing under constraint",
      meta: "Design",
      description:
        "The best design decisions often come from a budget, a deadline or an unexpected use.",
    },
    {
      title: "Shipping in stages",
      meta: "Product",
      description:
        "A small version you can observe teaches faster than a large version imagined for months.",
    },
    {
      title: "Community before technique",
      meta: "Community",
      description:
        "A tool stays useful when the people using it talk, learn and help each other.",
    },
    ],
    detailSlugs.blog,
  ),
  jobs: [
    {
      title: "Product designer",
      meta: "Full time, Kinshasa",
      description:
        "You lead research, prototyping and final design with a small and demanding product team.",
    },
    {
      title: "Front-end engineer",
      meta: "Full time, remote",
      description:
        "You build accessible, fast React interfaces that are easy to evolve.",
    },
    {
      title: "Design engineer",
      meta: "Freelance",
      description:
        "You build the components and tooling that keep design and code in sync at every release.",
    },
  ],
  dropdowns: dropdownsFor("en"),
  states: {
    notfound: {
      code: "404",
      title: "This page does not exist",
      description: "The link may be old or the page may have moved.",
      action: "Back to home",
    },
    error: {
      title: "This page could not be displayed",
      description: "Try again. If the problem continues, write to us.",
      action: "Try again",
    },
    loading: {
      title: "Loading",
      description: "We are preparing the page.",
    },
    preview: {
      title: "View the error state",
      description: "This page checks how the error looks. The button triggers a rendering error.",
      error: "Trigger an error",
    },
  },
  newsletter: {
    invalid: "Enter a valid email address.",
    valid: "Valid address. Sending will be available soon.",
  },
  footer: {
    description:
      "A design studio that brings product and marketing teams together around clear, useful interfaces.",
    linksTitle: "Links",
    moreTitle: "More",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Stay updated on new releases, guides and case studies.",
    emailLabel: "Email address",
    emailPlaceholder: "pixi@domain.com",
    social: { linkedin: "Luilka on LinkedIn", tiktok: "Luilka on TikTok", youtube: "Luilka on YouTube" },
    subscribe: "Subscribe",
    copyright: "Copyright {year} Luilka. All rights reserved.",
    links: footerLinksEn,
    more: footerMoreEn,
  },
};

export const dictionaries: Record<Language, Dictionary> = { fr, en };
