"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Home, FolderOpen, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Logo } from "./Logo";
import type { LucideIcon } from "lucide-react";

const navLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/",         label: "Accueil",  icon: Home       },
  { href: "/projets",  label: "Projets",  icon: FolderOpen },
  { href: "/offres",   label: "Offres",   icon: Sparkles   },
  { href: "/#contact", label: "Contact",  icon: Mail       },
];


export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);


  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed left-0 right-0 top-0 z-50 border-b border-[var(--border)] bg-white"
    >
      <div className="flex h-[4.5rem] w-full items-center justify-between gap-4 px-4 sm:px-6 md:h-20 md:px-8 lg:px-10 xl:px-12">
        {/* Left : burger (mobile) | nav (desktop) */}
        <div className="flex min-h-10 flex-1 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center p-2 text-[var(--foreground)] transition-colors hover:text-[var(--accent)] md:hidden"
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
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)] hover:text-[var(--accent)]"
              >
                <Icon size={15} strokeWidth={1.75} className="shrink-0 opacity-70" />
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center : logo */}
        <div className="flex h-[4.5rem] shrink-0 items-center justify-center md:h-20">
          <Logo variant="compact" className="block h-full w-auto" />
        </div>

        {/* Right : bouton devis */}
        <div className="flex min-h-10 flex-1 shrink-0 items-center justify-end">
          <Link
            href="/#contact"
            className="rounded-full bg-[var(--foreground)] px-4 py-2 text-[0.8125rem] font-medium text-white transition-all duration-200 hover:opacity-80 md:px-5 md:text-[0.875rem]"
          >
            <span className="md:hidden">Contact</span>
            <span className="hidden md:inline">Nous contacter</span>
          </Link>
        </div>
      </div>

      {/* ── Drawer (tous écrans) ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/50 md:hidden"
              onClick={closeMenu}
              aria-hidden
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed bottom-0 left-0 top-0 z-50 flex w-[78vw] max-w-[300px] flex-col bg-white shadow-2xl md:hidden"
            >
              {/* Drawer header */}
              <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-[var(--border)] px-5">
                <Logo variant="compact" className="h-[4.5rem] w-auto" />
                <button
                  type="button"
                  onClick={closeMenu}
                  className="flex items-center justify-center rounded-full p-2 text-[var(--muted)] transition-colors hover:bg-[var(--card)] hover:text-[var(--foreground)]"
                  aria-label="Fermer le menu"
                >
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-5" aria-label="Navigation mobile">
                {navLinks.map(({ href, label, icon: Icon }, i) => (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.22 }}
                  >
                    <Link
                      href={href}
                      onClick={closeMenu}
                      className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)] hover:text-[var(--accent)]"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--card)]">
                        <Icon size={16} strokeWidth={1.75} />
                      </span>
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* CTA footer */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.22 }}
                className="shrink-0 border-t border-[var(--border)] px-5 py-6"
              >
                <Link
                  href="/#contact"
                  onClick={closeMenu}
                  className="block rounded-full bg-[var(--accent)] px-6 py-3.5 text-center text-[0.9375rem] font-medium text-white transition-colors hover:bg-[var(--foreground)]"
                >
                  Voir les offres
                </Link>
                <p className="mt-3 text-center text-[0.75rem] text-[var(--muted)]">
                  Prix fixes · Sans engagement
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
