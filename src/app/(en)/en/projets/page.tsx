import type { Metadata } from "next";
import { ProjetsPage } from "@/components/pages/ProjetsPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("projects", "en");

export default function ProjetsEn() {
  return <ProjetsPage />;
}
