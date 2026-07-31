/**
 * Métadonnées SEO des pages fixes, par langue.
 *
 * Pourquoi un fichier à part de `i18n/translations.ts` : ces chaînes ne sont
 * jamais affichées dans la page. Elles ne partent qu'à Google et aux réseaux
 * sociaux, elles sont lues côté serveur uniquement, et elles obéissent à des
 * contraintes qui n'ont rien à voir avec le reste du site (longueur d'un titre
 * dans les résultats de recherche, mots-clés à placer en tête).
 *
 * Le titre et la description d'une page ne sont donc écrits QU'ICI. Avant, ils
 * l'étaient en dur dans chaque `page.tsx` et restaient en français même quand le
 * visiteur lisait l'anglais.
 */

import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/translations";
import {
  BASE_URL,
  buildAlternates,
  DEFAULT_LOCALE,
  localesFor,
  OG_LOCALE,
} from "@/lib/i18n/config";

const OG_IMAGE = "/opengraph-image";

/**
 * Mots-clés visés, par langue. Le français est massivement local (« Annecy »,
 * « Haute-Savoie ») ; l'anglais vise les visiteurs internationaux de la région
 * — hôtellerie, restauration et transferts vers Genève, d'où vient la demande
 * de version anglaise.
 */
const KEYWORDS: Record<Locale, string[]> = {
  fr: [
    "création site web Annecy",
    "agence web Annecy",
    "développeur web freelance Annecy",
    "création site internet Haute-Savoie",
    "site vitrine Annecy",
    "refonte site web Annecy",
    "web design Annecy",
    "site sur mesure",
    "création site web",
    "SEO local",
    "freelance web",
  ],
  en: [
    "web developer Annecy",
    "freelance web developer France",
    "website design Annecy",
    "business website Haute-Savoie",
    "bespoke website France",
    "English website Annecy",
    "web developer Geneva area",
    "SEO France",
    "freelance web developer",
  ],
};

type Seo = {
  title: string;
  /**
   * Court-circuite le gabarit « %s | AKWebSolution » du layout. Utile pour
   * l'accueil, dont le titre contient déjà le nom de la marque.
   */
  absoluteTitle?: boolean;
  description: string;
  /** Par défaut : le titre complet. */
  ogTitle?: string;
  /** Par défaut : `description`. Souvent plus court, les réseaux tronquent. */
  ogDescription?: string;
};

type PageSeo = {
  /**
   * Chemin canonique, écrit dans sa forme racine (française).
   *
   * Les langues dans lesquelles la page existe ne sont PAS déclarées ici :
   * elles se déduisent du chemin via `localesFor` (cf. i18n/config.ts), pour
   * qu'une seule liste décide à la fois des hreflang, du sitemap et du
   * sélecteur de langue.
   */
  path: string;
  fr: Seo;
  /** Absent = la page retombe sur le français, comme les traductions d'UI. */
  en?: Seo;
};

