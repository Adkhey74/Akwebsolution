"use client";

import { motion } from "framer-motion";

export function ProjetsHeader() {
  return (
    <section className="section-container pb-16 pt-32 md:pb-20 md:pt-40">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="max-w-2xl"
      >
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-white px-4 py-1.5 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            Réalisations
          </span>
        </div>

        <h1 className="text-[2.25rem] font-light leading-[1.15] tracking-tight text-[var(--foreground)] sm:text-[2.75rem] md:text-[3.25rem]">
          Nos{" "}
          <span className="relative inline-block font-semibold">
            projets
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.45, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute -bottom-0.5 left-0 h-[2.5px] w-full origin-left bg-[var(--accent)]"
            />
          </span>
        </h1>

        <p className="mt-5 max-w-lg text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
          Sites vitrines, interfaces sur mesure et designs responsives — chaque
          projet est pensé pour refléter l'identité de notre client.
        </p>
      </motion.div>
    </section>
  );
}
