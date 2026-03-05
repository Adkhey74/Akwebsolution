import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "AKWebSolution | Création de sites web sur mesure",
  description:
    "AKWebSolution — Agence web freelance spécialisée en création de sites vitrines, e-commerce et sur mesure. Design élégant, responsive, SEO optimisé. Prix fixes, livraison rapide.",
  alternates: {
    canonical: "https://akwebsolutions.fr",
  },
  openGraph: {
    url: "https://akwebsolutions.fr",
    title: "AKWebSolution | Création de sites web sur mesure",
    description:
      "Agence web — Sites vitrines, e-commerce et sur mesure. Design moderne, prix fixes, livraison rapide.",
  },
};
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingSection } from "@/components/PricingSection";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main>
        <Hero />
        <PricingSection />
        <Services />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
