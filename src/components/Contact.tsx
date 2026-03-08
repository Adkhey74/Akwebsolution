"use client";

import { motion } from "framer-motion";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

const perks = [
  "Réponse sous 24 h",
  "Sans engagement",
  "Échange personnalisé",
];

export function Contact() {
  return (
    <section
      id="contact"
      className="section-padding border-t border-[var(--border)] overflow-hidden"
    >
      <div className="section-container">
        <div className="mx-auto max-w-2xl text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-hover)] bg-white px-4 py-1.5 shadow-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Passons à l&apos;action
            </span>
          </motion.div>

          {/* Titre */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.52, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[2rem] font-light leading-[1.18] tracking-tight text-[var(--foreground)] sm:text-[2.5rem] md:text-[3rem]"
          >
            Parlons de{" "}
            <span className="relative inline-block font-semibold">
              votre projet
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute -bottom-0.5 left-0 h-[2.5px] w-full origin-left bg-[var(--accent)]"
              />
            </span>
          </motion.h2>

          {/* Sous-titre — apparition douce */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 text-center text-[1rem] leading-[1.7] text-[var(--muted)] md:text-[1.0625rem]"
          >
            Une idée, un besoin, une question ? Envoyez-moi un message, je vous réponds rapidement. Tarifs clairs, prix fixes, sans mauvaise surprise.
          </motion.p>

          {/* Perks */}
          <motion.div
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-30px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.18 },
              },
            }}
          >
            {perks.map((p) => (
              <motion.span
                key={p}
                variants={{
                  hidden: { opacity: 0, x: -8 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                className="flex items-center gap-1.5 text-[0.8125rem] text-[var(--muted)]"
              >
                <CheckCircle2 size={13} strokeWidth={2.2} className="shrink-0" />
                {p}
              </motion.span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <motion.a
              href="mailto:contact@akwebsolutions.fr"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-8 py-4 text-[0.9375rem] font-medium text-white shadow-lg transition-all hover:opacity-90 hover:shadow-xl hover:shadow-black/20"
            >
              <Mail size={17} strokeWidth={1.75} />
              Envoyer un message
              <ArrowRight size={15} strokeWidth={2} />
            </motion.a>

            <motion.a
              href="https://wa.me/33782923806"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border-hover)] bg-white px-8 py-4 text-[0.9375rem] font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--card)]"
            >
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-[17px] w-[17px] text-[#25D366]" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Email discret */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mt-5 text-[0.8rem] text-[var(--muted)]"
          >
            contact@akwebsolutions.fr
          </motion.p>

        </div>
      </div>
    </section>
  );
}
