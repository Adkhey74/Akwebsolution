import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
          Erreur 404
        </p>
        <h1 className="mt-5 text-[3rem] font-light leading-tight tracking-tight text-[var(--foreground)] sm:text-[4rem] md:text-[5rem]">
          Page introuvable
        </h1>
        <p className="mt-5 max-w-md text-[1rem] leading-relaxed text-[var(--muted)]">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-[var(--foreground)] px-7 py-3.5 text-[0.9rem] font-medium text-[var(--background)] transition-opacity hover:opacity-80"
        >
          Retour à l&apos;accueil
        </Link>
      </main>
      <Footer />
    </>
  );
}
