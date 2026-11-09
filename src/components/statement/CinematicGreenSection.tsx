"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GreenOrganicBackground } from "@/components/background/GreenOrganicBackground";
import { Terminal, Activity, Zap, GitBranch, Cpu } from "lucide-react";

export function CinematicGreenSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeStage, setActiveStage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Layered parallax transformations for typography
  const textOpacity = useTransform(scrollYProgress, [0.08, 0.3, 0.75, 0.92], [0.4, 1, 1, 0.4]);
  const textScale = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0.95, 1.02, 0.97]);

  const stages = [
    {
      num: "01",
      title: "AUTONOMOUS SENSING",
      icon: Zap,
      desc: "Sub-millisecond ingestion captures webhooks, DB mutations, and user signals across 240+ connected nodes.",
    },
    {
      num: "02",
      title: "LIQUID ORCHESTRATION",
      icon: GitBranch,
      desc: "Branchless decision matrices resolve human exceptions, risk escalations, and dead-ends dynamically.",
    },
    {
      num: "03",
      title: "UNBROKEN EXECUTION",
      icon: Cpu,
      desc: "Zero-latency multi-system handoffs dispatch autonomously without dropping conversational state.",
    },
  ];

  return (
    <section
      id="workflow"
      ref={sectionRef}
      className="relative w-full min-h-screen sm:min-h-[115vh] flex flex-col justify-between overflow-hidden bg-[#030704] z-20 border-t border-b border-[#00FF85]/20 select-none scroll-mt-12"
    >
      {/* ─── 1. REFERENCE-BASED ORGANIC SILHOUETTE, REACHING BLACK HANDS & CENTRAL THORN CLAW ─── */}
      <GreenOrganicBackground
        className="absolute inset-0 w-full h-full pointer-events-auto"
        showCenterThorn={true}
        showBottomHands={true}
        interactive={true}
      />

      {/* ─── 2. FOREGROUND EDITORIAL CONTENT (HOW IT WORKS SCREEN) ─── */}
      <div className="relative z-30 w-full flex flex-col justify-between min-h-screen py-10 sm:py-14 px-6 sm:px-12 lg:px-20 pointer-events-none">
        
        {/* Top Header Row */}
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* How It Works Indicator */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#063D20]/80 border border-[#00FF85]/40 text-xs font-mono text-[#00FF85] backdrop-blur-md shadow-[0_0_20px_rgba(0,255,133,0.25)]">
            <span className="w-2 h-2 rounded-full bg-[#00FF85] animate-pulse shadow-[0_0_10px_#00FF85]" />
            <span className="font-semibold tracking-wider">HOW IT WORKS // KINETIC MATRIX</span>
          </div>

          {/* Telemetry Status Right */}
          <div className="hidden sm:flex items-center gap-4 font-mono text-xs text-[#00FF85]/80">
            <span className="flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#00FF85]" />
              <span>HANDS SILHOUETTE ENGINE</span>
            </span>
            <span>•</span>
            <span>60FPS FLUID DYNAMICS</span>
          </div>
        </div>

        {/* Center Iconic Agency Typography: Frame Matching Image 1 Reference */}
        <motion.div
          style={{ opacity: textOpacity, scale: textScale }}
          className="w-full max-w-5xl mx-auto text-center my-auto py-4 sm:py-8 flex flex-col items-center justify-center pointer-events-none"
        >
          {/* Line 1: THIS WILL */}
          <h2
            className="font-syne font-extrabold uppercase text-[#00FF85] tracking-tight leading-[0.9] text-5xl sm:text-7xl md:text-8xl lg:text-[104px]"
            style={{
              textShadow:
                "0 0 35px rgba(0, 255, 133, 0.5), 0 0 70px rgba(0, 255, 133, 0.25)",
            }}
          >
            THIS WILL
          </h2>

          {/* Line 2: FEEL (Gothic / Calligraphic Italic Nestled in Center Tribal Wings) */}
          <div className="relative my-[-10px] sm:my-[-24px] md:my-[-34px] z-20">
            <span
              className="text-[#39FF9C] text-6xl sm:text-8xl md:text-9xl lg:text-[132px] block font-serif-italic select-none"
              style={{
                fontFamily: 'var(--font-bodoni-72), "ITC Bodoni 72", Georgia, serif',
                fontStyle: "italic",
                textShadow:
                  "0 0 50px rgba(57, 255, 156, 0.8), 0 0 100px rgba(0, 255, 133, 0.5)",
              }}
            >
              feel
            </span>
          </div>

          {/* Line 3: DIFFERENT */}
          <h2
            className="font-syne font-extrabold uppercase text-[#00FF85] tracking-tight leading-[0.9] text-5xl sm:text-7xl md:text-8xl lg:text-[104px]"
            style={{
              textShadow:
                "0 0 35px rgba(0, 255, 133, 0.5), 0 0 70px rgba(0, 255, 133, 0.25)",
            }}
          >
            DIFFERENT
          </h2>

          {/* ─── INTERACTIVE "HOW IT WORKS" STAGES SWITCHER (POINTER-EVENTS AUTO) ─── */}
          <div className="mt-8 pointer-events-auto flex flex-col items-center">
            {/* Stage Selector Pills */}
            <div className="flex items-center flex-wrap justify-center gap-2 p-1.5 rounded-full bg-[#063D20]/70 border border-[#00FF85]/30 backdrop-blur-md shadow-[0_0_25px_rgba(0,255,133,0.15)] mb-4">
              {stages.map((st, idx) => {
                const Icon = st.icon;
                const isActive = activeStage === idx;
                return (
                  <button
                    key={st.num}
                    onClick={() => setActiveStage(idx)}
                    className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#00FF85] text-[#030704] font-bold shadow-[0_0_18px_#00FF85] scale-105"
                        : "text-neutral-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{st.num}. {st.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Stage Description */}
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed max-w-lg text-center font-mono">
              {stages[activeStage].desc}
            </p>
          </div>
        </motion.div>

        {/* Bottom Ticker Bar: "+ TENSION + IMMERSION + IMPACT +" */}
        <div className="w-full max-w-7xl mx-auto pt-6 border-t border-[#00FF85]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#00FF85]/90 pointer-events-auto">
          <div className="flex items-center gap-2 text-neutral-400">
            <Terminal className="w-3.5 h-3.5 text-[#00FF85]" />
            <span className="tracking-widest uppercase text-[10px] text-[#00FF85]/80">
              CORE_SYS // REACHING_HANDS_ACTIVE
            </span>
          </div>

          <div className="flex items-center flex-wrap justify-center sm:justify-end gap-6 sm:gap-8 tracking-[0.3em] text-neutral-200 text-xs sm:text-sm font-medium">
            <span className="text-[#00FF85] font-bold">+</span>
            <span className="hover:text-[#00FF85] transition-colors cursor-default">TENSION</span>
            <span className="text-[#00FF85] font-bold">+</span>
            <span className="hover:text-[#00FF85] transition-colors cursor-default">IMMERSION</span>
            <span className="text-[#00FF85] font-bold">+</span>
            <span className="hover:text-[#00FF85] transition-colors cursor-default">IMPACT</span>
            <span className="text-[#00FF85] font-bold">+</span>
          </div>
        </div>

      </div>
    </section>
  );
}
