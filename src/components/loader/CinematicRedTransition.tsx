"use client";

import { useEffect, useRef } from "react";
import { simplex2D } from "@/lib/simplexNoise";

interface CinematicRedTransitionProps {
  onComplete: () => void;
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCEDURAL VOLUMETRIC SMOKE PUFF DEFINITION (MULTI-OCTAVE CURL TURBULENCE)
// ─────────────────────────────────────────────────────────────────────────────
interface SmokePuff {
  xNorm: number;
  yBaseNorm: number;
  speed: number;
  radius: number;
  seed: number;
  layer: number; // 0: black/charred, 1: deep emerald, 2: neon green
  swirlRate: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// SUSPENSE & BURST EMBER DEFINITION
// ─────────────────────────────────────────────────────────────────────────────
interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  maxAlpha: number;
  life: number;
  maxLife: number;
  side: "left" | "right" | "all";
  seed: number;
}

export function CinematicRedTransition({
  onComplete,
  className = "",
}: CinematicRedTransitionProps) {
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

    // ── Generate 52 Volumetric Smoke Plumes ──
    const smokePuffs: SmokePuff[] = Array.from({ length: 52 }, (_, i) => ({
      xNorm: (i / 52) * 1.1 - 0.05 + (Math.random() - 0.5) * 0.06,
      yBaseNorm: 0.98 + (i % 4) * 0.03,
      speed: 0.65 + Math.random() * 0.7,
      radius: 90 + Math.random() * 110,
      seed: Math.random() * 100,
      layer: i % 3,
      swirlRate: (Math.random() - 0.5) * 1.5,
    }));

    // ── Generate Green Embers ──
    const embers: Ember[] = Array.from({ length: 45 }, (_, i) => ({
      x: (i % 2 === 0 ? Math.random() * 0.15 : 0.85 + Math.random() * 0.15) * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: -(Math.random() * 0.7 + 0.3),
      radius: Math.random() * 1.8 + 0.6,
      alpha: 0,
      maxAlpha: Math.random() * 0.6 + 0.25,
      life: Math.random() * 80,
      maxLife: Math.random() * 90 + 70,
      side: i % 2 === 0 ? "left" : "right",
      seed: Math.random() * 50,
    }));

    const startTime = performance.now();

    // ═════════════════════════════════════════════════════════════════════════
    // RENDER LOOP (60 FPS) — GREEN & BLACK PALETTE
    // ═════════════════════════════════════════════════════════════════════════
    const render = (now: number) => {
      const elapsed = (now - startTime) / 1000; // in seconds

      ctx.save();
      ctx.clearRect(0, 0, width, height);

      // Default background to pure pitch black (#000000)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 1: 100 FADE OUT (0.0s – 0.5s)
      // Neon green Bodoni 100 typography smoothly fades into the black background.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed < 0.55) {
        const t1 = Math.min(1, elapsed / 0.5);

        // Subtle dark emerald radial background atmosphere
        const bgGrad = ctx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          40,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.75
        );
        bgGrad.addColorStop(0, "rgba(0, 35, 18, 0.45)");
        bgGrad.addColorStop(0.4, "rgba(0, 20, 10, 0.3)");
        bgGrad.addColorStop(1, "#000000");
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, width, height);

