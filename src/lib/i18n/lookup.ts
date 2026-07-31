/**
 * Résolution d'une clé de traduction, sans React.
 *
 * Extrait du contexte client parce que le serveur en a besoin aussi : le fil
 * d'Ariane JSON-LD et les données structurées doivent être dans la langue de la
 * page, et ils sont construits pendant le rendu serveur, hors de tout hook.
 */

import { translations, type Locale } from "./translations";
import { DEFAULT_LOCALE } from "./config";

/** Descend un chemin « a.b.c » dans un objet, ou undefined si la route casse. */
function resolve(root: unknown, path: string[]): unknown {
  let value: unknown = root;
  for (const key of path) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return value;
}

/**
 * Résolution avec repli sur le français.
 *
 * NB : l'implémentation de HernTaxi retombait sur `translations.fr` puis
 * reparcourait le chemin DEPUIS LE DÉBUT à l'intérieur de la boucle, en
 * réutilisant la variable déjà partiellement descendue — le repli ne se
 * déclenchait donc correctement que si la clé cassait au premier segment.
 * Ici le repli est une seconde résolution complète et indépendante.
 */
export function lookup(locale: Locale, key: string): unknown {
  const path = key.split(".");
  const hit = resolve(translations[locale], path);
  if (hit !== undefined) return hit;
  return resolve(translations[DEFAULT_LOCALE], path);
}

/** Traduit une clé. Renvoie la clé telle quelle si introuvable. */
export function translate(locale: Locale, key: string): string {
  const value = lookup(locale, key);
  return typeof value === "string" ? value : key;
}

/** Variante pour les valeurs de type tableau. */
export function translateList(locale: Locale, key: string): string[] {
  const value = lookup(locale, key);
  return Array.isArray(value) ? (value as string[]) : [];
}
