"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const values = [
  "Design soigné, responsive, adapté à votre activité",
  "Code propre et performant (Next.js, React, Tailwind)",
  "Tarifs fixes, délais annoncés, sans mauvaise surprise",
  "Réponse sous 24 h et suivi personnalisé",
];

export function AProposContent() {
  return (
    <div className="section-container w-full max-w-[72rem] pt-28 pb-20 md:pt-36 md:pb-28">
      <motion.div
        className="grid min-h-[80vh] grid-cols-1 gap-0 overflow-hidden rounded-2xl bg-[var(--surface)] shadow-2xl sm:rounded-3xl md:grid-cols-[minmax(0,420px)_1fr] lg:grid-cols-[minmax(0,460px)_1fr]"
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Colonne photo */}
        <motion.div
          className="relative min-h-[300px] sm:min-h-[340px] md:min-h-0"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src="/images/adil.jpeg"
            alt="Adil — Créateur AKWebSolution"
            fill
            className="object-cover object-[50%_18%]"
            sizes="(max-width: 768px) 100vw, 460px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-black/60 to-transparent" />
          <motion.div
            className="absolute inset-x-0 bottom-0 p-6 md:p-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/60">Créateur</p>
            <p className="mt-1 text-xl font-light text-white md:text-2xl">
              Adil <span className="font-serif italic font-semibold">Khadich</span>
            </p>
            <p className="mt-0.5 text-[0.8rem] text-white/60">AKWebSolution · Développeur freelance</p>
          </motion.div>
        </motion.div>

        {/* Colonne contenu */}
        <div className="flex min-w-0 flex-col justify-between break-words p-6 sm:p-8 md:p-10 lg:p-14">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">À propos</p>
            <h1 className="mt-3 text-3xl font-light leading-[1.2] tracking-tight text-[var(--foreground)] md:text-4xl">
              Je crée des sites qui{" "}
              <span className="font-serif italic font-semibold">travaillent pour vous</span>
            </h1>
            <p className="mt-5 text-[0.9375rem] leading-[1.8] text-[var(--muted)] break-words">
              Je m'appelle <strong className="font-semibold text-[var(--foreground)]">Adil</strong>, développeur web freelance basé en France. Sous le nom <strong className="font-semibold text-[var(--foreground)]">AKWebSolution</strong>, j'accompagne les indépendants et les petites entreprises qui veulent une présence en ligne claire, professionnelle et efficace.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[var(--muted)]">
              Chaque projet est une collaboration : je prends le temps de comprendre votre métier et vos besoins avant de concevoir une solution qui vous ressemble. Pas de template — du sur mesure, du début à la fin.
            </p>
            <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[var(--muted)]">
              J'utilise des technologies modernes (Next.js, React, Tailwind CSS) pour livrer des sites rapides, bien référencés et faciles à faire évoluer. Je travaille à distance avec des clients partout en France.
            </p>
          </motion.div>

          <div className="my-8 h-px w-full bg-[var(--border)]" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Mon engagement</p>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {values.map((v, i) => (
                <motion.li
                  key={v}
                  className="flex items-start gap-2.5 text-[0.875rem] leading-snug text-[var(--foreground)]/80"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: 0.45 + i * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <CheckCircle2 size={15} strokeWidth={2} className="mt-0.5 shrink-0 text-[var(--foreground)]" />
                  {v}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <div className="my-8 h-px w-full bg-[var(--border)]" />

          <motion.div
            className="flex flex-wrap items-center gap-3 gap-y-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 text-[0.9rem] font-semibold text-[var(--background)] transition-all hover:bg-[var(--foreground)]/80"
            >
              Me contacter
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
            <Link
              href="/projets"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 text-[0.9rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
            >
              Mes réalisations
            </Link>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
