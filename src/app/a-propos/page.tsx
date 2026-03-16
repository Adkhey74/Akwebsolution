import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AProposContent } from "@/components/AProposContent";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Adil — Développeur web freelance. Sites sur mesure, élégants et performants pour les entrepreneurs.",
  alternates: { canonical: "https://akwebsolutions.fr/a-propos" },
  openGraph: {
    url: "https://akwebsolutions.fr/a-propos",
    title: "À propos | AKWebSolution",
    description: "Qui suis-je — Développeur web freelance, sites sur mesure.",
  },
};

export default function AProposPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-transparent">
      <Header />
      <main className="min-w-0">
        <AProposContent />
      </main>
      <Footer />
    </div>
  );
}
