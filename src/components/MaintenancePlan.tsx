"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Check, LifeBuoy } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";


const plans = [
  { id: "flex",   price: "80", tabKey: "maintenance.tabFlex",   noteKey: "maintenance.noteFlex"   },
  { id: "annual", price: "70", tabKey: "maintenance.tabAnnual", noteKey: "maintenance.noteAnnual" },
] as const;

export function MaintenancePlan() {
  const { t, tList } = useI18n();
  const features = tList("maintenance.features");
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
            {t("maintenance.title")}
          </h2>
          <p className="mt-2 max-w-md text-[0.875rem] leading-relaxed text-[var(--muted)]">
            {t("maintenance.introStart")}{" "}
            <span className="text-[var(--foreground)]">
              {t("maintenance.introStrong")}
            </span>{" "}
            {t("maintenance.introEnd")}
          </p>
        </div>

        <fieldset className="shrink-0">
          <legend className="sr-only">{t("maintenance.legend")}</legend>
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
                    {t(p.tabKey)}
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
            <span className="text-[0.9375rem] text-[var(--muted)]">{t("maintenance.perMonth")}</span>
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-[var(--muted)]">{t(plan.noteKey)}</p>
        </div>

        <Link
          href="/#contact"
          className="rounded-full border border-[var(--border-hover)] px-7 py-3 text-center text-[0.875rem] font-medium text-[var(--foreground)] transition-colors duration-200 hover:bg-[var(--card)]"
        >
          {t("maintenance.cta")}
        </Link>
      </div>

      <p className="mt-6 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
        {t("maintenance.offered")}
      </p>
    </div>
  );
}
