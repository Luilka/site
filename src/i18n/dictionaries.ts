import navigationData from "@/content/navigation.json";
import detailSlugs from "@/content/details.json";
import type { Language, PageHref } from "@/types";

export type { Language, PageHref } from "@/types";

export type MenuKey = "services" | "products";

export type NavigationItem = {
  label: string;
  href: PageHref;
  menu?: MenuKey;
};

export type SectionAction = {
  label: string;
  href: PageHref;
};

export type HomeCopy = {
  prefix: string;
  design: string;
  middle: string;
  brand: string;
};

export type SectionTitles = {
  services: string;
  products: string;
  works: string;
};

export type SectionDescriptions = {
  services: string;
  products: string;
  works: string;
};

export const navigation: readonly NavigationItem[] = navigationData as readonly NavigationItem[];

export type PageKey = "about" | "services" | "products" | "works" | "blog" | "job" | "contact";

export type PageIntro = {
  eyebrow: string;
  title: string;
  description: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type Service = {
  slug: string;
  title: string;
  description: string;
  shape?: string;
};

export type NamedCard = {
  slug: string;
  name: string;
  description: string;
};

export type Work = {
  slug: string;
  name: string;
  kind: string;
  caseLabel: string;
};

export type InfoCard = {
  title: string;
  meta: string;
  description: string;
};

export type Post = InfoCard & {
  slug: string;
};

export type DropdownSubLink = {
  label: string;
  href: PageHref;
};

export type DropdownItem = {
  label: string;
  eyebrow: string;
  description: string;
  action: string;
  href: PageHref;
  image: string;
};

export type Dropdown = {
  eyebrow: string;
  title: string;
  linksTitle: string;
  items: readonly DropdownItem[];
  links: readonly DropdownSubLink[];
};

export type FooterLink = {
  label: string;
  href: PageHref | "https://github.com/Luilka/site";
};

export type Dictionary = {
  hero: string;
  section: string;
  quote: string;
  discover: string;
  switchLanguage: string;
  home: HomeCopy;
  sectionTitles: SectionTitles;
  sectionDescriptions: SectionDescriptions;
  about: readonly string[];
  contact: {
    title: string;
    description: string;
  };
  pages: Record<PageKey, PageIntro>;
  steps: readonly ProcessStep[];
  services: readonly Service[];
  products: readonly NamedCard[];
  works: readonly Work[];
  posts: readonly Post[];
  jobs: readonly InfoCard[];
  dropdowns: Record<MenuKey, Dropdown>;
  states: {
    notfound: {
      code: string;
      title: string;
      description: string;
      action: string;
    };
    error: {
      title: string;
      description: string;
      action: string;
    };
    loading: {
      title: string;
      description: string;
    };
    preview: {
      title: string;
      description: string;
      error: string;
    };
  };
  newsletter: {
    invalid: string;
    valid: string;
  };
  footer: {
    description: string;
    linksTitle: string;
    moreTitle: string;
    newsletterTitle: string;
    newsletterText: string;
    emailLabel: string;
    subscribe: string;
    copyright: string;
    links: readonly FooterLink[];
    more: readonly FooterLink[];
  };
};

type DropdownBaseItem = {
  href: PageHref;
  image: string;
};

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
      { href: "/products", image: "/dropdown-products-tala.svg" },
      { href: "/products", image: "/dropdown-products-vuga.svg" },
      { href: "/products", image: "/dropdown-products-pro.svg" },
    ],
  },
};

const dropdownDescriptions: Record<Language, Record<MenuKey, readonly string[]>> = {
  fr: {
    services: [
      "Nous observons, cadrons et testons les parcours avant l'interface.",
      "Nous dessinons des écrans clairs, avec leurs états et les mots intégrés.",
      "Nous construisons l'application jusqu'à la mise en ligne, ou seulement la partie dont vous avez besoin.",
      "Nous écrivons la page produit et les messages utiles au quotidien, seuls ou avec le reste.",
    ],
    products: [
      "Un espace pour suivre vos décisions de design et garder les équipes sur la même ligne.",
      "La voix de vos utilisateurs, centralisée et facile à consulter.",
      "Le pilotage de vos projets de design, de la première idée à la livraison.",
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
      "A space to track design decisions and keep teams on the same page.",
      "Your users' voice, gathered in one easy place.",
      "Project control from the first idea to handover.",
    ],
  },
};

type DropdownCopy = {
  eyebrow: string;
  title: string;
  linksTitle: string;
  action: string;
  labels: readonly string[];
  eyebrows: readonly string[];
  links: readonly DropdownSubLink[];
};

