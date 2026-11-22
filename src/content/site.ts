import navigationData from "@/content/navigation.json";

export type Language = "fr" | "en";

export type PageHref =
  | "/about"
  | "/services"
  | "/products"
  | "/works"
  | "/blog"
  | "/job"
  | "/contact";

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
  badge: string;
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
};

export type Service = {
  title: string;
  description: string;
  shape?: string;
};

export type NamedCard = {
  name: string;
  description: string;
};

export type Work = {
  name: string;
  kind: string;
  caseLabel: string;
};

export type InfoCard = {
  title: string;
  meta: string;
  description: string;
};

export type DropdownItem = {
  label: string;
  description: string;
  href: PageHref;
  image: string;
};

export type Dropdown = {
  items: readonly DropdownItem[];
};

export type FooterLink = {
  label: string;
  href: PageHref | "https://github.com/Luilka/site";
};

export type Dictionary = {
  process: string;
  hero: string;
  product: string;
  section: string;
  quote: string;
  discover: string;
  home: HomeCopy;
  sectionTitles: SectionTitles;
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
  posts: readonly InfoCard[];
  jobs: readonly InfoCard[];
  dropdowns: Record<MenuKey, Dropdown>;
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
  label: string;
  href: PageHref;
  image: string;
};

const dropdownBase: Record<MenuKey, { items: readonly DropdownBaseItem[] }> = {
  services: {
    items: [
      { label: "Design", href: "/services", image: "/dropdown-services-design.svg" },
      { label: "Software", href: "/services", image: "/dropdown-services-software.svg" },
      { label: "Maintenance", href: "/services", image: "/dropdown-services-maintenance.svg" },
      { label: "Devops", href: "/services", image: "/dropdown-services-devops.svg" },
    ],
  },
  products: {
    items: [
      { label: "Tala", href: "/products", image: "/dropdown-products-tala.svg" },
      { label: "Vuga", href: "/products", image: "/dropdown-products-vuga.svg" },
      { label: "Pro", href: "/products", image: "/dropdown-products-pro.svg" },
    ],
  },
};

const dropdownDescriptions: Record<Language, Record<MenuKey, readonly string[]>> = {
  fr: {
    services: [
      "Interfaces claires, utiles et adaptées à chaque écran.",
      "Des outils sur mesure qui simplifient le travail de vos équipes.",
      "Un suivi attentif pour garder vos produits rapides et fiables.",
      "Des livraisons régulières et une infrastructure que vous comprenez.",
    ],
    products: [
      "Un espace simple pour suivre vos activités et vos décisions.",
      "La voix de vos clients, centralisée et facile à consulter.",
      "Le pilotage de vos projets, de la première idée à la livraison.",
    ],
  },
  en: {
    services: [
      "Clear, useful interfaces shaped for every screen.",
      "Custom tools that make daily work simpler for your teams.",
      "Careful support that keeps your products fast and reliable.",
      "Regular releases and infrastructure your team can understand.",
    ],
    products: [
      "A simple space to track your activities and decisions.",
      "Your customers' voice, gathered in one easy place.",
      "Project control from the first idea to delivery.",
    ],
  },
};

function describedItems(
  items: readonly DropdownBaseItem[],
  descriptions: readonly string[],
): readonly DropdownItem[] {
  return items.map((item, index) => ({ ...item, description: descriptions[index] }));
}

function dropdownsFor(language: Language): Record<MenuKey, Dropdown> {
  return {
    services: {
      items: describedItems(dropdownBase.services.items, dropdownDescriptions[language].services),
    },
    products: {
      items: describedItems(dropdownBase.products.items, dropdownDescriptions[language].products),
    },
  };
}

const services: readonly Service[] = [
  {
    title: "Design",
    description: "Grow with your users and offer fresh experiences optimized for desktop and mobile.",
  },
  {
    title: "Software",
    description: "Cut through the confusion and clean up the clutter with expert help.",
    shape: "50%",
  },
  {
    title: "Maintenance",
    description: "Personalized experiences get you more engagement and (very) satisfied customers",
    shape: "50% 50% 8px 50%",
  },
  {
    title: "Devops",
    description: "No matter where you are, we onboard fast and make an impact, on time and on budget",
    shape: "50%",
  },
];

const products: readonly NamedCard[] = [
  { name: "Tala", description: "" },
  { name: "Vuga", description: "" },
  { name: "Pro", description: "" },
];

const workNames = ["Yano", "Vox Congo", "AyLen", "AyLen"] as const;

function makeWorks(kind: string, caseLabel: string): readonly Work[] {
  return workNames.map((name) => ({ name, kind, caseLabel }));
}

const footerLinks: readonly FooterLink[] = [
  { label: "A-propos", href: "/about" },
  { label: "Evénements", href: "/blog" },
  { label: "Formations", href: "/job" },
  { label: "Communauté", href: "/contact" },
];

const footerMore: readonly FooterLink[] = [
  { label: "Community", href: "/contact" },
  { label: "Governance", href: "/about" },
  { label: "GitHub", href: "https://github.com/Luilka/site" },
];

