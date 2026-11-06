"use client";

import { Suspense, useEffect, useState, useRef } from "react";
import { Canvas as R3FCanvas, useFrame } from "@react-three/fiber";
import { Group } from "three";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { CanvasFallback } from "./CanvasFallback";
import { CameraRig } from "./CameraRig";
import { SpaceLighting } from "./space/SpaceLighting";
import { SpaceDust } from "./space/SpaceDust";
import { Sun } from "./space/Sun";
import { Planets } from "./space/Planets";
import { AsteroidField } from "./space/AsteroidField";
import { Meteors } from "./space/Meteors";
import { SpatialContentNodes } from "./space/SpatialContentNodes";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useWebGL } from "@/hooks/useWebGL";
import { lerp } from "@/lib/utils";

function BackgroundParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Smooth pointer parallax calculation for background objects only
    const pointerX = state.pointer.x;
    const pointerY = state.pointer.y;

    mouseTarget.current.x = lerp(mouseTarget.current.x, pointerX * 2.5, delta * 3);
    mouseTarget.current.y = lerp(mouseTarget.current.y, pointerY * 1.8, delta * 3);

    // Apply smooth position and subtle rotation parallax to 3D space background
    groupRef.current.position.x = mouseTarget.current.x;
    groupRef.current.position.y = -mouseTarget.current.y;
    groupRef.current.rotation.y = mouseTarget.current.x * 0.03;
    groupRef.current.rotation.x = mouseTarget.current.y * 0.03;
  });

  return <group ref={groupRef}>{children}</group>;
}

interface SpaceJourneyProps {
  scrollProgress: number; // 0.0 to 1.0 from GSAP ScrollTrigger
}

export function SpaceJourney({ scrollProgress }: SpaceJourneyProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { isSupported, isLoading } = useWebGL();
  const performanceConfig = usePerformanceTier();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!isMounted || isLoading) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-black" />;
  }

  if (!isSupported) {
    return <CanvasFallback message="Your device or browser does not support WebGL graphics." />;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-black">
      <CanvasErrorBoundary>
        <R3FCanvas
          dpr={performanceConfig.dpr}
          gl={{
            powerPreference: "high-performance",
            antialias: performanceConfig.antialias,
            alpha: false,
          }}
          className="h-full w-full pointer-events-auto"
        >
          <CameraRig progress={scrollProgress} />
          <SpaceLighting />

          <Suspense fallback={null}>
            <BackgroundParallax>
              <Sun position={[26, 14, -45]} scale={10} />
              <SpaceDust count={performanceConfig.particleCount} />
              <Planets />
              <AsteroidField count={performanceConfig.tier === "low" ? 20 : 50} />
              <Meteors count={performanceConfig.tier === "low" ? 8 : 20} />
            </BackgroundParallax>

            <SpatialContentNodes scrollProgress={scrollProgress} />
          </Suspense>
        </R3FCanvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default SpaceJourney;
