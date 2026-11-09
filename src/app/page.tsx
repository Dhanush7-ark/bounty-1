"use client";

import { useState } from "react";
import { Sparkles, Flame } from "lucide-react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { BackgroundAnimationSystem } from "@/components/animations/BackgroundAnimationSystem";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { CinematicGreenHero } from "@/components/hero/CinematicGreenHero";
import { RevolutionizeSection } from "@/components/statement/RevolutionizeSection";
import { CinematicRedMotionSection } from "@/components/statement/CinematicRedMotionSection";
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
  const [heroVariant, setHeroVariant] = useState<"vortex" | "flame">("vortex");

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
          {/* 1. Hero Section (Switchable between Ribbon Vortex and Cyber Flame) */}
          {heroVariant === "vortex" ? (
            <HeroSection
              onWatchBuild={() => setWatchBuildOpen(true)}
              onStartFree={() => handleOpenStartFree()}
            />
          ) : (
            <CinematicGreenHero
              onWatchBuild={() => setWatchBuildOpen(true)}
              onStartFree={() => handleOpenStartFree()}
            />
          )}

          {/* 2. Revolutionize Statement Screen (Image 1 Style + Image 2 Content) */}
          <RevolutionizeSection
            onBookConsultation={() => setConsultationOpen(true)}
          />

          {/* 3. Pure Cinematic Abstract Motion-Graphics Background (Dark Red Liquid Ink & Flame Wings) */}
          <CinematicRedMotionSection />

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

        {/* ─── HERO SECTION UI SWITCHER (SHIFT BETWEEN PREVIOUS VORTEX & PRESENT CYBER FLAME) ─── */}
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 p-1.5 rounded-full bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.9)] select-none">
          <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 pl-3 pr-1 hidden sm:inline-block">
            Hero UI:
          </span>
          <button
            onClick={() => setHeroVariant("vortex")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroVariant === "vortex"
                ? "bg-[#C6FF36] text-black shadow-[0_0_14px_rgba(198,255,54,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Switch to Previous 3D Light Ribbon Vortex Hero"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ribbon Vortex (Prev)</span>
          </button>
          <button
            onClick={() => setHeroVariant("flame")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              heroVariant === "flame"
                ? "bg-[#00FF41] text-black shadow-[0_0_14px_rgba(0,255,65,0.5)] font-bold"
                : "text-neutral-400 hover:text-white hover:bg-white/10"
            }`}
            title="Switch to Present Cyber Green Flame Hero"
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Cyber Flame (Pres)</span>
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
