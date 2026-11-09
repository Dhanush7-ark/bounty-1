"use client";

import { useEffect, useRef } from "react";
import { SimplexNoise } from "@/lib/noise/simplexNoise";

interface GreenFlameTopCanopyProps {
  className?: string;
  speedMultiplier?: number;
  interactive?: boolean;
}

/**
 * GreenFlameTopCanopy
 * Procedural HTML Canvas component rendering organic, abstract, liquid flame silhouettes
 * extending downward from the top edge into pure black negative space.
 *
 * Strict Color Palette:
 * - Pure Black: #000000
 * - Primary Flames: Neon Green #00FF41
 * - Secondary Flames: Deep Emerald #003B20
 * - Highlight Glow: Bright Electric Green #39FF14
 * - Shadows: Dark Forest Green #001A0D
 *
 * Features:
 * - 4 overlapping layers with different depths, speeds, and reaches
 * - Razor-sharp flame tips, jagged contours, and dripping liquid tendrils
 * - Slow downward stretching and upward retracting movements
 * - Continuous horizontal undulation
 * - 60 FPS GPU-accelerated Canvas 2D
 */
export function GreenFlameTopCanopy({
  className = "",
  speedMultiplier = 1.0,
  interactive = true,
}: GreenFlameTopCanopyProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const simplex = new SimplexNoise(1337);
    const simplex2 = new SimplexNoise(777);

    let animId: number;
    let width = 0;
    let height = 0;
    let time = 0;

    const handleResize = () => {
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

    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (interactive) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    // ─── Procedural Layer Definition ───
    interface FlameLayerConfig {
      id: string;
      baseHeightRatio: number; // Fraction of screen height
      maxReachRatio: number;
      octaves: number;
      freqX: number;
      speedX: number;
      speedY: number;
      ridgePower: number; // Controls sharpness of tips
      fillGradient: (ctx: CanvasRenderingContext2D, h: number) => CanvasGradient;
      hasStroke: boolean;
      strokeColor?: string;
      strokeWidth?: number;
      shadowBlur?: number;
      shadowColor?: string;
      dropletCount?: number;
    }

    const layers: FlameLayerConfig[] = [
      // 1. Layer 1: Deep Shadows / Dark Forest Green Background
      {
        id: "shadow-layer",
        baseHeightRatio: 0.2,
        maxReachRatio: 0.36,
        octaves: 3,
        freqX: 0.0018,
        speedX: 0.08,
        speedY: 0.12,
        ridgePower: 2.0,
        fillGradient: (c, h) => {
          const g = c.createLinearGradient(0, 0, 0, h * 0.38);
          g.addColorStop(0, "#000B05");
          g.addColorStop(0.4, "#001A0D");
          g.addColorStop(1, "#003B20");
          return g;
        },
        hasStroke: false,
      },

      // 2. Layer 2: Secondary Flames / Deep Emerald Midground
      {
        id: "emerald-mid-layer",
        baseHeightRatio: 0.25,
        maxReachRatio: 0.44,
        octaves: 3,
        freqX: 0.0022,
        speedX: -0.12, // Counter-undulation
        speedY: 0.16,
        ridgePower: 2.2,
        fillGradient: (c, h) => {
          const g = c.createLinearGradient(0, 0, 0, h * 0.46);
          g.addColorStop(0, "#00140A");
          g.addColorStop(0.35, "#003B20");
          g.addColorStop(0.8, "#006B38");
          g.addColorStop(1, "#009E48");
          return g;
        },
        hasStroke: true,
        strokeColor: "#00FF4125",
        strokeWidth: 1.0,
        shadowBlur: 8,
        shadowColor: "#003B20",
      },

      // 3. Layer 3: Primary Flames / Neon Green Foreground (Main Feature)
      {
        id: "primary-neon-layer",
        baseHeightRatio: 0.28,
        maxReachRatio: 0.52, // Extends deep toward center
        octaves: 4,
        freqX: 0.0028,
        speedX: 0.15,
        speedY: 0.22,
        ridgePower: 2.6, // Razor-sharp pointed flame tips
        fillGradient: (c, h) => {
          const g = c.createLinearGradient(0, 0, 0, h * 0.54);
          g.addColorStop(0, "#001F0E");
          g.addColorStop(0.3, "#003B20");
          g.addColorStop(0.65, "#009E48");
          g.addColorStop(0.9, "#00FF41");
          g.addColorStop(1, "#39FF14");
          return g;
        },
        hasStroke: true,
        strokeColor: "#39FF14",
        strokeWidth: 1.6,
        shadowBlur: 20,
        shadowColor: "#00FF41",
        dropletCount: 6,
      },

      // 4. Layer 4: Razor Highlight Drips & Electric Filaments (Front-most)
      {
        id: "electric-highlight-layer",
        baseHeightRatio: 0.22,
        maxReachRatio: 0.48,
        octaves: 4,
        freqX: 0.0035,
        speedX: -0.18,
        speedY: 0.28,
        ridgePower: 3.2, // Ultra-sharp needles
        fillGradient: (c, h) => {
          const g = c.createLinearGradient(0, 0, 0, h * 0.5);
          g.addColorStop(0, "rgba(0, 59, 32, 0.4)");
          g.addColorStop(0.6, "rgba(0, 255, 65, 0.65)");
          g.addColorStop(1, "rgba(57, 255, 20, 0.95)");
          return g;
        },
        hasStroke: true,
        strokeColor: "#39FF14",
        strokeWidth: 2.0,
        shadowBlur: 28,
        shadowColor: "#39FF14",
      },
    ];

    // Compute flame canopy profile point for a given layer at coordinate x
    const getFlameY = (
      layer: FlameLayerConfig,
      x: number,
      t: number,
      w: number,
      h: number
    ): number => {
      // 1. Slow horizontal undulation drift
      const xOffset = x + Math.sin(t * 0.6 + x * 0.001) * 35;
      const nx = xOffset * layer.freqX + t * layer.speedX;
      const ny = t * layer.speedY;

      // 2. FBM noise value
      let n = simplex.fbm2D(nx, ny, layer.octaves, 2.05, 0.52);

      // 3. Ridge sharpening (turns rounded waves into sharp downwards licking points)
      // Ridge formula: 1 - |noise|, normalized to [0, 1]
      let ridge = 1.0 - Math.abs(n);
      ridge = Math.pow(ridge, layer.ridgePower);

      // 4. Secondary micro-harmonic deformation for organic liquid jaggedness
      const n2 = simplex2.noise2D(x * 0.008 + t * 0.4, t * 0.25);
      const jagged = Math.sin(x * 0.02 + n2 * 3.0) * 0.08;

      // 5. Macro stretching & retracting physics
      // Slow rhythmic breathing where lobes stretch deep down then retract up
      const stretchPhase = Math.sin(t * 0.75 + x * 0.0035) * Math.cos(t * 0.45 + x * 0.002);
      const stretchFactor = 0.85 + stretchPhase * 0.4;

      // 6. Interactive mouse repulsion / attraction
      let mouseInfluence = 0;
      if (mouseRef.current.active) {
        const dx = x - mouseRef.current.x;
        const dist = Math.abs(dx);
        if (dist < 180) {
          const factor = Math.cos((dist / 180) * (Math.PI / 2));
          // Mouse pulls flame tips down slightly toward cursor
          mouseInfluence = factor * 45;
        }
      }

      // Base reach + dynamic reach
      const baseH = h * layer.baseHeightRatio;
      const reachH = (h * layer.maxReachRatio - baseH) * (ridge + jagged) * stretchFactor;

      return Math.max(15, baseH + reachH + mouseInfluence);
    };

    // Render loop
    const render = () => {
      time += 0.012 * speedMultiplier;

      ctx.clearRect(0, 0, width, height);

      // ── Pure Pitch Black Base Background ──
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // ── Subtle Atmospheric Emerald Ambient Halo at Top ──
      const topHalo = ctx.createRadialGradient(
        width * 0.5,
        0,
        50,
        width * 0.5,
        0,
        width * 0.75
      );
      topHalo.addColorStop(0, "rgba(0, 59, 32, 0.35)");
      topHalo.addColorStop(0.5, "rgba(0, 26, 13, 0.18)");
      topHalo.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = topHalo;
      ctx.fillRect(0, 0, width, height * 0.65);

      // ── Render Each Overlapping Flame Layer ──
      const stepX = Math.max(3, Math.floor(width / 320)); // High precision vector sampling

      for (let l = 0; l < layers.length; l++) {
        const layer = layers[l];

        ctx.save();

        // Setup glow if applicable
        if (layer.shadowBlur && layer.shadowColor) {
          ctx.shadowBlur = layer.shadowBlur;
          ctx.shadowColor = layer.shadowColor;
        }

        // Trace flame canopy path from top edge
        ctx.beginPath();
        ctx.moveTo(0, 0); // Top-left corner

        // Compute points along bottom boundary of flame
        const points: { x: number; y: number }[] = [];
        for (let x = 0; x <= width; x += stepX) {
          const y = getFlameY(layer, x, time + l * 1.5, width, height);
          points.push({ x, y });
        }
        // Ensure final point at x = width
        if (points[points.length - 1].x < width) {
          points.push({
            x: width,
            y: getFlameY(layer, width, time + l * 1.5, width, height),
          });
        }

        // Connect points using smooth cubic Bezier splines
        ctx.lineTo(points[0].x, points[0].y);
        for (let i = 0; i < points.length - 1; i++) {
          const p0 = points[i];
          const p1 = points[i + 1];
          const mx = (p0.x + p1.x) / 2;
          const my = (p0.y + p1.y) / 2;
          ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
        }
        ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);

        // Close back along top edge
        ctx.lineTo(width, 0); // Top-right corner
        ctx.closePath();

        // Fill with layer gradient
        ctx.fillStyle = layer.fillGradient(ctx, height);
        ctx.fill();

        // Stroke along flame edge for vibrant razor contour
        if (layer.hasStroke && layer.strokeColor) {
          ctx.beginPath();
          ctx.moveTo(points[0].x, points[0].y);
          for (let i = 0; i < points.length - 1; i++) {
            const p0 = points[i];
            const p1 = points[i + 1];
            const mx = (p0.x + p1.x) / 2;
            const my = (p0.y + p1.y) / 2;
            ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
          }
          ctx.lineTo(points[points.length - 1].x, points[points.length - 1].y);
          ctx.strokeStyle = layer.strokeColor;
          ctx.lineWidth = layer.strokeWidth || 1.5;
          ctx.stroke();
        }

        ctx.restore();

        // ── Render Secondary Dripping Tendril Droplets (Pure Abstract Liquid) ──
        if (layer.dropletCount) {
          ctx.save();
          for (let d = 0; d < layer.dropletCount; d++) {
            const seedX = ((d + 0.5) / layer.dropletCount) * width;
            // Droplet physics: falls slowly from flame tip, dissipates into black
            const dropCycle = (time * 0.4 + d * 1.618) % 1.0;
            const startY = getFlameY(layer, seedX, time + l * 1.5, width, height);

            if (dropCycle > 0.4) {
              const fallProgress = (dropCycle - 0.4) / 0.6;
              const dropY = startY + fallProgress * (height * 0.16);
              const dropRadius = (1.0 - fallProgress) * 3.2;
              const dropAlpha = (1.0 - fallProgress) * 0.9;

              ctx.beginPath();
              ctx.arc(seedX, dropY, Math.max(0.8, dropRadius), 0, Math.PI * 2);
              ctx.fillStyle = `rgba(0, 255, 65, ${dropAlpha})`;
              ctx.shadowColor = "#39FF14";
              ctx.shadowBlur = 10;
              ctx.fill();
            }
          }
          ctx.restore();
        }
      }

      // ── Subtle Green Vignette Overlay along Top Ceiling ──
      const ceilingVignette = ctx.createLinearGradient(0, 0, 0, 40);
      ceilingVignette.addColorStop(0, "rgba(0, 0, 0, 0.85)");
      ceilingVignette.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = ceilingVignette;
      ctx.fillRect(0, 0, width, 40);

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [speedMultiplier, interactive]);

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-[#000000] select-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-auto block z-0"
      />
    </div>
  );
}

