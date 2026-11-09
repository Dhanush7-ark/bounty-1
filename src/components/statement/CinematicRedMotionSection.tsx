"use client";

import { HorrorFlameBackground } from "@/components/horror/HorrorFlameBackground";
import { BottomNavigation } from "@/components/horror/BottomNavigation";

/**
 * CinematicRedMotionSection
 * Pure procedural redesign matching the reference video (meermohsin.me):
 * - Full-width horizontal animated flame strip scrolling right-to-left at 60 FPS
 * - Organic flame hands & claw silhouette shapes from reference media
 * - Deep blood-red sky & drifting convective sparks/embers
 * - Bottom audio equalizer barcode & "✕ TENSION ✕ IMMERSION ✕ IMPACT ✕" telemetry
 * - Authentic "ONLINE • Let's Connect" badge
 * - Zero video tags, zero geometric moths, zero blocky artifacts
 */
export function CinematicRedMotionSection() {
  return (
    <section className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[540px] bg-[#000000] overflow-hidden select-none z-20 flex flex-col justify-between border-t border-b border-red-950/30">
      {/* ─── 1. TOP BLEND GRADIENT ─── */}
      <div className="absolute top-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-b from-[#000000] via-[#000000]/70 to-transparent z-10 pointer-events-none" />

      {/* ─── 2. PROCEDURAL 60 FPS FLUID RED FLAME & CLAW DYNAMICS CANVAS ─── */}
      <div className="absolute inset-0 w-full h-full">
        <HorrorFlameBackground className="w-full h-full" interactive={true} />
      </div>

      {/* ─── 3. MINIMAL TOP METRICS / TELEMETRY ─── */}
      <div className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3">
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-[#FF1E38] filter drop-shadow-[0_0_8px_rgba(255,30,56,0.85)]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 50 50 C 42 32, 28 16, 14 12 C 20 28, 28 40, 40 48 C 22 46, 8 54, 4 64 C 18 62, 32 70, 42 80 C 46 68, 48 58, 50 50 Z" />
            <path d="M 50 50 C 58 32, 72 16, 86 12 C 80 28, 72 40, 60 48 C 78 46, 92 54, 96 64 C 82 62, 68 70, 58 80 C 54 68, 52 58, 50 50 Z" />
            <path d="M 50 16 L 50 84" strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill="#FF1E38" />
          </svg>
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.32em] text-[#FF1E38]/90">
            CINEMATIC // FLAME DYNAMICS
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 font-mono text-[10px] text-[#FF1E38]/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF1E38] animate-pulse shadow-[0_0_6px_#FF1E38]" />
          <span>60FPS CONTINUOUS HORIZONTAL SCROLL</span>
        </div>
      </div>

      {/* ─── 4. BOTTOM TELEMETRY BAR (MATCHING EXACT VIDEO) ─── */}
      <BottomNavigation />
    </section>
  );
}
