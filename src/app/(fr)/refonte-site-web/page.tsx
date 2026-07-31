import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/pages/LandingPage";
import { getLanding } from "@/lib/landings";
import { pageMetadata } from "@/lib/seo";

const landing = getLanding("/refonte-site-web");

export const metadata: Metadata = pageMetadata("redesign", "fr");

export default function RefonteSiteWeb() {
  if (!landing) notFound();
  return <LandingPage landing={landing} />;
}
