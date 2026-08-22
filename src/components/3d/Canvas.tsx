"use client";

import { useEffect, useState } from "react";
import { Canvas as R3FCanvas } from "@react-three/fiber";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { CanvasFallback } from "./CanvasFallback";
import { Scene } from "./Scene";
import { usePerformanceTier } from "@/hooks/usePerformanceTier";
import { useWebGL } from "@/hooks/useWebGL";

interface CanvasContainerProps {
  className?: string;
  onLoaded?: () => void;
}

export function CanvasContainer({ className, onLoaded }: CanvasContainerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const { isSupported, isLoading } = useWebGL();
  const performanceConfig = usePerformanceTier();

  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  if (!isMounted || isLoading) {
    return <div className="fixed inset-0 pointer-events-none z-0 bg-slate-950" />;
  }

  if (!isSupported) {
    return <CanvasFallback message="Your device or browser does not support WebGL graphics." />;
  }

  return (
    <div className={className || "fixed inset-0 pointer-events-none z-0"}>
      <CanvasErrorBoundary>
        <R3FCanvas
          dpr={performanceConfig.dpr}
          shadows={performanceConfig.shadows}
          gl={{
            powerPreference: "high-performance",
            antialias: performanceConfig.antialias,
            alpha: true,
          }}
          className="h-full w-full pointer-events-auto"
        >
          <Scene performanceConfig={performanceConfig} onLoaded={onLoaded} />
        </R3FCanvas>
      </CanvasErrorBoundary>
    </div>
  );
}

export default CanvasContainer;
