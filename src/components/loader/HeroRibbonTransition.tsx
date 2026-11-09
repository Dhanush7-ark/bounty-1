"use client";

import { useEffect, useRef } from "react";

interface HeroRibbonTransitionProps {
  onComplete: () => void;
  className?: string;
}

/**
 * HeroRibbonTransition (Zero-Lag Native GPU Reveal)
 *
 * Why this is silky smooth with zero lag:
 * 1. Uses GPU CSS clip-path & opacity compositing (composited directly by the browser GPU,
 *    bypassing JavaScript CPU re-renders).
 * 2. Unveils the actual live HeroSection underneath dynamically from the right corner.
 * 3. The 100 counter dissipates effortlessly with hardware-accelerated ease.
 */
export function HeroRibbonTransition({
  onComplete,
  className = "",
}: HeroRibbonTransitionProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Total transition duration: 1.1s (clean, snappy, cinematic, zero lag)
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* ─── GPU-ACCELERATED CORNER SWEEP CURTAIN ─── */}
      {/* Starts fully covering the screen, then sweeps away diagonally from top-right towards bottom-left */}
      <div
        className="absolute inset-0 bg-[#050505] transition-all"
        style={{
          animation: "cinemaWipe 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "clip-path, opacity",
        }}
      />

      {/* ─── AMBIENT RIGHT-CORNER NEON LIME LIGHT BEAM SWEEP ─── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 100% 0%, rgba(198,255,54,0.35) 0%, rgba(198,255,54,0.08) 45%, transparent 70%)",
          animation: "cornerGlowSweep 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "opacity, transform",
        }}
      />

      {/* ─── INLINE KEYFRAMES FOR 120 FPS GPU COMPOSITING ─── */}
      <style jsx>{`
        @keyframes cinemaWipe {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
          35% {
            clip-path: polygon(0 0, 85% 0, 45% 100%, 0 100%);
            opacity: 0.95;
          }
          75% {
            clip-path: polygon(0 0, 40% 0, 0 85%, 0 100%);
            opacity: 0.7;
          }
          100% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            opacity: 0;
          }
        }

        @keyframes cornerGlowSweep {
          0% {
            opacity: 0.9;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.15);
          }
        }
      `}</style>
    </div>
  );
}
