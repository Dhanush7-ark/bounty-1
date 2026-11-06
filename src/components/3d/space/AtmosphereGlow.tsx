"use client";

import { useMemo } from "react";
import * as THREE from "three";

interface AtmosphereGlowProps {
  color?: string;
  radius?: number;
  coefficient?: number;
  power?: number;
  opacity?: number;
}

/**
 * Photorealistic Rayleigh/Fresnel Atmospheric Glow Shader Component.
 * Creates a soft, continuous Rayleigh atmospheric limb haze around planets.
 */
export function AtmosphereGlow({
  color = "#38bdf8",
  radius = 1.03,
  power = 3.0,
  opacity = 0.6,
}: AtmosphereGlowProps) {
  const atmosphereMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * vec4(vPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uPower;
        uniform float uOpacity;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          vec3 viewDirection = normalize(-vPosition);
          float fresnel = 1.0 - abs(dot(vNormal, viewDirection));
          float intensity = pow(fresnel, uPower);
          gl_FragColor = vec4(uColor, intensity * uOpacity);
        }
      `,
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uPower: { value: power },
        uOpacity: { value: opacity },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.FrontSide,
      depthWrite: false,
    });
  }, [color, power, opacity]);

  return (
    <mesh scale={radius}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={atmosphereMaterial} attach="material" />
    </mesh>
  );
}
