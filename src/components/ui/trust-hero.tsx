import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroBackground } from "@/components/HeroBackground";

const STATS = [
  { value: "5+", label: "ans d'expérience" },
  { value: "100%", label: "clients satisfaits" },
  { value: "24h", label: "délai de réponse" },
];

const CLIENTS = ["Orbit Group", "Kabuki", "HernTaxi", "ThermoChrono"];

export default function TrustHero() {
  return (
    <div className="relative flex min-h-dvh w-full flex-col justify-center overflow-hidden bg-[var(--background)] font-sans text-white">
      <style>{`
        @keyframes thFade {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .th-fade { animation: thFade 0.8s ease-out forwards; opacity: 0; }
        .th-d1 { animation-delay: 0.1s; }
        .th-d2 { animation-delay: 0.2s; }
        .th-d3 { animation-delay: 0.3s; }
        .th-d4 { animation-delay: 0.4s; }
        .th-d5 { animation-delay: 0.5s; }
      `}</style>

      {/* Fond abstrait violet généré (CSS animé, aucune image externe) */}
      <HeroBackground />
      {/* Grain léger pour la matière */}
      <div className="grain pointer-events-none absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-28 sm:px-6 md:pb-20 md:pt-28 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-10">

          {/* --- Colonne gauche : accroche --- */}
          <div className="flex flex-col space-y-7 lg:col-span-6">

            {/* Badge */}
            <div className="th-fade th-d1">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-white/10">
                <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-zinc-300 sm:text-xs">
                  Agence web · Annecy
                  <Sparkles className="h-3.5 w-3.5 text-[var(--accent-soft)]" />
                </span>
              </div>
            </div>

            {/* Titre */}
            <h1 className="th-fade th-d2 text-4xl font-medium leading-[1.02] tracking-tight sm:text-5xl md:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]">
              Des sites web{" "}
              <span className="bg-gradient-to-br from-white via-[var(--accent-soft)] to-[var(--accent)] bg-clip-text font-display italic text-transparent">
                élégants
              </span>
              <br />
              qui vous ressemblent
            </h1>

            {/* Description */}
            <p className="th-fade th-d3 max-w-xl text-lg leading-relaxed text-[var(--muted)]">
              Développeur web freelance à Annecy. Des sites sur mesure, rapides et
              optimisés SEO — une présence en ligne à votre image, du début à la fin.
            </p>

            {/* CTA */}
            <div className="th-fade th-d4 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/offres"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold text-white shadow-[0_10px_40px_-10px_var(--accent)] transition-all hover:scale-[1.02] hover:bg-[var(--accent-hover)] active:scale-[0.98] sm:w-auto"
              >
                Démarrer mon projet
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                href="/projets"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-white/10 sm:w-auto"
              >
                Voir les projets
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Stats en ligne */}
            <div className="th-fade th-d5 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-6">
              {STATS.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-xl font-bold text-white sm:text-2xl">{s.value}</span>
                  <span className="text-[11px] uppercase tracking-wider text-[var(--muted)] sm:text-xs">{s.label}</span>
                </div>
              ))}
            </div>

            {/* Ligne confiance */}
            <p className="th-fade th-d5 text-[0.8rem] text-[var(--muted)]">
              Déjà réalisés —{" "}
              <span className="text-[var(--foreground)]/80">{CLIENTS.join(" · ")}</span>
            </p>
          </div>

          {/* --- Colonne droite : mockup projet --- */}
          <div className="th-fade th-d4 lg:col-span-6">
            <Link href="/projets/orbitgroup" className="group relative block" aria-label="Voir l'étude de cas Orbit Group">
              {/* halo violet */}
              <div className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[var(--accent)]/20 opacity-70 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Fenêtre navigateur */}
              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[var(--surface)] shadow-2xl transition-transform duration-500 lg:-rotate-[1.2deg] lg:group-hover:rotate-0">
                <div className="flex items-center gap-1.5 border-b border-white/10 bg-white/[0.04] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                  <span className="ml-3 hidden h-5 flex-1 rounded-full bg-white/[0.04] sm:block" />
                </div>
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/images/OrbitGroup/hero.png"
                    alt="Site Orbit Group réalisé par AKWebSolution"
                    fill
                    priority
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 640px"
                  />
                </div>
              </div>

              {/* Étiquette flottante */}
              <div className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-[var(--background)]/80 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                Orbit Group — étude de cas
                <ArrowRight className="h-3.5 w-3.5 text-[var(--accent-soft)] transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
