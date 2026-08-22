"use client";

import { useEffect, useState } from "react";
import { PerformanceConfig, PerformanceTier } from "@/types/three";

const DEFAULT_CONFIGS: Record<PerformanceTier, PerformanceConfig> = {
  low: {
    tier: "low",
    dpr: [1, 1.25],
    shadows: false,
    shadowMapSize: 512,
    particleCount: 800,
    enablePostProcessing: false,
    antialias: false,
  },
  medium: {
    tier: "medium",
    dpr: [1, 1.5],
    shadows: true,
    shadowMapSize: 1024,
    particleCount: 2000,
    enablePostProcessing: false,
    antialias: true,
  },
  high: {
    tier: "high",
    dpr: [1, 2],
    shadows: true,
    shadowMapSize: 2048,
    particleCount: 4500,
    enablePostProcessing: true,
    antialias: true,
  },
};

export function usePerformanceTier(): PerformanceConfig {
  const [config, setConfig] = useState<PerformanceConfig>(DEFAULT_CONFIGS.high);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const devicePixelRatio = window.devicePixelRatio || 1;

    let tier: PerformanceTier = "high";

    if (width < 768 || (isTouch && width < 1024)) {
      tier = "low";
    } else if (width < 1280 || devicePixelRatio < 1.5) {
      tier = "medium";
    } else {
      tier = "high";
    }

    const timer = requestAnimationFrame(() => {
      setConfig(DEFAULT_CONFIGS[tier]);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return config;
}
