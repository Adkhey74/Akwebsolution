import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Offres & Tarifs",
  description:
    "Découvrez les offres de création de site web d'AKWebSolution : Page Vitrine Rapide à partir de 700 €, Site Vitrine Complet à partir de 1 500 €, Site Pro à partir de 2 500 €. Tarifs transparents, sans surprise.",
  alternates: {
    canonical: "https://akwebsolutions.fr/offres",
  },
  openGraph: {
    url: "https://akwebsolutions.fr/offres",
    title: "Nos Offres & Tarifs | AKWebSolution",
    description:
      "Offres de création de site web avec tarifs transparents : page vitrine, site vitrine complet, sur mesure. Livraison rapide, sans engagement.",
  },
};

export default function OffresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
