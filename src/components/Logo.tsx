"use client";

import Image from "next/image";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import { useHomeLinkClick } from "@/components/SmoothScroll";

const LOGO_SRC = "/images/logo3.png";

interface LogoProps {
  variant?: "default" | "compact";
  className?: string;
  /** Appelé à chaque clic, en plus du retour au hero — le menu plein écran
      s'en sert pour se refermer. */
  onNavigate?: () => void;
}

export function Logo({ variant = "default", className = "", onNavigate }: LogoProps) {
  const { lp } = useI18n();
  // Sur l'accueil, le logo ramène au hero (cf. SmoothScroll) ; ailleurs il
  // navigue normalement. Vaut pour les trois logos : header, menu, pied de page.
  const onHomeClick = useHomeLinkClick();
  const isCompact = variant === "compact";
  return (
    <Link
      href={lp("/")}
      onClick={(e) => {
        onHomeClick(e);
        onNavigate?.();
      }}
      className={`block transition-opacity hover:opacity-85 ${className}`}
      aria-label="AKWebSolution - Accueil"
    >
      <Image
        src={LOGO_SRC}
        alt="AK Web Solutions"
        width={isCompact ? 200 : 280}
        height={isCompact ? 62 : 88}
        className={`object-contain ${isCompact ? "h-full max-h-full w-auto max-w-full" : "h-auto w-auto"}`}
        priority
        sizes={isCompact ? "200px" : "280px"}
      />
    </Link>
  );
}
