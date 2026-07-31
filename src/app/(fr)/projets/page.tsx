import type { Metadata } from "next";
import { ProjetsPage } from "@/components/pages/ProjetsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("projects", "fr");

export default function Projets() {
  return <ProjetsPage />;
}
