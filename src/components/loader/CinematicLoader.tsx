"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { useLoadingState } from "@/hooks/useLoadingState";
import { LoaderParticles } from "./LoaderParticles";

// Stage labels shown beneath the counter
const STAGE_LABELS: { threshold: number; label: string }[] = [
  { threshold: 0, label: "INITIALIZING" },
  { threshold: 25, label: "LOADING ASSETS" },
  { threshold: 50, label: "BUILDING ENVIRONMENT" },
  { threshold: 75, label: "PREPARING EXPERIENCE" },
  { threshold: 95, label: "READY" },
];

function getStageLabel(progress: number): string {
  let label = STAGE_LABELS[0].label;
  for (const stage of STAGE_LABELS) {
    if (progress >= stage.threshold) label = stage.label;
  }
  return label;
}

export function CinematicLoader() {
  const { onLoadingComplete, onRevealComplete } = useLoadingState();

  // DOM refs
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Animation state
  const progressObj = useRef({ value: 1 });
  const [displayProgress, setDisplayProgress] = useState(1);
  const hasCompleted = useRef(false);

  // Device detection — lazy initializer avoids synchronous setState in effects
  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });
  const [reducedMotion] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  // ─── Cinematic reveal at 100% ───────────────────────────────
  const runRevealSequence = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        onLoadingComplete();
        requestAnimationFrame(() => {
          onRevealComplete();
        });
      },
    });

    // Step 1: Hold 100 for a cinematic beat
    tl.to({}, { duration: 0.7 });

    // Step 2: Atmospheric green glow flash behind Bodoni numerals
    if (glowRef.current) {
      tl.to(
        glowRef.current,
        {
          opacity: 0.75,
          scale: 2.2,
          duration: 0.5,
          ease: "power2.in",
        },
        "<"
      );
    }

    // Step 3: Counter scales and dissolves smoothly
    if (counterRef.current) {
      tl.to(counterRef.current, {
        scale: 1.12,
        opacity: 0,
        filter: "blur(16px)",
        duration: 0.5,
        ease: "power3.in",
      });
    }

    // Step 4: Supporting text fades
    if (labelRef.current) {
      tl.to(
        labelRef.current,
        { opacity: 0, y: 12, duration: 0.35, ease: "power2.in" },
        "-=0.4"
      );
    }

    // Step 5: Pure black overlay lifts away to reveal main site
    if (overlayRef.current) {
      tl.to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.inOut",
        },
        "-=0.2"
      );
    }
  }, [onLoadingComplete, onRevealComplete]);

  // ─── Main loading timeline ──────────────────────────────────
  useEffect(() => {
    // Lock scrollbar during loading
    document.body.style.overflow = "hidden";

    const duration = reducedMotion ? 1.5 : 3.8;

    // Animate progress 1 → 100
    const counterTween = gsap.to(progressObj.current, {
      value: 100,
      duration,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.round(progressObj.current.value);
        setDisplayProgress(val);

        if (stageRef.current) {
          stageRef.current.textContent = getStageLabel(val);
        }

        // Drive atmospheric background glow via progress
        if (glowRef.current) {
          const norm = val / 100;
          glowRef.current.style.opacity = String(Math.min(0.35, norm * 0.35));
          glowRef.current.style.transform = `translate(-50%, -50%) scale(${0.7 + norm * 0.6})`;
        }
      },
      onComplete: () => {
        runRevealSequence();
      },
    });

    // Fade-in supporting text labels cleanly
    if (labelRef.current) {
      gsap.fromTo(
        labelRef.current,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: reducedMotion ? 0.3 : 0.7,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }

    return () => {
      counterTween.kill();
      document.body.style.overflow = "";
    };
  }, [reducedMotion, runRevealSequence]);

  const formattedCounter = String(displayProgress).padStart(2, "0");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
      style={{ willChange: "opacity" }}
      aria-live="polite"
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading 3D experience"
    >
      {/* Canvas particles behind everything */}
      <LoaderParticles
        progress={displayProgress}
        reducedMotion={reducedMotion}
        isMobile={isMobile}
      />

      {/* Atmospheric green radial glow behind ITC Bodoni 72 typography */}
      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: "min(90vw, 700px)",
          height: "min(90vw, 700px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,255,102,0.14) 0%, rgba(0,255,102,0.02) 50%, transparent 75%)",
          opacity: 0,
          willChange: "opacity, transform",
        }}
        aria-hidden="true"
      />

      {/* Central counter + supporting text */}
      <div className="relative z-10 flex flex-col items-center select-none text-center px-4">
        {/* Large ITC Bodoni 72 Italic Counter */}
        <div
          ref={counterRef}
          className="relative leading-none select-none"
          style={{
            fontFamily:
              'var(--font-bodoni-72), "ITC Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72", Georgia, serif',
            fontStyle: "italic",
            fontWeight: 400,
            fontFeatureSettings: '"onum" 1, "pnum" 1',
            fontSize: "clamp(180px, 28vw, 520px)",
            color: "#00FF66",
            letterSpacing: "-0.02em",
            opacity: 1,
            textShadow: "0 0 40px rgba(0, 255, 102, 0.2)",
            willChange: "transform, opacity, filter",
          }}
        >
          {formattedCounter}
        </div>

        {/* Supporting label & stage indicator */}
        <div
          ref={labelRef}
          className="mt-2 sm:mt-4 flex flex-col items-center"
          style={{ opacity: 0, willChange: "opacity, transform" }}
        >
          <div
            className="tracking-[0.4em] uppercase font-light"
            style={{
              fontSize: "clamp(0.55rem, 1.1vw, 0.75rem)",
              color: "rgba(0, 255, 102, 0.5)",
              letterSpacing: "0.35em",
            }}
          >
            LOADING 3D EXPERIENCE
          </div>

          <div
            ref={stageRef}
            className="mt-2 tracking-[0.3em] uppercase font-light"
            style={{
              fontSize: "clamp(0.45rem, 0.85vw, 0.6rem)",
              color: "rgba(0, 255, 102, 0.25)",
              letterSpacing: "0.25em",
            }}
          >
            INITIALIZING
          </div>
        </div>
      </div>

      {/* Subtle green horizon accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,255,102,0.15), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
