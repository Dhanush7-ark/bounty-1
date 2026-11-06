"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D } from "three";
import { createAsteroidTexture } from "@/lib/spaceTextures";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface AsteroidFieldProps {
  count?: number;
}

export function AsteroidField({ count = 50 }: AsteroidFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const tempObject = useMemo(() => new Object3D(), []);
  const asteroidBumpMap = useMemo(() => createAsteroidTexture(), []);

  // Compute positions, rotations, and scales for asteroids along the journey tunnel
  const asteroidData = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const side = pseudoRandom(i * 4 + 1) > 0.5 ? 1 : -1;
      const x = (18 + pseudoRandom(i * 4 + 2) * 38) * side;
      const y = (pseudoRandom(i * 4 + 3) - 0.5) * 45;
      const z = 20 - pseudoRandom(i * 4 + 4) * 360;

      const scale = pseudoRandom(i * 4 + 5) * 2.2 + 0.6;
      const rotSpeedX = (pseudoRandom(i * 4 + 6) - 0.5) * 0.35;
      const rotSpeedY = (pseudoRandom(i * 4 + 7) - 0.5) * 0.35;

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
      <dodecahedronGeometry args={[1, 2]} />
      <meshStandardMaterial
        color="#2a3330"
        bumpMap={asteroidBumpMap}
        bumpScale={0.15}
        roughness={0.88}
        metalness={0.25}
      />
    </instancedMesh>
  );
}
