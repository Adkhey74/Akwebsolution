import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Mentions légales",
  description:
    "Mentions légales du site AKWebSolution — informations sur l'éditeur, l'hébergeur et les conditions d'utilisation.",
  alternates: { canonical: "https://akwebsolutions.fr/mentions-legales" },
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "1. Éditeur du site",
    content: [
      "**Dénomination :** Adil KHADICH (exploitant sous le nom commercial AKWebSolution)",
      "**Forme juridique :** Entrepreneur individuel (auto-entrepreneur)",
      "**Siège social :** 13 rue Henri Verjus, France",
      "**SIREN :** 999 248 057",
      "**SIRET (siège) :** 999 248 057 00013",
      "**N° TVA intracommunautaire :** FR20 999 248 057",
      "**Activité principale (APE) :** Programmation informatique — 62.01Z / 62.10Y",
      "**Date de création :** 31 décembre 2025",
      "**Immatriculation :** Inscrite à l'INSEE le 31/12/2025 — Immatriculée au RNE (INPI)",
      "**Directeur de la publication :** Adil KHADICH",
      "**E-mail :** contact@akwebsolutions.fr",
      "**Téléphone :** 07 82 92 38 06",
      "**Site web :** https://akwebsolutions.fr",
    ],
  },
  {
    title: "2. Hébergeur",
    content: [
      "**Nom :** Vercel Inc.",
      "**Adresse :** 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis",
      "**Site web :** https://vercel.com",
    ],
  },
  {
    title: "3. Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, code source) est la propriété exclusive d'AKWebSolution, sauf mention contraire.",
      "Toute reproduction, distribution, modification ou utilisation de tout ou partie de ce site, sans l'autorisation écrite préalable d'AKWebSolution, est strictement interdite et constituerait une contrefaçon sanctionnée par le Code de la propriété intellectuelle.",
    ],
  },
  {
    title: "4. Limitation de responsabilité",
    content: [
      "AKWebSolution s'efforce de fournir des informations exactes et à jour sur ce site. Toutefois, nous ne pouvons garantir l'exactitude, l'exhaustivité ou l'actualité des informations publiées.",
      "AKWebSolution ne pourra être tenu responsable des dommages directs ou indirects résultant de l'utilisation de ce site ou de l'impossibilité d'y accéder.",
      "Des liens vers des sites tiers peuvent être présents sur ce site. AKWebSolution n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.",
    ],
  },
  {
    title: "5. Données personnelles",
    content: [
      "Les données personnelles collectées via le formulaire de contact sont utilisées uniquement pour répondre à vos demandes. Elles ne sont jamais revendues ni transmises à des tiers.",
      "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous à : contact@akwebsolutions.fr",
      "Pour en savoir plus, consultez notre Politique de confidentialité.",
    ],
  },
  {
    title: "6. Cookies",
    content: [
      "Ce site n'utilise pas de cookies à des fins publicitaires ou de suivi tiers.",
      "Des cookies techniques essentiels peuvent être déposés pour assurer le bon fonctionnement du site (navigation, sécurité). Ils ne contiennent aucune donnée personnelle identifiable.",
    ],
  },
  {
    title: "7. Droit applicable",
    content: [
      "Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.",
      "Ce site est conforme à la loi n° 2004-575 du 21 juin 2004 pour la Confiance dans l'Économie Numérique (LCEN).",
    ],
  },
];

function renderLine(line: string) {
  const parts = line.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="font-medium text-[var(--foreground)]">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function MentionsLegalesPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main>
        <section className="pt-36 pb-24 md:pt-44 md:pb-32">
          <div className="mx-auto w-[min(100%-2rem,52rem)]">
            {/* Header */}
            <div className="mb-14">
              <Link
                href="/"
                className="mb-8 inline-flex items-center gap-1.5 text-[0.8rem] uppercase tracking-[0.1em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                ← Retour
              </Link>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Mentions légales
              </h1>
              <p className="mt-4 text-[0.9rem] text-[var(--muted)]">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <div key={s.title} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-7 md:p-8">
                  <h2 className="mb-5 text-[1rem] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-3">
                    {s.content.map((line, i) => (
                      <p key={i} className="text-[0.9rem] leading-relaxed text-[var(--muted)]">
                        {renderLine(line)}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-10 rounded-xl border border-[var(--border)] bg-[var(--card)] px-6 py-5 text-[0.8125rem] text-[var(--muted)]">
              Une question concernant ces mentions légales ?{" "}
              <a
                href="mailto:contact@akwebsolutions.fr"
                className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:no-underline"
              >
                Contactez-nous
              </a>
              .
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
