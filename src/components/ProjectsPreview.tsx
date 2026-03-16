"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const projects = [
  {
    id: "kabuki",
    title: "Kabuki",
    category: "Site vitrine",
    tags: ["Restaurant", "Réservation"],
    image: { src: "/images/Kabuki/Acceuil.png", alt: "Kabuki - Page d'accueil" },
    url: undefined as string | undefined,
  },
  {
    id: "herntaxi",
    title: "HernTaxi",
    category: "Site vitrine",
    tags: ["Multi-pages", "SEO"],
    image: { src: "/images/herntaxi/acceuil-new.png", alt: "HernTaxi - Page d'accueil" },
    url: "https://herntaxi.fr",
  },
  {
    id: "thermochrono",
    title: "ThermoChrono",
    category: "E-commerce",
    tags: ["Boutique", "Paiement sécurisé"],
    image: { src: "/images/thermochrono/acceuil.png", alt: "ThermoChrono - Page d'accueil" },
    url: "https://thermochrono.fr",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 32, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export function ProjectsPreview() {
  return (
    <section className="section-padding border-t border-[var(--border)] overflow-hidden">
      <div className="section-container min-w-0">

        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-start gap-4 md:mb-16 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-[var(--surface)] px-4 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                Réalisations
              </span>
            </div>
            <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
              Ce que nous avons{" "}
              <span className="relative inline-block font-semibold">
                déjà créé
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

          <Link
            href="/projets"
            className="group hidden items-center gap-2 text-[0.875rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] md:flex"
          >
            Voir tous les projets
            <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>

        {/* Grille projets */}
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
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>

              {/* Infos */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {project.category}
                    </span>
                    <h3 className="mt-0.5 text-[1.125rem] font-semibold tracking-tight text-[var(--foreground)]">
                      {project.title}
                    </h3>
                  </div>
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Voir le site ${project.title}`}
                      onClick={(e) => e.stopPropagation()}
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[var(--border)] text-[var(--muted)] transition-all hover:border-[var(--foreground)] hover:text-[var(--foreground)]"
                    >
                      <ExternalLink size={13} strokeWidth={2} />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[var(--border-hover)] px-2.5 py-0.5 text-[0.68rem] font-medium text-[var(--muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/projets#${project.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--accent)] transition-opacity hover:opacity-70"
                >
                  Voir le projet
                  <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA mobile */}
        <motion.div
          className="mt-10 flex justify-center md:hidden"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Link
            href="/projets"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-6 py-3 text-[0.875rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
          >
            Voir tous les projets
            <ArrowRight size={15} strokeWidth={2} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
