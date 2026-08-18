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
  /**
   * Durée d'engagement **minimale**, en mois — et non la durée totale du
   * contrat : passé ce terme, la location continue au mois le mois.
   *
   * Ramenée de 24 à 12 mois le 18/08/2026. Le coût du site est couvert bien
   * avant le terme (dès le 7ᵉ mois sur `landing`, le 8ᵉ sur `starter`) : les
   * mois suivants étaient du revenu, pas de la sécurité. Surtout, à 24 mois la
   * location finissait par coûter **plus cher** au client qu'un achat suivi de
   * la maintenance — le croisement tombe au 22ᵉ mois sur `landing` et au
   * 16ᵉ sur `starter`. L'engagement emmenait donc le client au-delà du point
   * où sa propre formule se retourne contre lui, ce qui ne se défend pas en
   * rendez-vous dès qu'il fait le calcul. À 12 mois, la location lui revient
   * encore moins cher que l'achat (−302 € et −272 €).
   *
   * ⚠️ Ce qui se passe APRÈS ce terme est une clause contractuelle, pas un
   * chiffre : « sans engagement, un mois de préavis ». Elle est écrite en
   * toutes lettres dans `offers.rentalAfterCommitment`, en FR et en EN — la
   * mettre en donnée produirait une grammaire fausse dans l'une des deux
   * langues pour une valeur qui ne bougera pas. Si le préavis change un jour,
   * ce sont ces deux clés qu'il faut aligner, et elles seules.
   */
  months: number;
  /**
   * Rachat, en euros HT, **à partir du terme de la durée d'engagement**.
   *
   * En location, le site n'appartient jamais au client : il reste la propriété
   * d'AKWebSolution. Le racheter est la seule façon dont la propriété change de
   * mains — il n'y a pas de transfert automatique, et pas de rachat anticipé.
   *
   * Le montant est resté le même quand l'engagement est passé de 24 à 12 mois :
   * la porte de sortie s'ouvre donc un an plus tôt, au même prix. Le baisser
   * aurait fait racheter tout le monde au 12ᵉ mois, ce qui supprimerait le
   * revenu récurrent que cette formule existe précisément pour créer.
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
    price: 900,
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
      "Mise en ligne, nom de domaine et hébergement mis en place pour vous",
      "1 série de retouches, à demander dans les 14 jours",
    ],
    rental: { setup: 250, monthly: 99, months: 12, buyout: 650 },
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
    /* Rachat aligné sur le rapport entre les deux offres : environ deux fois et
       demie la mise en route, comme les 650 € du Page Vitrine Rapide le sont
       pour la sienne. */
    rental: { setup: 400, monthly: 139, months: 12, buyout: 1000 },
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
  flex: 90,
  /** Avec engagement 1 an. */
  annual: 70,
} as const;

/** Tarif de maintenance le plus bas — celui annoncé comme point d'entrée. */
export const maintenanceEntryPrice = Math.min(maintenance.flex, maintenance.annual);

/**
 * Socle technique : hébergement, nom de domaine et certificat de sécurité.
 *
 * Ce qu'il corrige : l'offre promettait « nom de domaine et hébergement
 * configurés pour vous » sans jamais dire qui paie ensuite. Le client le
 * découvrait après coup — et un achat ne produisait aucun revenu récurrent
 * tant qu'il refusait la maintenance.
 *
 * Il sert aussi d'ancre sous la maintenance : l'écart avec l'engagement 1 an
 * n'est plus que de 35 €/mois pour 2 h de travail mensuel, ce qui rend la
 * montée d'un cran évidente. Isolé, ce palier coûterait de l'argent ; en bas
 * de l'échelle, il en rapporte.
 */
export const hosting = {
  /** Prix d'appel, affiché au mois — c'est le repère du client. */
  monthly: 35,
  /**
   * Ce qui est réellement encaissé, en une fois, par année.
   *
   * Aucune facturation automatique n'est branchée sur le site : douze
   * prélèvements de 35 € par client, ce sont douze relances à faire à la main.
   * Deux mois d'écart avec le mensuel × 12 (420 €) : l'annuel est la formule
   * avantageuse, et c'est celle qui est vendue.
   */
  yearly: 390,
  /**
   * La première année est-elle comprise dans le prix d'achat du site ?
   *
   * **Non depuis le 18/08/2026** — décidé par Adil, au lendemain de la mise en
   * place du socle. Le socle se facture donc dès la signature, dans les mêmes
   * termes que les années suivantes : 390 € par an.
   *
   * ⚠️ Ce que ça change et qu'il faut assumer à l'oral : le ticket d'entrée
   * d'une Page Vitrine Rapide passe de 900 € à **1 290 €**. C'est exactement
   * l'objection que la formule location est censée lever — la première version
   * de ce champ existait pour l'éviter. Le drapeau est conservé plutôt que
   * supprimé pour que le retour en arrière tienne en une ligne.
   *
   * Il pilote le badge « 1ʳᵉ année incluse » du palier 1 (`AfterLaunch.tsx`),
   * qui n'est donc plus rendu. La clé `afterLaunch.hostingBadge` reste définie
   * dans les deux langues pour la même raison.
   */
  firstYearIncluded: false,
} as const;

/**
 * Contenu éditorial publié pour le client : des articles qui répondent aux
 * questions que ses clients tapent dans Google.
 *
 * Vendu en **pack** et non en abonnement, volontairement : le référencement ne
 * produit rien avant trois à six mois. Un abonnement sans engagement se fait
 * résilier au deuxième mois par un client qui « ne voit rien venir » — on a
 * alors travaillé pour rien, et il en conclut que le référencement ne marche
 * pas. Le pack impose la durée que la méthode exige, et se facture en une fois.
 */
export const content = {
  /** Nombre d'articles compris dans le pack. */
  packArticles: 6,
  /** Prix du pack, en euros HT. */
  packPrice: 990,
  /** Article acheté seul, hors pack. */
  unitPrice: 190,
  /**
   * Ajout d'une section blog au site, pour les offres qui n'en ont pas — seul
   * le Site Pro en comprend une. Prix volontairement bas : c'est la porte
   * d'entrée du pack d'articles, pas un poste de marge.
   */
  blogSetup: 390,
} as const;

/** Prix à l'article dans le pack — dérivé, pour ne pas avoir à le recalculer. */
export const contentPackUnitPrice = Math.round(content.packPrice / content.packArticles);

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
