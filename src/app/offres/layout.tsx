import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Offres & Tarifs",
  description:
    "Offres de création de site web AKWebSolution : Page Vitrine Rapide dès 700 €, Site Vitrine Complet dès 1 500 €, Site Pro dès 2 500 €. Ou en location à partir de 79 €/mois, tout compris. Tarifs transparents.",
  alternates: {
    canonical: "https://akwebsolutions.fr/offres",
  },
  openGraph: {
    url: "https://akwebsolutions.fr/offres",
    title: "Nos Offres & Tarifs | AKWebSolution",
    description:
      "Offres de création de site web avec tarifs transparents : à l'achat ou en location tout compris. Page vitrine, site vitrine complet, sur mesure. Livraison rapide.",
  },
};

export default function OffresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
