"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { initOrganicBackground } from "@/animations/gsap/organicBackground";

interface GreenOrganicBackgroundProps {
  className?: string;
  showCenterThorn?: boolean;
  showBottomHands?: boolean;
  interactive?: boolean;
}

// ─── REUSABLE SHARP THORN CLAW & DEMON HEAD SILHOUETTES (FRAMES 9-16 OF REFERENCE) ───

function ThornClawA({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 360"
      className={className}
      fill="#000000"
      stroke="#00D978"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="greenRimGlowA" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#00FF85" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#greenRimGlowA)">
        <path d="M 58 360 L 68 275 C 68 245, 48 225, 44 195 C 38 165, 18 180, 10 160 C 5 150, 12 140, 24 146 C 34 152, 42 162, 46 176 C 46 146, 34 116, 26 82 C 22 62, 30 52, 36 62 C 42 72, 50 108, 54 142 C 56 112, 58 68, 60 28 C 61 14, 70 14, 72 28 C 74 68, 73 112, 72 148 C 76 118, 86 78, 94 48 C 98 34, 106 38, 104 52 C 100 86, 90 126, 86 162 C 94 142, 114 122, 126 106 C 134 96, 140 104, 134 116 C 122 136, 104 166, 92 192 C 86 226, 96 268, 94 360 Z" />
        <path
          d="M 64 210 Q 70 190 74 165 M 52 195 Q 46 175 36 155 M 82 205 Q 92 185 106 160"
          stroke="#39FF9B"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
      </g>
      {/* Glowing Green Eye Cutout in Demon Silhouette */}
      <circle cx="70" cy="190" r="11" fill="#00FF85" className="animate-pulse" />
      <circle cx="70" cy="190" r="6" fill="#39FF9B" />
      <circle cx="70" cy="190" r="3" fill="#FFFFFF" />
    </svg>
  );
}

