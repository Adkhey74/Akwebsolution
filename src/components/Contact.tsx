"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const projectTypes = [
  "Page Vitrine Rapide",
  "Site Vitrine Complet",
  "Site E-commerce",
  "Site Pro & Sur Mesure",
  "Autre / Je ne sais pas encore",
];

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", projectType: "", message: "" });
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      name: form.name.trim(),
      email: form.email.trim().toLowerCase(),
      projectType: form.projectType.trim(),
      message: form.message.trim(),
    };
    if (!payload.name || !EMAIL_RE.test(payload.email) || !payload.message || !consent) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-[0.9375rem] text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-colors focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/30 hover:border-[var(--border-hover)]";

  return (
    <section id="contact" className="section-padding border-t border-[var(--border)] bg-[var(--section-alt)] overflow-hidden">
      <div className="section-container min-w-0">
        <div className="mx-auto w-full max-w-2xl">

          {/* Header */}
          <motion.div
            className="mb-10 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.52, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <span className="eyebrow mb-5">Passons à l&apos;action</span>
            <h2 className="text-[2rem] font-light leading-[1.18] tracking-tight text-[var(--foreground)] sm:text-[2.5rem] md:text-[3rem]">
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
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-[1.7] text-[var(--muted)]">
              Réponse sous 24 h · Tarifs fixes · Sans engagement
            </p>
          </motion.div>

          {/* Formulaire */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.52, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {status === "success" ? (
              <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-12 text-center">
                <CheckCircle2 size={40} strokeWidth={1.5} className="text-green-500" />
                <h3 className="text-[1.25rem] font-semibold text-[var(--foreground)]">Message envoyé !</h3>
                <p className="text-[0.9375rem] text-[var(--muted)]">Je vous réponds dans les 24 h. À très bientôt.</p>
                <button
                  type="button"
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", projectType: "", message: "" }); }}
                  className="mt-2 text-[0.8125rem] text-[var(--muted)] underline underline-offset-2 hover:text-[var(--foreground)] transition-colors"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-name" className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Nom *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      autoComplete="name"
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={set("name")}
                      className={inputClass}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="contact-email" className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Email *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      placeholder="votre@email.fr"
                      value={form.email}
                      onChange={set("email")}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="contact-project" className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Type de projet</label>
                  <select
                    id="contact-project"
                    value={form.projectType}
                    onChange={set("projectType")}
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="">Sélectionner (optionnel)</option>
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  <label htmlFor="contact-message" className="text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[var(--muted)]">Message *</label>
                  <textarea
                    id="contact-message"
                    required
                    rows={5}
                    placeholder="Décrivez votre projet, vos besoins, vos questions…"
                    value={form.message}
                    onChange={set("message")}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Consentement RGPD */}
                <label htmlFor="contact-consent" className="mt-5 flex cursor-pointer items-start gap-2.5 text-[0.8125rem] leading-relaxed text-[var(--muted)]">
                  <input
                    id="contact-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
                  />
                  <span>
                    J&apos;accepte que mes informations soient utilisées pour être recontacté(e). Voir la{" "}
                    <a href="/confidentialite" className="text-[var(--accent-soft)] underline underline-offset-2 hover:text-[var(--foreground)]">politique de confidentialité</a>.
                  </span>
                </label>

                {status === "error" && (
                  <div role="alert" className="mt-4 flex items-center gap-2 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-[0.875rem] text-red-300">
                    <AlertCircle size={15} strokeWidth={2} className="shrink-0" />
                    Vérifiez votre nom, un email valide, votre message et le consentement — ou écrivez à contact@akwebsolutions.fr
                  </div>
                )}

                <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[0.75rem] text-[var(--muted)]">
                    Ou par WhatsApp :{" "}
                    <a href="https://wa.me/33782923806" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">
                      07 82 92 38 06
                    </a>
                  </p>
                  <ShimmerButton
                    type="submit"
                    disabled={status === "loading"}
                    background="var(--accent)"
                    shimmerColor="rgba(255,255,255,0.85)"
                    borderRadius="9999px"
                    className="gap-2.5 border-transparent px-8 py-3.5 text-[0.9375rem] font-medium !text-white shadow-[0_10px_40px_-10px_var(--accent)] disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <><Loader2 size={16} strokeWidth={2} className="animate-spin" /> Envoi…</>
                    ) : (
                      <><Send size={15} strokeWidth={2} /> Envoyer le message</>
                    )}
                  </ShimmerButton>
                </div>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
