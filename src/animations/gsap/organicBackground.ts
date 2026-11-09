import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface OrganicBackgroundElements {
  container: HTMLElement;
  canvas?: HTMLCanvasElement | null;
  centerThorn?: HTMLElement | SVGElement | null;
  handsContainer?: HTMLElement | null;
}

export interface OrganicBackgroundOptions {
  reducedMotion?: boolean;
}

/**
 * Initializes the Green Organic Background animation using GSAP, ScrollTrigger,
 * and high-performance procedural canvas rendering.
 *
 * Recreates the reference liquid flame and thorn silhouette animation in premium emerald green.
 */
export function initOrganicBackground(
  elements: OrganicBackgroundElements,
  options: OrganicBackgroundOptions = {}
): () => void {
  const { container, canvas, centerThorn, handsContainer } = elements;
  if (!container) return () => {};

  const reducedMotion =
    options.reducedMotion ??
    (typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  let animFrameId: number;
  let isCleanedUp = false;

  // Track dynamic animation parameters influenced by GSAP ScrollTrigger
  const animState = {
    scrollProgress: 0,
    silhouetteExpansion: 1.0,
    thornScale: 1.0,
    thornY: 0,
    thornRotation: 0,
    handsY: 0,
    glowIntensity: 0.5,
  };

  // ─── 1. GSAP TIMELINES & SCROLLTRIGGER SETUP ───
  const ctx = gsap.context(() => {
    // Scroll-triggered expansion and morphing across viewport
    ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: 1.2,
      onUpdate: (self) => {
        animState.scrollProgress = self.progress;
        animState.silhouetteExpansion = 0.9 + self.progress * 0.45;
        animState.handsY = (self.progress - 0.5) * -50;
      },
    });

    if (centerThorn) {
      // Continuous organic breathing and micro-morphing
      gsap.to(centerThorn, {
        scale: reducedMotion ? 1.0 : 1.05,
        rotation: reducedMotion ? 0 : 2.0,
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Scroll-reactive transformation for central thorn
      gsap.to(centerThorn, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.0,
        },
        scale: 1.16,
        y: -40,
        ease: "power1.out",
      });
    }

    if (handsContainer) {
      // Parallax depth for bottom hands
      gsap.to(handsContainer, {
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
        y: -30,
        ease: "none",
      });
    }
  }, container);

  // ─── 2. PROCEDURAL ORGANIC SILHOUETTE CANVAS ENGINE (PREMIUM EMERALD PALETTE) ───
  if (canvas) {
    const renderCtx = canvas.getContext("2d", { alpha: false });
    if (renderCtx) {
      let width = 0;
      let height = 0;
      let dpr = 1;

      const handleResize = () => {
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = container.getBoundingClientRect();
        width = rect.width || window.innerWidth || 1200;
        height = rect.height || window.innerHeight || 800;

        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        renderCtx.scale(dpr, dpr);
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      // Micro-spores floating through dark atmosphere
      interface Spore {
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        alpha: number;
        pulse: number;
      }

      const spores: Spore[] = Array.from({ length: 32 }, () => ({
        x: Math.random() * (width || 1200),
        y: (height || 800) * 0.4 + Math.random() * (height || 800) * 0.6,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.6 - Math.random() * 1.2,
        size: 1.0 + Math.random() * 2.2,
        alpha: 0.1,
        pulse: 0.02 + Math.random() * 0.04,
      }));

      const startTime = performance.now();

      const render = (now: number) => {
        if (isCleanedUp) return;

        const t = (now - startTime) * 0.001;
        const scrollFactor = animState.scrollProgress;
        const expansion = animState.silhouetteExpansion;

        // A. Pure Black Background (#000000)
        renderCtx.fillStyle = "#000000";
        renderCtx.fillRect(0, 0, width, height);

        // B. Volumetric Ambient Glow (#00FF8530 & Dark Emerald) Behind Center
        const centerGlow = renderCtx.createRadialGradient(
          width * 0.5,
          height * 0.62,
          50,
          width * 0.5,
          height * 0.62,
          width * 0.68
        );
        centerGlow.addColorStop(0, "rgba(0, 143, 72, 0.28)"); // Emerald #008F48
        centerGlow.addColorStop(0.35, "rgba(0, 61, 32, 0.18)"); // Dark green #003D20
        centerGlow.addColorStop(0.75, "rgba(0, 0, 0, 0.5)");
        centerGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
        renderCtx.fillStyle = centerGlow;
        renderCtx.fillRect(0, 0, width, height);

        const pointsCount = 90;
        const step = width / pointsCount;

        // ─── LAYER 1: DEEP EMERALD REAR SILHOUETTE (#003D20 -> #008F48) ───
        renderCtx.save();
        renderCtx.beginPath();
        renderCtx.moveTo(0, height);

        const l1BaseY = height * (0.42 - scrollFactor * 0.14) * (2 - expansion * 0.5);

        for (let i = 0; i <= pointsCount; i++) {
          const x = i * step;
          const nx = x / width;

          // Multi-octave organic undulation
          const w1 = Math.sin(nx * 4.5 + t * 0.75) * 50;
          const w2 = Math.cos(nx * 8.2 - t * 0.95) * 30;
          const sharpTongue = Math.pow(Math.abs(Math.sin(nx * 9.2 + t * 1.15 + 0.3)), 3.4) * -70;

          const y = l1BaseY + w1 + w2 + sharpTongue;
          renderCtx.lineTo(x, y);
        }

        renderCtx.lineTo(width, height);
        renderCtx.closePath();

        const grad1 = renderCtx.createLinearGradient(0, l1BaseY - 80, 0, height);
        grad1.addColorStop(0, "rgba(0, 143, 72, 0.70)"); // Emerald #008F48
        grad1.addColorStop(0.35, "rgba(0, 61, 32, 0.88)"); // Dark green #003D20
        grad1.addColorStop(1, "#000000");
        renderCtx.fillStyle = grad1;
        renderCtx.fill();
        renderCtx.restore();

        // ─── LAYER 2: PRIMARY EMERALD / MAIN GREEN SILHOUETTE (#008F48 -> #00D978) ───
        // Large horizontal organic silhouette covering most of middle and lower viewport
        renderCtx.save();
        renderCtx.beginPath();
        renderCtx.moveTo(0, height);

        const l2BaseY = height * (0.52 - scrollFactor * 0.18) * (2 - expansion * 0.5);
        const l2Points: { x: number; y: number }[] = [];

        for (let i = 0; i <= pointsCount; i++) {
          const x = i * step;
          const nx = x / width;

          // Sharp, flame-like & creature-inspired edges with independent motion
          const w1 = Math.sin(nx * 5.5 + t * 1.25 + 0.5) * 44;
          const w2 = Math.cos(nx * 10.2 - t * 1.55) * 28;
          const horn1 = Math.pow(Math.abs(Math.sin(nx * 11.2 + t * 1.65)), 2.8) * -85;
          const horn2 = Math.pow(Math.abs(Math.cos(nx * 16.5 - t * 2.25 + 0.4)), 3.6) * -50;

          const y = l2BaseY + w1 + w2 + horn1 + horn2;
          l2Points.push({ x, y });
          renderCtx.lineTo(x, y);
        }

        renderCtx.lineTo(width, height);
        renderCtx.closePath();

        // Dominant Emerald Fill
        const grad2 = renderCtx.createLinearGradient(0, l2BaseY - 110, 0, height);
        grad2.addColorStop(0, "rgba(0, 217, 120, 0.90)"); // Main green #00D978
        grad2.addColorStop(0.18, "rgba(0, 143, 72, 0.85)"); // Emerald #008F48
        grad2.addColorStop(0.6, "rgba(0, 61, 32, 0.95)"); // Dark green #003D20
        grad2.addColorStop(1, "#000000");
        renderCtx.fillStyle = grad2;
        renderCtx.fill();

        // Controlled Bright Highlight Rim (#39FF9B)
        renderCtx.beginPath();
        for (let i = 0; i < l2Points.length; i++) {
          const p = l2Points[i];
          if (i === 0) renderCtx.moveTo(p.x, p.y);
          else renderCtx.lineTo(p.x, p.y);
        }
        renderCtx.strokeStyle = "#39FF9B";
        renderCtx.lineWidth = 2.4;
        renderCtx.shadowColor = "rgba(0, 255, 133, 0.4)";
        renderCtx.shadowBlur = 14;
        renderCtx.stroke();
        renderCtx.shadowBlur = 0;
        renderCtx.restore();

        // ─── LAYER 3: FLOATING SPORES / MICRO-EMBERS ───
        renderCtx.save();
        for (let i = 0; i < spores.length; i++) {
          const sp = spores[i];
          sp.y += sp.vy;
          sp.x += sp.vx + Math.sin(t * 1.4 + i) * 0.4;
          sp.alpha = (Math.sin(t * sp.pulse * 20 + i) * 0.5 + 0.5) * 0.45;

          if (sp.y < height * 0.2 || sp.x < 0 || sp.x > width) {
            sp.y = height * (0.6 + Math.random() * 0.4);
            sp.x = Math.random() * width;
          }

          renderCtx.beginPath();
          renderCtx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          renderCtx.fillStyle = `rgba(57, 255, 155, ${sp.alpha})`;
          renderCtx.shadowColor = "#00FF85";
          renderCtx.shadowBlur = sp.size * 3;
          renderCtx.fill();
        }
        renderCtx.restore();

        // ─── LAYER 4: CINEMATIC VIGNETTE ───
        const vignette = renderCtx.createRadialGradient(
          width * 0.5,
          height * 0.5,
          Math.min(width, height) * 0.35,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.8
        );
        vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
        vignette.addColorStop(0.65, "rgba(0, 0, 0, 0.35)");
        vignette.addColorStop(1, "rgba(0, 0, 0, 0.98)");
        renderCtx.fillStyle = vignette;
        renderCtx.fillRect(0, 0, width, height);

        animFrameId = requestAnimationFrame(render);
      };

      animFrameId = requestAnimationFrame(render);
    }
  }

  // Cleanup handler
  return () => {
    isCleanedUp = true;
    cancelAnimationFrame(animFrameId);
    ctx.revert();
  };
}
