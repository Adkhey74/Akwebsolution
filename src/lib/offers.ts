/**
 * Source de vérité des offres et des options à la carte.
 *
 * Avant, le tableau des offres était écrit en dur DEUX fois : dans
 * app/offres/page.tsx et dans components/PricingSection.tsx — avec en plus des
 * listes de `features` divergentes, et des champs (`features`, `target`) jamais
 * rendus côté page d'accueil. Changer un tarif obligeait à penser aux deux
 * fichiers. Tout est désormais ici.
 *
 * `price` est un nombre : le tarif d'entrée affiché sur la page d'accueil est
 * dérivé (`entryPrice`) au lieu d'être recopié.
 */

/**
 * Formule location : au lieu de payer le site en une fois, le client règle des
 * frais de mise en route réduits puis une mensualité tout compris (hébergement,
 * maintenance et petites retouches), sur une durée d'engagement.
 *
 * Aucune facturation automatique n'est branchée : ces montants ne servent qu'à
 * l'affichage, les prélèvements sont gérés à la main hors du site.
 */
export type Rental = {
  /** Frais de mise en route, en euros HT, payés une seule fois. */
  setup: number;
  /** Mensualité tout compris, en euros HT. */
  monthly: number;
  /** Durée d'engagement, en mois. */
  months: number;
  /**
   * Rachat, en euros HT, **au terme de la durée d'engagement**.
   *
   * En location, le site n'appartient jamais au client : il reste la propriété
   * d'AKWebSolution. Le racheter à la fin des `months` mois est la seule façon
   * dont la propriété change de mains — il n'y a pas de transfert automatique,
   * et pas de rachat anticipé.
   */
  buyout: number;
};

export type Offer = {
  id: "landing" | "starter" | "pro";
  badge: string | null;
  title: string;
  /** En euros, HT, point de départ de l'offre. */
  price: number;
  result: string;
  target: string;
  delivery: string;
  /**
   * Offre dont celle-ci reprend tout le contenu, s'il y en a une.
   *
   * C'est un **id**, pas un titre : la carte en dérive la clé de traduction
   * `offers.<id>Title`, donc le titre affiché suit la langue. Y écrire le titre
   * français fabriquait une clé inexistante, affichée telle quelle à l'écran
   * (« Tout ce qui est inclus dans offers.Page Vitrine RapideTitle »).
   */
  inherits: Offer["id"] | null;
  features: string[];
  /**
   * Formule location, ou `null` quand l'offre ne se vend qu'à l'achat.
   * Le sur-mesure est trop variable d'un projet à l'autre pour tenir dans un
   * forfait mensuel fixe : `pro` reste volontairement à l'achat seul.
   */
  rental: Rental | null;
};

export const offers: Offer[] = [
  {
    id: "landing",
    badge: null,
    title: "Page Vitrine Rapide",
    price: 700,
    result: "Soyez visible en ligne en moins d'une semaine, sans budget excessif.",
    target: "Idéal pour tester votre concept avant d'investir davantage",
    delivery: "5 à 7 jours ouvrés",
    inherits: null,
    features: [
      "Une page complète et soignée : présentation, services, contact",
      "Mise en page à partir d'une structure éprouvée, à vos couleurs et vos photos",
      "S'affiche parfaitement sur téléphone, tablette et ordinateur",
      "Formulaire de contact et bouton d'appel direct",
      "Référencé sur Google, mentions légales et RGPD conformes",
      "Mise en ligne, nom de domaine et hébergement configurés pour vous",
      "1 série de retouches, à demander dans les 14 jours",
    ],
    rental: { setup: 200, monthly: 79, months: 24, buyout: 500 },
  },
  {
    id: "starter",
    badge: "Populaire",
    title: "Site Vitrine Complet",
    price: 1500,
    result: "Soyez trouvé par les clients qui cherchent votre métier près de chez eux.",
    target: "Idéal pour les activités établies qui veulent attirer de nouveaux clients",
    delivery: "2 à 3 semaines",
    inherits: "landing",
    features: [
      "3 à 5 pages, dont une page dédiée par service",
      "Rendez-vous de cadrage : vos pages et votre parcours client définis ensemble",
      "Préversion en ligne : vous validez le site réel avant sa mise en ligne",
      "Référencement local travaillé : « votre métier + Annecy », données structurées",
      "Fiche Google Business créée et reliée à votre site",
      "Sections avis clients, réalisations et à propos",
      "Suivi des visites installé, sans cookie ni bandeau de consentement",
      "1er mois de maintenance offert",
      "2 séries de retouches",
    ],
    /* Rachat aligné sur le rapport entre les deux offres : le double de la mise
       en route, comme les 500 € du Page Vitrine Rapide le sont pour la sienne. */
    rental: { setup: 400, monthly: 139, months: 24, buyout: 1000 },
  },
  {
    id: "pro",
    badge: null,
    title: "Site Pro & Sur Mesure",
    price: 2500,
    result: "Un site premium qui vous démarque et donne envie de vous contacter.",
    target: "Idéal pour les projets ambitieux qui veulent marquer les esprits",
    delivery: "Selon le projet",
    inherits: "starter",
    features: [
      "Jusqu'à 8 pages entièrement personnalisées",
      "Version anglaise du site incluse",
      "Animations fluides pour une expérience haut de gamme",
      "Section blog ou actualités — vos articles publiés pour vous",
      "Optimisation SEO technique complète : structure, vitesse, données structurées",
      "1 mois d'accompagnement après la mise en ligne",
    ],
    rental: null,
  },
];

