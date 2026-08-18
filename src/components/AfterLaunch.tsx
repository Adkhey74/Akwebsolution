"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, Check, Newspaper, Server, type LucideIcon } from "lucide-react";
import { MaintenancePlan } from "@/components/MaintenancePlan";
import { useI18n } from "@/lib/i18n/context";
import {
  content,
  contentPackUnitPrice,
  formatEuros,
  hosting,
} from "@/lib/offers";

/**
 * Ce qui se vend APRÈS la mise en ligne, présenté comme une échelle de trois
 * paliers : socle technique → maintenance → contenu.
 *
 * Pourquoi une échelle et pas trois blocs côte à côte : le socle à 35 €/mois
 * est aussi ce qui peut faire perdre la maintenance à 90 €. Posé en face
 * d'elle, il se lit comme la même chose en moins cher ; posé en dessous, il
 * devient l'ancre qui rend le palier suivant évident — 35 € de plus pour
 * 2 h de travail mensuel et le support.
 *
 * Le palier 2 garde donc son bloc riche et son bouton plein (MaintenancePlan,
 * inchangé) ; les paliers 1 et 3 sont volontairement plus sobres, avec un
 * simple lien. La hiérarchie visuelle dit ce que le discours dit.
 */

/** Puce de prestation — même dessin dans les trois paliers. */
function Feature({ label }: { label: string }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
        <Check size={10} strokeWidth={2.5} className="text-[var(--accent)]" />
      </span>
      <span className="text-[0.875rem] leading-snug text-[var(--muted)]">{label}</span>
    </li>
  );
}

/**
 * Tarif secondaire — les deux options du palier 3 (article à l'unité, ajout
 * d'une section blog).
 *
 * Il vit en pied de carte sur toute la largeur, et non dans la colonne des
 * prix : à 20 rem, le libellé passait à la ligne, le filet de conduite (un
 * `flex-1`) s'effondrait à zéro, et le montant partait flotter seul en haut à
 * droite. Ici chaque option dispose d'une demi-largeur, donc le montant
 * s'aligne sur le texte quelle que soit la langue.
 */
function ExtraPrice({
  label,
  note,
  price,
}: {
  label: string;
  note: string;
  price: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 bg-[var(--surface)] px-6 py-5 sm:px-8">
      <div className="min-w-0">
        <p className="text-[0.875rem] font-semibold leading-snug text-[var(--foreground)]">
          {label}
        </p>
        <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
          {note}
        </p>
      </div>
      <span className="shrink-0 text-[1.125rem] font-bold tabular-nums tracking-tight text-[var(--foreground)]">
        {price}
      </span>
    </div>
  );
}

/**
 * Carte de palier — l'anatomie commune aux paliers 1 et 3, et celle que suit
 * déjà le palier 2 : en-tête sur toute la largeur, puis une grille
 * prix | prestations.
 *
 * Avant, ces deux paliers empilaient tout dans la colonne étroite : pastille,
 * titre, prix et jusqu'à quatre montants tenaient dans 20 rem. Le palier 3 y
 * passait à la ligne dès son intitulé et finissait par se lire comme une
 * facture. Sortir l'en-tête de la colonne règle les deux d'un coup, et les
 * trois paliers deviennent des frères visuels : même en-tête, même grille.
 *
 * La hiérarchie ne tient donc plus à la structure mais au poids — corps du
 * prix, voile d'accent et bouton plein restent au seul palier 2.
 */
