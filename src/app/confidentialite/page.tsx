import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité d'AKWebSolution — comment vos données personnelles sont collectées, utilisées et protégées, conformément au RGPD.",
  alternates: { canonical: "https://akwebsolutions.fr/confidentialite" },
  robots: { index: false, follow: false },
};

const sections = [
  {
    title: "1. Responsable du traitement",
    content: [
      "**Adil KHADICH**, entrepreneur individuel exploitant sous le nom commercial **AKWebSolution**, est responsable du traitement des données personnelles collectées sur ce site.",
      "**SIREN :** 999 248 057",
      "**Siège social :** 13 rue Henri Verjus, France",
      "**Contact :** contact@akwebsolutions.fr — 07 82 92 38 06",
    ],
  },
  {
    title: "2. Données collectées",
    content: [
      "Nous collectons uniquement les données que vous nous transmettez volontairement, notamment via le formulaire de contact :",
      "• Votre **nom** (ou prénom)",
      "• Votre **adresse e-mail**",
      "• Votre **numéro de téléphone** (optionnel)",
      "• Le **message** que vous nous envoyez",
      "Aucune donnée sensible (santé, origine, convictions…) n'est collectée.",
    ],
  },
  {
    title: "3. Finalités du traitement",
    content: [
      "Les données collectées sont utilisées exclusivement pour :",
      "• Répondre à vos demandes de contact ou de devis",
      "• Assurer le suivi de notre relation commerciale",
      "Elles ne sont jamais utilisées à des fins publicitaires, revendues, ni transmises à des tiers sans votre consentement explicite.",
    ],
  },
  {
    title: "4. Base légale",
    content: [
      "Le traitement de vos données repose sur votre **consentement** (art. 6.1.a du RGPD), que vous exprimez en remplissant et en soumettant le formulaire de contact.",
      "Vous pouvez retirer votre consentement à tout moment en nous contactant à l'adresse indiquée au point 1.",
    ],
  },
  {
    title: "5. Durée de conservation",
    content: [
      "Vos données sont conservées pendant **3 ans** à compter du dernier contact, conformément aux recommandations de la CNIL.",
      "À l'issue de cette période, elles sont supprimées de manière sécurisée.",
    ],
  },
  {
    title: "6. Cookies",
    content: [
      "Ce site n'utilise **pas** de cookies de traçage ou publicitaires.",
      "Des cookies techniques strictement nécessaires peuvent être utilisés pour assurer le bon fonctionnement du site (sécurité, performance). Ces cookies ne collectent aucune donnée personnelle identifiable et ne nécessitent pas votre consentement.",
    ],
  },
  {
    title: "7. Services tiers",
    content: [
      "Ce site est hébergé sur **Vercel** (Vercel Inc., États-Unis). Les données techniques de navigation (adresse IP, pages visitées) peuvent être traitées par Vercel dans le cadre de la fourniture de son service d'hébergement.",
      "Vercel est certifié conforme aux garanties de transfert de données vers les États-Unis. Consultez leur politique de confidentialité sur https://vercel.com/legal/privacy-policy",
    ],
  },
  {
    title: "8. Vos droits (RGPD)",
    content: [
      "Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679), vous disposez des droits suivants :",
      "• **Droit d'accès** : obtenir une copie des données vous concernant",
      "• **Droit de rectification** : corriger des données inexactes",
      "• **Droit à l'effacement** : demander la suppression de vos données",
      "• **Droit à la portabilité** : recevoir vos données dans un format structuré",
      "• **Droit d'opposition** : vous opposer au traitement de vos données",
      "Pour exercer ces droits, contactez-nous à **contact@akwebsolutions.fr**. Nous nous engageons à répondre dans un délai de 30 jours.",
      "Vous pouvez également déposer une réclamation auprès de la **CNIL** (Commission Nationale de l'Informatique et des Libertés) : www.cnil.fr",
    ],
  },
  {
    title: "9. Sécurité",
    content: [
      "Nous mettons en œuvre les mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation.",
      "Ce site utilise le protocole **HTTPS** pour chiffrer les échanges entre votre navigateur et notre serveur.",
    ],
  },
  {
    title: "10. Modifications",
    content: [
      "Cette politique de confidentialité peut être mise à jour à tout moment. La date de dernière modification est indiquée en haut de cette page.",
      "Nous vous encourageons à la consulter régulièrement pour rester informé(e) de nos pratiques.",
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

export default function ConfidentialitePage() {
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
                Politique de confidentialité
              </h1>
              <p className="mt-4 text-[0.9rem] text-[var(--muted)]">
                Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
              </p>
              <p className="mt-3 max-w-lg text-[0.9rem] leading-relaxed text-[var(--muted)]">
                AKWebSolution s'engage à protéger votre vie privée et à traiter vos
                données personnelles conformément au RGPD (Règlement Général sur la
                Protection des Données).
              </p>
            </div>

            {/* Sections */}
            <div className="flex flex-col gap-6">
              {sections.map((s) => (
                <div key={s.title} className="rounded-2xl border border-[var(--border)] bg-white p-7 md:p-8">
                  <h2 className="mb-5 text-[1rem] font-semibold uppercase tracking-[0.08em] text-[var(--foreground)]">
                    {s.title}
                  </h2>
                  <div className="flex flex-col gap-2.5">
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
              Des questions sur notre politique de confidentialité ?{" "}
              <a
                href="mailto:contact@akwebsolutions.fr"
                className="font-medium text-[var(--foreground)] underline underline-offset-2 hover:no-underline"
              >
                Écrivez-nous
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
