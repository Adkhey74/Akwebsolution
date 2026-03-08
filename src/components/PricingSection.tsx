"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check, Zap, Rocket, ShoppingCart, Star, Clock } from "lucide-react";

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
    id: "ecommerce",
    icon: ShoppingCart,
    badge: null,
    title: "Site E-commerce",
    price: "2 000",
    priceFrom: true,
    target: "Vous voulez vendre en ligne avec panier et paiement",
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
    <section className="border-t border-white/10 py-24 md:py-32" id="offres">
      <div className="mx-auto w-[min(100%-2rem,90rem)]">

        {/* En-tête */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-white">
            Des offres claires,<br className="hidden sm:block" /> à votre mesure
          </h2>
          <p className="mx-auto mt-4 max-w-md text-[0.9375rem] leading-relaxed text-white/80">
            Pas besoin de connaître les sites web — on s'occupe de tout.
          </p>
        </motion.div>

        {/* Cartes */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {offers.map((offer, i) => {
            const Icon = offer.icon;
            const isPopular = offer.id === "starter";
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative flex flex-col rounded-2xl border p-5 backdrop-blur-sm transition-shadow hover:shadow-lg ${
                  isPopular
                    ? "border-transparent bg-white text-black shadow-2xl ring-2 ring-white ring-offset-2 ring-offset-transparent"
                    : "border-white/20 bg-white/10"
                }`}
              >
                {offer.badge && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white shadow-sm">
                    {offer.badge}
                  </span>
                )}

                <div className={`mb-5 flex h-10 w-10 items-center justify-center rounded-xl ${isPopular ? "bg-black/10" : "bg-white/10"}`}>
                  <Icon size={18} strokeWidth={1.75} className={isPopular ? "text-black" : "text-white"} />
                </div>

                <h3 className={`text-xl font-semibold ${isPopular ? "text-black" : "text-white"}`}>
                  {offer.title}
                </h3>
                <div className="mt-3">
                  {offer.priceFrom && (
                    <span className={`block text-[0.75rem] font-medium uppercase tracking-wider ${isPopular ? "text-black/60" : "text-white/70"}`}>
                      À partir de
                    </span>
                  )}
                  <span className={`text-3xl font-bold tracking-tight ${isPopular ? "text-black" : "text-white"}`}>
                    {offer.price} €
                  </span>
                </div>
                <p className={`mt-2 text-[0.8125rem] leading-relaxed ${isPopular ? "text-black/75" : "text-white/75"}`}>
                  {offer.target}
                </p>

                <div className={`mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8125rem] font-medium ${isPopular ? "bg-black/8 text-black/75" : "bg-white/10 text-white/85"}`}>
                  <Clock size={12} strokeWidth={2} />
                  {offer.delivery === "Selon le projet" ? `Délai : ${offer.delivery}` : `Livraison en ${offer.delivery}`}
                </div>

                <div className={`my-5 h-px w-full ${isPopular ? "bg-black/10" : "bg-white/10"}`} />

                <ul className="flex flex-1 flex-col gap-2.5">
                  {offer.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-black/10" : "bg-white/15"}`}>
                        <Check size={9} strokeWidth={2.5} className={isPopular ? "text-black" : "text-white"} />
                      </span>
                      <span className={`text-[0.8125rem] leading-snug ${isPopular ? "text-black/80" : "text-white/80"}`}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/offres"
                  className={`mt-7 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${isPopular ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/90"}`}
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
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Link
            href="/offres"
            className="text-[0.875rem] text-white/90 underline underline-offset-4 hover:text-white transition-colors"
          >
            Voir le détail de toutes les offres
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