const fr: Dictionary = {
  process:
    "PossaCode a déjà accompagné plus de 300 développeurs grâce à ses ateliers, formations et rencontres techniques.",
  hero:
    "Nous aidons les responsables marketing et produits à créer des marques percutantes, à engager les utilisateurs et à stimuler la croissance.",
  product:
    "Nous aidons les responsables marketing et produits à créer des marques percutantes, à engager les utilisateurs et à stimuler la croissance.",
  section:
    "Nous proposons une gamme complète de solutions numériques pour répondre à vos besoins spécifiques.",
  quote: "J'ai besoin d'un devis",
  discover: "Découvrir plus",
  home: {
    badge: "Transformation",
    prefix: "Agence de",
    design: "design",
    middle: "reliant produit et",
    brand: "marque",
  },
  sectionTitles: {
    services: "Nos services",
    products: "Produits",
    works: "Réalisations",
  },
  about: [
    "PossaCode est une association qui forme et réunit les développeurs du Congo et d'Afrique à travers des hackathons, meetups et formations techniques.",
    "Notre mission : faire émerger la prochaine génération de talents tech africains.",
  ],
  contact: {
    title: "Ici, on s'élève par le code. Ne grandissez plus seul.",
    description:
      "Nous aidons les responsables marketing et produits à créer des marques percutantes, à engager les utilisateurs et",
  },
  pages: {
    about: {
      eyebrow: "A propos",
      title: "Une communauté qui fait grandir le code",
      description:
        "PossaCode réunit les développeurs du Congo et d'Afrique autour de la formation, des rencontres techniques et de projets concrets.",
    },
    services: {
      eyebrow: "Services",
      title: "Nos services",
      description:
        "Du design au déploiement, nous accompagnons les équipes produit et marketing à chaque étape de leur cycle de vie numérique.",
    },
    products: {
      eyebrow: "Products",
      title: "Nos produits",
      description:
        "Trois produits pensés pour rendre les équipes plus rapides, mieux organisées et plus proches de leurs utilisateurs.",
    },
    works: {
      eyebrow: "Works",
      title: "Nos réalisations",
      description:
        "Des projets livrés avec des partenaires qui ont accepté de mesurer l'impact de chaque décision de design et de code.",
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
    { number: "01", title: "Cadrage" },
    { number: "02", title: "Conception" },
    { number: "03", title: "Developpement" },
    { number: "04", title: "Maintenance" },
  ],
  services,
  products,
  works: makeWorks("Particulier", "Cas d'étude"),
  posts: [
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
      title: "Devops",
      meta: "Freelance",
      description:
        "Vous simplifiez les pipelines de livraison et vous aidez les équipes à observer ce qui se passe en production.",
    },
  ],
  dropdowns: dropdownsFor("fr"),
  newsletter: {
    invalid: "Entrez une adresse email valide.",
    valid: "Adresse valide. L'envoi sera disponible prochainement.",
  },
  footer: {
    description:
      "Une communauté qui connecte les développeurs pour collaborer, se former et s'inspirer mutuellement.",
    linksTitle: "Liens",
    moreTitle: "More",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Stay updated on new releases and features, guides, and case studies.",
    emailLabel: "Adresse email",
    subscribe: "S'abonner",
    copyright: "Copyright 2025, Tous droits réservés à Luilka.",
    links: footerLinks,
    more: footerMore,
  },
};

const en: Dictionary = {
  process:
    "PossaCode has already supported more than 300 developers through workshops, training sessions and technical meetups.",
  hero: "We help marketing and product leaders build distinctive brands, engage users and drive growth.",
  product: "We help marketing and product leaders build distinctive brands, engage users and drive growth.",
  section: "We offer a full range of digital solutions to answer your specific needs.",
  quote: "I need a quote",
  discover: "Learn more",
  home: {
    badge: "Transformation",
    prefix: "Creative",
    design: "design",
    middle: "studio linking product and",
    brand: "brand",
  },
  sectionTitles: {
    services: "Our services",
    products: "Products",
    works: "Works",
  },
  about: [
    "PossaCode is an association that trains and brings together developers from Congo and Africa through hackathons, meetups and technical training.",
    "Our mission is to bring forth the next generation of African tech talent.",
  ],
  contact: {
    title: "Here, we rise through code. Stop growing alone.",
    description: "We help marketing and product leaders build distinctive brands, engage users and",
  },
  pages: {
    about: {
      eyebrow: "About",
      title: "A community that grows code",
      description:
        "PossaCode brings together developers from Congo and Africa around training, technical meetups and concrete projects.",
    },
    services: {
      eyebrow: "Services",
      title: "Our services",
      description:
        "From design to deployment, we support product and marketing teams at every stage of their digital lifecycle.",
    },
    products: {
      eyebrow: "Products",
      title: "Our products",
      description:
        "Three products designed to make teams faster, better organised and closer to their users.",
    },
    works: {
      eyebrow: "Works",
      title: "Our work",
      description:
        "Projects delivered with partners who agreed to measure the impact of every design and code decision.",
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
    { number: "01", title: "Scoping" },
    { number: "02", title: "Design" },
    { number: "03", title: "Development" },
    { number: "04", title: "Maintenance" },
  ],
  services,
  products,
  works: makeWorks("Private", "Case study"),
  posts: [
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
      title: "Devops",
      meta: "Freelance",
      description:
        "You simplify delivery pipelines and help teams observe what happens in production.",
    },
  ],
  dropdowns: dropdownsFor("en"),
  newsletter: {
    invalid: "Enter a valid email address.",
    valid: "Valid address. Sending will be available soon.",
  },
  footer: {
    description:
      "A community that connects developers to collaborate, learn and inspire each other.",
    linksTitle: "Links",
    moreTitle: "More",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterText: "Stay updated on new releases, guides and case studies.",
    emailLabel: "Email address",
    subscribe: "Subscribe",
    copyright: "Copyright 2025, All rights reserved to Luilka.",
    links: footerLinks,
    more: footerMore,
  },
};

export const dictionaries: Record<Language, Dictionary> = { fr, en };
