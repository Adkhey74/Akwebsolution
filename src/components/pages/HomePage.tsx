import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { PricingSection } from "@/components/PricingSection";
import { ProjectsPreview } from "@/components/ProjectsPreview";
import { Testimonials } from "@/components/Testimonials";
import { AboutPreview } from "@/components/AboutPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import type { Locale } from "@/lib/i18n/translations";

/**
 * Corps de la page d'accueil, partagé par `/` et `/en`.
 *
 * Les deux arbres de routes rendent ce même composant : aucune section ne peut
 * exister d'un côté et pas de l'autre. Les textes, eux, viennent du contexte
 * i18n, donc de la langue du layout racine.
 *
 * `locale` est passée explicitement par les deux pages, en plus du contexte :
 * celui-ci est un contexte React client, illisible par `Testimonials`, qui est
 * un composant serveur et doit pourtant demander à Google les avis dans la
 * bonne langue.
 */
export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        <Hero />
        <Services />
        <ProjectsPreview />
        <Testimonials locale={locale} />
        <AboutPreview />
        <PricingSection />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}
