"use client";

import { useState, useEffect } from "react";
import { X, Play, Pause, RotateCcw, CheckCircle2, ChevronRight, Volume2, Maximize2 } from "lucide-react";

interface WatchBuildModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartFree?: () => void;
}

export function WatchBuildModal({ isOpen, onClose, onStartFree }: WatchBuildModalProps) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      if (isPlaying) {
        setProgress((prev) => {
          if (prev >= 100) {
            setCurrentStep((s) => (s < 4 ? s + 1 : 1));
            return 0;
          }
          return prev + 2;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  const buildSteps = [
    {
      step: 1,
      title: "Define Webhook Trigger & Payload Schema",
      description: "Connect Stripe payment_intent.payment_failed webhook with automatic schema mapping.",
      timestamp: "0:24",
    },
    {
      step: 2,
      title: "Add Conditional Enterprise Branching Rule",
      description: "Evaluate customer lifetime value (LTV > $25,000) or contract tier in real-time.",
      timestamp: "0:58",
    },
    {
      step: 3,
      title: "Configure Human-in-the-Loop Slack Modal",
      description: "Route approval card to Sarah Chen (AE) with 1-click grace period extension.",
      timestamp: "1:32",
    },
    {
      step: 4,
      title: "Deploy Live with Automatic Rollback & Telemetry",
      description: "Publish to production cluster with sub-second execution guarantee & 90-day replay.",
      timestamp: "2:00",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-xl transition-all">
      <div className="relative w-full max-w-4xl rounded-3xl bg-[#10110E] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 bg-[#0a0b09]/80">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C6FF36] animate-pulse" />
            <h3 className="text-sm font-semibold text-white">Interactive Build Walkthrough: 2-Minute Tour</h3>
            <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">• Build & Deploy a Multi-App Handoff</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Simulation Canvas */}
        <div className="relative aspect-video bg-[#050505] p-6 sm:p-8 flex flex-col justify-between overflow-hidden">
          
          {/* Subtle Canvas Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[radial-gradient(circle,rgba(198,255,54,0.08),transparent_70%)] blur-3xl pointer-events-none" />

          {/* Simulated Interface Demonstration */}
          <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center max-w-xl mx-auto">
            <span className="px-3 py-1 rounded-full bg-[#C6FF36]/15 border border-[#C6FF36]/30 text-[#C6FF36] text-xs font-mono font-semibold mb-4">
              STEP {currentStep} OF 4 // {buildSteps[currentStep - 1].timestamp}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {buildSteps[currentStep - 1].title}
            </h2>
            <p className="text-sm text-neutral-400 leading-relaxed font-mono">
              {buildSteps[currentStep - 1].description}
            </p>

            {/* Simulated Live Action Visual Box */}
            <div className="mt-6 p-4 rounded-xl bg-[#161814] border border-[#C6FF36]/40 shadow-[0_0_30px_rgba(198,255,54,0.15)] flex items-center gap-4 text-xs font-mono text-neutral-200">
              <span className="w-2 h-2 rounded-full bg-[#C6FF36] animate-pulse" />
              <span>[Live Runtime Preview]: Evaluating rule payload on node #0{currentStep}</span>
              <span className="text-[#C6FF36]">✓ 0 errors</span>
            </div>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="relative z-10 pt-4 border-t border-white/8 flex flex-col gap-3">
            {/* Scrubber Bar */}
            <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden cursor-pointer">
              <div
                className="h-full bg-[#C6FF36] transition-all duration-100 shadow-[0_0_10px_#C6FF36]"
                style={{ width: `${((currentStep - 1) * 25) + (progress * 0.25)}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>
                <span>{buildSteps[currentStep - 1].timestamp} / 2:00</span>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setCurrentStep((s) => (s < 4 ? s + 1 : 1));
                    setProgress(0);
                  }}
                  className="hover:text-white transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Bottom CTA Bar */}
        <div className="flex flex-wrap items-center justify-between px-6 py-4 border-t border-white/8 bg-[#0a0b09] gap-4">
          <p className="text-xs font-mono text-neutral-400">
            Ready to test this in your own stack?
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-mono text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              Close preview
            </button>
            <button
              onClick={() => {
                onClose();
                onStartFree?.();
              }}
              className="px-5 py-2 rounded-full bg-[#C6FF36] text-black font-semibold text-xs transition-all hover:bg-[#d5ff5e] shadow-[0_0_20px_rgba(198,255,54,0.3)] cursor-pointer"
            >
              Start free (14 days)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

