"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "@/lib/gsap";
import { useLoadingState } from "@/hooks/useLoadingState";
import { LoaderParticles } from "./LoaderParticles";

// Stage labels shown beneath the counter
const STAGE_LABELS: { threshold: number; label: string }[] = [
  { threshold: 0, label: "INITIALIZING ORCHESTRATION" },
  { threshold: 25, label: "CONNECTING 240+ APPS" },
  { threshold: 50, label: "CALIBRATING WORKFLOW CANVASES" },
  { threshold: 75, label: "SYNCHRONIZING REPLAY ENGINES" },
  { threshold: 95, label: "ALL SYSTEMS OPERATIONAL" },
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

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
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

    // Step 1: Hold 100 for a brief cinematic beat
    tl.to({}, { duration: 0.35 });

    // Step 2: Atmospheric green glow flash behind Bodoni numerals
    if (glowRef.current) {
      tl.to(
        glowRef.current,
        {
          opacity: 0.85,
          scale: 2.2,
          duration: 0.45,
          ease: "power2.in",
        },
        "<"
      );
    }

    // Step 3: Counter scales and dissolves smoothly
    if (counterRef.current) {
      tl.to(counterRef.current, {
        scale: 1.1,
        opacity: 0,
        filter: "blur(16px)",
        duration: 0.45,
        ease: "power3.in",
      });
    }

    // Step 4: Supporting text fades
    if (labelRef.current) {
      tl.to(
        labelRef.current,
        { opacity: 0, y: 12, duration: 0.3, ease: "power2.in" },
        "-=0.35"
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
        "-=0.15"
      );
    }
  }, [onLoadingComplete, onRevealComplete]);

  // ─── Main loading timeline ──────────────────────────────────
  useEffect(() => {
    // Lock scrollbar during loading
    document.body.style.overflow = "hidden";

    const duration = 2.4;

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
          glowRef.current.style.opacity = String(Math.min(0.4, norm * 0.4));
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
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        }
      );
    }

    return () => {
      counterTween.kill();
      document.body.style.overflow = "";
    };
  }, [runRevealSequence]);

  const formattedCounter = String(displayProgress).padStart(2, "0");

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505]"
      style={{ willChange: "opacity" }}
      aria-live="polite"
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Relay experience"
    >
      {/* Canvas particles behind everything */}
      <LoaderParticles
        progress={displayProgress}
        reducedMotion={false}
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
            "radial-gradient(circle, rgba(198,255,54,0.18) 0%, rgba(198,255,54,0.03) 50%, transparent 75%)",
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
            fontSize: "clamp(180px, 28vw, 480px)",
            color: "#C6FF36",
            letterSpacing: "-0.02em",
            opacity: 1,
            textShadow: "0 0 50px rgba(198, 255, 54, 0.35)",
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
            className="tracking-[0.4em] uppercase font-mono font-medium"
            style={{
              fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
              color: "#C6FF36",
              letterSpacing: "0.35em",
            }}
          >
            RELAY // AUTONOMOUS WORKFLOWS
          </div>

          <div
            ref={stageRef}
            className="mt-2 tracking-[0.3em] uppercase font-mono text-xs"
            style={{
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.25em",
            }}
          >
            INITIALIZING ORCHESTRATION
          </div>
        </div>
      </div>

      {/* Subtle green horizon accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(198,255,54,0.3), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
