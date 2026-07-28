import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Calendar, Tag, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { CaseStudyContent } from "@/components/CaseStudyContent";
import { Footer } from "@/components/Footer";
import { getProject, projects } from "@/lib/projects";

const BASE_URL = "https://akwebsolutions.fr";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  const url = `${BASE_URL}/projets/${p.slug}`;
  return {
    title: p.metaTitle,
    description: p.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      url,
      title: p.metaTitle,
      description: p.metaDescription,
      images: [{ url: p.cover.src, alt: p.cover.alt }],
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.category,
    creator: { "@type": "Organization", name: "AKWebSolution", url: BASE_URL },
    url: `${BASE_URL}/projets/${project.slug}`,
    image: `${BASE_URL}${project.cover.src}`,
    description: project.metaDescription,
    dateCreated: project.year,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Réalisations", item: `${BASE_URL}/projets` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${BASE_URL}/projets/${project.slug}` },
    ],
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <CaseStudyContent slug={project.slug} />
      <Footer />
    </div>
  );
}
