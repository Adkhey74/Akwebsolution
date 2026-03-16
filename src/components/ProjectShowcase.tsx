"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag, X, ZoomIn } from "lucide-react";

export type ProjectImage = { src: string; alt: string };

type ProjectShowcaseProps = {
  title: string;
  category: string;
  description: string;
  images: ProjectImage[];
  tags?: string[];
  year?: string;
  url?: string;
  index?: number;
};

export function ProjectShowcase({
  title,
  category,
  description,
  images,
  tags = [],
  year,
  url,
  index = 0,
}: ProjectShowcaseProps) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [lightbox, setLightbox] = useState(false);
  const total = images.length;

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, current]);

  // Swipe tactile
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const goPrev = () => go(current === 0 ? total - 1 : current - 1);
  const goNext = () => go(current === total - 1 ? 0 : current + 1);

  return (
    <>
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.52, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-sm"
    >
      {/* ── Mobile : infos en haut ── */}
      <div className="flex min-w-0 items-center justify-between gap-3 border-b border-[var(--border)] px-4 py-4 sm:px-5 lg:hidden">
        <div className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
            <Tag size={9} strokeWidth={2.2} />
            {category}
            {year && <span className="opacity-50">· {year}</span>}
          </span>
          <h2 className="mt-0.5 truncate text-[1.375rem] font-semibold tracking-tight text-[var(--foreground)]">
            {title}
          </h2>
        </div>
      </div>

      {/* ── Layout split desktop ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Colonne image */}
        <div className="relative flex flex-col lg:w-[60%]">

          {/* Browser chrome — desktop only */}
          <div className="hidden items-center gap-3 border-b border-[var(--border)] bg-[var(--background)] px-4 py-2.5 lg:flex">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-xs items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface)] px-3 py-1">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span className="truncate text-[0.68rem] text-[var(--muted)]">
                  {url ? url.replace("https://", "") : `${title.toLowerCase().replace(/\s/g, "")}.fr`}
                </span>
              </div>
            </div>
          </div>

          {/* Image principale */}
          <div
            className="group relative aspect-[16/10] w-full cursor-zoom-in overflow-hidden bg-[var(--background)] sm:aspect-video lg:aspect-[16/10] lg:min-h-0"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            onClick={() => setLightbox(true)}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 28 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d: number) => ({ opacity: 0, x: d * -28 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current].src}
                  alt={images[current].alt}
                  fill
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Icône zoom */}
            <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <ZoomIn size={15} strokeWidth={2} />
            </div>

            {/* Flèches — masquées sur petit mobile, visibles à partir de sm */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white shadow-md backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>

                {/* Compteur */}
                <div className="absolute bottom-2.5 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[0.68rem] font-medium text-white backdrop-blur-sm">
                  {current + 1} / {total}
                </div>
              </>
            )}
          </div>

          {/* Dots mobile + thumbnails desktop */}
          {total > 1 && (
            <>
              {/* Dots — mobile uniquement */}
              <div className="flex items-center justify-center gap-2 py-3 lg:hidden">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Image ${i + 1}`}
                    className={`h-2 rounded-full transition-all ${
                      i === current
                        ? "w-6 bg-[var(--accent)]"
                        : "w-2 bg-[var(--accent)]/20"
                    }`}
                  />
                ))}
              </div>

              {/* Thumbnails — desktop uniquement */}
              <div className="hidden items-center gap-2 overflow-x-auto border-t border-[var(--border)] bg-[var(--background)] px-4 py-3 lg:flex">
                {images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Voir ${img.alt}`}
                    className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                      i === current
                        ? "border-[var(--accent)] opacity-100"
                        : "border-transparent opacity-40 hover:opacity-70"
                    }`}
                  >
                    <Image src={img.src} alt={img.alt} fill className="object-cover object-center" sizes="80px" />
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Colonne info — desktop uniquement */}
        <div className="hidden min-w-0 flex-col justify-between break-words border-l border-[var(--border)] p-8 lg:flex lg:w-[40%] xl:p-10">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              <Tag size={10} strokeWidth={2} />
              {category}
            </span>
            <h2 className="mt-3 text-[2.25rem] font-semibold leading-[1.1] tracking-tight text-[var(--foreground)]">
              {title}
            </h2>
            {year && (
              <div className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-[var(--muted)]">
                <Calendar size={13} strokeWidth={1.75} />
                {year}
              </div>
            )}
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
              {description}
            </p>
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-[var(--border-hover)] px-3 py-1 text-[0.72rem] font-medium text-[var(--muted)]">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="mt-8 flex flex-wrap gap-3 border-t border-[var(--border)] pt-6">
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] px-6 py-3 text-[0.875rem] font-medium text-[var(--foreground)] transition-all hover:bg-[var(--card)]"
            >
              <ZoomIn size={15} strokeWidth={1.75} />
              Voir les photos
            </button>
            {url && (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 py-3 text-[0.875rem] font-medium text-[var(--background)] transition-all hover:opacity-90 hover:shadow-lg hover:shadow-black/15"
              >
                Voir le site
                <ExternalLink size={14} strokeWidth={2} />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* ── Mobile : description + tags en bas ── */}
      <div className="min-w-0 border-t border-[var(--border)] px-4 py-5 sm:px-5 lg:hidden">
        <p className="break-words text-[0.9rem] leading-[1.7] text-[var(--muted)]">
          {description}
        </p>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--border-hover)] px-3 py-1 text-[0.72rem] font-medium text-[var(--muted)]">
                {tag}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setLightbox(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--foreground)] transition-all hover:bg-[var(--card)]"
          >
            <ZoomIn size={14} strokeWidth={1.75} />
            Voir les photos
          </button>
          {url && (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-4 py-2 text-[0.8125rem] font-medium text-[var(--background)]"
            >
              Voir le site
              <ExternalLink size={13} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </motion.article>

      {/* ── Lightbox ── */}

      <AnimatePresence>
        {lightbox && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(false)}
          >
            {/* Bouton fermer */}
            <button
              type="button"
              onClick={() => setLightbox(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              aria-label="Fermer"
            >
              <X size={20} strokeWidth={2} />
            </button>

            {/* Compteur */}
            <div className="absolute left-1/2 top-4 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 text-[0.75rem] text-white backdrop-blur-sm">
              {current + 1} / {total}
            </div>

            {/* Image */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[90vh] w-full max-w-6xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[current].src}
                alt={images[current].alt}
                width={1600}
                height={1000}
                className="max-h-[90vh] w-full rounded-lg object-contain"
                sizes="100vw"
              />
            </motion.div>

            {/* Flèches */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={22} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={22} strokeWidth={2} />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