/**
 * Maintenance mensuelle vendue à part, en complément d'un achat.
 *
 * Centralisée ici pour la même raison que les offres : le tarif est affiché à
 * trois endroits (le bloc Maintenance, les cartes d'offres en mode Achat, et le
 * JSON-LD envoyé à Google). Le recopier, c'était repartir vers l'incohérence que
 * ce fichier a justement supprimée.
 */
export const maintenance = {
  /** Sans engagement, résiliable à tout moment. */
  flex: 80,
  /** Avec engagement 1 an. */
  annual: 70,
} as const;

/** Tarif de maintenance le plus bas — celui annoncé comme point d'entrée. */
export const maintenanceEntryPrice = Math.min(maintenance.flex, maintenance.annual);

/**
 * Heures de modifications comprises chaque mois — en maintenance comme en
 * location.
 *
 * Ce plafond est volontaire. La location annonçait des retouches « sans
 * supplément », donc sans limite : à 2 h par mois et par client, vingt clients
 * suffisaient à absorber une semaine de travail non facturée. La maintenance,
 * elle, était plafonnée depuis le départ ; les deux offres s'alignent désormais.
 */
export const monthlyChangeHours = 2;

/**
 * Ce que l'engagement 1 an fait économiser sur douze mois.
 * Dérivé plutôt qu'écrit dans les traductions : le montant y était en dur, en
 * français comme en anglais, et une hausse de tarif l'aurait rendu faux dans les
 * deux langues sans que rien ne le signale.
 */
export const maintenanceAnnualSaving = (maintenance.flex - maintenance.annual) * 12;

/** Offres proposées en location, dans l'ordre d'affichage. */
export const rentalOffers = offers.filter(
  (o): o is Offer & { rental: Rental } => o.rental !== null
);

export const options = [
  { label: "Page supplémentaire", price: "250 €" },
  {
    label: "Version anglaise du site",
    price: "à partir de 490 €",
    note: "Idéal pour l'hôtellerie, la restauration, les activités et les transferts autour du lac et vers Genève.",
  },
  { label: "Réservation ou prise de rendez-vous en ligne", price: "à partir de 390 €" },
  { label: "Vos avis Google affichés automatiquement sur le site", price: "290 €" },
  { label: "Rédaction de vos textes", price: "à partir de 300 €" },
];

/** Tarif d'entrée, dérivé des offres — jamais recopié à la main. */
export const entryPrice = Math.min(...offers.map((o) => o.price));

/**
 * Format français avec espace fine insécable (U+202F) comme séparateur de
 * milliers. Écrit à la main plutôt qu'avec `toLocaleString` : le résultat est
 * identique côté serveur et côté client, donc aucun risque d'écart d'hydratation
 * si l'ICU de Node diffère de celui du navigateur.
 */
export function formatEuros(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
