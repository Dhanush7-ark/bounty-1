"use client";

import { useState } from "react";
import { Sparkles, Flame, Layers } from "lucide-react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { BackgroundAnimationSystem } from "@/components/animations/BackgroundAnimationSystem";
import { Navbar } from "@/components/navbar/Navbar";
import { CinematicRedHero } from "@/components/hero/CinematicRedHero";
import { CinematicGreenHero } from "@/components/hero/CinematicGreenHero";
import { HeroSection } from "@/components/hero/HeroSection";
import { RevolutionizeSection } from "@/components/statement/RevolutionizeSection";
import { CinematicGreenSection } from "@/components/statement/CinematicGreenSection";
import { IntegrationsSection } from "@/components/integrations/IntegrationsSection";
import { WorkflowSection } from "@/components/workflow/WorkflowSection";
import { EditorialFeatures } from "@/components/features/EditorialFeatures";
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { WatchBuildModal } from "@/components/modals/WatchBuildModal";
import { StartFreeModal } from "@/components/modals/StartFreeModal";
import { ConsultationModal } from "@/components/modals/ConsultationModal";

function HomeContent() {
  const { isLoading } = useLoadingState();
  const [watchBuildOpen, setWatchBuildOpen] = useState(false);
  const [startFreeOpen, setStartFreeOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Professional");
  // Default to the exact Red-and-Black Flame Hero requested
  const [heroMode, setHeroMode] = useState<"red-flame" | "green-flame" | "vortex" | "both">("red-flame");

  const handleOpenStartFree = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setStartFreeOpen(true);
  };

  return (
    <>
      {/* ─── CINEMATIC 1 TO 100 PRELOADER ─── */}
      {isLoading && <CinematicLoader />}

      <div className="relative min-h-screen bg-[#000000] text-[#e5e5e5] selection:bg-[#FF1A00] selection:text-black overflow-x-hidden">
        {/* ─── CONTINUOUS FUTURISTIC BACKGROUND ANIMATION SYSTEM (LAYERED & SCROLL-REACTIVE) ─── */}
        <BackgroundAnimationSystem />

        {/* ─── NAVIGATION BAR ─── */}
        <Navbar onStartFree={() => handleOpenStartFree()} />

        {/* ─── MAIN CONTENT SECTIONS (ELEVATED ABOVE BACKGROUND) ─── */}
        <main className="relative z-10">
          {/* ─── 1. EXACT RED-AND-BLACK FLAME HERO (DEFAULT PRIMARY HERO) ─── */}
          {(heroMode === "red-flame" || heroMode === "both") && (
            <section className="relative">
              {heroMode === "both" && (
                <div className="w-full max-w-7xl mx-auto px-6 pt-24 sm:pt-28 -mb-20 flex items-center justify-between z-20 relative">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1F0003]/90 border border-[#FF1A00]/40 text-[#FF1A00] font-mono text-[11px] tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(255,26,0,0.3)]">
                    <Flame className="w-3.5 h-3.5" />
                    <span>EXACT RED FLAME HERO (REFERENCE MATCH)</span>
                  </span>
                </div>
              )}
              <CinematicRedHero
                onWatchBuild={() => setWatchBuildOpen(true)}
                onStartFree={() => handleOpenStartFree()}
              />
            </section>
          )}

          {/* ─── 2. CYBER GREEN FLAME HERO ─── */}
          {(heroMode === "green-flame" || heroMode === "both") && (
            <section className={`relative ${heroMode === "both" ? "border-t border-neutral-800/80 mt-12" : ""}`}>
              {heroMode === "both" && (
                <div className="w-full max-w-7xl mx-auto px-6 pt-8 -mb-6 flex items-center justify-between z-30 relative">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#001A0D]/90 border border-[#00FF41]/40 text-[#00FF41] font-mono text-[11px] tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.25)]">
                    <Flame className="w-3.5 h-3.5" />
                    <span>CYBER GREEN FLAME HERO</span>
                  </span>
                </div>
              )}
              <CinematicGreenHero
                onWatchBuild={() => setWatchBuildOpen(true)}
                onStartFree={() => handleOpenStartFree()}
              />
            </section>
          )}

          {/* ─── 3. 3D LIGHT RIBBON HERO ─── */}
          {heroMode === "vortex" && (
            <section className="relative">
              <HeroSection
                onWatchBuild={() => setWatchBuildOpen(true)}
                onStartFree={() => handleOpenStartFree()}
              />
            </section>
          )}

          {/* 4. Revolutionize Statement Screen */}
          <RevolutionizeSection
            onBookConsultation={() => setConsultationOpen(true)}
          />

          {/* 5. Reference-Based Cinematic Flame & Tribal Emblem Showcase */}
          <CinematicGreenSection />

          {/* 6. Integrations Section ("One canvas, many branches") */}
          <IntegrationsSection />

          {/* 7. Deep Interactive Workflow Demonstration */}
          <WorkflowSection />

          {/* 8. Product Editorial Features */}
          <EditorialFeatures />

          {/* 9. Analytics & Performance Section */}
          <AnalyticsSection />

          {/* 10. Testimonials Section */}
          <TestimonialsSection />

          {/* 11. Pricing Section */}
          <PricingSection onSelectPlan={handleOpenStartFree} />
        </main>

        {/* ─── FOOTER ─── */}
        <div className="relative z-10">
          <Footer />
        </div>

        {/* ─── HERO SECTION UI SWITCHER ─── */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/95 backdrop-blur-2xl border border-white/20 shadow-[0_0_35px_rgba(0,0,0,0.95)] select-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 pl-3 pr-1 hidden sm:inline-block">
            Hero View:
          </span>
          <button
            onClick={() => setHeroMode("red-flame")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "red-flame"
                ? "bg-[#FF1A00] text-black shadow-[0_0_15px_rgba(255,26,0,0.6)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Show Exact Red Flame Hero (Reference Match)"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Red Flame</span>
          </button>
          <button
            onClick={() => setHeroMode("green-flame")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "green-flame"
                ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Show Cyber Green Flame Hero"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Green Flame</span>
          </button>
          <button
            onClick={() => setHeroMode("vortex")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "vortex"
                ? "bg-[#C6FF36] text-black shadow-[0_0_15px_rgba(198,255,54,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Show 3D Light Ribbon Vortex"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>UI: Ribbon</span>
          </button>
          <button
            onClick={() => setHeroMode("both")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "both"
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Display Red & Green Flames Stacked"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Both</span>
          </button>
        </div>

        {/* ─── INTERACTIVE MODALS ─── */}
        <WatchBuildModal
          isOpen={watchBuildOpen}
          onClose={() => setWatchBuildOpen(false)}
          onStartFree={() => {
            setWatchBuildOpen(false);
            handleOpenStartFree();
          }}
        />

        <StartFreeModal
          isOpen={startFreeOpen}
          onClose={() => setStartFreeOpen(false)}
          selectedPlan={selectedPlan}
        />

        <ConsultationModal
          isOpen={consultationOpen}
          onClose={() => setConsultationOpen(false)}
        />
      </div>
    </>
  );
}

export default function Home() {
  return (
    <LoadingProvider>
      <HomeContent />
    </LoadingProvider>
  );
}
