"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, AdditiveBlending, Color } from "three";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface SpaceDustProps {
  count?: number;
}

/**
 * Photorealistic Deep Space Starfield & Volumetric Cosmic Nebula Dust
 */
export function SpaceDust({ count = 4000 }: SpaceDustProps) {
  const pointsRef = useRef<Points>(null);
  const nebulaRef = useRef<Points>(null);

  // 1. Generate Realistic Multi-Spectral Starfield
  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    // Realistic star spectral colors (Class O/B Blue, A/F White, G Yellow/Sun, K/M Red)
    const spectralColors = [
      new Color("#ffffff"), // Pure white
      new Color("#e0f2fe"), // Blue-white
      new Color("#bae6fd"), // Soft cyan-blue
      new Color("#fef08a"), // Sun-like yellow
      new Color("#fed7aa"), // Warm orange
    ];

    for (let i = 0; i < count; i++) {
      // Position scattered throughout tunnel
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 130;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 100;
      pos[i * 3 + 2] = 60 - pseudoRandom(i * 3 + 3) * 450;

      // Pick star color from spectral array
      const colorIndex = Math.floor(pseudoRandom(i * 3 + 4) * spectralColors.length);
      const starColor = spectralColors[colorIndex];
      col[i * 3] = starColor.r;
      col[i * 3 + 1] = starColor.g;
      col[i * 3 + 2] = starColor.b;

      // Varied star sizes
      sz[i] = pseudoRandom(i * 3 + 5) * 0.045 + 0.015;
    }

    return { positions: pos, colors: col, sizes: sz };
  }, [count]);

  // 2. Generate Volumetric Cosmic Nebula Dust Clouds
  const { nebulaPositions, nebulaColors } = useMemo(() => {
    const nCap = Math.floor(count * 0.15);
    const pos = new Float32Array(nCap * 3);
    const col = new Float32Array(nCap * 3);

    const nebulaPalette = [
      new Color("#4c1d95"), // Deep Violet
      new Color("#831843"), // Cosmic Magenta
      new Color("#0c4a6e"), // Deep Space Azure
      new Color("#064e3b"), // Emerald Nebula
    ];

    for (let i = 0; i < nCap; i++) {
      pos[i * 3] = (pseudoRandom(i * 4 + 10) - 0.5) * 110;
      pos[i * 3 + 1] = (pseudoRandom(i * 4 + 11) - 0.5) * 80;
      pos[i * 3 + 2] = 40 - pseudoRandom(i * 4 + 12) * 420;

      const c = nebulaPalette[Math.floor(pseudoRandom(i * 4 + 13) * nebulaPalette.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { nebulaPositions: pos, nebulaColors: col };
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.z += delta * 0.005;
    }
    if (nebulaRef.current) {
      nebulaRef.current.rotation.z -= delta * 0.003;
    }
  });

  return (
    <group>
      {/* Primary Multi-Spectral Starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={0.85}
          blending={AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>

      {/* Volumetric Cosmic Nebula Cloud Glow */}
      <points ref={nebulaRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nebulaPositions, 3]} />
          <bufferAttribute attach="attributes-color" args={[nebulaColors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={1.8}
          vertexColors
          transparent
          opacity={0.12}
          blending={AdditiveBlending}
          depthWrite={false}
          sizeAttenuation
        />
      </points>
    </group>
  );
}
