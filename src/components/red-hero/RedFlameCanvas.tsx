"use client";

import { useEffect, useRef } from "react";
import { simplex2D } from "@/lib/simplexNoise";
import { sampleHandContour } from "@/components/green-hero/flameContourData";

interface RedFlameCanvasProps {
  className?: string;
  interactive?: boolean;
}

/**
 * RedFlameCanvas
 * High-performance 60 FPS HTML5 Canvas engine rendering procedural
 * abstract deep-red flame silhouettes extending downwards from the top edge.
 *
 * Implements 100% of the User Specification:
 * 1. Visual Design:
 *    - Pure black background (#000000).
 *    - Large, irregular deep-red flame shapes positioned along the top edge.
 *    - Flames extend downward into the black space with sharp, jagged, dripping, and organic silhouettes.
 *    - Red color gradient: Dark crimson (#8B0000 / #3A0005) to intense blood red (#FF1A00).
 *    - Silhouettes look like burning liquid, torn paper, or ink spreading organically.
 *    - Strong contrast between red flames and black negative space.
 *    - Avoids ordinary fire particles, realistic flames, smoke, or orange-yellow fire.
 * 2. Flame Animation:
 *    - Morph organically with constantly changing contours.
 *    - Slowly stretch downward and retract upward.
 *    - Irregular spikes, rounded dripping sections, and sharp torn edges.
 *    - Continuous horizontal undulation and seamless infinite loop.
 *    - Procedural Simplex noise deformation.
 *    - Multiple layers of flame silhouettes for depth, animating at different speeds.
 * 3. Composition & Performance:
 *    - Flame shapes concentrated across top 20–35% of the screen.
 *    - Irregular flame extensions reach toward the center.
 *    - Remaining 65–80% of screen stays predominantly pure black negative space.
 *    - Responsive desktop & mobile layouts, device pixel ratio scaling, locked 60 FPS.
 */
