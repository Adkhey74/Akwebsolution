"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm transition-shadow hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
    >
      {/* ── Info header ── */}
      <div className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:justify-between md:p-10">
        {/* Left: category + title + description */}
        <div className="flex-1">
          <span className="mb-3 inline-block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
            {category}
          </span>
          <h2 className="text-[1.875rem] font-semibold tracking-tight text-[var(--foreground)] md:text-[2.25rem]">
            {title}
          </h2>
          <p className="mt-3 max-w-xl text-[0.9375rem] leading-[1.7] text-[var(--muted)] md:text-[1rem]">
            {description}
          </p>
        </div>

        {/* Right: year + tags */}
        <div className="flex shrink-0 flex-col items-start gap-4 md:items-end">
          {year && (
            <div className="text-right">
              <p className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-[var(--muted)]">Année</p>
              <p className="text-[1.125rem] font-semibold text-[var(--foreground)]">{year}</p>
            </div>
          )}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 md:justify-end">
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
      </div>

      {/* ── Browser mockup ── */}
      <div className="mx-6 mb-6 overflow-hidden rounded-xl border border-[var(--border)] md:mx-10 md:mb-8">

        {/* Chrome bar */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] bg-[#f5f5f5] px-4 py-3">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="flex w-full max-w-sm items-center gap-2 rounded-md bg-white px-3 py-1.5 border border-[var(--border)]">
              <span className="h-2 w-2 rounded-full bg-green-500 opacity-80" />
              <span className="truncate text-[0.7rem] text-[var(--muted)]">
                {title.toLowerCase().replace(/\s/g, "")}.fr
              </span>
            </div>
          </div>
        </div>

        {/* Image area */}
        <div className="relative aspect-video w-full overflow-hidden bg-[#f9f9f9]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: d * 40 }),
                center: { opacity: 1, x: 0 },
                exit:  (d: number) => ({ opacity: 0, x: d * -40 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute inset-0"
            >
              <Image
                src={images[current].src}
                alt={images[current].alt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 75rem"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                aria-label="Image précédente"
              >
                <ChevronLeft size={20} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--foreground)] shadow-md backdrop-blur-sm transition-all hover:bg-white hover:shadow-lg"
                aria-label="Image suivante"
              >
                <ChevronRight size={20} strokeWidth={1.75} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Thumbnail strip ── */}
      {total > 1 && (
        <div className="flex items-center gap-2.5 overflow-x-auto px-6 pb-6 md:px-10 md:pb-8">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Voir ${img.alt}`}
              aria-current={i === current ? "true" : undefined}
              className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-16 md:w-28 ${
                i === current
                  ? "border-[var(--accent)] opacity-100 shadow-md"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover object-top"
                sizes="112px"
              />
            </button>
          ))}
        </div>
      )}
    </motion.article>
  );
}
