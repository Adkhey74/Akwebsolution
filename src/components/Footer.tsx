"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const navLinks = [
  { href: "/",          label: "Accueil"  },
  { href: "/#services", label: "Services" },
  { href: "/projets",   label: "Projets"  },
  { href: "/offres",    label: "Offres"   },
  { href: "/#contact",  label: "Contact"  },
];

const services = [
  "Sites vitrines",
  "Design responsive",
  "Performance & SEO",
  "Identité visuelle",
  "Maintenance",
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--foreground)] text-white">
      <div className="section-container pt-16 pb-10 md:pt-20 md:pb-12">

        {/* Grille principale */}
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
          {/* Col 1 — Marque */}
          <div className="lg:col-span-1">
            <Logo variant="compact" className="brightness-0 invert" />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-white/55">
              Création de sites web sur mesure, élégants et performants pour
              votre activité.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:contact@akwebsolutions.fr"
                className="flex items-center gap-2.5 text-[0.8125rem] text-white/60 transition-colors hover:text-white"
              >
                <Mail size={14} strokeWidth={1.75} className="shrink-0" />
                contact@akwebsolutions.fr
              </a>
              <a
                href="https://wa.me/33782923806"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[0.8125rem] text-white/60 transition-colors hover:text-white"
              >
                <MessageCircle size={14} strokeWidth={1.75} className="shrink-0" />
                07 82 92 38 06
              </a>
              <span className="flex items-center gap-2.5 text-[0.8125rem] text-white/40">
                <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
                France
              </span>
            </div>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/35">
              Navigation
            </p>
            <nav className="flex flex-col gap-3" aria-label="Navigation footer">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-[0.875rem] text-white/60 transition-colors hover:text-white"
                >
                  <span className="h-px w-0 bg-white transition-all duration-200 group-hover:w-3" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Col 3 — Services */}
          <div>
            <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/35">
              Prestations
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-[0.875rem] text-white/55"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — CTA */}
          <div className="flex flex-col gap-5">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/35">
              Démarrer
            </p>
            <p className="text-[0.875rem] leading-relaxed text-white/55">
              Un projet en tête ? Tarifs fixes, réponse sous 24 h.
            </p>
            <Link
              href="/#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[0.8125rem] font-medium text-white transition-all hover:bg-white hover:text-[var(--foreground)]"
            >
              Voir les offres
            </Link>
          </div>
        </motion.div>

        {/* Barre de bas */}
        <motion.div
          className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-[0.75rem] text-white/30">
            © {year} AKWebSolution. Tous droits réservés.
          </p>

          {/* Liens légaux */}
          <div className="flex items-center gap-4">
            <Link
              href="/mentions-legales"
              className="text-[0.7rem] text-white/30 transition-colors hover:text-white/60"
            >
              Mentions légales
            </Link>
            <span className="text-white/15">·</span>
            <Link
              href="/confidentialite"
              className="text-[0.7rem] text-white/30 transition-colors hover:text-white/60"
            >
              Confidentialité
            </Link>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/adil.khd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              <FaInstagram className="h-[15px] w-[15px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/adil-khadich/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              <FaLinkedinIn className="h-[14px] w-[14px]" />
            </a>
            <a
              href="mailto:contact@akwebsolutions.fr"
              aria-label="Email"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-200 hover:border-white/30 hover:text-white"
            >
              <Mail size={14} strokeWidth={1.75} />
            </a>
          </div>

          <p className="text-[0.75rem] text-white/25">
            Conçu & développé par AKWebSolution
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
