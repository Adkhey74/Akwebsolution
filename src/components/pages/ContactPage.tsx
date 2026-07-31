"use client";

import { Mail, MessageCircle, Phone, Clock, MapPin } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Contact } from "@/components/Contact";
import { useI18n } from "@/lib/i18n/context";

const EMAIL = "contact@akwebsolutions.fr";
const PHONE_DISPLAY = "+33 7 82 92 38 06";
const PHONE_TEL = "+33782923806";
const WHATSAPP = "https://wa.me/33782923806";

/**
 * Page /contact dédiée.
 *
 * Le site n'avait qu'une ancre `/#contact` : impossible de se positionner sur
 * une requête « contact » ou de donner un lien de contact partageable, et rien
 * n'affichait les coordonnées en clair — un visiteur qui préfère téléphoner
 * n'avait qu'un formulaire.
 *
 * Le formulaire lui-même reste le composant `Contact` de l'accueil, avec son
 * titre promu en h1 : dupliquer le formulaire aurait voulu dire maintenir deux
 * fois la validation et l'envoi.
 */
export function ContactPage() {
  const { t } = useI18n();

  const rows = [
    { icon: Mail, label: t("contactPage.emailLabel"), value: EMAIL, href: `mailto:${EMAIL}` },
    {
      icon: Phone,
      label: t("contactPage.phoneLabel"),
      value: PHONE_DISPLAY,
      href: `tel:${PHONE_TEL}`,
    },
    {
      icon: MessageCircle,
      label: t("contactPage.whatsappLabel"),
      value: t("contactPage.whatsappValue"),
      href: WHATSAPP,
      external: true,
    },
    { icon: Clock, label: t("contactPage.responseLabel"), value: t("contactPage.responseValue") },
    /* `wide` : la grille a 2 colonnes et 5 entrées. Sans la dernière étendue sur
       toute la largeur, la rangée finale laissait une cellule vide — visible
       comme un aplat de la couleur des filets, puisque le fond de la grille EST
       cette couleur (technique du `gap-px`). */
    {
      icon: MapPin,
      label: t("contactPage.areaLabel"),
      value: t("contactPage.areaValue"),
      wide: true,
    },
  ];

  return (
    <div className="min-h-screen min-w-0 overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main id="main" className="min-w-0">
        {/* Le dégagement sous la navbar est porté par la section elle-même
            (`standalone`) : sur un conteneur extérieur, il laissait apparaître
            une bande du fond de page entre la navbar et la section. */}
        <Contact as="h1" standalone />

        {/* Coordonnées en clair */}
        <section className="section-padding border-t border-[var(--border)]">
          <div className="section-container">
            <div className="mx-auto w-full max-w-2xl">
              <h2 className="text-[1.25rem] font-light tracking-tight text-[var(--foreground)] sm:text-[1.5rem]">
                {t("contactPage.directTitle")}
              </h2>

              <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-2">
                {rows.map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-start gap-3 bg-[var(--surface)] p-5 ${
                      row.wide ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--card)]">
                      <row.icon size={15} strokeWidth={1.75} className="text-[var(--accent)]" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">
                        {row.label}
                      </dt>
                      <dd className="mt-1 text-[0.9375rem] leading-snug text-[var(--foreground)]">
                        {row.href ? (
                          <a
                            href={row.href}
                            {...(row.external
                              ? { target: "_blank", rel: "noopener noreferrer" }
                              : {})}
                            className="break-words underline decoration-[var(--border-hover)] underline-offset-2 transition-colors hover:text-[var(--accent)]"
                          >
                            {row.value}
                          </a>
                        ) : (
                          row.value
                        )}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
