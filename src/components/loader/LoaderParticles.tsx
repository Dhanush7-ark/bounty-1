"use client";

import { useRef, useEffect, useCallback } from "react";

interface LoaderParticlesProps {
  progress: number;
  reducedMotion: boolean;
  isMobile: boolean;
}

export function LoaderParticles({
  progress,
  reducedMotion,
  isMobile,
}: LoaderParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const isInitialized = useRef(false);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, time: number) => {
      ctx.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const centerX = w / 2;
      const centerY = h / 2;
      const progressNorm = progress / 100;

      // Draw radial glow behind center (progress-driven)
      if (progressNorm > 0.1) {
        const glowAlpha = Math.min(0.12, progressNorm * 0.12);
        const glowRadius = Math.min(w, h) * 0.3 * (0.5 + progressNorm * 0.5);
        const radialGlow = ctx.createRadialGradient(
          centerX,
          centerY,
          0,
          centerX,
          centerY,
          glowRadius
        );
        radialGlow.addColorStop(0, `rgba(0, 255, 102, ${glowAlpha})`);
        radialGlow.addColorStop(0.4, `rgba(0, 255, 102, ${glowAlpha * 0.4})`);
        radialGlow.addColorStop(1, "rgba(0, 255, 102, 0)");
        ctx.fillStyle = radialGlow;
        ctx.fillRect(0, 0, w, h);
      }

      // Film grain (very subtle)
      if (!reducedMotion && !isMobile && progressNorm > 0.15) {
        const grainAlpha = 0.018;
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;
        // Apply sparse grain for perf — every 4th pixel
        for (let i = 0; i < data.length; i += 16) {
          const noise = ((i * 2654435761) >>> 0) % 255; // deterministic hash-based noise
          const timeMod = ((time * 0.001 + i) | 0) % 3;
          if (timeMod === 0) {
            const grainValue = (noise - 128) * grainAlpha;
            data[i] = Math.max(0, Math.min(255, data[i] + grainValue));
            data[i + 1] = Math.max(
              0,
              Math.min(255, data[i + 1] + grainValue)
            );
            data[i + 2] = Math.max(
              0,
              Math.min(255, data[i + 2] + grainValue)
            );
          }
        }
        ctx.putImageData(imageData, 0, 0);
      }

      // Draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!reducedMotion) {
          // Drift toward center as progress increases
          const pullStrength = progressNorm * 0.0003;
          p.vx += (centerX - p.x) * pullStrength;
          p.vy += (centerY - p.y) * pullStrength;

          p.x += p.vx + Math.sin(time * 0.0005 + p.phase) * p.drift;
          p.y += p.vy + Math.cos(time * 0.0004 + p.phase) * p.drift;

          // Damping
          p.vx *= 0.99;
          p.vy *= 0.99;

          // Wrap edges
          if (p.x < -10) p.x = w + 10;
          if (p.x > w + 10) p.x = -10;
          if (p.y < -10) p.y = h + 10;
          if (p.y > h + 10) p.y = -10;
        }

        const alpha =
          p.baseAlpha * (0.3 + progressNorm * 0.7) *
          (0.6 + Math.sin(time * 0.001 + p.phase) * 0.4);

        // Draw particle glow
        if (p.size > 1.2) {
          const glowGrad = ctx.createRadialGradient(
            p.x,
            p.y,
            0,
            p.x,
            p.y,
            p.size * 4
          );
          glowGrad.addColorStop(0, `rgba(0, 255, 102, ${alpha * 0.3})`);
          glowGrad.addColorStop(1, "rgba(0, 255, 102, 0)");
          ctx.fillStyle = glowGrad;
          ctx.fillRect(
            p.x - p.size * 4,
            p.y - p.size * 4,
            p.size * 8,
            p.size * 8
          );
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 102, ${alpha})`;
        ctx.fill();
      }
    },
    [progress, reducedMotion, isMobile]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    if (!isInitialized.current) {
      resize();
      const count = isMobile ? 30 : 60;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: pseudoRandom(i * 7 + 1) * w,
          y: pseudoRandom(i * 7 + 2) * h,
          vx: (pseudoRandom(i * 7 + 3) - 0.5) * 0.15,
          vy: (pseudoRandom(i * 7 + 4) - 0.5) * 0.15,
          size: pseudoRandom(i * 7 + 5) * 1.5 + 0.4,
          baseAlpha: pseudoRandom(i * 7 + 6) * 0.4 + 0.1,
          phase: pseudoRandom(i * 7 + 7) * Math.PI * 2,
          drift: pseudoRandom(i * 7 + 8) * 0.3 + 0.05,
        });
      }
      particlesRef.current = particles;
      isInitialized.current = true;
    }

    window.addEventListener("resize", resize);

    const loop = (time: number) => {
      resize(); // Ensure correct DPR on each frame
      const w = window.innerWidth;
      const h = window.innerHeight;
      draw(ctx, w, h, time);
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [draw, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    />
  );
}

// Deterministic PRNG
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseAlpha: number;
  phase: number;
  drift: number;
}
