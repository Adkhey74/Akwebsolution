import type { Metadata } from "next";
import { OffresPage } from "@/components/pages/OffresPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("offers", "en");

export default function OffresEn() {
  return <OffresPage />;
}
