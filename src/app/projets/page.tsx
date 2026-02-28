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
    url: "https://herntaxi.fr",
    tags: ["Site vitrine", "Responsive", "SEO", "Multi-pages"],
    description:
      "Site vitrine pour une société de taxi en Savoie : présentation des services (réservation, transport ski, CPAM), design responsive et pages dédiées pour chaque offre.",
    images: [
      { src: "/images/herntaxi/acceuil-new.png",  alt: "HernTaxi - Page d'accueil"       },
      { src: "/images/herntaxi/acceuil2-new.png", alt: "HernTaxi - Accueil suite"         },
      { src: "/images/herntaxi/vehicule.png",     alt: "HernTaxi - Nos véhicules"         },
      { src: "/images/herntaxi/reservations.png", alt: "HernTaxi - Réservation"           },
      { src: "/images/herntaxi/stationdeski.png", alt: "HernTaxi - Transfert stations ski"},
      { src: "/images/herntaxi/cpamtaxi.png",     alt: "HernTaxi - Transport CPAM"        },
    ],
  },
  {
    id: "thermochrono",
    title: "ThermoChrono",
    category: "E-commerce",
    year: "2025",
    url: "https://thermochrono.fr",
    tags: ["E-commerce", "Responsive", "Paiement sécurisé", "SEO"],
    description:
      "Boutique e-commerce de gourdes connectées avec affichage de la température en temps réel. Catalogue produits, panier, paiement sécurisé (Visa, Mastercard, Apple Pay) et livraison rapide.",
    images: [
      { src: "/images/thermochrono/acceuil.png",     alt: "ThermoChron - Page d'accueil" },
      { src: "/images/thermochrono/nosproduits.png", alt: "ThermoChron - Nos produits"   },
      { src: "/images/thermochrono/produits.png",    alt: "ThermoChron - Fiche produit"  },
      { src: "/images/thermochrono/panier.png",      alt: "ThermoChron - Panier"         },
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
