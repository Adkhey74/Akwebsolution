import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { rootMetadata } from "@/lib/seo";

/**
 * Layout racine de l'arbre FRANÇAIS — servi à la racine du domaine (`/offres`,
 * `/projets`…). Le groupe de routes `(fr)` n'apparaît pas dans les URLs : elles
 * restent exactement celles qui sont déjà indexées.
 */
export const metadata: Metadata = rootMetadata("fr");

export default function FrRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell locale="fr">{children}</RootShell>;
}
