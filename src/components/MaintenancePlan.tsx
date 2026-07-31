"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Check, LifeBuoy } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  formatEuros,
  maintenance,
  maintenanceAnnualSaving,
  monthlyChangeHours,
} from "@/lib/offers";


/* Les tarifs viennent de lib/offers.ts : la carte d'offre les affiche aussi
   (« + maintenance en option à partir de … »), et le JSON-LD les envoie à
   Google. Trois copies à la main, c'était trois occasions de diverger. */
const plans = [
  { id: "flex",   price: maintenance.flex,   tabKey: "maintenance.tabFlex",   noteKey: "maintenance.noteFlex"   },
  { id: "annual", price: maintenance.annual, tabKey: "maintenance.tabAnnual", noteKey: "maintenance.noteAnnual" },
] as const;

export function MaintenancePlan() {
  const { t, tList, lp } = useI18n();
  const features = tList("maintenance.features");
  const [active, setActive] = useState<string>(plans[1].id);
  const groupName = useId();
  const reduceMotion = useReducedMotion();

  const plan = plans.find((p) => p.id === active) ?? plans[1];

  /** `t()` ne fait pas d'interpolation : un seul jeton à remplacer. */
  const withSaving = (key: string) =>
    t(key).replace("{n}", formatEuros(maintenanceAnnualSaving));

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">

      {/* ── En-tête : le pitch à gauche, le sélecteur à droite ── */}
      <div className="flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <LifeBuoy size={18} strokeWidth={1.75} className="text-[var(--accent)]" />
          </div>
          <span className="eyebrow mb-4">{t("maintenance.eyebrow")}</span>
          <h2 className="font-display text-[1.5rem] font-semibold italic leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
            {t("maintenance.title")}
          </h2>
          <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
            {t("maintenance.introStart")}{" "}
            <span className="text-[var(--foreground)]">{t("maintenance.introStrong")}</span>{" "}
            {t("maintenance.introEnd")}
          </p>
        </div>

        {/* Sélecteur de formule */}
        <fieldset className="shrink-0">
          <legend className="sr-only">{t("maintenance.legend")}</legend>
          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
            {plans.map((p) => {
              const isActive = p.id === active;
              return (
                <label key={p.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={groupName}
                    value={p.id}
                    checked={isActive}
                    onChange={() => setActive(p.id)}
                    className="peer sr-only"
                  />
                  {isActive && (
                    <motion.span
                      layoutId={`${groupName}-pill`}
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 rounded-full bg-[var(--accent)]"
                    />
                  )}
                  <span
                    className={`relative flex min-h-[2.75rem] items-center gap-2 rounded-full px-5 text-[0.8125rem] font-medium transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface)] ${
                      isActive
                        ? "text-white"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {t(p.tabKey)}
                    {/* L'économie affichée sur l'onglet, et pas seulement dans la
                        note en bas : c'est l'argument qui fait choisir l'engagement,
                        il doit être lisible au moment du choix. */}
                    {p.id === "annual" && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[0.6875rem] font-semibold tabular-nums transition-colors duration-200 ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-[var(--accent)]/15 text-[var(--accent-soft)]"
                        }`}
                      >
                        {withSaving("maintenance.saveBadge")}
                      </span>
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      {/* ── Corps : le prix isolé sur sa propre surface, les prestations à côté.
             gap-px sur fond --border, comme la grille des options et les étapes
             de l'accueil : les filets sont les gouttières, rien ne se double. ── */}
      <div className="grid gap-px border-t border-[var(--border)] bg-[var(--border)] lg:grid-cols-[minmax(0,20rem)_1fr]">

        {/* Prix + CTA — la zone de conversion.
            Contenu centré : la cellule s'étire à la hauteur des prestations, et
            un simple justify-between y creusait un grand vide sous le bouton. */}
        <div className="relative flex flex-col justify-center bg-[var(--surface)] p-6 sm:p-8">
          {/*
            Le voile accent est un calque à part, et non un `bg-` posé sur la
            cellule elle-même.

            --card comme --accent/x sont des couleurs TRANSLUCIDES, prévues pour
            être composées sur --surface (blanc opaque en thème clair). Or le fond
            de cette grille est --border (14 % d'alpha) : appliquée directement,
            une teinte à 4 % se composait par-dessus ces 14 % et ressortait environ
            quatre fois trop foncée — un aplat gris au lieu d'un voile.
            Ici la cellule est opaque, le calque se compose donc sur du blanc.
          */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[var(--accent)]/[0.06]"
          />

          <div className="relative">
            <div aria-live="polite">
              <div className="flex items-baseline gap-1.5">
                <span className="text-[3rem] font-bold leading-none tracking-tight text-[var(--foreground)]">
                  {formatEuros(plan.price)} €
                </span>
                <span className="text-[0.9375rem] text-[var(--muted)]">
                  {t("maintenance.perMonth")}
                </span>
              </div>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                {withSaving(plan.noteKey)}
              </p>
            </div>

            <Link
              href={lp("/#contact")}
              className="group mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[0.875rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-colors duration-200 hover:bg-[var(--accent-hover)]"
            >
              {t("maintenance.cta")}
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          </div>
        </div>

        {/* Prestations */}
        <div className="bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {t("maintenance.featuresTitle")}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {features.map((feat) => (
              <li key={feat} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
                  <Check size={10} strokeWidth={2.5} className="text-[var(--accent)]" />
                </span>
                <span className="text-[0.875rem] leading-snug text-[var(--muted)]">
                  {feat.replace("{n}", String(monthlyChangeHours))}
                </span>
              </li>
            ))}
          </ul>

          <p className="mt-7 border-t border-[var(--border)] pt-5 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
            {t("maintenance.offered")}
          </p>
        </div>
      </div>
    </div>
  );
}
