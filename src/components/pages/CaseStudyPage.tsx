import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { CaseStudyContent } from "@/components/CaseStudyContent";
import { Footer } from "@/components/Footer";
import { getProject, projects } from "@/lib/projects";
import { BASE_URL, buildAlternates, localeUrl } from "@/lib/i18n/config";
import { translate } from "@/lib/i18n/lookup";
import type { Locale } from "@/lib/i18n/translations";

/** Chemin racine d'une étude de cas, à préfixer par la langue. */
function caseStudyPath(slug: string): string {
  return `/projets/${slug}`;
}

/**
 * Métadonnées d'une étude de cas.
 *
 * En français, on garde `metaTitle` / `metaDescription` de `lib/projects.ts`
 * mot pour mot : ce sont les pages déjà indexées, les réécrire ferait perdre du
 * positionnement pour rien. En anglais, il n'existe pas d'équivalent rédigé, on
 * les dérive donc des traductions de l'étude de cas plutôt que de laisser
 * passer du français.
 */
export function caseStudyMetadata(slug: string, locale: Locale): Metadata {
  const p = getProject(slug);
  if (!p) return {};

  const path = caseStudyPath(p.slug);
  const alternates = buildAlternates(locale, path);

  const title =
    locale === "en" ? `${p.title} — ${translate(locale, `projects.${p.slug}.category`)}` : p.metaTitle;
  const description =
    locale === "en" ? translate(locale, `projects.${p.slug}.summary`) : p.metaDescription;

  return {
    title,
    description,
    alternates,
    openGraph: {
      url: alternates.canonical,
      title,
      description,
      images: [{ url: p.cover.src, alt: p.cover.alt }],
    },
  };
}

/** Corps d'une étude de cas, partagé par `/projets/[slug]` et `/en/projets/[slug]`. */
export function CaseStudyPage({ slug, locale }: { slug: string; locale: Locale }) {
  const project = getProject(slug);
  if (!project) notFound();

  const url = localeUrl(locale, caseStudyPath(project.slug));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.category,
    creator: { "@type": "Organization", name: "AKWebSolution", url: BASE_URL },
    url,
    image: `${BASE_URL}${project.cover.src}`,
    description:
      locale === "en" ? translate(locale, `projects.${project.slug}.summary`) : project.metaDescription,
    dateCreated: project.year,
    inLanguage: locale,
  };

  // Les libellés du fil d'Ariane partent chez Google tels quels : ils doivent
  // être dans la langue de la page, pas figés en français.
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: translate(locale, "header.home"),
        item: localeUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: translate(locale, "header.projects"),
        item: localeUrl(locale, "/projets"),
      },
      { "@type": "ListItem", position: 3, name: project.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Header />
      <CaseStudyContent slug={project.slug} />
      <Footer />
    </div>
  );
}

/** Liste des slugs à prérendre — identique dans les deux langues. */
export function caseStudyParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
