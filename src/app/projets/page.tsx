import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProjetsHeader } from "@/components/ProjetsHeader";
import { ProjetsCta } from "@/components/ProjetsCta";

export const metadata: Metadata = {
  title: "Nos Projets | AKWebSolution",
  description:
    "Découvrez nos réalisations web : sites vitrines, restaurants, e-commerce et projets sur mesure. Portfolio de l'agence AKWebSolution.",
  alternates: {
    canonical: "https://akwebsolutions.fr/projets",
  },
  openGraph: {
    url: "https://akwebsolutions.fr/projets",
    title: "Nos Projets | AKWebSolution",
    description:
      "Portfolio — Sites vitrines, e-commerce et projets sur mesure réalisés par AKWebSolution.",
  },
};

const projects = [
  {
    id: "kabuki",
    title: "Kabuki",
    category: "Site vitrine",
    year: "2025",
    url: undefined,
    tags: ["Restaurant", "Site vitrine", "Réservation", "Menu"],
    description:
      "Site vitrine pour un restaurant japonais : page d'accueil, menu, incontournables et réservation en ligne.",
    images: [
      { src: "/images/Kabuki/Acceuil.png",        alt: "Kabuki - Page d'accueil"     },
      { src: "/images/Kabuki/Menu.png",           alt: "Kabuki - Menu"                },
      { src: "/images/Kabuki/incontournable.png", alt: "Kabuki - Incontournables"     },
      { src: "/images/Kabuki/réservation.png",   alt: "Kabuki - Réservation"         },
    ],
  },
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
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main className="min-w-0">
        <ProjetsHeader />

        <section className="section-container min-w-0 pb-20 md:pb-24 lg:pb-32">
          <div className="space-y-20 md:space-y-24 lg:space-y-32">
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
