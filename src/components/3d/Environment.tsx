"use client";

import { Environment as DreiEnvironment } from "@react-three/drei";
import { EnvironmentProps } from "@/types/three";

export function Environment({ preset = "city", blur = 0.8 }: EnvironmentProps) {
  return <DreiEnvironment preset={preset} environmentIntensity={0.6} blur={blur} />;
}
