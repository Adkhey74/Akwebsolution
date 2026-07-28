"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n/context";

/**
 * Réalisations — bandes alternées « plein cadre ».
 *
 * Un projet par bande : le visuel déborde jusqu'au bord du viewport du côté
 * extérieur (utilitaires .bleed-*, cf. globals.css) et alterne gauche /
 * droite, le texte reste dans la colonne de lecture.
 *
 * Les captures font toutes ~21/9 (1920×910) : le cadre suit ce ratio, donc
 * elles ne sont plus recadrées d'un quart comme dans l'ancienne grille 16/10.
 *
 * Données issues de lib/projects.ts (source de vérité des études de cas) —
 * l'ancien tableau dupliqué en dur a été supprimé.
 */

const HOME_COUNT = 3;
const featured = projects.slice(0, HOME_COUNT);

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function ProjectsPreview() {
  const { t, tList } = useI18n();

  return (
    <section id="realisations" className="section-padding border-t border-[var(--border)]">
      {/* ── En-tête ── */}
      <div className="section-container min-w-0">
        <motion.div
          className="flex flex-col items-start gap-4 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <div className="max-w-xl">
            <span className="eyebrow mb-5">{t("work.eyebrow")}</span>
            <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
              {t("work.title1")}{" "}
              <span className="relative inline-block font-semibold">
                {t("work.titleAccent")}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
                />
              </span>
            </h2>
          </div>

          <Link
            href="/projets"
            className="group hidden items-center gap-2 text-[0.875rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] md:flex"
          >
            {t("work.seeAll")}
            <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* ── Bandes alternées ── */}
      <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28 lg:gap-32">
        {featured.map((project, i) => {
          const mediaFirst = i % 2 === 0;

          return (
            <article key={project.slug} className="section-container min-w-0">
              <div className="grid items-center gap-7 lg:grid-cols-2 lg:gap-14 xl:gap-20">

                {/* Visuel — déborde côté extérieur */}
                <motion.div
                  className={`min-w-0 ${mediaFirst ? "lg:order-1" : "lg:order-2"}`}
                  initial={{ opacity: 0, x: mediaFirst ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, ease: EASE }}
                >
                  <Link
                    href={`/projets/${project.slug}`}
                    aria-label={`${t("work.caseStudyOf")} — ${project.title}`}
                    tabIndex={-1}
                    className={`group relative block overflow-hidden rounded-none bg-[var(--section-alt)] shadow-[0_20px_60px_-30px_var(--shadow-media)] bleed-x lg:rounded-2xl ${
                      mediaFirst
                        ? "lg:bleed-l lg:rounded-l-none"
                        : "lg:bleed-r lg:rounded-r-none"
                    }`}
                  >
                    <div className="relative aspect-[21/9] w-full">
                      <Image
                        src={project.cover.src}
                        alt={project.cover.alt}
                        fill
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 62vw"
                      />
                    </div>
                    {/* voile violet au survol */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 transition-colors duration-500 group-hover:bg-[var(--accent)]/10"
                    />
                  </Link>
                </motion.div>

                {/* Texte */}
                <motion.div
                  className={`flex min-w-0 flex-col items-start ${mediaFirst ? "lg:order-2" : "lg:order-1"}`}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
                >
                  {/* Ligne d'index : 01 —————— catégorie · année */}
                  <div className="flex w-full items-center gap-3">
                    <span className="text-[0.8125rem] font-semibold tabular-nums text-[var(--accent-soft)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px flex-1 bg-[var(--border-hover)]" />
                    <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                      {t(`projects.${project.slug}.category`)}
                    </span>
                    <span className="text-[0.75rem] font-medium tabular-nums text-[var(--muted)]">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-[2.5rem] lg:text-[2.75rem]">
                    {project.title}
                  </h3>

                  <p className="mt-4 max-w-md text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
                    {t(`projects.${project.slug}.summary`)}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {tList(`projects.${project.slug}.tags`).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-[var(--border-hover)] px-2.5 py-0.5 text-[0.75rem] font-medium text-[var(--muted)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={`/projets/${project.slug}`}
                      className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[0.875rem] font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
                    >
                      {t("work.caseStudy")}
                      <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                    </Link>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-[0.875rem] font-medium text-[var(--muted)] underline decoration-[var(--border-hover)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--accent)]"
                      >
                        {t("work.liveSite")}
                        <ArrowUpRight size={14} strokeWidth={2} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── CTA mobile ── */}
      <div className="section-container mt-16 flex justify-center md:hidden">
        <Link
          href="/projets"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-6 py-3 text-[0.875rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
        >
          {t("work.seeAll")}
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