        // Neon Lime 100 Typography fading out smoothly
        const textOpacity = Math.max(0, 1 - t1);
        if (textOpacity > 0.001) {
          ctx.save();
          ctx.globalAlpha = textOpacity;
          ctx.fillStyle = "#C6FF36";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          // ITC Bodoni 72 Italic font
          const fontSize = Math.min(width * 0.26, 420);
          ctx.font = `italic 400 ${fontSize}px "ITC Bodoni 72", "Bodoni 72", Georgia, serif`;

          // Neon green drop glow
          ctx.shadowColor = "rgba(0, 255, 65, 0.55)";
          ctx.shadowBlur = 45;

          ctx.fillText("100", width * 0.5, height * 0.5);
          ctx.restore();
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 2: VOLUMETRIC GREEN & BLACK SMOKE ENTRANCE (0.5s – 2.0s)
      // Volumetric dark emerald & charred black smoke rising from bottom edge.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.45 && elapsed < 2.4) {
        const tSmoke = Math.min(1, Math.max(0, (elapsed - 0.45) / 0.75));
        const tBlackout = elapsed > 1.6 ? Math.min(1, (elapsed - 1.6) / 0.7) : 0;
        const smokeOpacity = (1 - tBlackout) * Math.min(1, (elapsed - 0.45) / 0.2);

        if (smokeOpacity > 0.001) {
          ctx.save();
          ctx.globalAlpha = smokeOpacity;

          // Deep emerald background gradient that fades out during blackout
          const bgIllumGrad = ctx.createLinearGradient(0, 0, 0, height);
          bgIllumGrad.addColorStop(0, "rgba(0, 5, 2, 0.95)");
          bgIllumGrad.addColorStop(0.4, "rgba(0, 18, 9, 0.9)");
          bgIllumGrad.addColorStop(0.7, "rgba(0, 45, 22, 0.95)");
          bgIllumGrad.addColorStop(1, "rgba(0, 75, 36, 1.0)");
          ctx.fillStyle = bgIllumGrad;
          ctx.fillRect(0, 0, width, height);

          // Volumetric overlapping smoke plumes
          const smokeRiseDistance = height * 0.65;
          const currentRise = tSmoke * smokeRiseDistance;

          for (const puff of smokePuffs) {
            const rise = currentRise * puff.speed;
            const px = puff.xNorm * width + simplex2D(puff.xNorm * 3, elapsed * 0.6) * 45;
            const py = height * puff.yBaseNorm - rise;
            const pRadius = puff.radius * (1 + tSmoke * 0.7);

            const plumeGrad = ctx.createRadialGradient(px, py, 10, px, py, pRadius);

            if (puff.layer === 0) {
              // Deepest / darkest layer: near-black charred smoke
              plumeGrad.addColorStop(0, "rgba(2, 8, 4, 0.92)");
              plumeGrad.addColorStop(0.5, "rgba(1, 15, 7, 0.7)");
              plumeGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
            } else if (puff.layer === 1) {
              // Mid layer: deep emerald smoke
              plumeGrad.addColorStop(0, "rgba(0, 45, 20, 0.85)");
              plumeGrad.addColorStop(0.55, "rgba(0, 30, 14, 0.6)");
              plumeGrad.addColorStop(1, "rgba(0, 5, 2, 0)");
            } else {
              // Front layer: vivid neon-green smoke highlights
              plumeGrad.addColorStop(0, "rgba(0, 160, 65, 0.75)");
              plumeGrad.addColorStop(0.45, "rgba(0, 95, 42, 0.55)");
              plumeGrad.addColorStop(1, "rgba(0, 20, 8, 0)");
            }

            ctx.fillStyle = plumeGrad;
            ctx.beginPath();
            ctx.arc(px, py, pRadius, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 4: CINEMATIC BLACKOUT (1.6s – 2.4s)
      // Transitioning into a deep black canvas with dim green floating particles.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 1.6 && elapsed < 2.5) {
        const tBlack = Math.min(1, (elapsed - 1.6) / 0.8);
        ctx.save();
        ctx.globalAlpha = tBlack * 0.9;
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 5: DARK SUSPENSE (2.2s – 3.5s)
      // Pure black canvas. Center completely dark. Faint green edge energy traces.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 2.2 && elapsed < 3.55) {
        ctx.save();

        // 1. Ensure center is completely pitch black (#000000)
        ctx.fillStyle = "#000000";
        ctx.fillRect(width * 0.15, 0, width * 0.7, height);

        // 2. Extremely subtle green edge energy traces near left & right
        const edgePulse = Math.sin(elapsed * 12);
        if (edgePulse > 0.3) {
          const traceAlpha = (edgePulse - 0.3) * 0.45;
          ctx.globalAlpha = traceAlpha;

          // Left edge twitch
          ctx.beginPath();
          const yL = height * (0.35 + Math.sin(elapsed * 6) * 0.25);
          ctx.moveTo(0, yL);
          ctx.lineTo(width * 0.04, yL + (Math.random() - 0.5) * 15);
          ctx.lineTo(width * 0.08, yL + (Math.random() - 0.5) * 25);
          ctx.strokeStyle = "#00FF41";
          ctx.lineWidth = 1.2;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 10;
          ctx.stroke();

          // Right edge twitch
          ctx.beginPath();
          const yR = height * (0.45 + Math.cos(elapsed * 5) * 0.25);
          ctx.moveTo(width, yR);
          ctx.lineTo(width * 0.96, yR + (Math.random() - 0.5) * 15);
          ctx.lineTo(width * 0.92, yR + (Math.random() - 0.5) * 25);
          ctx.strokeStyle = "#00FF41";
          ctx.lineWidth = 1.2;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 10;
          ctx.stroke();
        }

        ctx.restore();
      }

      // ── Green Floating Embers across Dark Stages ──
      if (elapsed >= 1.2) {
        ctx.save();
        for (const ember of embers) {
          ember.x += ember.vx + Math.sin(elapsed * 1.5 + ember.seed) * 0.4;
          ember.y += ember.vy;
          ember.life++;

          if (ember.life > ember.maxLife || ember.y < 0) {
            ember.y = height * (0.8 + Math.random() * 0.2);
            ember.x =
              (ember.side === "left" ? Math.random() * 0.18 : 0.82 + Math.random() * 0.18) * width;
            ember.life = 0;
          }

          const currentAlpha = ember.maxAlpha * (1 - ember.life / ember.maxLife);
          ctx.fillStyle = `rgba(198, 255, 54, ${currentAlpha})`;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 6;
          ctx.beginPath();
          ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.restore();

      // ───────────────────────────────────────────────────────────────────────
      // COMPLETION TRIGGER (3.5 SECONDS)
      // Unlocks hero section seamlessly after dark suspense hold.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 3.5) {
        if (!hasNotifiedComplete.current) {
          hasNotifiedComplete.current = true;
          onCompleteRef.current();
        }
        return; // stop rendering
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
      className={`fixed inset-0 z-[9999] pointer-events-none overflow-hidden bg-[#000000] select-none ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
