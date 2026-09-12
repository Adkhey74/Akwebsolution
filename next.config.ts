import type { NextConfig } from "next";

/**
 * Cache des médias servis depuis `public/`.
 *
 * Vercel sert `public/` en `max-age=0, must-revalidate` : chaque boucle de la
 * vidéo du hero repartait donc en requête réseau. Mesuré sur une visite de
 * l'accueil : 9,2 Mo transférés, dont 9,1 Mo de vidéo — le même fichier de
 * 1,5 Mo téléchargé sept fois.
 *
 * ⚠️ `immutable` est une promesse : le navigateur ne redemandera pas le fichier
 * pendant un an, même si on le remplace. Un visiteur déjà venu garderait donc
 * l'ANCIENNE vidéo. Pour remplacer un média, **changer son nom de fichier**
 * (`hero-1080-v2.mp4`) plutôt que d'écraser l'ancien.
 *
 * Rien ici pour le JS, le CSS et les polices : Next les sert déjà immuables
 * depuis `/_next/static`, avec un nom qui contient leur empreinte. Et surtout
 * rien pour le HTML, qui doit rester revalidable à chaque déploiement.
 */
const MEDIA_CACHE = "public, max-age=31536000, immutable";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // ⚠️ Dossier au singulier — c'est bien `public/video/`.
        source: "/video/:path*",
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: MEDIA_CACHE }],
      },
    ];
  },
};

export default nextConfig;
