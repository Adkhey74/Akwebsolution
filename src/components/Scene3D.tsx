"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, Text3D, Edges } from "@react-three/drei";

const FONT_URL =
  "https://unpkg.com/three@0.170.0/examples/fonts/helvetiker_regular.typeface.json";

const material = (
  <>
    <meshStandardMaterial
      color="#0a0a0a"
      metalness={0.05}
      roughness={0.6}
      envMapIntensity={0.5}
    />
    <Edges color="#0a0a0a" threshold={15} />
  </>
);

function AK3D() {
  const size = 3;
  const height = 0.5;
  const spacing = 1.35;
  return (
    <group>
      <Text3D
        font={FONT_URL}
        size={size}
        height={height}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.025}
        bevelSegments={4}
        position={[-spacing, 0, 0]}
      >
        A
        {material}
      </Text3D>
      <Text3D
        font={FONT_URL}
        size={size}
        height={height}
        bevelEnabled
        bevelThickness={0.04}
        bevelSize={0.025}
        bevelSegments={4}
        position={[spacing, 0, 0]}
      >
        K
        {material}
      </Text3D>
    </group>
  );
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 4, 5]} intensity={1} />
      <directionalLight position={[-3, 2, 4]} intensity={0.4} />
      <directionalLight position={[0, 2, 6]} intensity={0.5} />

      {/* Grille subtile - tons sombres pour fond clair */}
      <Grid
        args={[20, 20]}
        cellSize={0.5}
        cellThickness={0.4}
        sectionSize={2}
        sectionThickness={0.6}
        sectionColor={[0.25, 0.25, 0.28]}
        cellColor={[0.18, 0.18, 0.2]}
        fadeDistance={25}
        fadeStrength={1.2}
        infiniteGrid
        position={[0, -3, 0]}
      />

      {/* AK en 3D — statique */}
      <AK3D />
    </>
  );
}

export function Scene3D() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 72 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
      {/* Dégradé pour fondre la 3D dans le fond clair */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, transparent 0%, #fafafa 70%)",
        }}
      />
    </div>
  );
}
