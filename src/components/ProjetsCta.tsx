"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
          <p className="mb-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Votre projet
          </p>
          <h2 className="text-[1.875rem] font-light tracking-tight text-[var(--foreground)] sm:text-[2.25rem] md:text-[2.75rem]">
            Vous avez un projet{" "}
            <span className="font-semibold">similaire ?</span>
          </h2>
          <p className="mt-4 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
            Discutons-en. Tarifs fixes et transparents, réponse sous 24 h.
          </p>
          <motion.div
            className="mt-8 inline-block"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-8 py-4 text-[0.9375rem] font-medium text-[var(--background)] shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:shadow-black/20"
            >
              Démarrer mon projet
              <ArrowRight size={16} strokeWidth={2} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
