/**
 * Configuration des langues et fabrication des URLs.
 *
 * Le français est servi à la RACINE (`/offres`), l'anglais sous préfixe
 * (`/en/offres`). Ce n'est pas un choix esthétique : les URLs françaises sont
 * celles qui sont déjà indexées et positionnées sur Google. Les préfixer
 * (`/fr/offres`) aurait voulu dire rediriger tout le site existant et repartir
 * de zéro sur le référencement acquis.
 *
 * Toute construction d'URL interne passe par `localePath` — c'est la seule
 * chose qui garantit qu'un lien cliqué depuis l'anglais reste en anglais.
 */

import type { Locale } from "./translations";

export const LOCALES = ["fr", "en"] as const satisfies readonly Locale[];

/** Langue sans préfixe d'URL, et langue de repli des traductions. */
export const DEFAULT_LOCALE: Locale = "fr";

export const BASE_URL = "https://akwebsolutions.fr";

/** Codes hreflang. `fr-FR` plutôt que `fr` : le ciblage est explicitement la France. */
export const HREFLANG: Record<Locale, string> = {
  fr: "fr-FR",
  en: "en",
};

/** Locales au format OpenGraph (`og:locale` n'accepte pas `fr-FR`). */
export const OG_LOCALE: Record<Locale, string> = {
  fr: "fr_FR",
  en: "en_GB",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/**
 * Préfixe un chemin interne de la langue voulue.
 *
 * Les chemins passés en entrée sont toujours écrits « en français », c'est-à-dire
 * tels qu'ils existent à la racine (`/offres`, `/#contact`) — c'est la forme
 * qu'on lit dans le JSX. La fonction ne fait que poser le préfixe.
 *
 *   localePath("fr", "/offres")   → "/offres"
 *   localePath("en", "/offres")   → "/en/offres"
 *   localePath("en", "/")         → "/en"
 *   localePath("en", "/#contact") → "/en#contact"
 */
export function localePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) return path;

  const prefix = `/${locale}`;

  // Racine et ancres/paramètres de la racine : on retire la barre oblique,
  // sinon on produirait « /en/#contact » — qui fonctionne, mais donne une
  // canonique différente de « /en » pour la même page.
  if (path === "/") return prefix;
  if (path.startsWith("/#") || path.startsWith("/?")) return `${prefix}${path.slice(1)}`;

  return `${prefix}${path}`;
}

/** Même chose, en URL absolue — pour les canoniques, le JSON-LD et le sitemap. */
export function localeUrl(locale: Locale, path: string): string {
  const relative = localePath(locale, path);
  return relative === "/" ? BASE_URL : `${BASE_URL}${relative}`;
}

/**
 * Chemins qui existent aussi en anglais.
 *
 * Tout le reste — blog, pages légales, pages d'intention locale — n'existe
 * qu'en français, et c'est délibéré : le blog est du contenu rédactionnel long
 * qu'on ne traduit pas à la volée, et une page qui vise « refonte site web
 * Annecy » n'a aucun sens en anglais. Cette liste est la SEULE source de vérité
 * là-dessus : elle décide à la fois des hreflang annoncés à Google, du sitemap,
 * et de la cible du sélecteur de langue. Une page annoncée en anglais mais
 * absente répondrait 404 — c'est exactement ce qu'il faut éviter.
 */
const TRANSLATED_PATHS: readonly string[] = [
  "/",
  "/offres",
  "/projets",
  "/a-propos",
  "/contact",
];

export function hasTranslation(path: string): boolean {
  // Les études de cas sont traduites, slug par slug, dans translations.ts.
  return TRANSLATED_PATHS.includes(path) || path.startsWith("/projets/");
}

/** Langues dans lesquelles un chemin existe réellement. */
export function localesFor(path: string): readonly Locale[] {
  return hasTranslation(path) ? LOCALES : [DEFAULT_LOCALE];
}

/** Sépare un chemin courant en (langue, forme racine). */
export function splitLocale(pathname: string): { locale: Locale; path: string } {
  for (const l of LOCALES) {
    if (l === DEFAULT_LOCALE) continue;
    if (pathname === `/${l}`) return { locale: l, path: "/" };
    if (pathname.startsWith(`/${l}/`)) return { locale: l, path: pathname.slice(l.length + 1) };
  }
  return { locale: DEFAULT_LOCALE, path: pathname };
}

/**
 * Lien interne prêt à poser dans un `href`.
 *
 * Comme `localePath`, mais retombe sur la version française quand la page
 * n'existe pas dans la langue courante : depuis l'anglais, un lien vers le blog
 * doit rester `/blog` et non devenir `/en/blog`, qui répondrait 404. Le visiteur
 * anglais qui clique sur « Blog » arrive donc sur le blog français — c'est
 * assumé, et bien préférable à une page d'erreur.
 *
 * C'est cette fonction que le contexte i18n expose sous le nom `lp`, et donc
 * celle qui sert pour TOUS les liens internes du site.
 */
export function localeHref(locale: Locale, path: string): string {
  // On isole le chemin de son ancre et de ses paramètres avant de tester son
  // existence : « /?offer=starter#contact » est un lien vers l'accueil.
  const base = path.split(/[?#]/)[0] || "/";
  if (!hasTranslation(base)) return path;
  return localePath(locale, path);
}

/**
 * La même page dans une autre langue.
 *
 * Si elle n'existe pas dans la langue visée, on renvoie vers l'accueil de cette
 * langue plutôt que vers un 404. Le français, lui, contient tout le site : on
 * peut toujours y basculer sans perdre la page.
 */
export function switchLocale(pathname: string, target: Locale): string {
  const { path } = splitLocale(pathname);
  if (target !== DEFAULT_LOCALE && !hasTranslation(path)) return localePath(target, "/");
  return localePath(target, path);
}

/**
 * Bloc `alternates` d'une page, à passer tel quel dans l'objet `Metadata`.
 *
 * `languages` est ce qui produit les balises hreflang. Sans elles, Google n'a
 * aucun moyen de savoir que `/offres` et `/en/offres` sont deux versions de la
 * même page, et traite la seconde comme du contenu dupliqué.
 *
 * `availableIn` permet de déclarer une page qui n'existe que dans certaines
 * langues (le blog, les pages légales) : on ne veut pas annoncer un hreflang
 * vers une URL qui renverrait un 404.
 */
export function buildAlternates(
  locale: Locale,
  path: string,
  availableIn: readonly Locale[] = localesFor(path)
) {
  const languages: Record<string, string> = {};
  for (const l of availableIn) {
    languages[HREFLANG[l]] = localeUrl(l, path);
  }

  // x-default = la version servie quand la langue du visiteur ne correspond à
  // aucune des nôtres. C'est le français : c'est le site principal.
  const fallback = availableIn.includes(DEFAULT_LOCALE) ? DEFAULT_LOCALE : availableIn[0];
  languages["x-default"] = localeUrl(fallback, path);

  return {
    canonical: localeUrl(locale, path),
    languages,
  };
}
