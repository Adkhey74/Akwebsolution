import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/pages/LandingPage";
import { getLanding } from "@/lib/landings";
import { pageMetadata } from "@/lib/seo";

const landing = getLanding("/site-web-restaurant-annecy");

export const metadata: Metadata = pageMetadata("restaurant", "fr");

export default function SiteWebRestaurantAnnecy() {
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
