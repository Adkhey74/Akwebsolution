import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { ProjetsHeader } from "@/components/ProjetsHeader";
import { ProjetsCta } from "@/components/ProjetsCta";

export const metadata: Metadata = {
  title: "Nos Projets",
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
    id: "orbitgroup",
    title: "Orbit Group",
    category: "Site vitrine premium",
    year: "2026",
    url: undefined,
    tags: ["Sécurité", "Site vitrine", "Corporate", "Mobilité"],
    description:
      "Site vitrine premium et confidentiel pour un partenaire de sécurité et de mobilité de dirigeants : design sombre haut de gamme, couverture internationale et demande de contact confidentielle.",
    images: [
      { src: "/images/OrbitGroup/hero.webp",                 alt: "Orbit Group - page d'accueil"        },
      { src: "/images/OrbitGroup/services.png",             alt: "Orbit Group - services"              },
      { src: "/images/OrbitGroup/what-sets-us.png",         alt: "Orbit Group - ce qui les distingue"  },
      { src: "/images/OrbitGroup/demaindingenvironment.webp", alt: "Orbit Group - environnements exigeants" },
      { src: "/images/OrbitGroup/map.png",                  alt: "Orbit Group - couverture internationale" },
      { src: "/images/OrbitGroup/contact.png",              alt: "Orbit Group - contact confidentiel"  },
    ],
  },
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
      { src: "/images/Kabuki/Acceuil.webp",        alt: "Kabuki - Page d'accueil"     },
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
      { src: "/images/herntaxi/acceuil-new.webp",  alt: "HernTaxi - Page d'accueil"       },
      { src: "/images/herntaxi/acceuil2-new.webp", alt: "HernTaxi - Accueil suite"         },
      { src: "/images/herntaxi/vehicule.webp",     alt: "HernTaxi - Nos véhicules"         },
      { src: "/images/herntaxi/reservations.png", alt: "HernTaxi - Réservation"           },
      { src: "/images/herntaxi/stationdeski.webp", alt: "HernTaxi - Transfert stations ski"},
      { src: "/images/herntaxi/cpamtaxi.webp",     alt: "HernTaxi - Transport CPAM"        },
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
      { src: "/images/thermochrono/acceuil.webp",     alt: "ThermoChron - Page d'accueil" },
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
      <main id="main" className="min-w-0">
        <ProjetsHeader />

        <section className="section-container min-w-0 pb-20 md:pb-24 lg:pb-32">
          <div className="space-y-20 md:space-y-24 lg:space-y-32">
            {projects.map((project, i) => (
              <div key={project.id} id={project.id} className="scroll-mt-28">
                <ProjectShowcase {...project} index={i} />
                <div className="mt-6 flex justify-center md:justify-start">
                  <Link
                    href={`/projets/${project.id}`}
                    className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 text-[0.8125rem] font-medium text-[var(--accent-soft)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white"
                  >
                    Lire l&apos;étude de cas
                    <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
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
