import type { Locale } from "./i18n/translations";

/**
 * Avis clients affichés sur l'accueil — écrits en dur depuis le 10/09/2026.
 *
 * Jusque-là, ils étaient demandés chaque jour à l'API Google Places. Adil a
 * choisi de les figer ici : plus de clé d'API, plus d'appel facturé, et un
 * accueil de nouveau 100 % statique. Contrepartie : **un nouvel avis sur la
 * fiche n'apparaît pas tout seul** — il faut l'ajouter à `REVIEWS` et mettre
 * `FICHE` à jour.
 *
 * ⚠️ Les règles, elles, ne changent pas :
 *
 * 1. **Uniquement de vrais avis, recopiés depuis la fiche Google.** Trois
 *    témoignages de démonstration vivaient autrefois en dur dans le code, dont
 *    un signé d'une cliente qui n'existe pas. Publier un avis inventé est une
 *    pratique commerciale trompeuse (art. L121-2 du code de la consommation).
 *    Écrire en dur ne veut pas dire écrire soi-même.
 * 2. **Un avis retiré de la fiche est retiré d'ici.** L'avis de Thermo Chrono
 *    (19/08/2026) n'y figurait plus au relevé du 10/09 : il n'est donc pas
 *    repris. Le remettre seulement s'il réapparaît sur Google.
 * 3. **L'attribution reste** : nom de l'auteur et lien vers l'avis d'origine.
 * 4. **Pas de photo d'auteur** : elle ferait charger une image depuis
 *    `googleusercontent.com`, donc l'IP du visiteur transmise à un tiers.
 */

/** Fiche Google Business d'AKWebSolution — donnée publique, pas un secret. */
export const GOOGLE_PLACE_ID = "ChIJJyAus4Cbi0cRA6LlAnklpgY";

/** Lien vers la fiche complète (format officiel de lien par Place ID). */
export const GOOGLE_PLACE_URL = `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`;

/** Note et nombre d'avis de la fiche, tels que relevés — à tenir à jour à la main. */
const FICHE = { rating: 5, count: 1, releveLe: "2026-09-10" };

type StoredReview = {
  id: string;
  author: string;
  rating: number;
  /** Langue dans laquelle le client a écrit. */
  original: Locale;
  /**
   * Texte par langue. Celui de la langue d'origine est la parole du client ;
   * l'autre est la traduction fournie par Google, signalée comme telle.
   * Seuls les espaces ont été normalisés (« internet . » → « internet. »).
   */
  text: Record<Locale, string>;
  /** Mois de publication, écrit en toutes lettres : une ancienneté relative
   *  (« il y a 2 semaines ») se périmerait dès le lendemain. */
  date: Record<Locale, string>;
  publishedAt: string;
  url: string;
};

const REVIEWS: StoredReview[] = [
  {
    id: "hern-taxi-2026-08-01",
    author: "HERN TAXI",
    rating: 5,
    original: "fr",
    text: {
      fr: "Très professionnel dans la création et gestion de site internet. Je recommande",
      en: "Highly professional in website creation and management. I recommend them.",
    },
    date: { fr: "août 2026", en: "August 2026" },
    publishedAt: "2026-08-01",
    url: "https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT2xoWFVsVkdaM0pPVDBsdFoyTnBVRUk1YzI1VWIwRRAB!2m1!1s0x478b9b80b32e2027:0x6a6257902e5a203",
  },
];

export type GoogleReview = {
  id: string;
  author: string;
  rating: number;
  text: string;
  /** Vrai quand le texte affiché est une traduction automatique de Google. */
  translated: boolean;
  publishedAt: string;
  /** Mois de publication, dans la langue de la page. */
  age: string;
  /** Lien vers l'avis sur Google — l'attribution. */
  url: string;
};

export type GoogleReviews = {
  /** Note moyenne de la fiche. */
  rating: number;
  /** Nombre total d'avis sur la fiche. */
  count: number;
  reviews: GoogleReview[];
};

/**
 * En dessous de ce nombre, la section entière est masquée. Choix d'Adil
 * (10/09/2026) : un avis unique fait plus « section vide » que preuve sociale.
 * La section réapparaît toute seule dès qu'un deuxième avis est ajouté à
 * `REVIEWS` — rien d'autre à toucher.
 */
const MIN_REVIEWS_TO_SHOW = 2;

/** Les avis dans la langue de la page ; `null` s'il n'y en a pas assez (section masquée). */
export function getReviews(locale: Locale): GoogleReviews | null {
  if (REVIEWS.length < MIN_REVIEWS_TO_SHOW) return null;

  return {
    rating: FICHE.rating,
    count: FICHE.count,
    reviews: REVIEWS.map((review) => ({
      id: review.id,
      author: review.author,
      rating: review.rating,
      text: review.text[locale],
      translated: review.original !== locale,
      publishedAt: review.publishedAt,
      age: review.date[locale],
      url: review.url,
    })),
  };
}
