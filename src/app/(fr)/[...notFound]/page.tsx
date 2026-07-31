import { notFound } from "next/navigation";

/**
 * Attrape toutes les URLs françaises qui ne correspondent à aucune page, pour
 * les faire tomber sur `(fr)/not-found.tsx`.
 *
 * Pourquoi c'est nécessaire : le site a deux layouts racines (un par langue),
 * donc il n'y a plus de `app/layout.tsx`. Or une URL qui ne correspond à AUCUNE
 * route n'entre dans aucun des deux arbres — Next servait alors sa page 404
 * générique en noir et blanc, sans le design du site. Ce fichier rattache ces
 * URLs à l'arbre français, qui affiche la vraie page 404.
 *
 * Next donne toujours la priorité aux routes plus précises : cette route
 * n'entre en jeu que lorsque rien d'autre ne correspond. Les fichiers de
 * `public/`, `sitemap.xml`, `robots.txt` et `opengraph-image` sont résolus avant
 * et ne passent pas ici.
 *
 * Alternative écartée : `app/global-not-found.tsx`, qui répondrait au besoin
 * mais reste derrière le drapeau `experimental.globalNotFound` en Next 16.1.6 —
 * pas sur un site en production.
 */
export default function CatchAllNotFound() {
  notFound();
}
