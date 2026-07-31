import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/pages/LandingPage";
import { getLanding } from "@/lib/landings";
import { pageMetadata } from "@/lib/seo";

const landing = getLanding("/site-web-artisan-annecy");

export const metadata: Metadata = pageMetadata("artisan", "fr");

export default function SiteWebArtisanAnnecy() {
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
