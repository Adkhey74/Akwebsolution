"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Zap, Rocket, ShoppingCart, Star, Clock } from "lucide-react";

const offers = [
  {
    id: "landing",
    icon: Zap,
    badge: null,
    title: "Page Vitrine Rapide",
    price: "700",
    target: "Vous démarrez et voulez être visible sur internet rapidement",
    delivery: "5 à 7 jours ouvrés",
    features: [
      "Une seule page complète : présentation, services, contact…",
      "S'affiche parfaitement sur téléphone, tablette et ordinateur",
      "Un formulaire pour que vos clients vous contactent directement",
      "Visible sur Google dès le lancement",
      "Site en ligne 24h/24 — aucun hébergement à gérer de votre côté",
      "Une série de retouches incluse après livraison",
    ],
  },
  {
    id: "starter",
    icon: Rocket,
    badge: "Populaire",
    title: "Site Vitrine Complet",
    price: "1 500",
    target: "Vous avez une activité et voulez un vrai site professionnel",
    delivery: "2 à 3 semaines",
    features: [
      "3 à 5 pages (Accueil, Services, À propos, Contact…)",
      "S'affiche parfaitement sur téléphone, tablette et ordinateur",
      "Un formulaire pour que vos clients vous contactent directement",
      "Mieux référencé sur Google pour attirer plus de visiteurs",
      "Site en ligne 24h/24 — aucun hébergement à gérer de votre côté",
      "Une série de retouches incluse après livraison",
    ],
  },
  {
    id: "ecommerce",
    icon: ShoppingCart,
    badge: null,
    title: "Site E-commerce",
    price: "2 000",
    priceFrom: true,
    target: "Vous voulez vendre en ligne avec panier et paiement sécurisé",
    delivery: "Selon le projet",
    features: [
      "Boutique en ligne avec panier et tunnel de commande",
      "Paiement en ligne sécurisé (CB, PayPal, etc.)",
      "Gestion des produits et des stocks",
      "S'affiche parfaitement sur téléphone, tablette et ordinateur",
      "Visible sur Google pour attirer des clients",
      "Site en ligne 24h/24 — hébergement inclus",
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
      "Vous pouvez modifier vous-même les textes et images facilement",
      "Animations fluides pour une expérience haut de gamme",
      "Section blog ou actualités pour partager votre expertise",
      "Optimisé pour apparaître en tête des résultats Google",
      "Statistiques de visites configurées (qui visite votre site, quand…)",
      "Deux séries de retouches incluses après livraison",
      "1 mois d'accompagnement après la mise en ligne",
    ],
  },
];

export default function OffresPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        {/* Header section */}
        <section className="pt-36 pb-16 md:pt-44 md:pb-20">
          <div className="mx-auto w-[min(100%-2rem,75rem)] text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl leading-tight text-white md:text-5xl lg:text-6xl">
                Des offres claires,<br />à votre mesure
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-white/80">
                Pas besoin de connaître les sites web — on s'occupe de tout. Choisissez ce qui correspond à votre situation, on fait le reste.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards */}
        <section className="pb-28 md:pb-36">
          <div className="mx-auto w-[min(100%-2rem,90rem)]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {offers.map((offer, i) => {
                const Icon = offer.icon;
                const isPopular = offer.id === "starter";
                return (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                    className={`relative flex flex-col rounded-2xl border p-5 backdrop-blur-sm transition-shadow hover:shadow-lg ${
                      isPopular
                        ? "border-transparent bg-white text-black shadow-2xl ring-2 ring-white ring-offset-2 ring-offset-transparent"
                        : "border-white/20 bg-white/10 text-white"
                    }`}
                  >
                    {/* Badge populaire */}
                    {offer.badge && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-black px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white shadow-sm">
                        {offer.badge}
                      </span>
                    )}

                    {/* Icône */}
                    <div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-xl ${isPopular ? "bg-black/10" : "bg-white/10"}`}>
                      <Icon size={20} strokeWidth={1.75} className={isPopular ? "text-black" : "text-white"} />
                    </div>

                    {/* Titre & prix */}
                    <h2 className={`text-2xl font-semibold ${isPopular ? "text-black" : "text-white"}`}>
                      {offer.title}
                    </h2>
                    <div className="mt-4">
                      {offer.priceFrom && (
                        <span className={`block text-[0.75rem] font-medium uppercase tracking-wider ${isPopular ? "text-black/60" : "text-white/70"}`}>
                          À partir de
                        </span>
                      )}
                      <span className={`text-4xl font-bold tracking-tight ${isPopular ? "text-black" : "text-white"}`}>
                        {offer.price} €
                      </span>
                    </div>

                    {/* Cible */}
                    <p className={`mt-3 text-[0.8125rem] leading-relaxed ${isPopular ? "text-black/75" : "text-white/80"}`}>
                      {offer.target}
                    </p>

                    {/* Délai */}
                    <div className={`mt-5 flex items-center gap-2 rounded-lg px-3 py-2 text-[0.8125rem] font-medium ${isPopular ? "bg-black/8 text-black/75" : "bg-white/10 text-white/90"}`}>
                      <Clock size={13} strokeWidth={2} />
                      {offer.delivery === "Selon le projet" ? `Délai : ${offer.delivery}` : `Livraison en ${offer.delivery}`}
                    </div>

                    {/* Séparateur */}
                    <div className={`my-6 h-px w-full ${isPopular ? "bg-black/10" : "bg-white/10"}`} />

                    {/* Features */}
                    <ul className="flex flex-1 flex-col gap-3">
                      {offer.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${isPopular ? "bg-black/10" : "bg-white/15"}`}>
                            <Check size={10} strokeWidth={2.5} className={isPopular ? "text-black" : "text-white"} />
                          </span>
                          <span className={`text-[0.875rem] leading-snug ${isPopular ? "text-black/80" : "text-white/85"}`}>
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/#contact"
                      className={`mt-8 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${isPopular ? "bg-black text-white hover:bg-black/85" : "bg-white text-black hover:bg-white/90"}`}
                    >
                      Choisir cette offre
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Note bas de page */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 text-center text-[0.8125rem] text-white/80"
            >
              Vous ne savez pas quelle formule choisir ?{" "}
              <Link href="/#contact" className="underline underline-offset-2 text-white hover:text-white/90">
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
