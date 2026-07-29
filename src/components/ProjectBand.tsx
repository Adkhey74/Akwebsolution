"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { CaseStudy } from "@/lib/projects";
import { useI18n } from "@/lib/i18n/context";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Une bande alternée plein cadre — un projet, image qui déborde du bord
 * extérieur du viewport, texte dans la colonne de lecture.
 *
 * Extrait de ProjectsPreview (accueil) pour être réutilisé tel quel sur le
 * listing complet de /projets (ProjetsList) : les deux pages présentent les
 * réalisations avec exactement le même langage visuel plutôt que deux styles
 * différents à maintenir en parallèle.
 *
 * `mediaFirst` est un prop et non calculé en dur ici : par défaut il alterne
 * sur `index`, mais /projets a besoin d'inverser ce calcul (cf. ProjetsList)
 * pour que le texte du premier projet reste à gauche, dans le prolongement du
 * H1 de la page — sans ce prop, les deux appelants seraient forcés de partir
 * sur la même alternance.
 */
export function ProjectBand({
  project,
  index,
  mediaFirst = index % 2 === 0,
}: {
  project: CaseStudy;
  index: number;
  mediaFirst?: boolean;
}) {
  const { t, tList } = useI18n();

  return (
    <article className="section-container min-w-0">
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
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-[var(--border-hover)]" />
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t(`projects.${project.slug}.category`)}
            </span>
            <span className="text-[0.75rem] font-medium tabular-nums text-[var(--muted)]">
              {project.year}
            </span>
          </div>

          <h2 className="mt-5 text-[2rem] font-semibold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-[2.5rem] lg:text-[2.75rem]">
            {project.title}
          </h2>

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
}
