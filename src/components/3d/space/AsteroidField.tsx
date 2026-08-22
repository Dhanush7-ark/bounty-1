"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface AsteroidFieldProps {
  count?: number;
}

export function AsteroidField({ count = 45 }: AsteroidFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const tempObject = useMemo(() => new Object3D(), []);

  // Compute positions, rotations, and scales for asteroids along the journey tunnel
  const asteroidData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      // Keep asteroids away from the center camera path (X: -15..15 is open tunnel)
      const side = pseudoRandom(i * 4 + 1) > 0.5 ? 1 : -1;
      const x = (18 + pseudoRandom(i * 4 + 2) * 35) * side;
      const y = (pseudoRandom(i * 4 + 3) - 0.5) * 40;
      const z = 20 - pseudoRandom(i * 4 + 4) * 340;

      const scale = pseudoRandom(i * 4 + 5) * 1.8 + 0.5;
      const rotSpeedX = (pseudoRandom(i * 4 + 6) - 0.5) * 0.4;
      const rotSpeedY = (pseudoRandom(i * 4 + 7) - 0.5) * 0.4;

      return { x, y, z, scale, rotSpeedX, rotSpeedY };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    asteroidData.forEach((data, i) => {
      tempObject.position.set(data.x, data.y, data.z);
      tempObject.rotation.x += delta * data.rotSpeedX;
      tempObject.rotation.y += delta * data.rotSpeedY;
      tempObject.scale.setScalar(data.scale);
      tempObject.updateMatrix();

      meshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, count]}
      castShadow={false}
      receiveShadow={false}
    >
      <dodecahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#121815"
        roughness={0.9}
        metalness={0.2}
        wireframe={false}
      />
    </instancedMesh>
  );
}
