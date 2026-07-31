import type { Metadata } from "next";
import { NotFoundPage } from "@/components/pages/NotFoundPage";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you are looking for does not exist or has been moved.",
  robots: { index: false, follow: false },
};

export default function NotFoundEn() {
  return <NotFoundPage />;
}
