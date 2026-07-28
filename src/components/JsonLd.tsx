import { offers } from "@/lib/offers";

/**
 * Injects JSON-LD structured data into the page <head>.
 * Added on the root layout so every page benefits from it.
 */
export function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://akwebsolutions.fr/#organization",
    name: "AKWebSolution",
    alternateName: "AK Web Solutions",
    url: "https://akwebsolutions.fr",
    logo: "https://akwebsolutions.fr/images/logo3.png",
    image: "https://akwebsolutions.fr/opengraph-image",
    description:
      "Agence web spécialisée en création de sites vitrines et sur mesure. Design élégant, responsive, SEO optimisé. Tarifs transparents, livraison rapide.",
    telephone: "+33782923806",
    email: "contact@akwebsolutions.fr",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Annecy",
      addressRegion: "Haute-Savoie",
      postalCode: "74000",
      addressCountry: "FR",
    },
    areaServed: [
      { "@type": "City", name: "Annecy" },
      { "@type": "AdministrativeArea", name: "Haute-Savoie" },
      { "@type": "Country", name: "France" },
    ],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Virement bancaire, Carte bancaire",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.instagram.com/adil.khd/",
      "https://www.linkedin.com/in/adil-khadich/",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Offres de création de sites web",
      itemListElement: [
        /* Dérivé de lib/offers.ts : ces tarifs partent chez Google (rich
           snippets). Les recopier à la main, c'était risquer d'afficher un
           prix périmé dans les résultats de recherche après une hausse. */
        ...offers.map((offer) => ({
          "@type": "Offer",
          name: offer.title,
          description: `${offer.result} ${offer.features.slice(0, 3).join(". ")}.`,
          price: String(offer.price),
          priceCurrency: "EUR",
          url: "https://akwebsolutions.fr/offres",
        })),
        {
          "@type": "Offer",
          name: "Maintenance et hébergement",
          description:
            "2 heures de modifications par mois, hébergement, nom de domaine, certificat SSL, sauvegardes quotidiennes, mises à jour de sécurité, rapport mensuel de fréquentation et support prioritaire. 80 €/mois sans engagement, 70 €/mois avec engagement 1 an.",
          price: "70",
          priceCurrency: "EUR",
          url: "https://akwebsolutions.fr/offres",
        },
      ],
    },
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://akwebsolutions.fr/#website",
    url: "https://akwebsolutions.fr",
    name: "AKWebSolution",
    description: "Création de sites web sur mesure — AKWebSolution",
    publisher: {
      "@id": "https://akwebsolutions.fr/#organization",
    },
    inLanguage: "fr-FR",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSite) }}
      />
    </>
  );
}
