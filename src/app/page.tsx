"use client";

import { useState } from "react";
import { BackgroundAnimationSystem } from "@/components/animations/BackgroundAnimationSystem";
import { Navbar } from "@/components/navbar/Navbar";
import { HeroSection } from "@/components/hero/HeroSection";
import { IntegrationsSection } from "@/components/integrations/IntegrationsSection";
import { WorkflowSection } from "@/components/workflow/WorkflowSection";
import { EditorialFeatures } from "@/components/features/EditorialFeatures";
import { AnalyticsSection } from "@/components/analytics/AnalyticsSection";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import { Footer } from "@/components/layout/Footer";
import { WatchBuildModal } from "@/components/modals/WatchBuildModal";
import { StartFreeModal } from "@/components/modals/StartFreeModal";

export default function Home() {
  const [watchBuildOpen, setWatchBuildOpen] = useState(false);
  const [startFreeOpen, setStartFreeOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Professional");

  const handleOpenStartFree = (planName?: string) => {
    if (planName) setSelectedPlan(planName);
    setStartFreeOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#e5e5e5] selection:bg-[#C6FF36] selection:text-black overflow-x-hidden">
      {/* ─── CONTINUOUS FUTURISTIC BACKGROUND ANIMATION SYSTEM (LAYERED & SCROLL-REACTIVE) ─── */}
      <BackgroundAnimationSystem />

      {/* ─── NAVIGATION BAR ─── */}
      <Navbar onStartFree={() => handleOpenStartFree()} />

      {/* ─── MAIN CONTENT SECTIONS (ELEVATED ABOVE BACKGROUND) ─── */}
      <main className="relative z-10">
        {/* 1. Hero Section */}
        <HeroSection
          onWatchBuild={() => setWatchBuildOpen(true)}
          onStartFree={() => handleOpenStartFree()}
        />

        {/* 2. Integrations Section ("One canvas, many branches") */}
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
    </div>
  );
}
