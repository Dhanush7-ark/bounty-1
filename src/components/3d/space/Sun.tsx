"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, AdditiveBlending } from "three";
import { createSunTexture } from "@/lib/spaceTextures";
import { AtmosphereGlow } from "./AtmosphereGlow";

interface SunProps {
  position?: [number, number, number];
  scale?: number;
}

export function Sun({ position = [26, 14, -45], scale = 10 }: SunProps) {
  const sunGroupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const coronaRef = useRef<Mesh>(null);
  const flareRef = useRef<Mesh>(null);

  // Generate procedural solar plasma texture
  const sunTexture = useMemo(() => createSunTexture(), []);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.05;
    }
    if (coronaRef.current) {
      coronaRef.current.rotation.z -= delta * 0.03;
    }
    if (flareRef.current) {
      flareRef.current.rotation.z += delta * 0.08;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.04;
      flareRef.current.scale.setScalar(scale * 1.35 * pulse);
    }
  });

  return (
    <group ref={sunGroupRef} position={position}>
      {/* Primary Solar Central Directional Sunlight */}
      <directionalLight
        position={[0, 0, 0]}
        intensity={3.5}
        color="#fff7e6"
        castShadow={false}
      />

      {/* Sun Core Radiance Local Glow */}
      <pointLight
        position={[0, 0, 0]}
        intensity={4.8}
        distance={180}
        color="#ffaa00"
        decay={1.2}
      />

      {/* 1. Photorealistic Sun Core Mesh */}
      <mesh ref={coreRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial map={sunTexture} color="#ffffff" />
      </mesh>

      {/* 2. Inner Solar Corona Rayleigh Glow */}
      <AtmosphereGlow color="#ffaa00" radius={scale * 1.08} power={2.0} opacity={0.9} />

      {/* 3. Outer Luminous Solar Flare Atmosphere Aura */}
      <mesh ref={coronaRef} scale={scale * 1.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ff7b00"
          transparent
          opacity={0.25}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* 4. Solar Prominence Flare Halo Ring */}
      <mesh ref={flareRef} scale={scale * 1.35} rotation={[Math.PI / 4, 0, 0]}>
        <ringGeometry args={[1.0, 1.45, 64]} />
        <meshBasicMaterial
          color="#ffd000"
          transparent
          opacity={0.35}
          blending={AdditiveBlending}
          side={2}
          depthWrite={false}
        />
      </mesh>

      {/* 5. Deep Space Radial Outer Corona Sphere */}
      <mesh scale={scale * 1.8}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.1}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