const dropdownCopy: Record<Language, Record<MenuKey, DropdownCopy>> = {
  fr: {
    services: {
      eyebrow: "Services",
      title: "Concevoir l'expérience, écrire le produit",
      linksTitle: "Explorer Luilka",
      action: "Découvrir le service",
      labels: ["UX Design", "UI design", "Software", "COM"],
      eyebrows: ["Comprendre", "Dessiner", "Concevoir", "Écrire"],
      links: [
        { label: "Notre approche", href: "/about" },
        { label: "Nos réalisations", href: "/works" },
        { label: "Parlons de votre projet", href: "/contact" },
      ],
    },
    products: {
      eyebrow: "Produits",
      title: "Les outils du studio",
      linksTitle: "Explorer Luilka",
      action: "Découvrir l'outil",
      labels: ["Tala", "Vuga", "Pro"],
      eyebrows: ["Décisions", "Recherche", "Projets"],
      links: [
        { label: "Tous nos produits", href: "/products" },
        { label: "Le journal", href: "/blog" },
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
      eyebrows: ["Understand", "Design", "Shape", "Write"],
      links: [
        { label: "Our approach", href: "/about" },
        { label: "Our work", href: "/works" },
        { label: "Tell us about your project", href: "/contact" },
      ],
    },
    products: {
      eyebrow: "Products",
      title: "Tools from the studio",
      linksTitle: "Explore Luilka",
      action: "Explore the tool",
      labels: ["Tala", "Vuga", "Pro"],
      eyebrows: ["Decisions", "Research", "Projects"],
      links: [
        { label: "All our products", href: "/products" },
        { label: "Journal", href: "/blog" },
        { label: "Tell us about your project", href: "/contact" },
      ],
    },
  },
};

function describedItems(
  items: readonly DropdownBaseItem[],
  descriptions: readonly string[],
  copy: DropdownCopy,
): readonly DropdownItem[] {
  return items.map((item, index) => ({
    ...item,
    label: copy.labels[index],
    eyebrow: copy.eyebrows[index],
    description: descriptions[index],
    action: copy.action,
  }));
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

const servicesFr: readonly Service[] = withSlugs(
  [
  {
    title: "UX Design",
    description:
      "Nous observons vos utilisateurs, cadrons le problème et dessinons des parcours testés avant l'interface. Livrable : parcours et prototype.",
  },
  {
    title: "UI design",
    description:
      "Nous dessinons des écrans clairs, avec leurs états et des composants accessibles. Les mots sont intégrés dès la première maquette.",
    shape: "50%",
  },
  {
    title: "Software",
    description:
      "Nous construisons l'application : interface, états et parcours jusqu'à la mise en ligne. Ce service peut aussi être commandé seul.",
    shape: "50% 50% 8px 50%",
  },
  {
    title: "COM",
    description:
      "Nous écrivons la page produit qui donne envie d'acheter, le ton et les messages utiles au quotidien. Ce service peut aussi être commandé seul.",
    shape: "50%",
  },
  ],
  detailSlugs.services,
);

const productsFr: readonly NamedCard[] = withSlugs(
  [
  {
    name: "Tala",
    description: "Un espace pour suivre vos décisions de design et garder les équipes sur la même ligne.",
  },
  {
    name: "Vuga",
    description: "La voix de vos utilisateurs, centralisée et facile à consulter.",
  },
  {
    name: "Pro",
    description: "Le pilotage de vos projets de design, de la première idée à la livraison.",
  },
  ],
  detailSlugs.products,
);

const worksFr: readonly Work[] = withSlugs(
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
);

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
    shape: "50%",
  },
  {
    title: "Software",
    description:
      "We build the app: interface, states and flows through to release. This service can also be booked on its own.",
    shape: "50% 50% 8px 50%",
  },
  {
    title: "COM",
    description:
      "We write the product page that makes people want to buy, the tone and the messages people use every day. This service can also be booked on its own.",
    shape: "50%",
  },
  ],
  detailSlugs.services,
);

const productsEn: readonly NamedCard[] = withSlugs(
  [
  {
    name: "Tala",
    description: "A space to track design decisions and keep teams on the same page.",
  },
  {
    name: "Vuga",
    description: "Your users' voice, gathered in one easy place.",
  },
  {
    name: "Pro",
    description: "Project control from the first idea to handover.",
  },
  ],
  detailSlugs.products,
);

const worksEn: readonly Work[] = withSlugs(
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
);

