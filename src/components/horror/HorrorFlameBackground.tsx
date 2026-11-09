"use client";

import { useEffect, useRef } from "react";
import { AnimatedFlameLayer } from "./AnimatedFlameLayer";

interface HorrorFlameBackgroundProps {
  className?: string;
  showEmbers?: boolean;
}

/**
 * HorrorFlameBackground
 * Compact horizontal flame hands strip scrolling from right to left at 60 FPS.
 * Matched 1:1 to media_1794159907591_7b50e8ae.jpg reference.
 */
export function HorrorFlameBackground({
  className = "",
  showEmbers = true,
}: HorrorFlameBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ══════════════════════════════════════════════════════════════════════════
  // PROCEDURAL CANVAS: DEEP BLOOD-RED SKY & DRIFTING HEAT EMBERS (60 FPS)
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
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

    // Subtle floating sparks and soot embers
    const particleCount = 36;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: height * 0.2 + Math.random() * height * 0.7,
      vx: -(Math.random() * 0.65 + 0.2), // Drift left with flame flow
      vy: -(Math.random() * 1.1 + 0.35), // Float up with convective heat
      radius: Math.random() * 1.8 + 0.5,
      alpha: Math.random() * 0.75 + 0.2,
      life: Math.random() * 100,
      maxLife: Math.random() * 60 + 50,
      isDarkSoot: Math.random() > 0.65, // Some dark soot specs as in reference
    }));

    let time = 0;

    const render = () => {
      time += 0.016;

      ctx.clearRect(0, 0, width, height);

      // ── Fiery Deep Crimson Sky Gradient (Exact match to reference image) ──
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, "#3D0004");     // Deep dark crimson top
      skyGrad.addColorStop(0.3, "#6E0008");  // Saturated crimson
      skyGrad.addColorStop(0.58, "#9E000F");  // Vivid blood-red mid
      skyGrad.addColorStop(0.82, "#7A000A");  // Fiery crimson horizon
      skyGrad.addColorStop(1, "#000000");     // Pure pitch black base
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Atmospheric Pulsing Heat Core ──
      const heatGrad = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time * 0.4) * 30,
        height * 0.55,
        15,
        width * 0.5,
        height * 0.55,
        width * 0.65
      );
      heatGrad.addColorStop(0, "rgba(255, 30, 56, 0.24)");
      heatGrad.addColorStop(0.45, "rgba(160, 0, 18, 0.12)");
      heatGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = heatGrad;
      ctx.fillRect(0, 0, width, height);

      // ── Drifting Heat Sparks & Soot Embers ──
      if (showEmbers) {
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx + Math.sin(time + p.life * 0.06) * 0.3;
          p.y += p.vy;
          p.life++;

          if (p.life > p.maxLife || p.y < height * 0.05 || p.x < 0) {
            p.x = width * 0.1 + Math.random() * width * 0.9;
            p.y = height * 0.75 + Math.random() * height * 0.2;
            p.life = 0;
            p.alpha = Math.random() * 0.75 + 0.2;
          }

          const currentAlpha = p.alpha * (1 - p.life / p.maxLife);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

          if (p.isDarkSoot) {
            // Dark charred soot fleck (visible against bright red sky)
            ctx.fillStyle = `rgba(20, 0, 3, ${currentAlpha * 0.75})`;
            ctx.fill();
          } else {
            // Glowing crimson heat spark
            ctx.fillStyle = `rgba(255, 140, 160, ${currentAlpha})`;
            ctx.shadowColor = "#FF1E38";
            ctx.shadowBlur = 5;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, [showEmbers]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#000000] select-none ${className}`}
    >
      {/* ─── 1. PURE BLACK & CRIMSON HEAT HAZE CANVAS BASE ─── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none block z-0"
      />

      {/* ─── 2. COMPACT ANIMATED HORIZONTAL FLAME HANDS STRIP (RIGHT TO LEFT) ─── */}
      <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-end">
        {/* Layer 1: Background Parallax Flame Hands (32s scroll) */}
        <AnimatedFlameLayer
          speedSeconds={32}
          direction="left"
          opacity={0.58}
          heightClass="h-[210px] sm:h-[240px] md:h-[275px]"
          tileImageSrc="/exact_flame_hands_tile_layer2.png"
          glowIntensity={10}
          glowColor="#A8000E"
          scaleYVariation={true}
        />

        {/* Layer 2: Foreground Primary Flame Hands (20s scroll) */}
        <AnimatedFlameLayer
          speedSeconds={20}
          direction="left"
          opacity={1.0}
          heightClass="h-[180px] sm:h-[215px] md:h-[245px]"
          tileImageSrc="/exact_flame_hands_tile.png"
          glowIntensity={16}
          glowColor="#FF1E38"
          scaleYVariation={true}
        />

        {/* Solid Pure Black Bottom Ground Base for Telemetry Bar */}
        <div className="absolute bottom-0 inset-x-0 h-[48px] sm:h-[56px] bg-[#000000] z-20" />
      </div>

      {/* ─── 3. SUBTLE CINEMATIC VIGNETTE ─── */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_center,transparent_60%,rgba(0,0,0,0.85)_100%)]" />
    </div>
  );
}
