import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "À propos | AKWebSolution",
  description:
    "Adil — Développeur web freelance. Sites sur mesure, élégants et performants pour les entrepreneurs.",
  alternates: { canonical: "https://akwebsolutions.fr/a-propos" },
  openGraph: {
    url: "https://akwebsolutions.fr/a-propos",
    title: "À propos | AKWebSolution",
    description: "Qui suis-je — Développeur web freelance, sites sur mesure.",
  },
};

const values = [
  "Design soigné, responsive, adapté à votre activité",
  "Code propre et performant (Next.js, React, Tailwind)",
  "Tarifs fixes, délais annoncés, sans mauvaise surprise",
  "Réponse sous 24 h et suivi personnalisé",
];

export default function AProposPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-transparent">
      <Header />
      <main className="min-w-0">
        {/* Layout principal : photo gauche + contenu droit */}
        <div className="section-container w-full max-w-[72rem] pt-28 pb-20 md:pt-36 md:pb-28">
          <div className="grid min-h-[80vh] grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-[minmax(0,420px)_1fr] lg:grid-cols-[minmax(0,460px)_1fr]">

            {/* Colonne photo — pleine hauteur */}
            <div className="relative min-h-[300px] sm:min-h-[340px] md:min-h-0">
              <Image
                src="/images/adil.jpeg"
                alt="Adil — Créateur AKWebSolution"
                fill
                className="object-cover object-[50%_18%]"
                sizes="(max-width: 768px) 100vw, 460px"
                priority
              />
              {/* Dégradé bas */}
              <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />
              {/* Nom sur la photo */}
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60">
                  Créateur
                </p>
                <p className="mt-1 text-xl font-light text-white md:text-2xl">
                  Adil <span className="font-serif italic font-semibold">Khadich</span>
                </p>
                <p className="mt-0.5 text-[0.8rem] text-white/60">
                  AKWebSolution · Développeur freelance
                </p>
              </div>
            </div>

            {/* Colonne contenu */}
            <div className="flex min-w-0 flex-col justify-between break-words p-6 sm:p-8 md:p-10 lg:p-14">

              {/* En-tête texte */}
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  À propos
                </p>
                <h1 className="mt-3 text-3xl font-light leading-[1.2] tracking-tight text-neutral-900 md:text-4xl">
                  Je crée des sites qui{" "}
                  <span className="font-serif italic font-semibold">travaillent pour vous</span>
                </h1>
                <p className="mt-5 text-[0.9375rem] leading-[1.8] text-neutral-600 break-words">
                  Je m'appelle <strong className="font-semibold text-neutral-900">Adil</strong>, développeur web freelance basé en France. Sous le nom <strong className="font-semibold text-neutral-900">AKWebSolution</strong>, j'accompagne les indépendants et les petites entreprises qui veulent une présence en ligne claire, professionnelle et efficace.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.8] text-neutral-600">
                  Chaque projet est une collaboration : je prends le temps de comprendre votre métier et vos besoins avant de concevoir une solution qui vous ressemble. Pas de template — du sur mesure, du début à la fin.
                </p>
                <p className="mt-4 text-[0.9375rem] leading-[1.8] text-neutral-600">
                  J'utilise des technologies modernes (Next.js, React, Tailwind CSS) pour livrer des sites rapides, bien référencés et faciles à faire évoluer. Je travaille à distance avec des clients partout en France.
                </p>
              </div>

              {/* Séparateur */}
              <div className="my-8 h-px w-full bg-neutral-100" />

              {/* Points clés */}
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                  Mon engagement
                </p>
                <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {values.map((v) => (
                    <li
                      key={v}
                      className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-neutral-700"
                    >
                      <CheckCircle2
                        size={15}
                        strokeWidth={2}
                        className="mt-0.5 shrink-0 text-neutral-900"
                      />
                      {v}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Séparateur */}
              <div className="my-8 h-px w-full bg-neutral-100" />

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 gap-y-3">
                <Link
                  href="/#contact"
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-[0.9rem] font-semibold text-white transition-all hover:bg-neutral-700"
                >
                  Me contacter
                  <ArrowRight size={15} strokeWidth={2} />
                </Link>
                <Link
                  href="/projets"
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-6 py-3 text-[0.9rem] font-medium text-neutral-900 transition-colors hover:bg-neutral-50"
                >
                  Mes réalisations
                </Link>
              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
