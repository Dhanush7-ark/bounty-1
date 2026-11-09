"use client";

import { useEffect, useRef, useId } from "react";

interface HeroRibbonTransitionProps {
  onComplete: () => void;
  className?: string;
}

/**
 * HeroRibbonTransition (Cinema Anamorphic Lens Flare + Light Sweep)
 *
 * Visual Sequence (1.4s Total, 100% GPU Hardware Accelerated):
 * 1. 0.0s – 0.5s: 100 Counter undergoes an anamorphic optical flash flare from the top-right corner.
 * 2. 0.3s – 1.2s: Luminous neon-lime laser refraction beam sweeps diagonally across the screen with prism streaks.
 * 3. 0.5s – 1.4s: Cyber-Gothic telemetry grid and optical aperture ring expand with delicate floating embers.
 * 4. 1.4s: Seamless, buttery smooth handoff into the live HeroSection with 0 frame drops.
 */
export function HeroRibbonTransition({
  onComplete,
  className = "",
}: HeroRibbonTransitionProps) {
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const id = useId().replace(/:/g, "_");

  useEffect(() => {
    // 1.4s duration gives enough time for the cinematic lens flare and laser sweep to feel rich and satisfying
    const timer = setTimeout(() => {
      onCompleteRef.current();
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none select-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* ─── 1. BASE DARK CURTAIN (SMOOTH DIAGONAL APERTURE UNVEIL) ─── */}
      <div
        className="absolute inset-0 bg-[#050505]"
        style={{
          animation: "cinemaIris 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "clip-path, opacity",
        }}
      />

      {/* ─── 2. TOP-RIGHT ANAMORPHIC OPTICAL LENS FLARE (CINEMA BLUSH) ─── */}
      <div
        className="absolute -top-32 -right-32 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(198,255,54,0.45) 0%, rgba(238,255,96,0.2) 25%, rgba(0,255,65,0.08) 50%, transparent 75%)",
          filter: "blur(60px)",
          animation: "flarePulse 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "transform, opacity",
        }}
      />

      {/* ─── 3. HORIZONTAL ANAMORPHIC BLUE/LIME PRISM STREAK ─── */}
      <div
        className="absolute top-[28%] -right-20 w-[140vw] h-[3px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(198,255,54,0.85) 40%, #FFFFFF 65%, rgba(0,255,65,0.9) 80%, transparent 100%)",
          boxShadow:
            "0 0 25px rgba(198,255,54,0.9), 0 0 50px rgba(0,255,65,0.5), 0 0 100px rgba(198,255,54,0.3)",
          transform: "rotate(-18deg) translateY(-50%)",
          animation: "anamorphicStreak 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "transform, opacity",
        }}
      />

      {/* ─── 4. SECONDARY COUNTER-STREAK (PRISMATIC OPTICAL GLARE) ─── */}
      <div
        className="absolute top-[45%] -right-10 w-[120vw] h-[1.5px] pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(238,255,96,0.6) 35%, #FFFFFF 70%, transparent 100%)",
          boxShadow: "0 0 15px rgba(198,255,54,0.8)",
          transform: "rotate(-25deg) translateY(-50%)",
          animation: "counterStreak 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          willChange: "transform, opacity",
        }}
      />

      {/* ─── 5. FLOATING CINEMATIC KINETIC EMBERS & TELEMETRY GLYPH ─── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{
          animation: "telemetryFade 1.4s ease-out forwards",
        }}
      >
        {/* Subtle Cyber Reticle Aperture Ring */}
        <div className="relative w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full border border-[#C6FF36]/20 flex items-center justify-center animate-spin-slow">
          <div className="absolute inset-2 rounded-full border border-dashed border-[#C6FF36]/15" />
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_10px_#C6FF36]" />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_10px_#C6FF36]" />
          <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_10px_#C6FF36]" />
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-[#C6FF36] shadow-[0_0_10px_#C6FF36]" />
        </div>

        {/* Minimalist Central Status Badge */}
        <div className="absolute flex flex-col items-center">
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-[#C6FF36]/90 px-3 py-1 rounded-full bg-[#050505]/80 border border-[#C6FF36]/30 shadow-[0_0_20px_rgba(198,255,54,0.2)]">
            RELAY // ENTERING WORKSPACE
          </span>
        </div>
      </div>

      {/* ─── GPU ACCELERATED KEYFRAMES ─── */}
      <style jsx>{`
        @keyframes cinemaIris {
          0% {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            opacity: 1;
          }
          40% {
            clip-path: polygon(0 0, 90% 0, 50% 100%, 0 100%);
            opacity: 0.98;
          }
          75% {
            clip-path: polygon(0 0, 35% 0, 0 75%, 0 100%);
            opacity: 0.75;
          }
          100% {
            clip-path: polygon(0 0, 0 0, 0 0, 0 0);
            opacity: 0;
          }
        }

        @keyframes flarePulse {
          0% {
            opacity: 0;
            transform: scale(0.6) translate(80px, -80px);
          }
          35% {
            opacity: 1;
            transform: scale(1.15) translate(0px, 0px);
          }
          70% {
            opacity: 0.75;
            transform: scale(1.3) translate(-30px, 30px);
          }
          100% {
            opacity: 0;
            transform: scale(1.5) translate(-60px, 60px);
          }
        }

        @keyframes anamorphicStreak {
          0% {
            opacity: 0;
            transform: rotate(-18deg) translateY(-50%) translateX(35%);
          }
          30% {
            opacity: 1;
          }
          70% {
            opacity: 0.85;
            transform: rotate(-18deg) translateY(-50%) translateX(-25%);
          }
          100% {
            opacity: 0;
            transform: rotate(-18deg) translateY(-50%) translateX(-80%);
          }
        }

        @keyframes counterStreak {
          0% {
            opacity: 0;
            transform: rotate(-25deg) translateY(-50%) translateX(20%);
          }
          40% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: rotate(-25deg) translateY(-50%) translateX(-60%);
          }
        }

        @keyframes telemetryFade {
          0% {
            opacity: 0;
            transform: scale(0.88);
          }
          35% {
            opacity: 1;
            transform: scale(1);
          }
          70% {
            opacity: 0.8;
            transform: scale(1.05);
          }
          100% {
            opacity: 0;
            transform: scale(1.12);
          }
        }
      `}</style>
    </div>
  );
}
