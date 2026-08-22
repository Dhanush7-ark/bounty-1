"use client";

import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera as ThreePerspectiveCamera, Vector3 } from "three";

interface CameraProps {
  fov?: number;
  position?: [number, number, number];
  makeDefault?: boolean;
}

export function Camera({ fov = 50, position = [0, 0, 6], makeDefault = true }: CameraProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);
  const targetVector = useRef(new Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Smooth pointer parallax effect
    const { x, y } = state.pointer;
    targetVector.current.set(x * 0.5, y * 0.3, position[2]);

    cameraRef.current.position.lerp(targetVector.current, Math.min(1, delta * 3));
    cameraRef.current.lookAt(0, 0, 0);
  });

  return (
    <PerspectiveCamera ref={cameraRef} makeDefault={makeDefault} fov={fov} position={position} />
  );
}
