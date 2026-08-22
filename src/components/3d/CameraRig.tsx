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

  // Mouse offset target for subtle organic pointer parallax
  const mouseTarget = useRef({ x: 0, y: 0 });

  // Define continuous 3D camera journey spline path
  const { pathCurve, lookAtCurve } = useMemo(() => {
    // Camera position waypoints through the universe
    const cameraWaypoints = [
      new Vector3(0, 0, 8),        // 0.00: Hero start
      new Vector3(2.5, 1.2, -35),   // 0.20: Approach Tech cluster
      new Vector3(-3.0, 0.8, -100), // 0.45: Deep space planet horizon
      new Vector3(2.0, -1.2, -180), // 0.70: Approach Core Engine
      new Vector3(0, 0, -265),      // 1.00: Final Destination Space Terminal
    ];

    // Look-at direction waypoints for organic camera orientation
    const lookWaypoints = [
      new Vector3(0, 0, -15),      // 0.00: Looking at Hero Node
      new Vector3(0, 0, -60),      // 0.20: Looking toward Tech Cards
      new Vector3(-5, 0, -135),    // 0.45: Looking toward Dark Planet
      new Vector3(0, 0, -210),     // 0.70: Looking at Interactive Core
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

    // Smooth pointer parallax offset calculation
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    mouseTarget.current.x = lerp(mouseTarget.current.x, pointerX * 1.5, delta * 3);
    mouseTarget.current.y = lerp(mouseTarget.current.y, pointerY * 1.0, delta * 3);

    // Apply combined position (Spline + Lerped Mouse Parallax)
    const targetX = rawPos.x + mouseTarget.current.x;
    const targetY = rawPos.y - mouseTarget.current.y;
    const targetZ = rawPos.z;

    // Smooth lerp camera position for expensive, inertia-rich feel
    const lerpSpeed = Math.min(1, delta * 4.5);
    cameraRef.current.position.x = lerp(cameraRef.current.position.x, targetX, lerpSpeed);
    cameraRef.current.position.y = lerp(cameraRef.current.position.y, targetY, lerpSpeed);
    cameraRef.current.position.z = lerp(cameraRef.current.position.z, targetZ, lerpSpeed);

    // Dynamic FOV adjustments: wider near hero & terminal, slightly narrower in deep space
    const targetFov = 50 + Math.sin(p * Math.PI) * 6;
    cameraRef.current.fov = lerp(cameraRef.current.fov, targetFov, lerpSpeed);
    cameraRef.current.updateProjectionMatrix();

    // Orient camera to look-at target with subtle roll tilt
    const currentLook = new Vector3(
      rawLook.x + mouseTarget.current.x * 0.5,
      rawLook.y - mouseTarget.current.y * 0.5,
      rawLook.z
    );

    cameraRef.current.lookAt(currentLook);

    // Add controlled roll tilt based on lateral movement
    cameraRef.current.rotation.z = mouseTarget.current.x * -0.02;
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
