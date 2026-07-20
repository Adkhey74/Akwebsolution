"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function ProjetsCta() {
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
          <span className="eyebrow mb-3">Votre projet</span>
          <h2 className="text-[1.875rem] font-light tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            Vous avez un projet{" "}
            <span className="font-semibold">similaire ?</span>
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
            Discutons-en. Tarifs fixes et transparents, réponse sous 24 h.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/#contact" aria-label="Démarrer mon projet">
              <ShimmerButton
                background="var(--accent)"
                shimmerColor="rgba(255,255,255,0.85)"
                borderRadius="9999px"
                className="gap-2.5 border-transparent px-8 py-4 text-[0.9375rem] font-medium !text-white shadow-[0_10px_40px_-10px_var(--accent)]"
              >
                Démarrer mon projet
                <ArrowRight size={16} strokeWidth={2} />
              </ShimmerButton>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
