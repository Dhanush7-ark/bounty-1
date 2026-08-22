"use client";

import { Suspense } from "react";
import { Camera } from "./Camera";
import { Lights } from "./Lights";
import { Environment } from "./Environment";
import { Model } from "./Model";
import { Particles } from "./Particles";
import { Preloader3D } from "./Preloader3D";
import { PerformanceConfig } from "@/types/three";

interface SceneProps {
  performanceConfig: PerformanceConfig;
  onLoaded?: () => void;
}

export function Scene({ performanceConfig, onLoaded }: SceneProps) {
  const { particleCount, shadows, shadowMapSize } = performanceConfig;

  return (
    <>
      <Camera position={[0, 0, 5]} fov={50} />
      <Lights shadowsEnabled={shadows} shadowMapSize={shadowMapSize} />
      <Environment preset="city" />

      <Suspense fallback={<Preloader3D onLoaded={onLoaded} />}>
        <Model position={[0, 0, 0]} scale={1.25} color="#6366f1" autoRotate />
        <Particles count={particleCount} size={0.025} color="#818cf8" />
      </Suspense>
    </>
  );
}
