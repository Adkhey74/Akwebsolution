"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, LifeBuoy } from "lucide-react";

const features = [
  "2 heures de modifications par mois : textes, images, nouvelles sections",
  "Hébergement, nom de domaine et certificat de sécurité inclus",
  "Sauvegardes quotidiennes et restauration en cas de problème",
  "Mises à jour de sécurité et de performance",
  "Rapport mensuel : visiteurs, provenance, demandes de contact",
  "Support prioritaire, réponse sous 24 h ouvrées",
  "Correction des bugs et des pannes sans supplément",
];

const plans = [
  {
    id: "flex",
    tab: "Sans engagement",
    price: "80",
    note: "Résiliable à tout moment, sans préavis.",
  },
  {
    id: "annual",
    tab: "Engagement 1 an",
    price: "70",
    note: "Soit 120 € économisés sur l'année.",
  },
] as const;

export function MaintenancePlan() {
  const [active, setActive] = useState<string>(plans[1].id);
  const groupName = useId();
  const reduceMotion = useReducedMotion();

  const plan = plans.find((p) => p.id === active) ?? plans[1];

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
      {/* En-tête + sélecteur */}
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)]">
            <LifeBuoy size={18} strokeWidth={1.75} className="text-[var(--foreground)]" />
          </div>
          <h2
            className="text-xl font-semibold text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Maintenance
          </h2>
          <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-[var(--muted)]">
            Votre site suivi toute l’année.{" "}
            <span className="text-[var(--foreground)]">
              Vos modifications faites pour vous, sans rien apprendre
            </span>{" "}
            — vous envoyez un email, c’est en ligne dans la journée.
          </p>
        </div>

        <fieldset className="shrink-0">
          <legend className="sr-only">Choisissez votre formule de maintenance</legend>
          <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--card)] p-1">
            {plans.map((p) => {
              const isActive = p.id === active;
              return (
                <label
                  key={p.id}
                  className="relative cursor-pointer"
                >
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
                    className={`relative flex min-h-[2.75rem] items-center rounded-full px-5 text-[0.8125rem] font-medium transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--accent)] peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-[var(--surface)] ${
                      isActive
                        ? "text-white"
                        : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {p.tab}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>
      </div>

      <div className="my-7 h-px w-full bg-[var(--border)]" />

      {/* Prestations */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
        {features.map((feat) => (
          <li key={feat} className="flex items-start gap-2.5">
            <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--card)]">
              <Check size={10} strokeWidth={2.5} className="text-[var(--foreground)]" />
            </span>
            <span className="text-[0.875rem] leading-snug text-[var(--muted)]">{feat}</span>
          </li>
        ))}
      </ul>

      {/* Prix + CTA */}
      <div className="mt-8 flex flex-col gap-5 border-t border-[var(--border)] pt-6 sm:flex-row sm:items-end sm:justify-between">
        <div aria-live="polite">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
              {plan.price} €
            </span>
            <span className="text-[0.9375rem] text-[var(--muted)]">/ mois</span>
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-[var(--muted)]">{plan.note}</p>
        </div>

        <Link
          href="/#contact"
          className="rounded-full border border-[var(--border-hover)] px-7 py-3 text-center text-[0.875rem] font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--card)]"
        >
          Demander la maintenance
        </Link>
      </div>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
        1er mois offert avec les offres Site Vitrine Complet et Site Pro &amp; Sur Mesure.
      </p>
    </div>
  );
}
