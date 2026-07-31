"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  CalendarCheck2,
  FilePlus2,
  Languages,
  MessageSquareQuote,
  PenLine,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BlurFade } from "@/components/ui/blur-fade";
import { MaintenancePlan } from "@/components/MaintenancePlan";
import { OfferCard } from "@/components/OfferCard";
import { offers } from "@/lib/offers";
import { useI18n } from "@/lib/i18n/context";

/**
 * Options à la carte : le libellé et la note sont traduits, le prix non.
 *
 * `wide` place la version anglaise sur deux colonnes : c'est la seule option qui
 * porte une note, et cela remplit exactement la grille de 3 colonnes avec
 * 5 options (1+2 puis 1+1+1) — sans quoi la dernière rangée laisserait une
 * cellule vide, visible comme un aplat de la couleur des filets.
 */
const optionKeys = [
  { key: "optionExtraPage",   price: "250 €", icon: FilePlus2                                     },
  { key: "optionEnglish",     price: "490 €", icon: Languages,          from: true, note: true, wide: true },
  { key: "optionBooking",     price: "390 €", icon: CalendarCheck2,     from: true                },
  { key: "optionReviews",     price: "290 €", icon: MessageSquareQuote                            },
  { key: "optionCopywriting", price: "300 €", icon: PenLine,            from: true                },
];

/** Même courbe que les autres sections animées du site. */
const EASE = [0.25, 0.46, 0.45, 0.94] as const;

/**
 * Corps de la page « Offres », partagé par `/offres` et `/en/offres`.
 *
 * Composant client (animations + traductions), donc extrait de la route : une
 * route « use client » ne peut pas exporter de `metadata`, ce qui obligeait
 * jusqu'ici à maintenir un `offres/layout.tsx` qui n'existait que pour ça.
 */
export function OffresPage() {
  const { t, lp } = useI18n();

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
              {offers.map((offer, i) => (
                <BlurFade key={offer.id} delay={0.1 + i * 0.1} inView className="min-w-0">
                  <OfferCard offer={offer} />
                </BlurFade>
              ))}
            </div>

            {/* Options à la carte */}
            <div className="mt-20">
              <BlurFade delay={0.2} inView>
                <div className="mb-8 max-w-xl">
                  <span className="eyebrow mb-4">{t("offers.optionsEyebrow")}</span>
                  <h2
                    className="text-[1.5rem] font-light leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[1.875rem]"
                  >
                    {t("offers.optionsTitle1")}{" "}
                    <span className="font-display italic font-semibold">
                      {t("offers.optionsTitleAccent")}
                    </span>
                  </h2>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    {t("offers.optionsIntro")}
                  </p>
                </div>
              </BlurFade>

              {/* gap-px + fond --border : les filets entre les cellules sont les
                  gouttières de la grille, donc aucune bordure ne se double.
                  Même mécanique que les 3 étapes de la page d'accueil. */}
              <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] md:grid-cols-3">
                {optionKeys.map((opt, i) => (
                  <motion.div
                    key={opt.key}
                    className={`group relative min-w-0 bg-[var(--surface)] ${
                      opt.wide ? "md:col-span-2" : ""
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.07, ease: EASE }}
                  >
                    {/* Survol en calque, et non en `hover:bg-` sur la cellule :
                        les teintes du thème sont translucides, les poser sur la
                        cellule les composerait sur le fond --border de la grille
                        et les rendrait bien plus foncées que prévu. Ici la
                        cellule reste opaque et le calque se compose dessus. */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-[var(--accent)]/[0.05] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    />

                    <div className="relative flex h-full flex-col p-6">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)] transition-colors duration-200 group-hover:border-[var(--accent)]/40">
                          <opt.icon size={16} strokeWidth={1.75} className="text-[var(--accent)]" />
                        </span>
                        <span className="h-px flex-1 bg-[var(--border-hover)]" />
                      </div>

                      <h3 className="mt-5 text-[0.9375rem] font-semibold leading-snug text-[var(--foreground)]">
                        {t(`offers.${opt.key}`)}
                      </h3>

                      {opt.note && (
                        <p className="mt-2 max-w-md text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                          {t("offers.optionEnglishNote")}
                        </p>
                      )}

                      {/* mt-auto : les prix s'alignent en bas de chaque cellule,
                          même quand une option porte une note plus longue. */}
                      <p className="mt-auto flex items-baseline gap-1.5 pt-5">
                        {opt.from && (
                          <span className="text-[0.75rem] text-[var(--muted)]">
                            {t("offers.priceFrom")}
                          </span>
                        )}
                        <span className="text-[1.375rem] font-bold tracking-tight text-[var(--foreground)]">
                          {opt.price}
                        </span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Maintenance — mt-16 et non plus mt-4 : les options ne sont plus
                un panneau posé juste au-dessus, mais une section à part entière
                avec son propre en-tête. */}
            <BlurFade delay={0.25} inView className="mt-16 block">
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
              <Link href={lp("/contact")} className="underline underline-offset-2 hover:text-[var(--foreground)]">
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
