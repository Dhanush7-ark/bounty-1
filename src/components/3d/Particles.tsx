"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, AdditiveBlending } from "three";
import { ParticlesProps } from "@/types/three";

// Deterministic pseudo-random number generator for pure React renders
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

export function Particles({
  count = 2000,
  size = 0.03,
  color = "#a3e635",
}: ParticlesProps) {
  const pointsRef = useRef<Points>(null);

  const { positions } = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (pseudoRandom(i * 3 + 1) - 0.5) * 20;
      pos[i * 3 + 1] = (pseudoRandom(i * 3 + 2) - 0.5) * 20;
      pos[i * 3 + 2] = (pseudoRandom(i * 3 + 3) - 0.5) * 20;
    }

    return { positions: pos };
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    pointsRef.current.rotation.y += delta * 0.03;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.65}
        blending={AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
