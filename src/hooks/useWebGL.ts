"use client";

import { useEffect, useState } from "react";
import { isWebGLAvailable } from "@/lib/three";

export function useWebGL(): { isSupported: boolean; isLoading: boolean } {
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const supported = isWebGLAvailable();
    const timer = requestAnimationFrame(() => {
      setIsSupported(supported);
      setIsLoading(false);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  return { isSupported, isLoading };
}
