"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLoadingState } from "@/hooks/useLoadingState";

interface LenisContextValue {
  lenis: Lenis | null;
}

const LenisContext = createContext<LenisContextValue>({ lenis: null });

export function useLenis(): LenisContextValue {
  return useContext(LenisContext);
}

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const { isRevealed } = useLoadingState();

  useEffect(() => {
    // Do not start Lenis until the loading screen has fully revealed
    if (!isRevealed) return;
    if (typeof window === "undefined") return;

    const instance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    const timer = requestAnimationFrame(() => {
      setLenis(instance);
    });

    // Sync Lenis scroll events with GSAP ScrollTrigger
    instance.on("scroll", () => {
      ScrollTrigger.update();
    });

    const updateTicker = (time: number) => {
      instance.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(timer);
      gsap.ticker.remove(updateTicker);
      instance.destroy();
      setLenis(null);
    };
  }, [isRevealed]);

  return (
    <LenisContext.Provider value={{ lenis }}>{children}</LenisContext.Provider>
  );
}
