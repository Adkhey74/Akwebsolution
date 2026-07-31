import type { Metadata } from "next";
import { AProposPage } from "@/components/pages/AProposPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("about", "fr");

export default function APropos() {
  return <AProposPage />;
}
