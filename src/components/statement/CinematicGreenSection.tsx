"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CinematicGreenBackground } from "@/components/animations/CinematicGreenBackground";
import { Sparkles, Terminal, Activity } from "lucide-react";

export function CinematicGreenSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Layered parallax transformations
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.4, 0.65, 0.85], [0, 1, 1, 0]);
  const textScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.92, 1, 0.95]);
  const textY = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [30, 0, -30]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[110vh] sm:min-h-[125vh] flex flex-col justify-between overflow-hidden bg-[#030704] z-20 border-t border-b border-white/10 select-none"
    >
      {/* ─── GPU WEBGL LIQUID-INK FLAMES & CENTRAL SYMMETRICAL EMBLEM ─── */}
      <CinematicGreenBackground className="absolute inset-0 w-full h-full" showEmblem={true} />

      {/* ─── FOREGROUND EDITORIAL CONTENT (SCROLL-REACTIVE) ─── */}
      <div className="relative z-30 w-full flex flex-col justify-between min-h-screen py-16 sm:py-24 px-6 sm:px-12 lg:px-20 pointer-events-none">
        
        {/* Top Header Row */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#063D20]/60 border border-[#00FF85]/30 text-xs font-mono text-[#00FF85] backdrop-blur-md shadow-[0_0_15px_rgba(0,255,133,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse" />
            <span>03 // AUTONOMOUS MATRIX</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-[#00FF85]/70">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5" />
              <span>GPU KINETIC SHADER</span>
            </span>
            <span>•</span>
            <span>SHARP SILHOUETTE ENGINE</span>
          </div>
        </div>

        {/* Center Floating Editorial Copy (Framed Around Emblem) */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale, y: textY }}
          className="w-full max-w-4xl mx-auto text-center my-auto py-12 flex flex-col items-center pointer-events-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-[#00FF85]/20 text-[11px] font-mono text-neutral-300 mb-6 backdrop-blur-sm">
            <Sparkles className="w-3 h-3 text-[#00FF85]" />
            <span className="tracking-[0.25em] uppercase text-[#00FF85]">BEYOND DETERMINISTIC WORKFLOWS</span>
          </div>

          <h2
            className="font-syne font-extrabold uppercase text-white tracking-tight leading-[1.05] text-3xl sm:text-5xl md:text-6xl lg:text-[72px] mb-6"
            style={{
              textShadow: "0 0 40px rgba(0, 255, 133, 0.35)",
            }}
          >
            ORGANIC VELOCITY.{" "}
            <span
              className="text-[#00FF85] block sm:inline font-serif-italic font-normal"
              style={{
                fontFamily: 'var(--font-bodoni-72), "ITC Bodoni 72", Georgia, serif',
                fontStyle: "italic",
                textShadow: "0 0 50px rgba(0, 255, 133, 0.6)",
              }}
            >
              Unbroken flow.
            </span>
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed max-w-2xl text-balance">
            Watch the handoffs dissolve into continuous execution. When machines coordinate autonomously, latency approaches zero and operations evolve organically.
          </p>
        </motion.div>

        {/* Bottom Status Ticker Bar (Image 1 Style with Green Theme) */}
        <div className="w-full max-w-7xl mx-auto pt-6 border-t border-[#00FF85]/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#00FF85]/80 pointer-events-auto">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-[#00FF85]" />
            <span className="tracking-widest uppercase text-[10px] text-neutral-400">
              TELEMETRY CORE // SHADER_FLUID_V4
            </span>
          </div>

          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-5 tracking-[0.25em] text-neutral-300">
            <span className="text-[#00FF85]">+</span>
            <span>TENSION</span>
            <span className="text-[#00FF85]">+</span>
            <span>IMMERSION</span>
            <span className="text-[#00FF85]">+</span>
            <span>IMPACT</span>
            <span className="text-[#00FF85]">+</span>
          </div>
        </div>

      </div>
    </section>
  );
}