const footerLinksFr: readonly FooterLink[] = [
  { label: "A propos", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Réalisations", href: "/works" },
  { label: "Contact", href: "/contact" },
];

const footerMoreFr: readonly FooterLink[] = [
  { label: "Notre approche", href: "/about" },
  { label: "Nos produits", href: "/products" },
  { label: "Le journal", href: "/blog" },
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
  { label: "Journal", href: "/blog" },
];

const fr: Dictionary = {
  hero: "Du design à l'app : nous partons des utilisateurs, dessinons le produit et livrons une interface prête à construire.",
  section:
    "Notre stratégie est centrée sur l'utilisateur : nous comprenons les besoins réels avant de dessiner, puis nous livrons le design de l'app.",
  quote: "J'ai besoin d'un devis",
  discover: "Découvrir plus",
  switchLanguage: "Passer en anglais",
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
      "Trois outils nés du studio pour garder vos décisions de design, vos utilisateurs et vos projets au même endroit.",
    works:
      "Chaque projet commence par une question claire et se termine par une interface que les gens savent utiliser.",
  },
  about: [
    "Luilka fait du design to app : nous accompagnons une idée depuis la recherche utilisateur jusqu'aux écrans de l'application. Notre stratégie est centrée sur l'utilisateur, pas sur la technologie.",
    "Chaque choix, de l'identité visuelle au design system, part d'un besoin observé et se vérifie avec les gens qui utiliseront le produit.",
  ],
  contact: {
    title: "Donnons forme à votre prochaine idée.",
    description:
      "Décrivez votre besoin en quelques lignes. Nous revenons avec une première lecture et un créneau d'échange.",
  },
  pages: {
    about: {
      eyebrow: "A propos",
      title: "Un studio de design centré sur l'utilisateur",
      description:
        "Luilka réunit designers et chercheurs autour d'une méthode centrée utilisateur : observer, dessiner les parcours de l'app puis livrer des interfaces cohérentes.",
    },
    services: {
      eyebrow: "Services",
      title: "Nos services",
      description:
        "Du premier croquis au système de composants, nous accompagnons les équipes produit et marketing à chaque étape du design.",
    },
    products: {
      eyebrow: "Products",
      title: "Nos produits",
      description:
        "Trois outils nés du studio pour garder vos décisions de design, vos utilisateurs et vos projets au même endroit.",
    },
    works: {
      eyebrow: "Works",
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
      eyebrow: "Job",
      title: "Rejoignez l'équipe",
      description:
        "Nous cherchons des personnes qui aiment livrer, expliquer leurs choix et apprendre avec les autres.",
    },
    contact: {
      eyebrow: "Contact us",
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
      title: "Direction visuelle",
      description:
        "Nous définissons le langage visuel, la voix et les principes qui tiennent l'ensemble.",
    },
    {
      number: "03",
      title: "Design d'interface",
      description:
        "Nous dessinons les parcours et les écrans, puis nous les testons avec de vrais utilisateurs.",
    },
    {
      number: "04",
      title: "Livraison",
      description:
        "Nous remettons des maquettes prêtes à l'emploi et un système de composants que vos équipes peuvent utiliser.",
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
    moreTitle: "More",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Stay updated on new releases and features, guides, and case studies.",
    emailLabel: "Adresse email",
    subscribe: "S'abonner",
    copyright: "Copyright 2025, Tous droits réservés à Luilka.",
    links: footerLinksFr,
    more: footerMoreFr,
  },
};

const en: Dictionary = {
  hero: "From design to app: we start with the people who will use it, shape the product and hand over an interface ready to build.",
  section:
    "Our strategy is user-centric: we understand real needs before we draw, then we deliver the design of the app.",
  quote: "I need a quote",
  discover: "Learn more",
  switchLanguage: "Switch to French",
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
      "Three tools born in the studio to keep your design decisions, users and projects in one place.",
    works: "Every project starts with a clear question and ends with an interface people know how to use.",
  },
  about: [
    "Luilka works design to app: we take an idea from user research to the app's screens. Our strategy is user-centric, not technology-first.",
    "Every choice, from visual identity to design system, starts from an observed need and is checked with the people who will use the product.",
  ],
  contact: {
    title: "Let's shape your next idea.",
    description: "Describe your need in a few lines. We will come back with a first reading and a time to talk.",
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
        "From first sketch to component system, we support product and marketing teams at every stage of design.",
    },
    products: {
      eyebrow: "Products",
      title: "Our products",
      description:
        "Three tools born in the studio to keep your design decisions, users and projects in one place.",
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
      title: "Visual direction",
      description:
        "We define the visual language, the voice and the principles that hold it together.",
    },
    {
      number: "03",
      title: "Interface design",
      description: "We draw the flows and screens, then test them with real users.",
    },
    {
      number: "04",
      title: "Handover",
      description:
        "We deliver ready to use designs and a component system your teams can build on.",
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
    subscribe: "Subscribe",
    copyright: "Copyright 2025, All rights reserved to Luilka.",
    links: footerLinksEn,
    more: footerMoreEn,
  },
};

export const dictionaries: Record<Language, Dictionary> = { fr, en };
