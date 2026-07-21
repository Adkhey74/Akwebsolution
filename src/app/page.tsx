import type { Metadata } from "next";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Création de sites web à Annecy | AKWebSolution",
  description:
    "Développeur web freelance à Annecy (Haute-Savoie). Création de sites vitrines, e-commerce et sur mesure : design élégant, responsive, optimisé SEO. Tarifs transparents, livraison rapide. Devis gratuit.",
  alternates: {
    canonical: "https://akwebsolutions.fr",
  },
  openGraph: {
    url: "https://akwebsolutions.fr",
    title: "Création de sites web à Annecy | AKWebSolution",
    description:
      "Développeur web freelance à Annecy — sites vitrines, e-commerce et sur mesure. Design moderne, tarifs transparents, livraison rapide.",
  },
};
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingSection } from "@/components/PricingSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
// import { Testimonials } from "@/components/Testimonials"; // réactivé plus tard
import { AboutPreview } from "@/components/AboutPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        <Hero />
        <Services />
        <ProjectsPreview />
        {/* <Testimonials /> — à réactiver quand les vrais avis seront prêts */}
        <AboutPreview />
        <PricingSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
