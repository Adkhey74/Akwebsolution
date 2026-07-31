import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProjetsList } from "@/components/ProjetsList";
import { ProjetsHeader } from "@/components/ProjetsHeader";
import { ProjetsCta } from "@/components/ProjetsCta";

/** Corps de la page « Réalisations », partagé par `/projets` et `/en/projets`. */
export function ProjetsPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        <ProjetsHeader />
        <ProjetsList />
        <ProjetsCta />
      </main>
      <Footer />
    </div>
  );
}
