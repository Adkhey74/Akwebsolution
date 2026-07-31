"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import { Aurora } from "@/components/Aurora";
import { BorderBeam } from "@/components/ui/border-beam";
import { useI18n } from "@/lib/i18n/context";

export function AboutPreview() {
  const { t, tList, lp } = useI18n();
  const credentials = tList("about.credentials");

  return (
    <section className="relative section-padding border-t border-[var(--border)] bg-[var(--section-alt)] overflow-hidden">
      {/* Halo Aurora ambiant, fondu sur les bords */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-70"
        style={{
          maskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 0%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 40%, #000 0%, transparent 80%)",
        }}
        aria-hidden
      >
        <Aurora />
      </div>

      <div className="section-container relative z-10 min-w-0">
        <motion.div
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Photo */}
          <div className="relative w-full shrink-0 overflow-hidden rounded-2xl border border-[var(--border)] shadow-lg glow-surface md:w-[340px] lg:w-[380px]" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/adil.webp"
              alt={t("about.photoAlt")}
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 380px"
            />
            <BorderBeam
              size={110}
              duration={9}
              borderWidth={1.5}
              colorFrom="transparent"
              colorTo="var(--beam-color)"
            />
          </div>

          {/* Contenu */}
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <div>
              <span className="eyebrow mb-4">{t("about.eyebrow")}</span>
              <h2 className="text-[1.75rem] font-light leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
                {t("about.title1")}{" "}
                <span className="relative inline-block font-semibold">
                  {t("about.titleAccent")}
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

            <p className="max-w-lg text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
              {t("about.bodyIntro")} <strong className="font-semibold text-[var(--foreground)]">Adil</strong>, {t("about.body")}
            </p>

            {/* Signature */}
            <p className="font-display text-[1.5rem] italic leading-none text-[var(--foreground)]">Adil</p>

            {/* Gages de confiance */}
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2 md:justify-start">
              {credentials.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-[0.8rem] text-[var(--muted)]">
                  <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[var(--border-hover)]">
                    <Check size={9} strokeWidth={2.5} className="text-[var(--foreground)]" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>

            <Link
              href={lp("/a-propos")}
              className="group mt-1 inline-flex items-center gap-2 text-[0.9rem] font-medium text-[var(--foreground)] underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              {t("about.more")}
              <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