function Tier({
  icon: Icon,
  eyebrow,
  title,
  lead,
  price,
  featuresTitle,
  features,
  note,
  action,
  extras,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  lead: string;
  price: ReactNode;
  featuresTitle: string;
  features: string[];
  note: string;
  action?: ReactNode;
  extras?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {/* ── En-tête : ce qu'on vend, avant de dire combien ── */}
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
          <Icon size={18} strokeWidth={1.75} className="text-[var(--accent)]" />
        </div>
        <span className="eyebrow mb-4">{eyebrow}</span>
        <h3 className="font-display text-[1.5rem] font-semibold italic leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
          {title}
        </h3>
        <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          {lead}
        </p>
      </div>

      {/* ── Corps : le prix isolé sur sa surface, les prestations à côté.
             gap-px sur fond --border, comme le palier 2 et la grille des
             options : les filets sont les gouttières, rien ne se double. ── */}
      <div className="grid gap-px border-t border-[var(--border)] bg-[var(--border)] lg:grid-cols-[minmax(0,20rem)_1fr]">
        <div className="flex flex-col justify-center bg-[var(--surface)] p-6 sm:p-8">
          {price}
        </div>

        <div className="flex flex-col bg-[var(--surface)] p-6 sm:p-8">
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
            {featuresTitle}
          </p>
          <ul className="mt-5 grid grid-cols-1 gap-x-8 gap-y-3.5 sm:grid-cols-2">
            {features.map((feat) => (
              <Feature key={feat} label={feat} />
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <p className="border-t border-[var(--border)] pt-5 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
              {note}
            </p>
            {action}
          </div>
        </div>
      </div>

      {extras}
    </div>
  );
}

export function AfterLaunch() {
  const { t, tList, lp } = useI18n();

  /* `t()` ne fait pas d'interpolation : un seul jeton par clé, remplacé ici. */
  const billing = t("afterLaunch.hostingBilling").replace(
    "{n}",
    formatEuros(hosting.yearly)
  );
  const packLabel = t("afterLaunch.contentPackLabel").replace(
    "{n}",
    String(content.packArticles)
  );
  const perArticle = t("afterLaunch.contentPerArticle").replace(
    "{n}",
    formatEuros(contentPackUnitPrice)
  );

  return (
    <div>
      {/* ── En-tête de section : c'est elle qui porte « Après la mise en
             ligne », les trois cartes ne font que se situer dedans. ── */}
      <div className="mb-8 max-w-xl">
        <span className="eyebrow mb-4">{t("afterLaunch.eyebrow")}</span>
        <h2 className="text-[1.5rem] font-light leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
          {t("afterLaunch.title1")}{" "}
          <span className="font-display italic font-semibold">
            {t("afterLaunch.titleAccent")}
          </span>
        </h2>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
          {t("afterLaunch.intro")}
        </p>
      </div>

      <div className="flex flex-col gap-4">

        {/* ── Palier 1 — socle technique ────────────────────────────────── */}
        <Tier
          icon={Server}
          eyebrow={t("afterLaunch.hostingStep")}
          title={t("afterLaunch.hostingTitle")}
          lead={t("afterLaunch.hostingLead")}
          featuresTitle={t("afterLaunch.featuresTitle")}
          features={tList("afterLaunch.hostingFeatures")}
          /* La propriété du nom de domaine, dite noir sur blanc : c'est le
             point qui distingue ce socle d'une location déguisée. */
          note={t("afterLaunch.hostingNote")}
          price={
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-[2.5rem] font-bold leading-none tracking-tight text-[var(--foreground)]">
                  {formatEuros(hosting.monthly)} €
                </span>
                <span className="text-[0.9375rem] text-[var(--muted)]">
                  {t("maintenance.perMonth")}
                </span>
              </div>
              <p className="mt-3 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                {billing}
              </p>
              {hosting.firstYearIncluded && (
                <span className="mt-4 inline-flex w-fit items-center rounded-full bg-[var(--accent)]/15 px-3 py-1 text-[0.75rem] font-semibold text-[var(--accent-soft)]">
                  {t("afterLaunch.hostingBadge")}
                </span>
              )}
            </div>
          }
        />

        {/* ── Palier 2 — maintenance (le bloc détaillé, inchangé) ────────── */}
        <MaintenancePlan />

        {/* ── Palier 3 — contenu éditorial ──────────────────────────────── */}
        <Tier
          icon={Newspaper}
          eyebrow={t("afterLaunch.contentStep")}
          title={t("afterLaunch.contentTitle")}
          lead={t("afterLaunch.contentLead")}
          featuresTitle={t("afterLaunch.featuresTitle")}
          features={tList("afterLaunch.contentFeatures")}
          note={t("afterLaunch.contentHonesty")}
          price={
            <div>
              {/* « le pack de 6 articles » se lit SOUS le montant et non à
                  côté : accolé à un chiffre, un libellé aussi long se lit
                  comme une unité (« /mois »), ce qu'il n'est pas. */}
              <div className="text-[2.5rem] font-bold leading-none tracking-tight text-[var(--foreground)]">
                {formatEuros(content.packPrice)} €
              </div>
              <p className="mt-3 text-[0.9375rem] leading-snug text-[var(--foreground)]">
                {packLabel}
              </p>
              <p className="mt-1 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                {perArticle}
              </p>
            </div>
          }
          action={
            /* Lien et non bouton plein : le palier 2 reste le CTA fort de la
               section (cf. le commentaire en tête de fichier). */
            <Link
              href={lp("/contact")}
              className="group mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] px-5 py-2.5 text-[0.875rem] font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--card)]"
            >
              {t("afterLaunch.cta")}
              <ArrowRight
                size={15}
                strokeWidth={2}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </Link>
          }
          extras={
            <div className="grid gap-px border-t border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
              <ExtraPrice
                label={t("afterLaunch.contentUnitLabel")}
                note={t("afterLaunch.contentUnitNote")}
                price={`${formatEuros(content.unitPrice)} €`}
              />
              <ExtraPrice
                label={t("afterLaunch.contentBlogLabel")}
                note={t("afterLaunch.contentBlogNote")}
                price={`${formatEuros(content.blogSetup)} €`}
              />
            </div>
          }
        />
      </div>
    </div>
  );
}
