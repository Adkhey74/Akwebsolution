/**
 * Fond animé du Hero — 100 % CSS (aucun WebGL / JS).
 * Nappes violettes dérivantes + diagonales lumineuses + grille tech,
 * le tout figé automatiquement en `prefers-reduced-motion` (via globals.css).
 */
export function HeroBackground() {
  return (
    <div className="hero-bg" aria-hidden>
      <span className="hero-bg__grid" />
      <span className="hero-bg__beams" />
      <span className="hero-bg__aurora hero-bg__a1" />
      <span className="hero-bg__aurora hero-bg__a2" />
      <span className="hero-bg__aurora hero-bg__a3" />
    </div>
  );
}
