/**
 * Source de vérité du blog (pages /blog et /blog/[slug]).
 *
 * ── Ajouter un article ────────────────────────────────────────────────
 * 1. Créer `src/content/blog/<slug>.tsx` (voir le README du dossier).
 * 2. L'importer ci-dessous et l'ajouter au tableau `articles`.
 *
 * ── Calendrier éditorial ──────────────────────────────────────────────
 * Le champ `publishedAt` ("AAAA-MM-JJ") pilote la publication :
 *   • date <= aujourd'hui  → l'article est PUBLIÉ (liste + sitemap + page).
 *   • date dans le futur    → l'article est MASQUÉ jusqu'à cette date
 *                             (il apparaît au prochain build/déploiement
 *                             effectué à partir de ce jour-là).
 *   • `draft: true`         → jamais publié, quelle que soit la date.
 * Il suffit donc de changer `publishedAt` pour programmer/réorganiser.
 */

import type { ComponentType } from "react";
import { article as combienCouteSiteVitrineAnnecy2026 } from "@/content/blog/combien-coute-site-vitrine-annecy-2026";
import { article as combienDeTempsPourCreerUnSiteInternet } from "@/content/blog/combien-de-temps-pour-creer-un-site-internet";

export type Article = {
  slug: string;
  title: string; // H1 de l'article
  excerpt: string; // extrait affiché dans la liste /blog
  metaTitle?: string; // <title> SEO (défaut : title). Suffixé "| AKWebSolution".
  metaDescription: string; // meta description unique (150–160 caractères)
  publishedAt: string; // "AAAA-MM-JJ" — date de publication (modifiable)
  updatedAt?: string; // "AAAA-MM-JJ" — date de mise à jour (défaut : publishedAt)
  author: string; // "Adil"
  keywords?: string[];
  image?: { src: string; alt: string };
  readingMinutes?: number; // temps de lecture affiché (optionnel)
  draft?: boolean; // true = ne jamais publier
  Content: ComponentType; // corps de l'article (JSX : <h2>, <p>, <ul>…)
};

/**
 * Les articles sont ajoutés un par un ici. L'ordre n'a pas d'importance :
 * l'affichage et le sitemap trient sur `publishedAt`.
 */
export const articles: Article[] = [
  combienDeTempsPourCreerUnSiteInternet,
  combienCouteSiteVitrineAnnecy2026,
];

/** Un article est-il publié à l'instant `now` ? */
export function isPublished(a: Article, now: Date = new Date()): boolean {
  if (a.draft) return false;
  return new Date(`${a.publishedAt}T00:00:00Z`).getTime() <= now.getTime();
}

/** Articles publiés, triés du plus récent au plus ancien. */
export function getPublishedArticles(now: Date = new Date()): Article[] {
  return articles
    .filter((a) => isPublished(a, now))
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** Récupère un article par son slug (publié ou non). */
export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formate une date "AAAA-MM-JJ" en français (ex. "15 janvier 2026"). */
export function formatDateFr(date: string): string {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}
