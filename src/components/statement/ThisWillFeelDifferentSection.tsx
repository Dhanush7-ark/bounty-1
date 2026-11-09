"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Sparkles } from "lucide-react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import Image from "next/image";

interface ThisWillFeelDifferentSectionProps {
  onBookConsultation?: () => void;
}

/**
 * ThisWillFeelDifferentSection
 * Full-screen cinematic statement section inspired by the reference video:
 * - Pure black background (#000000)
 * - Transformed into vivid Neon Green (#00FF41) & Deep Emerald
 * - Top-left Cyber-Gothic Sigil & Telemetry
 * - Iconic 3-line statement: "THIS WILL" / "FEEL" (with interlaced cyber-tribal winged emblem) / "DIFFERENT"
 * - Sub-pixel mouse tilt and subtle breathing volumetric glow
 * - Bottom Barcode equalizer & "+ TENSION + IMMERSION + IMPACT +" telemetry
 */
export function ThisWillFeelDifferentSection({
  onBookConsultation,
}: ThisWillFeelDifferentSectionProps) {
  const [isHoveredBtn, setIsHoveredBtn] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Mouse coords for smooth interactive 3D holographic tilt
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
      className="relative min-h-screen w-full flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-8 lg:px-12 overflow-hidden bg-[#000000] z-20 border-t border-b border-[#00FF41]/15 select-none"
    >
      {/* ─── 1. PURE SOLID BLACK BACKGROUND WITH VOLUMETRIC GREEN GLOW ─── */}
      <div className="absolute inset-0 bg-[#000000] pointer-events-none overflow-hidden">
        {/* Central Atmospheric Emerald Radiance */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] sm:w-[1200px] h-[600px] sm:h-[800px] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0, 255, 65, 0.08) 0%, rgba(0, 59, 32, 0.03) 45%, transparent 75%)",
            filter: "blur(80px)",
          }}
        />

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
      <div className="relative z-10 flex items-center justify-between w-full max-w-7xl mx-auto mb-4 sm:mb-6 pointer-events-none">
        {/* Cyber-Gothic Butterfly / Thorn Sigil */}
        <div className="flex items-center gap-3">
          <svg
            className="w-8 h-8 text-[#00FF41] filter drop-shadow-[0_0_10px_rgba(0,255,65,0.7)] transition-transform duration-300 hover:scale-110"
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

          <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#00FF41]/90 font-semibold">
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
      </div>

      {/* ─── 3. CENTERPIECE: EXACT "THIS WILL FEEL DIFFERENT" IN NEON GREEN ─── */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-center text-center my-auto py-4 sm:py-8">
        <motion.div
          style={{ rotateX: tiltX, rotateY: tiltY }}
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl flex items-center justify-center transform-gpu"
        >
          {/* Authentic High-Resolution Composition Image in Pure Neon Green */}
          <div className="relative w-full aspect-[2340/1180] max-h-[68vh] select-none pointer-events-none">
            <Image
              src="/this_will_feel_different_green.png"
              alt="THIS WILL FEEL DIFFERENT"
              fill
              priority
              className="object-contain filter drop-shadow-[0_0_30px_rgba(0,255,65,0.55)] drop-shadow-[0_0_75px_rgba(0,255,65,0.25)] transition-all duration-300"
            />

            {/* Glowing Winged Emblem Aura (Subtle 3D Breathing Pulse) */}
            <motion.div
              animate={{
                opacity: [0.65, 0.95, 0.65],
                scale: [0.99, 1.015, 0.99],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-[48%] aspect-[1060/750] -translate-y-[3%]">
                <Image
                  src="/cyber_tribal_emblem_green.png"
                  alt="Cyber Emblem Glow"
                  fill
                  className="object-contain filter drop-shadow-[0_0_35px_rgba(57,255,20,0.7)]"
                />
              </div>
            </motion.div>
          </div>

          {/* Holographic Glowing Pulse Layer */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40 animate-pulse"
            style={{
              background:
                "radial-gradient(circle at center, rgba(57, 255, 20, 0.35) 0%, rgba(0, 255, 65, 0.1) 40%, transparent 70%)",
              filter: "blur(30px)",
            }}
          />
        </motion.div>

        {/* Minimal Sub-statement & Consultation Trigger */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.35 }}
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
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between text-xs font-mono uppercase select-none pointer-events-none pt-4">
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
      </div>

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

