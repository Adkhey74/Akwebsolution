"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";

/**
 * Smooth-scroll global (Lenis) + configuration motion respectant
 * prefers-reduced-motion. Lenis est désactivé si l'utilisateur
 * demande moins d'animations.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

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
   * Rejoindre une ancre depuis une AUTRE page (le lien « Services » du pied de
   * page, présent partout) est une vraie navigation Next, pas un clic sur un
   * lien déjà présent dans la page — l'option `anchors` de Lenis ne s'en charge
   * pas. Le layout racine ne démonte jamais, donc Lenis garde aussi sa position
   * de scroll d'une page à l'autre : sans ce recalage, son prochain tick de RAF
   * ramène la page à l'ancienne position au lieu de la section ciblée.
   *
   * On sonde image par image au lieu de tenter le calcul une seule fois. Deux
   * choses ne sont pas garanties à l'instant où cet effet part :
   *   — `window.location.hash` peut encore porter l'URL PRÉCÉDENTE. `pathname`
   *     vient de l'état du routeur, l'URL du navigateur est posée par Next au
   *     même commit ; lire un hash vide et abandonner (ce que faisait la
   *     version précédente) laissait le visiteur en haut de la page ;
   *   — la section visée peut ne pas être encore dans le DOM.
   * Sonder règle les deux sans avoir à deviner l'ordre.
   */
  useEffect(() => {
    let rafId = 0;
    let cancelled = false;
    const deadline = performance.now() + 2000;

    const targetOf = () => {
      const hash = window.location.hash;
      // `getElementById` plutôt qu'un sélecteur : un hash qui commence par un
      // chiffre est un sélecteur CSS invalide, et `querySelector` lèverait.
      return hash.length > 1 ? document.getElementById(hash.slice(1)) : null;
    };

    const scrollTo = (el: HTMLElement) => {
      const lenis = lenisRef.current;
      if (lenis) lenis.scrollTo(el, { duration: 1.1 });
      else el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    const tick = (now: number) => {
      if (cancelled) return;
      const el = targetOf();
      if (el) {
        scrollTo(el);
        /*
         * Deuxième passe une fois les polices posées. Geist et Fraunces
         * arrivent en `display: swap` : la bascule depuis la police de repli
         * change la hauteur de tous les blocs situés au-dessus de la cible,
         * donc la position calculée à la première passe devient fausse.
         * On ne corrige que si le visiteur n'a pas repris la main entre-temps —
         * le recaler pendant qu'il fait défiler lui arracherait la page des
         * mains. Rejouer `scrollTo` sur la même position est sans effet.
         */
        let taken = false;
        const takeOver = () => { taken = true; };
        const opts = { passive: true, once: true } as const;
        window.addEventListener("wheel", takeOver, opts);
        window.addEventListener("touchstart", takeOver, opts);
        window.addEventListener("keydown", takeOver, opts);

        document.fonts.ready
          .then(() => {
            if (cancelled || taken) return;
            const again = targetOf();
            if (again) scrollTo(again);
          })
          .catch(() => {});
        return;
      }
      if (now < deadline) rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
