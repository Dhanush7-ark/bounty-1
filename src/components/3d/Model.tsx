"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh, Vector3 } from "three";
import { ModelProps } from "@/types/three";

export function Model({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1.2,
  color = "#84cc16",
  autoRotate = true,
}: ModelProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    if (autoRotate) {
      meshRef.current.rotation.x += delta * 0.3;
      meshRef.current.rotation.y += delta * 0.4;
    }

    let baseY = 0;
    if (Array.isArray(position)) {
      baseY = position[1];
    } else if (position instanceof Vector3) {
      baseY = position.y;
    }

    meshRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
  });

  const computedScale = typeof scale === "number" 
    ? (hovered ? scale * 1.08 : scale) 
    : scale;

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      scale={computedScale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <torusKnotGeometry args={[1, 0.35, 128, 32]} />
      <meshStandardMaterial
        color={hovered ? "#bef264" : color}
        roughness={0.25}
        metalness={0.75}
        wireframe={false}
      />
    </mesh>
  );
}
