"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  ExternalLink,
  MapPin,
  Tag,
} from "lucide-react";
import { projects } from "@/lib/projects";
import { useI18n } from "@/lib/i18n/context";

/**
 * Corps d'une page d'étude de cas.
 *
 * Extrait de app/projets/[slug]/page.tsx, qui reste un Server Component pour
 * garder generateStaticParams, generateMetadata et le JSON-LD — aucun des
 * trois ne peut cohabiter avec un contexte React.
 *
 * Répartition des données : ce qui ne se traduit pas (images, année, lieu,
 * technologies, URL) vient de lib/projects.ts ; tout le texte vient des
 * traductions, indexé par slug.
 */
export function CaseStudyContent({ slug }: { slug: string }) {
  const { t, tList } = useI18n();

  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const project = projects[index];
  const next = projects[(index + 1) % projects.length];

  const k = (field: string) => `projects.${slug}.${field}`;

  return (
    <main id="main" className="min-w-0">

      {/* En-tête */}
      <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
        <Link
          href="/projets"
          className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
        >
          <ArrowLeft size={15} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
          {t("workPage.allWork")}
        </Link>

        <div className="mt-8 max-w-3xl">
          <span className="eyebrow mb-5">{t(k("category"))}</span>
          <h1 className="text-[2.25rem] font-light leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-[3rem] md:text-[3.5rem]">
            {project.title}
          </h1>
          <p className="mt-5 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
            {t(k("summary"))}
          </p>

          {/* Méta */}
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem] text-[var(--muted)]">
            <span className="inline-flex items-center gap-2">
              <Tag size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
              {t(k("sector"))}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
              {project.year}
            </span>
            {project.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
                {project.location}
              </span>
            )}
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[var(--accent-soft)] underline underline-offset-4 hover:text-[var(--foreground)]"
              >
                <ExternalLink size={14} strokeWidth={1.75} />
                {t("work.liveSite")}
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Visuel principal — fenêtre navigateur */}
      <section className="section-container pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] glow-surface">
          <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--card)] px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--foreground)]/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--foreground)]/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--foreground)]/15" />
            <span className="ml-3 hidden h-4 flex-1 rounded-full bg-[var(--foreground)]/[0.07] sm:block" />
          </div>
          <div className="relative aspect-[16/10] w-full">
            <Image
              src={project.cover.src}
              alt={project.cover.alt}
              fill
              priority
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        </div>
      </section>

      {/* Défi + Solution */}
      <section className="section-container pb-16 md:pb-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
          <div>
            <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
              {t("workPage.challenge")}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[var(--muted)]">
              {t(k("challenge"))}
            </p>

            <div className="mt-8">
              <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                {t("workPage.techs")}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-[0.75rem] font-medium text-[var(--accent-soft)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
              {t("workPage.solution")}
            </h2>
            <ul className="mt-4 flex flex-col gap-3.5">
              {tList(k("solution")).map((s) => (
                <li key={s} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                    <Check size={11} strokeWidth={2.5} className="text-[var(--accent-soft)]" />
                  </span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Galerie */}
      <section className="section-container pb-16 md:pb-20">
        <h2 className="mb-8 text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
          {t("workPage.gallery")}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2">
          {project.images.map((img) => (
            <div
              key={img.src}
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Résultats */}
      <section className="section-container pb-16 md:pb-24">
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--section-alt)] p-8 md:p-12">
          <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
            {t("workPage.result")}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {tList(k("results")).map((r) => (
              <li key={r} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--foreground)]">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                  <Check size={11} strokeWidth={2.5} className="text-white" />
                </span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA + réalisation suivante */}
      <section className="section-container border-t border-[var(--border)] py-16 md:py-24">
        <div className="flex flex-col items-center gap-8 text-center">
          <div>
            <h2 className="text-[1.875rem] font-light tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
              {t("workPage.ctaTitle1")}{" "}
              <span className="font-display font-semibold italic text-[var(--accent-soft)]">
                {t("workPage.ctaTitleAccent")}
              </span>
            </h2>
            <p className="mt-3 text-[0.9375rem] text-[var(--muted)]">{t("workPage.ctaBody")}</p>
          </div>
          <Link
            href="/#contact"
            className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-[0.9375rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
          >
            {t("workPage.ctaButton")}
            <ArrowRight size={16} strokeWidth={2} />
          </Link>

          <Link
            href={`/projets/${next.slug}`}
            className="group mt-2 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            {t("workPage.nextProject")} {next.title}
            <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>
    </main>
  );
}
