"use client";

import { useState } from "react";
import { Phone, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface RevolutionizeSectionProps {
  onBookConsultation: () => void;
}

export function RevolutionizeSection({ onBookConsultation }: RevolutionizeSectionProps) {
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);

  // Equalizer heights for the audio/telemetry bar in bottom left
  const equalizerBars = [
    { id: 1, dur: "0.8s", delay: "0.1s", h: "18px" },
    { id: 2, dur: "1.1s", delay: "0.3s", h: "26px" },
    { id: 3, dur: "0.7s", delay: "0.0s", h: "14px" },
    { id: 4, dur: "1.3s", delay: "0.4s", h: "30px" },
    { id: 5, dur: "0.9s", delay: "0.2s", h: "22px" },
    { id: 6, dur: "1.2s", delay: "0.5s", h: "16px" },
    { id: 7, dur: "0.65s", delay: "0.15s", h: "28px" },
    { id: 8, dur: "1.0s", delay: "0.35s", h: "20px" },
    { id: 9, dur: "0.75s", delay: "0.05s", h: "24px" },
    { id: 10, dur: "1.15s", delay: "0.25s", h: "15px" },
    { id: 11, dur: "0.85s", delay: "0.45s", h: "25px" },
    { id: 12, dur: "1.05s", delay: "0.1s", h: "29px" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-8 lg:px-12 overflow-hidden bg-transparent z-10 border-t border-b border-white/5 select-none">
      
      {/* ─── 1. TOP BAR: CYBER-TRIBAL SIGIL & SECTION INDEX (IMAGE 1 STYLE) ─── */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto mb-6 sm:mb-8">
        {/* Cyber-tribal AI Butterfly / Sigil Emblem (from Image 1 top-left) */}
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-8 text-[#C6FF36] filter drop-shadow-[0_0_10px_rgba(198,255,54,0.5)] transition-transform duration-300 hover:scale-110"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Fine Cyber-Gothic Butterfly Lines */}
            <path d="M 50 50 C 42 32, 28 16, 14 12 C 20 28, 28 40, 40 48 C 22 46, 8 54, 4 64 C 18 62, 32 70, 42 80 C 46 68, 48 58, 50 50 Z" />
            <path d="M 50 50 C 58 32, 72 16, 86 12 C 80 28, 72 40, 60 48 C 78 46, 92 54, 96 64 C 82 62, 68 70, 58 80 C 54 68, 52 58, 50 50 Z" />
            <path d="M 50 16 L 50 84" strokeWidth="2" />
            <circle cx="50" cy="50" r="3" fill="#C6FF36" />
          </svg>

          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.3em] text-[#C6FF36]/80">
            RELAY // ARCHITECTURE
          </span>
        </div>

        {/* Section Index & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-neutral-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse shadow-[0_0_8px_#C6FF36]" />
            <span className="text-neutral-500">02 &nbsp;//&nbsp;</span>
            <span className="text-[#C6FF36]">PARADIGM SHIFT</span>
          </div>
        </div>
      </div>

      {/* ─── 2. MAIN CENTERPIECE: PERFECTLY SCALED EDITORIAL TYPOGRAPHY (NO OVERFLOW) ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center my-auto py-2 sm:py-6">
        
        {/* LINE 1: “REVOLUTIONIZE ✳” */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center flex-wrap gap-2 sm:gap-4 leading-none"
        >
          <span
            className="font-syne font-extrabold uppercase text-[#C6FF36] tracking-[-0.02em] text-3xl sm:text-5xl md:text-6xl lg:text-[76px]"
            style={{
              textShadow: "0 0 25px rgba(198, 255, 54, 0.4)",
            }}
          >
            &ldquo;REVOLUTIONIZE
          </span>

          {/* Glowing Green 8-Point Asterisk Star ✳ (from Image 2) */}
          <span className="inline-flex items-center justify-center align-middle transform hover:rotate-45 transition-transform duration-500">
            <svg
              className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#C6FF36] animate-spin-slow filter drop-shadow-[0_0_14px_#C6FF36]"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="44" y="6" width="12" height="88" rx="6" />
              <rect x="6" y="44" width="88" height="12" rx="6" />
              <rect x="44" y="6" width="12" height="88" rx="6" transform="rotate(45 50 50)" />
              <rect x="44" y="6" width="12" height="88" rx="6" transform="rotate(-45 50 50)" />
              <circle cx="50" cy="50" r="10" fill="#FFFFFF" />
            </svg>
          </span>
        </motion.div>

        {/* LINE 2: BUSINESS (WITH DELICATE RAZOR-SHARP CYBER FLOURISHES MATCHING IMAGE 1) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full flex items-center justify-center my-[-4px] sm:my-[-12px] md:my-[-18px]"
        >
          {/* Delicate Stroke-based Cyber-Calligraphic Flourish Lines */}
          <svg
            className="absolute inset-0 w-full h-[150%] -top-[25%] pointer-events-none z-10 text-[#C6FF36] opacity-80"
            viewBox="0 0 800 200"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Left curved wing flourish */}
            <path
              d="M 280 110 C 210 105, 140 120, 90 145 C 150 140, 220 135, 275 125"
              strokeWidth="1.5"
              filter="drop-shadow(0 0 6px #C6FF36)"
            />
            <path
              d="M 290 95 C 230 75, 180 50, 140 25 C 180 55, 240 80, 305 95"
              strokeWidth="1.5"
              filter="drop-shadow(0 0 6px #C6FF36)"
            />

            {/* Right curved wing flourish */}
            <path
              d="M 520 110 C 590 105, 660 120, 710 145 C 650 140, 580 135, 525 125"
              strokeWidth="1.5"
              filter="drop-shadow(0 0 6px #C6FF36)"
            />
            <path
              d="M 510 95 C 570 75, 620 50, 660 25 C 620 55, 560 80, 495 95"
              strokeWidth="1.5"
              filter="drop-shadow(0 0 6px #C6FF36)"
            />

            {/* Center crown accent */}
            <path d="M 400 45 L 392 75 L 400 68 L 408 75 Z" fill="#C6FF36" />
          </svg>

          {/* The Word "Business" in Bodoni 72 Italic */}
          <span
            className="font-serif-italic font-normal text-[#C6FF36] tracking-normal z-0 select-none relative text-4xl sm:text-6xl md:text-7xl lg:text-[96px]"
            style={{
              fontFamily: 'var(--font-bodoni-72), "ITC Bodoni 72", "Bodoni 72", Georgia, serif',
              fontStyle: "italic",
              textShadow: "0 0 35px rgba(198, 255, 54, 0.45), 0 0 70px rgba(198, 255, 54, 0.15)",
            }}
          >
            Business
          </span>
        </motion.div>

        {/* LINE 3: WITH AI AUTOMATION” */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex items-center justify-center leading-none"
        >
          <span
            className="font-syne font-extrabold uppercase text-[#C6FF36] tracking-[-0.02em] text-2xl sm:text-4xl md:text-5xl lg:text-[68px]"
            style={{
              textShadow: "0 0 25px rgba(198, 255, 54, 0.4)",
            }}
          >
            WITH AI AUTOMATION&rdquo;
          </span>
        </motion.div>
      </div>

      {/* ─── 3. SUBTITLE & CTA BUTTON (EXACT COPY & DOODLE ARROW FROM IMAGE 2) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center my-6 sm:my-8"
      >
        {/* Subtitle from Image 2 */}
        <p className="text-sm sm:text-base md:text-lg text-neutral-300 font-normal leading-relaxed mb-6">
          Transform how you work with cutting-edge AI and automation solutions designed to streamline processes, enhance productivity, and accelerate growth.
        </p>

        {/* CTA Button & Hand-Drawn Doodle Arrow */}
        <div className="relative flex flex-col items-center">
          {/* Primary Action Button (Pill button with Phone icon matching Image 2) */}
          <button
            onClick={onBookConsultation}
            onMouseEnter={() => setIsHoveredBtn(true)}
            onMouseLeave={() => setIsHoveredBtn(false)}
            className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#C6FF36] hover:bg-[#b8f02f] text-[#050505] font-semibold text-sm sm:text-base transition-all duration-300 shadow-[0_0_25px_rgba(198,255,54,0.35)] hover:shadow-[0_0_40px_rgba(198,255,54,0.55)] hover:scale-[1.02] cursor-pointer"
          >
            <span className="font-syne font-bold tracking-tight">Book a free consultation</span>
            <div className="w-6 h-6 rounded-full bg-black flex items-center justify-center text-[#C6FF36] group-hover:scale-110 transition-transform">
              <Phone className="w-3 h-3 fill-current" />
            </div>
          </button>

          {/* Neon Green Curved Doodle Arrow (from Image 2 under button) */}
          <div className="relative -mt-1 sm:translate-x-12">
            <svg
              className="w-14 h-10 text-[#C6FF36] filter drop-shadow-[0_0_6px_#C6FF36]"
              viewBox="0 0 100 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 12 70 C 45 65, 85 55, 75 30 C 68 12, 45 15, 52 35 C 58 52, 80 42, 92 18"
                stroke="#C6FF36"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
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
      </motion.div>

      {/* ─── 4. BOTTOM BAR: AUDIO EQUALIZER & HORIZONTAL TICKER (EXACT IMAGE 1 STYLE) ─── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Animated Audio/Telemetry Equalizer Waveform Bars (Exact from Image 1 bottom-left) */}
        <div className="flex items-end gap-1 h-6 px-1">
          {equalizerBars.map((bar) => (
            <span
              key={bar.id}
              className="w-1 bg-[#C6FF36] rounded-full filter drop-shadow-[0_0_5px_#C6FF36]"
              style={{
                height: bar.h,
                animation: `pulseGlow ${bar.dur} ease-in-out infinite alternate`,
                animationDelay: bar.delay,
              }}
            />
          ))}
          <span className="ml-2 font-mono text-[9px] tracking-widest uppercase text-neutral-500">
            AUDIO // TELEMETRY
          </span>
        </div>

        {/* Center & Right: Values Ticker with Plus Sign Separators (Exact from Image 1 bottom) */}
        <div className="flex items-center flex-wrap justify-center sm:justify-end gap-4 sm:gap-6 font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
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
