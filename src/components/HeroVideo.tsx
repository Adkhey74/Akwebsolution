"use client";

import { useEffect, useRef } from "react";
import { preload } from "react-dom";

const POSTER = "/video/hero-poster.webp";

/**
 * Vidéo de fond du Hero : la vidéo et son voile, en calque `absolute` sous le
 * contenu (sa place dans le DOM ne compte donc pas).
 *
 * Deux choix, dans l'ordre où ils comptent :
 * 1. Le premier affichage est l'image d'attente (25 Ko, préchargée en priorité
 *    haute), pas la vidéo : c'est elle qui compte pour le LCP.
 * 2. `preload="none"` + lecture lancée par le script : un visiteur en
 *    mouvement réduit ou en économie de données ne télécharge JAMAIS la
 *    vidéo, il garde l'image fixe.
 *
 * ⚠️ Pas de bouton pause, sur décision d'Adil (10/09/2026). Il avait été posé
 * pour le critère WCAG 2.2.2 (une animation automatique de plus de 5 s doit
 * pouvoir s'arrêter) : le site ne le remplit donc plus. Seuls les visiteurs
 * en mouvement réduit ont une vidéo à l'arrêt.
 *
 * Les fichiers sont des réencodages de `public/video/hero.mp4` (sans piste
 * audio, index en tête de fichier pour démarrer avant la fin du
 * téléchargement), en deux formats et deux définitions :
 *
 *   1080p — WebM/VP9 724 Ko · MP4/H.264 1,5 Mo
 *    720p — WebM/VP9 335 Ko · MP4/H.264 594 Ko   (servi sous 768 px)
 *
 * contre 3,5 Mo pour l'original. Les WebM sont encodés en `-crf 37` (1080p) et
 * `-crf 40` (720p), mesurés à SSIM 0,992 et 0,990 contre le MP4 : l'écart ne
 * se voit pas, y compris dans le dégradé du ciel — le pire cas pour le
 * banding. Regénérer avec ffmpeg (`libvpx-vp9`, `-b:v 0`, `-an`) et **revoir
 * la mesure** si la vidéo change.
 *
 * ⚠️ Les fichiers de `public/video/` sont servis en `immutable` pour un an
 * (cf. `next.config.ts`) : pour remplacer la vidéo, **changer son nom**, sinon
 * les visiteurs déjà venus garderont l'ancienne.
 *
 * Le voile est réglé dans globals.css (`.hero-video__scrim`).
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  preload(POSTER, { as: "image", fetchPriority: "high" });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Filet de sécurité : iOS refuse la lecture automatique d'une vidéo non
    // muette, et React a longtemps omis l'attribut `muted` du HTML serveur.
    // Il y figure en 19.2 (vérifié dans le HTML prérendu) ; la propriété
    // posée ici ne coûte rien et ne dépend pas de la version.
    video.muted = true;

    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const held =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      connection?.saveData === true;
    if (held) return;

    // Hors de l'écran, la vidéo s'arrête : inutile de décoder 24 images par
    // seconde pendant que le visiteur lit les offres.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
      else {
        video.play().catch(() => {
          // Lecture refusée (iOS en économie d'énergie) : l'image fixe reste.
        });
      }
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={POSTER}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        disableRemotePlayback
        tabIndex={-1}
      >
        {/* Ordre imposé par le navigateur : il prend la PREMIÈRE source dont le
            `media` correspond ET dont le type est lisible. Donc WebM avant MP4
            (VP9 pèse ~50 % du H.264 à qualité égale, et le MP4 reste le repli
            des navigateurs qui l'ignorent), et mobile avant desktop.

            Sous 768 px, l'écran n'affiche qu'une bande verticale de l'image :
            le 720p suffit, pour bien moins de données. */}
        <source src="/video/hero-720.webm" type="video/webm" media="(max-width: 767px)" />
        <source src="/video/hero-720.mp4" type="video/mp4" media="(max-width: 767px)" />
        <source src="/video/hero-1080.webm" type="video/webm" />
        <source src="/video/hero-1080.mp4" type="video/mp4" />
      </video>
      <div className="hero-video__scrim absolute inset-0" />
    </div>
  );
}
