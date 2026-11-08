"use client";

import { useState } from "react";
import { Phone, ArrowRight, Sparkles, CheckCircle2, Bot, Cpu, Zap, Activity } from "lucide-react";
import { motion } from "framer-motion";

interface RevolutionizeSectionProps {
  onBookConsultation: () => void;
}

export function RevolutionizeSection({ onBookConsultation }: RevolutionizeSectionProps) {
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);

  // Equalizer heights for the audio/telemetry bar in bottom left
  const equalizerBars = [
    { id: 1, dur: "0.8s", delay: "0.1s", minH: "4px", maxH: "24px" },
    { id: 2, dur: "1.1s", delay: "0.3s", minH: "6px", maxH: "32px" },
    { id: 3, dur: "0.7s", delay: "0.0s", minH: "8px", maxH: "20px" },
    { id: 4, dur: "1.3s", delay: "0.4s", minH: "10px", maxH: "36px" },
    { id: 5, dur: "0.9s", delay: "0.2s", minH: "4px", maxH: "28px" },
    { id: 6, dur: "1.2s", delay: "0.5s", minH: "8px", maxH: "22px" },
    { id: 7, dur: "0.65s", delay: "0.15s", minH: "5px", maxH: "34px" },
    { id: 8, dur: "1.0s", delay: "0.35s", minH: "9px", maxH: "26px" },
    { id: 9, dur: "0.75s", delay: "0.05s", minH: "6px", maxH: "30px" },
    { id: 10, dur: "1.15s", delay: "0.25s", minH: "4px", maxH: "20px" },
    { id: 11, dur: "0.85s", delay: "0.45s", minH: "7px", maxH: "28px" },
    { id: 12, dur: "1.05s", delay: "0.1s", minH: "5px", maxH: "35px" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-24 pb-14 px-4 sm:px-8 lg:px-14 overflow-hidden bg-transparent border-t border-b border-white/5 select-none">
      
      {/* ─── AMBIENT GREEN VOLUMETRIC BACKGROUND LIGHTING ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Upper Center Atmospheric Green Halo */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] sm:w-[1200px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(198,255,54,0.09),transparent_65%)] blur-[130px]" />
        
        {/* Subtle Olive Glow in Lower Left */}
        <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(45,55,25,0.35),transparent_70%)] blur-[120px]" />
        
        {/* Subtle Grid guides */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>

      {/* ─── 1. TOP BAR: CYBER-TRIBAL SIGIL & SECTION INDEX (IMAGE 1 STYLE) ─── */}
      <div className="relative z-10 flex items-center justify-between w-full mb-8 sm:mb-12">
        {/* Cyber-tribal AI Butterfly / Sigil Emblem (from Image 1 top-left) */}
        <div className="flex items-center gap-3">
          <svg
            className="w-9 h-9 sm:w-12 sm:h-12 text-[#C6FF36] filter drop-shadow-[0_0_12px_rgba(198,255,54,0.45)] transition-transform duration-300 hover:scale-110"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Left Wing / Barbs */}
            <path d="M 50 50 C 45 35, 30 18, 12 12 C 18 26, 26 38, 38 46 C 24 45, 10 52, 6 62 C 20 60, 32 68, 42 78 C 45 68, 48 58, 50 50 Z" />
            <path d="M 46 32 C 34 22, 22 15, 10 16 C 18 28, 30 35, 42 38 Z" />
            <path d="M 36 60 C 22 65, 14 74, 10 86 C 22 80, 34 74, 42 66 Z" />
            <circle cx="28" cy="48" r="2.5" fill="#FFFFFF" />

            {/* Right Wing / Barbs (Symmetrical) */}
            <path d="M 50 50 C 55 35, 70 18, 88 12 C 82 26, 74 38, 62 46 C 76 45, 90 52, 94 62 C 80 60, 68 68, 58 78 C 55 68, 52 58, 50 50 Z" />
            <path d="M 54 32 C 66 22, 78 15, 90 16 C 82 28, 70 35, 58 38 Z" />
            <path d="M 64 60 C 78 65, 86 74, 90 86 C 78 80, 66 74, 58 66 Z" />
            <circle cx="72" cy="48" r="2.5" fill="#FFFFFF" />

            {/* Center Core Spire */}
            <path d="M 50 14 L 53 45 L 50 88 L 47 45 Z" fill="#FFFFFF" />
          </svg>

          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.35em] text-[#C6FF36]/80">
            RELAY // ARCHITECTURE
          </span>
        </div>

        {/* Section Index & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
            <span className="text-neutral-400">02 &nbsp;//&nbsp;</span>
            <span className="text-[#C6FF36]">PARADIGM SHIFT</span>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN CENTERPIECE: SCREEN-FILLING EDITORIAL TYPOGRAPHY (IMAGE 1 STYLE + IMAGE 2 CONTENT) ─── */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center text-center my-auto py-4 sm:py-8">
        
        {/* LINE 1: “REVOLUTIONIZE ✳” */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center flex-wrap gap-x-3 sm:gap-x-6 leading-none"
        >
          <span
            className="font-syne font-extrabold uppercase text-[#C6FF36] tracking-tight sm:tracking-[-0.03em]"
            style={{
              fontSize: "clamp(46px, 10.5vw, 150px)",
              textShadow: "0 0 35px rgba(198, 255, 54, 0.35)",
            }}
          >
            &ldquo;REVOLUTIONIZE
          </span>

          {/* Glowing Green 8-Point Asterisk Star ✳ (from Image 2) */}
          <span className="inline-flex items-center justify-center self-center align-middle transform hover:rotate-45 transition-transform duration-500">
            <svg
              className="w-8 h-8 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-[#C6FF36] animate-spin-slow filter drop-shadow-[0_0_18px_#C6FF36]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* 8-pointed star arms */}
              <rect x="44" y="8" width="12" height="84" rx="6" />
              <rect x="8" y="44" width="84" height="12" rx="6" />
              <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(45 50 50)" />
              <rect x="44" y="8" width="12" height="84" rx="6" transform="rotate(-45 50 50)" />
              <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
            </svg>
          </span>
        </motion.div>

        {/* LINE 2: BUSINESS (WITH MASSIVE ORNATE GOTHIC / CALLIGRAPHIC FLOURISHES MATCHING 'FEEL' IN IMAGE 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center my-[-8px] sm:my-[-24px] lg:my-[-40px]"
        >
          {/* Cyber-flourish vector thorns and curved loops weaving over and through the text */}
          <svg
            className="absolute inset-0 w-full h-[180%] -top-[40%] pointer-events-none z-10 text-[#C6FF36] opacity-90 mix-blend-screen"
            viewBox="0 0 1000 300"
            preserveAspectRatio="none"
          >
            <defs>
              <filter id="flourishGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Upper sweeping flame/horn swashes extending up towards REVOLUTIONIZE */}
            <path
              d="M 500 150 C 470 70, 420 15, 360 5 C 410 40, 440 95, 450 140 C 410 110, 340 90, 260 110 C 330 135, 390 155, 430 160 Z"
              fill="#C6FF36"
              filter="url(#flourishGlow)"
              opacity="0.85"
            />
            <path
              d="M 500 150 C 530 70, 580 15, 640 5 C 590 40, 560 95, 550 140 C 590 110, 660 90, 740 110 C 670 135, 610 155, 570 160 Z"
              fill="#C6FF36"
              filter="url(#flourishGlow)"
              opacity="0.85"
            />

            {/* Dramatic Calligraphic Underloop Swashes */}
            <path
              d="M 220 180 C 140 220, 80 260, 40 290 C 110 270, 200 240, 290 200 C 250 200, 230 190, 220 180 Z"
              fill="#C6FF36"
              opacity="0.9"
            />
            <path
              d="M 780 180 C 860 220, 920 260, 960 290 C 890 270, 800 240, 710 200 C 750 200, 770 190, 780 180 Z"
              fill="#C6FF36"
              opacity="0.9"
            />

            {/* Central ornate interlocking spikes */}
            <path
              d="M 480 140 Q 500 40 520 140 Q 500 170 480 140 Z"
              fill="#FFFFFF"
              filter="url(#flourishGlow)"
            />
          </svg>

          {/* The Word "BUSINESS" in Ornate Italic Display Typography */}
          <span
            className="font-serif-italic font-normal text-[#C6FF36] tracking-normal sm:tracking-[-0.01em] z-0 select-none relative"
            style={{
              fontSize: "clamp(54px, 12.5vw, 180px)",
              fontFamily: 'var(--font-bodoni-72), "ITC Bodoni 72", "Bodoni 72", Georgia, serif',
              fontStyle: "italic",
              textShadow: "0 0 45px rgba(198, 255, 54, 0.45), 0 0 90px rgba(198, 255, 54, 0.15)",
            }}
          >
            Business
          </span>
        </motion.div>

        {/* LINE 3: WITH AI AUTOMATION” */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center leading-none"
        >
          <span
            className="font-syne font-extrabold uppercase text-[#C6FF36] tracking-tight sm:tracking-[-0.03em]"
            style={{
              fontSize: "clamp(42px, 9.8vw, 140px)",
              textShadow: "0 0 35px rgba(198, 255, 54, 0.35)",
            }}
          >
            WITH AI AUTOMATION&rdquo;
          </span>
        </motion.div>
      </div>

      {/* ─── 3. SUPPORTING STORY & INTERACTIVE CARD (IMAGE 2 CONTENT & LAYOUT) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-6 sm:my-10"
      >
        {/* Left Column: Subtitle + Action Button + Doodle Arrow (Exact Image 2) */}
        <div className="lg:col-span-6 flex flex-col items-start">
          {/* Subtitle from Image 2 */}
          <p className="text-base sm:text-lg lg:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
            Transform how you work with cutting-edge AI and automation solutions designed to streamline processes, enhance productivity, and accelerate growth.
          </p>

          {/* CTA Button & Hand-Drawn Doodle Arrow */}
          <div className="relative flex flex-col items-start gap-4">
            {/* Primary Action Button (Pill button with Phone icon matching Image 2) */}
            <button
              onClick={onBookConsultation}
              onMouseEnter={() => setIsHoveredBtn(true)}
              onMouseLeave={() => setIsHoveredBtn(false)}
              className="group relative inline-flex items-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#C6FF36] hover:bg-[#b8f02f] text-[#050505] font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_30px_rgba(198,255,54,0.35)] hover:shadow-[0_0_45px_rgba(198,255,54,0.6)] hover:scale-[1.02] cursor-pointer"
            >
              <span className="font-syne font-bold tracking-tight">Book a free consultation</span>
              <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-[#C6FF36] group-hover:scale-110 transition-transform">
                <Phone className="w-3.5 h-3.5 fill-current" />
              </div>
            </button>

            {/* Neon Green Curved Doodle Arrow (Exact Match from Image 2 under button) */}
            <div className="relative pl-8 pt-1">
              <svg
                className="w-16 h-12 text-[#C6FF36] filter drop-shadow-[0_0_8px_#C6FF36]"
                viewBox="0 0 100 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Looping hand-drawn curve pointing up at the button */}
                <path
                  d="M 12 70 C 45 65, 85 55, 75 30 C 68 12, 45 15, 52 35 C 58 52, 80 42, 92 18"
                  stroke="#C6FF36"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Arrowhead */}
                <path
                  d="M 82 14 L 94 16 L 94 28"
                  stroke="#C6FF36"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: AI Automation Operations Studio Preview Card (Theme of Image 2) */}
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-2xl sm:rounded-3xl bg-[#10110E]/90 border border-white/10 p-5 sm:p-7 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(198,255,54,0.05)] overflow-hidden">
            
            {/* Ambient Card Backlight */}
            <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-[radial-gradient(circle,rgba(198,255,54,0.12),transparent_70%)] blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
                <span className="font-syne font-bold text-sm text-white tracking-tight">
                  Autonomous Operations Engine
                </span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#C6FF36]/15 border border-[#C6FF36]/30 text-[#C6FF36]">
                ACTIVE // 240 APPS
              </span>
            </div>

            {/* Multi-Agent Orchestration Flow Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
              <div className="p-3.5 rounded-xl bg-[#161814] border border-white/5 hover:border-[#C6FF36]/30 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <Bot className="w-4 h-4 text-[#C6FF36]" />
                  <span className="text-xs font-semibold text-white">Agent.Orchestrator</span>
                </div>
                <p className="text-[11px] text-neutral-400">Routes cross-app steps without human friction.</p>
                <div className="mt-2 text-[10px] font-mono text-[#C6FF36] flex items-center gap-1">
                  <span>Throughput:</span>
                  <span className="font-bold">14,280 ops/hr</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#161814] border border-white/5 hover:border-[#C6FF36]/30 transition-all">
                <div className="flex items-center gap-2 mb-1.5">
                  <Cpu className="w-4 h-4 text-[#C6FF36]" />
                  <span className="text-xs font-semibold text-white">Agent.DataSync</span>
                </div>
                <p className="text-[11px] text-neutral-400">Bi-directional reconciliation for Stripe & Postgres.</p>
                <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <span>Latency:</span>
                  <span className="font-bold">18ms average</span>
                </div>
              </div>
            </div>

            {/* Impact Metrics Bar */}
            <div className="p-3.5 rounded-xl bg-[#161814]/80 border border-[#C6FF36]/20 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#C6FF36]" />
                <span className="text-neutral-300">Automation Success Rate</span>
              </div>
              <span className="text-[#C6FF36] font-bold text-sm">99.98%</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── 4. BOTTOM BAR: AUDIO EQUALIZER & HORIZONTAL TICKER (IMAGE 1 STYLE) ─── */}
      <div className="relative z-10 w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Animated Audio/Telemetry Equalizer Waveform Bars (Exact from Image 1 bottom-left) */}
        <div className="flex items-end gap-1 h-7 px-2">
          {equalizerBars.map((bar) => (
            <span
              key={bar.id}
              className="w-1 bg-[#C6FF36] rounded-full filter drop-shadow-[0_0_6px_#C6FF36]"
              style={{
                height: bar.maxH,
                animation: `pulseGlow ${bar.dur} ease-in-out infinite alternate`,
                animationDelay: bar.delay,
              }}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] tracking-widest uppercase text-neutral-500">
            AUDIO // TELEMETRY
          </span>
        </div>

        {/* Center & Right: Values Ticker with Plus Sign Separators (Exact from Image 1 bottom) */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-4 sm:gap-8 font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-neutral-400">
          <span className="text-[#C6FF36]">+</span>
          <span className="hover:text-white transition-colors cursor-default">TENSION</span>
          <span className="text-[#C6FF36]">+</span>
          <span className="hover:text-white transition-colors cursor-default">IMMERSION</span>
          <span className="text-[#C6FF36]">+</span>
          <span className="hover:text-white transition-colors cursor-default">IMPACT</span>
          <span className="text-[#C6FF36]">+</span>
        </div>
      </div>

    </section>
  );
}
