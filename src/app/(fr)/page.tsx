import type { Metadata } from "next";
import { HomePage } from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("home", "fr");

export default function Home() {
  return <HomePage />;
}
