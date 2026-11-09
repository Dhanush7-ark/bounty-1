"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useLoadingState } from "@/hooks/useLoadingState";
import { LoaderParticles } from "./LoaderParticles";
import { CinematicRedTransition } from "./CinematicRedTransition";

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
  const [isTransitionActive, setIsTransitionActive] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [overlayHidden, setOverlayHidden] = useState(false);

  const hasTriggeredTransition = useRef(false);

  const [isMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  // ───────────────────────────────────────────────────────────────────────────
  // ON 100 REACHED: BEGIN THE 8-STAGE CINEMATIC TRANSITION
  // ───────────────────────────────────────────────────────────────────────────
  const startCinematicTransition = useCallback(() => {
    if (hasTriggeredTransition.current) return;
    hasTriggeredTransition.current = true;
    setIsTransitionActive(true);
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // ON TRANSITION FINISH (AFTER 5.5s FRAME 8 FINAL REVEAL): UNLOCK HERO
  // ───────────────────────────────────────────────────────────────────────────
  const handleTransitionFinished = useCallback(() => {
    setIsExiting(true);
    // Smooth final fade reveal into upcoming hero section
    setTimeout(() => {
      onLoadingComplete();
      onRevealComplete();
      setOverlayHidden(true);
    }, 450);
  }, [onLoadingComplete, onRevealComplete]);

  useEffect(() => {
    // Lock scrollbar during preloader and transition
    document.body.style.overflow = "hidden";

    const duration = 2400; // 2.4 seconds total counter duration (1 -> 100)
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
        // Start the 8-stage transition at 100
        startCinematicTransition();
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = "";
    };
  }, [startCinematicTransition]);

  if (overlayHidden) return null;

  const formattedCounter = String(displayProgress).padStart(2, "0");
  const norm = displayProgress / 100;
  const currentStage = getStageLabel(displayProgress);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ease-out ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, #8C000B 0%, #5A0007 38%, #2A0003 72%, #080001 100%)",
      }}
      aria-live="polite"
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Relay experience"
    >
      {/* ─── PROCEDURAL PARTICLES & CONVECTIVE EMBERS ─── */}
      {!isTransitionActive && (
        <LoaderParticles
          progress={displayProgress}
          reducedMotion={false}
          isMobile={isMobile}
        />
      )}

      {/* ─── ATMOSPHERIC DEEP RED RADIAL GLOW BEHIND TYPOGRAPHY ─── */}
      {!isTransitionActive && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
          style={{
            width: "min(90vw, 750px)",
            height: "min(90vw, 750px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255, 30, 56, 0.32) 0%, rgba(180, 0, 20, 0.1) 50%, transparent 75%)",
            opacity: Math.min(0.7, 0.25 + norm * 0.45),
            transform: `translate(-50%, -50%) scale(${0.8 + norm * 0.5})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── CENTRAL COUNTER + ELEGANT BLACK BODONI TYPOGRAPHY ─── */}
      {!isTransitionActive && (
        <div className="relative z-10 flex flex-col items-center select-none text-center px-4">
          {/* Elegant Black ITC Bodoni 72 Italic Counter */}
          <div
            className="relative leading-none select-none font-serif-italic"
            style={{
              fontFamily:
                'var(--font-bodoni-72), "ITC Bodoni 72", "Bodoni 72 Oldstyle", "Bodoni 72", Georgia, serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontFeatureSettings: '"onum" 1, "pnum" 1',
              fontSize: "clamp(180px, 28vw, 480px)",
              color: "#000000",
              letterSpacing: "-0.02em",
              textShadow: "0 4px 35px rgba(0, 0, 0, 0.45), 0 0 15px rgba(0, 0, 0, 0.25)",
            }}
          >
            {formattedCounter}
          </div>

          {/* Supporting label & stage indicator in elegant black/charcoal */}
          <div className="mt-2 sm:mt-4 flex flex-col items-center">
            <div
              className="tracking-[0.4em] uppercase font-mono font-bold"
              style={{
                fontSize: "clamp(0.6rem, 1.1vw, 0.8rem)",
                color: "#000000",
                letterSpacing: "0.35em",
              }}
            >
              RELAY // AUTONOMOUS WORKFLOWS
            </div>

            <div
              className="mt-2 tracking-[0.3em] uppercase font-mono text-xs font-semibold"
              style={{
                color: "rgba(0, 0, 0, 0.7)",
                letterSpacing: "0.25em",
              }}
            >
              {currentStage}
            </div>
          </div>
        </div>
      )}

      {/* ─── SUBTLE CRIMSON HORIZON ACCENT LINE ─── */}
      {!isTransitionActive && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255, 30, 56, 0.5), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── ULTRA-CINEMATIC 8-STAGE RED & BLACK TRANSITION (FRAMES 1 TO 8) ─── */}
      {isTransitionActive && (
        <CinematicRedTransition onComplete={handleTransitionFinished} />
      )}
    </div>
  );
}
