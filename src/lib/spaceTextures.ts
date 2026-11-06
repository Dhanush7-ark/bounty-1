"use client";

import * as THREE from "three";

/**
 * Procedural texture generators for photorealistic space elements.
 * Generated on 2D HTML5 Canvas elements to ensure fast, 100% offline-ready high-res rendering.
 */

// Helper to create dummy canvas for SSR safety
function getSafeCanvas(): HTMLCanvasElement {
  if (typeof document !== "undefined") {
    return document.createElement("canvas");
  }
  return {} as HTMLCanvasElement;
}

// Helper to create a noise function using sine/cosine harmonics
function fbmNoise(x: number, y: number, octaves = 4): number {
  let value = 0;
  let amplitude = 0.5;
  let frequency = 1;
  for (let i = 0; i < octaves; i++) {
    value +=
      amplitude *
      (Math.sin(x * frequency * 1.3 + Math.cos(y * frequency * 0.9)) * 0.5 +
        0.5);
    frequency *= 2.1;
    amplitude *= 0.5;
  }
  return value;
}

/**
 * 1. Photorealistic Sun Surface Texture (Solar Plasma & Granualtion)
 */
export function createSunTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;

      // Solar turbulent plasma noise
      const n1 = fbmNoise(nx * 12, ny * 12, 4);
      const n2 = fbmNoise(nx * 24 + 1.5, ny * 24 + 0.8, 3);
      const plasma = n1 * 0.65 + n2 * 0.35;

      // Sunspot dark regions
      const spotNoise = fbmNoise(nx * 6 + 4.2, ny * 6 + 2.1, 3);
      const isSunspot = spotNoise > 0.78 ? (spotNoise - 0.78) * 4 : 0;

      // Color gradient from fiery yellow-orange (#fff2a3) to deep solar red (#d93800)
      let r = Math.min(255, 255 * (0.85 + plasma * 0.3));
      let g = Math.min(255, 255 * (0.45 + plasma * 0.55));
      let b = Math.min(255, 255 * (0.05 + plasma * 0.25));

      // Apply sunspot darkening
      if (isSunspot > 0) {
        r *= Math.max(0.2, 1 - isSunspot);
        g *= Math.max(0.1, 1 - isSunspot * 1.2);
        b *= Math.max(0.05, 1 - isSunspot * 1.5);
      }

      const index = (y * width + x) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 2. Photorealistic Earth (Oceans, Green/Brown Continents)
 */
export function createEarthTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const latitude = Math.abs(ny - 0.5) * 2; // 0 at equator, 1 at poles

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      // Continental elevation noise
      const elev = fbmNoise(nx * 8, ny * 8, 5);
      const detail = fbmNoise(nx * 20 + 3, ny * 20 + 5, 3);

      const isLand = elev > 0.48;

      let r = 0;
      let g = 0;
      let b = 0;

      if (isLand) {
        // Polar ice caps
        if (latitude > 0.82) {
          r = 240;
          g = 248;
          b = 255;
        } else if (latitude > 0.65) {
          // Tundra / Taiga
          r = 110 + detail * 40;
          g = 125 + detail * 35;
          b = 95;
        } else {
          // Lush land & desert belts
          const isDesert = fbmNoise(nx * 5 + 10, ny * 5 + 2, 3) > 0.58;
          if (isDesert) {
            r = 195 + detail * 30;
            g = 160 + detail * 25;
            b = 105 + detail * 20;
          } else {
            // Green forests & savannah
            r = 35 + detail * 50;
            g = 115 + detail * 60;
            b = 45 + detail * 30;
          }
        }
      } else {
        // Deep oceans with coastal shelf gradient
        const depth = (0.48 - elev) / 0.48;
        if (depth < 0.08) {
          // Shallow Turquoise coastal shelf
          r = 15;
          g = 120 + depth * 400;
          b = 175;
        } else {
          // Deep abyssal ocean blue
          r = 5 + (1 - depth) * 15;
          g = 35 + (1 - depth) * 45;
          b = 110 + (1 - depth) * 90;
        }

        // Polar sea ice
        if (latitude > 0.88) {
          r = 220;
          g = 235;
          b = 250;
        }
      }

      const index = (y * width + x) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 3. Earth Swirling Cloud Layer Texture
 */
