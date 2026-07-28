"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/lib/i18n/context";

const navLinks = [
  { href: "/",         key: "header.home"     },
  { href: "/projets",  key: "header.projects" },
  { href: "/offres",   key: "header.offers"   },
  { href: "/blog",     key: "header.blog"     },
  { href: "/a-propos", key: "header.about"    },
];

export function Header() {
  const { t } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showSolidNav = !isHome || scrolledPastHero || menuOpen;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (menuOpen) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") setMenuOpen(false);
      };
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!isHome) {
      setScrolledPastHero(true);
      return;
    }
    const onScroll = () => {
      if (typeof window === "undefined") return;
      const isMobile = window.innerWidth < 768;
      const threshold = isMobile ? window.innerHeight * 0.15 : window.innerHeight * 0.15;
      setScrolledPastHero(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <>
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
        showSolidNav ? "border-b border-[var(--border)] bg-[var(--background)]/95 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="grid h-[5.25rem] w-full min-w-0 grid-cols-[1fr_auto_1fr] items-center gap-2 px-4 sm:gap-4 sm:px-6 md:h-24 md:px-10 lg:px-14 xl:px-20">
        {/* Left : burger + bascule (mobile) | nav (desktop)
            Pas de `min-w-0` ici : il autorisait la colonne à passer sous la
            largeur de son contenu, ce qui découpait le bouton. */}
        <div className="flex min-h-10 items-center justify-start gap-1">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex items-center justify-center p-2 transition-colors lg:hidden ${
              showSolidNav ? "text-[var(--foreground)] hover:text-[var(--accent)]" : "text-[var(--foreground)] hover:text-[var(--muted)]"
            }`}
            aria-label={menuOpen ? t("header.closeMenu") : t("header.openMenu")}
            aria-expanded={menuOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <X size={22} strokeWidth={1.5} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu size={22} strokeWidth={1.5} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Un SEUL contrôle ici sur mobile. Les deux colonnes latérales de la
              grille sont contraintes à la même largeur : à trois (burger +
              thème + langue) la colonne réclamait ~141 px contre 82 dispo, et
              le bouton Contact se faisait de nouveau rogner.
              La langue est prioritaire sur le thème — un visiteur anglophone en
              a besoin tout de suite. La bascule de thème reste accessible dans
              le menu, avec la version complète du sélecteur de langue. */}
          <LanguageSwitcher className="lg:hidden" compact align="left" />

          <nav className="hidden lg:flex lg:items-center lg:gap-2" aria-label={t("header.mainNav")}>
            {navLinks.map(({ href, key }) => (
              <Link
                key={href}
                href={href}
                className={`group relative px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                  showSolidNav ? "text-[var(--foreground)]" : "text-[var(--foreground)]"
                }`}
              >
                {t(key)}
                <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Center : logo — centré mobile et desktop grâce à la grille 1fr auto 1fr */}
        {/* logo3.png = texte noir sur transparent. `brightness-0` l'aplatit en
            noir pour le thème clair ; `invert` le repasse en blanc en sombre. */}
        <div className="flex h-[5.25rem] min-w-0 max-w-[104px] items-center justify-center sm:max-w-[150px] md:h-24 md:max-w-[200px] [&_img]:brightness-0 dark:[&_img]:invert">
          <Logo variant="compact" className="block h-full w-auto max-w-full object-contain" />
        </div>

        {/* Right : bascule (desktop uniquement) + bouton contact */}
        <div className="flex min-h-10 items-center justify-end gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden lg:block" />
          <ThemeToggle className="hidden lg:flex" />
          <Link
            href="/#contact"
            className="group relative inline-flex shrink-0 items-center overflow-hidden whitespace-nowrap rounded-full border border-[var(--accent)]/50 bg-[var(--accent)]/10 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-[var(--accent-soft)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-white hover:shadow-[0_8px_28px_-8px_var(--accent)] sm:px-4 sm:text-[0.75rem] sm:tracking-[0.12em]"
          >
            {/* remplissage violet depuis la gauche */}
            <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-300 ease-out group-hover:scale-x-100" />
            {/* reflet qui balaye */}
            <span aria-hidden className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
            <span className="relative z-10 lg:hidden">{t("header.contact")}</span>
            <span className="relative z-10 hidden lg:inline">{t("header.contactLong")}</span>
          </Link>
        </div>
      </div>

    </motion.header>

      {/* ── Menu plein écran mobile — hors du header pour éviter le stacking context ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="fullscreen-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            role="dialog"
            aria-modal="true"
            aria-label={t("header.menuLabel")}
            className="fixed inset-0 z-9999 flex flex-col bg-[var(--background)] lg:hidden"
          >
            {/* Header du menu */}
            <div className="relative flex h-[5.25rem] shrink-0 items-center justify-center px-5">
              <Logo variant="compact" className="h-[5.25rem] w-auto brightness-0 dark:invert" />
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] text-[var(--foreground)] transition-colors hover:bg-[var(--border)]"
                aria-label={t("header.closeMenu")}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Liens de navigation */}
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label={t("header.mobileNav")}>
              {navLinks.map(({ href, key }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.22 }}
                >
                  <Link
                    href={href}
                    onClick={closeMenu}
                    className="block border-b border-[var(--border)] py-5 text-[1.75rem] font-light tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--muted)]"
                  >
                    {t(key)}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.22 }}
              className="shrink-0 px-6 py-8"
            >
              <Link
                href="/offres"
                onClick={closeMenu}
                className="block rounded-full bg-[var(--accent)] px-6 py-4 text-center text-[1rem] font-medium text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                {t("header.seeOffers")}
              </Link>
              <p className="mt-4 text-center text-[0.75rem] text-[var(--muted)]">
                {t("header.menuFooter")}
              </p>
              {/* Thème et langue : le header mobile n'a la place que pour un
                  seul contrôle, les deux sont donc rassemblés ici. */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[var(--border)] pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-[0.8125rem] text-[var(--muted)]">{t("header.appearance")}</span>
                  <ThemeToggle />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[0.8125rem] text-[var(--muted)]">{t("header.language")}</span>
                  <LanguageSwitcher drop="up" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
