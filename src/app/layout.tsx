import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageLoaderProvider } from "@/components/PageLoaderContext";
import { SmoothScroll } from "@/components/SmoothScroll";
import { JsonLd } from "@/components/JsonLd";
import { I18nProvider } from "@/lib/i18n/context";
import { SkipLink } from "@/components/SkipLink";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

// Serif display — Fraunces (variable, optical sizing + italique)
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const BASE_URL = "https://akwebsolutions.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Création de sites web à Annecy | AKWebSolution",
    template: "%s | AKWebSolution",
  },
  description:
    "Développeur web freelance à Annecy (Haute-Savoie). Création de sites vitrines et sur mesure : design élégant, responsive, optimisé SEO. Tarifs transparents, devis gratuit.",
  keywords: [
    "création site web Annecy",
    "agence web Annecy",
    "développeur web freelance Annecy",
    "création site internet Haute-Savoie",
    "site vitrine Annecy",
    "web design Annecy",
    "site sur mesure",
    "création site web",
    "agence web",
    "SEO",
    "freelance web",
  ],
  authors: [{ name: "AKWebSolution", url: BASE_URL }],
  creator: "AKWebSolution",
  publisher: "AKWebSolution",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
    languages: { "fr-FR": BASE_URL },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "AKWebSolution",
    title: "Création de sites web à Annecy | AKWebSolution",
    description:
      "Développeur web freelance à Annecy (Haute-Savoie) — sites vitrines et sur mesure. Design élégant, responsive, optimisé SEO.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "AKWebSolution — Création de sites web sur mesure",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AKWebSolution | Création de sites web sur mesure",
    description:
      "Agence web spécialisée en création de sites vitrines et sur mesure.",
    images: ["/opengraph-image"],
    creator: "@akwebsolution",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
  /* theme-color est posé par le script inline puis mis à jour par le sélecteur
     de thème : sa valeur dépend du choix de l'utilisateur, pas d'un statique. */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)} suppressHydrationWarning>
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
        <JsonLd />
        <I18nProvider>
          <SkipLink />
          <PageLoaderProvider>
            <SmoothScroll>
              {children}
              <WhatsAppButton />
            </SmoothScroll>
          </PageLoaderProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
