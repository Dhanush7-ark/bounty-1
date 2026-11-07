"use client";

import { useEffect, useState, useRef } from "react";
import { TrendingUp, Clock, CheckCircle2 } from "lucide-react";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/animations/ScrollReveal";

export function AnalyticsSection() {
  const [metricCount1, setMetricCount1] = useState(0);
  const [metricCount2, setMetricCount2] = useState(0);
  const [metricCount3, setMetricCount3] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Animated Counter 1: 57,907
    let start1 = 0;
    const end1 = 57907;
    const duration1 = 2000;
    const stepTime1 = 20;
    const increment1 = end1 / (duration1 / stepTime1);

    const timer1 = setInterval(() => {
      start1 += increment1;
      if (start1 >= end1) {
        setMetricCount1(end1);
        clearInterval(timer1);
      } else {
        setMetricCount1(Math.floor(start1));
      }
    }, stepTime1);

    // Animated Counter 2: 10
    let start2 = 0;
    const end2 = 10;
    const timer2 = setInterval(() => {
      start2 += 1;
      if (start2 >= end2) {
        setMetricCount2(end2);
        clearInterval(timer2);
      } else {
        setMetricCount2(start2);
      }
    }, 150);

    // Animated Counter 3: 78%
    let start3 = 0;
    const end3 = 78;
    const timer3 = setInterval(() => {
      start3 += 2;
      if (start3 >= end3) {
        setMetricCount3(end3);
        clearInterval(timer3);
      } else {
        setMetricCount3(start3);
      }
    }, 40);

    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#050505] overflow-hidden border-t border-white/5"
    >
      {/* ─── SUBTLE GREEN LIGHT BEAM ACROSS BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Horizontal Laser Light Beam across middle */}
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C6FF36]/40 to-transparent shadow-[0_0_20px_#C6FF36]" />
        
        {/* Deep ambient green glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[450px] bg-[radial-gradient(ellipse,rgba(198,255,54,0.06),transparent_70%)] blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10110E] border border-white/10 text-xs font-mono text-[#C6FF36] mb-4">
            <span>PERFORMANCE & SCALE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Proven at enterprise{" "}
            <span className="font-serif-italic font-normal text-[#C6FF36]">
              velocity.
            </span>
          </h2>
          <p className="text-base sm:text-lg text-[#888888] font-normal leading-relaxed">
            High throughput without the infrastructure headaches. Relay executes tens of thousands of complex workflows with sub-second guarantees.
          </p>
        </ScrollReveal>

        {/* ─── 3 COLUMN METRICS DASHBOARD WITH STAGGER & INTERACTIVE CARDS ─── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16" staggerDelay={0.1}>
          
          {/* METRIC 1: 57,907 RUNS */}
          <StaggerItem>
            <div className="card-futuristic-interactive group relative rounded-3xl bg-[#10110E] border border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[300px] cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="p-2.5 rounded-xl bg-[#161814] border border-white/10 text-[#C6FF36] group-hover:border-[#C6FF36]/40 transition-colors">
                    <TrendingUp className="w-5 h-5" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#C6FF36] px-2.5 py-0.5 rounded-full bg-[#C6FF36]/10 border border-[#C6FF36]/30 shadow-[0_0_8px_rgba(198,255,54,0.15)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C6FF36] animate-pulse" />
                    Live Velocity
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight mb-3">
                  {metricCount1.toLocaleString()}
                </div>
                <h4 className="text-base font-semibold text-neutral-200">
                  Runs on an average weekday.
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Measured across production enterprise accounts in Q4.
                </p>
              </div>

              {/* Sparkline minimal graph */}
              <div className="pt-6 border-t border-white/8 mt-6">
                <svg className="w-full h-10 overflow-visible" viewBox="0 0 200 40">
                  <path
                    d="M 0 35 Q 25 30, 50 25 T 100 15 T 150 18 T 200 6"
                    fill="none"
                    stroke="#C6FF36"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_6px_rgba(198,255,54,0.4)]"
                  />
                  <circle cx="200" cy="6" r="3.5" fill="#C6FF36" className="animate-ping" />
                  <circle cx="200" cy="6" r="2.5" fill="#FFFFFF" />
                </svg>
              </div>
            </div>
          </StaggerItem>

          {/* METRIC 2: 10 HOURS GIVEN BACK */}
          <StaggerItem>
            <div className="card-futuristic-interactive group relative rounded-3xl bg-[#10110E] border border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[300px] cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="p-2.5 rounded-xl bg-[#161814] border border-white/10 text-[#C6FF36] group-hover:border-[#C6FF36]/40 transition-colors">
                    <Clock className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    Time Recouped
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-white font-mono tracking-tight mb-3">
                  {metricCount2}
                </div>
                <h4 className="text-base font-semibold text-neutral-200">
                  Hours a week given back per person.
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Zero manual copy-pasting between CRMs and spreadsheets.
                </p>
              </div>

              {/* Neon Green Progress Bar */}
              <div className="pt-6 border-t border-white/8 mt-6 flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>Weekly Saved Efficiency</span>
                  <span className="text-[#C6FF36]">10h / 40h (25%)</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-[#C6FF36] rounded-full transition-all duration-1000 shadow-[0_0_12px_#C6FF36]"
                    style={{ width: isVisible ? "65%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </StaggerItem>

          {/* METRIC 3: 78% FIRST ATTEMPT */}
          <StaggerItem>
            <div className="card-futuristic-interactive group relative rounded-3xl bg-[#10110E] border border-white/10 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[300px] cursor-pointer">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="p-2.5 rounded-xl bg-[#161814] border border-white/10 text-[#C6FF36] group-hover:border-[#C6FF36]/40 transition-colors">
                    <CheckCircle2 className="w-5 h-5" />
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    First-Pass Accuracy
                  </span>
                </div>

                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#C6FF36] font-mono tracking-tight mb-3 drop-shadow-[0_0_15px_rgba(198,255,54,0.3)]">
                  {metricCount3}%
                </div>
                <h4 className="text-base font-semibold text-neutral-200">
                  Of runs finish on the first attempt.
                </h4>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Automated dead-letter rollback catches remaining anomalies.
                </p>
              </div>

              {/* Neon Green Progress Bar */}
              <div className="pt-6 border-t border-white/8 mt-6 flex flex-col gap-2">
                <div className="flex justify-between text-[11px] font-mono text-neutral-400">
                  <span>Success Rate (Global)</span>
                  <span className="text-[#C6FF36]">99.98% SLA</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-[#C6FF36] rounded-full transition-all duration-1000 shadow-[0_0_12px_#C6FF36]"
                    style={{ width: isVisible ? "78%" : "0%" }}
                  />
                </div>
              </div>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* ─── CUSTOMER FEEDBACK SNIPPETS BELOW METRICS ─── */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.12}>
          <StaggerItem>
            <div className="card-futuristic-interactive p-6 rounded-2xl bg-[#10110E]/80 border border-white/8 backdrop-blur-md flex items-start gap-4">
              <span className="text-[#C6FF36] font-serif text-3xl leading-none select-none">“</span>
              <div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  Relay replaced 3 custom microservices we spent months maintaining. The human-in-the-loop Slack integration alone cut our billing exception response time by 90%.
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-white">David K., Head of Infra at Ramp</span>
                  <span className="text-[#C6FF36]">4,200 runs/day</span>
                </div>
              </div>
            </div>
          </StaggerItem>

          <StaggerItem>
            <div className="card-futuristic-interactive p-6 rounded-2xl bg-[#10110E]/80 border border-white/8 backdrop-blur-md flex items-start gap-4">
              <span className="text-[#C6FF36] font-serif text-3xl leading-none select-none">“</span>
              <div>
                <p className="text-sm text-neutral-300 leading-relaxed italic">
                  Before Relay, broken webhooks took down our invoice pipeline silently. Now we have automatic retries and deterministic replay for every critical transaction.
                </p>
                <div className="mt-4 flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-white">Elena Rostova, VP Engineering at Retool</span>
                  <span className="text-[#C6FF36]">12,800 runs/day</span>
                </div>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>

      </div>
    </section>
  );
}
