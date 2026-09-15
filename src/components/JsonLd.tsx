import {
  content,
  contentPackUnitPrice,
  hosting,
  maintenance,
  monthlyChangeHours,
  offers,
  rentalOffers,
} from "@/lib/offers";
import { BASE_URL, HREFLANG, localeUrl } from "@/lib/i18n/config";
import { GOOGLE_PLACE_URL, GOOGLE_SHARE_URL } from "@/lib/reviews";
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
      // Celui de la fiche Google Business (13 rue Henri Verjus, 74600 Annecy) :
      // Google rapproche site et fiche sur la cohérence de l'adresse, un code
      // postal différent l'en empêche. À garder aligné sur la fiche.
      postalCode: "74600",
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
    /*
     * La fiche Google Business figure ici pour que Google rattache le site à
     * la fiche. Deux URL, volontairement : le lien de partage fourni par
     * Google, et l'URL par Place ID, qui est l'identifiant stable (le lien de
     * partage n'est qu'une redirection). Les deux viennent de `lib/reviews.ts`,
     * où vivent déjà les identifiants de la fiche.
     */
    sameAs: [
      GOOGLE_SHARE_URL,
      GOOGLE_PLACE_URL,
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
          description: `${offer.result} Formule location : ${offer.rental.setup} € de mise en route puis ${offer.rental.monthly} €/mois tout compris (hébergement, maintenance et ${monthlyChangeHours} h de modifications par mois), engagement ${offer.rental.months} mois, puis sans engagement avec un mois de préavis. Rachat possible à partir du terme pour ${offer.rental.buyout} €.`,
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
        /* Les trois paliers vendus après la mise en ligne, dans l'ordre où le
           site les présente. Le socle est annoncé au tarif RÉELLEMENT facturé
           (à l'année) : déclarer 35 € en `price` ferait passer une mensualité
           pour le prix total du service, exactement le travers que
           `UnitPriceSpecification` sert à éviter sur les locations. */
        {
          "@type": "Offer",
          name: "Hébergement et nom de domaine",
          description: `Hébergement, nom de domaine déposé au nom du client et renouvelé, certificat SSL, sauvegardes quotidiennes et mises à jour de sécurité. ${hosting.monthly} €/mois, facturés ${hosting.yearly} € par an, dès la mise en ligne du site.`,
          priceCurrency: "EUR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(hosting.yearly),
            priceCurrency: "EUR",
            unitCode: "ANN",
            billingDuration: 12,
          },
          url: offersUrl,
        },
        {
          "@type": "Offer",
          name: "Maintenance et hébergement",
          description: `${monthlyChangeHours} heures de modifications par mois, hébergement, nom de domaine, certificat SSL, sauvegardes quotidiennes, mises à jour de sécurité, rapport mensuel de fréquentation et support prioritaire. ${maintenance.flex} €/mois sans engagement, ${maintenance.annual} €/mois avec engagement 1 an.`,
          price: String(maintenance.annual),
          priceCurrency: "EUR",
          url: offersUrl,
        },
        {
          "@type": "Offer",
          name: "Articles & visibilité Google",
          description: `Rédaction et publication d'articles optimisés pour la recherche locale : sujet choisi sur les requêtes réelles, article rédigé, illustré, publié et relié au plan du site. Pack de ${content.packArticles} articles pour ${content.packPrice} € (soit ${contentPackUnitPrice} € l'article), ou ${content.unitPrice} € à l'unité. Ajout d'une section blog au site : ${content.blogSetup} €.`,
          price: String(content.packPrice),
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
