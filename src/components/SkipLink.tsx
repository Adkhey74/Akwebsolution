"use client";

import { useI18n } from "@/lib/i18n/context";

/**
 * Lien d'évitement (premier élément focusable de la page).
 * Composant à part car le layout est un Server Component : il ne peut pas
 * appeler useI18n() lui-même.
 */
export function SkipLink() {
  const { t } = useI18n();
  return (
    <a href="#main" className="skip-link">
      {t("common.skipLink")}
    </a>
  );
}
