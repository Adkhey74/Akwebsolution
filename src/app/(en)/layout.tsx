import type { Metadata } from "next";
import { RootShell } from "@/components/RootShell";
import { rootMetadata } from "@/lib/seo";

/**
 * Layout racine de l'arbre ANGLAIS. Le groupe `(en)` ne produit pas de segment
 * d'URL : c'est le dossier `en/` qu'il contient qui donne le préfixe `/en`.
 *
 * Ce détour par un groupe de routes est ce qui permet d'avoir DEUX layouts
 * racines, donc deux `<html lang>` corrects, sans redirection ni réécriture
 * d'URL — un layout racine doit être au premier niveau de son groupe.
 */
export const metadata: Metadata = rootMetadata("en");

export default function EnRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RootShell locale="en">{children}</RootShell>;
}
