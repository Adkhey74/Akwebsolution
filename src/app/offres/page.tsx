"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Zap, Rocket, Star, Clock, Plus } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MaintenancePlan } from "@/components/MaintenancePlan";

const offers = [
  {
    id: "landing",
    icon: Zap,
    badge: null,
    title: "Page Vitrine Rapide",
    price: "700",
    result: "Soyez visible en ligne en moins d'une semaine, sans budget excessif.",
    target: "Idéal pour tester votre concept avant d'investir davantage",
    delivery: "5 à 7 jours ouvrés",
    inherits: null,
    features: [
      "Une page complète et soignée : présentation, services, contact",
      "Mise en page à partir d'une structure éprouvée, à vos couleurs et vos photos",
      "S'affiche parfaitement sur téléphone, tablette et ordinateur",
      "Formulaire de contact et bouton d'appel direct",
      "Référencé sur Google, mentions légales et RGPD conformes",
      "Mise en ligne, nom de domaine et hébergement configurés pour vous",
      "1 série de retouches, à demander dans les 14 jours",
    ],
  },
  {
    id: "starter",
    icon: Rocket,
    badge: "Populaire",
    title: "Site Vitrine Complet",
    price: "1 500",
    result: "Soyez trouvé par les clients qui cherchent votre métier près de chez eux.",
    target: "Idéal pour les activités établies qui veulent attirer de nouveaux clients",
    delivery: "2 à 3 semaines",
    inherits: "Page Vitrine Rapide",
    features: [
      "3 à 5 pages, dont une page dédiée par service",
      "Rendez-vous de cadrage : vos pages et votre parcours client définis ensemble",
      "Préversion en ligne : vous validez le site réel avant sa mise en ligne",
      "Référencement local travaillé : « votre métier + Annecy », données structurées",
      "Fiche Google Business créée et reliée à votre site",
      "Sections avis clients, réalisations et à propos",
      "Suivi des visites installé, sans cookie ni bandeau de consentement",
      "1er mois de maintenance offert",
      "2 séries de retouches",
    ],
  },
  {
    id: "pro",
    icon: Star,
    badge: null,
    title: "Site Pro & Sur Mesure",
    price: "2 500",
    result: "Un site premium qui vous démarque et donne envie de vous contacter.",
    target: "Idéal pour les projets ambitieux qui veulent marquer les esprits",
    delivery: "Selon le projet",
    inherits: "Site Vitrine Complet",
    features: [
      "Jusqu'à 8 pages entièrement personnalisées",
      "Version anglaise du site incluse",
      "Animations fluides pour une expérience haut de gamme",
      "Section blog ou actualités — vos articles publiés pour vous",
      "Optimisation SEO technique complète : structure, vitesse, données structurées",
      "1 mois d'accompagnement après la mise en ligne",
    ],
  },
];

