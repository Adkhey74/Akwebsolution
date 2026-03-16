"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { usePageLoader } from "@/components/PageLoaderContext";
import dynamic from "next/dynamic";

const BlurText = dynamic(() => import("@/components/BlurText").then((m) => m.default), { ssr: false });
const CountUp = dynamic(() => import("@/components/CountUp").then((m) => m.default), { ssr: false });
const Beams = dynamic(() => import("@/components/Beams").then((m) => m.Beams), { ssr: false });

const stats = [
  { to: 5, suffix: "+", label: "ans d'expérience" },
  { to: 100, suffix: "%", label: "Clients satisfaits" },
  { to: 24, suffix: "h", label: "Délai de réponse" },
];

const trust = ["Prix fixe, sans surprise", "Sans engagement", "Livraison rapide"];

export function Hero() {
  const loader = usePageLoader();
  const setVideoReady = loader?.setVideoReady;
  const isLoading = loader?.isLoading ?? true;

  // Plus de vidéo — on signale immédiatement que le hero est prêt
  useEffect(() => {
    if (setVideoReady) setVideoReady();
  }, [setVideoReady]);

  const animate = !isLoading ? "visible" : "hidden";
  const statsKey = !isLoading ? "ready" : "loading";

  return (
    <section className="relative flex h-[calc(100vh+5.25rem)] min-h-[calc(100dvh+5.25rem)] flex-col justify-center overflow-hidden pb-24 pt-36 -mt-[5.25rem] md:h-[calc(100vh+6rem)] md:min-h-[calc(100dvh+6rem)] md:-mt-24 md:pt-44 md:pb-32">

      {/* Beams background */}
      <Beams
        beamNumber={10}
        beamWidth={2}
        beamHeight={18}
        lightColor="#ffffff"
        speed={1.2}
        noiseIntensity={1.5}
        scale={0.18}
        rotation={20}
      />

      {/* Radial gradient overlay — assombrit le centre pour la lisibilité */}
      <div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(0,0,0,0.55) 0%, transparent 100%)" }} />

      <div className="section-container relative z-10 min-w-0">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">

          {/* Badge eyebrow — taille alignée avec la navbar */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={animate}
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm sm:mb-5 sm:px-4"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/70 sm:text-[0.7rem] sm:tracking-[0.22em]">
              Agence Web · Sites sur mesure
            </span>
          </motion.div>

          {/* H1 — cohérent avec la taille du logo navbar, progression responsive */}
          <h1 className="text-[1.75rem] font-light leading-[1.22] tracking-tight text-white sm:text-[2rem] md:text-[2.75rem] lg:text-[3.5rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={animate}
                variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Des sites web{" "}
                <span className="relative font-semibold font-serif italic">
                  élégants
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={animate}
                    variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                    transition={{ duration: 0.45, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-white/70"
                  />
                </span>{" "}
                
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={animate}
                variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.76, 0, 0.24, 1] }}
              >
              qui vous ressemblent
              </motion.span>
            </span>
          </h1>

          {/* Sous-titre */}
          <div className="mt-4 flex justify-center sm:mt-5">
            <div className="max-w-[26rem] text-center md:max-w-[32rem]">
              {/* @ts-expect-error BlurText props optionnelles */}
              <BlurText
                text="Sites rapides, clairs et adaptés à votre activité. Une présence en ligne professionnelle, à votre image."
                animateBy="words"
                direction="top"
                delay={100}
                stepDuration={0.38}
                className="text-[0.8125rem] leading-[1.5] text-white/75 justify-center sm:text-[0.9375rem] md:text-[1rem]"
              />
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={animate}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 flex w-full flex-col gap-3 sm:mt-6 sm:w-auto sm:flex-row sm:gap-4"
          >
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/offres"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-[0.8125rem] font-semibold text-black transition-all hover:bg-white/90 sm:px-9 sm:py-3.5 sm:text-[0.9375rem]"
              >
                Démarrer mon projet
              </Link>
            </motion.div>
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/60 px-5 py-2.5 text-[0.8125rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/15 sm:px-9 sm:py-3.5 sm:text-[0.9375rem]"
              >
                Voir nos services
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={animate}
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 0.6, delay: 0.88, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:mt-4 sm:gap-x-5"
          >
            {trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[0.7rem] text-white/55 sm:text-[0.8rem]">
                <CheckCircle2 size={12} strokeWidth={2} className="shrink-0" />
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 1.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mx-auto mt-12 w-full max-w-lg border-t border-white/10 pt-6 sm:mt-14 sm:pt-8 md:mt-16 md:pt-10"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-0.5 px-2 min-w-0 sm:gap-1 sm:px-4">
                <p className="text-[1.25rem] font-semibold leading-none text-white sm:text-[1.5rem] md:text-[1.875rem] lg:text-[2.25rem]">
                  <CountUp
                    key={`${s.label}-${statsKey}`}
                    to={s.to}
                    duration={1.8}
                    delay={0.3}
                    forceStart
                    onStart={undefined}
                    onEnd={undefined}
                  />
                  <span className="ml-0.5">{s.suffix}</span>
                </p>
                <p className="text-center text-[0.58rem] font-medium uppercase tracking-[0.1em] text-white/45 sm:text-[0.65rem] sm:tracking-[0.12em] md:text-[0.7rem] md:tracking-[0.14em]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Flèche scroll */}
      <motion.a
        href="/#services"
        initial={{ opacity: 0 }}
        animate={animate}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-white/40 transition-colors hover:text-white/70"
        aria-label="Faire défiler vers les services"
      >
        <ArrowDown size={16} strokeWidth={2} className="animate-bounce" />
      </motion.a>
    </section>
  );
}
