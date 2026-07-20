"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageLoader } from "@/components/PageLoaderContext";
import dynamic from "next/dynamic";

import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const BlurText = dynamic(() => import("@/components/BlurText").then((m) => m.default), { ssr: false });
const Beams = dynamic(() => import("@/components/Beams").then((m) => m.Beams), { ssr: false });

const stats = [
  { to: 5, suffix: "+", label: "ans d'expérience" },
  { to: 100, suffix: "%", label: "Clients satisfaits" },
  { to: 24, suffix: "h", label: "Délai de réponse" },
];

const trust = ["Prix fixe, sans surprise", "Sans engagement", "Livraison rapide"];

// Grain SVG (fractal noise) encodé en data-URI
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

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
    <section className="relative flex h-[calc(100vh+5.25rem)] min-h-[calc(100dvh+5.25rem)] flex-col overflow-hidden pt-32 -mt-[5.25rem] md:h-[calc(100vh+6rem)] md:min-h-[calc(100dvh+6rem)] md:-mt-24 md:pt-40">

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

      {/* Halo lumineux derrière le titre */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] h-[380px] w-[820px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: "radial-gradient(ellipse at center, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0) 70%)", filter: "blur(40px)" }}
        aria-hidden
      />

      {/* Vignette — assombrit les bords */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse 85% 80% at 50% 45%, transparent 35%, rgba(0,0,0,0.65) 100%)" }}
        aria-hidden
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] opacity-[0.14] mix-blend-overlay"
        style={{ backgroundImage: GRAIN }}
        aria-hidden
      />

      {/* ── Contenu centré ── */}
      <div className="section-container relative z-10 flex flex-1 flex-col items-center justify-center text-center">

        {/* Badge eyebrow (masqué sur mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={animate}
          variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-6 hidden items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.07] px-4 py-1.5 backdrop-blur-md sm:mb-8 sm:inline-flex"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[0.7rem] sm:tracking-[0.22em]">
            Agence Web · Sites sur mesure
          </span>
        </motion.div>

        {/* H1 — Fraunces, XXL */}
        <h1 className="max-w-5xl text-[2.25rem] font-normal leading-[1.02] tracking-[-0.02em] text-white sm:text-[3rem] md:text-[4rem] lg:text-[5rem]">
          <span className="block overflow-hidden pb-[0.08em]">
            <motion.span
              className="block"
              initial={{ y: "105%" }}
              animate={animate}
              variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
            >
              Des sites web{" "}
              <span className="relative font-display font-semibold italic">
                élégants
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={animate}
                  variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                  transition={{ duration: 0.45, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-white/70"
                />
              </span>
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.08em]">
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
        <div className="mt-6 max-w-[40rem]">
          {/* @ts-expect-error BlurText props optionnelles */}
          <BlurText
            text="Sites rapides, clairs et adaptés à votre activité. Une présence en ligne professionnelle, à votre image."
            animateBy="words"
            direction="top"
            delay={100}
            stepDuration={0.38}
            className="justify-center text-center text-[0.9375rem] leading-[1.6] text-white/75 md:text-[1.0625rem]"
          />
        </div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={animate}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-4"
        >
          <Link href="/offres" aria-label="Démarrer mon projet" className="w-full sm:w-auto">
            <ShimmerButton
              background="#ffffff"
              shimmerColor="rgba(0,0,0,0.55)"
              borderRadius="9999px"
              className="w-full gap-2 border-transparent px-6 py-3 text-[0.875rem] font-semibold !text-black sm:w-auto sm:px-10 sm:py-4 sm:text-[0.9375rem]"
            >
              Démarrer mon projet
              <ArrowRight size={16} strokeWidth={2.25} />
            </ShimmerButton>
          </Link>
          <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#services"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-[0.875rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto sm:px-10 sm:py-4 sm:text-[0.9375rem]"
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
          className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          {trust.map((item) => (
            <span key={item} className="flex items-center gap-1.5 text-[0.75rem] text-white/60 sm:text-[0.8rem]">
              <CheckCircle2 size={13} strokeWidth={2} className="shrink-0" />
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── Bande de preuve (stats) ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={animate}
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 border-t border-white/10 bg-black/25 backdrop-blur-[2px]"
      >
        <div className="section-container flex items-stretch justify-center divide-x divide-white/10">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex flex-1 flex-col items-center gap-0.5 px-3 py-5 sm:flex-row sm:items-baseline sm:justify-center sm:gap-2 sm:px-6 sm:py-6"
            >
              <span className="flex items-baseline whitespace-nowrap text-[1.375rem] font-semibold leading-none text-white sm:text-[1.75rem]">
                <NumberTicker
                  key={`${s.label}-${statsKey}`}
                  value={s.to}
                  delay={0.4}
                  className="text-white"
                />
                <span className="ml-0.5">{s.suffix}</span>
              </span>
              <span className="text-center text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white/55 sm:text-left sm:text-[0.72rem]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
