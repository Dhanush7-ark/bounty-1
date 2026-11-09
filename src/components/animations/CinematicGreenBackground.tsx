"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface CinematicGreenBackgroundProps {
  className?: string;
  showEmblem?: boolean;
  interactive?: boolean;
}

// ─── REUSABLE CLAW HAND PATHS (MATCHING FRAMES 9-16 OF REFERENCE STORYBOARD) ───

// Hand A: Splayed Gnarled Claw Hand (5 Articulated Talon Fingers)
function ClawHandA({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 360"
      className={className}
      fill="#030704"
      stroke="#00FF85"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="handGlowGreen" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Wrist rising from bottom */}
      <path
        d="M 58 360 L 68 275 C 68 245, 48 225, 44 195 C 38 165, 18 180, 10 160 C 5 150, 12 140, 24 146 C 34 152, 42 162, 46 176 C 46 146, 34 116, 26 82 C 22 62, 30 52, 36 62 C 42 72, 50 108, 54 142 C 56 112, 58 68, 60 28 C 61 14, 70 14, 72 28 C 74 68, 73 112, 72 148 C 76 118, 86 78, 94 48 C 98 34, 106 38, 104 52 C 100 86, 90 126, 86 162 C 94 142, 114 122, 126 106 C 134 96, 140 104, 134 116 C 122 136, 104 166, 92 192 C 86 226, 96 268, 94 360 Z"
        filter="url(#handGlowGreen)"
      />
      {/* Inner Knuckle & Bone Accents */}
      <path
        d="M 64 210 Q 70 190 74 165 M 52 195 Q 46 175 36 155 M 82 205 Q 92 185 106 160"
        stroke="#39FF9C"
        strokeWidth="1.2"
        fill="none"
        opacity="0.75"
      />
    </svg>
  );
}

