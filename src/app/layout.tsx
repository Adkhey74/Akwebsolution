import type { Metadata } from "next";
import { Jost, Cormorant_Garamond, Geist } from "next/font/google";
import "./globals.css";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { PageLoaderProvider } from "@/components/PageLoaderContext";
import { JsonLd } from "@/components/JsonLd";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const BASE_URL = "https://akwebsolutions.fr";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "AKWebSolution | Création de sites web sur mesure",
    template: "%s | AKWebSolution",
  },
  description:
    "AKWebSolution — Agence web spécialisée en création de sites vitrines, e-commerce et sur mesure. Design élégant, responsive, SEO optimisé. Devis gratuit.",
  keywords: [
    "création site web",
    "agence web",
    "site vitrine",
    "site e-commerce",
    "web design",
    "site sur mesure",
    "responsive",
    "SEO",
    "Next.js",
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
    title: "AKWebSolution | Création de sites web sur mesure",
    description:
      "Agence web spécialisée en création de sites vitrines, e-commerce et sur mesure. Design élégant, responsive, SEO optimisé.",
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
      "Agence web spécialisée en création de sites vitrines, e-commerce et sur mesure.",
    images: ["/opengraph-image"],
    creator: "@akwebsolution",
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={cn("font-sans", geist.variable)}>
      <body className={`${jost.variable} ${cormorant.variable} font-sans antialiased`}>
        <JsonLd />
        <PageLoaderProvider>
          {children}
          <WhatsAppButton />
        </PageLoaderProvider>
      </body>
    </html>
  );
}
