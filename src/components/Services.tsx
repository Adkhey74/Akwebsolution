"use client";

import { motion } from "motion/react";
import { Layout, Smartphone, Zap, Palette, Search, Shield } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";
import { BorderBeam } from "@/components/ui/border-beam";
import { BlurFade } from "@/components/ui/blur-fade";
import { useI18n } from "@/lib/i18n/context";

const services = [
  { icon: Layout,     key: "showcase",    featured: true },
  { icon: Smartphone, key: "responsive"   },
  { icon: Zap,        key: "perf"         },
  { icon: Palette,    key: "brand"        },
  { icon: Search,     key: "seo"          },
  { icon: Shield,     key: "maintenance"  },
];

export function Services() {
  const { t } = useI18n();

  return (
    <section id="services" className="section-padding border-t border-[var(--border)] bg-[var(--section-alt)] overflow-hidden">
      <div className="section-container min-w-0">

        {/* Header */}
        <motion.div
          className="mb-14 flex flex-col items-start gap-4 md:mb-18 md:flex-row md:items-end md:justify-between"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="max-w-xl">
            <span className="eyebrow mb-5">{t("services.eyebrow")}</span>

            <h2 className="text-[1.875rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
              {t("services.title1")}{" "}
              <span className="relative inline-block font-semibold">
                {t("services.titleAccent")}
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
                />
              </span>
            </h2>
          </div>

          <p className="max-w-sm text-[0.9375rem] leading-relaxed text-[var(--muted)] md:text-right">
            {t("services.intro")}
          </p>
        </motion.div>

        {/* Bento grid — 2 tuiles larges (1re et dernière) + 4 tuiles simples */}
        <div className="grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const wide = i === 0 || i === services.length - 1;
            return (
              <BlurFade
                key={service.key}
                delay={0.06 + i * 0.07}
                inView
                className={wide ? "sm:col-span-2" : ""}
              >
                <SpotlightCard
                  className="group !rounded-2xl !border-[var(--border)] !bg-[var(--surface)] !p-7 h-full transition-colors hover:!border-[var(--border-hover)] md:!p-8"
                  spotlightColor="rgba(96, 81, 242, 0.14)"
                >
                  {/* Numéro */}
                  <span className="absolute right-6 top-6 text-[0.7rem] font-semibold tabular-nums text-[var(--border-hover)] select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div
                    className={`relative flex h-full gap-5 ${
                      wide
                        ? "flex-col sm:flex-row sm:items-center sm:gap-7"
                        : "flex-col gap-4"
                    }`}
                  >
                    {/* Icône */}
                    <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--surface)] transition-all group-hover:border-[var(--accent)]">
                      <service.icon className="h-5 w-5 text-[var(--foreground)]" strokeWidth={1.5} />
                    </div>
                    {/* Texte */}
                    <div>
                      <h3 className="mb-2 text-[1.0625rem] font-semibold tracking-tight text-[var(--foreground)]">
                        {t(`services.${service.key}Title`)}
                      </h3>
                      <p className="text-[0.875rem] leading-relaxed text-[var(--muted)]">
                        {t(`services.${service.key}Desc`)}
                      </p>
                    </div>
                  </div>

                  {i === 0 && (
                    <BorderBeam
                      size={110}
                      duration={7}
                      borderWidth={1.5}
                      colorFrom="transparent"
                      colorTo="var(--beam-color)"
                    />
                  )}
                </SpotlightCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
