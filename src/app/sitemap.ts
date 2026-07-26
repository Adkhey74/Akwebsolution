import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { getPublishedArticles } from "@/lib/blog";

const BASE_URL = "https://akwebsolutions.fr";

// Date de dernière modification RÉELLE des pages "fixes" (marketing + études de cas).
// ⚠️ À bumper manuellement quand tu modifies vraiment ces pages.
// On n'utilise SURTOUT PAS `new Date()` : sinon Google voit « tout modifié »
// à chaque build et finit par ignorer le lastmod (signal de fraîcheur gâché).
const STATIC_LAST_MODIFIED = new Date("2026-07-27T00:00:00Z");

// Pages légales : changent très rarement.
const LEGAL_LAST_MODIFIED = new Date("2026-03-01T00:00:00Z");

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedArticles();

  const caseStudies: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${BASE_URL}/projets/${p.slug}`,
    lastModified: STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Un article publié = une entrée dans le sitemap (mise à jour automatique).
  // lastmod = vraie date de l'article → vrai signal de fraîcheur pour Google.
  const blogPosts: MetadataRoute.Sitemap = posts.map((a) => ({
    url: `${BASE_URL}/blog/${a.slug}`,
    lastModified: new Date(`${a.updatedAt ?? a.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // La page /blog est "modifiée" dès qu'un nouvel article sort → on prend la
  // date du plus récent (les articles sont déjà triés du plus récent au plus ancien).
  const blogListLastModified = posts.length
    ? new Date(`${posts[0].updatedAt ?? posts[0].publishedAt}T00:00:00Z`)
    : STATIC_LAST_MODIFIED;

  return [
    {
      url: BASE_URL,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...caseStudies,
    {
      url: `${BASE_URL}/a-propos`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/projets`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: blogListLastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...blogPosts,
    {
      url: `${BASE_URL}/offres`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/mentions-legales`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${BASE_URL}/confidentialite`,
      lastModified: LEGAL_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
