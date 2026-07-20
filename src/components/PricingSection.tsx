"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Rocket, ShoppingCart, Star, Clock, ArrowRight } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";

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
    features: [
      "Une seule page complète et soignée",
      "Visible sur téléphone, tablette et ordinateur",
      "Formulaire de contact intégré",
      "Visible sur Google dès le lancement",
    ],
  },
  {
    id: "starter",
    icon: Rocket,
    badge: "Populaire",
    title: "Site Vitrine Complet",
    price: "1 500",
    result: "Un site professionnel qui inspire confiance et génère des contacts.",
    target: "Idéal pour les activités établies qui veulent un vrai site pro",
    delivery: "2 à 3 semaines",
    features: [
      "3 à 5 pages personnalisées",
      "Visible sur téléphone, tablette et ordinateur",
      "Formulaire de contact intégré",
      "Mieux référencé sur Google",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    badge: null,
    title: "Site E-commerce",
    price: "2 000",
    priceFrom: true,
    result: "Vendez vos produits 24h/24, sans intermédiaire, dès le lancement.",
    target: "Idéal pour lancer ou migrer une boutique en ligne",
    delivery: "Selon le projet",
    features: [
      "Boutique en ligne avec panier et tunnel de commande",
      "Paiement en ligne sécurisé (CB, PayPal…)",
      "Gestion des produits et des stocks",
      "Visible sur téléphone, tablette et ordinateur",
    ],
  },
  {
    id: "pro",
    icon: Star,
    badge: null,
    title: "Site Pro & Sur Mesure",
    price: "3 000",
    result: "Un site premium qui vous démarque et donne envie de vous contacter.",
    target: "Idéal pour les projets ambitieux qui veulent marquer les esprits",
    delivery: "Selon le projet",
    features: [
      "Jusqu'à 8 pages entièrement personnalisées",
      "Modifiable vous-même facilement",
      "Animations fluides haut de gamme",
      "1 mois d'accompagnement inclus",
    ],
  },
];

export function PricingSection() {
  return (
    <section className="border-t border-[var(--border)] py-24 md:py-32" id="offres">
      <div className="section-container mx-auto w-full max-w-[90rem]">

        {/* En-tête */}
        <motion.div
          className="mb-14 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="eyebrow mb-5">Offres</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Des offres claires,<br className="hidden sm:block" /> à votre mesure
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            Pas besoin de connaître les sites web — on s'occupe de tout.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            const isPopular = offer.id === "starter";
            return (
              <BlurFade key={offer.id} delay={0.05 + i * 0.1} inView className="min-w-0">
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative flex h-full flex-col rounded-2xl border p-5 transition-all hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)] ${
                  isPopular
                    ? "border-[var(--foreground)]/40 bg-[var(--surface)] glow-surface"
                    : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
                }`}
              >
                {offer.badge && (
                  <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--foreground)] px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--background)] shadow-sm">
                    {offer.badge}
                  </span>
                )}

                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
                  <Icon size={18} strokeWidth={1.75} className="text-[var(--foreground)]" />
                </div>

                <h3 className="text-xl font-semibold text-[var(--foreground)]">
                  {offer.title}
                </h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                  {offer.result}
                </p>

                <div className="mt-5 mb-8">
                  {offer.priceFrom && (
                    <span className="block text-[0.7rem] font-medium uppercase tracking-wider text-[var(--muted)]">
                      À partir de
                    </span>
                  )}
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-bold tracking-tight text-[var(--foreground)]">
                      {offer.price} €
                    </span>
                  </div>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--muted)]">
                    <Clock size={12} strokeWidth={2} />
                    {offer.delivery === "Selon le projet" ? `Délai : ${offer.delivery}` : `Livraison en ${offer.delivery}`}
                  </span>
                </div>

                <Link
                  href="/offres"
                  className={`group/cta mt-auto flex items-center justify-center gap-1.5 rounded-full py-3 text-[0.875rem] font-medium transition-all duration-200 ${
                    isPopular
                      ? "bg-[var(--foreground)] text-[var(--background)] hover:opacity-85"
                      : "border border-[var(--border-hover)] text-[var(--foreground)] hover:bg-[var(--card)]"
                  }`}
                >
                  Choisir cette offre
                  <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover/cta:translate-x-0.5" />
                </Link>

                {isPopular && (
                  <BorderBeam
                    size={120}
                    duration={7}
                    borderWidth={1.5}
                    colorFrom="rgba(255,255,255,0)"
                    colorTo="rgba(255,255,255,0.7)"
                  />
                )}
              </motion.div>
              </BlurFade>
            );
          })}
        </div>

        {/* Lien vers page complète */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/offres"
            className="text-[0.875rem] text-[var(--muted)] underline underline-offset-4 hover:text-[var(--foreground)] transition-colors"
          >
            Voir le détail de toutes les offres
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
