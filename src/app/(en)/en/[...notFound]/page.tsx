import { notFound } from "next/navigation";

/**
 * Même rôle que l'attrape-tout français, pour les URLs sous `/en`.
 *
 * Il est plus précis que celui de l'arbre français (`en` y est un segment fixe),
 * donc `/en/nimporte-quoi` affiche bien la page 404 anglaise et non la française.
 */
export default function CatchAllNotFoundEn() {
  notFound();
}
