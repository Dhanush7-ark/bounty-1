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

// ─────────────────────────────────────────────────────────────────────────────
// EASING FUNCTIONS
// ─────────────────────────────────────────────────────────────────────────────
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
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
      // STAGE 2 & 3: GREEN & BLACK SMOKE ENTRANCE + BOUNDARY (0.5s – 1.8s)
      // Volumetric dark emerald & charred black smoke rising from bottom edge.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 0.45 && elapsed < 2.4) {
        const tSmoke = Math.min(1, Math.max(0, (elapsed - 0.45) / 0.75));
        const tBlackout = elapsed > 1.8 ? Math.min(1, (elapsed - 1.8) / 0.6) : 0;
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
      // STAGE 3 & 4: ELECTRIC NEON-GREEN ENERGY BOUNDARY (1.2s – 2.4s)
      // Thin, irregular, glowing green lightning line across smoke horizon.
      // Shatters into fading green spark arcs during Frame 4 (1.8s - 2.4s).
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 1.15 && elapsed < 2.4) {
        const tBoundary = Math.min(1, Math.max(0, (elapsed - 1.15) / 0.55));
        const tBreak = elapsed > 1.8 ? Math.min(1, (elapsed - 1.8) / 0.6) : 0;
        const lineOpacity = Math.max(0, 1 - tBreak * 1.4) * Math.min(1, (elapsed - 1.15) / 0.15);

        if (lineOpacity > 0.001) {
          ctx.save();

          // Rapid organic electrical flicker
          const flicker = 0.8 + 0.2 * Math.sin(elapsed * 45) * Math.cos(elapsed * 28);
          ctx.globalAlpha = lineOpacity * flicker;

          const boundaryBaseY = height * (0.46 + 0.03 * Math.sin(elapsed * 3));
          const reachX = width * Math.min(1, tBoundary * 1.3);

          const stepX = 14;
          const points: { x: number; y: number }[] = [];

          for (let x = 0; x <= reachX; x += stepX) {
            const noiseOffset = simplex2D(x * 0.012, elapsed * 8) * 26;
            const jitter = (Math.sin(x * 0.3 + elapsed * 30) > 0.6 ? 1 : -1) * (Math.random() * 12);
            const shatterY = tBreak > 0 ? (Math.random() - 0.5) * 60 * tBreak : 0;
            const shatterX = tBreak > 0 ? (Math.random() - 0.5) * 35 * tBreak : 0;

            points.push({
              x: x + shatterX,
              y: boundaryBaseY + noiseOffset + jitter + shatterY,
            });
          }

          // Pass 1: Outer Neon Green Bloom Glow
          ctx.beginPath();
          if (points.length > 0) {
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i].x, points[i].y);
            }
          }
          ctx.strokeStyle = "rgba(0, 255, 65, 0.4)";
          ctx.lineWidth = 10;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 28;
          ctx.stroke();

          // Pass 2: Vivid Electric Green Core
          ctx.beginPath();
          if (points.length > 0) {
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i].x, points[i].y);
            }
          }
          ctx.strokeStyle = "#00FF41";
          ctx.lineWidth = 3;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 14;
          ctx.stroke();

          // Pass 3: Incandescent Electric White-Green Filament
          ctx.beginPath();
          if (points.length > 0) {
            ctx.moveTo(points[0].x, points[0].y);
            for (let i = 1; i < points.length; i++) {
              ctx.lineTo(points[i].x, points[i].y);
            }
          }
          ctx.strokeStyle = "#E8FFE9";
          ctx.lineWidth = 1.2;
          ctx.shadowBlur = 0;
          ctx.stroke();

          // Small Branching Electrical Forks (6-9 branches)
          for (let b = 0; b < points.length; b += 7) {
            if (b + 3 < points.length && Math.sin(b + elapsed * 15) > 0.15) {
              const startPt = points[b];
              ctx.beginPath();
              ctx.moveTo(startPt.x, startPt.y);

              const branchLength = 25 + Math.random() * 45;
              const angle = (Math.random() > 0.5 ? 1 : -1) * (0.6 + Math.random() * 0.8);
              const midX = startPt.x + Math.cos(angle) * (branchLength * 0.5) + (Math.random() - 0.5) * 8;
              const midY = startPt.y + Math.sin(angle) * (branchLength * 0.5) + (Math.random() - 0.5) * 8;
              const endX = startPt.x + Math.cos(angle) * branchLength;
              const endY = startPt.y + Math.sin(angle) * branchLength;

              ctx.lineTo(midX, midY);
              ctx.lineTo(endX, endY);
              ctx.strokeStyle = "#39FF14";
              ctx.lineWidth = 1.4;
              ctx.shadowColor = "#00FF41";
              ctx.shadowBlur = 8;
              ctx.stroke();
            }
          }

          ctx.restore();
        }
      }

      // ───────────────────────────────────────────────────────────────────────
      // STAGE 5: DARK SUSPENSE (2.4s – 3.5s)
      // Pure black canvas. Center completely dark. Faint green edge energy traces.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 2.35 && elapsed < 3.55) {
        ctx.save();

        // 1. Ensure Center is completely pitch black (#000000)
        ctx.fillStyle = "#000000";
        ctx.fillRect(width * 0.15, 0, width * 0.7, height);

        // 2. Extremely subtle green edge energy traces near left (x < 0.12) & right (x > 0.88)
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

      // ── Green Embers across Stages 4, 5, 8 ──
      if (elapsed >= 1.8) {
        ctx.save();
        for (const ember of embers) {
          ember.x += ember.vx + Math.sin(elapsed * 1.5 + ember.seed) * 0.4;
          ember.y += ember.vy;
          ember.life++;

          if (ember.life > ember.maxLife || ember.y < 0) {
            ember.y = height * (0.8 + Math.random() * 0.2);
            ember.x =
              elapsed < 3.5
                ? (ember.side === "left" ? Math.random() * 0.18 : 0.82 + Math.random() * 0.18) * width
                : Math.random() * width;
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

      // ───────────────────────────────────────────────────────────────────────
      // STAGES 6, 7 & 8: LEFT & RIGHT GREEN ENERGY ENTRANCE -> SYMMETRICAL EXPANSION
      // (3.5s – 5.5s)
      // Sharp, thin, glowing neon-green energy streaks bursting from left & right,
      // expanding into intricate symmetrical wings / organic cyber-flame branches.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 3.5) {
        ctx.save();

        const tWingProgress = Math.min(1, (elapsed - 3.5) / 1.5); // 0 to 1 over 3.5s -> 5.0s
        const isRevealedStage = elapsed >= 5.0; // Stage 8: Hold & pulse

        // Organic reach factor
        const reach = isRevealedStage
          ? 1.0
          : tWingProgress < 0.45
          ? easeOutQuart(tWingProgress / 0.45) * 0.45
          : 0.45 + easeInOutCubic((tWingProgress - 0.45) / 0.55) * 0.55;

        const wingFlicker = isRevealedStage
          ? 0.92 + 0.08 * Math.sin(elapsed * 35)
          : 0.85 + 0.15 * Math.sin(elapsed * 45);

        ctx.globalAlpha = Math.min(1, (elapsed - 3.5) / 0.15) * wingFlicker;

        const glowBoost = isRevealedStage ? 1.0 + 0.18 * Math.sin((elapsed - 5.0) * 8) : 1.0;

        const centerX = width * 0.5;
        const centerY = height * 0.48;

        // Render Symmetrical Green Wing Formation (Left & Right mirrored)
        const drawWingHalf = (isLeft: boolean) => {
          ctx.save();
          const sign = isLeft ? 1 : -1;
          const originX = isLeft ? 0 : width;

          const targetTipX = centerX - sign * width * (1 - reach) * 0.42;
          const targetTipY = centerY - height * 0.18 * reach;

          const spines = [
            // Spine 0: Main upper soaring wing tip
            {
              reachFactor: reach,
              start: { x: originX, y: centerY + height * 0.15 },
              cp1: { x: originX + sign * width * 0.18 * reach, y: centerY - height * 0.05 },
              cp2: { x: originX + sign * width * 0.35 * reach, y: centerY - height * 0.22 },
              end: { x: targetTipX, y: targetTipY },
              width: 3.2,
            },
            // Spine 1: Mid-tier aggressive curved talon
            {
              reachFactor: Math.min(1, reach * 1.15),
              start: { x: originX, y: centerY + height * 0.22 },
              cp1: { x: originX + sign * width * 0.15 * reach, y: centerY + height * 0.05 },
              cp2: { x: originX + sign * width * 0.3 * reach, y: centerY - height * 0.08 },
              end: {
                x: centerX - sign * width * (1 - reach) * 0.38 - sign * 40,
                y: centerY - height * 0.05,
              },
              width: 2.6,
            },
            // Spine 2: Lower sweeping flame horn
            {
              reachFactor: Math.min(1, reach * 1.05),
              start: { x: originX, y: centerY + height * 0.3 },
              cp1: { x: originX + sign * width * 0.14 * reach, y: centerY + height * 0.18 },
              cp2: { x: originX + sign * width * 0.26 * reach, y: centerY + height * 0.08 },
              end: {
                x: centerX - sign * width * (1 - reach) * 0.35 - sign * 80,
                y: centerY + height * 0.12,
              },
              width: 2.2,
            },
            // Spine 3: Intricate inner secondary tendril
            {
              reachFactor: Math.max(0, (reach - 0.3) / 0.7),
              start: { x: originX + sign * width * 0.12 * reach, y: centerY - height * 0.02 },
              cp1: { x: originX + sign * width * 0.22 * reach, y: centerY - height * 0.12 },
              cp2: { x: originX + sign * width * 0.32 * reach, y: centerY - height * 0.15 },
              end: {
                x: centerX - sign * width * (1 - reach) * 0.44 - sign * 20,
                y: centerY - height * 0.28,
              },
              width: 1.8,
            },
            // Spine 4: Fine electrical filament
            {
              reachFactor: Math.max(0, (reach - 0.4) / 0.6),
              start: { x: originX + sign * width * 0.18 * reach, y: centerY + height * 0.08 },
              cp1: { x: originX + sign * width * 0.25 * reach, y: centerY + height * 0.02 },
              cp2: { x: originX + sign * width * 0.35 * reach, y: centerY - height * 0.02 },
              end: {
                x: centerX - sign * width * (1 - reach) * 0.42 - sign * 60,
                y: centerY + height * 0.02,
              },
              width: 1.4,
            },
          ];

          // 1. Draw Charred Dark Interior Silhouette Fill (Cyber Wing Interior)
          if (reach > 0.15) {
            ctx.beginPath();
            ctx.moveTo(originX, centerY + height * 0.35);
            ctx.quadraticCurveTo(
              originX + sign * width * 0.2 * reach,
              centerY + height * 0.1,
              targetTipX,
              targetTipY
            );
            ctx.quadraticCurveTo(
              originX + sign * width * 0.3 * reach,
              centerY - height * 0.05,
              originX + sign * width * 0.05,
              centerY - height * 0.08
            );
            ctx.closePath();

            const bodyGrad = ctx.createLinearGradient(originX, centerY, targetTipX, targetTipY);
            bodyGrad.addColorStop(0, "rgba(2, 10, 5, 0.95)");
            bodyGrad.addColorStop(0.65, "rgba(0, 25, 12, 0.88)");
            bodyGrad.addColorStop(1, "rgba(0, 48, 22, 0.9)");
            ctx.fillStyle = bodyGrad;
            ctx.fill();
          }

          // 2. Draw Razor-Sharp Illuminated Neon-Green Edges (Multi-pass Glow)
          for (const s of spines) {
            if (s.reachFactor <= 0.01) continue;

            const path = new Path2D();
            path.moveTo(s.start.x, s.start.y);
            path.bezierCurveTo(s.cp1.x, s.cp1.y, s.cp2.x, s.cp2.y, s.end.x, s.end.y);

            // Pass A: Outer Neon Green Bloom Glow
            ctx.strokeStyle = "rgba(0, 255, 65, 0.5)";
            ctx.lineWidth = s.width * 4;
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 28 * glowBoost;
            ctx.stroke(path);

            // Pass B: Intense Illuminated Neon-Green Edge
            ctx.strokeStyle = "#00FF41";
            ctx.lineWidth = s.width * 1.5;
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 12 * glowBoost;
            ctx.stroke(path);

            // Pass C: Bright Electric White-Green Core Line
            ctx.strokeStyle = "#E8FFE9";
            ctx.lineWidth = Math.max(1, s.width * 0.6);
            ctx.shadowBlur = 0;
            ctx.stroke(path);

            // Concentrated glowing tip with spark emission
            ctx.beginPath();
            ctx.arc(s.end.x, s.end.y, 2.5 * s.width * 0.5, 0, Math.PI * 2);
            ctx.fillStyle = "#E8FFE9";
            ctx.shadowColor = "#00FF41";
            ctx.shadowBlur = 24 * glowBoost;
            ctx.fill();
            ctx.shadowBlur = 0;
          }

          // 3. Intricate Micro-branch Tendrils & Electrical Sparks
          if (reach > 0.4) {
            for (let k = 0; k < 6; k++) {
              const seedK = k * 17.3 + (isLeft ? 0 : 50);
              const tSpur = 0.2 + (k / 6) * 0.7;
              const spurX = originX + sign * width * 0.35 * reach * tSpur;
              const spurY = centerY - height * 0.08 * reach * tSpur + Math.sin(seedK + elapsed * 10) * 15;

              ctx.beginPath();
              ctx.moveTo(spurX, spurY);
              const tipAngle = (isLeft ? -1 : 1) * 0.7 + (Math.sin(seedK + elapsed * 8) > 0 ? 0.3 : -0.3);
              const spurLen = (15 + Math.random() * 25) * reach;
              ctx.lineTo(spurX + Math.cos(tipAngle) * spurLen, spurY + Math.sin(tipAngle) * spurLen);

              ctx.strokeStyle = "#39FF14";
              ctx.lineWidth = 1.3;
              ctx.shadowColor = "#00FF41";
              ctx.shadowBlur = 8 * glowBoost;
              ctx.stroke();
            }
          }

          ctx.restore();
        };

        // Render Left Wing Formation
        drawWingHalf(true);

        // Render Right Wing Formation (Symmetrical)
        drawWingHalf(false);

        // Center Convergence Spark / High-voltage Core
        if (reach >= 0.85) {
          const convergenceProgress = (reach - 0.85) / 0.15;
          ctx.beginPath();
          ctx.arc(centerX, centerY - height * 0.12, 12 * convergenceProgress, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 255, 65, ${0.4 * convergenceProgress})`;
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 40 * glowBoost;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(centerX, centerY - height * 0.12, 3.5 * convergenceProgress, 0, Math.PI * 2);
          ctx.fillStyle = "#E8FFE9";
          ctx.shadowColor = "#00FF41";
          ctx.shadowBlur = 15;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        ctx.restore();
      }

      ctx.restore();

      // ───────────────────────────────────────────────────────────────────────
      // COMPLETION TRIGGER: FRAME 8 FINISH (5.5 SECONDS)
      // Unlocks hero section seamlessly.
      // ───────────────────────────────────────────────────────────────────────
      if (elapsed >= 5.5) {
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
