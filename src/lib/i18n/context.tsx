"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { translations, type Locale } from "./translations";

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Traduit une clé « section.cle ». Renvoie la clé telle quelle si introuvable. */
  t: (key: string) => string;
  /** Variante pour les valeurs de type tableau (listes de features, tags…). */
  tList: (key: string) => string[];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const STORAGE_KEY = "locale";
const LOCALES: Locale[] = ["fr", "en"];

const isLocale = (v: unknown): v is Locale =>
  typeof v === "string" && (LOCALES as string[]).includes(v);

/** Descend un chemin « a.b.c » dans un objet, ou undefined si la route casse. */
function resolve(root: unknown, path: string[]): unknown {
  let value: unknown = root;
  for (const key of path) {
    if (value && typeof value === "object" && key in value) {
      value = (value as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }
  return value;
}

export function I18nProvider({
  children,
  defaultLocale = "fr",
}: {
  children: React.ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Langue mémorisée. Lue après le montage (et non pendant le rendu) : le HTML
  // est servi statiquement, il ne peut pas connaître la préférence à l'avance.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* stockage refusé : on reste sur la langue par défaut */
    }
  }, []);

  // Garde <html lang> aligné sur la langue affichée : c'est ce qui indique aux
  // lecteurs d'écran quelle prononciation utiliser, et à Google quelle langue
  // il lit.
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* navigation privée : la langue changera quand même, elle ne survivra
         simplement pas au rechargement */
    }
  }, []);

  /**
   * Résolution avec repli sur le français.
   *
   * NB : l'implémentation de HernTaxi retombait sur `translations.fr` puis
   * reparcourait le chemin DEPUIS LE DÉBUT à l'intérieur de la boucle, en
   * réutilisant la variable déjà partiellement descendue — le repli ne se
   * déclenchait donc correctement que si la clé cassait au premier segment.
   * Ici le repli est une seconde résolution complète et indépendante.
   */
  const lookup = useCallback(
    (key: string): unknown => {
      const path = key.split(".");
      const hit = resolve(translations[locale], path);
      if (hit !== undefined) return hit;
      return resolve(translations.fr, path);
    },
    [locale]
  );

  const t = useCallback(
    (key: string): string => {
      const value = lookup(key);
      return typeof value === "string" ? value : key;
    },
    [lookup]
  );

  const tList = useCallback(
    (key: string): string[] => {
      const value = lookup(key);
      return Array.isArray(value) ? (value as string[]) : [];
    },
    [lookup]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, tList }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n doit être utilisé à l'intérieur d'un I18nProvider");
  }
  return context;
}
