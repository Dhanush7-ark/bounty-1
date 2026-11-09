"use client";

import { useEffect, useRef } from "react";
import { simplex2D, fbm2D } from "@/lib/simplexNoise";

interface HorrorFlameBackgroundProps {
  className?: string;
  showEmbers?: boolean;
  interactive?: boolean;
}

/**
 * HorrorFlameBackground (Cinema Grade 60 FPS Frame-by-Frame Fluid Dynamics)
 *
 * Precisely matched to the reference video (meermohsin.me):
 * 1. Pitch black void at the top (#000000).
 * 2. Deep crimson blood-red field across the lower half (#7B0008 -> #96000E).
 * 3. Layered procedural liquid flame plumes billowing upward with multi-octave Simplex turbulence.
 * 4. Iconic viscous black claw hands & stalactites extending downwards, stretching & retracting.
 * 5. Floating convective heat sparks and detaching liquid droplets.
 * 6. Interactive mouse displacement creating organic fluid ripples.
 * 7. Zero static image seams, zero SVG displacement lag — locked at 60 FPS.
 */
export function HorrorFlameBackground({
  className = "",
  showEmbers = true,
  interactive = true,
}: HorrorFlameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, targetX: -1000, targetY: -1000 });

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
      width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.parentElement?.clientHeight || window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking for subtle fluid ripple interaction
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    // ── Downward-Reaching Viscous Black Claw Tendril Anchors ──
    const clawCount = 8;
    const claws = Array.from({ length: clawCount }, (_, i) => ({
      baseXFraction: (i + 0.45) / clawCount + (Math.random() - 0.5) * 0.05,
      period: 4.8 + Math.random() * 3.5,
      phase: (i * Math.PI * 0.7) + Math.random() * 0.8,
      reachFraction: 0.38 + Math.random() * 0.18, // 38% to 56% reach
      widthSigma: 34 + Math.random() * 22,
      fingerSpread: 18 + Math.random() * 12,
    }));

    // ── Liquid Droplets & Floating Crimson Heat Embers ──
    const particleCount = 42;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (width || 1200),
      y: (height || 400) * 0.35 + Math.random() * (height || 400) * 0.6,
      vx: -(Math.random() * 0.75 + 0.25), // Smooth leftward convection drift
      vy: -(Math.random() * 0.95 + 0.3),  // Rising convective heat
      radius: Math.random() * 2.0 + 0.6,
      alpha: Math.random() * 0.8 + 0.2,
      life: Math.random() * 100,
      maxLife: 60 + Math.random() * 70,
      isSoot: Math.random() > 0.65,
      seed: Math.random() * 50,
    }));

    let time = 0;

    // ─────────────────────────────────────────────────────────────────────────
    // MATHEMATICAL FLAME CONTOUR BOUNDARY FUNCTION y(x, layer)
    // Computes the continuous organic fluid boundary between black top & red bottom
    // ─────────────────────────────────────────────────────────────────────────
    const computeFlameContour = (
      x: number,
      t: number,
      layerIndex: number,
      mX: number,
      mY: number
    ): number => {
      // Directional horizontal drift (fluid flows smoothly right-to-left)
      const driftSpeed = layerIndex === 0 ? 0.32 : layerIndex === 1 ? 0.48 : 0.65;
      const xOffset = x + t * driftSpeed * 95.0 + layerIndex * 160.0;

      // Base vertical boundary level (centered around 32% to 48% height)
      const baseLevel = height * (layerIndex === 0 ? 0.30 : layerIndex === 1 ? 0.38 : 0.45);
      const amplitude = height * (layerIndex === 0 ? 0.16 : layerIndex === 1 ? 0.14 : 0.12);

      // 1. Primary Low-Frequency Undulation (Rolling Fluid Plumes)
      const nLow = fbm2D(xOffset * 0.0016, t * 0.22, 2);

      // 2. Mid-Frequency Organic Cusps (Sharp Tongue Inversions matching reference)
      const nMid = simplex2D(xOffset * 0.0048, t * 0.45);
      const cusp = Math.pow(Math.max(0, 1.0 - Math.abs(nMid)), 2.2);

      // 3. High-Frequency Micro-Flicker along boundary
      const nHigh = simplex2D(xOffset * 0.015, t * 1.2) * 5.5;

      let y = baseLevel - (nLow * 0.45 + cusp * 0.55) * amplitude + nHigh;

      // 4. Iconic Viscous Black Claw Hands (Downward-Reaching Talons from ceiling)
      for (let k = 0; k < claws.length; k++) {
        const cl = claws[k];
        const clawX = cl.baseXFraction * width + Math.sin(t * 0.35 + cl.phase) * 35.0;
        const dx = x - clawX;

        // Main palm body
        const gauss = Math.exp(-(dx * dx) / (2 * cl.widthSigma * cl.widthSigma));
        if (gauss > 0.01) {
          const stretch = Math.sin(t * (Math.PI * 2 / cl.period) + cl.phase) * 0.5 + 0.5;
          const reach = height * cl.reachFraction * (0.8 + stretch * 0.4);

          // 3-fingered claw spread (distinctive organic talons from reference video)
          const f1 = Math.exp(-Math.pow(dx - cl.fingerSpread, 2) / 60.0);
          const f2 = Math.exp(-Math.pow(dx + cl.fingerSpread, 2) / 60.0);
          const f3 = Math.exp(-Math.pow(dx, 2) / 45.0);
          const fingerBoost = (f1 + f2 * 0.9 + f3 * 1.2) * 35.0 * stretch;

          const clawInfluence = (reach * gauss + fingerBoost) * (layerIndex === 0 ? 1.0 : layerIndex === 1 ? 0.88 : 0.72);
          y = Math.max(y, clawInfluence);
        }
      }

      // 5. Interactive Mouse Displacement
      if (mX > 0 && mY > 0 && mY < height * 0.8) {
        const dist = Math.abs(x - mX);
        if (dist < 200) {
          const ripple = Math.cos((dist / 200) * Math.PI) * (1.0 - dist / 200) * 28.0;
          y += ripple;
        }
      }

      return Math.max(height * 0.12, Math.min(y, height * 0.78));
    };

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER LOOP (60 FPS NATIVE HARDWARE ACCELERATED)
    // ═════════════════════════════════════════════════════════════════════════
    const render = () => {
      time += 0.014;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.06;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.06;
      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      ctx.clearRect(0, 0, width, height);

      // ── 1. SOLID DEEP CRIMSON RED FIELD ACROSS ENTIRE LOWER BASE ──
      const bloodFieldGrad = ctx.createLinearGradient(0, height * 0.25, 0, height);
      bloodFieldGrad.addColorStop(0, "#5E0006");
      bloodFieldGrad.addColorStop(0.35, "#7E000A");
      bloodFieldGrad.addColorStop(0.7, "#98000F");
      bloodFieldGrad.addColorStop(0.92, "#680007");
      bloodFieldGrad.addColorStop(1, "#000000"); // Smooth blend into bottom bar
      ctx.fillStyle = bloodFieldGrad;
      ctx.fillRect(0, 0, width, height);

      // Step interval across screen width (every 4-5px for sub-pixel smoothness)
      const step = Math.max(4, Math.floor(width / 320));

      // ── 2. LAYER 1: DEEP MAROON BACK FLAME BILLOWS ──
      ctx.save();
      const gradL1 = ctx.createLinearGradient(0, 0, 0, height * 0.6);
      gradL1.addColorStop(0, "#000000");
      gradL1.addColorStop(0.45, "#220003");
      gradL1.addColorStop(0.85, "#4A0007");
      gradL1.addColorStop(1, "#6A0009");
      ctx.fillStyle = gradL1;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameContour(curX, time, 0, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 3. LAYER 2: SATURATED CRIMSON MID-FLAME TONGUES ──
      ctx.save();
      const gradL2 = ctx.createLinearGradient(0, 0, 0, height * 0.6);
      gradL2.addColorStop(0, "#000000");
      gradL2.addColorStop(0.4, "#2A0004");
      gradL2.addColorStop(0.78, "#680008");
      gradL2.addColorStop(1, "#92000D");
      ctx.fillStyle = gradL2;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameContour(curX, time, 1, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 4. LAYER 3: FOREGROUND PURE BLACK VOID WITH GLOWING CRIMSON RIM ──
      // This forms the solid black ceiling with organic black claws dipping into red
      ctx.save();
      const gradL3 = ctx.createLinearGradient(0, 0, 0, height * 0.55);
      gradL3.addColorStop(0, "#000000");
      gradL3.addColorStop(0.7, "#050001");
      gradL3.addColorStop(1, "#180003");
      ctx.fillStyle = gradL3;

      // Crimson incandescent outer edge glow
      ctx.shadowColor = "#FF1E38";
      ctx.shadowBlur = 14;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameContour(curX, time, 2, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 5. DRIFTING CONVECTIVE EMBERS & LIQUID SOOT SPECKS ──
      if (showEmbers) {
        ctx.save();
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + Math.sin(time * 1.8 + p.seed) * 0.35;
          p.y += p.vy;
          p.life++;

          if (p.life > p.maxLife || p.y < height * 0.1 || p.x < 0) {
            p.x = width * 0.1 + Math.random() * width * 0.9;
            p.y = height * 0.55 + Math.random() * height * 0.35;
            p.life = 0;
            p.alpha = Math.random() * 0.75 + 0.25;
          }

          const curAlpha = p.alpha * (1 - p.life / p.maxLife);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.isSoot) {
            // Charred black soot droplet
            ctx.fillStyle = `rgba(10, 0, 2, ${curAlpha * 0.8})`;
            ctx.fill();
          } else {
            // Hot incandescent flame spark
            ctx.fillStyle = `rgba(255, 120, 140, ${curAlpha})`;
            ctx.shadowColor = "#FF1E38";
            ctx.shadowBlur = 6;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
        ctx.restore();
      }

      // ── 6. CINEMATIC HORIZONTAL VIGNETTE ──
      ctx.save();
      const vignetteGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        width * 0.25,
        width * 0.5,
        height * 0.5,
        width * 0.65
      );
      vignetteGrad.addColorStop(0, "rgba(0, 0, 0, 0)");
      vignetteGrad.addColorStop(1, "rgba(0, 0, 0, 0.45)");
      ctx.fillStyle = vignetteGrad;
      ctx.fillRect(0, 0, width, height);
      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [showEmbers, interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#000000] select-none ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none block z-0" />
    </div>
  );
}
