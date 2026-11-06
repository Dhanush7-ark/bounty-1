"use client";

import { useMemo, useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CatmullRomCurve3, Vector3, PerspectiveCamera as ThreePerspectiveCamera } from "three";
import { lerp } from "@/lib/utils";

interface CameraRigProps {
  progress: number; // 0.0 to 1.0 driven by GSAP ScrollTrigger
  onWaypointChange?: (index: number) => void;
}

export function CameraRig({ progress }: CameraRigProps) {
  const cameraRef = useRef<ThreePerspectiveCamera>(null);

  // Define continuous 3D camera journey spline path
  const { pathCurve, lookAtCurve } = useMemo(() => {
    // Camera position waypoints: curves left/sideways from Page 1 to Saturn Planet on Page 2
    const cameraWaypoints = [
      new Vector3(0, 0, 8),        // 0.00: Hero start (Page 1)
      new Vector3(-16, 4, -45),    // 0.18: Sideways flight sweep through deep space
      new Vector3(0, 1, -85),      // 0.38: Arrival in front of Saturn planet & orbital cards (Page 2)
      new Vector3(4, -2, -170),    // 0.65: Approach Core Engine (Page 3)
      new Vector3(0, 0, -265),     // 1.00: Final Destination Space Terminal (Page 4)
    ];

    // Look-at direction waypoints for organic camera orientation
    const lookWaypoints = [
      new Vector3(0, 0, -15),      // 0.00: Looking at Hero Node
      new Vector3(-8, 1, -85),     // 0.18: Orienting towards Saturn planet
      new Vector3(0, 0, -125),     // 0.38: Looking directly at Saturn planet & revolving cards
      new Vector3(0, 0, -210),     // 0.65: Looking at Interactive Core Engine
      new Vector3(0, 0, -320),     // 1.00: Looking down Terminal Horizon
    ];

    const path = new CatmullRomCurve3(cameraWaypoints, false, "centripetal", 0.5);
    const look = new CatmullRomCurve3(lookWaypoints, false, "centripetal", 0.5);

    return { pathCurve: path, lookAtCurve: look };
  }, []);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    // Clamp progress between 0 and 1
    const p = Math.max(0, Math.min(1, progress));

    // Get target position along 3D spline
    const rawPos = pathCurve.getPoint(p);
    const rawLook = lookAtCurve.getPoint(p);

    // Set position strictly according to 3D spline curve (no cursor parallax)
    const targetX = rawPos.x;
    const targetY = rawPos.y;
    const targetZ = rawPos.z;

    // Smooth lerp camera position for smooth trajectory
    const lerpSpeed = Math.min(1, delta * 4.5);
    cameraRef.current.position.x = lerp(cameraRef.current.position.x, targetX, lerpSpeed);
    cameraRef.current.position.y = lerp(cameraRef.current.position.y, targetY, lerpSpeed);
    cameraRef.current.position.z = lerp(cameraRef.current.position.z, targetZ, lerpSpeed);

    // Dynamic FOV adjustments: wider near hero & terminal, slightly narrower in deep space
    const targetFov = 50 + Math.sin(p * Math.PI) * 6;
    cameraRef.current.fov = lerp(cameraRef.current.fov, targetFov, lerpSpeed);
    cameraRef.current.updateProjectionMatrix();

    // Orient camera strictly to look-at trajectory curve
    cameraRef.current.lookAt(rawLook);

    // Keep camera roll steady
    cameraRef.current.rotation.z = 0;
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      fov={50}
      position={[0, 0, 8]}
      near={0.1}
      far={1000}
    />
  );
}