const options = [
  { label: "Page supplémentaire", price: "250 €" },
  {
    label: "Version anglaise du site",
    price: "à partir de 490 €",
    note: "Idéal pour l'hôtellerie, la restauration, les activités et les transferts autour du lac et vers Genève.",
  },
  { label: "Réservation ou prise de rendez-vous en ligne", price: "à partir de 390 €" },
  { label: "Vos avis Google affichés automatiquement sur le site", price: "290 €" },
  { label: "Rédaction de vos textes", price: "à partir de 300 €" },
];

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main">
        {/* Header section */}
        <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
          <div className="mx-auto w-full max-w-[75rem] text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-0"
            >
              <h1 className="text-balance text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                Des offres claires, à votre mesure
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--muted)]">
                Pas besoin de connaître les sites web — on s'occupe de tout. Choisissez ce qui correspond à votre situation, on fait le reste.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards */}
        <section className="section-container pb-20 md:pb-28 lg:pb-36">
          <div className="mx-auto w-full max-w-[72rem]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer, i) => {
                const Icon = offer.icon;
                const isPopular = offer.id === "starter";
                return (
                  <BlurFade key={offer.id} delay={0.1 + i * 0.1} inView className="min-w-0">
                  <motion.div
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className={`relative flex h-full flex-col rounded-2xl border p-5 transition-all hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] ${
                      isPopular
                        ? "border-[var(--accent)]/50 bg-[var(--surface)] glow-surface"
                        : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    {/* Badge populaire */}
                    {offer.badge && (
                      <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-6px_var(--accent)]">
                        {offer.badge}
                      </span>
                    )}

                    {/* Icône */}
                    <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                      <Icon size={20} strokeWidth={1.75} className="text-[var(--foreground)]" />
                    </div>

                    {/* Titre & prix */}
                    <h2 className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                      {offer.title}
                    </h2>
                    <p className="mt-2 text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
                      {offer.result}
                    </p>
                    <div className="mt-4">
                      <span className="block text-[0.75rem] font-medium uppercase tracking-wider text-[var(--muted)]">
                        À partir de
                      </span>
                      <span className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                        {offer.price} €
                      </span>
                    </div>

                    {/* Cible */}
                    <p className="mt-2 text-[0.75rem] leading-relaxed text-[var(--muted)]">
                      {offer.target}
                    </p>

                    {/* Délai */}
                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-[var(--card)] px-3 py-2 text-[0.8125rem] font-medium text-[var(--muted)]">
                      <Clock size={13} strokeWidth={2} />
                      {offer.delivery === "Selon le projet" ? `Délai : ${offer.delivery}` : `Livraison en ${offer.delivery}`}
                    </div>

                    {/* Séparateur */}
                    <div className="my-6 h-px w-full bg-[var(--border)]" />

                    {/* Features */}
                    <ul className="flex flex-1 flex-col gap-3">
                      {offer.inherits && (
                        <li className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
                            <Plus size={10} strokeWidth={3} className="text-[var(--accent)]" />
                          </span>
                          <span className="text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
                            Tout ce qui est inclus dans {offer.inherits}, plus :
                          </span>
                        </li>
                      )}
                      {offer.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--card)]">
                            <Check size={10} strokeWidth={2.5} className="text-[var(--foreground)]" />
                          </span>
                          <span className="text-[0.875rem] leading-snug text-[var(--muted)]">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/#contact"
                      className={`mt-8 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${
                        isPopular
                          ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                          : "border border-[var(--border-hover)] text-[var(--foreground)] hover:bg-[var(--card)]"
                      }`}
                    >
                      Choisir cette offre
                    </Link>

                    {isPopular && (
                      <BorderBeam
                        size={120}
                        duration={7}
                        borderWidth={1.5}
                        colorFrom="rgba(109,94,255,0)"
                        colorTo="rgba(167,139,250,0.9)"
                      />
                    )}
                  </motion.div>
                  </BlurFade>
                );
              })}
            </div>

            {/* Options à la carte */}
            <BlurFade delay={0.2} inView>
              <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h2
                  className="text-xl font-semibold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Options à la carte
                </h2>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                  À ajouter à n’importe quelle offre, selon vos besoins.
                </p>
                <ul className="mt-6 flex flex-col divide-y divide-[var(--border)]">
                  {options.map((opt) => (
                    <li
                      key={opt.label}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                    >
                      <div className="min-w-0">
                        <span className="text-[0.9375rem] text-[var(--foreground)]">{opt.label}</span>
                        {opt.note && (
                          <p className="mt-1 max-w-md text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                            {opt.note}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-[0.9375rem] font-semibold text-[var(--foreground)]">
                        {opt.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>

            {/* Maintenance */}
            <BlurFade delay={0.25} inView className="mt-4 block">
              <MaintenancePlan />
            </BlurFade>

            {/* Note bas de page */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 text-center text-[0.8125rem] text-[var(--muted)]"
            >
              Vous ne savez pas quelle formule choisir ?{" "}
              <Link href="/#contact" className="underline underline-offset-2 hover:text-[var(--foreground)]">
                Écrivez-nous
              </Link>
              , on vous guide gratuitement.
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