// Hand B: Grasping Claw Arm (Sharp Hooked Talons Curling Inward)
function ClawHandB({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 360"
      className={className}
      fill="#030704"
      stroke="#00FF85"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="handGlowGreenB" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* Grasping arm contour */}
      <path
        d="M 64 360 L 70 255 C 72 215, 54 185, 34 175 C 17 167, 8 145, 12 130 C 18 120, 26 130, 34 145 C 44 160, 52 170, 56 175 C 54 135, 40 90, 30 46 C 26 26, 36 18, 43 31 C 53 51, 63 105, 66 145 C 70 100, 78 50, 86 12 C 90 -2, 98 0, 98 16 C 96 62, 86 116, 82 156 C 90 120, 108 70, 122 40 C 130 26, 137 34, 132 48 C 122 80, 102 130, 94 165 C 103 145, 126 120, 140 100 C 147 90, 155 98, 147 110 C 132 135, 110 175, 96 200 C 86 235, 90 275, 88 360 Z"
        filter="url(#handGlowGreenB)"
      />
      {/* Palm Shadow & Tendon Detail */}
      <path
        d="M 66 225 C 68 195, 76 170, 82 145"
        stroke="#39FF9C"
        strokeWidth="1.2"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

// Hand C: Tall Reaching Alien Talon (Long Wrist Reaching High Toward Center)
function ClawHandC({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 380"
      className={className}
      fill="#030704"
      stroke="#00FF85"
      strokeWidth="1.8"
      strokeLinejoin="round"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="handGlowGreenC" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M 52 380 L 58 230 C 60 180, 42 150, 28 132 C 16 118, 22 104, 32 112 C 44 122, 50 138, 54 158 C 52 112, 46 62, 42 18 C 40 2, 50 -2, 54 14 C 60 50, 62 105, 62 155 C 68 110, 78 60, 88 16 C 92 2, 100 5, 98 22 C 92 66, 80 120, 76 166 C 86 135, 106 100, 120 75 C 128 64, 134 71, 130 85 C 118 116, 96 160, 84 190 C 76 230, 78 275, 75 380 Z"
        filter="url(#handGlowGreenC)"
      />
    </svg>
  );
}

export function CinematicGreenBackground({
  className = "",
  showEmblem = true,
  interactive = true,
}: CinematicGreenBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Scroll tracking across the section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothScroll = useSpring(scrollYProgress, { stiffness: 85, damping: 22 });

  // Emblem transform driven by scroll & breathing
  const emblemScale = useTransform(smoothScroll, [0, 0.5, 1], [0.85, 1.15, 0.92]);
  const emblemY = useTransform(smoothScroll, [0, 0.5, 1], [35, 0, -35]);
  const emblemRotate = useTransform(smoothScroll, [0, 0.5, 1], [-2.5, 0, 2.5]);

  // Bottom Hands parallax & stretch on scroll
  const handsY = useTransform(smoothScroll, [0, 0.5, 1], [25, 0, -35]);

  // Mouse tilt for interactive 3D effect
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

  // ─── 60FPS LIQUID-INK GREEN FIRE CANVAS ENGINE ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const parent = canvas.parentElement;
      width = parent?.clientWidth || window.innerWidth || 1200;
      height = parent?.clientHeight || window.innerHeight || 800;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Green Plasma Spores / Embers System
    interface Ember {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
    }

    const embers: Ember[] = Array.from({ length: 42 }, () => ({
      x: Math.random() * (width || 1200),
      y: (height || 800) * 0.35 + Math.random() * (height || 800) * 0.65,
      vx: (Math.random() - 0.5) * 0.9,
      vy: -0.7 - Math.random() * 1.5,
      size: 1.2 + Math.random() * 2.8,
      alpha: 0.1,
      maxAlpha: 0.45 + Math.random() * 0.5,
      pulseSpeed: 0.02 + Math.random() * 0.04,
    }));

    let startTime = performance.now();

    const render = (now: number) => {
      const t = (now - startTime) * 0.001;
      const scrollVal = smoothScroll.get() || 0;

      // 1. Base Pitch Black (#030704)
      ctx.fillStyle = "#030704";
      ctx.fillRect(0, 0, width, height);

      // 2. Volumetric Ambient Green Bloom Behind Central Claws
      const centerGlow = ctx.createRadialGradient(
        width * 0.5,
        height * 0.62,
        40,
        width * 0.5,
        height * 0.62,
        width * 0.65
      );
      centerGlow.addColorStop(0, "rgba(0, 255, 133, 0.32)");
      centerGlow.addColorStop(0.35, "rgba(0, 143, 76, 0.22)");
      centerGlow.addColorStop(0.7, "rgba(6, 61, 32, 0.12)");
      centerGlow.addColorStop(1, "rgba(3, 7, 4, 0)");
      ctx.fillStyle = centerGlow;
      ctx.fillRect(0, 0, width, height);

      // ─── 3. DEEP EMERALD BACKGROUND FLAME MASS (#063D20 -> #008F4C) ───
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);

      const l1BaseY = height * (0.38 - scrollVal * 0.08);
      const points = 80;
      const step = width / points;

      for (let i = 0; i <= points; i++) {
        const x = i * step;
        const nx = x / width;

        const w1 = Math.sin(nx * 4.2 + t * 0.75) * 48;
        const w2 = Math.cos(nx * 7.8 - t * 0.95) * 28;
        const spike = Math.pow(Math.abs(Math.sin(nx * 9.5 + t * 1.15)), 3.2) * -65;

        const y = l1BaseY + w1 + w2 + spike;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const grad1 = ctx.createLinearGradient(0, l1BaseY - 60, 0, height);
      grad1.addColorStop(0, "rgba(0, 143, 76, 0.55)"); // Deep emerald
      grad1.addColorStop(0.45, "rgba(6, 61, 32, 0.85)"); // Primary dark green
      grad1.addColorStop(1, "#030704");
      ctx.fillStyle = grad1;
      ctx.fill();
      ctx.restore();

      // ─── 4. PRIMARY SURGING LIQUID FLAMES WITH NEON RIM (#00FF85) ───
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(0, height);

      const l2BaseY = height * (0.50 - scrollVal * 0.12);
      const flamePoints: { x: number; y: number }[] = [];

      for (let i = 0; i <= points; i++) {
        const x = i * step;
        const nx = x / width;

        const w1 = Math.sin(nx * 5.2 + t * 1.3) * 42;
        const w2 = Math.cos(nx * 9.6 - t * 1.6) * 26;
        const sharp1 = Math.pow(Math.abs(Math.sin(nx * 11.0 + t * 1.7)), 2.8) * -75;
        const sharp2 = Math.pow(Math.abs(Math.cos(nx * 15.5 - t * 2.3)), 3.5) * -45;

        const y = l2BaseY + w1 + w2 + sharp1 + sharp2;
        flamePoints.push({ x, y });
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const grad2 = ctx.createLinearGradient(0, l2BaseY - 100, 0, height);
      grad2.addColorStop(0, "rgba(0, 255, 133, 0.90)"); // Main neon green
      grad2.addColorStop(0.2, "rgba(0, 143, 76, 0.80)"); // Deep emerald
      grad2.addColorStop(0.6, "rgba(6, 61, 32, 0.92)"); // Primary dark green
      grad2.addColorStop(1, "#030704");
      ctx.fillStyle = grad2;
      ctx.fill();

      // Glowing Neon Rim
      ctx.beginPath();
      for (let i = 0; i < flamePoints.length; i++) {
        const p = flamePoints[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.strokeStyle = "#39FF9C";
      ctx.lineWidth = 2.8;
      ctx.shadowColor = "#00FF85";
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.restore();

      // ─── 5. FLOATING SPORES / GREEN EMBERS ───
      ctx.save();
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y += e.vy;
        e.x += e.vx + Math.sin(t * 1.5 + i) * 0.45;
        e.alpha = (Math.sin(t * e.pulseSpeed * 20 + i) * 0.5 + 0.5) * e.maxAlpha;

        if (e.y < height * 0.15 || e.x < 0 || e.x > width) {
          e.y = height * (0.6 + Math.random() * 0.4);
          e.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 156, ${e.alpha})`;
        ctx.shadowColor = "#00FF85";
        ctx.shadowBlur = e.size * 5;
        ctx.fill();
      }
      ctx.restore();

      // ─── 6. TOP & EDGE CINEMATIC VIGNETTE ───
      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.35,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.78
      );
      vignette.addColorStop(0, "rgba(3, 7, 4, 0)");
      vignette.addColorStop(0.7, "rgba(3, 7, 4, 0.4)");
      vignette.addColorStop(1, "rgba(3, 7, 4, 0.96)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [smoothScroll]);

  // Configurations for the 8 reaching black hands across bottom
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
      className={`relative w-full h-full overflow-hidden bg-[#030704] select-none ${className}`}
    >
      {/* ─── 1. FLUID GREEN FIRE CANVAS ENGINE ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      />

      {/* ─── 2. CENTRAL SYMMETRICAL CLAWED HANDS EMBLEM WITH TWIN GLOWING EYES (FRAMES 11-16) ─── */}
      {showEmblem && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          style={{
            scale: emblemScale,
            y: emblemY,
            rotate: emblemRotate,
          }}
          animate={{
            x: mousePos.x * 14,
            rotateX: -mousePos.y * 7,
            rotateY: mousePos.x * 7,
          }}
          transition={{ type: "spring", stiffness: 120, damping: 25 }}
        >
          {/* Ambient Flame Bloom */}
          <motion.div
            className="absolute w-[460px] sm:w-[700px] md:w-[900px] h-[340px] sm:h-[500px] md:h-[620px] rounded-full blur-[85px] pointer-events-none"
            animate={{
              opacity: [0.5, 0.9, 0.5],
              scale: [0.94, 1.08, 0.94],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0, 255, 133, 0.45) 0%, rgba(0, 143, 76, 0.25) 42%, rgba(6, 61, 32, 0.15) 68%, transparent 80%)",
            }}
          />

          {/* Symmetrical Twin Claw Hands & Demon Eyes Vector */}
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
              className="w-full h-auto filter drop-shadow-[0_0_26px_rgba(0,255,133,0.75)] drop-shadow-[0_0_70px_rgba(0,255,133,0.4)]"
              viewBox="0 0 1000 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="clawNeonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#39FF9C" />
                  <stop offset="30%" stopColor="#00FF85" />
                  <stop offset="65%" stopColor="#008F4C" />
                  <stop offset="100%" stopColor="#063D20" />
                </linearGradient>

                <filter id="eyeGlowFilter" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur1" />
                  <feGaussianBlur stdDeviation="14" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* ─── LEFT CLAW HAND (WRIST, PALM & TALON FINGERS SPREADING OUT) ─── */}
              <g id="leftClawWing">
                {/* Outer Talon / Wing Curve */}
                <path
                  d="M 500 300 C 465 185, 385 85, 240 35 C 305 102, 355 205, 375 285 C 325 230, 225 170, 110 140 C 180 215, 255 275, 325 325 C 245 315, 150 315, 55 335 C 150 380, 245 395, 330 400 C 235 430, 125 475, 50 550 C 150 515, 255 470, 340 435 C 260 480, 170 535, 95 600 C 210 565, 325 500, 410 435 C 450 390, 480 340, 500 300 Z"
                  fill="#063D20"
                  stroke="#00FF85"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />

                {/* Secondary Sharp Claw Overlays */}
                <path
                  d="M 435 230 C 380 135, 305 65, 200 25 C 265 100, 320 185, 350 265 Z"
                  fill="#008F4C"
                  stroke="#39FF9C"
                  strokeWidth="1.8"
                  opacity="0.95"
                />

                <path
                  d="M 370 325 C 285 270, 200 220, 105 190 C 170 255, 245 305, 320 345 Z"
                  fill="#00FF85"
                  stroke="#39FF9C"
                  strokeWidth="1.2"
                  opacity="0.85"
                />

                {/* Lower Curling Thumb Talon */}
                <path
                  d="M 415 435 C 350 480, 265 520, 160 565 C 255 530, 340 475, 395 435 Z"
                  fill="#00FF85"
                  stroke="#39FF9C"
                  strokeWidth="1.4"
                />

                {/* ─── PIERCING GLOWING DEMONIC EYE SLIT ─── */}
                {/* Sclera & Eye Contour */}
                <path
                  d="M 460 288 Q 420 288 406 310 Q 438 322 460 304 Z"
                  fill="#39FF9C"
                  filter="url(#eyeGlowFilter)"
                />
                {/* Horizontal Slit Pupil */}
                <ellipse cx="430" cy="302" rx="15" ry="3.5" fill="#030704" />
                {/* White-Hot Core Pupil Reflection */}
                <circle cx="430" cy="302" r="2.5" fill="#FFFFFF" filter="url(#eyeGlowFilter)" />
              </g>

              {/* ─── RIGHT CLAW HAND (MIRRORED WITH TWIN GLOWING EYE) ─── */}
              <use href="#leftClawWing" transform="translate(1000, 0) scale(-1, 1)" />

              {/* ─── CENTRAL STILETTO SPINE ─── */}
              <g id="centerSpine">
                <path
                  d="M 500 45 L 514 270 L 500 555 L 486 270 Z"
                  fill="#39FF9C"
                  stroke="#00FF85"
                  strokeWidth="2.2"
                  filter="url(#eyeGlowFilter)"
                />
                <circle cx="500" cy="300" r="8.5" fill="#FFFFFF" filter="url(#eyeGlowFilter)" />
                <path
                  d="M 500 250 L 532 300 L 500 350 L 468 300 Z"
                  fill="#063D20"
                  stroke="#39FF9C"
                  strokeWidth="2.2"
                />
              </g>
            </svg>
          </motion.div>
        </motion.div>
      )}

      {/* ─── 3. LAYER OF ANIMATED BLACK SKELETAL / DEMON CLAW HANDS REACHING FROM BOTTOM (FRAMES 9-16) ─── */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[380px] pointer-events-none z-20 flex items-end justify-between overflow-hidden"
        style={{ y: handsY }}
      >
        {bottomHandsConfig.map((hand) => {
          const HandComponent =
            hand.type === "A" ? ClawHandA : hand.type === "B" ? ClawHandB : ClawHandC;

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
              <HandComponent className="w-full h-full filter drop-shadow-[0_0_12px_rgba(0,255,133,0.55)]" />
            </motion.div>
          );
        })}

        {/* Solid Black Base Strip to anchor the wrists at the bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-[#030704] z-30 pointer-events-none" />
      </motion.div>

      {/* ─── 4. SUBTLE MATRIX SCANLINE TEXTURE OVERLAY ─── */}
      <div
        className="absolute inset-0 pointer-events-none z-30 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 133, 0.08) 2px, rgba(0, 255, 133, 0.08) 4px)",
        }}
      />
    </div>
  );
}
