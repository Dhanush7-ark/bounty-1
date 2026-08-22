import { Object3D, Mesh, Material, BufferGeometry, Texture } from "three";

/**
 * Safely checks if WebGL context is supported in the current browser environment.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * Recursively disposes of Three.js object geometries, materials, and textures
 * to prevent memory leaks during unmounts.
 */
export function disposeThreeObject(object: Object3D): void {
  if (!object) return;

  object.traverse((child) => {
    if (child instanceof Mesh) {
      if (child.geometry instanceof BufferGeometry) {
        child.geometry.dispose();
      }

      if (Array.isArray(child.material)) {
        child.material.forEach((mat) => disposeMaterial(mat));
      } else if (child.material instanceof Material) {
        disposeMaterial(child.material);
      }
    }
  });
}

function disposeMaterial(material: Material): void {
  material.dispose();

  // Dispose attached textures
  Object.keys(material).forEach((key) => {
    const value = (material as unknown as Record<string, unknown>)[key];
    if (value && typeof value === "object" && value instanceof Texture) {
      value.dispose();
    }
  });
}
