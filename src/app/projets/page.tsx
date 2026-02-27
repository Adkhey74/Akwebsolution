import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProjetsHeader } from "@/components/ProjetsHeader";
import { ProjetsCta } from "@/components/ProjetsCta";

export const metadata: Metadata = {
  title: "Projets | AKWebSolution",
  description:
    "Réalisations et projets de création de sites web : vitrines, responsive, sur mesure.",
};

const projects = [
  {
    id: "herntaxi",
    title: "HernTaxi",
    category: "Site vitrine",
    year: "2025",
    tags: ["Site vitrine", "Responsive", "SEO", "Multi-pages"],
    description:
      "Site vitrine pour une société de taxi : présentation des services (réservation, transport ski, CPAM), design responsive et pages dédiées pour chaque offre.",
    images: [
      { src: "/images/herntaxi/acceuil.png",     alt: "HernTaxi - Page d'accueil"  },
      { src: "/images/herntaxi/acceuil2.png",    alt: "HernTaxi - Accueil suite"   },
      { src: "/images/herntaxi/reservation.png", alt: "HernTaxi - Réservation"     },
      { src: "/images/herntaxi/ski.png",         alt: "HernTaxi - Transport ski"   },
      { src: "/images/herntaxi/cpam.png",        alt: "HernTaxi - Transport CPAM"  },
    ],
  },
];

export default function ProjetsPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main>
        <ProjetsHeader />

        <section className="section-container pb-24 md:pb-32">
          <div className="space-y-24 md:space-y-32">
            {projects.map((project, i) => (
              <div key={project.id} id={project.id} className="scroll-mt-28">
                <ProjectShowcase {...project} index={i} />
              </div>
            ))}
          </div>
        </section>

        <ProjetsCta />
      </main>
      <Footer />
    </div>
  );
}
