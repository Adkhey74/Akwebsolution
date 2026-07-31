"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, Clock, KeyRound, Plus, Rocket, Star, Zap } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import {
  formatEuros,
  maintenanceEntryPrice,
  monthlyChangeHours,
  type Offer,
} from "@/lib/offers";
import { useI18n } from "@/lib/i18n/context";

/**
 * Une carte de la page /offres.
 *
 * Extraite de app/offres/page.tsx parce que chaque carte porte désormais son
 * propre sélecteur Achat / Location : il lui faut un `useState` et un `useId`,
 * et on ne peut pas appeler de hooks depuis le `.map()` de la page.
 */

/** Icône par offre — gardée ici pour que lib/offers.ts reste de la donnée pure. */
const icons: Record<Offer["id"], typeof Zap> = {
  landing: Zap,
  starter: Rocket,
  pro: Star,
};

/**
 * Mode de commercialisation choisi par le visiteur.
 *
 * Valeurs en anglais et indépendantes de la langue : elles voyagent dans l'URL
 * du CTA puis dans l'email de notification. Elles ne doivent pas changer selon
 * que le site est affiché en français ou en anglais.
 */
export type Mode = "purchase" | "rental";

const MODES: Mode[] = ["purchase", "rental"];

export function OfferCard({ offer }: { offer: Offer }) {
  const { t, tList, lp } = useI18n();
  const [mode, setMode] = useState<Mode>("purchase");
  const groupName = useId();
  const reduceMotion = useReducedMotion();

  const Icon = icons[offer.id];
  const isPopular = offer.id === "starter";
  const { rental } = offer;
  const isRental = rental !== null && mode === "rental";

  /** `t()` ne fait pas d'interpolation : un seul jeton à remplacer ici. */
  const commitment = rental
    ? t("offers.rentalCommitment").replace("{n}", String(rental.months))
    : "";

  /* Le mode voyage jusqu'au formulaire de contact : c'est ce qui permet de
     savoir, à réception de la demande, s'il faut proposer un achat ou une
     location — sans quoi les deux arrivent sous la même forme.

     Vers la page /contact, et non plus vers l'ancre `/#contact` de l'accueil.
     Viser une ancre située à plusieurs milliers de pixels du haut d'une AUTRE
     page fait courir trois mécanismes de défilement en même temps — l'ancre
     native, celui de Next, et la boucle de Lenis, qui ne démonte jamais et
     réimpose sa position de la page précédente. Le visiteur restait donc en
     haut de l'accueil, sans le formulaire. Sur /contact le formulaire ouvre la
     page : plus rien à faire défiler, donc plus rien à rater. La présélection
     de la formule suit dans la query string, que le formulaire lit déjà. */
  const href = lp(`/contact?offer=${offer.id}&mode=${isRental ? "rental" : "purchase"}`);

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative flex h-full flex-col rounded-2xl border p-5 transition-all hover:shadow-[0_16px_40px_-12px_var(--shadow-card)] ${
        isPopular
          ? "border-[var(--accent)]/50 bg-[var(--surface)] glow-surface"
          : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-hover)]"
      }`}
    >
      {/* Badge populaire */}
      {offer.badge && (
        <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 rounded-full bg-[var(--accent)] px-4 py-1 text-[0.7rem] font-semibold uppercase tracking-widest text-white shadow-[0_8px_24px_-6px_var(--accent)]">
          {t("offers.popular")}
        </span>
      )}

      {/* Icône */}
      <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <Icon size={20} strokeWidth={1.75} className="text-[var(--foreground)]" />
      </div>

      {/* Titre */}
      <h2 className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
        {t(`offers.${offer.id}Title`)}
      </h2>
      <p className="mt-2 text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
        {t(`offers.${offer.id}Result`)}
      </p>

      {/* Sélecteur Achat / Location — même mécanique que le bloc Maintenance */}
      {rental ? (
        <fieldset className="mt-5">
          <legend className="sr-only">{t("offers.modeLegend")}</legend>
          <div className="grid grid-cols-2 rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
            {MODES.map((m) => {
              const isActive = m === mode;
              return (
                <label key={m} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name={groupName}
                    value={m}
                    checked={isActive}
                    onChange={() => setMode(m)}
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
                    className={`relative flex min-h-[2.25rem] items-center justify-center rounded-full px-3 text-[0.8125rem] font-medium transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface)] ${
                      isActive
                        ? "text-white"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {t(m === "purchase" ? "offers.modePurchase" : "offers.modeRental")}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : (
        /* Pas de choix sur le sur-mesure. On occupe quand même la hauteur du
           sélecteur pour que les trois prix restent alignés d'une carte à
           l'autre, et le pointillé dit que ce n'est pas un bouton. */
        <p className="mt-5 flex min-h-[2.75rem] items-center justify-center rounded-full border border-dashed border-[var(--border)] px-4 text-[0.8125rem] text-[var(--muted)]">
          {t("offers.purchaseOnly")}
        </p>
      )}

      {/* Prix — aria-live parce qu'il change sans rechargement au clic sur le
          sélecteur, et que rien d'autre ne l'annoncerait */}
      <div className="mt-4" aria-live="polite">
        {isRental && rental ? (
          <>
            <span className="block text-[0.75rem] font-medium uppercase tracking-wider text-[var(--muted)]">
              {t("offers.modeRental")}
            </span>
            <span className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                {formatEuros(rental.monthly)} €
              </span>
              <span className="text-[0.9375rem] text-[var(--muted)]">
                {t("maintenance.perMonth")}
              </span>
            </span>
            <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--muted)]">
              {t("offers.rentalSetupPrefix")} {formatEuros(rental.setup)} €{" "}
              {t("offers.rentalSetupSuffix")} · {commitment}
            </p>
          </>
        ) : (
          <>
            <span className="block text-[0.75rem] font-medium uppercase tracking-wider text-[var(--muted)]">
              {t("offers.from")}
            </span>
            <span className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
              {formatEuros(offer.price)} €
            </span>
            <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--muted)]">
              {t("offers.purchaseMaintenanceNote")} {formatEuros(maintenanceEntryPrice)} €{" "}
              {t("maintenance.perMonth")}
            </p>
          </>
        )}
      </div>

      {/* Cible */}
      <p className="mt-2 text-[0.75rem] leading-relaxed text-[var(--muted)]">
        {t(`offers.${offer.id}Target`)}
      </p>

      {/* Délai */}
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-[var(--card)] px-3 py-2 text-[0.8125rem] font-medium text-[var(--muted)]">
        <Clock size={13} strokeWidth={2} />
        {offer.id === "pro"
          ? `${t("offers.deliveryCustom")} ${t(`offers.${offer.id}Delivery`)}`
          : `${t("offers.deliveryIn")} ${t(`offers.${offer.id}Delivery`)}`}
      </div>

      {/* Séparateur */}
      <div className="my-6 h-px w-full bg-[var(--border)]" />

      {/* Prestations. Le flex-1 est porté par le conteneur, pas par la liste :
          le bloc location vient juste après et doit rester collé aux features. */}
      <div className="flex flex-1 flex-col">
        <ul className="flex flex-col gap-3">
          {offer.inherits && (
            <li className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
                <Plus size={10} strokeWidth={3} className="text-[var(--accent)]" />
              </span>
              <span className="text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
                {t("offers.includesPrefix")} {t(`offers.${offer.inherits}Title`)}
                {t("offers.includesSuffix")}
              </span>
            </li>
          )}
          {tList(`offers.${offer.id}Features`).map((feat) => (
            <li key={feat} className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--card)]">
                <Check size={10} strokeWidth={2.5} className="text-[var(--foreground)]" />
              </span>
              <span className="text-[0.875rem] leading-snug text-[var(--muted)]">{feat}</span>
            </li>
          ))}
        </ul>

        {/* Ce que la mensualité couvre en plus — visible seulement en location */}
        {isRental && (
          <div className="mt-5 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.06] p-4">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
              {t("offers.rentalIncludesTitle")}
            </p>
            <ul className="mt-3 flex flex-col gap-2.5">
              {tList("offers.rentalIncludes").map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
                    <Plus size={10} strokeWidth={3} className="text-[var(--accent)]" />
                  </span>
                  <span className="text-[0.8125rem] leading-snug text-[var(--muted)]">
                    {item.replace("{n}", String(monthlyChangeHours))}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-3.5 text-[0.75rem] leading-relaxed text-[var(--muted)]">
              {t("offers.rentalNote")}
            </p>

            {/* Propriété du site. Affiché noir sur blanc plutôt que renvoyé aux
                conditions générales : c'est la différence de fond avec l'achat,
                la découvrir après signature serait un très mauvais début. */}
            <div className="mt-4 border-t border-[var(--accent)]/20 pt-3.5">
              <p className="flex items-center gap-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-[var(--accent-soft)]">
                <KeyRound size={11} strokeWidth={2.25} />
                {t("offers.rentalOwnershipTitle")}
              </p>
              <p className="mt-2 text-[0.75rem] leading-relaxed text-[var(--muted)]">
                {t("offers.rentalOwnership")}
              </p>
              <p className="mt-1.5 text-[0.75rem] leading-relaxed text-[var(--foreground)]">
                {t("offers.rentalBuyoutPrefix").replace("{n}", String(rental.months))}{" "}
                <span className="font-semibold">{formatEuros(rental.buyout)} €</span>.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href={href}
        className={`mt-8 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${
          isPopular
            ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
            : "border border-[var(--border-hover)] text-[var(--foreground)] hover:bg-[var(--card)]"
        }`}
      >
        {isRental ? t("offers.chooseRental") : t("offers.choose")}
      </Link>

      {isPopular && (
        <BorderBeam
          size={120}
          duration={7}
          borderWidth={1.5}
          colorFrom="transparent"
          colorTo="var(--beam-color)"
        />
      )}
    </motion.div>
  );
}
