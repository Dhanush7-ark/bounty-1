export interface Waypoint {
  id: string;
  label: string;
  progress: number; // 0.0 to 1.0
  position: [number, number, number];
  rotation: [number, number, number];
  fov: number;
}

export interface SpatialCardData {
  title: string;
  description: string;
  tag: string;
  position: [number, number, number];
  rotation?: [number, number, number];
}

export interface PlanetConfig {
  position: [number, number, number];
  radius: number;
  color: string;
  rimColor: string;
  rotationSpeed: number;
  name?: string;
}

export interface AsteroidConfig {
  position: [number, number, number];
  scale: number;
  rotationSpeed: [number, number, number];
}
