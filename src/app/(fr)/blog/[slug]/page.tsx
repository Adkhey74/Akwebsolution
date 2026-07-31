import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Clock, RefreshCw, User } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  getArticle,
  getPublishedArticles,
  isPublished,
  formatDateFr,
} from "@/lib/blog";

const BASE_URL = "https://akwebsolutions.fr";

export function generateStaticParams() {
  return getPublishedArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArticle(slug);
  // Article inexistant ou non publié (brouillon / date future) → non indexable
  if (!a || !isPublished(a)) {
    return { robots: { index: false, follow: false } };
  }

  const url = `${BASE_URL}/blog/${a.slug}`;
  const title = a.metaTitle ?? a.title;
  return {
    title,
    description: a.metaDescription,
    keywords: a.keywords,
    alternates: { canonical: url },
    authors: [{ name: a.author, url: `${BASE_URL}/a-propos` }],
    openGraph: {
      type: "article",
      url,
      title,
      description: a.metaDescription,
      publishedTime: a.publishedAt,
      modifiedTime: a.updatedAt ?? a.publishedAt,
      authors: [`${BASE_URL}/a-propos`],
      images: a.image ? [{ url: a.image.src, alt: a.image.alt }] : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article || !isPublished(article)) notFound();

  const { Content } = article;
  const updatedAt = article.updatedAt ?? article.publishedAt;
  const showUpdated = updatedAt !== article.publishedAt;

  // Article suivant (pour le maillage interne)
  const posts = getPublishedArticles();
  const idx = posts.findIndex((p) => p.slug === slug);
  const next = posts.length > 1 ? posts[(idx + 1) % posts.length] : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.metaDescription,
    image: article.image
      ? `${BASE_URL}${article.image.src}`
      : `${BASE_URL}/opengraph-image`,
    datePublished: article.publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: article.author,
      url: `${BASE_URL}/a-propos`,
    },
    publisher: {
      "@type": "Organization",
      name: "AKWebSolution",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/images/logo3.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${article.slug}`,
    },
    inLanguage: "fr-FR",
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE_URL}/blog` },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${BASE_URL}/blog/${article.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main id="main" className="min-w-0">
        <article>
          {/* En-tête */}
          <header className="section-container pt-28 pb-8 sm:pt-36 md:pt-40">
            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              <ArrowLeft size={15} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
              Tous les articles
            </Link>

            <div className="mx-auto mt-8 max-w-[45rem]">
              <span className="eyebrow mb-5">Article</span>
              <h1 className="text-[2rem] font-light leading-[1.12] tracking-[-0.02em] text-[var(--foreground)] sm:text-[2.5rem] md:text-[3rem]">
                {article.title}
              </h1>

              {/* Méta : auteur (→ /a-propos), date de publication ET de mise à jour */}
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] text-[var(--muted)]">
                <span className="inline-flex items-center gap-2">
                  <User size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
                  Par{" "}
                  <Link href="/a-propos" className="font-medium text-[var(--accent-soft)] underline underline-offset-4 hover:text-[var(--foreground)]">
                    {article.author}
                  </Link>
                </span>
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
                  Publié le {formatDateFr(article.publishedAt)}
                </span>
                {showUpdated && (
                  <span className="inline-flex items-center gap-2">
                    <RefreshCw size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
                    Mis à jour le {formatDateFr(updatedAt)}
                  </span>
                )}
                {article.readingMinutes ? (
                  <span className="inline-flex items-center gap-2">
                    <Clock size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />
                    {article.readingMinutes} min de lecture
                  </span>
                ) : null}
              </div>
            </div>
          </header>

          {/* Image de couverture (si disponible) */}
          {article.image && (
            <div className="section-container pb-10 md:pb-14">
              <div className="relative mx-auto aspect-[16/9] w-full max-w-[52rem] overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] glow-surface">
                <Image
                  src={article.image.src}
                  alt={article.image.alt}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 832px) 100vw, 832px"
                />
              </div>
            </div>
          )}

          {/* Corps de l'article */}
          <div className="section-container pb-16 md:pb-20">
            <div className="article-prose mx-auto max-w-[45rem]">
              <Content />
            </div>
          </div>

          {/* CTA */}
          <section className="section-container pb-16 md:pb-24">
            <div className="mx-auto max-w-[45rem] rounded-2xl border border-[var(--border)] bg-[var(--section-alt)] p-8 text-center md:p-10">
              <h2 className="text-[1.5rem] font-light tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">
                Un projet de <span className="font-display font-semibold italic text-[var(--accent-soft)]">site web</span> ?
              </h2>
              <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                Développeur web freelance à Annecy — tarifs transparents,
                réponse sous 24 h. Discutons de votre projet.
              </p>
              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Link
                  href="/offres"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-7 py-3.5 text-[0.9375rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)] sm:w-auto"
                >
                  Découvrir mes offres
                  <ArrowRight size={16} strokeWidth={2} />
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border-hover)] px-7 py-3.5 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]/70 hover:bg-[var(--accent)]/10 sm:w-auto"
                >
                  Me contacter
                </Link>
              </div>
            </div>
          </section>

          {/* Article suivant */}
          {next && (
            <section className="section-container border-t border-[var(--border)] py-12 md:py-16">
              <div className="mx-auto max-w-[45rem]">
                <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Article suivant
                </p>
                <Link
                  href={`/blog/${next.slug}`}
                  className="group mt-3 flex items-center justify-between gap-4"
                >
                  <span className="text-[1.125rem] font-semibold tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-soft)] sm:text-[1.25rem]">
                    {next.title}
                  </span>
                  <ArrowRight size={18} strokeWidth={2} className="shrink-0 text-[var(--accent-soft)] transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </section>
          )}
        </article>
      </main>
      <Footer />
    </div>
  );
}
