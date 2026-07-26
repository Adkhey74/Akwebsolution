"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { usePageLoader } from "@/components/PageLoaderContext";

import { NumberTicker } from "@/components/ui/number-ticker";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AuroraText } from "@/components/ui/aurora-text";
import { HeroBackground } from "@/components/HeroBackground";

const AURORA = ["#6D5EFF", "#A78BFA", "#8B7EFF", "#C4B5FD"];

// Fond Beams (three.js) — conservé pour revenir en arrière si besoin :
// const Beams = dynamic(() => import("@/components/Beams").then((m) => m.Beams), { ssr: false });

const stats = [
  { to: 5, suffix: "+", label: "ans d'expérience" },
  { to: 100, suffix: "%", label: "Clients satisfaits" },
  { to: 24, suffix: "h", label: "Délai de réponse" },
];

const trust = ["Tarifs transparents", "Sans engagement", "Livraison rapide"];

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

      {/* Fond animé CSS (remplace les Beams three.js — perf) */}
      <HeroBackground />

      {/* — Ancien fond Beams (three.js), conservé pour revenir en arrière :
      <Beams
        beamNumber={10}
        beamWidth={2}
        beamHeight={18}
        lightColor="#9C88FF"
        speed={1.2}
        noiseIntensity={1.5}
        scale={0.18}
        rotation={20}
      /> */}

      {/* Halo violet derrière le titre — masqué sur mobile (le blur(50px)
          fait ramer Safari pendant l'animation d'entrée ; le dégradé du
          fond statique prend le relais) */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] z-[1] hidden h-[420px] w-[860px] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full md:block"
        style={{ background: "radial-gradient(ellipse at center, rgba(109,94,255,0.28) 0%, rgba(109,94,255,0) 70%)", filter: "blur(50px)" }}
        aria-hidden
      />

      {/* Vignette — assombrit les bords */}
      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse 85% 80% at 50% 45%, transparent 35%, rgba(0,0,0,0.65) 100%)" }}
        aria-hidden
      />

      {/* Grain — masqué sur mobile : un mix-blend-overlay plein écran force
          Safari à re-blender tout le Hero à chaque frame d'animation */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] hidden opacity-[0.14] mix-blend-overlay md:block"
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
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)]/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/75 sm:text-[0.7rem] sm:tracking-[0.22em]">
            Agence Web à Annecy · Sites sur mesure
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
                <AuroraText colors={AURORA} speed={1.2}>élégants</AuroraText>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={animate}
                  variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                  transition={{ duration: 0.45, delay: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="absolute -bottom-1 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
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
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={animate}
          variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-6 max-w-[40rem] text-center text-[0.9375rem] leading-[1.6] text-white/75 md:text-[1.0625rem]"
        >
          Développeur web freelance à Annecy. Sites rapides, clairs et adaptés à
          votre activité — une présence en ligne professionnelle, à votre image,
          en Haute-Savoie et partout en France.
        </motion.p>

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
              background="var(--accent)"
              shimmerColor="rgba(255,255,255,0.85)"
              borderRadius="9999px"
              className="w-full gap-2 border-transparent px-6 py-3 text-[0.875rem] font-semibold !text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_50px_-10px_var(--accent)] sm:w-auto sm:px-10 sm:py-4 sm:text-[0.9375rem]"
            >
              Démarrer mon projet
              <ArrowRight size={16} strokeWidth={2.25} />
            </ShimmerButton>
          </Link>
          <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/#services"
              className="inline-flex w-full items-center justify-center rounded-full border border-white/25 px-6 py-3 text-[0.875rem] font-medium text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)]/70 hover:bg-[var(--accent)]/10 hover:shadow-[0_8px_28px_-10px_var(--accent)] max-md:backdrop-blur-none sm:w-auto sm:px-10 sm:py-4 sm:text-[0.9375rem]"
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

        {/* ── Stats : 3 cartes verre violettes ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={animate}
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.6, delay: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-10 grid w-full max-w-xl grid-cols-3 gap-3 sm:mt-12 sm:gap-4"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-2 py-4 backdrop-blur-md transition-colors hover:border-[var(--accent)]/40 max-md:bg-white/[0.06] max-md:backdrop-blur-none sm:px-4 sm:py-5"
            >
              {/* glow violet — masqué sur mobile (blur re-rasterisé pendant l'entrée) */}
              <div className="pointer-events-none absolute -top-10 left-1/2 hidden h-20 w-20 -translate-x-1/2 rounded-full bg-[var(--accent)]/30 blur-2xl md:block" />
              <p className="relative flex items-baseline justify-center whitespace-nowrap text-[1.5rem] font-semibold leading-none text-[var(--accent-soft)] sm:text-[2rem]">
                <NumberTicker
                  key={`${s.label}-${statsKey}`}
                  value={s.to}
                  delay={0.4}
                  className="text-[var(--accent-soft)]"
                />
                <span className="ml-0.5">{s.suffix}</span>
              </p>
              <p className="relative mt-1.5 text-center text-[0.58rem] font-medium uppercase leading-tight tracking-[0.1em] text-white/55 sm:text-[0.68rem]">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
