"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check, Zap, Rocket, Star, Clock, Plus } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { MaintenancePlan } from "@/components/MaintenancePlan";
import { offers, formatEuros, type Offer } from "@/lib/offers";
import { useI18n } from "@/lib/i18n/context";

/** Icône par offre — gardée ici pour que lib/offers.ts reste de la donnée pure. */
const icons: Record<Offer["id"], typeof Zap> = {
  landing: Zap,
  starter: Rocket,
  pro: Star,
};

/** Options à la carte : le libellé et la note sont traduits, le prix non. */
const optionKeys = [
  { key: "optionExtraPage",   price: "250 €"            },
  { key: "optionEnglish",     price: "490 €", from: true, note: true },
  { key: "optionBooking",     price: "390 €", from: true },
  { key: "optionReviews",     price: "290 €"            },
  { key: "optionCopywriting", price: "300 €", from: true },
];

export default function OffresPage() {
  const { t, tList } = useI18n();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main">
        {/* Header section */}
        <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
          <div className="mx-auto w-full max-w-[75rem] text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="min-w-0"
            >
              <h1 className="text-balance text-3xl leading-[1.1] tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                {t("offers.title")}
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[1rem] leading-relaxed text-[var(--muted)]">
                {t("offers.intro")}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards */}
        <section className="section-container pb-20 md:pb-28 lg:pb-36">
          <div className="mx-auto w-full max-w-[72rem]">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {offers.map((offer, i) => {
                const Icon = icons[offer.id];
                const isPopular = offer.id === "starter";
                return (
                  <BlurFade key={offer.id} delay={0.1 + i * 0.1} inView className="min-w-0">
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

                    {/* Titre & prix */}
                    <h2 className="text-2xl font-semibold text-[var(--foreground)]" style={{ fontFamily: "var(--font-display)" }}>
                      {t(`offers.${offer.id}Title`)}
                    </h2>
                    <p className="mt-2 text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
                      {t(`offers.${offer.id}Result`)}
                    </p>
                    <div className="mt-4">
                      <span className="block text-[0.75rem] font-medium uppercase tracking-wider text-[var(--muted)]">
                        {t("offers.from")}
                      </span>
                      <span className="text-4xl font-bold tracking-tight text-[var(--foreground)]">
                        {formatEuros(offer.price)} €
                      </span>
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

                    {/* Features */}
                    <ul className="flex flex-1 flex-col gap-3">
                      {offer.inherits && (
                        <li className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/15">
                            <Plus size={10} strokeWidth={3} className="text-[var(--accent)]" />
                          </span>
                          <span className="text-[0.875rem] font-medium leading-snug text-[var(--foreground)]">
                            {t("offers.includesPrefix")} {t(`offers.${offer.inherits}Title`)}{t("offers.includesSuffix")}
                          </span>
                        </li>
                      )}
                      {tList(`offers.${offer.id}Features`).map((feat) => (
                        <li key={feat} className="flex items-start gap-2.5">
                          <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[var(--card)]">
                            <Check size={10} strokeWidth={2.5} className="text-[var(--foreground)]" />
                          </span>
                          <span className="text-[0.875rem] leading-snug text-[var(--muted)]">
                            {feat}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      href="/#contact"
                      className={`mt-8 block rounded-full py-3 text-center text-[0.875rem] font-medium transition-all duration-200 ${
                        isPopular
                          ? "bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)]"
                          : "border border-[var(--border-hover)] text-[var(--foreground)] hover:bg-[var(--card)]"
                      }`}
                    >
                      {t("offers.choose")}
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
                  </BlurFade>
                );
              })}
            </div>

            {/* Options à la carte */}
            <BlurFade delay={0.2} inView>
              <div className="mt-16 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <h2
                  className="text-xl font-semibold text-[var(--foreground)]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {t("offers.optionsTitle")}
                </h2>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                  {t("offers.optionsIntro")}
                </p>
                <ul className="mt-6 flex flex-col divide-y divide-[var(--border)]">
                  {optionKeys.map((opt) => (
                    <li
                      key={opt.key}
                      className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3.5"
                    >
                      <div className="min-w-0">
                        <span className="text-[0.9375rem] text-[var(--foreground)]">{t(`offers.${opt.key}`)}</span>
                        {opt.note && (
                          <p className="mt-1 max-w-md text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                            {t("offers.optionEnglishNote")}
                          </p>
                        )}
                      </div>
                      <span className="shrink-0 text-[0.9375rem] font-semibold text-[var(--foreground)]">
                        {opt.from ? `${t("offers.priceFrom")} ${opt.price}` : opt.price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>

            {/* Maintenance */}
            <BlurFade delay={0.25} inView className="mt-4 block">
              <MaintenancePlan />
            </BlurFade>

            {/* Note bas de page */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-10 text-center text-[0.8125rem] text-[var(--muted)]"
            >
              {t("offers.footnote")}{" "}
              <Link href="/#contact" className="underline underline-offset-2 hover:text-[var(--foreground)]">
                {t("offers.footnoteLink")}
              </Link>
              {t("offers.footnoteEnd")}
            </motion.p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
