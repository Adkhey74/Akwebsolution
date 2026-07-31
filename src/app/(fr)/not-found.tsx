import type { Metadata } from "next";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

/**
 * La 404 est passée composant SERVEUR pour pouvoir porter ses propres
 * métadonnées : en composant client, elle n'en exportait aucune et héritait
 * donc du titre de l'accueil — un visiteur tombé sur une URL morte voyait
 * « Création de sites web à Annecy » dans son onglet.
 */
export const metadata: Metadata = {
  title: "Page introuvable",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundPage />;
}
