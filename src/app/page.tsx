"use client";

import { useState } from "react";
import { LoadingProvider, useLoadingState } from "@/hooks/useLoadingState";
import { CinematicLoader } from "@/components/loader/CinematicLoader";
import { CinematicGreenBackground } from "@/components/animations/CinematicGreenBackground";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { RevolutionizeSection } from "@/components/statement/RevolutionizeSection";
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

      <div className="relative min-h-screen bg-[#030704] text-[#e5e5e5] selection:bg-[#00FF85] selection:text-black overflow-x-hidden">
        {/* ─── REFERENCE-BASED CINEMATIC GREEN ORGANIC BACKGROUND ANIMATION ─── */}
        <CinematicGreenBackground />

        {/* ─── NAVIGATION BAR ─── */}
        <Navbar onStartFree={() => handleOpenStartFree()} />

        {/* ─── MAIN CONTENT SECTIONS (ELEVATED ABOVE BACKGROUND) ─── */}
        <main className="relative z-10">
          {/* 1. Hero Section */}
          <HeroSection
            onWatchBuild={() => setWatchBuildOpen(true)}
            onStartFree={() => handleOpenStartFree()}
          />

          {/* 2. Revolutionize Statement Screen (Image 1 Style + Image 2 Content) */}
          <RevolutionizeSection
            onBookConsultation={() => setConsultationOpen(true)}
          />

          {/* 3. Integrations Section ("One canvas, many branches") */}
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
