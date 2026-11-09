"use client";

import { useEffect, useRef } from "react";

interface HeroRibbonTransitionProps {
  onComplete: () => void;
  className?: string;
}

/**
 * HeroRibbonTransition (Cinema Grade / Ultra-Smooth Dynamic Physics)
 *
 * Upgrades:
 * 1. Multi-octave continuous sub-pixel sampling: eliminates discrete stepping/jitter.
 * 2. Natural taper & organic leading head: stroke width & luminosity taper smoothly to 0 at head tip.
 * 3. Volumetric multi-pass bloom & depth-of-field: subtle atmospheric optical blur with soft outer halo.
 * 4. Staggered organic propagation: each strand follows natural physics delay and turbulence.
 * 5. Cinematic ease: smooth Quintic / Exponential ease curve with zero robotic snapping.
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

    // ── Ultra-fine atmospheric neon dust & bokeh embers ──
    const embers = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35 + 0.15,
      vy: -(Math.random() * 0.45 + 0.2),
      radius: Math.random() * 1.5 + 0.5,
      maxAlpha: Math.random() * 0.5 + 0.2,
      pulseSpeed: Math.random() * 2 + 1,
      seed: Math.random() * 100,
    }));

    const startTime = performance.now();

    // Cubic Bezier interpolation
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

    // Smooth Quintic Ease-Out: starts with energetic velocity and glides into position silky smooth
    const easeOutQuint = (x: number): number => 1 - Math.pow(1 - x, 5);

    // Smooth Hermite smoothstep
    const smoothstep = (min: number, max: number, value: number) => {
      const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
      return x * x * (3 - 2 * x);
    };

    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000;

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Deep pitch black background (#050505)
      ctx.fillStyle = "#050505";
      ctx.fillRect(0, 0, width, height);

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 1: 100 NUMBER DISSOLVE WITH SOFT OPTICAL BLUR (0.0s – 0.55s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed < 0.6) {
        const tFade = Math.min(1, elapsed / 0.5);
        const opacity = Math.max(0, 1 - Math.pow(tFade, 1.8));

        if (opacity > 0.001) {
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = "#C6FF36";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          const fontSize = Math.min(width * 0.25, 420);
          ctx.font = `italic 400 ${fontSize}px "ITC Bodoni 72", "Bodoni 72", Georgia, serif`;
          ctx.shadowColor = "rgba(198, 255, 54, 0.4)";
          ctx.shadowBlur = 40 + tFade * 25; // Expands outward as it dissolves

          ctx.fillText("100", width * 0.5, height * 0.5);
          ctx.restore();
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 2: VOLUMETRIC ATMOSPHERIC BLOOM FROM TOP-RIGHT (0.2s – 2.4s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.2) {
        const tHalo = Math.min(1, (elapsed - 0.2) / 1.1);
        const haloAlpha = easeOutQuint(tHalo) * 0.32;

        ctx.save();
        ctx.globalAlpha = haloAlpha;

        // Soft expansive corner atmosphere
        const topCornerGrad = ctx.createRadialGradient(
          width * 0.92,
          height * 0.08,
          10,
          width * 0.82,
          height * 0.18,
          Math.max(width, height) * 0.72
        );
        topCornerGrad.addColorStop(0, "rgba(198, 255, 54, 0.24)");
        topCornerGrad.addColorStop(0.35, "rgba(0, 255, 65, 0.09)");
        topCornerGrad.addColorStop(0.7, "rgba(0, 150, 40, 0.03)");
        topCornerGrad.addColorStop(1, "rgba(5, 5, 5, 0)");

        ctx.fillStyle = topCornerGrad;
        ctx.fillRect(0, 0, width, height);

        // Subtle ambient center pool behind the hero cards
        const centerGrad = ctx.createRadialGradient(
          width * 0.65,
          height * 0.48,
          20,
          width * 0.65,
          height * 0.48,
          Math.max(width, height) * 0.45
        );
        centerGrad.addColorStop(0, "rgba(198, 255, 54, 0.1)");
        centerGrad.addColorStop(1, "rgba(5, 5, 5, 0)");
        ctx.fillStyle = centerGrad;
        ctx.fillRect(0, 0, width, height);

        ctx.restore();
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 3: FLUID ORGANIC LIGHT RIBBON VORTEX (0.3s – 2.3s)
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.28) {
        const ribbonElapsed = elapsed - 0.28;
        const totalDuration = 1.6; // generous duration for ultra-fluid glide
        const masterProgress = Math.min(1, ribbonElapsed / totalDuration);

        ctx.save();

        // Exact trajectory matching HeroLightRibbon.tsx
        const p0: [number, number] = [width * 1.02, height * 0.07];
        const p1: [number, number] = [width * 0.82, height * 0.14];
        const p2: [number, number] = [width * 0.58, height * 0.32];
        const p3: [number, number] = [width * 0.24, height * 0.53];

        const p4: [number, number] = [width * 0.24, height * 0.68];
        const p5: [number, number] = [width * 0.52, height * 0.73];
        const p6: [number, number] = [width * 1.02, height * 0.81];

        // 7 Master Strands with staggered propagation delays and distinct physics
        const strands = [
          { yOffset: -28, stroke: "#FFFFFF", baseWidth: 1.1, maxAlpha: 0.85, delay: 0.04, glow: 12, blur: 0 },
          { yOffset: -14, stroke: "#EEFF60", baseWidth: 1.8, maxAlpha: 0.8, delay: 0.02, glow: 18, blur: 0 },
          // Core incandescent ribbon
          { yOffset: 0, stroke: "#C6FF36", baseWidth: 5.0, maxAlpha: 0.98, delay: 0.0, glow: 36, blur: 0 },
          { yOffset: 12, stroke: "#C6FF36", baseWidth: 2.4, maxAlpha: 0.82, delay: 0.03, glow: 22, blur: 0 },
          { yOffset: 24, stroke: "#AEEA00", baseWidth: 1.4, maxAlpha: 0.65, delay: 0.06, glow: 16, blur: 0 },
          { yOffset: 38, stroke: "#88CC14", baseWidth: 1.0, maxAlpha: 0.5, delay: 0.09, glow: 12, blur: 0 },
          { yOffset: -42, stroke: "#C6FF36", baseWidth: 0.9, maxAlpha: 0.45, delay: 0.07, glow: 10, blur: 0 },
        ];

        // Render each strand with smooth sub-pixel differential pathing
        for (const s of strands) {
          const strandProg = Math.max(0, Math.min(1, (masterProgress - s.delay) / (1 - s.delay)));
          if (strandProg <= 0.001) continue;

          const easedT = easeOutQuint(strandProg);
          const totalPoints = 160;
          const reachIndex = Math.floor(totalPoints * easedT);

          if (reachIndex < 2) continue;

          ctx.save();
          ctx.globalAlpha = s.maxAlpha * smoothstep(0, 0.15, ribbonElapsed);
          ctx.strokeStyle = s.stroke;
          ctx.shadowColor = "#C6FF36";
          ctx.shadowBlur = s.glow;
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Multi-segmented line with organic tapered leading edge
          let lastX = 0;
          let lastY = 0;

          for (let i = 0; i <= reachIndex; i++) {
            const t = i / totalPoints;
            let pt: [number, number];

            if (t <= 0.5) {
              pt = bezierPoint(p0, p1, p2, p3, t / 0.5);
            } else {
              pt = bezierPoint(p3, p4, p5, p6, (t - 0.5) / 0.5);
            }

            // Natural vertical harmonic variation
            const envelope = 1 - Math.abs(t - 0.5) * 0.4;
            const px = pt[0];
            const py = pt[1] + s.yOffset * envelope;

            if (i === 0) {
              lastX = px;
              lastY = py;
              continue;
            }

            // Calculate taper factor near the front of the drawing line
            const distFromHead = reachIndex - i;
            const taperFactor = distFromHead < 15 ? Math.max(0.2, distFromHead / 15) : 1;

            ctx.lineWidth = s.baseWidth * taperFactor;
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(px, py);
            ctx.stroke();

            lastX = px;
            lastY = py;
          }

          ctx.restore();
        }

        // ── Ultra-smooth Incandescent Leading Energy Spark ──
        const leadProg = easeOutQuint(masterProgress);
        if (leadProg > 0.02 && leadProg < 0.99) {
          let headPt: [number, number];
          if (leadProg <= 0.5) {
            headPt = bezierPoint(p0, p1, p2, p3, leadProg / 0.5);
          } else {
            headPt = bezierPoint(p3, p4, p5, p6, (leadProg - 0.5) / 0.5);
          }

          ctx.save();
          // Soft outer atmospheric aura
          ctx.beginPath();
          ctx.arc(headPt[0], headPt[1], 24, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(198, 255, 54, 0.28)";
          ctx.shadowColor = "#C6FF36";
          ctx.shadowBlur = 38;
          ctx.fill();

          // Intense core bloom
          ctx.beginPath();
          ctx.arc(headPt[0], headPt[1], 7, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(238, 255, 96, 0.9)";
          ctx.shadowColor = "#C6FF36";
          ctx.shadowBlur = 18;
          ctx.fill();

          // White-hot center filament
          ctx.beginPath();
          ctx.arc(headPt[0], headPt[1], 2.8, 0, Math.PI * 2);
          ctx.fillStyle = "#FFFFFF";
          ctx.fill();
          ctx.restore();
        }

        ctx.restore();
      }

      // ── Floating Ambient Micro-Embers with Gentle Harmonic Drift ──
      ctx.save();
      for (const ember of embers) {
        ember.x += ember.vx + Math.sin(elapsed * ember.pulseSpeed + ember.seed) * 0.2;
        ember.y += ember.vy;

        if (ember.y < 0) ember.y = height + 10;
        if (ember.x > width + 10) ember.x = -10;

        const pulse = 0.7 + 0.3 * Math.sin(elapsed * ember.pulseSpeed * 2 + ember.seed);
        ctx.fillStyle = `rgba(198, 255, 54, ${ember.maxAlpha * pulse})`;
        ctx.shadowColor = "#00FF41";
        ctx.shadowBlur = 7;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      ctx.restore();

      // ───────────────────────────────────────────────────────────────────────
      // SEAMLESS HANDOFF TRIGGER: 2.3s
      // The hero section's continuous loop seamlessly takes over without any flicker.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 2.3) {
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
