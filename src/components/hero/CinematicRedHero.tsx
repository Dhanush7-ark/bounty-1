"use client";

import { useState } from "react";
import { ArrowRight, Terminal, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { RedFlameCanvas } from "@/components/red-hero/RedFlameCanvas";

interface CinematicRedHeroProps {
  onStartFree?: () => void;
  onWatchBuild?: () => void;
}

/**
 * CinematicRedHero
 * Full-screen Cinematic Red & Black Animated Hero Section.
 *
 * Implements 100% of the User Specification:
 * - Pure black viewport background (#000000)
 * - Large irregular deep-red flame silhouettes along the top edge extending downward
 * - Gradients from dark crimson (#8B0000) to intense blood red (#FF1A00)
 * - Burning liquid / torn paper / ink spreading organic contours
 * - 3 overlapping parallax layers deforming with procedural Simplex noise at 60 FPS
 * - Large black negative space (flames concentrated in top 20–35%)
 * - Centered minimal futuristic typography in white & blood red
 * - Minimalist symbols & cyber-sigils inspired by the reference video
 * - Barcode equalizer & "+ TENSION + IMMERSION + IMPACT +" telemetry footer
 */
export function CinematicRedHero({
  onStartFree,
  onWatchBuild,
}: CinematicRedHeroProps) {
  const [hoveredButton, setHoveredButton] = useState(false);

  // Equalizer barcode heights for the bottom-left telemetry in blood red
  const equalizerBars = [
    { id: 1, h: "8px", dur: "0.8s" },
    { id: 2, h: "16px", dur: "1.15s" },
    { id: 3, h: "11px", dur: "0.7s" },
    { id: 4, h: "19px", dur: "1.3s" },
    { id: 5, h: "14px", dur: "0.9s" },
    { id: 6, h: "10px", dur: "1.2s" },
    { id: 7, h: "17px", dur: "0.65s" },
    { id: 8, h: "13px", dur: "1.05s" },
    { id: 9, h: "16px", dur: "0.75s" },
    { id: 10, h: "9px", dur: "1.1s" },
    { id: 11, h: "18px", dur: "0.85s" },
    { id: 12, h: "12px", dur: "1.0s" },
    { id: 13, h: "15px", dur: "0.95s" },
    { id: 14, h: "18px", dur: "1.25s" },
    { id: 15, h: "10px", dur: "0.7s" },
    { id: 16, h: "17px", dur: "1.15s" },
    { id: 17, h: "14px", dur: "0.8s" },
    { id: 18, h: "19px", dur: "1.35s" },
    { id: 19, h: "11px", dur: "0.9s" },
    { id: 20, h: "16px", dur: "1.05s" },
  ];

  return (
    <section className="relative w-full h-screen min-h-[720px] max-h-[1100px] flex flex-col justify-between overflow-hidden bg-[#000000] z-20 select-none">
      {/* ─── 1. PROCEDURAL TOP-EXTENDING RED FLAME CANVAS (60 FPS) ─── */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        <RedFlameCanvas className="w-full h-full" interactive={true} />
      </div>

      {/* ─── 2. TOP STATUS ROW: MINIMALIST CYBER-SIGIL & METRICS ─── */}
      <div className="relative z-30 pt-6 sm:pt-8 px-6 sm:px-12 flex items-center justify-between w-full max-w-7xl mx-auto pointer-events-none">
        {/* Cyber-Gothic Butterfly Sigil in Intense Blood Red */}
        <div className="flex items-center gap-3">
          <svg
            className="w-7 h-7 text-[#FF1A00] filter drop-shadow-[0_0_10px_rgba(255,26,0,0.8)]"
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
            <circle cx="50" cy="50" r="3" fill="#FF1A00" />
          </svg>
          <span className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.35em] text-[#FF1A00]/95 font-semibold">
            RELAY // CINEMATIC KINETICS
          </span>
        </div>

        {/* Status Pill Right */}
        <div className="hidden sm:flex items-center gap-3 font-mono text-[11px] text-neutral-400">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A0002]/85 border border-[#FF1A00]/30 backdrop-blur-sm shadow-[0_0_14px_rgba(255,26,0,0.2)] text-[#FF1A00]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A00] animate-pulse shadow-[0_0_8px_#FF1A00]" />
            <span>01 &nbsp;//&nbsp; BLOOD FLAME MATRIX</span>
          </span>
        </div>
      </div>

      {/* ─── 3. CENTERPIECE: MINIMAL FUTURISTIC TYPOGRAPHY IN NEGATIVE SPACE ─── */}
      <div className="relative z-30 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center my-auto py-4 pointer-events-none">
        {/* Minimal Pre-Title Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1F0003]/85 border border-[#FF1A00]/35 text-xs font-mono text-[#FF1A00] mb-6 sm:mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(255,26,0,0.25)]"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FF1A00]" />
          <span className="tracking-[0.25em] uppercase font-semibold text-[10px] sm:text-xs">
            AUTONOMOUS FLUID ORCHESTRATION
          </span>
        </motion.div>

        {/* Main Headline: Two-line Editorial Impact */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center leading-none"
        >
          <div className="flex items-center justify-center flex-wrap gap-3 sm:gap-5">
            <span
              className="font-syne font-extrabold uppercase text-white tracking-[-0.02em] text-4xl sm:text-6xl md:text-7xl lg:text-[84px]"
              style={{
                textShadow: "0 0 40px rgba(255, 255, 255, 0.25)",
              }}
            >
              &ldquo;REVOLUTIONIZE
            </span>

            {/* Glowing Intense Blood-Red 8-Point Asterisk ✳ */}
            <span className="inline-flex items-center justify-center">
              <svg
                className="w-7 h-7 sm:w-11 sm:h-11 md:w-14 md:h-14 text-[#FF1A00] animate-spin-slow filter drop-shadow-[0_0_20px_#FF1A00]"
                viewBox="0 0 100 100"
                fill="currentColor"
              >
                <path d="M 50 0 L 50 100 M 0 50 L 100 50 M 15 15 L 85 85 M 15 85 L 85 15" stroke="currentColor" strokeWidth="12" strokeLinecap="round" />
              </svg>
            </span>
          </div>

          <div className="mt-1 sm:mt-2">
            <span
              className="text-[#FF1A00] text-5xl sm:text-7xl md:text-8xl lg:text-[98px] block font-serif-italic font-normal tracking-[-0.01em]"
              style={{
                textShadow:
                  "0 0 35px rgba(255, 26, 0, 0.65), 0 0 80px rgba(255, 26, 0, 0.35)",
              }}
            >
              Kinetics.&rdquo;
            </span>
          </div>
        </motion.div>

        {/* Minimal Sub-statement */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 sm:mt-8 max-w-xl text-xs sm:text-sm md:text-base text-neutral-400 font-normal leading-relaxed text-balance"
        >
          Liquid decisions dispatched across 240+ connected nodes. Sub-millisecond execution, zero conversational friction.
        </motion.p>

        {/* Interactive Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          {/* Primary Button: Intense Blood Red Glow */}
          <button
            onClick={onStartFree}
            onMouseEnter={() => setHoveredButton(true)}
            onMouseLeave={() => setHoveredButton(false)}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-[#FF1A00] hover:bg-[#FF3319] text-[#000000] font-semibold text-sm transition-all duration-300 shadow-[0_0_28px_rgba(255,26,0,0.55)] hover:shadow-[0_0_38px_rgba(255,51,25,0.75)] cursor-pointer"
          >
            <span>INITIALIZE ARCHITECTURE</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>

          {/* Secondary Button: Stealth Dark Crimson */}
          <button
            onClick={onWatchBuild}
            className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#1F0003]/90 hover:bg-[#330006] border border-[#FF1A00]/30 hover:border-[#FF1A00]/70 text-neutral-200 text-sm font-medium transition-all duration-200 shadow-[0_0_15px_rgba(31,0,3,0.5)] cursor-pointer"
          >
            <Terminal className="w-4 h-4 text-[#FF1A00]" />
            <span>WATCH SYSTEM STREAM</span>
          </button>
        </motion.div>
      </div>

      {/* ─── 4. BOTTOM TELEMETRY BAR (MATCHING REFERENCE VIDEO COMPOSITION) ─── */}
      <div className="relative z-30 w-full pb-4 sm:pb-6 px-4 sm:px-8 md:px-12 flex items-center justify-between text-xs font-mono uppercase select-none pointer-events-none">
        {/* Left: Animated Blood-Red Barcode Equalizer */}
        <div className="flex items-end gap-[2px] sm:gap-[2.5px] h-5">
          {equalizerBars.map((bar) => (
            <span
              key={bar.id}
              className="w-[2px] bg-[#FF1A00] rounded-full shadow-[0_0_6px_rgba(255,26,0,0.85)]"
              style={{
                height: bar.h,
                animation: `redEqualizerPulse ${bar.dur} ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Center: Minimalist Plus Telemetry Strip (Exact Reference Video Match) */}
        <div className="flex items-center gap-3 sm:gap-8 md:gap-12 text-[10px] sm:text-xs font-semibold tracking-[0.28em] text-white/90">
          <svg
            className="w-2.5 h-2.5 text-[#FF1A00]/80 inline-block flex-shrink-0"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="5" y1="1" x2="5" y2="9" />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>

          <span className="tracking-[0.32em] text-white">TENSION</span>

          <svg
            className="w-2.5 h-2.5 text-[#FF1A00]/80 inline-block flex-shrink-0"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="5" y1="1" x2="5" y2="9" />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>

          <span className="tracking-[0.32em] text-white">IMMERSION</span>

          <svg
            className="w-2.5 h-2.5 text-[#FF1A00]/80 inline-block flex-shrink-0"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="5" y1="1" x2="5" y2="9" />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>

          <span className="tracking-[0.32em] text-white">IMPACT</span>

          <svg
            className="w-2.5 h-2.5 text-[#FF1A00]/80 inline-block flex-shrink-0"
            viewBox="0 0 10 10"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <line x1="5" y1="1" x2="5" y2="9" />
            <line x1="1" y1="5" x2="9" y2="5" />
          </svg>
        </div>

        {/* Right: Minimalist Online Badge */}
        <div className="pointer-events-auto">
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-black/85 border border-[#FF1A00]/30 shadow-[0_0_12px_rgba(0,0,0,0.9)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF1A00] shadow-[0_0_8px_#FF1A00] animate-pulse" />
            <span className="text-[10px] text-white font-mono tracking-wider font-semibold">
              ONLINE <span className="text-[#FF1A00]">&bull; Let&apos;s Connect</span>
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes redEqualizerPulse {
          0% {
            transform: scaleY(0.25);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1.0);
            opacity: 1.0;
          }
        }
      `}</style>
    </section>
  );
}
