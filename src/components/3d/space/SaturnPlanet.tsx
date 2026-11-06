"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, Mesh, DoubleSide } from "three";
import { createSaturnBodyTexture, createSaturnRingsTexture } from "@/lib/spaceTextures";
import { AtmosphereGlow } from "./AtmosphereGlow";

interface SaturnPlanetProps {
  position?: [number, number, number];
  scale?: number;
  opacity?: number;
}

export function SaturnPlanet({
  position = [0, 0, -125],
  scale = 8.5,
  opacity = 1.0,
}: SaturnPlanetProps) {
  const planetGroupRef = useRef<Group>(null);
  const coreRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  // Generate high-definition procedural Saturn textures
  const saturnBodyTexture = useMemo(() => createSaturnBodyTexture(), []);
  const saturnRingsTexture = useMemo(() => createSaturnRingsTexture(), []);

  useFrame((_, delta) => {
    if (planetGroupRef.current) {
      // Axial rotation
      planetGroupRef.current.rotation.y += delta * 0.08;
    }
    if (ringRef.current) {
      // Subtle ring tilt drift
      ringRef.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group position={position} ref={planetGroupRef}>
      {/* Local Soft Ambient Lighting for Saturn */}
      <pointLight
        position={[15, 10, 15]}
        intensity={2.2 * opacity}
        distance={60}
        color="#fef08a"
      />

      {/* 1. Photorealistic Saturn Core Planet Body */}
      <mesh ref={coreRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={saturnBodyTexture}
          roughness={0.6}
          metalness={0.15}
          emissive="#1a1408"
          emissiveIntensity={0.25 * opacity}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* 2. Saturn Rayleigh Atmospheric Golden Atmosphere Rim Glow */}
      <AtmosphereGlow
        color="#eab308"
        radius={scale * 1.05}
        coefficient={0.75}
        power={3.2}
        opacity={0.7 * opacity}
      />

      {/* 3. Photorealistic Saturn Rings System (Tilted at 24.7 degrees) */}
      <group rotation={[Math.PI / 6, Math.PI / 12, -Math.PI / 16]}>
        {/* Main High-Res Saturn Rings */}
        <mesh ref={ringRef} scale={scale * 2.3}>
          <ringGeometry args={[1.18, 2.35, 128]} />
          <meshStandardMaterial
            map={saturnRingsTexture}
            roughness={0.4}
            metalness={0.2}
            emissive="#451a03"
            emissiveIntensity={0.15 * opacity}
            transparent
            opacity={0.9 * opacity}
            side={DoubleSide}
            depthWrite={true}
          />
        </mesh>

        {/* Translucent Outer Ring Dust Halo */}
        <mesh scale={scale * 2.5}>
          <ringGeometry args={[2.35, 2.7, 96]} />
          <meshBasicMaterial
            color="#38bdf8"
            transparent
            opacity={0.15 * opacity}
            side={DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
