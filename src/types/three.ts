import { Vector3, Color } from "three";

export type PerformanceTier = "low" | "medium" | "high";

export interface PerformanceConfig {
  tier: PerformanceTier;
  dpr: [number, number];
  shadows: boolean;
  shadowMapSize: number;
  particleCount: number;
  enablePostProcessing: boolean;
  antialias: boolean;
}

export interface SceneConfig {
  background?: string | Color;
  fov?: number;
  cameraPosition?: [number, number, number];
  fogColor?: string;
  fogNear?: number;
  fogFar?: number;
}

export interface ModelProps {
  position?: [number, number, number] | Vector3;
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  wireframe?: boolean;
  color?: string;
  autoRotate?: boolean;
  onPointerOver?: () => void;
  onPointerOut?: () => void;
}

export interface ParticlesProps {
  count?: number;
  size?: number;
  color?: string;
  speed?: number;
  areaScale?: [number, number, number];
}

export interface LightsProps {
  shadowsEnabled?: boolean;
  shadowMapSize?: number;
  ambientIntensity?: number;
  directionalIntensity?: number;
}

export interface EnvironmentProps {
  preset?:
    | "sunset"
    | "dawn"
    | "night"
    | "warehouse"
    | "forest"
    | "apartment"
    | "studio"
    | "city"
    | "park"
    | "lobby";
  blur?: number;
  background?: boolean;
}
