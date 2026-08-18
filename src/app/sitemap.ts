import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getPublishedArticles } from "@/lib/blog";
import { HREFLANG, localesFor, localeUrl } from "@/lib/i18n/config";

// Date de dernière modification RÉELLE des pages "fixes" (marketing + études de cas).
// ⚠️ À bumper manuellement quand tu modifies vraiment ces pages.
// On n'utilise SURTOUT PAS `new Date()` : sinon Google voit « tout modifié »
// à chaque build et finit par ignorer le lastmod (signal de fraîcheur gâché).
const STATIC_LAST_MODIFIED = new Date("2026-07-27T00:00:00Z");

// Pages nées avec la version bilingue et les pages d'intention locale.
const NEW_PAGES_LAST_MODIFIED = new Date("2026-07-30T00:00:00Z");

/**
 * Pages dont le CONTENU a réellement bougé le 31/07/2026 : le tarif de
 * maintenance passé à 90 €/mois (offres + les deux pages d'intention locale qui
 * le citent) et les liens du portfolio (ThermoChrono retiré, Orbit et Kabuki
 * ajoutés) sur /projets et les études de cas.
 *
 * Volontairement séparé de `STATIC_LAST_MODIFIED` : l'accueil, /a-propos et
 * /contact n'ont pas changé ce jour-là, et les dater d'aujourd'hui pour faire
 * bonne mesure est exactement ce que le commentaire ci-dessus met en garde de
 * faire. Un lastmod ne vaut que s'il est vrai.
 */
const TOUCHED_2026_07_31 = new Date("2026-07-31T00:00:00Z");

/**
 * Pages dont le CONTENU a réellement bougé le 17/08/2026 :
 *
 * 1. la Page Vitrine Rapide passe de 700 à 900 € (et sa location de
 *    200 € + 79 €/mois à 250 € + 99 €/mois, rachat 650 €) ;
 * 2. deux offres récurrentes apparaissent — le socle hébergement et nom de
 *    domaine (35 €/mois, 1ʳᵉ année incluse) et le pack d'articles.
 *
 * Sont concernées les pages qui les affichent : /offres, l'accueil — dont le
 * bloc tarifs dérive le prix d'entrée et la note récurrente de `offers.ts` —
 * et les trois pages d'intention locale, qui citent le tarif d'entrée en
 * toutes lettres. /projets, les études de cas, /a-propos et /contact ne
 * changent pas : elles gardent leur date.
 */
const TOUCHED_2026_08_17 = new Date("2026-08-17T00:00:00Z");

/**
 * Pages dont le CONTENU a réellement bougé le 18/08/2026, deux décisions
 * commerciales prises le même jour :
 *
 * 1. l'engagement de la location passe de 24 à 12 mois (mise en route,
 *    mensualité et rachat inchangés), puis sans engagement avec un mois de
 *    préavis, et rachat accessible dès le 12ᵉ mois ;
 * 2. la première année d'hébergement n'est plus comprise dans le prix du site
 *    — le socle est dû dès la mise en ligne.
 *
 * Sont concernées : /offres, qui affiche les deux, et /site-web-artisan-annecy,
 * seule page d'intention locale à détailler la location. L'accueil garde sa
 * date : son bloc tarifs n'annonce ni la durée d'engagement ni l'inclusion, et
 * les deux autres pages d'intention locale non plus. L'article « Freelance ou
 * agence web », lui, porte son propre `updatedAt`.
 */
const TOUCHED_2026_08_18 = new Date("2026-08-18T00:00:00Z");

type Entry = {
  /** Chemin en forme racine — le préfixe de langue est ajouté ici. */
  path: string;
  lastModified: Date;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

/**
 * Une entrée par (page × langue), chacune déclarant ses alternatives.
 *
 * Les balises `xhtml:link` du sitemap disent à Google que `/offres` et
 * `/en/offres` sont deux versions de la même page. Sans elles, la version
 * anglaise est vue comme du contenu dupliqué du français — c'est le sitemap qui
 * porte ce signal en plus des `<link rel="alternate">` de chaque page.
 *
 * Les langues dans lesquelles une page existe viennent de `localesFor` : les
 * pages qui n'ont pas de version anglaise (blog, pages d'intention locale) ne
 * produisent donc qu'une seule entrée, et n'annoncent aucune alternative.
 */
function expand(entry: Entry): MetadataRoute.Sitemap {
  const locales = localesFor(entry.path);

  const languages: Record<string, string> = {};
  if (locales.length > 1) {
    for (const l of locales) languages[HREFLANG[l]] = localeUrl(l, entry.path);
    languages["x-default"] = localeUrl("fr", entry.path);
  }

  return locales.map((locale) => ({
    url: localeUrl(locale, entry.path),
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
    ...(locales.length > 1 ? { alternates: { languages } } : {}),
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedArticles();

  // La page /blog est "modifiée" dès qu'un nouvel article sort → on prend la
  // date du plus récent (les articles sont déjà triés du plus récent au plus ancien).
  const blogListLastModified = posts.length
    ? new Date(`${posts[0].updatedAt ?? posts[0].publishedAt}T00:00:00Z`)
    : STATIC_LAST_MODIFIED;

  const entries: Entry[] = [
    { path: "/", lastModified: TOUCHED_2026_08_17, changeFrequency: "monthly", priority: 1 },
    {
      path: "/offres",
      lastModified: TOUCHED_2026_08_18,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      path: "/projets",
      lastModified: TOUCHED_2026_07_31,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projects.map<Entry>((p) => ({
      path: `/projets/${p.slug}`,
      lastModified: TOUCHED_2026_07_31,
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    {
      path: "/contact",
      lastModified: NEW_PAGES_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      path: "/a-propos",
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // Pages d'intention locale — françaises uniquement.
    // Les trois citent le tarif d'entrée, passé à 900 € le 17/08.
    {
      path: "/refonte-site-web",
      lastModified: TOUCHED_2026_08_17,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/site-web-restaurant-annecy",
      lastModified: TOUCHED_2026_08_17,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      path: "/site-web-artisan-annecy",
      lastModified: TOUCHED_2026_08_18,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    { path: "/blog", lastModified: blogListLastModified, changeFrequency: "weekly", priority: 0.7 },
    // Un article publié = une entrée (mise à jour automatique).
    // lastmod = vraie date de l'article → vrai signal de fraîcheur pour Google.
    ...posts.map<Entry>((a) => ({
      path: `/blog/${a.slug}`,
      lastModified: new Date(`${a.updatedAt ?? a.publishedAt}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 0.7,
    })),

    /* Les mentions légales et la politique de confidentialité ne sont PLUS
       listées : elles sont en `robots: noindex`. Les annoncer dans le sitemap
       revenait à demander à Google d'explorer des pages qu'on lui interdit
       d'indexer — deux signaux contradictoires. Elles restent accessibles et
       liées depuis le pied de page, ce qui suffit. */
  ];

  return entries.flatMap(expand);
}
