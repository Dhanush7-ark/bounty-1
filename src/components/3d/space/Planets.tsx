"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

interface SinglePlanetProps {
  position: [number, number, number];
  scale: number;
  rotationSpeed: number;
  color?: string;
  hasRing?: boolean;
}

function PlanetItem({
  position,
  scale,
  rotationSpeed,
  color = "#0a0f0d",
  hasRing = false,
}: SinglePlanetProps) {
  const meshRef = useRef<Mesh>(null);
  const ringRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * rotationSpeed;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (rotationSpeed * 0.5);
    }
  });

  return (
    <group position={position}>
      {/* Dark Planet Mesh with Subtle Surface Texture/Metalness */}
      <mesh ref={meshRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color={color}
          roughness={0.85}
          metalness={0.35}
          emissive="#001a0a"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Atmospheric Rim Halo */}
      <mesh scale={scale * 1.04}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#00FF66"
          transparent
          opacity={0.12}
          wireframe={false}
        />
      </mesh>

      {/* Optional Planetary Ring */}
      {hasRing && (
        <mesh ref={ringRef} scale={scale * 1.9} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.1, 1.4, 64]} />
          <meshBasicMaterial
            color="#00FF66"
            transparent
            opacity={0.15}
            side={2}
          />
        </mesh>
      )}
    </group>
  );
}

export function Planets() {
  return (
    <group>
      {/* Planet 1: Distant Right Planet near Hero/Tech area */}
      <PlanetItem
        position={[25, -8, -75]}
        scale={14}
        rotationSpeed={0.03}
        color="#080c0a"
        hasRing
      />

      {/* Planet 2: Upper Left Deep Space Planet near Tech/Core area */}
      <PlanetItem
        position={[-30, 16, -170]}
        scale={20}
        rotationSpeed={0.02}
        color="#050807"
      />

      {/* Planet 3: Giant Background Horizon Planet near Terminal */}
      <PlanetItem
        position={[0, -45, -310]}
        scale={48}
        rotationSpeed={0.01}
        color="#030504"
        hasRing
      />
    </group>
  );
}
