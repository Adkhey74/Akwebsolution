"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function AboutPreview() {
  return (
    <section className="section-padding border-t border-[var(--border)] overflow-hidden">
      <div className="section-container min-w-0">
        <motion.div
          className="mx-auto flex w-full max-w-4xl flex-col items-center gap-10 md:flex-row md:gap-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Photo */}
          <div className="relative w-full shrink-0 overflow-hidden rounded-2xl shadow-lg md:w-[340px] lg:w-[380px]" style={{ aspectRatio: "4/5" }}>
            <Image
              src="/images/adil.jpeg"
              alt="Adil — Créateur AKWebSolution"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 380px"
            />
          </div>

          {/* Contenu */}
          <div className="flex flex-col items-center gap-5 text-center md:items-start md:text-left">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-[var(--surface)] px-4 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                  Qui suis-je
                </span>
              </div>
              <h2 className="text-[1.75rem] font-light leading-[1.2] tracking-tight text-[var(--foreground)] sm:text-[2.25rem]">
                Un développeur{" "}
                <span className="relative inline-block font-semibold">
                  à votre écoute
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left bg-[var(--accent)]"
                  />
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
              Je m'appelle <strong className="font-semibold text-[var(--foreground)]">Adil</strong>, développeur web freelance basé en France. J'accompagne les indépendants et petites entreprises qui veulent une présence en ligne claire, professionnelle et efficace — du sur mesure, du début à la fin.
            </p>

            <Link
              href="/a-propos"
              className="group inline-flex items-center gap-2 text-[0.9rem] font-medium text-[var(--foreground)] underline underline-offset-4 transition-opacity hover:opacity-60"
            >
              En savoir plus sur moi
              <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
