"use client";

import { useEffect, useRef } from "react";

export function Aurora() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.offsetWidth * Math.min(window.devicePixelRatio, 2);
      canvas.height = canvas.offsetHeight * Math.min(window.devicePixelRatio, 2);
      ctx.scale(Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2));
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
        grad.addColorStop(0,   `rgba(255,255,255,${blob.opacity})`);
        grad.addColorStop(0.5, `rgba(255,255,255,${blob.opacity * 0.3})`);
        grad.addColorStop(1,   `rgba(255,255,255,0)`);

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      });

      // Vignette bords
      const vig = ctx.createRadialGradient(w / 2, h / 2, h * 0.15, w / 2, h / 2, h * 0.85);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);

      t++;
      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
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
