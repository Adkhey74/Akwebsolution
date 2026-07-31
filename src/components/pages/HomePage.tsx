import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingSection } from "@/components/PricingSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
// import { Testimonials } from "@/components/Testimonials"; // réactivé plus tard
import { AboutPreview } from "@/components/AboutPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

/**
 * Corps de la page d'accueil, partagé par `/` et `/en`.
 *
 * Les deux arbres de routes rendent ce même composant : aucune section ne peut
 * exister d'un côté et pas de l'autre. Les textes, eux, viennent du contexte
 * i18n, donc de la langue du layout racine.
 */
export function HomePage() {
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
