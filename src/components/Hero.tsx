"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, CheckCircle2 } from "lucide-react";
import { usePageLoader } from "@/components/PageLoaderContext";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const BlurText = dynamic(() => import("@/components/BlurText").then((m) => m.default), { ssr: false });
const CountUp = dynamic(() => import("@/components/CountUp").then((m) => m.default), { ssr: false });

const stats = [
  { to: 5, suffix: "+", label: "ans d'expérience" },
  { to: 100, suffix: "%", label: "Clients satisfaits" },
  { to: 24, suffix: "h", label: "Délai de réponse" },
];

const trust = ["Prix fixe, sans surprise", "Sans engagement", "Livraison rapide"];

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const loader = usePageLoader();
  const setVideoReady = loader?.setVideoReady;
  const isLoading = loader?.isLoading ?? true;

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !setVideoReady) return;
    const handleCanPlay = () => setVideoReady();
    video.addEventListener("canplay", handleCanPlay);
    if (video.readyState >= 3) setVideoReady();
    return () => video.removeEventListener("canplay", handleCanPlay);
  }, [setVideoReady]);

  const animate = !isLoading ? "visible" : "hidden";
  const pathname = usePathname();
  const [statsKey, setStatsKey] = useState(0);

  // Force le remontage des CountUp à chaque fois que le loader se termine
  useEffect(() => {
    if (!isLoading) {
      setStatsKey((k) => k + 1);
    }
  }, [isLoading]);

  return (
    <section className="relative flex h-[calc(100vh+4rem)] min-h-[calc(100dvh+4rem)] flex-col justify-center overflow-hidden pb-24 pt-36 -mt-16 md:h-[calc(100vh+5rem)] md:min-h-[calc(100dvh+5rem)] md:-mt-20 md:pt-44 md:pb-32">

      {/* Vidéo de fond — couvre toute la hauteur */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      >
        <source src="/videos/videoSection.mp4" type="video/mp4" />
      </video>

      {/* Voile sombre */}
      <div className="absolute inset-0 bg-black/55" aria-hidden />

      <div className="section-container relative z-10">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">

          {/* Badge eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={animate}
            variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
            <span className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/70">
              Agence Web · Sites sur mesure
            </span>
          </motion.div>

          {/* H1 — 2 lignes sur mobile, taille légèrement augmentée */}
          <h1 className="text-[2.15rem] font-light leading-[1.2] tracking-tight text-white sm:text-[2.25rem] md:text-[3.5rem] lg:text-[4rem]">
            <span className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "105%" }}
                animate={animate}
                variants={{ hidden: { y: "105%" }, visible: { y: "0%" } }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              >
                Des sites web{" "}
                <span className="relative font-semibold">
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
          <div className="mt-5 flex justify-center">
            <div className="max-w-[28rem] md:max-w-[32rem] text-center">
              {/* @ts-expect-error BlurText props optionnelles */}
              <BlurText
                text="Sites rapides, clairs et adaptés à votre activité. Une présence en ligne professionnelle, à votre image."
                animateBy="words"
                direction="top"
                delay={100}
                stepDuration={0.38}
                className="text-[0.9375rem] leading-[1.5] text-white/75 md:text-[1rem] justify-center"
              />
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={animate}
            variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.6, delay: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4"
          >
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/offres"
                className="inline-flex w-full items-center justify-center rounded-full bg-white px-9 py-3.5 text-[0.9375rem] font-semibold text-black transition-all hover:bg-white/90 sm:py-4"
              >
                Démarrer mon projet
              </Link>
            </motion.div>
            <motion.div className="w-full sm:w-auto" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/35 px-9 py-3.5 text-[0.9375rem] font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:py-4"
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
            className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2"
          >
            {trust.map((item) => (
              <span key={item} className="flex items-center gap-1.5 text-[0.8rem] text-white/55">
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
          className="mx-auto mt-16 max-w-lg border-t border-white/10 pt-10 md:mt-20"
        >
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-1 px-4">
                <p className="text-[1.875rem] font-semibold leading-none text-white md:text-[2.25rem]">
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
                <p className="text-center text-[0.7rem] font-medium uppercase tracking-[0.14em] text-white/45">
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
