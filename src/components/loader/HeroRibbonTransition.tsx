"use client";

import { useEffect, useRef } from "react";

interface HeroRibbonTransitionProps {
  onComplete: () => void;
  className?: string;
}

/**
 * HeroRibbonTransition
 * Replaces the smoke effect with the hero section's exact background design:
 * An ultra-smooth, 60 FPS hardware-accelerated Bezier light ribbon vortex
 * that enters and draws dynamically from the top-right corner, sweeping across
 * the screen and seamlessly handing off into the live Hero Section.
 */
export function HeroRibbonTransition({
  onComplete,
  className = "",
}: HeroRibbonTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const hasNotifiedComplete = useRef(false);

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
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Generate subtle drifting background neon embers ──
    const embers = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4 + 0.2,
      vy: -(Math.random() * 0.5 + 0.2),
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.4 + 0.2,
      seed: Math.random() * 50,
    }));

    const startTime = performance.now();

    // Cubic Bezier calculation helper
    const bezierPoint = (
      p0: [number, number],
      p1: [number, number],
      p2: [number, number],
      p3: [number, number],
      t: number
    ): [number, number] => {
      const u = 1 - t;
      const tt = t * t;
      const uu = u * u;
      const uuu = uu * u;
      const ttt = tt * t;

      const x = uuu * p0[0] + 3 * uu * t * p1[0] + 3 * u * tt * p2[0] + ttt * p3[0];
      const y = uuu * p0[1] + 3 * uu * t * p1[1] + 3 * u * tt * p2[1] + ttt * p3[1];
      return [x, y];
    };

    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);
    const easeInOutQuad = (x: number): number =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // in seconds

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Deep pitch black background
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 1: 100 NUMBER FADE-OUT (0.0s – 0.45s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed < 0.5) {
        const tFade = Math.min(1, elapsed / 0.45);
        const opacity = Math.max(0, 1 - tFade);

        if (opacity > 0.001) {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = "#C6FF36";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const fontSize = Math.min(width * 0.25, 420);
          ctx.font = `italic 400 ${fontSize}px "ITC Bodoni 72", "Bodoni 72", Georgia, serif`;
          ctx.shadowColor = "rgba(198, 255, 54, 0.45)";
          ctx.shadowBlur = 45;

          ctx.fillText("100", width * 0.5, height * 0.5);
          ctx.restore();
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 2: TOP-RIGHT AMBIENT HALO GLOW SPREADS IN (0.3s – 2.0s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.25) {
        const tHalo = Math.min(1, (elapsed - 0.25) / 1.0);
        const haloOpacity = easeOutCubic(tHalo) * 0.35;

        // Top-right halo
        const haloGrad = ctx.createRadialGradient(
          width * 0.95,
          height * 0.05,
          20,
          width * 0.8,
          height * 0.2,
          Math.max(width, height) * 0.7
        );
        haloGrad.addColorStop(0, "rgba(198, 255, 54, 0.22)");
        haloGrad.addColorStop(0.4, "rgba(0, 255, 65, 0.08)");
        haloGrad.addColorStop(1, "rgba(5, 5, 5, 0)");

        ctx.save();
        ctx.globalAlpha = haloOpacity;
        ctx.fillStyle = haloGrad;
        ctx.fillRect(0, 0, width, height);

        // Center halo behind hero dashboard
        const centerGrad = ctx.createRadialGradient(
          width * 0.65,
          height * 0.45,
          10,
          width * 0.65,
          height * 0.45,
          Math.max(width, height) * 0.45
        );
        centerGrad.addColorStop(0, "rgba(198, 255, 54, 0.12)");
        centerGrad.addColorStop(1, "rgba(5, 5, 5, 0)");
        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 3: HERO LIGHT RIBBONS SELF-DRAW FROM TOP-RIGHT CORNER (0.4s – 2.2s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.35) {
        const ribbonElapsed = elapsed - 0.35;
        // Total draw duration ~1.4s
        const drawProgress = Math.min(1, ribbonElapsed / 1.4);
        const easedProgress = easeOutCubic(drawProgress);

        ctx.save();

        // Base bezier control points scaled to responsive canvas
        // Curve 1: Top-Right (1440, 70) down-left to loop apex (330, 555)
        const p0: [number, number] = [width * 1.02, height * 0.07];
        const p1: [number, number] = [width * 0.82, height * 0.15];
        const p2: [number, number] = [width * 0.58, height * 0.32];
        const p3: [number, number] = [width * 0.24, height * 0.52];

        // Curve 2: Hairpin loop apex (330, 555) curving down and sweeping right (1440, 800)
        const p4: [number, number] = [width * 0.24, height * 0.68];
        const p5: [number, number] = [width * 0.52, height * 0.74];
        const p6: [number, number] = [width * 1.02, height * 0.82];

        // Generate points along the path up to easedProgress
        const totalSteps = 120;
        const currentSteps = Math.floor(totalSteps * easedProgress);

        // Array of strand configurations matching HeroLightRibbon.tsx
        const strands = [
          { yOffset: -30, stroke: "#FFFFFF", width: 1.0, alpha: 0.85, glow: 15 },
          { yOffset: -15, stroke: "#EEFF60", width: 1.6, alpha: 0.75, glow: 20 },
          { yOffset: 0, stroke: "#C6FF36", width: 4.5, alpha: 0.95, glow: 35 }, // Core hot ribbon
          { yOffset: 12, stroke: "#C6FF36", width: 2.2, alpha: 0.8, glow: 22 },
          { yOffset: 25, stroke: "#AEEA00", width: 1.2, alpha: 0.6, glow: 18 },
          { yOffset: 40, stroke: "#88CC14", width: 0.9, alpha: 0.45, glow: 12 },
          { yOffset: -45, stroke: "#C6FF36", width: 0.8, alpha: 0.4, glow: 10 },
        ];

        // Draw each fanned strand
        for (const strand of strands) {
          if (currentSteps < 2) continue;

          ctx.save();
          ctx.globalAlpha = strand.alpha * Math.min(1, ribbonElapsed / 0.25);
          ctx.strokeStyle = strand.stroke;
          ctx.lineWidth = strand.width;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";
          ctx.shadowColor = "#C6FF36";
          ctx.shadowBlur = strand.glow;

          ctx.beginPath();
          let started = false;

          for (let i = 0; i <= currentSteps; i++) {
            const t = i / totalSteps;
            let pt: [number, number];

            if (t <= 0.5) {
              const segT = t / 0.5;
              pt = bezierPoint(p0, p1, p2, p3, segT);
            } else {
              const segT = (t - 0.5) / 0.5;
              pt = bezierPoint(p3, p4, p5, p6, segT);
            }

            // Apply strand offset perpendicular/vertical
            const offsetY = strand.yOffset * (1 - Math.abs(t - 0.5) * 0.5);
            const px = pt[0];
            const py = pt[1] + offsetY;

            if (!started) {
              ctx.moveTo(px, py);
              started = true;
            } else {
              ctx.lineTo(px, py);
            }
          }

          ctx.stroke();
          ctx.restore();
        }

        // ── Traveling Leading Energy Head Spark ──
        if (currentSteps > 2 && easedProgress < 0.99) {
          const leadT = easedProgress;
          let headPt: [number, number];
          if (leadT <= 0.5) {
            headPt = bezierPoint(p0, p1, p2, p3, leadT / 0.5);
          } else {
            headPt = bezierPoint(p3, p4, p5, p6, (leadT - 0.5) / 0.5);
          }

          ctx.save();
          // Outer burst
          ctx.beginPath();
          ctx.arc(headPt[0], headPt[1], 18, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(198, 255, 54, 0.4)";
          ctx.shadowColor = "#C6FF36";
          ctx.shadowBlur = 30;
          ctx.fill();

          // Hot incandescent center
          ctx.beginPath();
          ctx.arc(headPt[0], headPt[1], 5, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();
      }

      // ── Ambient Drifting Neon Particles ──
      ctx.save();
      for (const ember of embers) {
        ember.x += ember.vx;
        ember.y += ember.vy;
        if (ember.y < 0) ember.y = height;
        if (ember.x > width) ember.x = 0;

        ctx.fillStyle = `rgba(198, 255, 54, ${ember.alpha})`;
        ctx.shadowColor = "#C6FF36";
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.restore();

      // ───────────────────────────────────────────────────────────────────────
      // COMPLETION TRIGGER: 2.1s (PERFECT SMOOTH HANDOFF TO HERO SECTION)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 2.1) {
        if (!hasNotifiedComplete.current) {
          hasNotifiedComplete.current = true;
          onCompleteRef.current();
        }
        return;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-[#050505] select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
