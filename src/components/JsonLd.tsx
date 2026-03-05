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
    image: "https://akwebsolutions.fr/images/og-image.png",
    description:
      "Agence web spécialisée en création de sites vitrines, e-commerce et sur mesure. Design élégant, responsive, SEO optimisé. Prix fixes, livraison rapide.",
    telephone: "+33782923806",
    email: "contact@akwebsolutions.fr",
    address: {
      "@type": "PostalAddress",
      addressCountry: "FR",
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
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
        {
          "@type": "Offer",
          name: "Page Vitrine Rapide",
          description:
            "Une page complète, responsive, formulaire de contact et hébergement inclus. Livraison en 5 à 7 jours ouvrés.",
          price: "700",
          priceCurrency: "EUR",
          url: "https://akwebsolutions.fr/offres",
        },
        {
          "@type": "Offer",
          name: "Site Vitrine Complet",
          description:
            "3 à 5 pages personnalisées, responsive, SEO de base, formulaire de contact. Livraison en 2 à 3 semaines.",
          price: "1500",
          priceCurrency: "EUR",
          url: "https://akwebsolutions.fr/offres",
        },
        {
          "@type": "Offer",
          name: "Site E-commerce",
          description:
            "Boutique en ligne, paiement sécurisé, gestion des stocks. Délai selon le projet.",
          price: "2000",
          priceCurrency: "EUR",
          url: "https://akwebsolutions.fr/offres",
        },
        {
          "@type": "Offer",
          name: "Site Pro & Sur Mesure",
          description:
            "Jusqu'à 8 pages, CMS, animations soignées, SEO complet, 1 mois d'accompagnement. Délai selon le projet.",
          price: "3000",
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
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://akwebsolutions.fr/?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
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
