"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import "flag-icons/css/flag-icons.min.css";
import { useI18n } from "@/lib/i18n/context";
import { switchLocale } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/translations";

const languages: { code: Locale; label: string; codeLabel: string; flagCode: string }[] = [
  { code: "fr", label: "Français", codeLabel: "FR", flagCode: "fr" },
  { code: "en", label: "English", codeLabel: "EN", flagCode: "gb" },
];

export function LanguageSwitcher({
  className = "",
  /** Drapeau seul, sans code ni chevron — pour le header mobile, où la place
      est comptée (cf. le commentaire sur la grille dans Header.tsx). */
  compact = false,
  /** Bord sur lequel le menu s'aligne. `right` déborde hors écran quand le
      bouton est collé au bord gauche du viewport (cas du header mobile). */
  align = "right",
  /** Sens d'ouverture. `up` est nécessaire quand le bouton est en bas de
      l'écran (pied du menu plein écran), sinon le menu sort du viewport. */
  drop = "down",
}: {
  className?: string;
  compact?: boolean;
  align?: "left" | "right";
  drop?: "up" | "down";
}) {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === locale) ?? languages[0];

  // Fermeture au clic extérieur et à Échap
  useEffect(() => {
    if (!isOpen) return;
    const onPointerDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className={`relative ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t("header.language")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`inline-flex h-10 items-center justify-center gap-1.5 rounded-full border border-[var(--border-hover)] text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] ${
          compact ? "w-10" : "px-2.5 sm:px-3"
        }`}
      >
        {/* text-base fixe la taille du drapeau : flag-icons dimensionne `.fi`
            en em, donc sans ça il hérite d'une taille de police imprévisible. */}
        <span className={`fi fi-${current.flagCode} shrink-0 rounded-[2px] text-base`} aria-hidden />
        {!compact && (
          <>
            <span className="hidden text-[0.72rem] font-semibold tracking-wide sm:inline">
              {current.codeLabel}
            </span>
            <ChevronDown
              size={13}
              strokeWidth={2.25}
              className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </>
        )}
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label={t("header.language")}
          className={`absolute z-50 w-44 overflow-hidden rounded-xl border border-[var(--border-hover)] bg-[var(--surface)] p-1.5 shadow-[0_16px_40px_-12px_var(--shadow-card)] ${
            align === "left" ? "left-0" : "right-0"
          } ${drop === "up" ? "bottom-full mb-2" : "top-full mt-2"}`}
        >
          {/*
            Des liens, et non des boutons : changer de langue est devenu une
            NAVIGATION. La langue vit dans l'URL (`/` ou `/en/…`), plus dans un
            état React mémorisé en localStorage — c'est ce qui rend la version
            anglaise indexable, et ce qui permet d'en partager un lien.

            `hreflang` indique la langue de la page CIBLE, pas celle du libellé :
            c'est l'usage attendu sur un lien inter-langues.
          */}
          {languages.map((lang) => {
            const active = lang.code === locale;
            return (
              <Link
                key={lang.code}
                href={switchLocale(pathname, lang.code)}
                hrefLang={lang.code}
                lang={lang.code}
                role="option"
                aria-selected={active}
                onClick={() => setIsOpen(false)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                  active
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--foreground)] hover:bg-[var(--card-hover)]"
                }`}
              >
                <span className={`fi fi-${lang.flagCode} rounded-[2px]`} aria-hidden />
                <span className="text-[0.875rem] font-medium">{lang.label}</span>
                {active && <Check size={14} strokeWidth={2.5} className="ml-auto" aria-hidden />}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
