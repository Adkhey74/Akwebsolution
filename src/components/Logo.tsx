import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/images/logo3.png";

interface LogoProps {
  variant?: "default" | "compact";
  className?: string;
}

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const isCompact = variant === "compact";
  return (
    <Link
      href="/"
      className={`block transition-opacity hover:opacity-85 ${className}`}
      aria-label="AKWebSolution - Accueil"
    >
      <Image
        src={LOGO_SRC}
        alt="AK Web Solutions"
        width={isCompact ? 200 : 280}
        height={isCompact ? 62 : 88}
        className={`object-contain ${isCompact ? "h-full max-h-full w-auto" : "h-auto w-auto"}`}
        priority
        sizes={isCompact ? "200px" : "280px"}
      />
    </Link>
  );
}
