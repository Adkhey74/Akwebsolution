import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { BlogList } from "@/components/BlogList";
import { Footer } from "@/components/Footer";

import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("blog", "fr");

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
