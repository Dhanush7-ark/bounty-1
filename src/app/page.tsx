"use client";

import { useState } from "react";
import { Sparkles, Flame, Layers } from "lucide-react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { BackgroundAnimationSystem } from "@/components/animations/BackgroundAnimationSystem";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CinematicGreenHero } from "@/components/hero/CinematicGreenHero";
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
  const [heroMode, setHeroMode] = useState<"flame" | "vortex" | "both">("flame");

  const handleOpenStartFree = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setStartFreeOpen(true);
  };

  return (
    <>
      {/* ─── CINEMATIC 1 TO 100 PRELOADER ─── */}
      {isLoading && <CinematicLoader />}

      <div className="relative min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-[#C6FF36] selection:text-black overflow-x-hidden">
        {/* ─── CONTINUOUS FUTURISTIC BACKGROUND ANIMATION SYSTEM (LAYERED & SCROLL-REACTIVE) ─── */}
        <BackgroundAnimationSystem />

        {/* ─── NAVIGATION BAR ─── */}
        <Navbar onStartFree={() => handleOpenStartFree()} />

        {/* ─── MAIN CONTENT SECTIONS (ELEVATED ABOVE BACKGROUND) ─── */}
        <main className="relative z-10">
          {/* ─── 1. HERO SECTION 1 (PREVIOUS: 3D LIGHT RIBBON VORTEX & DASHBOARD) ─── */}
          {(heroMode === "both" || heroMode === "vortex") && (
            <section className="relative">
              {heroMode === "both" && (
                <div className="w-full max-w-7xl mx-auto px-6 pt-24 sm:pt-28 -mb-20 flex items-center justify-between z-20 relative">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#10110E]/90 border border-[#C6FF36]/40 text-[#C6FF36] font-mono text-[11px] tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(198,255,54,0.2)]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>HERO UI CONCEPT 1 &bull; 3D RIBBON VORTEX</span>
                  </span>
                </div>
              )}
              <HeroSection
                onWatchBuild={() => setWatchBuildOpen(true)}
                onStartFree={() => handleOpenStartFree()}
              />
            </section>
          )}

          {/* ─── 2. HERO SECTION 2 (PRESENT: CYBER GREEN FLAME & MATRIX KINETICS) ─── */}
          {(heroMode === "both" || heroMode === "flame") && (
            <section className={`relative ${heroMode === "both" ? "border-t border-neutral-800/80 mt-12" : ""}`}>
              {heroMode === "both" && (
                <div className="w-full max-w-7xl mx-auto px-6 pt-8 -mb-6 flex items-center justify-between z-30 relative">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#001A0D]/90 border border-[#00FF41]/40 text-[#00FF41] font-mono text-[11px] tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(0,255,65,0.25)]">
                    <Flame className="w-3.5 h-3.5" />
                    <span>HERO UI CONCEPT 2 &bull; CYBER GREEN FLAME (PRESENT)</span>
                  </span>
                </div>
              )}
              <CinematicGreenHero
                onWatchBuild={() => setWatchBuildOpen(true)}
                onStartFree={() => handleOpenStartFree()}
              />
            </section>
          )}

          {/* 3. Revolutionize Statement Screen (Image 1 Style + Image 2 Content) */}
          <RevolutionizeSection
            onBookConsultation={() => setConsultationOpen(true)}
          />

          {/* 4. Reference-Based Cinematic Green Flame & Tribal Emblem Showcase */}
          <CinematicGreenSection />

          {/* 4. Integrations Section ("One canvas, many branches") */}
          <IntegrationsSection />

          {/* 3. Deep Interactive Workflow Demonstration */}
          <WorkflowSection />

          {/* 4. Product Editorial Features (Sections A, B, C) */}
          <EditorialFeatures />

          {/* 5. Analytics & Performance Section */}
          <AnalyticsSection />

          {/* 6. Testimonials Section */}
          <TestimonialsSection />

          {/* 7. Pricing Section */}
          <PricingSection onSelectPlan={handleOpenStartFree} />
        </main>

        {/* ─── FOOTER ─── */}
        <div className="relative z-10">
          <Footer />
        </div>

        {/* ─── HERO SECTION UI SWITCHER (VIEW BOTH HEROES OR TOGGLE INDIVIDUALLY) ─── */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/95 backdrop-blur-2xl border border-white/20 shadow-[0_0_35px_rgba(0,0,0,0.95)] select-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 pl-3 pr-1 hidden sm:inline-block">
            Hero View:
          </span>
          <button
            onClick={() => setHeroMode("both")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "both"
                ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Display Both Hero Sections Stacked"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Both Heroes</span>
          </button>
          <button
            onClick={() => setHeroMode("vortex")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "vortex"
                ? "bg-[#C6FF36] text-black shadow-[0_0_15px_rgba(198,255,54,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Show Only Hero 1 (3D Light Ribbon Vortex)"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>UI 1: Ribbon</span>
          </button>
          <button
            onClick={() => setHeroMode("flame")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroMode === "flame"
                ? "bg-[#00FF41] text-black shadow-[0_0_15px_rgba(0,255,65,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Show Only Hero 2 (Cyber Green Flame)"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>UI 2: Cyber Flame</span>
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
