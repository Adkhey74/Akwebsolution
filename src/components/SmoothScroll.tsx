"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { usePageLoader } from "@/components/PageLoaderContext";

/**
 * Smooth-scroll global (Lenis) + configuration motion respectant
 * prefers-reduced-motion. Lenis est désactivé si l'utilisateur
 * demande moins d'animations.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const pageLoader = usePageLoader();
  const isLoading = pageLoader?.isLoading ?? false;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Sur tactile/mobile, le scroll natif est composité hors du thread
    // principal et reste plus fluide. Lenis y ajoute une boucle RAF qui
    // entre en concurrence avec le rendu → on le désactive. Les ancres
    // restent fluides via `scroll-behavior: smooth` (globals.css).
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /*
   * Rejoindre une ancre depuis une AUTRE page (ex. les boutons « Choisir » de
   * /offres vers `/?offer=...#contact`, ou « Demander la maintenance ») est
   * une vraie navigation Next, pas un clic sur un lien déjà présent dans la
   * page — l'option `anchors` de Lenis ne s'en charge pas. Le layout racine
   * ne démonte jamais, donc Lenis garde aussi sa position de scroll d'une
   * page à l'autre : sans ce recalage, son prochain tick de RAF ramenait la
   * page à l'ancienne position au lieu de la section ciblée.
   *
   * On attend en plus la fin du PageLoader (`isLoading`) avant de calculer la
   * position de la cible : sur l'accueil, il ne se termine qu'une fois la
   * vidéo du hero prête, et tant que ce contenu asynchrone n'a pas fini de se
   * poser, la section #contact peut encore bouger sous l'effet des décalages
   * de mise en page — scroller trop tôt visait une position qui devenait
   * fausse une fois la page stabilisée.
   */
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || isLoading) return;

    const id = requestAnimationFrame(() => {
      const target = document.querySelector(hash);
      if (!target) return;
      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { duration: 1.1 });
      } else {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, isLoading]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
