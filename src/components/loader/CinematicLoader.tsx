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
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-500 ease-out bg-[#050505] ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-live="polite"
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Loading Relay experience"
    >
      {/* ─── PROCEDURAL NEON GREEN PARTICLES & CONVECTIVE EMBERS ─── */}
      {!isTransitionActive && (
        <LoaderParticles
          progress={displayProgress}
          reducedMotion={false}
          isMobile={isMobile}
        />
      )}

      {/* ─── ATMOSPHERIC NEON GREEN RADIAL GLOW BEHIND TYPOGRAPHY ─── */}
      {!isTransitionActive && (
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-500 ease-out"
          style={{
            width: "min(90vw, 750px)",
            height: "min(90vw, 750px)",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(198,255,54,0.22) 0%, rgba(198,255,54,0.04) 50%, transparent 75%)",
            opacity: Math.min(0.65, 0.2 + norm * 0.45),
            transform: `translate(-50%, -50%) scale(${0.75 + norm * 0.55})`,
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── CENTRAL COUNTER + NEON LIME BODONI TYPOGRAPHY ─── */}
      {!isTransitionActive && (
        <div className="relative z-10 flex flex-col items-center select-none text-center px-4">
          {/* Neon Lime ITC Bodoni 72 Italic Counter */}
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
              textShadow: "0 0 50px rgba(198, 255, 54, 0.45), 0 0 100px rgba(198, 255, 54, 0.2)",
            }}
          >
            {formattedCounter}
          </div>

          {/* Supporting label & stage indicator in Neon Lime & Subtle White */}
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
      )}

      {/* ─── SUBTLE NEON GREEN HORIZON ACCENT LINE ─── */}
      {!isTransitionActive && (
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(198,255,54,0.35), transparent)",
          }}
          aria-hidden="true"
        />
      )}

      {/* ─── ULTRA-CINEMATIC 8-STAGE GREEN & BLACK TRANSITION (FRAMES 1 TO 8) ─── */}
      {isTransitionActive && (
        <CinematicRedTransition onComplete={handleTransitionFinished} />
      )}
    </div>
  );
}
