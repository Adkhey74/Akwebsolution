"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Tag } from "lucide-react";

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
  const total = images.length;

  const go = (next: number) => {
    setDirection(next > current ? 1 : -1);
    setCurrent(next);
  };
  const goPrev = () => go(current === 0 ? total - 1 : current - 1);
  const goNext = () => go(current === total - 1 ? 0 : current + 1);

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
    >
      {/* ── Layout split : image gauche / info droite ── */}
      <div className="flex flex-col lg:flex-row">

        {/* Colonne image (60%) */}
        <div className="relative flex flex-col lg:w-[60%]">

          {/* Browser chrome */}
          <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#f5f5f5] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="flex w-full max-w-xs items-center gap-2 rounded-md bg-white px-3 py-1 border border-[var(--border)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                <span className="truncate text-[0.68rem] text-[var(--muted)]">
                  {url ? url.replace("https://", "") : `${title.toLowerCase().replace(/\s/g, "")}.fr`}
                </span>
              </div>
            </div>
          </div>

          {/* Image principale */}
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f9f9f9] lg:aspect-auto lg:flex-1 lg:min-h-[420px]">
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: d * 32 }),
                  center: { opacity: 1, x: 0 },
                  exit:  (d: number) => ({ opacity: 0, x: d * -32 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0"
              >
                <Image
                  src={images[current].src}
                  alt={images[current].alt}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Flèches */}
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                  aria-label="Image précédente"
                >
                  <ChevronLeft size={18} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                  aria-label="Image suivante"
                >
                  <ChevronRight size={18} strokeWidth={2} />
                </button>

                {/* Compteur */}
                <div className="absolute bottom-3 right-3 rounded-full bg-black/50 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur-sm">
                  {current + 1} / {total}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {total > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto border-t border-[var(--border)] bg-[#fafafa] px-4 py-3">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Voir ${img.alt}`}
                  className={`relative h-12 w-20 shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    i === current
                      ? "border-[var(--accent)] opacity-100"
                      : "border-transparent opacity-45 hover:opacity-70"
                  }`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover object-top" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Colonne info (40%) */}
        <div className="flex flex-col justify-between border-t border-[var(--border)] p-7 lg:w-[40%] lg:border-t-0 lg:border-l lg:p-10">

          <div>
            {/* Catégorie */}
            <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              <Tag size={10} strokeWidth={2} />
              {category}
            </span>

            {/* Titre */}
            <h2 className="mt-3 text-[2rem] font-semibold leading-[1.1] tracking-tight text-[var(--foreground)] md:text-[2.5rem]">
              {title}
            </h2>

            {/* Année */}
            {year && (
              <div className="mt-3 flex items-center gap-1.5 text-[0.8125rem] text-[var(--muted)]">
                <Calendar size={13} strokeWidth={1.75} />
                {year}
              </div>
            )}

            {/* Description */}
            <p className="mt-5 text-[0.9375rem] leading-[1.75] text-[var(--muted)]">
              {description}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--border-hover)] px-3 py-1 text-[0.72rem] font-medium text-[var(--muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          {url && (
            <div className="mt-8 pt-6 border-t border-[var(--border)]">
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[var(--accent)] px-6 py-3 text-[0.875rem] font-medium text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-black/15"
              >
                Voir le site
                <ExternalLink size={14} strokeWidth={2} />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
