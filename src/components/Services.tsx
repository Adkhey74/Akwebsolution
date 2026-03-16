"use client";

import { motion } from "framer-motion";
import { Layout, Smartphone, Zap, Palette, Search, Shield } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Sites vitrines",
    description:
      "Présentez votre activité avec un site clair, moderne et responsive, conçu pour convertir vos visiteurs en clients.",
  },
  {
    icon: Smartphone,
    title: "Design responsive",
    description:
      "Une expérience optimale sur tous les écrans : mobile, tablette et desktop, sans compromis.",
  },
  {
    icon: Zap,
    title: "Performance",
    description:
      "Sites rapides et légers pour un meilleur référencement, une meilleure expérience et plus de conversions.",
  },
  {
    icon: Palette,
    title: "Identité visuelle",
    description:
      "Design sur mesure aligné avec votre charte et votre image de marque pour vous démarquer.",
  },
  {
    icon: Search,
    title: "SEO",
    description:
      "Bases SEO solides pour améliorer votre visibilité dans les moteurs de recherche dès le lancement.",
  },
  {
    icon: Shield,
    title: "Maintenance",
    description:
      "Mises à jour, sauvegardes et suivi pour un site toujours à jour, sécurisé et performant.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.06 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 36, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function Services() {
  return (
    <section id="services" className="section-padding border-t border-[var(--border)] overflow-hidden">
      <div className="section-container min-w-0">

        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-start gap-4 md:mb-18 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-[var(--surface)] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Prestations
              </span>
            </div>

            <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
              Tout ce qu'il faut pour{" "}
              <span className="relative inline-block font-semibold">
                réussir en ligne
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
                />
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-right">
            Chaque prestation est pensée pour votre projet, de la conception
            jusqu'à la mise en ligne.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {services.map((service, i) => (
            <motion.article
              key={service.title}
              variants={cardVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 transition-all hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)] md:p-8"
            >
              {/* Numéro */}
              <span className="absolute right-6 top-6 text-[0.7rem] font-semibold tabular-nums text-[var(--border-hover)] select-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Icône */}
              <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all group-hover:border-[var(--accent)]">
                <service.icon className="h-5 w-5 text-[var(--foreground)]" strokeWidth={1.5} />
              </div>
              {/* Texte */}
              <div>
                <h3 className="mb-2 text-[1.0625rem] font-semibold tracking-tight text-[var(--foreground)]">
                  {service.title}
                </h3>
                <p className="text-[0.875rem] leading-relaxed text-[var(--muted)]">
                  {service.description}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
