"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { SpaceJourney } from "@/components/3d/SpaceJourney";
import { SpaceHUD } from "@/components/layout/SpaceHUD";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "@/hooks/useLenis";
import { useLoadingState } from "@/hooks/useLoadingState";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { lenis } = useLenis();
  const { isRevealed } = useLoadingState();

  useEffect(() => {
    if (!isRevealed || !containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [isRevealed]);

  const handleJumpToWaypoint = useCallback(
    (targetProgress: number) => {
      if (typeof window === "undefined") return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const targetY = targetProgress * totalScroll;

      if (lenis) {
        lenis.scrollTo(targetY, { duration: 1.8 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    },
    [lenis]
  );

  return (
    <div ref={containerRef} className="relative min-h-[600vh] bg-black text-white">
      {/* Spacecraft Minimal HUD Overlay */}
      <SpaceHUD
        scrollProgress={scrollProgress}
        onJumpToWaypoint={handleJumpToWaypoint}
      />

      {/* 3D Continuous Space Journey Canvas */}
      <SpaceJourney scrollProgress={scrollProgress} />
    </div>
  );
}
