"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { ArrowRight, MessagesSquare, PenTool, Rocket } from "lucide-react";
import { entryPrice, formatEuros } from "@/lib/offers";
import { useI18n } from "@/lib/i18n/context";

/**
 * Méthode — remplace l'ancienne grille de 3 cartes tarifaires.
 *
 * Pourquoi ce changement :
 *  - les 3 cartes reproduisaient celles de /offres (mêmes offres, mêmes tarifs
 *    écrits en dur dans deux fichiers, et des champs `features` / `target`
 *    recopiés puis jamais rendus) ;
 *  - trois colonnes de prix alignées invitent à comparer sur le tarif et
 *    ramènent le regard vers le moins cher — mauvais réflexe à provoquer pour
 *    du sur-mesure ;
 *  - le prix arrivait avant toute preuve (les avis clients sont désactivés), or
 *    un prix sans preuve paraît toujours trop élevé.
 *
 * À la place : le déroulé du projet (ce qui rassure), UN seul tarif d'entrée
 * dérivé de lib/offers.ts (ce qui filtre les budgets), et le comparatif détaillé
 * renvoyé sur /offres — sa vraie place, pour qui compare déjà.
 */

const steps = [
  { icon: MessagesSquare, key: "step1" },
  { icon: PenTool,        key: "step2" },
  { icon: Rocket,         key: "step3" },
];

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

export function PricingSection() {
  const { t } = useI18n();

  return (
    <section
      id="offres"
      className="section-padding border-t border-[var(--border)] bg-[var(--section-alt)]"
    >
      <div className="section-container min-w-0">

        {/* ── En-tête ── */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <span className="eyebrow mb-5">{t("method.eyebrow")}</span>
          <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            {t("method.title1")}{" "}
            <span className="relative inline-block font-semibold">
              {t("method.titleAccent")}
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.3, ease: EASE }}
                className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
              />
            </span>
          </h2>
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-[1rem]">
            {t("method.intro")}
          </p>
        </motion.div>

        {/* ── Les 3 étapes ── */}
        {/* gap-px + fond --border : les filets entre les cartes sont les
            gouttières de la grille, donc pas de bordures qui se doublent */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:mt-16 lg:grid-cols-3">
          {steps.map((step, i) => (
            <motion.div
              key={step.key}
              className="flex flex-col bg-[var(--surface)] p-7 md:p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: 0.08 + i * 0.1, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <span className="text-[0.8125rem] font-semibold tabular-nums text-[var(--accent-soft)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-[var(--border-hover)]" />
                <step.icon size={17} strokeWidth={1.75} className="text-[var(--accent)]" />
              </div>

              <h3 className="mt-6 text-[1.25rem] font-semibold tracking-tight text-[var(--foreground)]">
                {t(`method.${step.key}Title`)}
              </h3>
              <p className="mt-1 text-[0.875rem] font-medium text-[var(--accent-soft)]">
                {t(`method.${step.key}Lead`)}
              </p>
              <p className="mt-3 text-[0.875rem] leading-[1.7] text-[var(--muted)]">
                {t(`method.${step.key}Body`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Bandeau budget ── */}
        <motion.div
          className="mt-4 flex flex-col gap-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-8 lg:flex-row lg:items-center lg:justify-between"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
        >
          <div className="min-w-0">
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              {t("method.budgetLabel")}
            </span>
            <p className="mt-2 text-[2rem] font-bold leading-none tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
              {t("method.budgetFrom")} {formatEuros(entryPrice)} €
            </p>
            <p className="mt-3 max-w-lg text-[0.875rem] leading-relaxed text-[var(--muted)]">
              {t("method.budgetNote")}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-stretch gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              href="/#contact"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[var(--accent-hover)]"
            >
              {t("method.ctaTalk")}
              <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/offres"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border border-[var(--border-hover)] px-7 py-3.5 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
            >
              {t("method.ctaDetails")}
            </Link>
          </div>
        </motion.div>

        <motion.p
          className="mt-6 text-[0.8125rem] leading-relaxed text-[var(--muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.4 }}
        >
          {t("method.maintenanceNote")}
        </motion.p>

      </div>
    </section>
  );
}
