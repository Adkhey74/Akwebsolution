"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";

const navLinks = [
  { href: "/",         label: "Accueil"  },
  { href: "/projets",  label: "Projets"  },
  { href: "/offres",   label: "Offres"   },
  { href: "/#contact", label: "Contact"  },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showSolidNav = !isHome || scrolledPastHero;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
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
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-colors duration-200 ${
        showSolidNav ? "border-b border-[var(--border)] bg-white" : "bg-transparent"
      }`}
    >
      <div className="flex h-[4.5rem] w-full items-center justify-between gap-4 px-6 sm:px-8 md:h-20 md:px-10 lg:px-14 xl:px-20">
        {/* Left : burger (mobile) | nav (desktop) */}
        <div className="flex min-h-10 flex-1 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className={`flex items-center justify-center p-2 transition-colors md:hidden ${
              showSolidNav ? "text-[var(--foreground)] hover:text-[var(--accent)]" : "text-white hover:text-white/80"
            }`}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
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

          <nav className="hidden md:flex md:items-center md:gap-1 lg:gap-2" aria-label="Navigation principale">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`group relative px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                  showSolidNav ? "text-[var(--foreground)]" : "text-white"
                }`}
              >
                {label}
                <span className={`absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                  showSolidNav ? "bg-[var(--foreground)]" : "bg-white"
                }`} />
              </Link>
            ))}
          </nav>
        </div>

        {/* Center : logo */}
        <div className={`flex h-[4.5rem] shrink-0 items-center justify-center md:h-20 ${!showSolidNav ? "[&_img]:brightness-0 [&_img]:invert" : ""}`}>
          <Logo variant="compact" className="block h-full w-auto" />
        </div>

        {/* Right : bouton contact */}
        <div className="flex min-h-10 flex-1 shrink-0 items-center justify-end">
          <Link
            href="/#contact"
            className={`rounded-full px-2 py-2 text-[0.7rem] font-medium uppercase tracking-[0.12em] transition-all duration-200 md:px-5 ${
              showSolidNav
                ? "bg-[var(--foreground)] text-white hover:opacity-80"
                : "border border-white bg-transparent text-white hover:bg-white hover:text-[var(--foreground)]"
            }`}
          >
            <span className="md:hidden">Contact</span>
            <span className="hidden md:inline">Nous contacter</span>
          </Link>
        </div>
      </div>

      {/* ── Menu plein écran mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="fullscreen-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 flex flex-col bg-white md:hidden"
          >
            {/* Header du menu */}
            <div className="relative flex h-[4.5rem] shrink-0 items-center justify-center px-5">
              <Logo variant="compact" className="h-[4.5rem] w-auto" />
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--card)] text-[var(--foreground)] transition-colors hover:bg-[var(--border)]"
                aria-label="Fermer le menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Liens de navigation */}
            <nav className="flex flex-1 flex-col justify-center gap-1 px-6" aria-label="Navigation mobile">
              {navLinks.map(({ href, label }, i) => (
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
                    {label}
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
                className="block rounded-full bg-[var(--foreground)] px-6 py-4 text-center text-[1rem] font-medium text-white transition-opacity hover:opacity-80"
              >
                Voir les offres
              </Link>
              <p className="mt-4 text-center text-[0.75rem] text-[var(--muted)]">
                Prix fixes · Sans engagement
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