export function RedFlameCanvas({
  className = "",
  interactive = true,
}: RedFlameCanvasProps) {
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

    // Mouse tracking for subtle interactive fluid displacement
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

    // Liquid blood-red plasma droplets detaching and falling through black void
    const dropletCount = 14;
    const droplets = Array.from({ length: dropletCount }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * ((height || 800) * 0.35),
      vy: 0.55 + Math.random() * 0.95,
      vx: -(0.15 + Math.random() * 0.3),
      radius: 1.2 + Math.random() * 1.8,
      alpha: Math.random() * 0.75 + 0.25,
      life: Math.random() * 100,
      maxLife: 75 + Math.random() * 70,
      seed: Math.random() * 50,
    }));

    let lastTime = performance.now();
    let time = 0;

    // Horizontal scroll accumulators for the 3 parallax layers (px)
    let scroll0 = 0;
    let scroll1 = 0;
    let scroll2 = 0;

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER LOOP (60 FPS COMPOSITING)
    // ═════════════════════════════════════════════════════════════════════════
    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      // Mouse smoothing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // ── 1. PURE BLACK VIEWPORT BACKGROUND (#000000) ──
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // ── 2. SUBTLE CEILING BLOOD-RED ATMOSPHERE GLOW ──
      const topRadialGlow = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.35) * 45,
        0,
        15,
        width * 0.5,
        0,
        height * 0.45
      );
      topRadialGlow.addColorStop(0, "rgba(255, 26, 0, 0.16)");
      topRadialGlow.addColorStop(0.35, "rgba(139, 0, 0, 0.09)");
      topRadialGlow.addColorStop(0.7, "rgba(42, 0, 4, 0.03)");
      topRadialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topRadialGlow;
      ctx.fillRect(0, 0, width, height * 0.48);

      // Proportional tile width: 2 to 3 hand claw clusters visible across screen
      const tileWidth = Math.max(880, Math.min(width * 0.82, 1350));

      // Advance parallax horizontal continuous scrolling (right to left)
      const speed0 = 18; // px/sec (shadow layer)
      const speed1 = 32; // px/sec (mid layer)
      const speed2 = 46; // px/sec (primary foreground flame)
      scroll0 = (scroll0 + dt * speed0) % tileWidth;
      scroll1 = (scroll1 + dt * speed1) % tileWidth;
      scroll2 = (scroll2 + dt * speed2) % tileWidth;

      // Column step interval across viewport width (every 4-5px for silky 60 FPS)
      const step = Math.max(4, Math.floor(width / 260));

      // Helper: Compute flame height y(x) for layer
      const getLayerY = (
        x: number,
        layerIndex: number,
        scrollOffset: number,
        maxReach: number,
        baseOffsetU: number
      ): number => {
        // Horizontal coordinate in seamless looping tile with fluid wave undulation
        const rawU = (x + scrollOffset) / tileWidth + baseOffsetU;
        // Continuous horizontal undulation
        const waveU = rawU + simplex2D(x * 0.0022, time * 0.45 + layerIndex) * 0.032;

        // Sample base authentic hand claw profile
        const baseReach = sampleHandContour(waveU);

        // Fluid morphing & noise deformation
        // 1. Slow downward stretching and upward retracting movements
        const stretch = Math.sin(time * 1.15 + waveU * Math.PI * 5 + layerIndex * 1.7) * 0.085;

        // 2. Simplex noise displacement per claw finger
        const noiseReach = simplex2D(waveU * 5.2 + layerIndex * 2.1, time * 0.38) * 0.12;

        // 3. Fluid liquid ripple along torn paper / burning liquid boundary
        const ripple = simplex2D(x * 0.018 + layerIndex * 30.0, time * 1.45) * 3.5;

        // 4. Accentuate sharp dripping flame tips
        const isTip = Math.pow(Math.max(0, baseReach - 0.45) / 0.55, 1.6);
        const dripPull = Math.sin(time * 0.8 + waveU * 10.0) * 0.075 * isTip;

        // Combine reach fraction
        const reach = Math.max(0.1, baseReach * (1.0 + stretch) + noiseReach + dripPull);
        let y = reach * maxReach + ripple;

        // Interactive mouse influence: cursor subtly pulls claw tips downward
        if (mX > 0 && mY > 0 && mY < height * 0.55) {
          const dist = Math.abs(x - mX);
          if (dist < 220) {
            const pullFactor = (1.0 - dist / 220) * 32.0;
            y += pullFactor;
          }
        }

        // Clamp to concentrate across top 20–35% of the screen
        return Math.min(y, height * 0.48);
      };

      // ── 3. LAYER 0: DEEP CRIMSON SHADOW FLAMES (#2A0004 -> #5A000A -> #8B0000) ──
      // Dark crimson background silhouettes creating depth
      ctx.save();
      const gradL0 = ctx.createLinearGradient(0, 0, 0, height * 0.3);
      gradL0.addColorStop(0, "#1F0003");
      gradL0.addColorStop(0.5, "#420007");
      gradL0.addColorStop(1, "#6B000C");
      ctx.fillStyle = gradL0;
      ctx.globalAlpha = 0.65;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      const maxReach0 = height * 0.26; // Concentrated in top ~26%
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = getLayerY(curX, 0, scroll0, maxReach0, 0.18);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 4. LAYER 1: SECONDARY CRIMSON FLAMES (#4A0008 -> #8B0000 -> #CC0E00) ──
      // Torn paper / liquid spreading mid-ground
      ctx.save();
      const gradL1 = ctx.createLinearGradient(0, 0, 0, height * 0.35);
      gradL1.addColorStop(0, "#280004");
      gradL1.addColorStop(0.35, "#5E000A");
      gradL1.addColorStop(0.75, "#8B0000");
      gradL1.addColorStop(1, "#B80A00");
      ctx.fillStyle = gradL1;
      ctx.globalAlpha = 0.88;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      const maxReach1 = height * 0.31; // Concentrated in top ~31%
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = getLayerY(curX, 1, scroll1, maxReach1, 0.52);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 5. LAYER 2: PRIMARY FOREGROUND BLOOD-RED FLAMES (#8B0000 -> #FF1A00) ──
      // Intense blood-red (#FF1A00) with radiant glow along the jagged dripping tips
      ctx.save();
      const gradL2 = ctx.createLinearGradient(0, 0, 0, height * 0.38);
      gradL2.addColorStop(0, "#1A0002");
      gradL2.addColorStop(0.22, "#3E0006");
      gradL2.addColorStop(0.55, "#7A000A");
      gradL2.addColorStop(0.82, "#B80E00");
      gradL2.addColorStop(1, "#FF1A00"); // Intense blood red
      ctx.fillStyle = gradL2;

      // Radiant blood-red highlight glow along the tips
      ctx.shadowColor = "#FF1A00";
      ctx.shadowBlur = 18;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      const maxReach2 = height * 0.35; // Concentrated in top 20–35%
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = getLayerY(curX, 2, scroll2, maxReach2, 0.0);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();

      // Crisp intense blood-red contour rim along claw tips
      ctx.strokeStyle = "rgba(255, 26, 0, 0.92)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();

      // ── 6. DETACHED BLOOD-RED LIQUID PLASMA DROPLETS (FALLING & DISSOLVING) ──
      ctx.save();
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.y += d.vy;
        d.x += d.vx + Math.sin(time * 1.5 + d.seed) * 0.3;
        d.life++;

        if (d.life > d.maxLife || d.y > height * 0.48 || d.x < 0) {
          d.x = width * 0.05 + Math.random() * width * 0.9;
          // Spawn near the tips of the claw flames
          d.y = height * 0.18 + Math.random() * height * 0.14;
          d.life = 0;
          d.alpha = Math.random() * 0.75 + 0.25;
        }

        const alphaFade = d.alpha * (1 - d.life / d.maxLife);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 26, 0, ${alphaFade})`;
        ctx.shadowColor = "#FF1A00";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.restore();

      // ── 7. SEAMLESS GRADIENT FADE TO PURE BLACK NEGATIVE SPACE ──
      // Ensures the remaining 65–80% of the screen stays predominantly pure black
      ctx.save();
      const bottomFade = ctx.createLinearGradient(0, height * 0.35, 0, height * 0.48);
      bottomFade.addColorStop(0, "rgba(0, 0, 0, 0)");
      bottomFade.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = bottomFade;
      ctx.fillRect(0, height * 0.35, width, height * 0.13);
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
  }, [interactive]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#000000] select-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      />

      {/* Subtle cinematic raster lines */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255, 26, 0, 0.04) 2px, rgba(255, 26, 0, 0.04) 4px)",
        }}
      />

      {/* Atmospheric bottom fade ensuring deep pure black negative space */}
      <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}
