"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Rocket, Star, Clock } from "lucide-react";

const offers = [
  {
    id: "landing",
    icon: Zap,
    badge: null,
    title: "Page Vitrine Rapide",
    price: "700",
    target: "Vous démarrez et voulez être visible rapidement",
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
    target: "Vous avez une activité et voulez un vrai site pro",
    delivery: "2 à 3 semaines",
    features: [
      "3 à 5 pages personnalisées",
      "Visible sur téléphone, tablette et ordinateur",
      "Formulaire de contact intégré",
      "Mieux référencé sur Google",
    ],
  },
  {
    id: "pro",
    icon: Star,
    badge: null,
    title: "Site Pro & Sur Mesure",
    price: "3 000",
    target: "Vous voulez un site soigné qui donne envie de vous contacter",
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
      <div className="mx-auto w-[min(100%-2rem,75rem)]">

        {/* En-tête */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl">
            Des offres claires,<br className="hidden sm:block" /> à votre mesure
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            Pas besoin de connaître les sites web — on s'occupe de tout.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            const isPopular = offer.id === "starter";
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col rounded-2xl border p-7 transition-shadow hover:shadow-lg ${
                  isPopular
                    ? "border-[var(--foreground)] bg-[var(--foreground)] text-white"
                    : "border-[var(--border)] bg-white"
                }`}
              >
                {offer.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-[var(--foreground)] shadow-sm ring-1 ring-[var(--border)]">
                    {offer.badge}
                  </span>
                )}

                <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${isPopular ? "bg-white/10" : "bg-[var(--card)]"}`}>
                  <Icon size={18} strokeWidth={1.75} className={isPopular ? "text-white" : "text-[var(--foreground)]"} />
                </div>

                <h3 className={`text-xl font-semibold ${isPopular ? "text-white" : "text-[var(--foreground)]"}`}>
                  {offer.title}
                </h3>
                <div className="mt-3">
                  <span className={`text-3xl font-bold tracking-tight ${isPopular ? "text-white" : "text-[var(--foreground)]"}`}>
                    {offer.price} €
                  </span>
                </div>
                <p className={`mt-2 text-[0.8125rem] leading-relaxed ${isPopular ? "text-white/60" : "text-[var(--muted)]"}`}>
                  {offer.target}
                </p>

                <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8125rem] font-medium ${isPopular ? "bg-white/10 text-white/80" : "bg-[var(--card)] text-[var(--muted)]"}`}>
                  <Clock size={12} strokeWidth={2} />
                  {offer.delivery === "Selon le projet" ? `Délai : ${offer.delivery}` : `Livraison en ${offer.delivery}`}
                </div>

                <div className={`my-5 h-px w-full ${isPopular ? "bg-white/10" : "bg-[var(--border)]"}`} />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-white/15" : "bg-[var(--card)]"}`}>
                        <Check size={9} strokeWidth={2.5} className={isPopular ? "text-white" : "text-[var(--foreground)]"} />
                      </span>
                      <span className={`text-[0.8125rem] leading-snug ${isPopular ? "text-white/75" : "text-[var(--muted)]"}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/offres"
                  className={`mt-7 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${
                    isPopular
                      ? "bg-white text-[var(--foreground)] hover:bg-white/90"
                      : "bg-[var(--foreground)] text-white hover:opacity-80"
                  }`}
                >
                  Choisir cette offre
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Lien vers page complète */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
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
