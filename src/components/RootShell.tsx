import { Fraunces, Geist } from "next/font/google";
import "@/app/globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { I18nProvider } from "@/lib/i18n/context";
import { SkipLink } from "@/components/SkipLink";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n/translations";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Serif display — Fraunces (variable, optical sizing + italique)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

/**
 * Enveloppe HTML commune aux deux arbres de routes.
 *
 * Le site a DEUX layouts racines — `app/(fr)/layout.tsx` et
 * `app/(en)/layout.tsx` — parce que `<html lang>` doit être juste dans le HTML
 * servi, avant tout JavaScript. Un layout unique ne peut pas connaître la
 * langue de la page qu'il enveloppe ; deux layouts, chacun dans son groupe de
 * routes, la connaissent par construction. Tout ce qui ne dépend pas de la
 * langue vit donc ici, en un seul exemplaire.
 *
 * Avant, `lang` valait toujours « fr » et une balise `<meta>` corrigeait la
 * langue après hydratation : les moteurs de recherche lisaient du français
 * annoncé pour des pages anglaises.
 */
export function RootShell({
  locale,
  children,
}: Readonly<{
  locale: Locale;
  children: React.ReactNode;
}>) {
  /*
   * `data-scroll-behavior="smooth"` est requis depuis Next 16 : les versions
   * précédentes neutralisaient d'office le `scroll-behavior: smooth` de
   * globals.css pendant une navigation interne. Ce n'est plus le cas, et sans
   * cet attribut le navigateur anime le saut de page à chaque changement de
   * route — on voit défiler la page précédente avant d'arriver sur la nouvelle.
   */
  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={cn("font-sans", geist.variable)}
      suppressHydrationWarning
    >
      {/* eslint-disable-next-line @next/next/no-head-element --
          La règle vise `next/head`, qui appartient au Pages Router. En App
          Router, un layout racine rend bien `<html>` et `<head>` lui-même.
          Le faux positif n'apparaissait pas tant que ce code vivait dans
          `layout.tsx` : la règle épargne les fichiers de l'App Router, et ce
          composant est dans `components/`. */}
      <head>
        {/*
          Thème appliqué AVANT le premier rendu, sinon on voit le mauvais thème
          pendant une fraction de seconde (le HTML est servi statiquement, donc
          il ne peut pas connaître la préférence à l'avance).

          Ordre de priorité : choix explicite mémorisé, sinon préférence du
          système. Script volontairement minuscule et synchrone — il doit
          s'exécuter avant que le navigateur peigne quoi que ce soit.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var c=localStorage.getItem("theme");var d=c?c==="dark":matchMedia("(prefers-color-scheme: dark)").matches;if(d)document.documentElement.classList.add("dark");var m=document.createElement("meta");m.name="theme-color";m.content=d?"#0B0B0F":"#FAFAFD";document.head.appendChild(m);}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${fraunces.variable} font-sans antialiased`}>
        <JsonLd locale={locale} />
        <I18nProvider locale={locale}>
          <SkipLink />
          <SmoothScroll>
            {children}
            <WhatsAppButton />
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
