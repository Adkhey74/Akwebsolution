"use client";

import { motion } from "motion/react";
import { useI18n } from "@/lib/i18n/context";

export function ProjetsHeader() {
  const { t } = useI18n();

  return (
    <section className="section-container min-w-0 pb-10 pt-28 text-center sm:pb-14 sm:pt-32 md:pb-16 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto w-full max-w-[75rem] min-w-0"
      >
        {/* Badge */}
        {/* « Portfolio » et non « Réalisations » : le H1 juste en dessous dit
            déjà « Nos réalisations » — l'écho se voyait. */}
        <span className="eyebrow mb-6">{t("workPage.eyebrow")}</span>

        {/* Centré plutôt qu'aligné à gauche : dans une colonne étroite, le
            titre et son intro faisaient un bloc tout en hauteur, coincé contre
            le bord gauche pendant que le reste du viewport restait vide. */}
        <h1 className="text-balance text-[2.25rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.75rem] md:text-[3.25rem]">
          {t("workPage.title1")}{" "}
          <span className="relative inline-block font-semibold">
            {t("workPage.titleAccent")}
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-0.5 left-0 h-[2.5px] w-full origin-left bg-[var(--accent)]"
            />
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
          {t("workPage.intro")}
        </p>
      </motion.div>
    </section>
  );
}
