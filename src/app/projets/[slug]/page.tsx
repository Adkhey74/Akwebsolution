import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Check, Calendar, Tag, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
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
      { "@type": "ListItem", position: 2, name: "Projets", item: `${BASE_URL}/projets` },
      { "@type": "ListItem", position: 3, name: project.title, item: `${BASE_URL}/projets/${project.slug}` },
    ],
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <Header />
      <main id="main" className="min-w-0">

        {/* En-tête */}
        <section className="section-container pt-28 pb-10 sm:pt-36 md:pt-40">
          <Link
            href="/projets"
            className="group inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
          >
            <ArrowLeft size={15} strokeWidth={2} className="transition-transform group-hover:-translate-x-0.5" />
            Tous les projets
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="eyebrow mb-5">{project.category}</span>
            <h1 className="text-[2.25rem] font-light leading-[1.08] tracking-[-0.02em] text-[var(--foreground)] sm:text-[3rem] md:text-[3.5rem]">
              {project.title}
            </h1>
            <p className="mt-5 text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]">
              {project.summary}
            </p>

            {/* Méta */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-[0.8125rem] text-[var(--muted)]">
              <span className="inline-flex items-center gap-2"><Tag size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />{project.sector}</span>
              <span className="inline-flex items-center gap-2"><Calendar size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />{project.year}</span>
              {project.location && (
                <span className="inline-flex items-center gap-2"><MapPin size={14} strokeWidth={1.75} className="text-[var(--accent-soft)]" />{project.location}</span>
              )}
              {project.url && (
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--accent-soft)] underline underline-offset-4 hover:text-[var(--foreground)]">
                  <ExternalLink size={14} strokeWidth={1.75} />Voir le site en ligne
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Visuel principal — fenêtre navigateur */}
        <section className="section-container pb-16 md:pb-20">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] glow-surface">
            <div className="flex items-center gap-1.5 border-b border-[var(--border)] bg-[var(--card)] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              <span className="ml-3 hidden h-4 flex-1 rounded-full bg-white/[0.04] sm:block" />
            </div>
            <div className="relative aspect-[16/10] w-full">
              <Image src={project.cover.src} alt={project.cover.alt} fill priority className="object-cover object-top" sizes="(max-width: 1024px) 100vw, 1024px" />
            </div>
          </div>
        </section>

        {/* Défi + Solution */}
        <section className="section-container pb-16 md:pb-20">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">Le défi</h2>
              <p className="mt-4 text-[0.9375rem] leading-[1.8] text-[var(--muted)]">{project.challenge}</p>

              {/* Techs */}
              <div className="mt-8">
                <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Technologies</p>
                <div className="flex flex-wrap gap-2">
                  {project.techs.map((t) => (
                    <span key={t} className="rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-[0.75rem] font-medium text-[var(--accent-soft)]">{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">La solution</h2>
              <ul className="mt-4 flex flex-col gap-3.5">
                {project.solution.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--muted)]">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10">
                      <Check size={11} strokeWidth={2.5} className="text-[var(--accent-soft)]" />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Galerie */}
        <section className="section-container pb-16 md:pb-20">
          <h2 className="mb-8 text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">Aperçu du projet</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            {project.images.map((img) => (
              <div key={img.src} className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface)]">
                <Image src={img.src} alt={img.alt} fill className="object-cover object-top" sizes="(max-width: 640px) 100vw, 50vw" />
              </div>
            ))}
          </div>
        </section>

        {/* Résultats */}
        <section className="section-container pb-16 md:pb-24">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--section-alt)] p-8 md:p-12">
            <h2 className="text-[1.5rem] font-semibold tracking-tight text-[var(--foreground)] sm:text-[1.875rem]">Le résultat</h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-3">
              {project.results.map((r) => (
                <li key={r} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-[var(--foreground)]">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]">
                    <Check size={11} strokeWidth={2.5} className="text-white" />
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA + projet suivant */}
        <section className="section-container border-t border-[var(--border)] py-16 md:py-24">
          <div className="flex flex-col items-center gap-8 text-center">
            <div>
              <h2 className="text-[1.875rem] font-light tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
                Un projet <span className="font-display font-semibold italic text-[var(--accent-soft)]">similaire</span> ?
              </h2>
              <p className="mt-3 text-[0.9375rem] text-[var(--muted)]">Discutons-en — tarifs transparents, réponse sous 24 h.</p>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-[0.9375rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
            >
              Démarrer mon projet
              <ArrowRight size={16} strokeWidth={2} />
            </Link>

            <Link href={`/projets/${next.slug}`} className="group mt-2 inline-flex items-center gap-2 text-[0.8125rem] font-medium text-[var(--muted)] transition-colors hover:text-[var(--foreground)]">
              Projet suivant : {next.title}
              <ArrowRight size={14} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
