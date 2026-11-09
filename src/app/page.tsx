"use client";

import { useState } from "react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { BackgroundAnimationSystem } from "@/components/animations/BackgroundAnimationSystem";
import { Navbar } from "@/components/navbar/Navbar";
import { CinematicGreenHero } from "@/components/hero/CinematicGreenHero";
import { HeroSection } from "@/components/hero/HeroSection";
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
          {/* 1. Cinematic Green & Black Animated Hero Section */}
          <CinematicGreenHero
            onWatchBuild={() => setWatchBuildOpen(true)}
            onStartFree={() => handleOpenStartFree()}
          />

          {/* 2. Revolutionize Statement Screen (Image 1 Style + Image 2 Content) */}
          <RevolutionizeSection
            onBookConsultation={() => setConsultationOpen(true)}
          />

          {/* 3. Pure Cinematic Abstract Motion-Graphics Background (Dark Red Liquid Ink & Flame Wings) */}
          <CinematicRedMotionSection />

          {/* 4. How It Works: Reference-Based Cinematic Green Flame & Matrix */}
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
