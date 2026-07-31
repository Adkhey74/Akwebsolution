"use client";

import React, { createContext, useCallback, useContext, useMemo } from "react";
import type { Locale } from "./translations";
import { localeHref } from "./config";
import { translate, translateList } from "./lookup";

type I18nContextType = {
  locale: Locale;
  /** Traduit une clé « section.cle ». Renvoie la clé telle quelle si introuvable. */
  t: (key: string) => string;
  /** Variante pour les valeurs de type tableau (listes de features, tags…). */
  tList: (key: string) => string[];
  /**
   * Préfixe un lien interne de la langue courante — « lp » pour locale path.
   *
   * À utiliser pour TOUT `href` interne. Un lien écrit en dur ramènerait le
   * visiteur anglais sur le site français sans qu'on s'en aperçoive : le site
   * reste fonctionnel, la langue change juste toute seule — donc le bug ne se
   * voit pas en test.
   *
   * Le chemin s'écrit dans sa forme française (`/offres`, `/#contact`), telle
   * qu'elle existe à la racine du domaine. Voir `localeHref` pour le cas des
   * pages qui n'existent qu'en français.
   */
  lp: (path: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * La langue vient de l'URL, passée par le layout racine de chaque arbre de
 * routes — elle n'est plus mémorisée en `localStorage`.
 *
 * L'ancienne version stockait la langue côté client : le HTML servi était donc
 * toujours le français, et l'anglais n'apparaissait qu'après hydratation. Aucun
 * moteur de recherche ne pouvait indexer la version anglaise, faute d'URL à
 * indexer. Maintenant `/` et `/en` sont deux pages distinctes, rendues
 * statiquement, chacune dans sa langue.
 */
export function I18nProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: Locale;
}) {
  const t = useCallback((key: string) => translate(locale, key), [locale]);
  const tList = useCallback((key: string) => translateList(locale, key), [locale]);
  const lp = useCallback((path: string) => localeHref(locale, path), [locale]);

  const value = useMemo(() => ({ locale, t, tList, lp }), [locale, t, tList, lp]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n doit être utilisé à l'intérieur d'un I18nProvider");
  }
  return context;
}
