"use client"

import React, { memo } from "react"

interface AuroraTextProps {
  children: React.ReactNode
  className?: string
  colors?: string[]
  speed?: number
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    colors = ["#FF0080", "#7928CA", "#0070F3", "#38bdf8"],
    speed = 1,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(", ")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${10 / speed}s`,
    }

    /*
     * Un seul nœud de texte, volontairement.
     * La version d'origine doublait le contenu (une copie `sr-only` + une copie
     * visible en `aria-hidden`) : le mot se retrouvait deux fois dans le texte
     * du H1, donc deux fois pour Google et pour tout ce qui lit le DOM à plat.
     * Le dégradé n'a pas besoin de ce doublon — `bg-clip-text` conserve un vrai
     * texte, sélectionnable et lu normalement par les lecteurs d'écran.
     */
    return (
      <span className={`relative inline-block ${className}`}>
        <span
          className="animate-aurora relative bg-size-[200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
        >
          {children}
        </span>
      </span>
    )
  }
)

AuroraText.displayName = "AuroraText"
