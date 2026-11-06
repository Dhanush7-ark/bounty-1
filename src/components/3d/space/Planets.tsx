"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Group } from "three";
import {
  createEarthTexture,
  createEarthCloudsTexture,
  createJupiterTexture,
  createMarsTexture,
  createNeptuneTexture,
} from "@/lib/spaceTextures";
import { AtmosphereGlow } from "./AtmosphereGlow";

/**
 * 1. Photorealistic Earth Component with independent swirling clouds & blue Rayleigh atmosphere
 */
function EarthPlanet({ position, scale }: { position: [number, number, number]; scale: number }) {
  const planetRef = useRef<Mesh>(null);
  const cloudRef = useRef<Mesh>(null);

  const earthTexture = useMemo(() => createEarthTexture(), []);
  const cloudsTexture = useMemo(() => createEarthCloudsTexture(), []);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.04;
    if (cloudRef.current) cloudRef.current.rotation.y += delta * 0.06;
  });

  return (
    <group position={position}>
      {/* Earth Surface */}
      <mesh ref={planetRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.5}
          metalness={0.2}
          emissive="#031226"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Earth Swirling White Clouds Layer */}
      <mesh ref={cloudRef} scale={scale * 1.02}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshStandardMaterial
          map={cloudsTexture}
          transparent
          opacity={0.8}
          roughness={1.0}
        />
      </mesh>

      {/* Rayleigh Blue Atmosphere Glow */}
      <AtmosphereGlow color="#38bdf8" radius={scale * 1.07} coefficient={0.8} power={3.0} />
    </group>
  );
}

/**
 * 2. Photorealistic Jupiter Gas Giant with Great Red Spot & Atmospheric Bands
 */
function JupiterPlanet({ position, scale }: { position: [number, number, number]; scale: number }) {
  const planetRef = useRef<Mesh>(null);
  const jupiterTexture = useMemo(() => createJupiterTexture(), []);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.05;
  });

  return (
    <group position={position}>
      <mesh ref={planetRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={jupiterTexture}
          roughness={0.6}
          metalness={0.1}
          emissive="#1f1105"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Golden Amber Atmosphere Glow */}
      <AtmosphereGlow color="#f59e0b" radius={scale * 1.05} coefficient={0.75} power={3.2} />
    </group>
  );
}

/**
 * 3. Photorealistic Mars Component with Polar Caps & Rusty Craters
 */
function MarsPlanet({ position, scale }: { position: [number, number, number]; scale: number }) {
  const planetRef = useRef<Mesh>(null);
  const marsTexture = useMemo(() => createMarsTexture(), []);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.03;
  });

  return (
    <group position={position}>
      <mesh ref={planetRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={marsTexture}
          roughness={0.85}
          metalness={0.15}
          emissive="#260803"
          emissiveIntensity={0.2}
        />
      </mesh>
      {/* Copper Red Atmosphere Glow */}
      <AtmosphereGlow color="#ef4444" radius={scale * 1.06} coefficient={0.8} power={3.5} />
    </group>
  );
}

/**
 * 4. Photorealistic Neptune Ice Giant Component
 */
function NeptunePlanet({ position, scale }: { position: [number, number, number]; scale: number }) {
  const planetRef = useRef<Mesh>(null);
  const neptuneTexture = useMemo(() => createNeptuneTexture(), []);

  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.04;
  });

  return (
    <group position={position}>
      <mesh ref={planetRef} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          map={neptuneTexture}
          roughness={0.4}
          metalness={0.2}
          emissive="#031633"
          emissiveIntensity={0.25}
        />
      </mesh>
      {/* Azure Cyan Atmosphere Glow */}
      <AtmosphereGlow color="#0284c7" radius={scale * 1.06} coefficient={0.75} power={3.0} />
    </group>
  );
}

export function Planets() {
  return (
    <group>
      {/* Planet 1: Earth (Blue Marble) near initial Space Flight trajectory */}
      <EarthPlanet position={[-24, 8, -55]} scale={11} />

      {/* Planet 2: Jupiter (Gas Giant) deep right space near tech stack */}
      <JupiterPlanet position={[32, -12, -175]} scale={22} />

      {/* Planet 3: Mars (Red Planet) upper left deep space */}
      <MarsPlanet position={[-34, 16, -240]} scale={13} />

      {/* Planet 4: Neptune (Ice Giant) distant horizon near space terminal */}
      <NeptunePlanet position={[38, -25, -320]} scale={28} />
    </group>
  );
}
