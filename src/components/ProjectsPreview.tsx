"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ProjectBand } from "@/components/ProjectBand";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n/context";

/**
 * Réalisations — bandes alternées « plein cadre ».
 *
 * Un projet par bande : le visuel déborde jusqu'au bord du viewport du côté
 * extérieur (utilitaires .bleed-*, cf. globals.css) et alterne gauche /
 * droite, le texte reste dans la colonne de lecture. Le rendu de chaque
 * bande vit dans ProjectBand, partagé avec le listing complet de /projets.
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
  const { t, lp } = useI18n();

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
            href={lp("/projets")}
            className="group hidden items-center gap-2 text-[0.875rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)] md:flex"
          >
            {t("work.seeAll")}
            <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </motion.div>
      </div>

      {/* ── Bandes alternées ── */}
      <div className="mt-14 flex flex-col gap-20 md:mt-20 md:gap-28 lg:gap-32">
        {featured.map((project, i) => (
          <ProjectBand key={project.slug} project={project} index={i} />
        ))}
      </div>

      {/* ── CTA mobile ── */}
      <div className="section-container mt-16 flex justify-center md:hidden">
        <Link
          href={lp("/projets")}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-6 py-3 text-[0.875rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
        >
          {t("work.seeAll")}
          <ArrowRight size={15} strokeWidth={2} />
        </Link>
      </div>
    </section>
  );
}