export function createEarthCloudsTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;

      // Swirling atmospheric cloud patterns
      const cloudNoise = fbmNoise(nx * 10 + Math.sin(ny * Math.PI * 4) * 0.4, ny * 8, 5);
      const density = cloudNoise > 0.52 ? (cloudNoise - 0.52) / 0.48 : 0;
      const alpha = Math.min(240, Math.pow(density, 1.2) * 255);

      const index = (y * width + x) * 4;
      data[index] = 255;
      data[index + 1] = 255;
      data[index + 2] = 255;
      data[index + 3] = alpha;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 4. Jupiter Gas Giant Swirling Band Texture
 */
export function createJupiterTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;

    // Atmospheric jet-stream turbulence shift
    const turbulence = Math.sin(ny * Math.PI * 24) * 0.04 + fbmNoise(ny * 15, 0, 3) * 0.06;

    for (let x = 0; x < width; x++) {
      const nx = (x / width + turbulence) % 1.0;

      // Horizontal cloud bands
      const bandFreq = Math.sin(ny * Math.PI * 18 + fbmNoise(nx * 8, ny * 12, 3) * 2.5);
      const detail = fbmNoise(nx * 16, ny * 22, 4);

      // Great Red Spot (located at lat ~0.65, lon ~0.45)
      const dx = (nx - 0.45) * 4.5;
      const dy = (ny - 0.68) * 8;
      const distRedSpot = Math.sqrt(dx * dx + dy * dy);
      const isRedSpot = distRedSpot < 0.45;

      let r = 210 + bandFreq * 35 + detail * 20;
      let g = 150 + bandFreq * 45 + detail * 15;
      let b = 100 + bandFreq * 30 + detail * 10;

      // Dark brown belts vs white zones
      if (bandFreq < -0.2) {
        r = 160 + detail * 30;
        g = 95 + detail * 20;
        b = 60 + detail * 15;
      } else if (bandFreq > 0.3) {
        r = 235 + detail * 15;
        g = 215 + detail * 20;
        b = 185 + detail * 25;
      }

      // Render Great Red Spot swirl
      if (isRedSpot) {
        const spotIntensity = 1 - distRedSpot / 0.45;
        r = Math.min(255, 220 + spotIntensity * 35);
        g = Math.max(40, 70 - spotIntensity * 30);
        b = Math.max(30, 50 - spotIntensity * 20);
      }

      const index = (y * width + x) * 4;
      data[index] = Math.min(255, r);
      data[index + 1] = Math.min(255, g);
      data[index + 2] = Math.min(255, b);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 5. Saturn Gas Giant Banded Body Texture
 */
export function createSaturnBodyTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const lat = Math.abs(ny - 0.5) * 2;

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      const bandNoise = Math.sin(ny * Math.PI * 14 + fbmNoise(nx * 6, ny * 10, 3) * 1.2);
      const micro = fbmNoise(nx * 20, ny * 30, 3) * 15;

      // Golden ochre, soft amber, beige and butterscotch atmosphere tones
      let r = 215 + bandNoise * 25 + micro;
      let g = 180 + bandNoise * 30 + micro;
      let b = 125 + bandNoise * 20 + micro;

      // Polar storm caps (bluish-grey hexagon atmospheric caps)
      if (lat > 0.85) {
        r = 120 + micro;
        g = 145 + micro;
        b = 160 + micro;
      }

      const index = (y * width + x) * 4;
      data[index] = Math.min(255, Math.max(0, r));
      data[index + 1] = Math.min(255, Math.max(0, g));
      data[index + 2] = Math.min(255, Math.max(0, b));
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 6. Photorealistic Saturn Rings Texture (Cassini Division & Fine Particle Bands)
 */
export function createSaturnRingsTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let x = 0; x < width; x++) {
    const rPos = x / width;

    let alpha = 0;
    let r = 220;
    let g = 195;
    let b = 150;

    if (rPos < 0.15) {
      alpha = (rPos / 0.15) * 0.35;
      r = 160;
      g = 145;
      b = 120;
    } else if (rPos >= 0.15 && rPos < 0.65) {
      const bandNoise = fbmNoise(rPos * 120, 0, 3);
      alpha = 0.75 + bandNoise * 0.25;
      r = 230 + bandNoise * 25;
      g = 205 + bandNoise * 20;
      b = 160 + bandNoise * 15;
    } else if (rPos >= 0.65 && rPos < 0.73) {
      alpha = 0.05;
      r = 40;
      g = 35;
      b = 30;
    } else if (rPos >= 0.73 && rPos < 0.95) {
      if (Math.abs(rPos - 0.87) < 0.015) {
        alpha = 0.08;
      } else {
        const bandNoise = fbmNoise(rPos * 80, 0, 3);
        alpha = 0.55 + bandNoise * 0.25;
        r = 210 + bandNoise * 20;
        g = 185 + bandNoise * 20;
        b = 145 + bandNoise * 15;
      }
    } else {
      alpha = Math.max(0, (1 - rPos) / 0.05) * 0.3;
    }

    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 4;
      data[index] = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = Math.floor(alpha * 255);
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 7. Photorealistic Mars Texture (Red Craters & Ice Caps)
 */
export function createMarsTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    const lat = Math.abs(ny - 0.5) * 2;

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      const terrain = fbmNoise(nx * 10, ny * 10, 5);
      const detail = fbmNoise(nx * 25, ny * 25, 3);

      let r = 180 + terrain * 50 + detail * 20;
      let g = 75 + terrain * 35 + detail * 15;
      let b = 40 + terrain * 20 + detail * 10;

      if (terrain < 0.42) {
        r = 120 + detail * 30;
        g = 50 + detail * 20;
        b = 30 + detail * 15;
      }

      if (lat > 0.83) {
        r = 235 + detail * 20;
        g = 240 + detail * 15;
        b = 245 + detail * 10;
      }

      const index = (y * width + x) * 4;
      data[index] = Math.min(255, r);
      data[index + 1] = Math.min(255, g);
      data[index + 2] = Math.min(255, b);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 8. Photorealistic Neptune Texture (Deep Cerulean Ice Giant)
 */
export function createNeptuneTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;

    for (let x = 0; x < width; x++) {
      const nx = x / width;

      const band = Math.sin(ny * Math.PI * 8);
      const cloud = fbmNoise(nx * 12 + band * 0.2, ny * 12, 4);

      let r = 25 + cloud * 45;
      let g = 85 + band * 25 + cloud * 55;
      let b = 210 + cloud * 45;

      if (cloud > 0.68) {
        r = 180 + cloud * 75;
        g = 220 + cloud * 35;
        b = 255;
      }

      const index = (y * width + x) * 4;
      data[index] = Math.min(255, r);
      data[index + 1] = Math.min(255, g);
      data[index + 2] = Math.min(255, b);
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

/**
 * 9. Asteroid Surface Bump Map
 */
export function createAsteroidTexture(): THREE.CanvasTexture {
  const canvas = getSafeCanvas();
  if (typeof window === "undefined" || !canvas.getContext) return new THREE.CanvasTexture(canvas);

  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  const width = canvas.width;
  const height = canvas.height;
  const imgData = ctx.createImageData(width, height);
  const data = imgData.data;

  for (let y = 0; y < height; y++) {
    const ny = y / height;
    for (let x = 0; x < width; x++) {
      const nx = x / width;

      const crater = fbmNoise(nx * 14, ny * 14, 5);
      const val = Math.floor(60 + crater * 140);

      const index = (y * width + x) * 4;
      data[index] = val;
      data[index + 1] = val;
      data[index + 2] = val;
      data[index + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}