export const PAGES = {
  home: {
    path: "/",
    fr: {
      title: "Création de sites web à Annecy | AKWebSolution",
      absoluteTitle: true,
      description:
        "Développeur web freelance à Annecy (Haute-Savoie). Création de sites vitrines et sur mesure : design élégant, responsive, optimisé SEO. Tarifs transparents, livraison rapide. Devis gratuit.",
      ogDescription:
        "Développeur web freelance à Annecy — sites vitrines et sur mesure. Design moderne, tarifs transparents, livraison rapide.",
    },
    en: {
      title: "Freelance Web Developer in Annecy, France | AKWebSolution",
      absoluteTitle: true,
      description:
        "Freelance web developer based in Annecy (Haute-Savoie, France). Bespoke business websites: elegant design, responsive, SEO-ready. Transparent pricing, fast delivery, free quote.",
      ogDescription:
        "Freelance web developer in Annecy — bespoke business websites. Modern design, transparent pricing, fast delivery.",
    },
  },

  offers: {
    path: "/offres",
    fr: {
      title: "Offres & Tarifs",
      description:
        "Offres de création de site web AKWebSolution : Page Vitrine Rapide dès 700 €, Site Vitrine Complet dès 1 500 €, Site Pro dès 2 500 €. Ou en location à partir de 79 €/mois, tout compris. Tarifs transparents.",
      ogDescription:
        "Offres de création de site web avec tarifs transparents : à l'achat ou en location tout compris. Page vitrine, site vitrine complet, sur mesure. Livraison rapide.",
    },
    en: {
      title: "Pricing & Packages",
      description:
        "AKWebSolution website packages: Single-Page Site from €700, Full Business Website from €1,500, Bespoke Pro Site from €2,500. Or rent from €79/month, all inclusive. Transparent pricing, no hidden fees.",
      ogDescription:
        "Website packages with transparent pricing — buy outright or rent all-inclusive. Single-page, full business site, or fully bespoke. Fast delivery.",
    },
  },

  projects: {
    path: "/projets",
    fr: {
      title: "Réalisations",
      description:
        "Réalisations web d'AKWebSolution : sites vitrines, restaurants, e-commerce et créations sur mesure, par un développeur web freelance à Annecy.",
      ogTitle: "Réalisations | AKWebSolution",
      ogDescription:
        "Portfolio — sites vitrines, e-commerce et créations sur mesure réalisés par AKWebSolution.",
    },
    en: {
      title: "Work",
      description:
        "Selected work by AKWebSolution: business websites, restaurants, e-commerce and bespoke builds, by a freelance web developer based in Annecy, France.",
      ogTitle: "Work | AKWebSolution",
      ogDescription:
        "Portfolio — business websites, e-commerce and bespoke builds by AKWebSolution.",
    },
  },

  about: {
    path: "/a-propos",
    fr: {
      title: "À propos",
      description:
        "Adil Khadich — développeur web freelance à Annecy. Sites sur mesure, élégants et performants pour les indépendants et les petites entreprises.",
      ogTitle: "À propos | AKWebSolution",
      ogDescription: "Qui suis-je — développeur web freelance, sites sur mesure.",
    },
    en: {
      title: "About",
      description:
        "Adil Khadich — freelance web developer in Annecy, France. Bespoke, elegant and fast websites for independents and small businesses.",
      ogTitle: "About | AKWebSolution",
      ogDescription: "Who I am — freelance web developer, bespoke websites.",
    },
  },

  contact: {
    path: "/contact",
    fr: {
      title: "Contact — Devis gratuit sous 24 h",
      description:
        "Parlons de votre projet de site web. Réponse sous 24 h, devis gratuit et sans engagement. Développeur web freelance à Annecy (Haute-Savoie), par email, téléphone ou WhatsApp.",
      ogTitle: "Contact | AKWebSolution",
      ogDescription:
        "Parlons de votre projet de site web — réponse sous 24 h, devis gratuit et sans engagement.",
    },
    en: {
      title: "Contact — Free quote within 24 h",
      description:
        "Let's talk about your website project. Reply within 24 hours, free quote, no commitment. Freelance web developer in Annecy, France — by email, phone or WhatsApp.",
      ogTitle: "Contact | AKWebSolution",
      ogDescription:
        "Let's talk about your website project — reply within 24 hours, free quote, no commitment.",
    },
  },

  /* Le blog n'existe qu'en français : ce sont de longs contenus rédactionnels,
     pas des chaînes traduisibles (cf. le commentaire de BlogList.tsx). */
  blog: {
    path: "/blog",
    fr: {
      title: "Blog",
      description:
        "Conseils et guides sur la création de sites web, le SEO et la performance, par un développeur web freelance à Annecy (Haute-Savoie).",
      ogTitle: "Blog | AKWebSolution",
      ogDescription:
        "Conseils et guides sur la création de sites web, le SEO et la performance — développeur web freelance à Annecy.",
    },
  },

  legal: {
    path: "/mentions-legales",
    fr: {
      title: "Mentions légales",
      description:
        "Mentions légales du site AKWebSolution — informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
    },
  },

  privacy: {
    path: "/confidentialite",
    fr: {
      title: "Politique de confidentialité",
      description:
        "Politique de confidentialité d'AKWebSolution — comment vos données personnelles sont collectées, utilisées et protégées, conformément au RGPD.",
    },
  },

  // ── Pages d'intention locale (françaises uniquement) ────────────────────
  // Elles visent des requêtes que l'accueil ne peut pas viser sans se
  // cannibaliser : une refonte et un secteur d'activité précis ne se cherchent
  // pas avec les mêmes mots que « création site web Annecy ».

  redesign: {
    path: "/refonte-site-web",
    fr: {
      title: "Refonte de site web à Annecy et en Haute-Savoie",
      description:
        "Votre site est lent, daté ou illisible sur téléphone ? Refonte complète à partir de 1 500 €, sans perdre votre référencement Google. Développeur web freelance à Annecy.",
      ogTitle: "Refonte de site web | AKWebSolution",
      ogDescription:
        "Refonte de site web à Annecy — plus rapide, lisible sur téléphone, sans perdre votre référencement.",
    },
  },

  restaurant: {
    path: "/site-web-restaurant-annecy",
    fr: {
      title: "Création de site web pour restaurant à Annecy",
      description:
        "Site web pour restaurant à Annecy : carte à jour, horaires, réservation et fiche Google Business. À partir de 700 €, livré en 5 à 7 jours. Version anglaise disponible.",
      ogTitle: "Site web pour restaurant à Annecy | AKWebSolution",
      ogDescription:
        "Carte, horaires, réservation et fiche Google — un site de restaurant qui remplit la salle.",
    },
  },

  artisan: {
    path: "/site-web-artisan-annecy",
    fr: {
      title: "Création de site web pour artisan à Annecy",
      description:
        "Site web pour artisan et TPE à Annecy : être trouvé sur Google quand on cherche votre métier près de chez vous. À partir de 700 €, ou 79 €/mois en location.",
      ogTitle: "Site web pour artisan à Annecy | AKWebSolution",
      ogDescription:
        "Être trouvé sur Google quand un client cherche votre métier à Annecy — à partir de 700 €.",
    },
  },
} as const satisfies Record<string, PageSeo>;

