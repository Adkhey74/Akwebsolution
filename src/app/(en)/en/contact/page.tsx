import type { Metadata } from "next";
import { ContactPage } from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("contact", "en");

export default function ContactRouteEn() {
  return <ContactPage />;
}
