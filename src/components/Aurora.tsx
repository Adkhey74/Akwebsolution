"use client";

import { useEffect, useRef } from "react";

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = () => Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const ratio = dpr();
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    // Blobs très lents, monochrome blanc/gris sur fond noir
    // Fréquence angulaire basse = mouvement imperceptible, ambiant
    const blobs = [
      { ox: 0.3,  oy: 0.4,  r: 0.6,  opacity: 0.055, freq: 0.00018, phase: 0.0  },
      { ox: 0.72, oy: 0.28, r: 0.55, opacity: 0.04,  freq: 0.00014, phase: 1.2  },
      { ox: 0.5,  oy: 0.65, r: 0.5,  opacity: 0.035, freq: 0.0002,  phase: 2.5  },
      { ox: 0.18, oy: 0.68, r: 0.42, opacity: 0.03,  freq: 0.00016, phase: 0.8  },
    ];

    let t = 0;

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;

      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);

      blobs.forEach((blob) => {
        const px = (blob.ox + Math.sin(t * blob.freq * 1000 + blob.phase) * 0.14) * w;
        const py = (blob.oy + Math.cos(t * blob.freq * 900  + blob.phase) * 0.09) * h;
        const radius = blob.r * Math.max(w, h);

        const grad = ctx.createRadialGradient(px, py, 0, px, py, radius);
        grad.addColorStop(0,   `rgba(124,107,255,${blob.opacity * 2.2})`);
        grad.addColorStop(0.5, `rgba(124,107,255,${blob.opacity * 0.7})`);
        grad.addColorStop(1,   `rgba(124,107,255,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // Vignette bords
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    };

    // ── Gating perf ────────────────────────────────────────────────
    // Mouvement quasi imperceptible : inutile de brûler du CPU/GPU en
    // continu. Sur mobile (pointeur grossier) ou en reduced-motion, on
    // rend UNE frame statique. Sinon, on n'anime que lorsque le canvas
    // est visible et que l'onglet est actif.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) {
      draw(); // rendu statique, aucune boucle
      return () => window.removeEventListener("resize", resize);
    }

    let animId = 0;
    let running = false;

    const loop = () => {
      draw();
      t++;
      animId = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    // N'anime que quand la section est à l'écran
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    // Met en pause quand l'onglet est masqué
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{ width: "100%", height: "100%" }}
      aria-hidden
    />
  );
}