export type PageKey = keyof typeof PAGES;

/** Chemin canonique d'une page, en forme racine (à préfixer via `localePath`). */
export function pagePath(key: PageKey): string {
  return PAGES[key].path;
}

/** Langues dans lesquelles la page existe. */
export function pageLocales(key: PageKey): readonly Locale[] {
  return localesFor(PAGES[key].path);
}

/**
 * Construit l'objet `Metadata` complet d'une page fixe : titre, description,
 * canonique, hreflang et OpenGraph — tous cohérents entre eux par construction.
 */
export function pageMetadata(key: PageKey, locale: Locale): Metadata {
  // Annoté `PageSeo` : `PAGES` est figé en `as const`, donc l'accès par clé
  // produit l'union de toutes les entrées — et celles qui n'ont pas de version
  // anglaise n'ont pas de champ `en` à lire.
  const page: PageSeo = PAGES[key];
  const seo: Seo = (locale === "en" ? page.en : page.fr) ?? page.fr;

  const alternates = buildAlternates(locale, page.path, pageLocales(key));
  const fullTitle = seo.absoluteTitle ? seo.title : `${seo.title} | AKWebSolution`;

  return {
    title: seo.absoluteTitle ? { absolute: seo.title } : seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: alternates.canonical,
      siteName: "AKWebSolution",
      title: seo.ogTitle ?? fullTitle,
      description: seo.ogDescription ?? seo.description,
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: fullTitle }],
    },
  };
}

/** Métadonnées des pages légales : mêmes règles, mais jamais indexées. */
export function noindexPageMetadata(key: PageKey, locale: Locale): Metadata {
  return {
    ...pageMetadata(key, locale),
    robots: { index: false, follow: false },
  };
}

/**
 * Métadonnées du layout racine — ce dont chaque page hérite faute de mieux.
 *
 * Les valeurs par défaut sont celles de l'accueil, mais le titre y devient un
 * gabarit : une page qui annonce `title: "Offres & Tarifs"` sort
 * « Offres & Tarifs | AKWebSolution » sans avoir à répéter la marque.
 */
export function rootMetadata(locale: Locale): Metadata {
  const home: PageSeo = PAGES.home;
  const seo: Seo = (locale === "en" ? home.en : home.fr) ?? home.fr;
  const alternates = buildAlternates(locale, home.path);

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: seo.title,
      template: "%s | AKWebSolution",
    },
    description: seo.description,
    keywords: KEYWORDS[locale],
    authors: [{ name: "AKWebSolution", url: BASE_URL }],
    creator: "AKWebSolution",
    publisher: "AKWebSolution",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates,
    openGraph: {
      type: "website",
      locale: OG_LOCALE[locale],
      url: alternates.canonical,
      siteName: "AKWebSolution",
      title: seo.title,
      description: seo.ogDescription ?? seo.description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt:
            locale === "en"
              ? "AKWebSolution — Bespoke website design"
              : "AKWebSolution — Création de sites web sur mesure",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description:
        locale === "en"
          ? "Freelance web developer in Annecy, France — bespoke business websites."
          : "Développeur web freelance à Annecy — sites vitrines et sur mesure.",
      images: [OG_IMAGE],
      creator: "@akwebsolution",
    },
    icons: {
      icon: "/icon.png",
      apple: "/icon.png",
    },
    /* theme-color est posé par le script inline puis mis à jour par le sélecteur
       de thème : sa valeur dépend du choix de l'utilisateur, pas d'un statique. */
  };
}

export { DEFAULT_LOCALE };
