import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home", "en");

export default function HomeEn() {
  return <HomePage />;
}
