"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, AdditiveBlending } from "three";

// Deterministic random helper
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface SpaceDustProps {
  count?: number;
}

export function SpaceDust({ count = 3500 }: SpaceDustProps) {
  const pointsRef = useRef<Points>(null);

  // Generate particles scattered in a long tunnel [X: -40..40, Y: -30..30, Z: 50..-350]
  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 90; // X
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 70; // Y
      pos[i * 3 + 2] = 50 - pseudoRandom(i * 3 + 3) * 400; // Z depth
    }

    return { positions: pos };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    // Slow ambient rotation around Z-axis to give space depth
    pointsRef.current.rotation.z += delta * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#00FF66"
        transparent
        opacity={0.55}
        blending={AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  );
}
