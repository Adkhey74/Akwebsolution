"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { getPublishedArticles } from "@/lib/blog";
import { useI18n } from "@/lib/i18n/context";

/**
 * Listing du blog. Extrait de app/blog/page.tsx, qui garde son `metadata`.
 *
 * Le corps des articles reste en français : ce sont de longs contenus
 * rédactionnels écrits en JSX, ils ne relèvent pas d'un fichier de traductions.
 */
export function BlogList() {
  const { t, locale, lp } = useI18n();
  const posts = getPublishedArticles();

  // La date suit la langue affichée (« 14 juillet 2026 » / « 14 July 2026 »).
  const formatDate = (date: string) =>
    new Intl.DateTimeFormat(locale === "en" ? "en-GB" : "fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${date}T00:00:00Z`));

  return (
    <>
      {/* En-tête */}
      <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
        <div className="max-w-3xl">
          <span className="eyebrow mb-5">{t("blog.eyebrow")}</span>
          <h1 className="text-[2.25rem] font-light leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-[3rem] md:text-[3.5rem]">
            {t("blog.title1")}{" "}
            <span className="font-display font-semibold italic text-[var(--accent-soft)]">
              {t("blog.titleAccent")}
            </span>{" "}
            {t("blog.title2")}
          </h1>
          <p className="mt-5 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
            {t("blog.intro")}
          </p>
        </div>
      </section>

      {/* Liste des articles */}
      <section className="section-container pb-20 md:pb-28">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--section-alt)] px-6 py-16 text-center">
            <h2 className="text-[1.25rem] font-semibold tracking-tight text-[var(--foreground)]">
              {t("blog.emptyTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-relaxed text-[var(--muted)]">
              {t("blog.emptyBody")}
            </p>
            <Link
              href={lp("/offres")}
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-[0.875rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
            >
              {t("blog.emptyCta")}
              <ArrowRight size={15} strokeWidth={2} />
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={lp(`/blog/${post.slug}`)}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all hover:border-[var(--border-hover)] hover:shadow-[0_16px_40px_-12px_var(--shadow-card)]"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--section-alt)]">
                  {post.image ? (
                    <Image
                      src={post.image.src}
                      alt={post.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(80% 80% at 30% 0%, var(--hero-halo), transparent 70%), var(--section-alt)",
                      }}
                      aria-hidden
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.75rem] font-medium text-[var(--muted)]">
                    <Calendar size={12} strokeWidth={2} className="text-[var(--accent-soft)]" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <h2 className="text-[1.125rem] font-semibold leading-snug tracking-tight text-[var(--foreground)] transition-colors group-hover:text-[var(--accent-soft)]">
                    {post.title}
                  </h2>
                  <p className="text-[0.875rem] leading-relaxed text-[var(--muted)] line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[0.8125rem] font-medium text-[var(--accent-soft)]">
                    {t("blog.read")}
                    <ArrowRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
