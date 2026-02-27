"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[var(--border)] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent" aria-hidden />
      <div className="section-container py-10 md:py-16">
        <motion.div
          className="flex flex-col items-center gap-8 text-center md:flex-row md:items-start md:justify-between md:text-left"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-32px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-col items-center gap-3 md:items-start">
            <Logo variant="compact" />
            <p className="max-w-xs text-[0.8125rem] leading-relaxed text-[var(--muted)]">
              Création de sites web sur mesure. Design, performance et accompagnement.
            </p>
          </div>
          <nav
            className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8 text-[0.8125rem] font-medium text-[var(--muted)] md:items-start"
            aria-label="Navigation secondaire"
          >
            <Link
              href="/#services"
              className="relative inline-block hover:text-[var(--foreground)] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--foreground)] after:transition-all after:duration-200 hover:after:w-full"
            >
              Services
            </Link>
            <Link
              href="/projets"
              className="relative inline-block hover:text-[var(--foreground)] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--foreground)] after:transition-all after:duration-200 hover:after:w-full"
            >
              Projets
            </Link>
            <Link
              href="/#contact"
              className="relative inline-block hover:text-[var(--foreground)] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--foreground)] after:transition-all after:duration-200 hover:after:w-full"
            >
              Contact
            </Link>
            <a
              href="mailto:contact@akwebsolution.com"
              className="break-all relative inline-block hover:text-[var(--foreground)] after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[var(--foreground)] after:transition-all after:duration-200 hover:after:w-full"
            >
              contact@akwebsolution.com
            </a>
          </nav>
        </motion.div>
        <motion.p
          className="mt-10 border-t border-[var(--border)] pt-6 text-center text-[0.75rem] text-[var(--muted-foreground)] md:mt-12 md:pt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          © {year} AKWebSolution. Tous droits réservés.
        </motion.p>
      </div>
    </footer>
  );
}