function ThornClawB({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 360"
      className={className}
      fill="#000000"
      stroke="#00D978"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="greenRimGlowB" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#00FF85" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#greenRimGlowB)">
        <path d="M 64 360 L 70 255 C 72 215, 54 185, 34 175 C 17 167, 8 145, 12 130 C 18 120, 26 130, 34 145 C 44 160, 52 170, 56 175 C 54 135, 40 90, 30 46 C 26 26, 36 18, 43 31 C 53 51, 63 105, 66 145 C 70 100, 78 50, 86 12 C 90 -2, 98 0, 98 16 C 96 62, 86 116, 82 156 C 90 120, 108 70, 122 40 C 130 26, 137 34, 132 48 C 122 80, 102 130, 94 165 C 103 145, 126 120, 140 100 C 147 90, 155 98, 147 110 C 132 135, 110 175, 96 200 C 86 235, 90 275, 88 360 Z" />
        <path
          d="M 66 225 C 68 195, 76 170, 82 145"
          stroke="#39FF9B"
          strokeWidth="1.2"
          fill="none"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}

function ThornClawC({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 380"
      className={className}
      fill="#000000"
      stroke="#00D978"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="greenRimGlowC" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="-4" stdDeviation="5" floodColor="#00FF85" floodOpacity="0.8" />
        </filter>
      </defs>
      <g filter="url(#greenRimGlowC)">
        <path d="M 52 380 L 58 230 C 60 180, 42 150, 28 132 C 16 118, 22 104, 32 112 C 44 122, 50 138, 54 158 C 52 112, 46 62, 42 18 C 40 2, 50 -2, 54 14 C 60 50, 62 105, 62 155 C 68 110, 78 60, 88 16 C 92 2, 100 5, 98 22 C 92 66, 80 120, 76 166 C 86 135, 106 100, 120 75 C 128 64, 134 71, 130 85 C 118 116, 96 160, 84 190 C 76 230, 78 275, 75 380 Z" />
      </g>
      {/* Glowing Green Eye Cutout */}
      <circle cx="75" cy="195" r="12" fill="#00FF85" className="animate-pulse" />
      <circle cx="75" cy="195" r="7" fill="#39FF9B" />
      <circle cx="75" cy="195" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

export function GreenOrganicBackground({
  className = "",
  showCenterThorn = true,
  showBottomHands = true,
  interactive = true,
}: GreenOrganicBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thornRef = useRef<HTMLDivElement>(null);

  // Scroll tracking with smooth spring physics
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 85, damping: 22 });

  // Center Thorn transform driven by scroll & breathing
  const thornScale = useTransform(smoothScroll, [0, 0.5, 1], [0.86, 1.15, 0.9]);
  const thornY = useTransform(smoothScroll, [0, 0.5, 1], [30, 0, -35]);
  const thornRotate = useTransform(smoothScroll, [0, 0.5, 1], [-2, 0, 2]);

  // Bottom Hands parallax & stretch on scroll
  const handsY = useTransform(smoothScroll, [0, 0.5, 1], [25, 0, -30]);

  // Mouse interaction for subtle 3D tilt
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  }, [interactive]);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  // Initialize the Organic Background Engine (GSAP + Procedural Morph Engine)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cleanup = initOrganicBackground({
      container,
      canvas: canvasRef.current,
      centerThorn: thornRef.current,
    });

    return () => {
      cleanup();
    };
  }, []);

  // Bottom Reaching Thorn/Claw Hands configuration
  const bottomHandsConfig = [
    { id: 1, type: "A", left: "2%", width: 140, height: 260, delay: 0.0, duration: 4.8, flip: false, zIndex: 12 },
    { id: 2, type: "B", left: "13%", width: 160, height: 310, delay: 0.8, duration: 5.2, flip: false, zIndex: 14 },
    { id: 3, type: "C", left: "25%", width: 150, height: 360, delay: 1.6, duration: 5.6, flip: false, zIndex: 15 },
    { id: 4, type: "A", left: "37%", width: 160, height: 320, delay: 2.2, duration: 5.0, flip: false, zIndex: 13 },
    { id: 5, type: "A", left: "51%", width: 160, height: 320, delay: 1.1, duration: 5.1, flip: true, zIndex: 13 },
    { id: 6, type: "C", left: "63%", width: 150, height: 360, delay: 2.8, duration: 5.5, flip: true, zIndex: 15 },
    { id: 7, type: "B", left: "75%", width: 160, height: 310, delay: 0.5, duration: 5.3, flip: true, zIndex: 14 },
    { id: 8, type: "A", left: "87%", width: 140, height: 260, delay: 1.9, duration: 4.9, flip: true, zIndex: 12 },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full overflow-hidden bg-[#000000] select-none ${className}`}
    >
      {/* ─── 1. LARGE HORIZONTAL ORGANIC SILHOUETTES & PROCEDURAL FLUID CANVAS ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      />

      {/* ─── 2. DRAMATIC CENTER THORN-LIKE ABSTRACT SHAPE WITH TWIN PIERCING EYES ─── */}
      {showCenterThorn && (
        <motion.div
          ref={thornRef}
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{
            scale: thornScale,
            y: thornY,
            rotate: thornRotate,
          }}
          animate={{
            x: mousePos.x * 12,
            rotateX: -mousePos.y * 6,
            rotateY: mousePos.x * 6,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          {/* Controlled Subtle Green Glow (#00FF8530) Behind Center Thorn */}
          <motion.div
            className="absolute w-[440px] sm:w-[680px] md:w-[880px] h-[320px] sm:h-[480px] md:h-[600px] rounded-full blur-[80px] pointer-events-none"
            animate={{
              opacity: [0.45, 0.85, 0.45],
              scale: [0.95, 1.06, 0.95],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 217, 120, 0.35) 0%, rgba(0, 143, 72, 0.22) 42%, rgba(0, 61, 32, 0.12) 68%, transparent 80%)",
            }}
          />

          {/* Symmetrical Thorn Creature Vector with Asymmetrical Details */}
          <motion.div
            className="relative w-[340px] sm:w-[560px] md:w-[740px] lg:w-[900px] h-auto pointer-events-none"
            animate={{
              scale: [0.97, 1.03, 0.97],
            }}
            transition={{
              duration: 3.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg
              className="w-full h-auto filter drop-shadow-[0_0_24px_rgba(0,217,120,0.65)] drop-shadow-[0_0_65px_rgba(0,143,72,0.35)]"
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="emeraldThornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39FF9B" />
                  <stop offset="30%" stopColor="#00D978" />
                  <stop offset="65%" stopColor="#008F48" />
                  <stop offset="100%" stopColor="#003D20" />
                </linearGradient>

                <filter id="thornEyeGlow" x="-35%" y="-35%" width="170%" height="170%">
                  <feGaussianBlur stdDeviation="3.5" result="blur1" />
                  <feGaussianBlur stdDeviation="12" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─── LEFT WING / THORN CLAW WITH ASYMMETRICAL BARBS ─── */}
              <g id="leftThornWing">
                {/* Primary Upper Barbed Thorn Horn */}
                <path
                  d="M 500 300 C 465 185, 385 85, 240 35 C 305 102, 355 205, 375 285 C 325 230, 225 170, 110 140 C 180 215, 255 275, 325 325 C 245 315, 150 315, 55 335 C 150 380, 245 395, 330 400 C 235 430, 125 475, 50 550 C 150 515, 255 470, 340 435 C 260 480, 170 535, 95 600 C 210 565, 325 500, 410 435 C 450 390, 480 340, 500 300 Z"
                  fill="#003D20"
                  stroke="#00D978"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />

                {/* Secondary Sharp Emerald Thorn Overlays */}
                <path
                  d="M 435 230 C 380 135, 305 65, 200 25 C 265 100, 320 185, 350 265 Z"
                  fill="#008F48"
                  stroke="#39FF9B"
                  strokeWidth="1.8"
                  opacity="0.95"
                />

                <path
                  d="M 370 325 C 285 270, 200 220, 105 190 C 170 255, 245 305, 320 345 Z"
                  fill="#00D978"
                  stroke="#39FF9B"
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* Lower Curling Thorn Tendril */}
                <path
                  d="M 415 435 C 350 480, 265 520, 160 565 C 255 530, 340 475, 395 435 Z"
                  fill="#00D978"
                  stroke="#39FF9B"
                  strokeWidth="1.4"
                />

                {/* Piercing Glowing Slit Eye in Center */}
                <path
                  d="M 460 288 Q 420 288 406 310 Q 438 322 460 304 Z"
                  fill="#39FF9B"
                  filter="url(#thornEyeGlow)"
                />
                <ellipse cx="430" cy="302" rx="15" ry="3.5" fill="#000000" />
                <circle cx="430" cy="302" r="2.5" fill="#FFFFFF" filter="url(#thornEyeGlow)" />
              </g>

              {/* ─── RIGHT WING / THORN CLAW (MIRRORED TRANSFORM) ─── */}
              <use href="#leftThornWing" transform="translate(1000, 0) scale(-1, 1)" />

              {/* ─── CENTRAL STILETTO SPINE & RAZOR CORE ─── */}
              <g id="centerSpineThorn">
                <path
                  d="M 500 45 L 514 270 L 500 555 L 486 270 Z"
                  fill="#39FF9B"
                  stroke="#00D978"
                  strokeWidth="2.2"
                  filter="url(#thornEyeGlow)"
                />
                <circle cx="500" cy="300" r="8.5" fill="#FFFFFF" filter="url(#thornEyeGlow)" />
                <path
                  d="M 500 250 L 532 300 L 500 350 L 468 300 Z"
                  fill="#003D20"
                  stroke="#39FF9B"
                  strokeWidth="2.2"
                />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* ─── 3. LAYERED SHARP BLACK THORN SILHOUETTES REACHING FROM BOTTOM (FRAMES 9-16) ─── */}
      {showBottomHands && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none z-20 flex items-end justify-between overflow-hidden"
          style={{ y: handsY }}
        >
          {bottomHandsConfig.map((hand) => {
            const Component =
              hand.type === "A" ? ThornClawA : hand.type === "B" ? ThornClawB : ThornClawC;

            return (
              <motion.div
                key={hand.id}
                className="absolute bottom-[-15px] pointer-events-none"
                style={{
                  left: hand.left,
                  width: `${hand.width}px`,
                  height: `${hand.height}px`,
                  zIndex: hand.zIndex,
                  transform: hand.flip ? "scaleX(-1)" : "none",
                }}
                animate={{
                  y: [0, -26, 0],
                  rotate: hand.flip ? [2, -3.5, 2] : [-2, 3.5, -2],
                  scaleY: [0.96, 1.05, 0.96],
                }}
                transition={{
                  duration: hand.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: hand.delay,
                }}
              >
                <Component className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,217,120,0.5)]" />
              </motion.div>
            );
          })}

          {/* Pure Black Base Strip anchoring the silhouette wrists */}
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#000000] z-30 pointer-events-none" />
        </motion.div>
      )}

      {/* ─── 4. SUBTLE VIGNETTE / SCANLINE TEXTURE OVERLAY ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-15 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 120, 0.08) 2px, rgba(0, 217, 120, 0.08) 4px)",
        }}
      />
    </div>
  );
}

