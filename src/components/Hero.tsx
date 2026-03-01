"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";

const trust = ["Prix fixe, sans surprise", "Sans engagement", "Livraison rapide"];

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh+4rem)] flex-col justify-center overflow-hidden pb-20 pt-36 -mt-16 md:-mt-[4.5rem] md:min-h-[calc(100vh+4.5rem)] md:pt-44 md:pb-28">

      {/* Vidéo de fond */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/videos/videoSection.mp4" type="video/mp4" />
      </video>

      {/* Voile sombre pour lisibilité */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="section-container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

          {/* Badge eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, delay: 0.05 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/75">
              Agence Web · Sites sur mesure
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.48, delay: 0.11 }}
            className="text-[2.125rem] font-light leading-[1.15] tracking-tight text-white sm:text-[2.75rem] md:text-[3.5rem] lg:text-[4rem]"
          >
            Des sites web{" "}
            <span className="relative inline-block font-semibold">
              élégants
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.45, delay: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-0.5 left-0 h-[2.5px] w-full origin-left bg-white"
              />
            </span>
            {" "}qui vous ressemblent
          </motion.h1>

          {/* Sous-titre */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.22 }}
            className="mt-6 max-w-[30rem] text-[1rem] leading-[1.7] text-white/75 md:max-w-[34rem] md:text-[1.125rem]"
          >
            Sites rapides, clairs et adaptés à votre activité. Une présence en
            ligne professionnelle, à votre image.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.35 }}
            className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4"
          >
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/offres"
                className="inline-flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-9 py-4 text-[0.9375rem] font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:shadow-black/20"
              >
                Démarrer mon projet
              </Link>
            </motion.div>
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/40 bg-white/10 px-9 py-4 text-[0.9375rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                Voir nos services
              </Link>
            </motion.div>
          </motion.div>

          {/* Ligne de confiance */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44 }}
            className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
          >
            {trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[0.8rem] font-medium text-white/65">
                <CheckCircle2 size={13} strokeWidth={2.2} />
                {item}
              </span>
            ))}
          </motion.div>

        </div>
      </div>

      {/* Flèche scroll */}
      <motion.a
        href="/#services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center text-white/50 transition-colors hover:text-white"
        aria-label="Faire défiler vers les services"
      >
        <ArrowDown size={16} strokeWidth={2} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
