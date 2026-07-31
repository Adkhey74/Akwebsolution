import { maintenance, monthlyChangeHours, offers, rentalOffers } from "@/lib/offers";
import { BASE_URL, HREFLANG, localeUrl } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/translations";

/**
 * Données structurées JSON-LD, injectées depuis le layout racine — donc
 * présentes sur toutes les pages.
 *
 * L'entité « entreprise » garde le MÊME identifiant dans les deux langues :
 * c'est une seule société, pas une par version du site. Ce qui change avec la
 * langue, c'est l'entité « site web » (son URL et sa langue déclarée).
 */
export function JsonLd({ locale }: { locale: Locale }) {
  const offersUrl = localeUrl(locale, "/offres");

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
      "Développeur web freelance à Annecy, spécialisé en création de sites vitrines et sur mesure. Design élégant, responsive, SEO optimisé. Tarifs transparents, livraison rapide.",
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
          url: offersUrl,
        })),
        /* Formules location. `UnitPriceSpecification` avec `billingDuration` est
           la façon dont schema.org décrit un abonnement : annoncer la mensualité
           dans un simple `price` la ferait passer pour le prix total du site. */
        ...rentalOffers.map((offer) => ({
          "@type": "Offer",
          name: `${offer.title} — Location`,
          description: `${offer.result} Formule location : ${offer.rental.setup} € de mise en route puis ${offer.rental.monthly} €/mois tout compris (hébergement, maintenance et ${monthlyChangeHours} h de modifications par mois), engagement ${offer.rental.months} mois. Rachat possible au terme pour ${offer.rental.buyout} €.`,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(offer.rental.monthly),
            priceCurrency: "EUR",
            unitCode: "MON",
            billingDuration: offer.rental.months,
          },
          url: offersUrl,
        })),
        {
          "@type": "Offer",
          name: "Maintenance et hébergement",
          description: `${monthlyChangeHours} heures de modifications par mois, hébergement, nom de domaine, certificat SSL, sauvegardes quotidiennes, mises à jour de sécurité, rapport mensuel de fréquentation et support prioritaire. ${maintenance.flex} €/mois sans engagement, ${maintenance.annual} €/mois avec engagement 1 an.`,
          price: String(maintenance.annual),
          priceCurrency: "EUR",
          url: offersUrl,
        },
      ],
    },
  };

  const home = localeUrl(locale, "/");

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${home}#website`,
    url: home,
    name: "AKWebSolution",
    description:
      locale === "en"
        ? "Bespoke website design — AKWebSolution"
        : "Création de sites web sur mesure — AKWebSolution",
    publisher: {
      "@id": `${BASE_URL}/#organization`,
    },
    inLanguage: HREFLANG[locale],
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
