import type { Metadata } from "next";
import { OffresPage } from "@/components/pages/OffresPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("offers", "fr");

export default function Offres() {
  return <OffresPage />;
}
