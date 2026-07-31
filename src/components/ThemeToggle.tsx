"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const STORAGE_KEY = "theme";

/**
 * Bascule clair ↔ sombre.
 *
 * Le thème est posé sur <html class="dark"> par le script inline de layout.tsx
 * avant le premier rendu ; ce composant ne fait que le basculer ensuite.
 *
 * Les deux icônes sont rendues en permanence et c'est la CSS (variante `dark:`)
 * qui montre la bonne. C'est volontaire : lire le thème en JS pour choisir quoi
 * afficher provoquerait un écart d'hydratation, le serveur ne pouvant pas
 * connaître la préférence du visiteur. Ici le markup est identique des deux
 * côtés, donc aucun avertissement et aucun scintillement de l'icône.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  // Sert uniquement à savoir si un choix explicite existe déjà, pour décider
  // si l'on doit continuer à suivre les changements de préférence système.
  const [hasChoice, setHasChoice] = useState(false);

  useEffect(() => {
    setHasChoice(!!localStorage.getItem(STORAGE_KEY));
  }, []);

  // Sans choix explicite, on reste aligné sur le système s'il change en cours
  // de route (bascule automatique jour/nuit de l'OS, par exemple).
  useEffect(() => {
    if (hasChoice) return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => apply(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [hasChoice]);

  const apply = (dark: boolean) => {
    document.documentElement.classList.toggle("dark", dark);
    // Couleur de la barre du navigateur sur mobile
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", dark ? "#0B0B0F" : "#FAFAFD");
  };

  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    apply(dark);
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light");
      setHasChoice(true);
    } catch {
      /* navigation privée / stockage refusé : la bascule marche quand même,
         elle ne survivra simplement pas au rechargement */
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      /* Libellé statique quant à l'ÉTAT : il ne peut pas décrire le thème
         courant sans réintroduire l'écart d'hydratation. « Basculer » reste
         exact. Il est en revanche traduit — les deux clés existaient déjà mais
         n'étaient pas branchées, si bien qu'un visiteur anglais entendait un
         libellé français dans son lecteur d'écran. */
      aria-label={t("header.themeToggle")}
      title={t("header.themeToggleShort")}
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-hover)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] ${className}`}
    >
      <Sun size={17} strokeWidth={1.75} className="dark:hidden" aria-hidden />
      <Moon size={17} strokeWidth={1.75} className="hidden dark:block" aria-hidden />
    </button>
  );
}
