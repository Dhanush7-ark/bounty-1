"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { CanvasFallback } from "./CanvasFallback";
import { CameraRig } from "./CameraRig";
import { SpaceLighting } from "./space/SpaceLighting";
import { SpaceDust } from "./space/SpaceDust";
import { Planets } from "./space/Planets";
import { AsteroidField } from "./space/AsteroidField";
import { Meteors } from "./space/Meteors";
import { SpatialContentNodes } from "./space/SpatialContentNodes";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useWebGL } from "@/hooks/useWebGL";

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
            <SpaceDust count={performanceConfig.particleCount} />
            <Planets />
            <AsteroidField count={performanceConfig.tier === "low" ? 20 : 45} />
            <Meteors count={performanceConfig.tier === "low" ? 8 : 20} />
            <SpatialContentNodes scrollProgress={scrollProgress} />
          </Suspense>
        </R3FCanvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default SpaceJourney;
