"use client";

import { useState, useRef } from "react";
import { Phone, Sparkles } from "lucide-react";
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion";
import Image from "next/image";

interface ThisWillFeelDifferentSectionProps {
  onBookConsultation?: () => void;
}

/**
 * ThisWillFeelDifferentSection
 * Full-screen cinematic statement section:
 * - Triggers automatically upon passing through the hero section (NOT manual scroll scrubbing)
 * - Individual letters fly in from the deep background ONE BY ONE in 3D perspective
 * - Pure Neon Green (#00FF41) & Electric Emerald (#39FF14) on pure black (#000000)
 * - ZERO shape logo cluttering the center
 * - Interactive 3D mouse tilt + breathing volumetric radiance
 * - Barcode equalizer & "+ TENSION + IMMERSION + IMPACT +" telemetry bar
 */
export function ThisWillFeelDifferentSection({
  onBookConsultation,
}: ThisWillFeelDifferentSectionProps) {
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Trigger automatically when user passes through the hero into this section
  const isInView = useInView(sectionRef, {
    amount: 0.3,
    once: false,
  });

  // ─── INTERACTIVE 3D HOLOGRAPHIC MOUSE TILT ───
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 100, damping: 20, mass: 0.5 };
  const tiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const tiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // ─── ONE-BY-ONE "APPEARS FROM BACK" 3D LETTER ANIMATION VARIANT ───
  const letterVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.12,
      z: -700,
      y: 40,
      filter: "blur(14px)",
    },
    visible: (customDelay: number) => ({
      opacity: 1,
      scale: 1,
      z: 0,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay: customDelay,
        duration: 0.65,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  const line1Letters = ["T", "H", "I", "S", " ", "W", "I", "L", "L"];
  const line3Letters = ["D", "I", "F", "F", "E", "R", "E", "N", "T"];

  // Equalizer barcode heights for the bottom-left telemetry in neon green
  const equalizerBars = [
    { id: 1, dur: "0.8s", h: "18px" },
    { id: 2, dur: "1.15s", h: "28px" },
    { id: 3, dur: "0.7s", h: "14px" },
    { id: 4, dur: "1.3s", h: "32px" },
    { id: 5, dur: "0.9s", h: "22px" },
    { id: 6, dur: "1.2s", h: "16px" },
    { id: 7, dur: "0.65s", h: "30px" },
    { id: 8, dur: "1.05s", h: "20px" },
    { id: 9, dur: "0.75s", h: "26px" },
    { id: 10, dur: "1.1s", h: "15px" },
    { id: 11, dur: "0.85s", h: "27px" },
    { id: 12, dur: "1.0s", h: "24px" },
    { id: 13, dur: "0.95s", h: "19px" },
    { id: 14, dur: "1.25s", h: "31px" },
    { id: 15, dur: "0.7s", h: "16px" },
    { id: 16, dur: "1.15s", h: "25px" },
    { id: 17, dur: "0.8s", h: "21px" },
    { id: 18, dur: "1.35s", h: "29px" },
    { id: 19, dur: "0.9s", h: "17px" },
    { id: 20, dur: "1.05s", h: "23px" },
  ];

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen w-full flex flex-col justify-between py-6 sm:py-10 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#000000] z-20 border-t border-b border-[#00FF41]/15 select-none"
      style={{ perspective: "1200px" }}
    >
      {/* ─── 1. PURE SOLID BLACK BACKGROUND WITH VOLUMETRIC GREEN GLOW ─── */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none overflow-hidden">
        {/* Central Atmospheric Emerald Radiance */}
        <motion.div
          animate={
            isInView
              ? { opacity: [0.4, 0.75, 0.4], scale: [0.85, 1.05, 0.85] }
              : { opacity: 0.1, scale: 0.7 }
          }
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[600px] sm:h-[800px] pointer-events-none"
        >
          <div
            className="w-full h-full"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 255, 65, 0.15) 0%, rgba(0, 59, 32, 0.05) 45%, transparent 75%)",
              filter: "blur(90px)",
            }}
          />
        </motion.div>

        {/* Subtle Cyberpunk CRT Scanline Texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.04) 2px, rgba(0, 255, 65, 0.04) 4px)",
          }}
        />
      </div>

      {/* ─── 2. TOP BAR: CYBER-TRIBAL SIGIL & STATUS INDEX ─── */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -15 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto mb-2 sm:mb-4 pointer-events-none"
      >
        {/* Cyber-Gothic Butterfly Sigil in Neon Green */}
        <div className="flex items-center gap-3">
          <svg
            className="w-7 h-7 sm:w-8 sm:h-8 text-[#00FF41] filter drop-shadow-[0_0_10px_rgba(0,255,65,0.7)] transition-transform duration-300 hover:scale-110"
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
            <circle cx="50" cy="50" r="3" fill="#00FF41" />
          </svg>

          <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.32em] text-[#00FF41]/90 font-semibold">
            RELAY // ARCHITECTURE
          </span>
        </div>

        {/* Section Index & Status Badge */}
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#001A0D]/80 border border-[#00FF41]/30 text-xs font-mono text-neutral-300 backdrop-blur-sm shadow-[0_0_15px_rgba(0,255,65,0.15)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-pulse shadow-[0_0_8px_#00FF41]" />
            <span className="text-neutral-400">02 &nbsp;//&nbsp;</span>
            <span className="text-[#00FF41]">PARADIGM SHIFT</span>
          </div>
        </div>
      </motion.div>

      {/* ─── 3. CENTERPIECE: LETTERS APPEAR ONE BY ONE FROM THE BACK ─── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center my-auto py-2 sm:py-6 overflow-visible">
        {/* 3D Motion Container with Spring Mouse Tilt */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformPerspective: 1200,
          }}
          className="relative w-full max-w-4xl flex flex-col items-center justify-center transform-gpu origin-center select-none"
        >
          {/* ─── LINE 1: "THIS WILL" (LETTERS APPEAR ONE BY ONE) ─── */}
          <div className="flex items-center justify-center gap-[0.04em] sm:gap-[0.06em] tracking-tight overflow-visible">
            {line1Letters.map((char, index) => (
              <motion.span
                key={`l1-${index}`}
                custom={0.15 + index * 0.05}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block font-syne font-black uppercase text-[#00FF41] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[98px] leading-none filter drop-shadow-[0_0_30px_rgba(0,255,65,0.7)] drop-shadow-[0_0_60px_rgba(0,255,65,0.3)]"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>

          {/* ─── LINE 2: ORNATE CALLIGRAPHIC "FEEL" SURGING FORWARD FROM DEEP Z-SPACE ─── */}
          <motion.div
            custom={0.15 + line1Letters.length * 0.05 + 0.08}
            variants={{
              hidden: {
                opacity: 0,
                scale: 0.16,
                z: -750,
                y: 35,
                filter: "blur(16px)",
              },
              visible: (delay: number) => ({
                opacity: 1,
                scale: 1,
                z: 0,
                y: 0,
                filter: "blur(0px)",
                transition: {
                  delay,
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                },
              }),
            }}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative w-full max-w-2xl sm:max-w-3xl my-[-1.2rem] sm:my-[-2.2rem] md:my-[-3.2rem] z-20 pointer-events-none"
          >
            {/* Clean calligraphic "FEEL" without any spiky shape logo */}
            <div className="relative w-full aspect-[4680/1000] max-h-[26vh] select-none">
              <Image
                src="/line_feel_clean.png"
                alt="FEEL"
                fill
                priority
                className="object-contain filter drop-shadow-[0_0_35px_rgba(57,255,20,0.85)] drop-shadow-[0_0_75px_rgba(0,255,65,0.45)]"
              />
            </div>
          </motion.div>

          {/* ─── LINE 3: "DIFFERENT" (LETTERS APPEAR ONE BY ONE) ─── */}
          <div className="flex items-center justify-center gap-[0.04em] sm:gap-[0.06em] tracking-tight overflow-visible">
            {line3Letters.map((char, index) => (
              <motion.span
                key={`l3-${index}`}
                custom={
                  0.15 +
                  line1Letters.length * 0.05 +
                  0.35 +
                  index * 0.05
                }
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="inline-block font-syne font-black uppercase text-[#00FF41] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[98px] leading-none filter drop-shadow-[0_0_30px_rgba(0,255,65,0.7)] drop-shadow-[0_0_60px_rgba(0,255,65,0.3)]"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Holographic Glowing Atmosphere Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.85 } : { opacity: 0 }}
            transition={{ delay: 0.5, duration: 1.2 }}
            className="absolute inset-0 pointer-events-none mix-blend-screen"
          >
            <div
              className="w-full h-full"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(57, 255, 20, 0.35) 0%, rgba(0, 255, 65, 0.1) 40%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />
          </motion.div>
        </motion.div>

        {/* Minimal Consultation Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{
            delay:
              0.15 +
              line1Letters.length * 0.05 +
              0.35 +
              line3Letters.length * 0.05 +
              0.15,
            duration: 0.6,
          }}
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 z-20 pointer-events-auto"
        >
          <button
            onClick={onBookConsultation}
            onMouseEnter={() => setIsHoveredBtn(true)}
            onMouseLeave={() => setIsHoveredBtn(false)}
            className="group relative inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-[#001A0D]/90 hover:bg-[#002B18] border border-[#00FF41]/40 hover:border-[#00FF41] text-xs font-mono uppercase tracking-[0.2em] text-[#00FF41] transition-all duration-300 shadow-[0_0_20px_rgba(0,255,65,0.2)] hover:shadow-[0_0_30px_rgba(0,255,65,0.45)] cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 text-[#39FF14]" />
            <span>BOOK A CONSULTATION</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] animate-ping" />
          </button>
        </motion.div>
      </div>

      {/* ─── 4. BOTTOM TELEMETRY BAR (MATCHING EXACT VIDEO COMPOSITION) ─── */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono uppercase select-none pointer-events-none pt-2"
      >
        {/* Left: Animated Neon Green Barcode Equalizer */}
        <div className="flex items-end gap-[2px] sm:gap-[2.5px] h-5">
          {equalizerBars.map((bar) => (
            <span
              key={bar.id}
              className="w-[2px] bg-[#00FF41] rounded-full shadow-[0_0_6px_rgba(0,255,65,0.85)]"
              style={{
                height: bar.h,
                animation: `greenEqualizerPulse ${bar.dur} ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Center: Minimalist Plus Telemetry Strip (Exact Video Match) */}
        <div className="flex items-center gap-3 sm:gap-8 md:gap-12 text-[10px] sm:text-xs font-semibold tracking-[0.2em] sm:tracking-[0.28em] text-white/90">
          <svg
            className="w-2.5 h-2.5 text-[#00FF41]/80 inline-block flex-shrink-0"
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
            className="w-2.5 h-2.5 text-[#00FF41]/80 inline-block flex-shrink-0"
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
            className="w-2.5 h-2.5 text-[#00FF41]/80 inline-block flex-shrink-0"
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
            className="w-2.5 h-2.5 text-[#00FF41]/80 inline-block flex-shrink-0"
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
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded bg-black/85 border border-[#00FF41]/30 shadow-[0_0_12px_rgba(0,0,0,0.9)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00FF41] shadow-[0_0_8px_#00FF41] animate-pulse" />
            <span className="text-[10px] text-white font-mono tracking-wider font-semibold">
              ONLINE <span className="text-[#00FF41]">&bull; Let&apos;s Connect</span>
            </span>
          </div>
        </div>
      </motion.div>

      <style>{`
        @keyframes greenEqualizerPulse {
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
