import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BASE_URL } from "@/lib/i18n/config";
import type { Landing } from "@/lib/landings";

/**
 * Rendu des pages d'intention locale.
 *
 * Composant SERVEUR : ces pages n'ont aucune interactivité, donc aucune raison
 * d'envoyer du JavaScript au navigateur pour les afficher. Elles n'existent
 * qu'en français (cf. lib/landings.ts), les libellés sont donc écrits en clair
 * plutôt que passés par les traductions.
 *
 * Le `FAQPage` en données structurées est le vrai intérêt du bloc questions :
 * c'est ce qui permet à Google d'afficher les réponses directement dans ses
 * résultats.
 */
export function LandingPage({ landing }: { landing: Landing }) {
  const url = `${BASE_URL}${landing.path}`;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: landing.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Accueil", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: landing.eyebrow, item: url },
    ],
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <Header />

      <main id="main" className="min-w-0">
        {/* ── En-tête ── */}
        <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
          <div className="mx-auto w-full max-w-[52rem] text-center">
            <span className="eyebrow mb-5">{landing.eyebrow}</span>
            <h1 className="text-balance text-[2rem] font-light leading-[1.12] tracking-tight text-[var(--foreground)] sm:text-[2.75rem] md:text-[3.25rem]">
              {landing.h1}{" "}
              <span className="font-display font-semibold italic text-[var(--accent-soft)]">
                {landing.h1Accent}
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-[38rem] text-[1rem] leading-[1.75] text-[var(--muted)]">
              {landing.intro}
            </p>
          </div>
        </section>

        {/* ── Sections ── */}
        <section className="section-container pb-8">
          <div className="mx-auto flex w-full max-w-[52rem] flex-col gap-12 sm:gap-14">
            {landing.sections.map((section) => (
              <article key={section.title} className="min-w-0">
                <h2 className="text-[1.375rem] font-medium leading-snug tracking-tight text-[var(--foreground)] sm:text-[1.625rem]">
                  {section.title}
                </h2>

                {section.body && (
                  <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[var(--muted)] md:text-[1rem]">
                    {section.body}
                  </p>
                )}

                {section.bullets && (
                  <ul className="mt-5 flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3">
                        <span className="mt-[0.35rem] flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/12">
                          <Check size={11} strokeWidth={2.75} className="text-[var(--accent)]" />
                        </span>
                        <span className="text-[0.9375rem] leading-[1.7] text-[var(--muted)]">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* ── Questions fréquentes ── */}
        <section className="section-padding">
          <div className="section-container">
            <div className="mx-auto w-full max-w-[52rem]">
              <h2 className="text-[1.375rem] font-medium leading-snug tracking-tight text-[var(--foreground)] sm:text-[1.625rem]">
                Questions fréquentes
              </h2>

              {/* gap-px + fond --border : les filets sont les gouttières de la
                  grille, donc aucune bordure ne se double. Même mécanique que
                  les options de la page /offres. */}
              <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)]">
                {landing.faq.map((item) => (
                  <div key={item.q} className="bg-[var(--surface)] p-6">
                    <dt className="text-[0.9375rem] font-semibold leading-snug text-[var(--foreground)]">
                      {item.q}
                    </dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
                      {item.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ── Appel à l'action ── */}
        <section className="section-padding border-t border-[var(--border)] bg-[var(--section-alt)]">
          <div className="section-container">
            <div className="mx-auto w-full max-w-[40rem] text-center">
              <h2 className="text-[1.75rem] font-light leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
                {landing.ctaTitle}
              </h2>
              <p className="mx-auto mt-4 max-w-[34rem] text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
                {landing.ctaBody}
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <Link
                  href="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-3.5 text-[0.9375rem] font-semibold text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-transform duration-300 hover:-translate-y-0.5 sm:w-auto"
                >
                  Parler de mon projet
                  <ArrowRight size={16} strokeWidth={2.25} />
                </Link>
                <Link
                  href="/offres"
                  className="inline-flex w-full items-center justify-center rounded-full border border-[var(--border-hover)] px-8 py-3.5 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors duration-300 hover:border-[var(--accent)]/70 hover:text-[var(--accent)] sm:w-auto"
                >
                  Voir les tarifs
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
