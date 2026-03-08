"use client";

import dynamic from "next/dynamic";

const Beams = dynamic(() => import("@/components/Beams").then((m) => m.default), { ssr: false });

export function GlobalBeamsBackground() {
  return (
    <div className="fixed inset-0 z-[-2]">
      <Beams
        beamNumber={10}
        lightColor="#ffffff"
        speed={1.5}
        noiseIntensity={1.5}
      />
    </div>
  );
}
