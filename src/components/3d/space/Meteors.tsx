"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { InstancedMesh, Object3D, Vector3 } from "three";

function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface MeteorData {
  pos: Vector3;
  dir: Vector3;
  speed: number;
  scaleLength: number;
  seed: number;
}

interface MeteorsProps {
  count?: number;
}

export function Meteors({ count = 18 }: MeteorsProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  // Generate initial positions & trajectory directions for shooting star meteors
  const meteors = useMemo<MeteorData[]>(() => {
    return Array.from({ length: count }, (_, i) => {
      const seed = i * 7 + 1;
      const x = (pseudoRandom(seed) - 0.5) * 120;
      const y = (pseudoRandom(seed + 1) - 0.5) * 80;
      const z = 20 - pseudoRandom(seed + 2) * 360;

      // Diagonal streak trajectory vector
      const dirX = (pseudoRandom(seed + 3) - 0.7) * 0.8;
      const dirY = -(pseudoRandom(seed + 4) * 0.6 + 0.4);
      const dirZ = -(pseudoRandom(seed + 5) * 0.8 + 0.3);
      const dir = new Vector3(dirX, dirY, dirZ).normalize();

      const speed = pseudoRandom(seed + 6) * 40 + 25;
      const scaleLength = pseudoRandom(seed + 7) * 4 + 2;

      return {
        pos: new Vector3(x, y, z),
        dir,
        speed,
        scaleLength,
        seed,
      };
    });
  }, [count]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meteors.forEach((m, i) => {
      // Advance meteor along direction trajectory
      m.pos.x += m.dir.x * m.speed * delta;
      m.pos.y += m.dir.y * m.speed * delta;
      m.pos.z += m.dir.z * m.speed * delta;

      // Reset meteor position when it travels out of space bounds
      if (m.pos.y < -50 || m.pos.z < -380 || m.pos.x < -80) {
        const seed = m.seed + Math.random();
        m.pos.set(
          (pseudoRandom(seed) - 0.3) * 100,
          35 + pseudoRandom(seed + 1) * 25,
          10 - pseudoRandom(seed + 2) * 340
        );
      }

      // Position, orient and scale the elongated meteor streak
      dummy.position.copy(m.pos);
      dummy.lookAt(m.pos.clone().add(m.dir));
      dummy.scale.set(0.06, 0.06, m.scaleLength);
      dummy.updateMatrix();

      meshRef.current?.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <cylinderGeometry args={[0.02, 0.25, 1, 8]} />
      <meshBasicMaterial
        color="#00FF66"
        transparent
        opacity={0.85}
        wireframe={false}
      />
    </instancedMesh>
  );
}
