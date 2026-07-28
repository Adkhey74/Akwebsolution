import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";

const BASE_URL = "https://akwebsolutions.fr";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Conseils et guides sur la création de sites web, le SEO et la performance, par un développeur web freelance à Annecy (Haute-Savoie).",
  alternates: { canonical: `${BASE_URL}/blog` },
  openGraph: {
    url: `${BASE_URL}/blog`,
    title: "Blog | AKWebSolution",
    description:
      "Conseils et guides sur la création de sites web, le SEO et la performance — développeur web freelance à Annecy.",
  },
};

export default function BlogPage() {
  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        <BlogList />
      </main>
      <Footer />
    </div>
  );
}
