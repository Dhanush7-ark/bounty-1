"use client";

import { useEffect, useRef, useState } from "react";

// Symmetrical tribal emblem half-wing vertices (will be mirrored)
const WING_OUTER: [number, number][] = [
  [0, -70],
  [-15, -95],
  [-30, -135],
  [-44, -185], // tall primary spike tip
  [-38, -135],
  [-78, -160], // upper secondary horn
  [-62, -108],
  [-115, -125], // outer horn 3
  [-88, -78],
  [-170, -84], // main wide wing barb 1
  [-125, -42],
  [-205, -32], // main wide wing barb 2
  [-145, 6],
  [-175, 48], // lower wide horn
  [-118, 48],
  [-138, 98], // lower tail barb
  [-78, 78],
  [-88, 128], // bottom barb
  [-46, 98],
  [-26, 138], // lowest tip
  [0, 72],
];

const CUTOUT_UPPER: [number, number][] = [
  [-35, -45],
  [-68, -58],
  [-98, -36],
  [-68, -20],
  [-35, -30],
];

const CUTOUT_LOWER: [number, number][] = [
  [-30, 16],
  [-68, 16],
  [-88, 42],
  [-52, 48],
  [-26, 32],
];

export function CinematicGreenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    // Check reduced motion
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });

    // Track scroll position smoothly
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const handleScroll = () => {
      targetScrollY = window.scrollY;
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Visibility listener to pause when tab is inactive
    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    let startTime = performance.now();

    // ─── Procedural Liquid-Flame Curve Generator ───
    // Computes y value with sharp crests (|sin|^p) and multi-octave harmonic modulation
    const getFlameY = (
      x: number,
      time: number,
      baseY: number,
      freqScale: number,
      speedScale: number,
      ampScale: number
    ) => {
      const s1 = Math.sin(x * 0.0025 * freqScale + time * 0.7 * speedScale);
      const s2 = Math.sin(x * 0.0065 * freqScale - time * 1.1 * speedScale + 1.2);
      const s3 = Math.sin(x * 0.014 * freqScale + time * 1.8 * speedScale + 2.5);
      const s4 = Math.sin(x * 0.03 * freqScale - time * 2.5 * speedScale + 0.8);

      // Sharp, licking crest shaping via powered absolute sine waves
      const crest =
        (Math.pow(Math.abs(s1), 1.8) * 95 +
          Math.pow(Math.abs(s2), 2.2) * 55 +
          Math.pow(Math.abs(s3), 2.4) * 30 +
          Math.pow(Math.abs(s4), 2.0) * 14) *
        ampScale;

      return baseY - crest;
    };

    // ─── Top Inverted Canopy Wave ───
    const getTopCanopyY = (x: number, time: number, baseTop: number) => {
      const s1 = Math.sin(x * 0.002 + time * 0.5);
      const s2 = Math.sin(x * 0.0055 - time * 0.9 + 1.8);
      const crest = Math.pow(Math.abs(s1), 1.9) * 60 + Math.pow(Math.abs(s2), 2.1) * 35;
      return baseTop + crest;
    };

    // ─── Render Loop ───
    const render = (now: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth scroll interpolation (damping)
      currentScrollY += (targetScrollY - currentScrollY) * 0.1;
      const scrollRatio = Math.min(1, Math.max(0, currentScrollY / maxScroll));

      const elapsed = (now - startTime) * 0.001;
      const t = motionQuery.matches ? 0 : elapsed;

      ctx.save();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // ─── 1. BASE BACKGROUND: #030704 ───
      ctx.fillStyle = "#030704";
      ctx.fillRect(0, 0, width, height);

      // ─── 2. DEEP ATMOSPHERIC RADIAL GLOW BEHIND CENTER ───
      const centerGlowY = height * 0.46;
      const radialGlow = ctx.createRadialGradient(
        width * 0.5,
        centerGlowY,
        20,
        width * 0.5,
        centerGlowY,
        Math.max(width, height) * 0.65
      );
      radialGlow.addColorStop(0, "rgba(0, 255, 133, 0.22)");
      radialGlow.addColorStop(0.35, "rgba(0, 143, 76, 0.16)");
      radialGlow.addColorStop(0.65, "rgba(6, 61, 32, 0.12)");
      radialGlow.addColorStop(1, "rgba(3, 7, 4, 0)");
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      // ─── 3. TOP INVERTED ORGANIC DRIPPING FLUID CANOPY ───
      const topBase = height * 0.08 + Math.sin(t * 0.4) * 15;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, topBase);
      for (let x = 0; x <= width; x += 6) {
        ctx.lineTo(x, getTopCanopyY(x, t, topBase));
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fillStyle = "#063D20";
      ctx.fill();

      // Top canopy inner highlight line
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const y = getTopCanopyY(x, t, topBase);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(0, 255, 133, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // ─── 4. LIQUID FLAME SILHOUETTES RISING FROM BOTTOM ───
      // Dynamic vertical rise influenced by scroll position
      const scrollRise = Math.sin(scrollRatio * Math.PI) * 120 + scrollRatio * 60;

      // ── LAYER 1: DEEP DARK GREEN MASS (#063D20) ──
      const l1BaseY = height * 0.92 - scrollRise * 0.7;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, l1BaseY);
      for (let x = 0; x <= width; x += 6) {
        ctx.lineTo(x, getFlameY(x, t, l1BaseY, 0.9, 0.7, 1.25));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#063D20";
      ctx.fill();

      // ── LAYER 2: DEEP EMERALD LIQUID BODY (#008F4C) ──
      const l2BaseY = height * 0.94 - scrollRise * 0.85;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, l2BaseY);
      for (let x = 0; x <= width; x += 6) {
        ctx.lineTo(x, getFlameY(x, t + 1.8, l2BaseY, 1.15, 1.0, 1.1));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#008F4C";
      ctx.fill();

      // ── LAYER 3: MAIN NEON GREEN LUMINOUS TENDRILS (#00FF85 & #39FF9C) ──
      const l3BaseY = height * 0.97 - scrollRise;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, l3BaseY);
      for (let x = 0; x <= width; x += 6) {
        ctx.lineTo(x, getFlameY(x, t + 3.4, l3BaseY, 1.35, 1.3, 0.95));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#00FF85";
      ctx.shadowColor = "rgba(0, 255, 133, 0.6)";
      ctx.shadowBlur = 24;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Sharp highlight rim stroke along neon wave crest
      ctx.beginPath();
      for (let x = 0; x <= width; x += 6) {
        const y = getFlameY(x, t + 3.4, l3BaseY, 1.35, 1.3, 0.95);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#39FF9C";
      ctx.lineWidth = 2.2;
      ctx.stroke();

      // ── LAYER 4: RISING BLACK LIQUID SILHOUETTE (#030704) ──
      // Sharp black organic claws licking upward from the bottom into the green fluid (matching reference)
      const l4BaseY = height + 35 - scrollRise * 1.1;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, l4BaseY);
      for (let x = 0; x <= width; x += 6) {
        ctx.lineTo(x, getFlameY(x, t + 5.0, l4BaseY, 1.6, 1.5, 0.85));
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = "#030704";
      ctx.fill();

      // ─── 5. CENTRAL SYMMETRICAL TRIBAL EMBLEM (ANIMATED, LIVING, SCROLL-REACTIVE) ───
      const emblemCenterX = width * 0.5;
      // Center Y shifts gently with parallax and scroll
      const emblemCenterY = height * 0.46 + Math.sin(t * 0.8) * 8 - (currentScrollY * 0.12) % (height * 1.5);

      // Gentle breathing scale + scroll-based expansion
      const breathingScale = Math.sin(t * 1.2) * 0.06;
      // Scales up dynamically as user scrolls through the statement section
      const scrollScaleMod = Math.sin(scrollRatio * Math.PI) * 0.35;
      const responsiveBaseScale = Math.min(width / 1100, 1.15) * 1.0;
      const emblemScale = Math.max(0.65, responsiveBaseScale * (1.0 + breathingScale + scrollScaleMod));

      // Subtle organic rotation oscillation
      const emblemRotation = Math.sin(t * 0.7) * 0.035; // ~2 degrees

      ctx.save();
      ctx.translate(emblemCenterX, emblemCenterY);
      ctx.rotate(emblemRotation);
      ctx.scale(emblemScale, emblemScale);

      // Emblem glow aura
      ctx.shadowColor = "rgba(0, 255, 133, 0.65)";
      ctx.shadowBlur = 32;

      // Function to render warped wing with organic vertex breathing
      const drawWingPath = (isRight: boolean) => {
        const sign = isRight ? -1 : 1;
        ctx.beginPath();
        for (let i = 0; i < WING_OUTER.length; i++) {
          const [ox, oy] = WING_OUTER[i];
          // Organic vertex ripple
          const rippleX = Math.sin(t * 2.2 + oy * 0.04) * 3.2;
          const rippleY = Math.cos(t * 1.9 + ox * 0.04) * 2.8;
          const px = (ox + rippleX) * sign;
          const py = oy + rippleY;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      };

      const drawCutoutPath = (cutout: [number, number][], isRight: boolean) => {
        const sign = isRight ? -1 : 1;
        ctx.beginPath();
        for (let i = 0; i < cutout.length; i++) {
          const [ox, oy] = cutout[i];
          const px = ox * sign;
          const py = oy;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
      };

      // Draw Left Wing
      drawWingPath(false);
      ctx.fillStyle = "#063D20";
      ctx.fill();
      ctx.strokeStyle = "#00FF85";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Draw Right Wing (Symmetrical)
      drawWingPath(true);
      ctx.fillStyle = "#063D20";
      ctx.fill();
      ctx.strokeStyle = "#00FF85";
      ctx.lineWidth = 2.4;
      ctx.stroke();

      // Inner Cutout 1 (Pierced negative space)
      drawCutoutPath(CUTOUT_UPPER, false);
      ctx.fillStyle = "#030704";
      ctx.fill();
      ctx.strokeStyle = "#39FF9C";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      drawCutoutPath(CUTOUT_UPPER, true);
      ctx.fillStyle = "#030704";
      ctx.fill();
      ctx.strokeStyle = "#39FF9C";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      // Inner Cutout 2
      drawCutoutPath(CUTOUT_LOWER, false);
      ctx.fillStyle = "#030704";
      ctx.fill();
      ctx.strokeStyle = "#008F4C";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      drawCutoutPath(CUTOUT_LOWER, true);
      ctx.fillStyle = "#030704";
      ctx.fill();
      ctx.strokeStyle = "#008F4C";
      ctx.lineWidth = 1.2;
      ctx.stroke();

      // Center Spire & Core Needle
      ctx.beginPath();
      ctx.moveTo(0, -170);
      ctx.lineTo(5, -60);
      ctx.lineTo(9, 30);
      ctx.lineTo(0, 110);
      ctx.lineTo(-9, 30);
      ctx.lineTo(-5, -60);
      ctx.closePath();
      ctx.fillStyle = "#39FF9C";
      ctx.fill();
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Nucleus / Eye Beacon
      ctx.beginPath();
      ctx.arc(0, -8, 8, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.shadowColor = "#00FF85";
      ctx.shadowBlur = 18;
      ctx.fill();

      ctx.restore();

      // ─── 6. FLOATING EMERALD MICRO-EMBERS & PARTICLES ───
      const emberCount = 20;
      ctx.fillStyle = "#39FF9C";
      for (let i = 0; i < emberCount; i++) {
        const seed = i * 137.5;
        const px = (seed * 11 + t * 25 * ((i % 3) + 1)) % width;
        const py = height - ((seed * 17 + t * 45 * ((i % 2) + 0.8)) % (height * 0.75));
        const pSize = 1.2 + (i % 3) * 0.8;
        const pAlpha = 0.25 + 0.5 * Math.sin(t * 2 + i);

        ctx.globalAlpha = Math.max(0, pAlpha);
        ctx.beginPath();
        ctx.arc(px, py, pSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("visibilitychange", handleVisibility);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030704]">
      {/* 2D High-Performance WebGL/Canvas Animation Layer */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Subtle Matrix Dot Grid (Very fine texture) */}
      <div className="absolute inset-0 bg-grid-pattern opacity-15 pointer-events-none" />
    </div>
  );
}
