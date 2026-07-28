import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjetsList } from "@/components/ProjetsList";
import { ProjetsHeader } from "@/components/ProjetsHeader";
import { ProjetsCta } from "@/components/ProjetsCta";

export const metadata: Metadata = {
  title: "Nos Réalisations",
  description:
    "Découvrez nos réalisations web : sites vitrines, restaurants, e-commerce et créations sur mesure. Portfolio de l'agence AKWebSolution.",
  alternates: {
    canonical: "https://akwebsolutions.fr/projets",
  },
  openGraph: {
    url: "https://akwebsolutions.fr/projets",
    title: "Nos Réalisations | AKWebSolution",
    description:
      "Portfolio — Sites vitrines, e-commerce et créations sur mesure réalisés par AKWebSolution.",
  },
};



export default function ProjetsPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        <ProjetsHeader />

        <ProjetsList />

        <ProjetsCta />
      </main>
      <Footer />
    </div>
  );
}
