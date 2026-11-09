"use client";

import { useEffect, useRef } from "react";
import { simplex2D, fbm2D } from "@/lib/simplexNoise";

interface GreenFlameCanvasProps {
  className?: string;
  interactive?: boolean;
}

/**
 * GreenFlameCanvas
 * High-performance 60 FPS HTML5 Canvas engine rendering procedural
 * abstract green flame silhouettes extending downwards from the top edge.
 *
 * Implements:
 * - Pure black background (#000000)
 * - Layered organic flame silhouettes (Shadow: #001A0D, Deep Emerald: #003B20, Neon: #00FF41, Highlight: #39FF14)
 * - Simplex noise-based liquid deformation and continuous horizontal undulation
 * - Smooth downward stretching & retracting flame stalactites / licking cusps
 * - Zero red, orange, yellow, or blue colors
 */
export function GreenFlameCanvas({
  className = "",
  interactive = true,
}: GreenFlameCanvasProps) {
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

    // Mouse tracking for subtle interactive displacement
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

    // Dynamic stalactite tendril anchors across the top edge
    const tendrilCount = 9;
    const tendrils = Array.from({ length: tendrilCount }, (_, i) => ({
      baseXFraction: (i + 0.5) / tendrilCount + (Math.random() - 0.5) * 0.06,
      period: 5.0 + Math.random() * 4.0,
      phase: Math.random() * Math.PI * 2,
      maxReachFraction: 0.38 + Math.random() * 0.16, // Extends 38% to 54% into viewport
      minReachFraction: 0.18 + Math.random() * 0.08,
      widthSigma: 32 + Math.random() * 24,
    }));

    // Liquid droplets that occasionally stretch, detach, and drift downward
    const dropletCount = 8;
    const droplets = Array.from({ length: dropletCount }, () => ({
      x: Math.random() * (width || 1200),
      y: Math.random() * 200,
      vy: 0.6 + Math.random() * 1.2,
      radius: 1.2 + Math.random() * 2.0,
      alpha: Math.random() * 0.8 + 0.2,
      life: Math.random() * 100,
      maxLife: 80 + Math.random() * 70,
    }));

    let time = 0;

    // Helper: Compute flame bottom boundary y(x) at a given point
    const computeFlameHeight = (
      x: number,
      t: number,
      layerIndex: number,
      mouseX: number,
      mouseY: number
    ): number => {
      // Different noise frequencies per layer
      const speed = layerIndex === 0 ? 0.38 : layerIndex === 1 ? 0.55 : 0.72;
      const layerOffset = layerIndex * 140.0;

      // Base downward extension (concentrated in top 22% - 44% of viewport)
      const baseHeight =
        height * (layerIndex === 0 ? 0.32 : layerIndex === 1 ? 0.26 : 0.21);
      const amp =
        height * (layerIndex === 0 ? 0.16 : layerIndex === 1 ? 0.13 : 0.1);

      // Low frequency rolling swell
      const nLow = fbm2D((x + layerOffset) * 0.0018, t * speed * 0.25, 2);

      // Mid frequency tongues with sharp cusp shaping (1 - |noise|)^2.4
      const nMidRaw = simplex2D((x + layerOffset * 2) * 0.006, t * speed * 0.6);
      const cusp1 = Math.pow(Math.max(0, 1.0 - Math.abs(nMidRaw)), 2.4);

      // High frequency flickering ripples along the fluid boundary
      const nHigh = simplex2D(x * 0.02 + layerOffset, t * speed * 1.5) * 6.0;

      // Combine harmonics
      let y = baseHeight + (nLow * 0.45 + cusp1 * 0.55) * amp + nHigh;

      // Add individual sharp stalactite drips
      for (let k = 0; k < tendrils.length; k++) {
        const td = tendrils[k];
        const tendrilX =
          td.baseXFraction * width + Math.sin(t * 0.4 + td.phase) * 25.0;
        const dx = x - tendrilX;
        const gauss = Math.exp(-(dx * dx) / (2 * td.widthSigma * td.widthSigma));

        if (gauss > 0.01) {
          const stretch =
            (Math.sin(t * (Math.PI * 2 / td.period) + td.phase) * 0.5 + 0.5);
          const reach =
            height *
            (td.minReachFraction + (td.maxReachFraction - td.minReachFraction) * stretch);
          const dripReach = reach * (layerIndex === 0 ? 1.0 : layerIndex === 1 ? 0.88 : 0.76);
          y = Math.max(y, dripReach * Math.pow(gauss, 1.4));
        }
      }

      // Subtle mouse interaction: cursor pulls flame slightly downward
      if (mouseX > 0 && mouseY > 0 && mouseY < height * 0.6) {
        const distToMouse = Math.abs(x - mouseX);
        if (distToMouse < 220) {
          const mouseFactor = (1.0 - distToMouse / 220) * 35.0;
          y += mouseFactor;
        }
      }

      return Math.min(y, height * 0.68);
    };

    // ── RENDER LOOP (60 FPS) ──
    const render = () => {
      time += 0.012;

      // Smooth mouse interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;
      const mX = mouseRef.current.x;
      const mY = mouseRef.current.y;

      // ── 1. PURE BLACK BACKGROUND (#000000) ──
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // ── 2. SUBTLE TOP AMBIENT EMERALD GLOW (CONCENTRATED AT CEILING) ──
      const topRadialGlow = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.3) * 50,
        0,
        20,
        width * 0.5,
        0,
        height * 0.55
      );
      topRadialGlow.addColorStop(0, "rgba(0, 255, 65, 0.14)");
      topRadialGlow.addColorStop(0.35, "rgba(0, 59, 32, 0.08)");
      topRadialGlow.addColorStop(0.7, "rgba(0, 26, 13, 0.03)");
      topRadialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topRadialGlow;
      ctx.fillRect(0, 0, width, height * 0.65);

      // Step interval for drawing curves across width (every 5-6px for silky 60fps)
      const step = Math.max(5, Math.floor(width / 240));

      // ── 3. LAYER 1: DEEP SHADOW / DEEP EMERALD BACKGROUND FLAME (#001A0D -> #003B20) ──
      ctx.save();
      const gradL1 = ctx.createLinearGradient(0, 0, 0, height * 0.5);
      gradL1.addColorStop(0, "#001A0D");
      gradL1.addColorStop(0.5, "#002B18");
      gradL1.addColorStop(1, "#003B20");
      ctx.fillStyle = gradL1;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameHeight(curX, time, 0, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 4. LAYER 2: SECONDARY FLAMES (DEEP EMERALD TO SATURATED GREEN #003B20 -> #00B336) ──
      ctx.save();
      const gradL2 = ctx.createLinearGradient(0, 0, 0, height * 0.4);
      gradL2.addColorStop(0, "#002213");
      gradL2.addColorStop(0.45, "#004D25");
      gradL2.addColorStop(0.85, "#008F38");
      gradL2.addColorStop(1, "#00B336");
      ctx.fillStyle = gradL2;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameHeight(curX, time, 1, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      // ── 5. LAYER 3: PRIMARY FOREGROUND NEON FLAMES (#00FF41 -> #39FF14) ──
      ctx.save();
      const gradL3 = ctx.createLinearGradient(0, 0, 0, height * 0.35);
      gradL3.addColorStop(0, "#003B20");
      gradL3.addColorStop(0.4, "#008F38");
      gradL3.addColorStop(0.8, "#00FF41");
      gradL3.addColorStop(1, "#39FF14");
      ctx.fillStyle = gradL3;

      // Intense electric green rim glow along the tips
      ctx.shadowColor = "#39FF14";
      ctx.shadowBlur = 16;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      for (let x = 0; x <= width + step; x += step) {
        const curX = Math.min(x, width);
        const curY = computeFlameHeight(curX, time, 2, mX, mY);
        ctx.lineTo(curX, curY);
      }
      ctx.lineTo(width, 0);
      ctx.closePath();
      ctx.fill();

      // Sharp electric green outline along the bottom silhouette
      ctx.strokeStyle = "rgba(57, 255, 20, 0.85)";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.restore();

      // ── 6. ORGANIC LIQUID PLASMA DROPLETS (DETACHING & FLOATING DOWNWARD) ──
      for (let i = 0; i < droplets.length; i++) {
        const d = droplets[i];
        d.y += d.vy;
        d.life++;

        if (d.life > d.maxLife || d.y > height * 0.65) {
          d.x = Math.random() * width;
          // Spawn near the lower tip zone of flames
          d.y = height * 0.2 + Math.random() * height * 0.15;
          d.life = 0;
          d.alpha = Math.random() * 0.75 + 0.25;
        }

        const alphaFade = d.alpha * (1 - d.life / d.maxLife);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(57, 255, 20, ${alphaFade})`;
        ctx.shadowColor = "#00FF41";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

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

      {/* Subtle CRT raster scanlines to reinforce the cyberpunk identity */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-15"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.05) 2px, rgba(0, 255, 65, 0.05) 4px)",
        }}
      />

      {/* Atmospheric bottom fade to guarantee unbroken pure black transition */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent z-10 pointer-events-none" />
    </div>
  );
}

