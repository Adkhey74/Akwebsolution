/**
 * Source de vérité des études de cas (pages /projets/[slug]).
 * Les "results" décrivent des livrables/résultats concrets — remplace-les
 * par de vraies métriques chiffrées quand tu les as (ex. "+30 % de réservations").
 */

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  category: string;
  sector: string;
  year: string;
  location?: string;
  url?: string;
  summary: string;
  challenge: string;
  solution: string[];
  results: string[];
  tags: string[];
  techs: string[];
  cover: { src: string; alt: string };
  images: { src: string; alt: string }[];
  metaTitle: string;
  metaDescription: string;
};

export const projects: CaseStudy[] = [
  {
    slug: "orbitgroup",
    title: "Orbit Group",
    client: "Orbit Group — Sécurité & mobilité de dirigeants",
    category: "Site vitrine premium",
    sector: "Protection rapprochée & mobilité (executive protection)",
    year: "2026",
    location: "International",
    url: undefined,
    summary:
      "Site vitrine premium et confidentiel pour un partenaire de sécurité et de mobilité au service des family offices, dirigeants et grands principaux. Design sombre, discret et haut de gamme, couverture internationale et prise de contact confidentielle.",
    challenge:
      "S'adresser à une clientèle très exigeante (family offices, dirigeants) exige d'inspirer une confiance absolue et de dégager du prestige, tout en restant d'une discrétion totale. Le site devait présenter les services (protection, mobilité), afficher une présence internationale crédible et offrir un canal de contact confidentiel — sans jamais exposer d'informations sensibles, et avec un rendu à la hauteur d'un positionnement d'élite.",
    solution: [
      "Direction artistique sombre, sobre et luxueuse, qui traduit discrétion et précision opérationnelle.",
      "Structure claire : À propos, Services, Couverture, Réseau et Contact.",
      "Parcours de « demande confidentielle » dédié, mis en avant dès l'en-tête.",
      "Présence internationale matérialisée par une carte et des coordonnées (Paris, Genève, Nice, Monaco, Londres…).",
      "Animations fluides et haut de gamme, site rapide et 100 % responsive.",
    ],
    results: [
      "Une image en ligne à la hauteur d'un positionnement premium et confidentiel.",
      "Un canal de demande confidentielle clair et rassurant.",
      "Une couverture internationale mise en valeur.",
    ],
    tags: ["Sécurité", "Site vitrine premium", "Corporate", "Mobilité"],
    techs: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    cover: { src: "/images/OrbitGroup/hero.webp", alt: "Orbit Group — page d'accueil du site" },
    images: [
      { src: "/images/OrbitGroup/hero.webp", alt: "Orbit Group — page d'accueil" },
      { src: "/images/OrbitGroup/services.png", alt: "Orbit Group — services" },
      { src: "/images/OrbitGroup/what-sets-us.png", alt: "Orbit Group — ce qui les distingue" },
      { src: "/images/OrbitGroup/demaindingenvironment.webp", alt: "Orbit Group — environnements exigeants" },
      { src: "/images/OrbitGroup/map.png", alt: "Orbit Group — couverture internationale" },
      { src: "/images/OrbitGroup/joinus.webp", alt: "Orbit Group — recrutement" },
      { src: "/images/OrbitGroup/contact.png", alt: "Orbit Group — contact confidentiel" },
    ],
    metaTitle: "Étude de cas : site vitrine premium — Orbit Group",
    metaDescription:
      "Création d'un site vitrine premium et confidentiel pour Orbit Group, partenaire de sécurité et de mobilité de dirigeants : design sombre haut de gamme, couverture internationale. Étude de cas AKWebSolution.",
  },
  {
    slug: "kabuki",
    title: "Kabuki",
    client: "Kabuki — Restaurant japonais",
    category: "Site vitrine",
    sector: "Restauration",
    year: "2025",
    location: "France",
    url: undefined,
    summary:
      "Site vitrine pour un restaurant japonais : une carte appétissante, les incontournables mis en avant et la réservation en ligne, le tout dans une ambiance élégante et responsive.",
    challenge:
      "Le restaurant n'avait pas de présence en ligne à la hauteur de sa cuisine. Il fallait un site qui donne envie dès la première seconde, présente clairement le menu, mette en avant les plats signatures et permette de réserver sans friction — accessible aussi bien sur mobile qu'en salle.",
    solution: [
      "Design sur mesure, sombre et raffiné, qui reflète l'ambiance du restaurant.",
      "Page menu structurée et lisible, avec les incontournables mis en avant.",
      "Réservation en ligne intégrée directement dans le parcours.",
      "100 % responsive — pensé mobile d'abord, car la majorité des recherches restaurant se font sur téléphone.",
      "Bases SEO local pour être trouvé sur « restaurant japonais » dans sa zone.",
    ],
    results: [
      "Une vitrine en ligne professionnelle, à l'image de la cuisine.",
      "Réservation en ligne disponible 24h/24.",
      "Site rapide, visible sur Google dès le lancement.",
    ],
    tags: ["Restaurant", "Site vitrine", "Réservation", "Menu"],
    techs: ["Next.js", "React", "Tailwind CSS"],
    cover: { src: "/images/Kabuki/Acceuil.webp", alt: "Kabuki — page d'accueil du site" },
    images: [
      { src: "/images/Kabuki/Acceuil.webp", alt: "Kabuki — page d'accueil" },
      { src: "/images/Kabuki/Menu.png", alt: "Kabuki — le menu" },
      { src: "/images/Kabuki/incontournable.png", alt: "Kabuki — les incontournables" },
      { src: "/images/Kabuki/réservation.png", alt: "Kabuki — réservation en ligne" },
    ],
    metaTitle: "Étude de cas : site vitrine pour restaurant — Kabuki",
    metaDescription:
      "Création d'un site vitrine pour un restaurant japonais : menu, réservation en ligne, design élégant et responsive. Étude de cas AKWebSolution.",
  },
  {
    slug: "herntaxi",
    title: "HernTaxi",
    client: "HernTaxi — Société de taxi",
    category: "Site vitrine multi-pages",
    sector: "Transport de personnes",
    year: "2025",
    location: "Savoie",
    url: "https://herntaxi.fr",
    summary:
      "Site vitrine multi-pages pour une société de taxi en Savoie : présentation des services (réservation, transferts vers les stations de ski, transport CPAM), pages dédiées et référencement local soigné.",
    challenge:
      "L'activité couvre plusieurs prestations très différentes (courses classiques, transferts stations de ski, transport médical CPAM). Il fallait une structure claire, une page par service pour bien se référencer, et un site qui inspire confiance à des clients pressés, souvent sur mobile.",
    solution: [
      "Architecture multi-pages avec une page dédiée par prestation (mieux référencée qu'une page unique).",
      "Mise en avant de la réservation et des coordonnées à chaque étape.",
      "Contenu et structure optimisés pour le SEO local (recherches « taxi » + zone).",
      "Design responsive et rapide, pensé pour une prise de décision immédiate.",
    ],
    results: [
      "Chaque service dispose de sa propre page, ciblée pour Google.",
      "Parcours de réservation clair et accessible sur mobile.",
      "Site en ligne : herntaxi.fr.",
    ],
    tags: ["Site vitrine", "Multi-pages", "SEO", "Responsive"],
    techs: ["Next.js", "React", "Tailwind CSS"],
    cover: { src: "/images/herntaxi/acceuil-new.webp", alt: "HernTaxi — page d'accueil du site" },
    images: [
      { src: "/images/herntaxi/acceuil-new.webp", alt: "HernTaxi — page d'accueil" },
      { src: "/images/herntaxi/vehicule.webp", alt: "HernTaxi — les véhicules" },
      { src: "/images/herntaxi/reservations.png", alt: "HernTaxi — réservation" },
      { src: "/images/herntaxi/stationdeski.webp", alt: "HernTaxi — transferts stations de ski" },
      { src: "/images/herntaxi/cpamtaxi.webp", alt: "HernTaxi — transport CPAM" },
    ],
    metaTitle: "Étude de cas : site vitrine pour société de taxi — HernTaxi",
    metaDescription:
      "Création d'un site vitrine multi-pages pour une société de taxi en Savoie : pages services, SEO local, réservation. Étude de cas AKWebSolution.",
  },
  {
    slug: "thermochrono",
    title: "ThermoChrono",
    client: "ThermoChrono — Boutique en ligne",
    category: "Site e-commerce",
    sector: "E-commerce",
    year: "2025",
    location: "France",
    url: "https://thermochrono.fr",
    summary:
      "Boutique e-commerce de gourdes connectées affichant la température en temps réel : catalogue produits, panier, paiement sécurisé (CB, Apple Pay) et livraison rapide.",
    challenge:
      "Lancer une vraie boutique en ligne autour d'un produit innovant : présenter le produit de façon désirable, rassurer sur le paiement, et proposer un tunnel d'achat fluide qui convertit — sans intermédiaire ni commission.",
    solution: [
      "Boutique complète : catalogue, fiches produit soignées, panier et tunnel de commande.",
      "Paiement en ligne sécurisé (Visa, Mastercard, Apple Pay).",
      "Fiches produit orientées conversion, mise en avant de la valeur du produit.",
      "Design responsive et rapide, bases SEO pour attirer du trafic.",
    ],
    results: [
      "Boutique opérationnelle 24h/24, vente en direct sans intermédiaire.",
      "Tunnel d'achat fluide et paiement sécurisé.",
      "Site en ligne : thermochrono.fr.",
    ],
    tags: ["E-commerce", "Paiement sécurisé", "Responsive", "SEO"],
    techs: ["Next.js", "React", "Tailwind CSS"],
    cover: { src: "/images/thermochrono/acceuil.webp", alt: "ThermoChrono — page d'accueil de la boutique" },
    images: [
      { src: "/images/thermochrono/acceuil.webp", alt: "ThermoChrono — page d'accueil" },
      { src: "/images/thermochrono/nosproduits.png", alt: "ThermoChrono — nos produits" },
      { src: "/images/thermochrono/produits.png", alt: "ThermoChrono — fiche produit" },
      { src: "/images/thermochrono/panier.png", alt: "ThermoChrono — panier" },
    ],
    metaTitle: "Étude de cas : site e-commerce — ThermoChrono",
    metaDescription:
      "Création d'une boutique e-commerce : catalogue, panier, paiement sécurisé, design responsive. Étude de cas AKWebSolution.",
  },
];

export function getProject(slug: string): CaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
