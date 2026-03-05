import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Offres & Tarifs | AKWebSolution",
  description:
    "Découvrez les offres de création de site web d'AKWebSolution : Page Vitrine Rapide à 700 €, Site Vitrine Complet à 1 500 €, E-commerce à partir de 2 000 €, Site Pro à 3 000 €. Prix fixes, sans surprise.",
  alternates: {
    canonical: "https://akwebsolutions.fr/offres",
  },
  openGraph: {
    url: "https://akwebsolutions.fr/offres",
    title: "Nos Offres & Tarifs | AKWebSolution",
    description:
      "Offres de création de site web avec prix fixes : vitrine, e-commerce, sur mesure. Livraison rapide, sans engagement.",
  },
};

export default function OffresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
