import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AProposContent } from "@/components/AProposContent";

/** Corps de la page « À propos », partagé par `/a-propos` et `/en/a-propos`. */
export function AProposPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-transparent">
      <Header />
      <main id="main" className="min-w-0">
        <AProposContent />
      </main>
      <Footer />
    </div>
  );
}
