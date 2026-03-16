"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sophie M.",
    role: "Gérante — Salon de beauté",
    text: "Site livré en moins d'une semaine, exactement ce que je voulais. Mes clients me disent souvent qu'ils ont trouvé mon site très professionnel. Je recommande sans hésiter.",
    stars: 5,
  },
  {
    name: "Karim B.",
    role: "Fondateur — HernTaxi",
    text: "Adil a su capter l'image de mon activité dès le premier échange. Le résultat est propre, rapide et bien référencé. Les réservations en ligne ont clairement augmenté.",
    stars: 5,
  },
  {
    name: "Laura D.",
    role: "Créatrice — ThermoChrono",
    text: "La boutique en ligne est exactement ce que j'imaginais. Le tunnel d'achat est fluide et le design donne vraiment confiance. Prix fixe, pas de mauvaise surprise.",
    stars: 5,
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function Testimonials() {
  return (
    <section className="section-padding border-t border-[var(--border)] overflow-hidden">
      <div className="section-container min-w-0">

        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-[var(--surface)] px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Avis clients
            </span>
          </div>
          <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            Ils nous ont fait{" "}
            <span className="relative inline-block font-semibold">
              confiance
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
              />
            </span>
          </h2>
        </motion.div>

        {/* Cartes */}
        <motion.div
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.05 },
            },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {testimonials.map((t) => (
            <motion.article
              key={t.name}
              variants={cardVariant}
              className="flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-shadow hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.5)] md:p-8"
            >
              {/* Étoiles */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Texte */}
              <p className="flex-1 text-[0.9375rem] leading-[1.7] text-[var(--muted)]">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Auteur */}
              <div className="flex items-center gap-3 border-t border-[var(--border)] pt-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--card)] text-[0.8125rem] font-semibold text-[var(--foreground)]">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-[0.875rem] font-semibold text-[var(--foreground)]">{t.name}</p>
                  <p className="text-[0.75rem] text-[var(--muted)]">{t.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
