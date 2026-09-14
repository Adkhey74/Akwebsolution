"use client";

import { createContext, useCallback, useContext, useEffect, useRef, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { MotionConfig } from "motion/react";
import Lenis from "lenis";
import { splitLocale } from "@/lib/i18n/config";

/**
 * Retour au hero quand on clique le logo ou « Accueil » DEPUIS l'accueil.
 *
 * Un lien vers la page où l'on se trouve déjà n'est pas une navigation pour
 * Next : rien ne se passe, la page reste où elle est. Mesuré le 14/09/2026 —
 * sur l'accueil, défilé à 3 200 px, le clic laissait la page à 3 200 px sur
 * les trois chemins de défilement du site (Lenis, natif sur mobile, mouvement
 * réduit). Depuis une autre page, la navigation arrive déjà en haut : on n'y
 * touche pas.
 *
 * Le défilement passe par Lenis quand il tourne — un `window.scrollTo` direct
 * serait repris au tick suivant par sa position interne, le piège déjà
 * rencontré sur les ancres ci-dessous.
 */
const ScrollToTopContext = createContext<(() => void) | null>(null);

/**
 * Gestionnaire de clic à poser sur les liens vers l'accueil. Sur une autre
 * page, il ne fait rien et laisse Next naviguer ; sur l'accueil, il remonte au
 * hero au lieu d'une navigation qui n'aurait aucun effet.
 */
export function useHomeLinkClick() {
  const scrollToTop = useContext(ScrollToTopContext);
  const pathname = usePathname();

  return useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // Forme racine : l'accueil anglais est « /en », pas « / ».
      if (splitLocale(pathname).path !== "/") return;
      // Cmd/Ctrl/Maj-clic : le visiteur veut un nouvel onglet, pas un défilement.
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      // Arrivé sur « /#services » via une ancre, le lien vise « / » : on retire
      // le fragment, sinon l'URL continuerait de désigner une section qu'on
      // vient de quitter. L'état d'historique de Next est conservé tel quel.
      if (window.location.hash) {
        window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
      }
      if (scrollToTop) scrollToTop();
      else window.scrollTo({ top: 0 });
    },
    [pathname, scrollToTop],
  );
}

/**
 * Smooth-scroll global (Lenis) + configuration motion respectant
 * prefers-reduced-motion. Lenis est désactivé si l'utilisateur
 * demande moins d'animations.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const scrollToTop = useCallback(() => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.1 });
      return;
    }
    // Lenis est coupé sur tactile et en mouvement réduit. Le `behavior` passé
    // en JS l'emporte sur le `scroll-behavior: auto` de globals.css : il faut
    // donc respecter la préférence ici, explicitement.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  }, []);

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
      /*
       * Lenis ne démonte jamais — le layout racine reste monté d'une page à
       * l'autre — et garde donc sa position de défilement interne. Sans cette
       * option, cliquer « Choisir cette offre » en bas de /offres ouvrait
       * /contact déjà défilée : Next remet bien la page en haut, puis le tick
       * de RAF suivant de Lenis y réimposait les ~2 000 px hérités de /offres.
       *
       * L'option fait appeler `reset()` au moment du CLIC, donc avant la
       * navigation : Lenis stoppe son animation et se resynchronise sur la
       * position réelle au lieu de la redonner. C'est le bon moment, et c'est
       * le seul — après coup, il a déjà rendu une frame à la mauvaise position.
       *
       * Portée volontairement limitée aux clics : les retours arrière du
       * navigateur ne passent pas par là, donc la restauration de position que
       * fait Next sur « Précédent » n'est pas touchée.
       */
      stopInertiaOnNavigate: true,
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

  return (
    <ScrollToTopContext.Provider value={scrollToTop}>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ScrollToTopContext.Provider>
  );
}
