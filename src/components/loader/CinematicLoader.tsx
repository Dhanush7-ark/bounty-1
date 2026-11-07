"use client";

import { useEffect, useState, useRef, useCallback } from "react";
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

  const [displayProgress, setDisplayProgress] = useState(1);
  const [isExiting, setIsExiting] = useState(false);
  const [flashGlow, setFlashGlow] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  const hasCompleted = useRef(false);

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  const handleComplete = useCallback(() => {
    if (hasCompleted.current) return;
    hasCompleted.current = true;

    // Step 1: Hold 100 for a cinematic beat
    setTimeout(() => {
      setFlashGlow(true);
      setIsExiting(true);

      // Step 2: Fade out overlay
      setTimeout(() => {
        onLoadingComplete();
        onRevealComplete();
        setOverlayHidden(true);
      }, 650);
    }, 350);
  }, [onLoadingComplete, onRevealComplete]);

  useEffect(() => {
    // Lock scrollbar during loading
    document.body.style.overflow = "hidden";

    const duration = 2400; // 2.4 seconds total count duration
    const startTime = performance.now();

    let animationFrameId: number;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const linearProgress = Math.min(1, elapsed / duration);

      // Ease out cubic for a dramatic slow down toward 100
      const easedProgress = 1 - Math.pow(1 - linearProgress, 2.8);
      const val = Math.min(100, Math.max(1, Math.round(easedProgress * 99 + 1)));

      setDisplayProgress(val);

      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setDisplayProgress(100);
        handleComplete();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, [handleComplete]);

  if (overlayHidden) return null;

  const formattedCounter = String(displayProgress).padStart(2, "0");
  const norm = displayProgress / 100;
  const currentStage = getStageLabel(displayProgress);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] transition-opacity duration-700 ease-in-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
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
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
        style={{
          width: "min(90vw, 750px)",
          height: "min(90vw, 750px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(198,255,54,0.22) 0%, rgba(198,255,54,0.04) 50%, transparent 75%)",
          opacity: flashGlow ? 0.85 : Math.min(0.4, norm * 0.4),
          transform: `translate(-50%, -50%) scale(${flashGlow ? 2.2 : 0.7 + norm * 0.6})`,
        }}
        aria-hidden="true"
      />

      {/* Central counter + supporting text */}
      <div
        className={`relative z-10 flex flex-col items-center select-none text-center px-4 transition-all duration-500 ease-in ${
          isExiting
            ? "scale-110 opacity-0 blur-lg"
            : "scale-100 opacity-100 blur-0"
        }`}
      >
        {/* Large ITC Bodoni 72 Italic Counter */}
        <div
          className="relative leading-none select-none font-serif-italic"
          style={{
            fontFamily:
              'var(--font-bodoni-72), "ITC Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72", Georgia, serif',
            fontStyle: "italic",
            fontWeight: 400,
            fontFeatureSettings: '"onum" 1, "pnum" 1',
            fontSize: "clamp(180px, 28vw, 480px)",
            color: "#C6FF36",
            letterSpacing: "-0.02em",
            textShadow: "0 0 50px rgba(198, 255, 54, 0.4), 0 0 100px rgba(198, 255, 54, 0.15)",
          }}
        >
          {formattedCounter}
        </div>

        {/* Supporting label & stage indicator */}
        <div className="mt-2 sm:mt-4 flex flex-col items-center">
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
            className="mt-2 tracking-[0.3em] uppercase font-mono text-xs transition-all duration-200"
            style={{
              color: "rgba(255, 255, 255, 0.45)",
              letterSpacing: "0.25em",
            }}
          >
            {currentStage}
          </div>
        </div>
      </div>

      {/* Subtle green horizon accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(198,255,54,0.35), transparent)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
