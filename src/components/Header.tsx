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

const SCROLL_THRESHOLD_PX = 60;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const pathname = usePathname();
  const showSolidNav = hasScrolled;

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      if (typeof window === "undefined") return;
      setHasScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed left-0 right-0 top-0 z-50 transition-[background-color,border-color] duration-200 ${
        showSolidNav
          ? "border-b border-white/10 bg-black/50 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-[5.25rem] min-h-0 w-full min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 sm:px-8 md:h-24 md:px-10 lg:px-14 xl:px-20">
        {/* Left : burger (mobile) | nav (desktop) */}
        <div className="flex min-h-10 min-w-0 flex-1 shrink-0 items-center justify-start">
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center justify-center p-2 text-white transition-colors hover:text-white/80 md:hidden"
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
                className="group relative px-3 py-2 text-[0.8rem] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:text-white/90"
              >
                {label}
                <span className="absolute bottom-0 left-3 right-3 h-px origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Center : logo */}
        <div className="flex h-[5.25rem] min-w-0 max-w-[175px] shrink items-center justify-center overflow-hidden sm:max-w-[200px] md:h-24 md:max-w-none md:shrink-0 [&_img]:brightness-0 [&_img]:invert">
          <Logo variant="compact" className="block h-full w-auto object-contain" />
        </div>

        {/* Right : bouton contact */}
        <div className="flex min-h-10 min-w-0 flex-1 shrink-0 items-center justify-end">
          <Link
            href="/#contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-white px-2.5 py-2 text-[0.65rem] font-semibold uppercase leading-none tracking-[0.1em] text-black transition-all duration-200 hover:bg-white/90 sm:px-3 sm:text-[0.7rem] sm:tracking-[0.12em] md:px-5 md:py-2.5"
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
            className="fixed inset-0 z-40 flex flex-col bg-black/95 backdrop-blur-xl md:hidden"
          >
            {/* Header du menu : barre haute + bouton fermer */}
            <div className="relative flex h-[5.25rem] shrink-0 items-center justify-center border-b border-white/10 px-5">
              <Logo variant="compact" className="h-[5.25rem] w-auto [&_img]:brightness-0 [&_img]:invert" />
              <button
                type="button"
                onClick={closeMenu}
                className="absolute right-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
                aria-label="Fermer le menu"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Liens de navigation */}
            <nav className="flex flex-1 flex-col justify-center gap-0 px-6" aria-label="Navigation mobile">
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
                    className="block border-b border-white/10 py-5 text-[1.75rem] font-light tracking-tight text-white transition-colors hover:text-white/80"
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer du menu */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.22 }}
              className="shrink-0 border-t border-white/10 px-6 py-8"
            >
              <Link
                href="/offres"
                onClick={closeMenu}
                className="block rounded-full bg-white px-6 py-4 text-center text-[1rem] font-medium text-black transition-opacity hover:bg-white/90"
              >
                Voir les offres
              </Link>
              <p className="mt-4 text-center text-[0.75rem] text-white/60">
                Prix fixes · Sans engagement
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
