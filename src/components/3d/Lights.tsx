"use client";

import { LightsProps } from "@/types/three";

export function Lights({
  shadowsEnabled = true,
  shadowMapSize = 1024,
  ambientIntensity = 0.5,
  directionalIntensity = 1.5,
}: LightsProps) {
  return (
    <>
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={directionalIntensity}
        castShadow={shadowsEnabled}
        shadow-mapSize-width={shadowMapSize}
        shadow-mapSize-height={shadowMapSize}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-10, -10, -5]} intensity={0.6} color="#84cc16" />
      <directionalLight position={[0, -5, 5]} intensity={0.4} color="#a3e635" />
    </>
  );
}
