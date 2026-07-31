"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useI18n } from "@/lib/i18n/context";

export function ProjetsCta() {
  const { t, lp } = useI18n();

  return (
    <section className="border-t border-[var(--border)]">
      <div className="section-container py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="eyebrow mb-3">{t("workPage.ctaEyebrow")}</span>
          <h2 className="text-[1.875rem] font-light tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            {t("workPage.ctaTitle1")}{" "}
            <span className="font-semibold">{t("workPage.ctaTitleAccent")}</span>
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
            {t("workPage.ctaBody")}
          </p>
          <div className="mt-8 flex justify-center">
            <Link href={lp("/#contact")} aria-label={t("workPage.ctaButton")}>
              <ShimmerButton
                background="var(--accent)"
                shimmerColor="rgba(255,255,255,0.85)"
                borderRadius="9999px"
                className="gap-2.5 border-transparent px-8 py-4 text-[0.9375rem] font-medium !text-white shadow-[0_10px_40px_-10px_var(--accent)]"
              >
                {t("workPage.ctaButton")}
                <ArrowRight size={16} strokeWidth={2} />
              </ShimmerButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
