# Articles de blog

Un fichier `.tsx` par article dans ce dossier. Chaque fichier exporte un objet
`article` typé `Article` (voir `src/lib/blog.ts`).

## Ajouter un article (2 étapes)

### 1. Créer le fichier `src/content/blog/<slug>.tsx`

```tsx
import type { Article } from "@/lib/blog";

// Corps de l'article : un H1 est déjà rendu par la page → ici on commence
// aux H2. Utiliser <h2 id="...">, <h3>, <p>, <ul>/<li>, <strong>, <a>…
function Content() {
  return (
    <>
      <p>Introduction…</p>

      <h2 id="premier-sous-titre">Premier sous-titre</h2>
      <p>…</p>

      <h2 id="deuxieme-sous-titre">Deuxième sous-titre</h2>
      <ul>
        <li>Point 1</li>
        <li>Point 2</li>
      </ul>
    </>
  );
}

export const article: Article = {
  slug: "combien-coute-site-vitrine-annecy-2026", // = nom du fichier, dans l'URL
  title: "Combien coûte un site vitrine à Annecy en 2026 ?", // H1
  excerpt: "Extrait affiché sur /blog (1–2 phrases).",
  metaTitle: "Prix d'un site vitrine à Annecy en 2026", // <title> (suffixé « | AKWebSolution »)
  metaDescription: "Meta description unique, 150–160 caractères, avec les mots-clés.",
  publishedAt: "2026-01-15", // ← DATE DE PUBLICATION (calendrier éditorial)
  updatedAt: "2026-01-15",   // ← date de mise à jour (à modifier si tu édites l'article)
  author: "Adil",
  keywords: ["prix site vitrine Annecy", "création site web Haute-Savoie"],
  image: { src: "/images/blog/<slug>.webp", alt: "Description de l'image" }, // optionnel
  readingMinutes: 7, // optionnel
  Content,
};
```

### 2. L'enregistrer dans `src/lib/blog.ts`

```ts
import { article as combienCouteSiteVitrine }
  from "@/content/blog/combien-coute-site-vitrine-annecy-2026";

export const articles: Article[] = [
  combienCouteSiteVitrine,
  // …ajouter les suivants ici
];
```

## Calendrier éditorial (champ `publishedAt`)

- `publishedAt` **≤ aujourd'hui** → l'article est **publié** : visible sur
  `/blog`, présent dans le sitemap, page indexable.
- `publishedAt` **dans le futur** → **masqué** partout jusqu'à cette date
  (il apparaît au prochain build/déploiement fait à partir de ce jour-là).
- `draft: true` → jamais publié, quelle que soit la date.

Pour programmer un article : mettre la date voulue et déployer. Pour le
publier tout de suite : mettre la date du jour.

## Images

Déposer les visuels dans `public/images/blog/` (idéalement en `.webp`) et
référencer `/images/blog/<slug>.webp`. `next/image` s'occupe de l'optimisation.
