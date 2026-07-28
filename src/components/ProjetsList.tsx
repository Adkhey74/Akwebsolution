"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n/context";

/**
 * Listing de la page /projets.
 *
 * Extrait de app/projets/page.tsx, qui garde son `metadata` (Server Component)
 * et ne peut donc pas consommer le contexte i18n.
 *
 * Au passage : la page portait son PROPRE tableau de projets en dur, distinct
 * de lib/projects.ts — mêmes projets, descriptions divergentes. Tout vient
 * désormais de lib/projects.ts pour la donnée et des traductions pour le texte.
 */
export function ProjetsList() {
  const { t, tList } = useI18n();

  return (
    <section className="section-container min-w-0 pb-20 md:pb-24 lg:pb-32">
      <div className="space-y-20 md:space-y-24 lg:space-y-32">
        {projects.map((project, i) => (
          <div key={project.slug} id={project.slug} className="scroll-mt-28">
            <ProjectShowcase
              title={project.title}
              category={t(`projects.${project.slug}.category`)}
              description={t(`projects.${project.slug}.summary`)}
              tags={tList(`projects.${project.slug}.tags`)}
              year={project.year}
              url={project.url}
              images={project.images}
              index={i}
            />
            <div className="mt-6 flex justify-center md:justify-start">
              <Link
                href={`/projets/${project.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 text-[0.8125rem] font-medium text-[var(--accent-soft)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent)] hover:text-white"
              >
                {t("workPage.readCase")}
                <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
