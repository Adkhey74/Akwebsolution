"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { Logo } from "./Logo";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Marquee } from "@/components/ui/marquee";
import { useI18n } from "@/lib/i18n/context";
import { landings } from "@/lib/landings";

// Chemins sous leur forme RACINE (française). Le tableau est au niveau module,
// donc hors de portée de `lp` — qui dépend du contexte : le préfixe de langue est
// posé au moment du rendu, sur chaque `href`.
const navLinks = [
  { href: "/",          key: "header.home"     },
  { href: "/#services", key: "footer.servicesTitle" },
  { href: "/projets",   key: "header.projects" },
  { href: "/offres",    key: "header.offers"   },
  { href: "/blog",      key: "header.blog"     },
  { href: "/a-propos",  key: "header.about"    },
  // Page dédiée plutôt que l'ancre de l'accueil, désormais qu'elle existe.
  { href: "/contact",   key: "header.contact"  },
];

export function Footer() {
  const { t, tList, lp, locale } = useI18n();
  const year = new Date().getFullYear();
  const keywords = tList("footer.keywords");
  const services = tList("footer.services");

  return (
    <footer className="min-w-0 border-t border-[var(--border)] bg-[var(--footer)] text-[var(--foreground)] overflow-x-hidden">
      {/* Bande de mots-clés défilante */}
      <div className="relative border-b border-[var(--border-hover)] py-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[var(--footer)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[var(--footer)] to-transparent" />
        <Marquee pauseOnHover className="[--duration:38s]">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="mx-2 flex items-center gap-4 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-[var(--muted)]"
            >
              {kw}
              <span className="h-1 w-1 rounded-full bg-[var(--accent)]/40" />
            </span>
          ))}
        </Marquee>
      </div>

      <div className="section-container pt-12 pb-8 sm:pt-16 sm:pb-10 md:pt-20 md:pb-12">

        {/* Grille principale */}
        <motion.div
          className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          {/* Col 1 — Marque */}
          <motion.div
            className="lg:col-span-1"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <Logo variant="compact" className="brightness-0 dark:invert" />
            <p className="mt-4 text-[0.875rem] leading-relaxed text-[var(--muted)]">
{t("footer.tagline")}
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href="mailto:contact@akwebsolutions.fr"
                className="flex items-center gap-2.5 text-[0.8125rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <Mail size={14} strokeWidth={1.75} className="shrink-0" />
                contact@akwebsolutions.fr
              </a>
              <a
                href="https://wa.me/33782923806"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-[0.8125rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
              >
                <MessageCircle size={14} strokeWidth={1.75} className="shrink-0" />
                07 82 92 38 06
              </a>
              <span className="flex items-center gap-2.5 text-[0.8125rem] text-[var(--muted)]">
                <MapPin size={14} strokeWidth={1.75} className="shrink-0" />
                {t("footer.location")}
              </span>
            </div>
          </motion.div>

          {/* Col 2 — Navigation */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
              {t("footer.navTitle")}
            </p>
            <nav className="flex flex-col gap-3" aria-label={t("footer.footerNav")}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={lp(link.href)}
                  className="group flex items-center gap-2 text-[0.875rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  <span className="h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-3" />
                  {t(link.key)}
                </Link>
              ))}

              {/*
                Pages d'intention locale — affichées en français seulement.
                D'une part elles n'existent qu'en français ; d'autre part c'est
                leur seul lien depuis le reste du site, et une page vers laquelle
                rien ne pointe ne se référence pas.
              */}
              {locale === "fr" &&
                landings.map((landing) => (
                  <Link
                    key={landing.path}
                    href={landing.path}
                    className="group flex items-center gap-2 text-[0.875rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                  >
                    <span className="h-px w-0 bg-[var(--accent)] transition-all duration-200 group-hover:w-3" />
                    {landing.navLabel}
                  </Link>
                ))}
            </nav>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <p className="mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
              {t("footer.servicesTitle")}
            </p>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li
                  key={s}
                  className="text-[0.875rem] text-[var(--muted)]"
                >
                  {s}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — CTA */}
          <motion.div
            className="flex flex-col gap-5"
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-[var(--foreground)]">
              {t("footer.startTitle")}
            </p>
            <p className="text-[0.875rem] leading-relaxed text-[var(--muted)]">
              {t("footer.startBody")}
            </p>
            <Link
              href={lp("/offres")}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--accent)]/40 bg-[var(--accent)]/10 px-5 py-2.5 text-[0.8125rem] font-medium text-[var(--accent-soft)] transition-all hover:bg-[var(--accent)] hover:text-white"
            >
              {t("footer.seeOffers")}
            </Link>
          </motion.div>
        </motion.div>

        {/* Barre de bas */}
        <motion.div
          className="mt-14 flex flex-col flex-wrap items-center justify-center gap-4 border-t border-[var(--border-hover)] pt-8 sm:flex-row sm:justify-between md:mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <p className="text-[0.75rem] text-[var(--muted)]">
            © {year} AKWebSolution. {t("footer.rights")}
          </p>

          {/* Liens légaux */}
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <Link
              href="/mentions-legales"
              className="text-[0.7rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {t("footer.legal")}
            </Link>
            <span className="text-[var(--border-hover)]">·</span>
            <Link
              href="/confidentialite"
              className="text-[0.7rem] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
            >
              {t("footer.privacy")}
            </Link>
          </div>

          {/* Réseaux sociaux */}
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/adil.khd/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hover)] text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FaInstagram className="h-[15px] w-[15px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/adil-khadich/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hover)] text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <FaLinkedinIn className="h-[14px] w-[14px]" />
            </a>
            <a
              href="mailto:contact@akwebsolutions.fr"
              aria-label="Email"
              className="group flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-hover)] text-[var(--muted)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Mail size={14} strokeWidth={1.75} />
            </a>
          </div>

          <p className="text-[0.75rem] text-[var(--muted)]">
            {t("footer.credit")}
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
