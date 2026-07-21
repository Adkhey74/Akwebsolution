"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ExternalLink } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

const projects = [
  {
    id: "orbitgroup",
    title: "Orbit Group",
    category: "Site vitrine premium",
    tags: ["Sécurité", "Corporate"],
    image: { src: "/images/OrbitGroup/hero.png", alt: "Orbit Group - Page d'accueil" },
    url: undefined as string | undefined,
  },
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
];

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
            <span className="eyebrow mb-5">Réalisations</span>
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
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <BlurFade key={project.id} delay={0.05 + i * 0.1} inView className="min-w-0">
            <motion.div
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.5)]"
            >
              {/* Halo violet au survol */}
              <div className="pointer-events-none absolute -top-1/3 left-1/2 z-0 h-2/3 w-2/3 -translate-x-1/2 rounded-full bg-[var(--accent)]/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Fenêtre navigateur */}
              <div className="relative z-[1] flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--card)] px-4 py-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="ml-3 hidden h-4 flex-1 rounded-full bg-white/[0.04] sm:block" />
              </div>
              {/* Image */}
              <div className="relative z-[1] aspect-[16/10] w-full overflow-hidden bg-[var(--surface)]">
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
                  href={`/projets/${project.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 text-[0.8125rem] font-medium text-[var(--accent-soft)] transition-opacity hover:opacity-70"
                >
                  Voir l'étude de cas
                  <ArrowRight size={13} strokeWidth={2} />
                </Link>
              </div>
            </motion.div>
            </BlurFade>
          ))}
        </div>

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
